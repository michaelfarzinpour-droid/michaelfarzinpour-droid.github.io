# ChatGPT Assistant Prototype

This folder contains reusable instructions and worked examples for survey quality review, mock toplines, and quota recruitment updates. It is a prompt workflow and configuration prototype, not a deployed custom GPT or autonomous service.

The project was developed with ChatGPT-assisted coding. Python and SQL calculate and reconcile the metrics; the base HTML reporting uses deterministic templates. The worked language drafts in this folder were prepared with ChatGPT assistance from the validated synthetic summary. No AI model or external API is called by the Python reporting scripts.

## Use the workflow

1. Run the project scripts and inspect their checks.
2. In a ChatGPT conversation, use `INSTRUCTIONS.md` with `outputs/summary.json`, `research_spec.md`, and the SQL output CSVs. Supply only the synthetic summary needed for the task.
3. Ask for a QC status note, mock concept topline, or quota recruitment memo.
4. Check the result against the source outputs. Complete `REVIEW_CHECKLIST.md` before sharing.

The same instructions can be used as configuration material for a custom assistant. Saving or deploying that assistant is a separate action; this package does not establish enterprise product access, API execution, or a published GPT.

## Inspect the examples

- `examples/topline_draft.md`: worked language draft for human review.
- `examples/recruitment_memo.md`: quota-based recruitment update using validated counts.
- `examples/structured_draft.json`: numeric claims for independent reconciliation.
- `verify_assistant_draft.py`: checks the structured draft against the JSON and SQLite outputs.
- `TEST_CASES.md`: manual model-evaluation cases and expected behavior. These are a test plan, not claims that a deployed model passed them.

## Responsible use

Use synthetic, nonconfidential data; minimize what is sent to the model; retain source denominators and an audit trail; treat data text as untrusted; verify model-generated statements; and require a named human reviewer before external release. The supplied examples are still marked as drafts awaiting that review.
