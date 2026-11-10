"""Validate published aggregate targets against deterministic synthetic CSV data."""
from pathlib import Path
import csv, json, math
P = Path(__file__).resolve().parent.parent
S = json.loads((P / "data/reproducible_summary.json").read_text())
def read(name):
    with (P / "data" / name).open(newline="") as f:
        return list(csv.DictReader(f))
T = read("tracking_respondents_synthetic.csv")
C = read("creative_respondents_synthetic.csv")
assert len(T) == 9600 and len(C) == 2400
for market, waves in S["tracking"].items():
    for wave, expected in waves.items():
        rows = [r for r in T if r["market"] == market and r["weeks_before_release"] == wave]
        assert len(rows) == expected["n"]
        for column, key in (("aware", "awareness_pct"), ("interested", "interest_pct"), ("definite_intent", "intent_pct")):
            actual = round(100 * sum(int(r[column]) for r in rows) / len(rows), 1)
            assert actual == expected[key], (market, wave, column, actual, expected[key])
for market, expected in S["creative"].items():
    cell = {v:[r for r in C if r["market"] == market and r["creative_cell"] == v] for v in ("A", "B")}
    a, b = cell["A"], cell["B"]
    pa = sum(int(r["definite_intent"]) for r in a) / len(a)
    pb = sum(int(r["definite_intent"]) for r in b) / len(b)
    assert round(pa*100, 1) == expected["a_pct"]
    assert round(pb*100, 1) == expected["b_pct"]
    assert round((pb-pa)*100, 1) == expected["difference_pp"]
    se = math.sqrt(pa*(1-pa)/len(a)+pb*(1-pb)/len(b))
    assert [round(100*((pb-pa)-1.96*se), 1), round(100*((pb-pa)+1.96*se), 1)] == expected["ci_95_pp"]
for market, segments in S["segments"].items():
    for seg, expected in segments.items():
        rows=[r for r in T if r["market"]==market and r["weeks_before_release"]=="2" and r["segment"]==seg]
        assert len(rows) == expected["n"]
        for col,key in (("aware","awareness_pct"),("definite_intent","intent_pct")):
            assert round(100*sum(int(r[col]) for r in rows)/len(rows),1)==expected[key]
print("VALIDATED: published synthetic data, rates, market differences and unadjusted confidence intervals")
