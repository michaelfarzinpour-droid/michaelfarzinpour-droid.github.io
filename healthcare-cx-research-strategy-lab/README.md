# Healthcare CX Research & Strategy Lab 2.0

**Independent, fictional, offline interactive portfolio work sample. Not commissioned by or affiliated with Cencora. No patient records or actual customer interviews.**

Open `index.html` in a modern browser. The six original modules are expanded with research intake fields, response-rate and budget planning, three fictional customer personas and their journey maps, exploratory uncertainty and an adjusted regression, five invented qualitative coding exercises, a weighted stakeholder decision matrix, and an executive report that reflects the chosen inputs.

The downloadable `synthetic_cx_survey.csv` (600 rows) is synthetic. `synthetic_interview_themes.csv` (24 entries) contains fabricated themes; it does not reflect fieldwork. The dashboard's confidence intervals are mathematical demonstrations and do not characterize a sampled real population.

## Reproducible evidence

Run `python validate_analysis.py` (Python standard library only) to calculate pooled and subgroup counts, means and approximate 95% intervals. See `methodology_appendix.md` for equations, limitations, and audit notes.

## Contents

- `index.html`: self-contained interactive six-module experience
- `research_plan.md`, `survey_instrument.md`, `interview_guide.md`, `qualitative_codebook.md`: research artifacts
- `methodology_appendix.md`: data provenance, inferential assumptions, and limitations
- `executive_brief.md`, `analysis_notes.md`: interpretive templates
- `synthetic_cx_survey.csv`, `synthetic_interview_themes.csv`: fictional evidence inputs
- `validate_analysis.py`: independently executable descriptive analysis

**Share responsibly:** When describing this project in applications, say that it demonstrates research approach and decision-making using deliberately synthetic evidence, not actual customer outcomes or measured business impact.