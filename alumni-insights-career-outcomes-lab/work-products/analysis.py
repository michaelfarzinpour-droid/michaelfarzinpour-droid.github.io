"""Independent reproduction of selected dashboard outputs. Standard library only."""
import csv, pathlib, math
root=pathlib.Path(__file__).parent
def read(n):
    with (root/(n+'.csv')).open() as f: return list(csv.DictReader(f))
crm=read('crm'); s=read('survey'); c=read('career')
assert len({x['id'] for x in crm})==len(crm)==2400
def index(a):
    d={(r['id'],r['year']):r for r in a}
    assert len(d)==len(a)
    return d
S=index(s); C=index(c)
def yes(x,k):return x.get(k)=='true'
def mean(a,k):return sum(yes(x,k) for x in a)/len(a) if a else float('nan')
def wilson(k,n):
    p=k/n; z=1.96; d=1+z*z/n; m=(p+z*z/(2*n))/d; w=z*math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d
    return m-w,m+w
for y in ('2024','2025','2026'):
    obs=[x for x in c if x['year']==y]; resp=[x for x in s if x['year']==y]
    print(y,'employment',mean(obs,'employed'),'CI',wilson(sum(yes(x,'employed') for x in obs),len(obs)),'follow-up',len(obs)/len(crm),'response',len(resp)/len(crm))
p=[(C[(a['id'],'2024')],C[(a['id'],'2026')]) for a in crm if (a['id'],'2024') in C and (a['id'],'2026') in C]
print('paired',len(p),'retention',sum(yes(x,'employed') and yes(y,'employed') for x,y in p)/sum(yes(x,'employed') for x,y in p))
groups=[[a for a in crm if yes(a,'invite')==b] for b in (True,False)]
bounds=[]
for g in groups:
    o=[C[(a['id'],'2026')] for a in g if (a['id'],'2026') in C]; k=sum(yes(x,'employed') for x in o)
    bounds.append((k/len(g),(k+len(g)-len(o))/len(g)))
print('ITT bounds',bounds[0][0]-bounds[1][1],bounds[0][1]-bounds[1][0])
cells={}
for a in crm:cells.setdefault((a['region'],a['cohort']),[]).append(a)
weighted=covered=0; weights=[]
for g in cells.values():
    r=[S[(a['id'],'2026')] for a in g if (a['id'],'2026') in S]
    if len(r)>=5:
        covered+=len(g);weighted+=len(g)*sum(x['aspiration']=='Career transition' for x in r)/len(r);weights.extend([len(g)/len(r)]*len(r))
print('weighted transition aspiration',weighted/covered,'coverage',covered/len(crm),'ESS',sum(weights)**2/sum(w*w for w in weights))
