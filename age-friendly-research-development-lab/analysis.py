"""Reproduce and validate exported synthetic encounters. Standard library only."""
import csv, math, sys
FIELDS=("What Matters","Medication","Mentation","Mobility")
SITES={"Cedar Clinic","Juniper Hospital","Aspen Community Care","Willow Primary Care","Maple Rehabilitation","Pine Home Services"}
AGES={"65–74","75–84","85+"}
def load(path):
    with open(path,encoding="utf-8",newline="") as f: rows=list(csv.DictReader(f))
    assert len({r["id"] for r in rows})==len(rows),"Duplicate IDs"
    for r in rows:
        assert r["id"] and r["site"] in SITES and r["age_group"] in AGES
        assert 1<=int(r["month"])<=12
        assert all(r[m] in {"","0","1"} for m in FIELDS)
    return rows
def result(rows,field,missing_as_zero=False):
    n=sum(r[field]=="1" for r in rows)
    missing=sum(r[field]=="" for r in rows)
    d=len(rows) if missing_as_zero else len(rows)-missing
    if not d:return n,d,missing,None,None,None
    p=n/d;z=1.96;den=1+z*z/d
    mid=(p+z*z/(2*d))/den
    half=z*math.sqrt(p*(1-p)/d+z*z/(4*d*d))/den
    return n,d,missing,p,max(0,mid-half),min(1,mid+half)
def report(rows,label,missing_as_zero):
    print("\n",label,len(rows))
    for m in FIELDS:
        n,d,missing,p,lo,hi=result(rows,m,missing_as_zero)
        print(m,f"{n}/{d}, missing={missing}","N/A" if p is None else f"{p:.1%}; Wilson 95% CI {lo:.1%}–{hi:.1%}")
def tests():
    field=FIELDS[0]
    sample=[{field:"1"},{field:"0"},{field:""}]
    assert result(sample,field)[:4]==(1,2,1,.5)
    assert result(sample,field,True)[:4]==(1,3,1,1/3)
    assert result([],field)[3] is None
    assert result([{field:""}],field)[3] is None
    assert math.isclose(result([{field:"1"}],field)[5],1)
    print("QC unit tests passed")
if __name__=="__main__":
    tests()
    if "--test" in sys.argv:sys.exit()
    rows=load(sys.argv[1] if len(sys.argv)>1 else "synthetic_encounters.csv")
    rule="--missing-as-zero" in sys.argv
    report(rows,"Selected records",rule)
    early=[r for r in rows if int(r["month"])<=3]
    late=[r for r in rows if int(r["month"])>=10]
    report(early,"Months 1–3",rule);report(late,"Months 10–12",rule)
    for m in FIELDS:
        e=result(early,m,rule)[3]; l=result(late,m,rule)[3]
        print(m,"late minus early pp:", "N/A" if e is None or l is None else round(100*(l-e),1))
    for group in sorted(AGES):report([r for r in rows if r["age_group"]==group],group,rule)
    print("Synthetic data; descriptive comparisons, not clinical or causal results.")
