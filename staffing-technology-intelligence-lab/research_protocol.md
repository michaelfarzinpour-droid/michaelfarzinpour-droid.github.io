# Proposed Staffing Technology Adoption Survey — Research Protocol

**Independent portfolio work sample | November 2026 | PROPOSED, NOT FIELDED**

## Decision purpose
Identify which technology categories staffing operators prioritize, what procurement barriers they report, and how productivity, trust, and integration outcomes should be assessed. This protocol is separate from the 360-row synthetic demonstration.

## Target population and sampling
US staffing firms, with defined eligibility (staffing revenue/activity in the prior 12 months). Identify a technology decision-maker or operations executive per firm. Treat enterprise internal recruiting teams as a different population, if included. Construct an auditable invitation frame; deduplicate at company domain and legal entity, using manual review for franchises/multi-brand firms. Stratify by number of internal employees or annual revenue (define cut points before fielding), primary staffing vertical, and region. Invite a documented number per stratum; maintain invitation source and disposition codes.

## Size and precision
For a simple 95% proportion with p=.50 and ±5 percentage points: n = 1.96² × .25 / .05² ≈ 385 completed interviews, *before* nonresponse, clustering, design effects, finite population corrections or subgroup precision. A design effect of 1.5 yields approximately 577. Real response targets require invitation-frame estimates. A convenience or opt-in sample cannot be made representative by quoting a classical margin of error. The website calculator illustrates assumptions rather than prescribing a sample size.

## Proposed instrument
Q1 role in technology procurement: final decision / evaluator / user / other; screening. Q2 staffing specialty: IT / healthcare / industrial / professional / other. Q3 firm size and geography. Q4 in-production tool categories with multiselect and 'none'. Q5 vendor stack and contract cost bands, optional/unknown. Q6 rank top three integration, cost, security, quality, training and regulatory barriers. Q7 recruiting KPIs with time frame and denominator: requisitions, submissions, placements, time-to-fill, recruiter hours. Q8 AI use cases and decision authority: assistive / automated recommendation / adverse decision / none. Q9 review, appeal and logging practices. Q10 open-text implementation challenge. Q11 follow-up interview opt-in stored separately. Pilot comprehension and skip logic with 8–12 qualified respondents before fielding; revise wording and record version changes.

## Fielding and quality assurance
Use unique invitation tokens. Never collect unnecessary applicant-level personally identifiable information. Log eligible invitations, delivered invitations, opens where lawful/appropriate, starts, completions, screen-outs and partials. Establish fraud/bot checks appropriate to risk, not arbitrary exclusions. Investigate duplicate company, inconsistent system usage, improbable timing, straight-lining and nonsensical text. Preserve raw and transformed fields and exclusion reasons. Report missingness per question and all denominators. Human-review flag decisions; do not automate rejection using unvalidated signals.

## Statistical analysis plan
Describe category adoption shares and 95% uncertainty intervals **only when sampling assumptions permit**. Present unweighted n and denominators for each cut. Pre-specify firm-size and vertical comparisons, avoid interpreting exploratory p-values as confirmatory, and report practical effect sizes. Do not estimate causal ROI from self-report correlations. Qualitative themes require a documented codebook, double-coded pilot, disagreement resolution, and illustrative quotes only with permission. If external firm-universe margins are available, assess coverage, calibrate weights with caps, publish effect of weighting and effective n; otherwise retain descriptive respondent-only reporting.

## Ethics, transparency and deliverables
Consent, confidentiality, access and retention policy; organizational-level anonymization; secure contact separation. Deliver source/disposition log, questionnaire PDF, data dictionary, analysis script, cleaned analysis data, weighted/unweighted tables, annotated charts, methods appendix, vendor interview memo and 2-page executive brief. Expose unknowns and limitations.

## Synthetic demo provenance
The website creates exactly 360 **fictional** firm rows from an LCG pseudorandom generator initialized with seed `20261108`, using illustrative group and adoption distributions. No respondent recruitment, weighting, fieldwork, response rate, statistical inference or industry estimate was performed. Reproduce via the included Python generator and compare the CSV to the website export. All results are synthetic.

## Reference context
- iHire (2026), State of Online Recruiting: https://www.ihire.com/about/press/ihires-2026-state-of-online-recruiting-report-reveals-trust-gap-between-employers-job-seekers
- Bullhorn (2026), GRID Industry Trends: https://www.bullhorn.com/grid/2026-industry-trends/report/
- American Staffing Association, definitions: https://americanstaffing.net/job-seekers/definitions-of-staffing-services/