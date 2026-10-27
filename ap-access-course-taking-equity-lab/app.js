const D = window.DASHBOARD_DATA;
const $ = (s) => document.querySelector(s);
const fmt = new Intl.NumberFormat('en-US');
const pct = (v, d=1) => v == null || Number.isNaN(+v) ? '—' : `${(+v*100).toFixed(d)}%`;
const pp = (v) => `${v >= 0 ? '+' : ''}${(+v).toFixed(1)} pp`;

function setText(id, value){ $(id).textContent = value; }
setText('#kpiSchools', fmt.format(D.national.schools));
setText('#kpiAccess', pct(D.national.ap_access_rate));
setText('#kpiCI', `95% CI ${pct(D.national.access_ci_low)}–${pct(D.national.access_ci_high)}`);
setText('#kpiParticipants', fmt.format(D.national.ap_participants));
setText('#kpiParticipation', `${pct(D.national.ap_participation_rate)} of enrollment`);
setText('#kpiMatch', pct(D.audit.ccd_match_rate));
setText('#kpiUnmatched', `${fmt.format(D.audit.ccd_unmatched)} CRDC schools unmatched`);
$('#nationalGauge').innerHTML = `<div class="gauge" style="--p:${D.national.ap_access_rate*100}"><b>${pct(D.national.ap_access_rate)}</b></div>`;

const stateSelect = $('#stateSelect');
const districtSelect = $('#districtSelect');
const sortedStates = [...D.states].sort((a,b) => a.LEA_STATE_NAME.localeCompare(b.LEA_STATE_NAME));
stateSelect.innerHTML = `<option value="US">United States</option>` + sortedStates.map(s => `<option value="${s.LEA_STATE}">${s.LEA_STATE_NAME} (${s.LEA_STATE})</option>`).join('');

function fillDistricts(state){
  const ds = D.districts.filter(d => d.LEA_STATE === state).sort((a,b) => a.LEA_NAME.localeCompare(b.LEA_NAME));
  districtSelect.innerHTML = `<option value="">All districts in ${state}</option>` + ds.map(d => `<option value="${d.district_key}">${d.LEA_NAME}</option>`).join('');
  districtSelect.disabled = state === 'US';
}

function nationalRecord(){return {...D.national, name:'United States', ccd_match_rate:D.audit.ccd_match_rate}}
function renderSelected(r){
  setText('#selectedName', r.name || r.LEA_NAME || r.LEA_STATE_NAME);
  setText('#selectedRate', pct(r.ap_access_rate));
  setText('#selectedCI', `95% confidence interval ${pct(r.access_ci_low)}–${pct(r.access_ci_high)}`);
  setText('#selectedSchools', fmt.format(r.schools));
  setText('#selectedAPSchools', fmt.format(r.schools_with_ap));
  setText('#selectedParticipation', pct(r.ap_participation_rate));
  setText('#selectedMatch', pct(r.ccd_match_rate));
  const low = Math.max(0,+r.access_ci_low*100), high = Math.min(100,+r.access_ci_high*100), point=+r.ap_access_rate*100;
  $('#intervalBar').style.left = `${low}%`; $('#intervalBar').style.width = `${high-low}%`; $('#intervalPoint').style.left=`${point}%`;
}

function renderStateBars(active='US'){
  const max = Math.max(...D.states.map(s=>s.ap_access_rate));
  $('#stateBars').innerHTML = [...D.states].sort((a,b)=>b.ap_access_rate-a.ap_access_rate).map(s=>`<div class="bar-row ${s.LEA_STATE===active?'active':''}"><span>${s.LEA_STATE}</span><div class="bar-track"><div class="bar-fill" style="width:${s.ap_access_rate/max*100}%"></div></div><b>${pct(s.ap_access_rate,0)}</b></div>`).join('');
}
stateSelect.addEventListener('change',()=>{
  const st=stateSelect.value; fillDistricts(st);
  if(st==='US') renderSelected(nationalRecord()); else { const r=D.states.find(x=>x.LEA_STATE===st); renderSelected({...r,name:r.LEA_STATE_NAME}); }
  renderStateBars(st);
});
districtSelect.addEventListener('change',()=>{
  const key=districtSelect.value;
  if(!key){const r=D.states.find(x=>x.LEA_STATE===stateSelect.value);renderSelected({...r,name:r.LEA_STATE_NAME});return}
  renderSelected(D.districts.find(d=>d.district_key===key));
});
fillDistricts('US'); renderSelected(nationalRecord()); renderStateBars();

const maxGap = Math.max(...D.groups.map(g=>Math.abs(g.representation_gap_pp)));
$('#equityChart').innerHTML = [...D.groups].sort((a,b)=>b.representation_gap_pp-a.representation_gap_pp).map(g=>{
  const w=Math.abs(g.representation_gap_pp)/maxGap*48;
  return `<div class="div-row"><span>${g.group}</span><div class="div-track">${g.representation_gap_pp<0?`<i class="div-neg" style="width:${w}%"></i>`:`<i class="div-pos" style="width:${w}%"></i>`}</div><b>${pp(g.representation_gap_pp)}</b></div>`
}).join('');

const logMin=Math.log(.3), logMax=Math.log(7); const pos=v=>(Math.log(v)-logMin)/(logMax-logMin)*100;
$('#forestPlot').innerHTML=D.model.map(m=>`<div class="forest-row"><span>${m.label}</span><div class="forest-track"><i class="forest-ci" style="left:${pos(m.ci_low)}%;width:${pos(m.ci_high)-pos(m.ci_low)}%"></i><i class="forest-point" style="left:${pos(m.odds_ratio)}%"></i></div><b>${m.odds_ratio.toFixed(2)}</b></div>`).join('');
$('#sensitivityRows').innerHTML=D.sensitivity.map(s=>`<tr><td>${s.scenario}</td><td>${fmt.format(s.schools)}</td><td><b>${pct(s.ap_access_rate)}</b></td><td>${pct(s.ci_low)}–${pct(s.ci_high)}</td></tr>`).join('');

const flow=[
  ['CRDC AP records',D.audit.crdc_ap_rows,'unique COMBOKEY'],
  ['CRDC linkage',D.audit.enrollment_matched,'100% across 3 files'],
  ['CCD linkage',D.audit.ccd_matched,`${pct(D.audit.ccd_match_rate)} matched`],
  ['Grade-12 universe',D.audit.grade_12_school_rows,'G_12_OFFERED = Yes'],
  ['Known AP access',D.audit.ap_access_known,`${D.audit.ap_access_missing} excluded code`],
  ['Model sample',D.model_meta.model_n,'complete cases']
];
$('#flow').innerHTML=flow.map((x,i)=>`<article class="flow-card"><span>${String(i+1).padStart(2,'0')} · ${x[0]}</span><b>${fmt.format(x[1])}</b><p>${x[2]}</p></article>`).join('');
