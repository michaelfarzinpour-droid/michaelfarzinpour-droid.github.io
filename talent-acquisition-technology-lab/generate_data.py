import csv, json, random, math, os, statistics
from pathlib import Path
p=Path(__file__).resolve().parent; random.seed(20261112)
rows=[]
segments=['IT','Healthcare','Industrial','Professional Services']
sizes=['Small (1–49)','Mid (50–249)','Large (250+)']
regions=['West','Midwest','South','Northeast']
for i in range(1,1201):
    size=random.choices(sizes,[.48,.34,.18])[0]; mat=random.choices([1,2,3,4,5],[.13,.24,.28,.23,.12])[0]
    spec=random.choice(segments); region=random.choice(regions)
    integrated=random.random() < min(.86,.09+.135*mat+(.09 if size=='Large (250+)' else 0))
    ai_p=min(.93,.08+.115*mat+(.13 if integrated else 0)+(.07 if size=='Large (250+)' else 0))
    ai=int(random.random()<ai_p)
    # Designed observational confounding: maturity influences adoption and growth; AI association is small by construction.
    growth_p=min(.88,max(.08,.17+.115*mat+(.055 if size=='Large (250+)' else 0)+(.025 if integrated else 0)+.025*ai))
    growth=int(random.random()<growth_p)
    efficiency=round(12+mat*5+(6 if integrated else 0)+(4 if ai else 0)+random.gauss(0,7),1)
    fraud=int(random.random() < min(.75,.08+.07*mat + (.07 if ai else 0)))
    response=int(random.random() < (.92-.035*(5-mat)-(.06 if size=='Small (1–49)' else 0)))
    # Survey drop-out produces explicit missingness and a complete case decision.
    obstacle=random.choices(['Data quality','Integration','Cost','Change management','Privacy / security'],[.28,.24,.19,.16,.13])[0]
    row={'firm_id':f'F{i:04d}','region':region,'firm_size':size,'specialization':spec,'tech_maturity':mat,'ats_integration':int(integrated),'ai_adoption':ai,'revenue_growth':growth,'recruiter_productivity_index':efficiency,'fraud_controls':fraud,'survey_complete':response,'top_barrier':obstacle if response else ''}
    rows.append(row)
with (p/'synthetic_staffing_survey.csv').open('w',newline='') as f:
    w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
with (p/'synthetic_staffing_survey.json').open('w') as f: json.dump(rows,f,separators=(',',':'))
print('n',len(rows),'AI',sum(r['ai_adoption'] for r in rows),'growth',sum(r['revenue_growth'] for r in rows),'complete',sum(r['survey_complete'] for r in rows))
