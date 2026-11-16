#!/usr/bin/env python3
"""Reproduce descriptive metrics on deliberately SYNTHETIC data; stdlib only."""
import csv, math, statistics
from pathlib import Path
records=list(csv.DictReader((Path(__file__).parent/'synthetic_cx_survey.csv').open(newline='',encoding='utf-8')))
for r in records:
    for col in ['portal_issue','delivery_delay','first_contact_resolution','csat_1_5','ease_1_7','recommend_0_10']:
        r[col]=int(r[col])
assert len(records)==600, 'Synthetic dataset changed size'
def summary(group,key):
    if len(group)<2:return None
    vals=[r[key] for r in group]
    mean=statistics.mean(vals);se=statistics.stdev(vals)/math.sqrt(len(vals))
    return dict(n=len(vals),mean=round(mean,3),ci95=[round(mean-1.96*se,3),round(mean+1.96*se,3)])
print('SYNTHETIC DATA ONLY; estimates have no real-world population interpretation.')
for name,rows in [('ALL',records)]+[(s,[r for r in records if r['segment']==s]) for s in sorted(set(r['segment'] for r in records))]:
    print(name,'CSAT',summary(rows,'csat_1_5'),'ease',summary(rows,'ease_1_7'))
    for exposure in ['portal_issue','delivery_delay','first_contact_resolution']:
        yes=[r for r in rows if r[exposure]==1];no=[r for r in rows if r[exposure]==0]
        if yes and no: print('  ',exposure,'CSAT exposed',summary(yes,'csat_1_5'),'unexposed',summary(no,'csat_1_5'))
