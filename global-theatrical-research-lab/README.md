# Global Theatrical Audience & Creative Strategy Lab — Extended Edition

Independent fictional portfolio simulation, not affiliated with Sony Pictures or any other studio. Open `index.html` in a local browser or deploy this **entire directory** to a static host such as GitHub Pages. No backend or credentials are needed.

## Modules
Original dashboard: audience segmentation, creative testing, tracking, scenario forecasting, operations, executive brief and methods. New additions: qualitative focus-group diagnostics, a vendor/fieldwork decision lab, and a separate respondent-level reproducibility companion.

**Important:** Original modules show curated illustrative scenario percentages with no supporting respondent records. The new Evidence module explicitly presents a *separate* synthetic companion study whose results derive from reproducible CSVs. Do not claim the two sets of numbers are one coherent fielded study.

## Reproduction
- Python 3 standard library only: `python analysis/generate_data.py` regenerates public-deployment synthetic microdata from the frozen one-decimal aggregate targets. This reconstruction is distinct from the stochastic generator in the original downloaded ZIP.
- `python analysis/reproduce_analysis.py` confirms counts, percentages, differences and approximate CI bounds.
- Tracking: 9,600 reconstructed synthetic records; creative test: 2,400 reconstructed synthetic records. Values are illustrative and generated to agree with published summary margins.
- Data files and research protocols in `data/` and `research_docs/`.
- Read `research_docs/executive_narrative.md` for the public executive strategy readout. The 11-slide PowerPoint remains in the complete ZIP shared in the conversation, not on this public site.\n
## Publication
Copy the **whole** directory into the GitHub Pages repository under `global-theatrical-research-lab/`, then link the new URL in your portfolio home page. The ZIP is also directly deployable after extraction. No Sony branding or proprietary content is included.
## Public-deployment provenance
The public CSVs are deterministic aggregate-matched synthetic reconstructions. They preserve the published scenario rates, intervals, and segment margins but **are not row-for-row copies** of the original stochastic synthetic data in the complete ZIP. This distinction matters for replication and interpretation. They contain no actual study participants.
