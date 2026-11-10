# Project Horizon — Synthetic research protocol

**Status:** Independent fictional teaching simulation. No participants recruited, no studios or vendors involved. The main interactive dashboard contains hand-authored hypothetical scenario values. The separately labeled reproducible companion study is generated from deterministic synthetic respondent-level records. The two are not one integrated empirical study.

## Business decisions
Evaluate (1) which audience segments warrant diagnostic research, (2) whether trailer B merits local re-testing, (3) when localization or vendor risks should block reporting, (4) how to communicate uncertainty to senior marketing leaders.

## Reproducible companion sampling
Five constructed markets: US/Canada, UK, Mexico, Germany, Japan. Four independently generated tracking waves T−8, T−6, T−4, and T−2 weeks; 480 records per market per wave (9,600). Each wave assigns 120 records to each of four mutually exclusive *constructed* segment labels. Age bands are simulated. Separately, a 2,400-record creative dataset assigns exactly 240 simulated observations to each of trailers A and B per market, with no real-world experimental treatment or recruitment. Researcher-set probabilities produce the synthetic responses; these are not measured market parameters.

## Measures
Awareness, interest and definite ticket intent are binary 0/1 indicators; creative test has one binary definite-intent outcome and a simulated concept-clarity item (1–5). Age and segment are illustrative categorical attributes. No film attendance or box-office result exists in the data.

## Analysis and interpretation
Compute proportions per market/wave and creative cell. Calculate B−A difference in percentage points and an approximate 95% interval using SE=sqrt(pA(1−pA)/nA + pB(1−pB)/nB). Intervals are unadjusted and should not be treated as definitive evidence under multiple market tests. No weights, clustering, nonresponse adjustment, screening exclusions, media-plan exposure, or cross-market measurement-equivalence testing has been implemented. Report effect sizes, interval bounds, and limitations; avoid equating stated intent with tickets sold.

## QA and reproducibility
`analysis/generate_data.py` is seeded (20261110); `analysis/reproduce_analysis.py` recomputes all displayed companion metrics and validates them. Execute `python analysis/reproduce_analysis.py` from the project directory. IDs are fictional; data contain no personal information.

## Proposed *real study* improvements
Document target universes, screeners, quotas and vendor feasibility, materiality thresholds, power analysis, primary outcomes, preregistered contrasts, translation and cognitive debriefing, respondent verification, sample weighting and sensitivity checks, multiplicity policy, stimulus randomization and exposure conditions, then decision and sign-off owners. None of those steps should be claimed as executed on real respondents here.