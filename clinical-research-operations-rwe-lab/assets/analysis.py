"""Reproduce descriptive synthetic outcomes from the baseline or current exported CSV."""
import csv,sys,statistics,math
path=sys.argv[1] if len(sys.argv)>1 else 'synthetic-baseline.csv'
rows=list(csv.DictReader(open(path,newline='')))
def truth(v):return v.lower()=='true'
for specialty in ['All','Urology','Oncology','Gastroenterology','Rheumatology']:
 cohort=[r for r in rows if specialty=='All' or r['specialty']==specialty]
 eligible=[r for r in cohort if truth(r['eligible']) and truth(r['consent']) and 18<=int(r['age'])<=85]
 change=[float(r['baseline'])-float(r['follow']) for r in eligible if r['follow']!='']
 due=sum(truth(r['due']) for r in eligible)
 missing=sum(truth(r['due']) and r['follow']=='' for r in eligible)
 avg=statistics.mean(change); ci=1.96*statistics.stdev(change)/math.sqrt(len(change))
 print(f'{specialty}: n={len(cohort)} eligible={len(eligible)} paired={len(change)} missing due={missing} mean={avg:.2f} CI={avg-ci:.2f}–{avg+ci:.2f} sensitivity={sum(change)/due:.2f}')
