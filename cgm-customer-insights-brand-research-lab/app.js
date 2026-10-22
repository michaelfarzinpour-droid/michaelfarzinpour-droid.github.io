const data={
  all:{all:{n:720,awareness:72,consideration:55,start:31,activation:70,retention:61,hcp:64},t1d:{n:240,awareness:91,consideration:78,start:62,activation:78,retention:72,hcp:82},t2i:{n:288,awareness:74,consideration:57,start:32,activation:68,retention:59,hcp:66},t2n:{n:192,awareness:45,consideration:29,start:10,activation:58,retention:47,hcp:38}},
  us:{all:{n:360,awareness:76,consideration:58,start:34,activation:72,retention:63,hcp:67},t1d:{n:120,awareness:93,consideration:81,start:65,activation:81,retention:75,hcp:84},t2i:{n:144,awareness:78,consideration:61,start:36,activation:70,retention:61,hcp:69},t2n:{n:96,awareness:48,consideration:31,start:11,activation:59,retention:48,hcp:41}},
  uk:{all:{n:180,awareness:68,consideration:52,start:29,activation:69,retention:60,hcp:62},t1d:{n:60,awareness:89,consideration:76,start:60,activation:77,retention:70,hcp:80},t2i:{n:72,awareness:70,consideration:54,start:30,activation:67,retention:58,hcp:64},t2n:{n:48,awareness:42,consideration:27,start:9,activation:56,retention:45,hcp:36}},
  de:{all:{n:180,awareness:64,consideration:48,start:27,activation:66,retention:58,hcp:59},t1d:{n:60,awareness:87,consideration:73,start:58,activation:74,retention:68,hcp:78},t2i:{n:72,awareness:67,consideration:50,start:28,activation:64,retention:56,hcp:61},t2n:{n:48,awareness:39,consideration:24,start:8,activation:54,retention:43,hcp:33}}
};

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
let market='all',segment='all',journeyView='patient',activeStage=3,activeMessage='b',activeTheme='setup';
const stageNames=['Awareness','Consideration','Start','Setup','30-day habit','90-day use'];
const patientDetails=[
  {title:'Awareness',stat:'72% aware',text:'Reach is strongest among experienced CGM users and lowest among non-insulin type 2 patients.',drivers:['HCP education','Peer stories','Search visibility']},
  {title:'Consideration',stat:'55% consider',text:'The largest pre-start barrier is uncertainty about daily burden and insurance coverage.',drivers:['Clear expectations','Coverage tools','Credible evidence']},
  {title:'Start',stat:'31% start',text:'Prescription intent does not always become a completed start. Access and handoff delays compound.',drivers:['Benefit verification','Pharmacy handoff','Starter readiness']},
  {title:'Setup',stat:'70% activate',text:'First-time users report pairing, account, and alarm-setting friction. This is the active research alert.',drivers:['Guided setup','Live troubleshooting','Expectation setting']},
  {title:'30-day habit',stat:'66% continue',text:'Alarm fatigue and uncertainty about interpreting trends become more important after initial setup.',drivers:['Personalized education','Alarm tuning','Follow-up prompts']},
  {title:'90-day use',stat:'61% sustain',text:'Ongoing use is associated with perceived usefulness, confidence, and a reliable supply experience.',drivers:['Actionable insights','Refill continuity','HCP reinforcement']}
];
const hcpDetails=[
  {title:'Awareness',stat:'94% aware',text:'Awareness is high, but familiarity with patient-fit criteria varies by specialty.',drivers:['Clinical evidence','Peer education','Simple positioning']},
  {title:'Patient fit',stat:'79% identify',text:'Recommendation rises when patient selection and onboarding responsibilities are clear.',drivers:['Candidate profiles','Workflow fit','Coverage clarity']},
  {title:'Recommend',stat:'64% recommend',text:'Recommendation is constrained by access complexity and anticipated setup burden.',drivers:['Confidence in access','Easy prescribing','Training support']},
  {title:'Initiate',stat:'49% initiate',text:'Office workflow, documentation, and pharmacy handoffs create leakage after recommendation.',drivers:['Staff tools','Referral workflow','Status visibility']},
  {title:'Support',stat:'42% follow up',text:'HCPs want clear escalation paths without adding avoidable burden to clinic teams.',drivers:['Role clarity','Patient self-service','Escalation criteria']},
  {title:'Reinforce',stat:'38% reinforce',text:'Concise progress summaries can help make CGM value visible at follow-up visits.',drivers:['Decision-ready reports','Trend education','Shared goals']}
];

const messages={
  a:{label:'Control with confidence',copy:'See patterns sooner and make everyday choices with more confidence.',scores:{Clarity:78,Relevance:72,Trust:81,Motivation:68,'Talk to HCP':64},tag:'Trust leader',rec:'Strongest on trust, but the broad promise is less motivating for first-time users. Retain as a credibility anchor.'},
  b:{label:'Start supported',copy:'From first sensor to first insight, guided setup helps you get started.',scores:{Clarity:86,Relevance:84,Trust:82,Motivation:79,'Talk to HCP':76},tag:'Recommended',rec:'Best overall balance and strongest among first-time users. Advance to a guided-onboarding pilot with claim and comprehension review.'},
  c:{label:'More time in the know',copy:'A clearer view of glucose patterns, without waiting for the next check.',scores:{Clarity:74,Relevance:78,Trust:71,Motivation:73,'Talk to HCP':69},tag:'Segment opportunity',rec:'Performs well among experienced users but prompts questions about the implied comparison. Refine before retesting.'}
};

const feedback={
  all:{setup:64,alarms:48,coverage:39,adhesive:31,insights:34,supply:24},
  app:{setup:28,alarms:37,coverage:4,adhesive:8,insights:25,supply:6},
  support:{setup:26,alarms:7,coverage:24,adhesive:15,insights:3,supply:19},
  survey:{setup:10,alarms:4,coverage:11,adhesive:8,insights:6,supply:5}
};
const themeLabels={setup:'Setup and pairing',alarms:'Alerts and alarms',coverage:'Coverage and cost',adhesive:'Wear and adhesive',insights:'Understanding insights',supply:'Refill and supply'};
const quotes={
  setup:[['“I expected the first reading to appear right away, but I was not sure whether the sensor and app were connected.”','First-time user · open-ended survey'],['“The steps made sense individually, but I did not know which account I was supposed to use.”','Support contact'],['“A short live walkthrough would have saved me from starting over.”','App review']],
  alarms:[['“I wanted the alerts, but the defaults felt like too much during the first night.”','App review'],['“I was not sure which alerts I could safely personalize.”','Open-ended survey']],
  coverage:[['“I understood why the product could help; I did not understand what I would pay.”','Open-ended survey'],['“The handoff between the office and pharmacy was the confusing part.”','Support contact']],
  adhesive:[['“It stayed on during normal days but lifted after exercise.”','App review'],['“I needed clearer instructions before the first application.”','Support contact']],
  insights:[['“The graph is useful once someone explains what pattern to look for.”','Open-ended survey'],['“I can see the trend, but I am not always sure what question to ask my clinician.”','App review']],
  supply:[['“I did not know whether the next sensor was automatic or something I had to request.”','Support contact'],['“A refill-status message would reduce the uncertainty.”','Open-ended survey']]
};

function current(){return data[market][segment]}
function renderDashboard(){
  const d=current();
  $('#metric-grid').innerHTML=[['Unaided awareness',d.awareness+'%','+3.2 pts vs. prior wave'],['Consideration',d.consideration+'%','Opportunity: clarify daily value'],['Successful activation',d.activation+'%','-11.4 pts vs. prior wave'],['90-day continued use',d.retention+'%','Setup friction predicts drop-off']].map(x=>`<article class="metric"><span>${x[0]}</span><strong>${x[1]}</strong><small>${x[2]}</small></article>`).join('');
  $('#sample-size').textContent=`Synthetic patient base n=${d.n}`;
  const vals=[d.awareness,d.consideration,d.start,d.activation,Math.max(d.activation-4,0),d.retention];
  $('#funnel-chart').innerHTML=stageNames.map((s,i)=>`<div class="funnel-bar"><span class="value">${vals[i]}%</span><div class="bar" style="height:${vals[i]}%"></div><span class="label">${s}</span></div>`).join('');
}

const evidence={distribution:'All links, routing, and eligibility rules passed pre- and post-launch checks. No distribution change explains the decline.',mix:'The first-time-user share rose 6 points. Reweighting reduces the decline by 1.8 points, but a material signal remains.',device:'Mobile completion and exclusion rates are stable. Android drop-off rose 1.2 points—too small to explain the alert.',themes:'Setup and pairing comments increased 42%, concentrated among first-time users. This is the strongest converging explanation.'};
$$('[data-check]').forEach(b=>b.addEventListener('click',()=>{$$('[data-check]').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('#evidence-box').textContent=evidence[b.dataset.check]}));

function renderJourney(){
  const details=journeyView==='patient'?patientDetails:hcpDetails;
  $('#journey-path').innerHTML=details.map((x,i)=>`<div class="journey-step ${i===activeStage?'active':''}" data-stage="${i}"><div class="dot">${i+1}</div><strong>${x.title}</strong><small>${x.stat}</small></div>`).join('');
  const x=details[activeStage];
  $('#journey-detail').innerHTML=`<p class="kicker">Stage ${activeStage+1}</p><h3>${x.title}</h3><p>${x.text}</p><strong>Decision levers</strong><ul>${x.drivers.map(d=>`<li>${d}</li>`).join('')}</ul>`;
  $$('.journey-step').forEach(b=>b.addEventListener('click',()=>{activeStage=+b.dataset.stage;renderJourney()}));
}
$$('[data-journey-view]').forEach(b=>b.addEventListener('click',()=>{journeyView=b.dataset.journeyView;activeStage=journeyView==='patient'?3:2;$$('[data-journey-view]').forEach(x=>x.classList.toggle('active',x===b));renderJourney()}));

function renderMessages(){
  $('#message-grid').innerHTML=Object.entries(messages).map(([k,m])=>`<button class="message-card ${k===activeMessage?'active':''}" data-message="${k}"><span class="concept">Concept ${k.toUpperCase()}</span><strong>${m.label}</strong><p>${m.copy}</p></button>`).join('');
  const m=messages[activeMessage];
  $('#score-bars').innerHTML=`<p class="kicker">Synthetic scorecard · % favorable</p>${Object.entries(m.scores).map(([k,v])=>`<div class="score-row"><span>${k}</span><div class="score-track"><div class="score-fill" style="width:${v}%"></div></div><strong>${v}</strong></div>`).join('')}`;
  $('#message-recommendation').innerHTML=`<span class="tag">${m.tag}</span><h3>${m.label}</h3><p>${m.rec}</p><small>Synthetic base: n=120 per concept. Descriptive comparison only.</small>`;
  $$('[data-message]').forEach(b=>b.addEventListener('click',()=>{activeMessage=b.dataset.message;renderMessages()}));
}

function renderThemes(){
  const source=$('#source-filter').value,vals=feedback[source],max=Math.max(...Object.values(vals));
  $('#theme-chart').innerHTML=Object.entries(vals).map(([k,v])=>`<div class="theme-row ${k===activeTheme?'active':''}" data-theme="${k}"><strong>${themeLabels[k]}</strong><div class="theme-track"><div class="theme-fill" style="width:${v/max*100}%"></div></div><span>${v}</span></div>`).join('');
  $('#theme-title').textContent=themeLabels[activeTheme];
  $('#quote-list').innerHTML=quotes[activeTheme].map(q=>`<div class="quote"><p>${q[0]}</p><small>${q[1]} · synthetic</small></div>`).join('');
  $$('[data-theme]').forEach(b=>b.addEventListener('click',()=>{activeTheme=b.dataset.theme;renderThemes()}));
}

const decisionCopy={campaign:{cls:'caution',title:'Weak fit with the immediate evidence',text:'Awareness is comparatively strong. More media may add reach without repairing the activation break. Hold until onboarding performance is understood.'},onboarding:{cls:'good',title:'Best-supported next test',text:'Pilot guided onboarding among first-time users. Randomize eligible starters to standard versus guided support; track successful activation, time to first reading, support contacts, and 30-day continuation.'},discount:{cls:'caution',title:'Premature and insufficiently targeted',text:'Cost matters, but it is not the leading explanation for the current activation decline. A broad discount would be expensive and difficult to interpret.'}};
$$('[data-decision]').forEach(b=>b.addEventListener('click',()=>{const d=decisionCopy[b.dataset.decision];$$('[data-decision]').forEach(x=>x.classList.toggle('active',x===b));const box=$('#decision-result');box.className=`decision-result ${d.cls}`;box.innerHTML=`<strong>${d.title}</strong><br>${d.text}`}));

const timeline=[['W1','Scope and alignment','Decision, audiences, hypotheses'],['W2','Instrument and guide','Cognitive review and logic test'],['W3','Field launch','Quotas, quality, daily status'],['W4','Analysis','Tables, themes, triangulation'],['W5','Storyline','Stakeholder review and challenge'],['W6','Decision debrief','Recommendation and learning plan']];
$('#timeline').innerHTML=timeline.map(x=>`<div class="timeline-row"><span>${x[0]}</span><div><strong>${x[1]}</strong><small>${x[2]}</small></div></div>`).join('');
const budget=[['Patient sample','$38.0k','$38.0k',''],['HCP sample','$31.0k','$32.8k','over'],['Qualitative fieldwork','$24.0k','$23.4k',''],['Analysis and reporting','$18.0k','$18.0k',''],['Total','$111.0k','$112.2k','over']];
$('#budget').innerHTML='<div class="budget-row"><span></span><strong>Plan</strong><strong>Actual</strong></div>'+budget.map(x=>`<div class="budget-row"><span>${x[0]}</span><strong>${x[1]}</strong><strong class="${x[3]}">${x[2]}</strong></div>`).join('');
const risks=[['HCP recruitment pace','High','Release reserve sources at 60% of field window'],['Translation drift','Medium','Back-check high-impact claims and probes'],['Low-base segment','Medium','Flag n<50; avoid unstable inference'],['Scope expansion','Medium','Log change request and decision impact']];
$('#risk-list').innerHTML=risks.map(x=>`<div class="risk"><div><strong>${x[0]}</strong><span>${x[1]}</span></div><p>${x[2]}</p></div>`).join('');

$('#market-filter').addEventListener('change',e=>{market=e.target.value;renderDashboard()});
$('#segment-filter').addEventListener('change',e=>{segment=e.target.value;renderDashboard()});
$('#source-filter').addEventListener('change',renderThemes);

function syntheticRows(){
  const markets=['US','UK','DE'],segments=['T1D','T2 insulin','T2 non-insulin'];let out=['respondent_id,market,segment,aware,consider,started,activated,continued_90d,message_concept,setup_barrier'];
  for(let i=1;i<=720;i++){const mk=markets[i%3],sg=segments[i%3],aware=i%10<7?1:0,consider=aware&&i%20<11?1:0,started=consider&&i%100<56?1:0,activated=started&&i%10<7?1:0,cont=activated&&i%100<87?1:0,concept=['A','B','C'][i%3],barrier=started&&!activated?['pairing','account','warmup'][i%3]:'none';out.push([`S${String(i).padStart(4,'0')}`,mk,sg,+aware,+consider,+started,+activated,+cont,concept,barrier].join(','))}return out.join('\n')
}
$('#download-data').addEventListener('click',()=>{const blob=new Blob([syntheticRows()],{type:'text/csv'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='cgm-research-lab-synthetic-data.csv';a.click();URL.revokeObjectURL(a.href)});

renderDashboard();renderJourney();renderMessages();renderThemes();
