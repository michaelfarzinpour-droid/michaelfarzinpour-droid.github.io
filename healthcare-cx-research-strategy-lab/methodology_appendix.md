# Methodology and Validity Appendix — Version 2.0

## Data provenance
The survey file was generated for a fictional B2B healthcare distribution setting. Each of 600 rows represents a synthetic contact, not a confirmed independent customer organization. Segment, region, portal-issue flag, delivery-delay flag, first-contact-resolution flag, satisfaction (1–5), ease (1–7), recommendation (0–10), and primary friction are simulated. The 24 qualitative theme entries are fabricated and are **not** verbatim interviews. Persona statements and journey scores are design hypotheses. No patient records are used.

## Learning goals and analytical choices
The interactive lab illustrates how to define an actionable decision, plan recruitment, compare evidence sources, represent journey hypotheses, interpret uncertainty, classify feedback, challenge group priorities, and form a bounded pilot recommendation. The analysis is not a real market estimate or enterprise evaluation.

### Descriptive uncertainty
A mean is the arithmetic mean across eligible filtered records. The displayed illustrative 95% normal-approximation confidence interval is `mean ± 1.96 * (sample SD / sqrt(n))`, with sample SD calculated using `n−1`. The difference interval is `difference ± 1.96 * sqrt(SE1² + SE0²)`. These calculations assume independent observations and sufficient sample sizes. Because the data are synthesized, the intervals do **not** quantify uncertainty from a real probability sample. They are additionally invalid as design-based population intervals if real respondents were clustered within organizations or recruited with unknown selection probabilities.

### Adjusted model
Ordinary least squares estimates an intercept and binary indicators for portal issue, delivery delay, first-contact resolution, three segment indicators (reference: Independent pharmacy), and two region indicators (reference: West). The coefficient shown is an association, not a treatment effect. There are no robust or cluster-adjusted standard errors, sampling weights, interaction terms, measurement-error corrections, or identification assumptions supporting causal claims. Singular subsets return 'unavailable'. A filtered result can alter associations; do not cherry-pick. Sensitivity mode 'Remove extreme outcome values' conditions on the dependent variable and is therefore a **stress test**, not a recommended unbiased primary analysis.

### Survey precision planner
The nominal 95% worst-case percentage margin of error is `1.96 * sqrt(0.25/n) * 100`, applicable only to simple random sampling under textbook assumptions. Invitations are `ceil(target_complete / response_rate)`. The sample budget illustrates variable costs of $35 per completed survey and $450 per interview. The displayed costs are placeholders, not sourced vendor quotes or full-cost budgets. No formal power analysis is included.

### Qualitative coding
Five invented excerpts have demonstration primary codes. Coding choices are not validated by real coders; seek disconfirming cases and document disagreement. Theme mention counts must not be used as customer prevalence.

### Journey and stakeholder scoring
Three personas and stage-specific effort scores are fictional. Stakeholder matrix values are scenario assumptions scored 1–5 for customer value, feasibility, and risk control. The weighting presets are illustrative, not empirically calibrated. Priority points are a facilitation exercise, not a monetary budget. Stakeholder dissent should be retained in the decision record.

### Pilot evaluation
Randomized assignment may be stronger if feasible and if account-level contamination, noncompliance, and sufficient power are addressed. A phased rollout may be analyzed with a comparison group but requires careful checks of baseline imbalance and time trends. Pre/post change is particularly vulnerable to confounding. Pre-specify primary outcomes, analysis window, inclusion rules, stop conditions and data governance. Neither financial ROI nor true effects can be demonstrated in this lab.

## Open risks and future validation
Before a real-world study: confirm stakeholder needs and research permissions; secure sampling frame; document organizational clustering; review consent, accessibility, privacy, and procurement; conduct interviews and observe tasks; test survey instruments; check response propensity and subgroup representation; complete a power analysis; reconcile operational telemetry; obtain approvals for interventions.