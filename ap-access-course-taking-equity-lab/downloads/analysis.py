"""Build the AP Access and Course-Taking Equity research dataset.

Sources
-------
1. U.S. Department of Education, Office for Civil Rights, 2023-24 CRDC.
2. NCES Common Core of Data, 2023-24 Public School Directory.

The script expects the four source CSVs in ../raw and writes documented,
analysis-ready outputs to ../data and website downloads to ../dist/downloads.
"""

from __future__ import annotations

import json
import math
import shutil
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler


ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "raw"
DATA = ROOT / "data"
DOWNLOADS = ROOT / "dist" / "downloads"
DIST = ROOT / "dist"
DATA.mkdir(parents=True, exist_ok=True)
DOWNLOADS.mkdir(parents=True, exist_ok=True)

RACE_CODES = {
    "Hispanic or Latino": "HI",
    "American Indian or Alaska Native": "AM",
    "Asian": "AS",
    "Native Hawaiian or Pacific Islander": "HP",
    "Black or African American": "BL",
    "White": "WH",
    "Two or more races": "TR",
}

SPECIAL_CODES = {-5, -6, -7, -9, -10, -11, -13}


def normalize_id(series: pd.Series) -> pd.Series:
    return (
        series.astype("string")
        .str.replace(r"\.0$", "", regex=True)
        .str.strip()
        .str.zfill(12)
    )


def numeric(series: pd.Series) -> pd.Series:
    values = pd.to_numeric(series, errors="coerce")
    return values.mask(values < 0)


def sum_counts(df: pd.DataFrame, columns: list[str]) -> pd.Series:
    """Sum reported nonnegative components; require at least one reported value."""
    vals = pd.concat([numeric(df[c]) for c in columns], axis=1)
    return vals.sum(axis=1, min_count=1)


def wilson_interval(successes: float, total: float, z: float = 1.96) -> tuple[float, float]:
    if total <= 0 or pd.isna(successes) or pd.isna(total):
        return (np.nan, np.nan)
    p = successes / total
    den = 1 + z * z / total
    center = (p + z * z / (2 * total)) / den
    half = z * math.sqrt((p * (1 - p) + z * z / (4 * total)) / total) / den
    return (max(0.0, center - half), min(1.0, center + half))


def load_sources() -> tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame, pd.DataFrame]:
    ap = pd.read_csv(RAW / "Advanced Placement.csv", low_memory=False)
    enrollment = pd.read_csv(RAW / "Enrollment.csv", low_memory=False)
    characteristics = pd.read_csv(RAW / "School Characteristics.csv", low_memory=False)
    ccd = pd.read_csv(RAW / "ccd_sch_029_2324_w_1a_073124.csv", low_memory=False)
    for df in (ap, enrollment, characteristics):
        df["COMBOKEY"] = normalize_id(df["COMBOKEY"])
    ccd["NCESSCH"] = normalize_id(ccd["NCESSCH"])
    return ap, enrollment, characteristics, ccd


def build_school_file() -> tuple[pd.DataFrame, dict]:
    ap, enrollment, characteristics, ccd = load_sources()

    enr_cols = [
        "COMBOKEY", "TOT_ENR_M", "TOT_ENR_F", "TOT_ENR_X",
        "TOT_ELENR_M", "TOT_ELENR_F", "TOT_ELENR_X",
        "TOT_IDEAENR_M", "TOT_IDEAENR_F", "TOT_IDEAENR_X",
    ]
    for code in RACE_CODES.values():
        enr_cols += [f"SCH_ENR_{code}_M", f"SCH_ENR_{code}_F", f"SCH_ENR_{code}_X"]

    char_cols = ["COMBOKEY", "SCH_VIRT_IND", "SCH_STATUS_CHARTER"]
    ccd_cols = [
        "NCESSCH", "STATENAME", "ST", "LEAID", "LEA_NAME", "SCH_NAME", "MCITY",
        "LEVEL", "G_9_OFFERED", "G_10_OFFERED", "G_11_OFFERED", "G_12_OFFERED",
        "CHARTER_TEXT", "SCH_TYPE_TEXT", "SY_STATUS_TEXT",
    ]

    merged = ap.merge(
        enrollment[enr_cols], on="COMBOKEY", how="left", validate="one_to_one", indicator="merge_enrollment"
    )
    merged = merged.merge(
        characteristics[char_cols], on="COMBOKEY", how="left", validate="one_to_one", indicator="merge_characteristics"
    )
    merged = merged.merge(
        ccd[ccd_cols], left_on="COMBOKEY", right_on="NCESSCH", how="left",
        validate="one_to_one", indicator="merge_ccd", suffixes=("", "_CCD")
    )

    audit = {
        "crdc_ap_rows": int(len(ap)),
        "crdc_unique_school_ids": int(ap["COMBOKEY"].nunique()),
        "enrollment_matched": int((merged["merge_enrollment"] == "both").sum()),
        "characteristics_matched": int((merged["merge_characteristics"] == "both").sum()),
        "ccd_matched": int((merged["merge_ccd"] == "both").sum()),
        "ccd_unmatched": int((merged["merge_ccd"] == "left_only").sum()),
        "ccd_match_rate": float((merged["merge_ccd"] == "both").mean()),
    }

    hs = merged.loc[merged["G_12_OFFERED"].eq("Yes")].copy()
    hs["ap_courses"] = numeric(hs["SCH_APCOURSES"])
    # -9 (not applicable/skipped) is interpreted as no AP offering for schools
    # that otherwise offer grade 12. Other special negative codes remain missing.
    hs["ap_access"] = np.where(hs["SCH_APCOURSES"].eq(-5), np.nan, (hs["SCH_APCOURSES"] > 0).astype(float))
    hs["ap_participants"] = sum_counts(hs, ["TOT_APENR_M", "TOT_APENR_F", "TOT_APENR_X"])
    hs["total_enrollment"] = sum_counts(hs, ["TOT_ENR_M", "TOT_ENR_F", "TOT_ENR_X"])
    hs["el_enrollment"] = sum_counts(hs, ["TOT_ELENR_M", "TOT_ELENR_F", "TOT_ELENR_X"])
    hs["idea_enrollment"] = sum_counts(hs, ["TOT_IDEAENR_M", "TOT_IDEAENR_F", "TOT_IDEAENR_X"])

    for label, code in RACE_CODES.items():
        slug = code.lower()
        hs[f"enr_{slug}"] = sum_counts(hs, [f"SCH_ENR_{code}_M", f"SCH_ENR_{code}_F", f"SCH_ENR_{code}_X"])
        hs[f"ap_{slug}"] = sum_counts(hs, [f"SCH_APENR_{code}_M", f"SCH_APENR_{code}_F", f"SCH_APENR_{code}_X"])

    hs["ap_participation_rate"] = np.where(
        hs["total_enrollment"] > 0, hs["ap_participants"] / hs["total_enrollment"], np.nan
    )
    hs["pct_el"] = np.where(hs["total_enrollment"] > 0, hs["el_enrollment"] / hs["total_enrollment"], np.nan)
    hs["pct_idea"] = np.where(hs["total_enrollment"] > 0, hs["idea_enrollment"] / hs["total_enrollment"], np.nan)
    for code in RACE_CODES.values():
        hs[f"pct_{code.lower()}"] = np.where(
            hs["total_enrollment"] > 0, hs[f"enr_{code.lower()}"] / hs["total_enrollment"], np.nan
        )

    hs["charter"] = hs["CHARTER_TEXT"].eq("Yes").astype(int)
    hs["virtual"] = hs["SCH_VIRT_IND"].eq("Yes").astype(int)
    hs["district_key"] = hs["LEA_STATE"].astype(str) + "-" + hs["LEAID"].astype(str)

    audit.update({
        "grade_12_school_rows": int(len(hs)),
        "states_and_jurisdictions": int(hs["LEA_STATE"].nunique()),
        "ap_access_known": int(hs["ap_access"].notna().sum()),
        "ap_access_missing": int(hs["ap_access"].isna().sum()),
        "enrollment_known": int(hs["total_enrollment"].notna().sum()),
        "ap_participant_count_known": int(hs["ap_participants"].notna().sum()),
    })
    return hs, audit


def aggregate_summary(df: pd.DataFrame, by: list[str]) -> pd.DataFrame:
    def summarize(g: pd.DataFrame) -> pd.Series:
        n = g["ap_access"].notna().sum()
        successes = g["ap_access"].fillna(0).sum()
        lo, hi = wilson_interval(successes, n)
        total_enr = g["total_enrollment"].sum(min_count=1)
        ap_students = g["ap_participants"].sum(min_count=1)
        return pd.Series({
            "schools": len(g),
            "schools_with_known_access": n,
            "schools_with_ap": successes,
            "ap_access_rate": successes / n if n else np.nan,
            "access_ci_low": lo,
            "access_ci_high": hi,
            "total_enrollment": total_enr,
            "ap_participants": ap_students,
            "ap_participation_rate": ap_students / total_enr if total_enr else np.nan,
            "ccd_match_rate": g["NCESSCH"].notna().mean(),
        })
    return df.groupby(by, dropna=False).apply(summarize, include_groups=False).reset_index()


def subgroup_summary(df: pd.DataFrame) -> pd.DataFrame:
    rows = []
    for label, code in RACE_CODES.items():
        enr = df[f"enr_{code.lower()}"] .sum(min_count=1)
        ap = df[f"ap_{code.lower()}"] .sum(min_count=1)
        rows.append({"group": label, "enrollment": enr, "ap_participants": ap})
    out = pd.DataFrame(rows)
    out["enrollment_share"] = out["enrollment"] / out["enrollment"].sum()
    out["ap_share"] = out["ap_participants"] / out["ap_participants"].sum()
    out["representation_gap_pp"] = (out["ap_share"] - out["enrollment_share"]) * 100
    return out


def fit_model(df: pd.DataFrame, bootstrap_reps: int = 150) -> tuple[pd.DataFrame, dict]:
    predictors = ["log_enrollment", "pct_hi", "pct_bl", "pct_as", "pct_el", "pct_idea", "charter", "virtual"]
    labels = {
        "log_enrollment": "School enrollment (log, +1 SD)",
        "pct_hi": "Hispanic enrollment share (+1 SD)",
        "pct_bl": "Black enrollment share (+1 SD)",
        "pct_as": "Asian enrollment share (+1 SD)",
        "pct_el": "English learner share (+1 SD)",
        "pct_idea": "IDEA enrollment share (+1 SD)",
        "charter": "Charter school (yes vs. no)",
        "virtual": "Virtual school (yes vs. no)",
    }
    model_df = df.copy()
    model_df["log_enrollment"] = np.log1p(model_df["total_enrollment"])
    model_df = model_df.loc[
        (model_df["total_enrollment"] >= 50) & model_df["ap_access"].notna(),
        predictors + ["ap_access", "LEA_STATE"],
    ].dropna()

    continuous = predictors[:6]
    scaler = StandardScaler().fit(model_df[continuous])
    X = model_df[predictors].copy()
    X[continuous] = scaler.transform(X[continuous])
    y = model_df["ap_access"].astype(int).to_numpy()
    base = LogisticRegression(C=1e6, max_iter=2000, solver="lbfgs").fit(X, y)
    base_coef = base.coef_[0]

    rng = np.random.default_rng(20261026)
    states = model_df["LEA_STATE"].unique()
    boot = []
    state_values = model_df["LEA_STATE"].to_numpy()
    for _ in range(bootstrap_reps):
        sampled = rng.choice(states, size=len(states), replace=True)
        counts = pd.Series(sampled).value_counts()
        weights = pd.Series(state_values).map(counts).fillna(0).to_numpy()
        if weights.sum() == 0:
            continue
        try:
            m = LogisticRegression(C=1e6, max_iter=1200, solver="lbfgs").fit(X, y, sample_weight=weights)
            boot.append(m.coef_[0])
        except Exception:
            continue
    boot_arr = np.asarray(boot)
    low = np.quantile(boot_arr, 0.025, axis=0)
    high = np.quantile(boot_arr, 0.975, axis=0)

    results = pd.DataFrame({
        "term": predictors,
        "label": [labels[p] for p in predictors],
        "odds_ratio": np.exp(base_coef),
        "ci_low": np.exp(low),
        "ci_high": np.exp(high),
    })
    meta = {
        "model_n": int(len(model_df)),
        "bootstrap_reps_completed": int(len(boot_arr)),
        "outcome": "School offers at least one AP course",
        "model": "School-level logistic regression with state-cluster bootstrap confidence intervals",
        "interpretation": "Associational, not causal",
    }
    return results, meta


def sensitivity_summary(df: pd.DataFrame) -> pd.DataFrame:
    scenarios = []

    def add(name: str, mask: pd.Series, access: pd.Series):
        valid = mask & access.notna()
        n = int(valid.sum())
        rate = float(access[valid].mean()) if n else np.nan
        lo, hi = wilson_interval(float(access[valid].sum()), n) if n else (np.nan, np.nan)
        scenarios.append({"scenario": name, "schools": n, "ap_access_rate": rate, "ci_low": lo, "ci_high": hi})

    add("Primary: grade 12 offered", pd.Series(True, index=df.index), df["ap_access"])
    add("CCD school level = High", df["LEVEL"].eq("High"), df["ap_access"])
    add("Enrollment at least 100", df["total_enrollment"].ge(100), df["ap_access"])
    # Schools with no AP course are assigned zero AP participants; schools that
    # offer AP but have unavailable participant counts remain missing.
    participant_count = df["ap_participants"].where(df["ap_access"].ne(0), 0)
    alternative = (participant_count > 0).astype(float).where(participant_count.notna())
    add("Alternative outcome: at least one AP participant", pd.Series(True, index=df.index), alternative)
    return pd.DataFrame(scenarios)


def build_dictionary() -> pd.DataFrame:
    rows = [
        ("school_id", "NCES school identifier", "CRDC COMBOKEY / CCD NCESSCH", "String, zero-padded to 12 digits"),
        ("lea_state", "State or jurisdiction abbreviation", "CRDC LEA_STATE", "As reported"),
        ("lea_name", "Local education agency name", "CRDC LEA_NAME", "As reported"),
        ("school_name", "School name", "CRDC SCH_NAME", "As reported"),
        ("grade_12_offered", "School offers grade 12", "CCD G_12_OFFERED", "Analysis universe requires Yes"),
        ("ap_access", "School offers at least one AP course", "CRDC SCH_APCOURSES", "1 if positive; 0 for -9 not applicable/skipped; other special codes missing"),
        ("ap_courses", "Number of AP courses offered", "CRDC SCH_APCOURSES", "Negative reserve codes converted to missing"),
        ("total_enrollment", "Total reported enrollment", "CRDC TOT_ENR_M/F/X", "Sum of nonnegative reported components"),
        ("ap_participants", "Students enrolled in one or more AP courses", "CRDC TOT_APENR_M/F/X", "Sum of nonnegative reported components"),
        ("ap_participation_rate", "AP participants divided by total enrollment", "Derived", "Descriptive; not a causal effect"),
        ("pct_hi", "Hispanic or Latino enrollment share", "CRDC SCH_ENR_HI_*", "Reported count divided by total enrollment"),
        ("pct_bl", "Black or African American enrollment share", "CRDC SCH_ENR_BL_*", "Reported count divided by total enrollment"),
        ("pct_as", "Asian enrollment share", "CRDC SCH_ENR_AS_*", "Reported count divided by total enrollment"),
        ("pct_el", "English learner enrollment share", "CRDC TOT_ELENR_*", "Reported count divided by total enrollment"),
        ("pct_idea", "IDEA enrollment share", "CRDC TOT_IDEAENR_*", "Reported count divided by total enrollment"),
        ("charter", "Charter school indicator", "CCD CHARTER_TEXT", "1 = Yes, 0 otherwise"),
        ("virtual", "Virtual school indicator", "CRDC SCH_VIRT_IND", "1 = Yes, 0 otherwise"),
    ]
    return pd.DataFrame(rows, columns=["field", "definition", "source", "rule"])


def write_outputs():
    school, audit = build_school_file()
    state = aggregate_summary(school, ["LEA_STATE", "LEA_STATE_NAME"])
    district = aggregate_summary(school, ["LEA_STATE", "LEA_NAME", "district_key"])
    groups = subgroup_summary(school)
    model, model_meta = fit_model(school)
    sensitivity = sensitivity_summary(school)
    dictionary = build_dictionary()

    keep = [
        "COMBOKEY", "LEA_STATE", "LEA_STATE_NAME", "LEAID", "LEA_NAME", "SCHID", "SCH_NAME",
        "NCESSCH", "MCITY", "LEVEL", "G_12_OFFERED", "SCH_TYPE_TEXT", "CHARTER_TEXT", "SCH_VIRT_IND",
        "ap_access", "ap_courses", "ap_participants", "total_enrollment", "ap_participation_rate",
        "pct_hi", "pct_bl", "pct_as", "pct_el", "pct_idea", "merge_ccd",
    ]
    clean = school[keep].rename(columns={
        "COMBOKEY": "school_id", "LEA_STATE": "state", "LEA_STATE_NAME": "state_name",
        "LEAID": "lea_id", "LEA_NAME": "lea_name", "SCHID": "school_local_id", "SCH_NAME": "school_name",
        "NCESSCH": "ccd_school_id", "MCITY": "city", "G_12_OFFERED": "grade_12_offered",
        "SCH_TYPE_TEXT": "school_type", "CHARTER_TEXT": "charter_status", "SCH_VIRT_IND": "virtual_status",
        "merge_ccd": "ccd_merge_status",
    })

    national_n = school["ap_access"].notna().sum()
    national_success = school["ap_access"].sum(skipna=True)
    national_lo, national_hi = wilson_interval(national_success, national_n)
    total_enr = school["total_enrollment"].sum(min_count=1)
    total_ap = school["ap_participants"].sum(min_count=1)
    national = {
        "schools": int(len(school)),
        "schools_with_known_access": int(national_n),
        "schools_with_ap": int(national_success),
        "ap_access_rate": float(national_success / national_n),
        "access_ci_low": float(national_lo),
        "access_ci_high": float(national_hi),
        "total_enrollment": int(total_enr),
        "ap_participants": int(total_ap),
        "ap_participation_rate": float(total_ap / total_enr),
    }

    outputs = {
        "ap_access_school_level.csv": clean,
        "ap_access_state_summary.csv": state,
        "ap_access_district_summary.csv": district,
        "ap_equity_group_summary.csv": groups,
        "model_results.csv": model,
        "sensitivity_analysis.csv": sensitivity,
        "data_dictionary.csv": dictionary,
    }
    for name, frame in outputs.items():
        frame.to_csv(DATA / name, index=False)
        frame.to_csv(DOWNLOADS / name, index=False)

    audit_out = {**audit, **model_meta, "national": national}
    (DATA / "audit_and_model_metadata.json").write_text(json.dumps(audit_out, indent=2), encoding="utf-8")
    (DOWNLOADS / "audit_and_model_metadata.json").write_text(json.dumps(audit_out, indent=2), encoding="utf-8")

    dashboard = {
        "national": national,
        "audit": audit,
        "model_meta": model_meta,
        "states": state.replace({np.nan: None}).to_dict(orient="records"),
        "districts": district.replace({np.nan: None}).to_dict(orient="records"),
        "groups": groups.replace({np.nan: None}).to_dict(orient="records"),
        "model": model.replace({np.nan: None}).to_dict(orient="records"),
        "sensitivity": sensitivity.replace({np.nan: None}).to_dict(orient="records"),
    }
    (DIST / "dashboard_data.js").write_text("window.DASHBOARD_DATA = " + json.dumps(dashboard) + ";\n", encoding="utf-8")

    pipeline = f"""# Pipeline documentation\n\n## Sources\n- 2023-24 Civil Rights Data Collection: Advanced Placement, Enrollment, and School Characteristics files.\n- 2023-24 NCES Common Core of Data Public School Directory.\n\n## Identifier and joins\n- CRDC `COMBOKEY` and CCD `NCESSCH` were standardized as zero-padded 12-character strings.\n- CRDC AP, enrollment, and school-characteristic files were joined one-to-one on `COMBOKEY`.\n- The combined CRDC file was left-joined to CCD on `COMBOKEY = NCESSCH`.\n- CCD match rate: {audit['ccd_match_rate']:.1%} ({audit['ccd_matched']:,} matched; {audit['ccd_unmatched']:,} unmatched CRDC school records).\n\n## Universe\n- Primary universe: {len(school):,} schools matched to CCD that report offering grade 12.\n- AP access: at least one reported AP course. In the grade-12 universe, CRDC -9 (not applicable/skipped) is treated as no AP offering; -5 and other exceptional codes remain missing.\n\n## Special values and missingness\nThe CRDC manual defines negative reserve codes, including -5 action plan, -6 force certified, -7 indeterminable, -9 not applicable/skipped, -10 executive-order suppression, -11 data-quality suppression, and -13 missing skip logic. Negative values are not treated as student counts. For totals, nonnegative reported components are summed and unavailable components are omitted; this can understate counts when a component is suppressed.\n\n## Model\n- Outcome: school offers at least one AP course.\n- Predictors: log enrollment, Hispanic share, Black share, Asian share, English learner share, IDEA share, charter status, and virtual status.\n- Continuous predictors are standardized; reported odds ratios correspond to a one-standard-deviation increase.\n- Confidence intervals use {model_meta['bootstrap_reps_completed']} state-cluster bootstrap replications.\n- Associations are descriptive and must not be interpreted causally.\n\n## Reproducibility\nRun `analysis.py` from the `analysis` directory after placing the four source files in `raw/`. The script recreates every downloadable table and the dashboard data object.\n"""
    (DOWNLOADS / "pipeline_documentation.md").write_text(pipeline, encoding="utf-8")
    shutil.copy2(Path(__file__), DOWNLOADS / "analysis.py")

    print(json.dumps({"audit": audit, "national": national, "model_meta": model_meta}, indent=2))


if __name__ == "__main__":
    write_outputs()
