#!/usr/bin/env python3
"""Generate and analyze the synthetic HomeFlex utility-evaluation dataset.

This demonstration uses only Python's standard library. It creates fictional
household-month billing records, applies a documented cleaning protocol, and
calculates simple pre/post and matched difference-in-differences estimates.
It is a portfolio exercise, not a production-grade EM&V model.
"""

from __future__ import annotations

import csv
import math
import random
import statistics
from collections import defaultdict
from pathlib import Path

SEED = 20261019
ROOT = Path(__file__).resolve().parent
DATA_PATH = ROOT / "homeflex_synthetic_monthly.csv"
RESULTS_PATH = ROOT / "homeflex_sensitivity_results.csv"


def month_label(index: int) -> str:
    year = 2024 + index // 12
    month = index % 12 + 1
    return f"{year:04d}-{month:02d}"


def generate() -> None:
    rng = random.Random(SEED)
    n_participants, n_comparisons = 1240, 1260
    profiles = {}
    for match_id in range(1, n_comparisons + 1):
        profiles[match_id] = {
            "home_type": rng.choice(["single_family", "townhome", "multifamily"]),
            "climate_zone": rng.choice(["hot_dry", "mixed_dry", "warm_dry"]),
            "income_group": rng.choices(["priority", "standard"], weights=[.34, .66])[0],
            "base_kwh": rng.uniform(620, 1180),
        }

    households = []
    for treated, count in [(1, n_participants), (0, n_comparisons)]:
        for i in range(1, count + 1):
            group = "P" if treated else "C"
            households.append((f"{group}{i:04d}", treated, i, profiles[i]))

    all_ids = [h[0] for h in households]
    short_gap_ids = set(rng.sample(all_ids, 146))
    remaining = [h for h in all_ids if h not in short_gap_ids]
    long_gap_ids = set(rng.sample(remaining, 54))
    omitted = set()
    for household_id in sorted(short_gap_ids):
        for m in rng.sample(range(24), rng.choice([1, 2])):
            omitted.add((household_id, m))
    for household_id in sorted(long_gap_ids):
        for m in rng.sample(range(24), rng.choice([3, 4])):
            omitted.add((household_id, m))

    available_keys = [(household_id, m) for household_id in all_ids for m in range(24) if (household_id, m) not in omitted]
    duplicate_keys = set(rng.sample(available_keys, 31))
    spike_pool = [key for key in available_keys if key not in duplicate_keys]
    spike_keys = set(rng.sample(spike_pool, 22))

    fields = [
        "household_id", "match_id", "participant", "month", "period",
        "home_type", "climate_zone", "income_group", "hdd", "cdd",
        "kwh", "flagged_spike", "record_version"
    ]
    rows = []
    for household_id, treated, match_id, profile in households:
        household_shift = rng.uniform(.92, 1.08)
        for m in range(24):
            if (household_id, m) in omitted:
                continue
            radians = (m % 12) / 12 * 2 * math.pi
            hdd = max(0, 180 - 150 * math.sin(radians) + rng.gauss(0, 8))
            cdd = max(0, 170 + 145 * math.sin(radians) + rng.gauss(0, 8))
            weather_factor = 1 + .0008 * hdd + .0010 * cdd
            post = int(m >= 12)
            common_trend = .99 if post else 1.0
            program_factor = .916 if treated and post else 1.0
            noise = max(.90, min(1.10, rng.gauss(1, .025)))
            kwh = profile["base_kwh"] * household_shift * weather_factor * common_trend * program_factor * noise
            flagged = int((household_id, m) in spike_keys)
            if flagged:
                kwh *= 3.0
            row = {
                "household_id": household_id,
                "match_id": match_id,
                "participant": treated,
                "month": month_label(m),
                "period": "post" if post else "pre",
                "home_type": profile["home_type"],
                "climate_zone": profile["climate_zone"],
                "income_group": profile["income_group"],
                "hdd": round(hdd, 1),
                "cdd": round(cdd, 1),
                "kwh": round(kwh, 2),
                "flagged_spike": flagged,
                "record_version": 1,
            }
            rows.append(row)
            if (household_id, m) in duplicate_keys:
                duplicate = dict(row)
                duplicate["record_version"] = 0
                duplicate["kwh"] = round(kwh * rng.uniform(.97, 1.03), 2)
                rows.append(duplicate)

    with DATA_PATH.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)
    print(f"Wrote {len(rows):,} rows to {DATA_PATH.name}")


def load_deduplicated(include_spikes: bool = False) -> list[dict[str, str]]:
    records = {}
    with DATA_PATH.open(newline="", encoding="utf-8") as handle:
        for row in csv.DictReader(handle):
            key = (row["household_id"], row["month"])
            if key not in records or int(row["record_version"]) > int(records[key]["record_version"]):
                records[key] = row
    rows = list(records.values())
    if not include_spikes:
        rows = [row for row in rows if row["flagged_spike"] == "0"]
    return rows


def estimate(rows: list[dict[str, str]], complete_case: bool = False, weather_adjusted: bool = True) -> float:
    by_household = defaultdict(lambda: {"pre": [], "post": [], "participant": 0, "match_id": 0})
    for row in rows:
        h = by_household[row["household_id"]]
        kwh = float(row["kwh"])
        if weather_adjusted:
            weather_factor = 1 + .0008 * float(row["hdd"]) + .0010 * float(row["cdd"])
            kwh /= weather_factor
        h[row["period"]].append(kwh)
        h["participant"] = int(row["participant"])
        h["match_id"] = int(row["match_id"])

    valid = {}
    for household_id, values in by_household.items():
        observed = len(values["pre"]) + len(values["post"])
        required = 24 if complete_case else 22
        if observed >= required and values["pre"] and values["post"]:
            valid[household_id] = {
                "pre": statistics.mean(values["pre"]),
                "post": statistics.mean(values["post"]),
                "participant": values["participant"],
                "match_id": values["match_id"],
            }

    pairs = defaultdict(dict)
    for values in valid.values():
        pairs[values["match_id"]][values["participant"]] = values
    ratios_t, ratios_c = [], []
    for pair in pairs.values():
        if 0 in pair and 1 in pair:
            ratios_t.append(pair[1]["post"] / pair[1]["pre"])
            ratios_c.append(pair[0]["post"] / pair[0]["pre"])
    return (statistics.mean(ratios_t) / statistics.mean(ratios_c) - 1) * -100


def participant_prepost(rows: list[dict[str, str]]) -> float:
    by_period = {"pre": [], "post": []}
    for row in rows:
        if row["participant"] == "1":
            by_period[row["period"]].append(float(row["kwh"]))
    return (statistics.mean(by_period["post"]) / statistics.mean(by_period["pre"]) - 1) * -100


def analyze() -> None:
    preferred = estimate(load_deduplicated(include_spikes=False))
    unadjusted = estimate(load_deduplicated(include_spikes=False), weather_adjusted=False)
    with_spikes = estimate(load_deduplicated(include_spikes=True))
    complete = estimate(load_deduplicated(include_spikes=False), complete_case=True)
    prepost = participant_prepost(load_deduplicated(include_spikes=False))
    rows = [
        ["Participant pre/post only", "No", "No", "Complete + short gaps", f"{prepost:.1f}", "Descriptive; no external counterfactual"],
        ["Matched difference-in-differences", "No", "Yes", "Complete + short gaps", f"{unadjusted:.1f}", "Unadjusted comparison estimate"],
        ["Matched DiD, preferred specification", "Yes", "Yes", "Documented protocol", f"{preferred:.1f}", "Primary portfolio estimate"],
        ["Preferred model, complete cases", "Yes", "Yes", "Complete cases only", f"{complete:.1f}", "Missing-data sensitivity"],
        ["Preferred model, flagged spikes retained", "Yes", "Yes", "Spikes retained", f"{with_spikes:.1f}", "Outlier sensitivity"],
    ]
    with RESULTS_PATH.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle)
        writer.writerow(["specification", "weather_adjusted", "matched_comparison", "data_rule", "estimated_reduction_pct", "interpretation"])
        writer.writerows(rows)
    print(f"Preferred matched estimate: {preferred:.1f}% reduction")
    print(f"Wrote sensitivity results to {RESULTS_PATH.name}")


if __name__ == "__main__":
    generate()
    analyze()
