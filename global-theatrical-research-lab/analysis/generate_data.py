"""Regenerate the published synthetic companion CSVs from their frozen aggregate targets.

This public-deployment generator is intentionally distinct from the original
simulation's stochastic generator. It reconstructs deterministic illustrative
microdata to match the published one-decimal aggregate tables, not real survey
respondents or the original underlying synthetic random draws.
Run: python analysis/generate_data.py
"""
from pathlib import Path
import csv, json
P = Path(__file__).resolve().parent.parent
S = json.loads((P / "data/reproducible_summary.json").read_text())
MARKETS = list(S["tracking"])
SEGMENTS = ["Genre fans", "Social moviegoers", "Story seekers", "Occasional viewers"]
AGES = ["18-24", "25-34", "35-44", "45+"]

def count(percent, n):
    return round(percent * n / 100)

def flag(i, n, positives, offset):
    return int((i * 37 + offset) % n < positives)

tracking = []
for mi, market in enumerate(MARKETS):
    for wave in ("8", "6", "4", "2"):
        item = S["tracking"][market][wave]
        for i in range(480):
            segment = SEGMENTS[i % 4]
            j = i // 4
            aware = (flag(j, 120, count(S["segments"][market][segment]["awareness_pct"], 120), 17)
                     if wave == "2" else flag(i, 480, count(item["awareness_pct"], 480), 17))
            intent = (flag(j, 120, count(S["segments"][market][segment]["intent_pct"], 120), 11)
                      if wave == "2" else flag(i, 480, count(item["intent_pct"], 480), 11))
            interested = flag(i, 480, count(item["interest_pct"], 480), 29)
            tracking.append(dict(id=f"T{int(wave):02}-{mi+1:02}-{i+1:03}",
                market=market, weeks_before_release=wave, segment=segment,
                age_band=AGES[(j + mi + int(wave)) % 4],
                aware=aware, interested=interested, definite_intent=intent, synthetic=1))

creative = []
for mi, market in enumerate(MARKETS):
    item = S["creative"][market]
    for i in range(480):
        cell = "A" if i % 2 == 0 else "B"
        j = i // 2
        pct = item["a_pct"] if cell == "A" else item["b_pct"]
        creative.append(dict(id=f"C-{mi+1:02}-{i+1:03}", market=market,
            segment=SEGMENTS[j % 4], creative_cell=cell,
            definite_intent=flag(j, 240, count(pct, 240), 13),
            concept_clarity=1 + (i * 3 + mi) % 5, synthetic=1))

for name, rows in (("tracking_respondents_synthetic.csv", tracking),
                   ("creative_respondents_synthetic.csv", creative)):
    with (P / "data" / name).open("w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)
print("Generated", len(tracking), "tracking and", len(creative), "creative synthetic rows")
