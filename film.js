
'use strict';
const project=JSON.parse(document.getElementById('film-data').textContent);
const films=project.summary;
const a=document.getElementById('film-a'),b=document.getElementById('film-b'),measure=document.getElementById('measure');
for(const s of films){for(const select of [a,b]){const o=document.createElement('option');o.value=s.film_id;o.textContent=s.film;select.appendChild(o)}}
a.value='elio';b.value='28-years-later';
const usd=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
const pct=v=>(v*100).toFixed(1)+'%';
const colors=['#226b92','#a3580b'];
function redraw(){
 const selected=[a.value,b.value],mode=measure.value;
 const summaries=selected.map(id=>films.find(s=>s.film_id===id));
 const rows=selected.map(id=>project.records.filter(r=>r.film_id===id).sort((x,y)=>x.release_week-y.release_week));
 const ratio=summaries[0].week4_per_theater_usd/summaries[1].week4_per_theater_usd-1;
 const noun=ratio>=0?'higher':'lower';
 document.getElementById('comparison-summary').textContent=`In weekend four, ${summaries[0].film} earned ${usd.format(summaries[0].week4_per_theater_usd)} per theater, ${pct(Math.abs(ratio))} ${noun} than ${summaries[1].film} (${usd.format(summaries[1].week4_per_theater_usd)}).`;
 document.getElementById('legend').replaceChildren(...summaries.map((s,i)=>{const span=document.createElement('span'),dot=document.createElement('i');dot.className='legend-dot';dot.style.background=colors[i];span.append(dot,document.createTextNode(s.film));return span}));
 const max=mode==='per_theater_usd'?Math.ceil(Math.max(...rows.flat().map(r=>r[mode]))/5000)*5000:1;
 const svg=document.getElementById('film-chart');
 const width=Math.max(280,Math.min(980,Math.round(svg.clientWidth||980)));
 const mobile=width<640,height=mobile?310:390;
 svg.setAttribute('viewBox',`0 0 ${width} ${height}`);
 const left=mobile?64:82,right=width-(mobile?70:100),top=24,bottom=mobile?252:315;
 const X=i=>left+(right-left)*i/3,Y=v=>bottom-(v/max)*(bottom-top);
 const format=v=>mode==='per_theater_usd'?usd.format(v):pct(v);
 let content=`<title id="chart-title">${measure.selectedOptions[0].textContent}: ${summaries.map(s=>s.film).join(' and ')}</title><desc id="chart-desc">Four release weekends. Source rows are available below.</desc>`;
 for(let i=0;i<=4;i++){const v=max*i/4,y=Y(v);content+=`<line x1="${left}" x2="${right}" y1="${y}" y2="${y}" stroke="#d8e1e9"/><text x="${left-10}" y="${y+5}" text-anchor="end" fill="#58687a" font-size="${mobile?14:15}">${format(v)}</text>`}
 for(let i=0;i<4;i++)content+=`<text x="${X(i)}" y="${bottom+37}" text-anchor="middle" fill="#58687a" font-size="${mobile?14:16}">${width<320?'Wk':mobile?'Week':'Weekend'} ${i+1}</text>`;
 rows.forEach((series,j)=>{content+=`<polyline points="${series.map((r,i)=>X(i)+','+Y(r[mode])).join(' ')}" fill="none" stroke="${colors[j]}" stroke-width="3"/>`;series.forEach((r,i)=>{content+=`<circle cx="${X(i)}" cy="${Y(r[mode])}" r="4.5" fill="${colors[j]}"><title>${summaries[j].film}, ${r.weekend_start}, ${format(r[mode])}</title></circle>`});const last=series[3];const y=Y(last[mode])+((j===1&&Math.abs(Y(last[mode])-Y(rows[0][3][mode]))<24)?22:0);content+=`<text x="${right+12}" y="${y+5}" fill="${colors[j]}" font-size="16" font-weight="700">${format(last[mode])}</text>`});
 svg.innerHTML=content;
}
for(const control of [a,b,measure])control.addEventListener('change',redraw);
window.addEventListener('resize',redraw);
redraw();
