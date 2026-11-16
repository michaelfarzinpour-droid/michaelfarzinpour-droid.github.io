# Community Health Outcomes & Evaluation Leadership Lab

## Disclosure and purpose
Independent portfolio simulation prepared by Michael Farzinpour (2026). **All guest-level records, sites, staffing and budget scenarios, data relationships, outcome rates and findings are fictional and synthetic.** No NHF-owned data, patient information or private information were used. The lab is not affiliated with, approved by, endorsed by, or an evaluation of National Health Foundation (NHF).

## Evaluation questions
1. What proportion of synthetic discharged guests have a generated stable-housing outcome 30 days after discharge?
2. How does the illustrative housing-readiness score change between baseline and discharge, among complete cases?
3. How complete and interpretable are the underlying process and outcome measures?
4. What oversight, data-governance and stakeholder engagement decisions are needed to support credible program evaluation?

## Data-generating process
- `build.py` generates exactly 720 fictional episode rows using Python `random.Random(20261115)`.
- Four invented program sites: Harbor, Canyon, Mesa, Grove. Four quarterly labels (Q1–Q4) with **no actual calendar year or dates**.
- Baseline complexity is sampled from Lower, Moderate and Higher groups.
- Baseline score is generated from a complexity-dependent normal distribution, bounded to 5–82.
- Length of stay depends on baseline complexity and site-specific offsets, with random variation and truncation to 3–89 days.
- Discharge-score change is generated from length of stay, baseline score and noise, then bounded. The illustrative score is *not* NHF's Housing Path Score calculation and has not been validated.
- Generated stable housing probability depends on length of stay, baseline score, complexity and site. Binary status is not verified against real records.
- Score missingness is deliberately dependent on complexity and site; therefore complete-case estimates may be biased.
- Outreach attempt, confirmed follow-up, housing navigation and short feedback labels are generated artificially.

## Indicators
| Indicator | Operational numerator / calculation | Denominator | Caution |
|---|---|---|---|
| Stable housing status | Count of rows with `stable_housing_30d == 1` | All selected synthetic episodes | Generated illustrative status, not externally validated; no unknown category |
| Mean score change | Arithmetic mean of `discharge_hps - baseline_hps` | Rows with observed discharge score | Complete-case only; fictional proxy score |
| Discharge-score completeness | Count with `discharge_hps_observed == 1` | All selected synthetic episodes | Missingness may be related to case complexity and site |
| Confirmed follow-up | Count with `followup_confirmed == 1` | All selected synthetic episodes | Defined independently from outreach attempt |
| Navigation exposure | Count with `housing_navigation == 1` | All selected synthetic episodes | Indicates generated service record, not effectiveness |

## Data dictionary
| Field | Description |
|---|---|
| `id` | Synthetic episode identifier, unique and non-identifying |
| `site` | Invented program site label |
| `quarter` | Fictional quarter label |
| `complexity` | Simulated baseline case-complexity grouping |
| `baseline_hps` | Invented baseline housing-readiness proxy, not NHF's HPS |
| `stay_days` | Simulated episode length in days |
| `stay_group` | `<30`, `30–59`, or `60–89` days |
| `discharge_hps` | Invented discharge score, blank if missing |
| `discharge_hps_observed` | 1 if discharge score observed, else 0 |
| `stable_housing_30d` | Synthetic binary housing-status flag at 30 days |
| `followup_contact_attempted` | Synthetic contact attempt flag |
| `followup_confirmed` | Synthetic confirmed follow-up flag |
| `housing_navigation` | Synthetic navigation service flag |
| `guest_feedback` | Simulated qualitative utterance selected from an authored list, not real guest testimony |

## Interpretation and limitations
All comparisons are descriptive and unadjusted; there are no causal program effect estimates. Length-of-stay associations are mechanically influenced by the synthetic generating model. The simulated data have no comparison group, clinical validation, claims linkage, outcomes adjudication, independent audit or participant consent process because there are no participants. Consequently no program effectiveness or cost avoidance can be inferred. Site-level differences should not be treated as rankings. For genuine use, determine suitable IRB/oversight and applicable privacy, funding and security obligations before accessing confidential data. Define primary metrics with program and guest input and pre-specify subgroup suppression rules.

## Public sources for inspiration (not for simulation parameters)
- National Health Foundation, Housing: https://nationalhealthfoundation.org/community-initiatives/housing/
- National Health Foundation, Recuperative care program services: https://nationalhealthfoundation.org/recuperative-care/program-services/
- National Health Foundation, "Healing Takes Time": https://nationalhealthfoundation.org/healing-takes-time-why-flexible-recuperative-care-is-key-to-calaims-success/
- National Health Foundation, Food access: https://nationalhealthfoundation.org/community-initiatives/food-access/

## How to run
Open `index.html` in a modern browser. The embedded data power the dashboard without any backend or external JavaScript. Keep `synthetic_guest_records.csv` and `methods_and_data_dictionary.md` next to `index.html` for the download links. Use `build.py` to regenerate the dataset from the fixed seed; rerun the included packaging process to re-embed the records if changing the generator.

## Recommended portfolio framing
"Designed an independent, six-module, synthetic community-health evaluation leadership lab using 720 fictional guest episodes. Demonstrated outcome specification, data-quality monitoring, noncausal interpretation of length-of-stay associations, six executive decision scenarios, and a 30/60/90-day evaluation rollout plan. Informed by publicly available nonprofit service descriptions; not affiliated with any organization."

## Version 2.0 extension: statistical analysis

The Advanced Analysis Studio compares either (a) stay duration under 30 days against 60–89 days, excluding the 30–59-day middle group, or (b) housing navigation not documented against documented. The primary result is a synthetic binary outcome: generated day-30 housing status or confirmed follow-up. For each group, it reports the observed proportion and a two-sided 95% Wilson score interval (normal z=1.959964). The raw difference is second-group rate minus first-group rate in percentage points. These intervals describe simple independent-binomial uncertainty and do not account for site clustering, repeat guests, or selection; the simulator intentionally does not assign p-values to causal hypotheses.

For **descriptive case-mix standardization**, the tool calculates baseline-complexity-specific rates in Lower, Moderate and Higher strata, weights each rate by the combined frequency distribution of baseline complexity among the two comparison groups, and takes the weighted sum. This standardization only adjusts for the three-level synthetic case-complexity variable; it does not control for other factors or establish treatment effects. If either group has no observations within a stratum, standardized results are shown as not estimable.

For the missing discharge-score sensitivity illustration, the complete-case mean is compared to a simplified scenario mean in which each missing score is assigned a hypothetical *gain* of −5, 0, 5 or 10 score points. These are not empirically justified imputations, validated bounds or a formal missing-not-at-random model. They illustrate how conclusions change with assumptions. Raw records remain unchanged.

## Version 2.0 extension: organizational strategy

The Strategy module contains four fictional workstreams (recuperative care, housing navigation, food access and shared governance). Editable budget allocations are assessed against an illustrative $150,000/$200,000/$250,000 planning envelope, fictitious per-workstream threshold budgets of $65,000/$55,000/$35,000/$45,000 and an illustrative staffing capacity of 1.0/1.5/2.0 FTE. Each FTE is assumed to make 1,400 project hours available annually. Threshold staffing hours by workstream are 1,050/900/600/700, scaled linearly by budget fraction up to the threshold. All figures are pedagogical examples, not estimates of actual program implementation requirements, NHF budgets or operational efficiency. Planning decisions change readiness labels, over-budget flags, hours forecasts and strategy text; they do not modify synthetic observed health outcomes.

The quality module also supports a record-level missing-score action log. It surfaces the first 12 filtered records with missing discharge HPS, records the selected follow-up action and exports the actions without overwriting the underlying synthetic records or making unsupported assertions about repaired missing values.