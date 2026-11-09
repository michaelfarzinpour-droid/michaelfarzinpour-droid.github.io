#!/usr/bin/env python3
"""Reproduce the browser's synthetic survey (not real observations).
Run: python reproduce_survey.py [optional-output.csv]
Uses the same 32-bit linear congruential generator and draw order as index.html.
"""
import csv
import sys

seed = 20261108

def rand():
    global seed
    seed = (seed * 1664525 + 1013904223) & 0xffffffff
    return seed / 4294967296

def pick(options):
    return options[int(rand() * len(options))]

def clamp(n, lo, hi):
    return max(lo, min(hi, n))

verticals = ['IT', 'Healthcare', 'Industrial', 'Professional']
regions = ['West', 'Midwest', 'South', 'Northeast']
techs = ['ats', 'jobads', 'sourcing', 'screen', 'vms', 'back']
prob = {'ats': .57, 'jobads': .50, 'sourcing': .28, 'screen': .32, 'vms': .17, 'back': .45}
constraints = ['Integration', 'Cost', 'Data quality', 'Staff training', 'Privacy / governance']
rows = []
for i in range(360):
    size = pick(['Small', 'Small', 'Small', 'Mid-market', 'Mid-market', 'Enterprise'])
    vertical = pick(verticals)
    region = pick(regions)
    base = {'Small': 0, 'Mid-market': .14, 'Enterprise': .26}[size]
    row = {'id': f'S{i+1:03d}', 'size': size, 'vertical': vertical, 'region': region}
    for key in techs:
        p = prob[key] + base + (.10 if vertical == 'IT' and key == 'sourcing' else 0)
        row[key] = 1 if rand() < clamp(p, .02, .96) else 0
    row['ai'] = 1 if rand() < .22 + base + (.12 if row['sourcing'] else 0) else 0
    row['constraint'] = pick(constraints)
    rows.append(row)

output = sys.argv[1] if len(sys.argv) > 1 else 'synthetic_staffing_survey_360.csv'
with open(output, 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.DictWriter(f, fieldnames=list(rows[0]))
    writer.writeheader()
    writer.writerows(rows)
print(f'Wrote {len(rows)} completely synthetic rows to {output}')
