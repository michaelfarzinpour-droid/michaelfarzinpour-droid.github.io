# Methodology and evidence register

**Status:** Independent simulated research, November 2026. Not a survey of actual staffing firms.

## Question and estimands

- Research question: does the *observed association* between AI adoption and revenue growth shrink when comparing staffing firms with similar firm size and technology maturity?
- Unadjusted descriptive estimand: P(growth | AI=1) − P(growth | AI=0).
- Stratified descriptive estimand: sum over supported size × maturity strata of [stratum proportion × (P(growth|AI=1,stratum) − P(growth|AI=0,stratum))]. The stratum proportion uses all filtered records in supported strata. Strata without both adoption groups have no common support and are omitted from the weighted denominator.
- Results are neither randomized nor causal. Do not interpret difference as AI treatment effect.

## Sampling, creation, measurement

`generate_data.py` creates 1,200 fictional firm profiles under fixed seed 20261112. Firm size, specialization and region use simple weighted or uniform choices. Technology maturity is 1–5; firms with greater maturity tend to integrate the ATS and adopt AI. The generator sets higher revenue-growth likelihood with maturity, integration and firm size, plus a small AI coefficient. This known data-generating mechanism is intentional and not estimated from an external population. Thus any apparent inference is about a **constructed illustrative population**, not the staffing market.

Binary revenue growth is 1 for an illustrative positive year and 0 otherwise; no continuous revenue, margins, sample weights or financial statements are present. A separate response-completeness flag shows data-quality handling. Non-completed cases retain core synthetic outcomes for educational sensitivity analyses but lack a fictional barrier response. Real-world nonrespondents would not normally provide these data; this is a simulation design choice.

## Data-quality and validity controls

- Unique fictional firm IDs F0001–F1200.
- Explicit integers and continuous productivity values, finite nonnegative outputs.
- Subgroup denominators shown; zero-denominator groups display N/A.
- Standardization displays unsupported strata and excluded records; filtered subgroup variation may be noisy.
- The design makes no claim of representative sampling, power, confidence intervals, inferential p-values, or external validation.
- User-selected market/ROI assumptions remain visibly hypothetical and are not treated as observed data.

## Vendor diligence checklist

For any real vendor investigation, request a product demonstration, feature definitions, security/compliance documentation, customer cohort and baseline definitions, candidate false-positive and false-negative rates, evidence of integration cost and failure modes, migration details, customer references, prices, and data ownership/extraction terms. Independently evaluate claims, rather than accepting sales narratives as research conclusions.

## Market sizing

Illustrative spend envelope = hypothetical eligible staffing firms × mean paid seats per firm × annual price per seat. This is not an estimated staffing technology TAM, and does not include unknown vendor adoption, revenue from professional services, pricing tiers, platform take rates, international market size or the independent verification of customer counts.

## Financial scenario

Recovered annual contributor-hours = recruiters × saved hours/week × 48 working weeks × value capture. Modeled annual benefit = recovered hours × contribution per hour; annual year-one cost = license + implementation. Net benefit = benefit − cost. Net ROI = net benefit / cost. Payback = 12 × cost / benefit months assuming even benefit accrual. Real deployment economics may differ substantially; scenario bands vary only benefit realization.

## External sources: separate from synthetic results

1. Bullhorn, *2026 Recruitment Industry Trends Report*, https://www.bullhorn.com/grid/2026-industry-trends/report/ . Public vendor-authored report; describes a survey of nearly 2,300 recruitment industry professionals and stronger growth among AI-adopting firms. The report states that firms using AI at any stage were 3.5–4.5 times more likely to have grown revenue. This is association as reported by the vendor, not evidence of a causal AI effect.
2. Bullhorn, press release, February 25, 2026, https://www.bullhorn.com/news-and-press/press-releases/bullhorn-grid-report-staffing-firms-using-ai-see-stronger-growth-faster-placements/ . Vendor summary of the above survey. This is not a second independent sample.

A formal industry report would need original independent primary-source interviews, representative sampling or clear convenience-sample disclosure, vendor response rights, methods documentation, additional independent sources, and fresh market validation. None were conducted here.