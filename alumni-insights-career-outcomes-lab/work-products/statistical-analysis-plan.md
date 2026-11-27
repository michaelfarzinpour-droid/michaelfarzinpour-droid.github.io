# Statistical analysis plan
All alumni data are synthetic. The demonstration is not a real evaluation or a preregistered protocol.
## Design
Population: 2,400 fictional CRM IDs; annual snapshots 2024–2026. Random invitation assigned at generation by a seeded Bernoulli draw. The generated employment probabilities intentionally vary by assignment, baseline status and annual period.
Primary endpoint: annual employment, using selected year as scenario; a real trial would prespecify one primary follow-up before analysis.
Secondary: leadership activity, service uptake, survey satisfaction; exploratory.
## Analysis
Join CRM ID to career and survey ID-year using left joins. Preserve missingness. Check uniqueness, ranges, missingness and group denominators.
Report observed outcome rates and Wilson 95% intervals. Compare assignment groups rather than uptake groups. Calculate baseline employment difference and standardized mean difference. Report follow-up by arm. Observed-case difference and approximate independent-binomial interval are not full ITT estimates under missingness.
Worst-case ITT bounds: each arm lower = observed successes / assigned N; upper = (observed successes + unknown outcomes) / assigned N. Contrast lower treated − upper control and upper treated − lower control.
Complete-case career transitions: paired IDs at 2024 and 2026; employment retention among employed at baseline and entry among not employed.
Survey post-stratification: region × entry cohort. Weight = CRM cell N/respondent n. Cells with n<5 excluded and coverage reported. Weighted estimate and effective sample size; sensitivity for missing responses. Does not remove within-cell selection.
## Reporting
Describe construction, assumptions, uncertainty and missingness. Do not infer causal impact from simulated findings or observational comparisons. Subgroups exploratory; suppress regional outcome cells <15. No automated ranking or individual predictive decision.
