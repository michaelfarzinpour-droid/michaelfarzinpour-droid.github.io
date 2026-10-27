# Pipeline documentation

## Sources
- 2023-24 Civil Rights Data Collection: Advanced Placement, Enrollment, and School Characteristics files.
- 2023-24 NCES Common Core of Data Public School Directory.

## Identifier and joins
- CRDC `COMBOKEY` and CCD `NCESSCH` were standardized as zero-padded 12-character strings.
- CRDC AP, enrollment, and school-characteristic files were joined one-to-one on `COMBOKEY`.
- The combined CRDC file was left-joined to CCD on `COMBOKEY = NCESSCH`.
- CCD match rate: 97.2% (94,382 matched; 2,712 unmatched CRDC school records).

## Universe
- Primary universe: 24,872 schools matched to CCD that report offering grade 12.
- AP access: at least one reported AP course. In the grade-12 universe, CRDC -9 (not applicable/skipped) is treated as no AP offering; -5 and other exceptional codes remain missing.

## Special values and missingness
The CRDC manual defines negative reserve codes, including -5 action plan, -6 force certified, -7 indeterminable, -9 not applicable/skipped, -10 executive-order suppression, -11 data-quality suppression, and -13 missing skip logic. Negative values are not treated as student counts. For totals, nonnegative reported components are summed and unavailable components are omitted; this can understate counts when a component is suppressed.

## Model
- Outcome: school offers at least one AP course.
- Predictors: log enrollment, Hispanic share, Black share, Asian share, English learner share, IDEA share, charter status, and virtual status.
- Continuous predictors are standardized; reported odds ratios correspond to a one-standard-deviation increase.
- Confidence intervals use 150 state-cluster bootstrap replications.
- Associations are descriptive and must not be interpreted causally.

## Reproducibility
Run `analysis.py` from the `analysis` directory after placing the four source files in `raw/`. The script recreates every downloadable table and the dashboard data object.
