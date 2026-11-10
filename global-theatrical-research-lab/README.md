# Global Theatrical Audience & Creative Strategy Lab — Extended Edition

Independent fictional portfolio simulation, not affiliated with Sony Pictures or any other studio. Open `index.html` in a local browser or deploy this **entire directory** to a static host such as GitHub Pages. No backend or credentials are needed.

## Modules
Original dashboard: audience segmentation, creative testing, tracking, scenario forecasting, operations, executive brief and methods. New additions: qualitative focus-group diagnostics, a vendor/fieldwork decision lab, and a separate respondent-level reproducibility companion.

**Important:** Original modules show curated illustrative scenario percentages with no supporting respondent records. The new Evidence module explicitly presents a *separate* synthetic companion study whose results derive from reproducible CSVs. Do not claim the two sets of numbers are one coherent fielded study.

## Reproduction
- Python 3 standard library only: `python analysis/generate_data.py` regenerates synthetic records and summary (fixed RNG seed 20261110).
- `python analysis/reproduce_analysis.py` confirms counts, percentages, differences and approximate CI bounds.
- Tracking: 9,600 generated records; creative test: 2,400 independent synthetic records.
- Data files and research protocols in `data/` and `research_docs/`.
- Download `Project_Horizon_Executive_Readout.pptx` for an 11-slide illustrative executive presentation.

## Publication
Copy the **whole** directory into the GitHub Pages repository under `global-theatrical-research-lab/`, then link the new URL in your portfolio home page. The ZIP is also directly deployable after extraction. No Sony branding or proprietary content is included.