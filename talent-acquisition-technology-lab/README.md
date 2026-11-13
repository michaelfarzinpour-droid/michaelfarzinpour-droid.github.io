# Talent Acquisition Technology Research & Market Intelligence Lab

**Independent portfolio work sample — Michael Farzinpour, PhD — November 2026**

## Launch

Open `index.html` in any modern browser. The page is self-contained, works offline, and does not upload data or make API calls. There is no build step. The website includes survey filters, raw/standardized comparisons, technology taxonomy, fictional vendor evidence review, bottom-up market-sizing scenario, AI investment ROI calculator, a decision memo, and download controls.

For GitHub Pages: add all files to a GitHub repository and enable Pages from the main branch/root; the public page will load `index.html`. The separate CSV, JSON, Python and Markdown files are reproducibility artifacts. There is no claim that this project has already been published online.

## Data provenance

**All 1,200 firm records are synthetic.** The data were generated with Python `random.seed(20261112)` from a documented probabilistic process. No SIA, Bullhorn, customer, applicant, or actual staffing firm microdata are used. The vendor archetypes, market counts, prices, screening claims, ROI inputs, and executive decisions are fictional training scenarios. The real Bullhorn 2026 report is cited as background only—not imported as firm data nor independently verified here.

## Reproduce results

From the project folder run `python analyze.py` (no third-party packages). This replicates the full-sample and complete-response-group raw and stratified binary growth differences. The self-contained HTML embeds the same JSON records and recomputes results when filters change. `synthetic_staffing_survey.csv` is the exportable dataset; `synthetic_staffing_survey.json` is the UI source. Use the generator script `generate_data.py` to regenerate the data with the same seed.

| Synthetic descriptive output | Full sample | Complete responses only |
|---|---:|---:|
| Records | 1,200 | 989 |
| AI adoption | 605 / 1,200 | 508 / 989 |
| Raw growth difference (AI − no AI) | +9.42 pp | +9.03 pp |
| Size- and maturity-standardized difference | +2.80 pp | +2.69 pp |

Differences are **descriptive, not causal**. The simulation purposefully makes technology maturity predict adoption and reported growth; other unobserved relationships and a small AI term are also built into the generator. These values are *not* empirical staffing-industry effect sizes.

## Design notes

- Six navigation areas correspond to five substantive modules plus documentation.
- Filtered raw differences use the within-group proportions of reported revenue growth.
- The standardized difference averages within-stratum rate differences across firm-size × maturity levels, weighting by the pooled stratum sample size. Strata without both groups are excluded and counted.
- Missing-response flag is illustrative; complete-case results can be compared with all-record results. Data are not probability sampled, weighted, imputed, or drawn from actual respondents.
- The market sizing model gives a hypothetical annual seat-licensing spending envelope, not a validated total addressable market.
- The first-year ROI includes only modeled labor contribution and direct license + implementation costs. It omits displacement, hiring, financing, opportunity costs, taxes, retention, error remediation, and regulatory risk; so a positive ROI is not investment advice.
- The vendor matrix presents **fictional suppliers** and unverified **fictional claims**, designed for research judgment practice.

## Files

- `index.html`: working portfolio app (all JavaScript and CSS embedded)
- `synthetic_staffing_survey.csv` / `.json`: reproducible fictional firm observations
- `generate_data.py`: deterministic synthetic data generator
- `analyze.py`: Python-standard-library data validation and descriptive analysis
- `methodology.md`: methods, key limitations and source register
- `executive_brief.md`: research-to-decision writing sample
- `README.md`: setup and disclosure

## External context

Bullhorn, *GRID 2026 Industry Trends Report*, https://www.bullhorn.com/grid/2026-industry-trends/report/ (vendor-authored, observational survey reporting; nearly 2,300 recruitment professionals). Bullhorn press release, February 25, 2026: https://www.bullhorn.com/news-and-press/press-releases/bullhorn-grid-report-staffing-firms-using-ai-see-stronger-growth-faster-placements/.

**No affiliation** with Staffing Industry Analysts, Bullhorn or the fictional vendors is implied.