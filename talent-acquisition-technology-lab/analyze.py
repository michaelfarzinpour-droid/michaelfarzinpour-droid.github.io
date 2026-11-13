"""Reproduce descriptive comparisons using only the Python standard library.
Input: synthetic_staffing_survey.csv, created with random seed 20261112.
Not actual staffing survey data or causal inference.
"""
import csv
from pathlib import Path
from collections import defaultdict

path = Path(__file__).with_name('synthetic_staffing_survey.csv')
with path.open(newline='', encoding='utf-8') as f:
    rows = list(csv.DictReader(f))

for r in rows:
    for k in ['tech_maturity', 'ats_integration', 'ai_adoption', 'revenue_growth', 'fraud_controls', 'survey_complete']:
        r[k] = int(r[k])
    r['recruiter_productivity_index'] = float(r['recruiter_productivity_index'])

def mean(rs, field):
    return sum(r[field] for r in rs) / len(rs) if rs else float('nan')

def results(rs):
    adopters = [r for r in rs if r['ai_adoption']]
    nonadopters = [r for r in rs if not r['ai_adoption']]
    raw = mean(adopters, 'revenue_growth') - mean(nonadopters, 'revenue_growth')
    strata = defaultdict(list)
    for r in rs:
        strata[(r['firm_size'], r['tech_maturity'])].append(r)
    sumweighted, support, excluded = 0, 0, 0
    for group in strata.values():
        a = [r for r in group if r['ai_adoption']]
        b = [r for r in group if not r['ai_adoption']]
        if a and b:
            sumweighted += len(group) * (mean(a, 'revenue_growth') - mean(b, 'revenue_growth'))
            support += len(group)
        else:
            excluded += len(group)
    return dict(n=len(rs), adopted=len(adopters), nonadopted=len(nonadopters),
                complete=sum(r['survey_complete'] for r in rs), raw_difference=raw,
                standardized_difference=sumweighted/support if support else float('nan'),
                supported_observations=support, excluded_for_no_overlap=excluded)

if __name__ == '__main__':
    for label, sample in [('Full synthetic dataset', rows), ('Completed questionnaires', [r for r in rows if r['survey_complete']])]:
        print(label)
        for key, value in results(sample).items():
            print(f'  {key}: {value:.4f}' if isinstance(value, float) else f'  {key}: {value}')
    print('\nCaution: all results are simulated; standardization does not imply causation.')
