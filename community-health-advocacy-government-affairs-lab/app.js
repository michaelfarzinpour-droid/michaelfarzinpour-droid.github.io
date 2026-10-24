const dimensions = ["Evidence", "Equity", "Judgment", "Clarity", "Follow-through", "Nonpartisanship"];

const decisions = [
  {
    kicker: "Policy intake",
    title: "The state proposal is gaining attention, but the fiscal language is incomplete.",
    context: "A coalition partner asks HarborBridge to publicly support the proposal today. Leadership needs a recommendation by noon.",
    choices: [
      {
        title: "Verify, map impact, then recommend",
        detail: "Confirm operative text and timing, label unresolved assumptions, estimate patient and operational effects, and give leadership a time-bound recommendation.",
        scores: [4,3,4,3,3,3],
        feedback: "Strong. This protects speed and accuracy: leadership receives a usable recommendation without presenting unknown fiscal details as facts."
      },
      {
        title: "Join the coalition statement immediately",
        detail: "Publicly endorse the proposal using the partner’s summary and correct details later if needed.",
        scores: [0,2,0,1,1,2],
        feedback: "Risky. A partner summary is not a substitute for verified text, and corrections could damage trust with patients, officials, and coalition members."
      },
      {
        title: "Wait until every detail is final",
        detail: "Take no position or preparatory action until the proposal is scheduled for a final vote.",
        scores: [3,1,1,1,0,3],
        feedback: "Too passive. Uncertainty should be labeled and managed, not used as a reason to miss the window for analysis and relationship-building."
      }
    ]
  },
  {
    kicker: "Government meeting",
    title: "A county supervisor’s health-policy deputy offers a 20-minute meeting.",
    context: "The office has not taken a position on the mobile-care revision. You must prepare the executive lead and define the ask.",
    choices: [
      {
        title: "Lead with patient impact and one concrete ask",
        detail: "Provide a one-page brief, distinguish verified facts from modeled effects, request geographic detail, and ask for a follow-up before the vote.",
        scores: [4,4,4,4,4,4],
        feedback: "Strong. The meeting has a factual foundation, a realistic ask, and a documented next step without assuming the office’s position."
      },
      {
        title: "Use the meeting to criticize county leadership",
        detail: "Frame the proposal as proof that officials do not care about underserved communities.",
        scores: [1,2,0,1,0,0],
        feedback: "Weak. Adversarial claims without evidence can close the relationship and distract from the requested policy action."
      },
      {
        title: "Share every available data point",
        detail: "Bring a large technical appendix but no concise summary, recommendation, or follow-up request.",
        scores: [4,2,1,0,1,3],
        feedback: "Incomplete. Evidence must be translated into a decision-ready brief with a clear request, not simply delivered as volume."
      }
    ]
  },
  {
    kicker: "Advocacy and civic engagement",
    title: "Community members want to act before the county vote.",
    context: "Several patients ask whether HarborBridge will tell them which officials or candidates to support.",
    choices: [
      {
        title: "Offer nonpartisan process and issue education",
        detail: "Explain the proposal, hearing process, public-comment options, and official voter resources; review materials through the organization’s approval pathway.",
        scores: [3,4,4,4,3,4],
        feedback: "Strong. This supports informed participation while keeping organizational resources focused on issues and process rather than candidates."
      },
      {
        title: "Publish a candidate scorecard",
        detail: "Rate local candidates and tell patients which candidate best supports HarborBridge’s interests.",
        scores: [1,1,0,2,1,0],
        feedback: "High risk. Candidate intervention is outside the nonpartisan approach modeled in this lab and would require immediate compliance review."
      },
      {
        title: "Avoid civic engagement entirely",
        detail: "Decline to explain the hearing, public-comment process, or official registration resources.",
        scores: [2,0,1,1,0,4],
        feedback: "Overcorrected. Nonpartisan civic education can expand access; the answer is a reviewed process, not silence."
      }
    ]
  },
  {
    kicker: "Media response",
    title: "A reporter asks whether mobile-care visits will be canceled.",
    context: "No service changes are confirmed. Social posts are already treating the proposal as final.",
    choices: [
      {
        title: "Acknowledge, state verified facts, commit to an update",
        detail: "Recognize the concern, say no changes are confirmed, explain what is being verified, and give a specific time and channel for the next update.",
        scores: [4,4,4,4,4,4],
        feedback: "Strong. This is responsive without speculating and gives patients, partners, and media a reliable update cadence."
      },
      {
        title: "Predict likely cancellations",
        detail: "Say visits will probably be reduced so the public understands the stakes.",
        scores: [0,2,0,1,1,2],
        feedback: "Weak. Advocacy urgency does not justify presenting an unverified scenario as a likely operational outcome."
      },
      {
        title: "Decline all comment",
        detail: "Provide no acknowledgment, verified facts, or timeline for follow-up.",
        scores: [2,1,1,0,0,3],
        feedback: "Insufficient. Silence can deepen confusion when a short, verified holding response is available."
      }
    ]
  },
  {
    kicker: "Follow-through",
    title: "The meeting produced three commitments and two unresolved questions.",
    context: "Staff are already moving to the next event. The vote is two weeks away.",
    choices: [
      {
        title: "Close the loop in a shared tracker",
        detail: "Record commitments, owners, deadlines, open questions, approval status, stakeholder contacts, and the next update; send a concise follow-up within one business day.",
        scores: [3,3,4,3,4,4],
        feedback: "Strong. Advocacy becomes credible when commitments are visible, owned, and completed—not just discussed."
      },
      {
        title: "Rely on meeting notes and memory",
        detail: "Keep informal notes but do not assign owners or deadlines unless someone asks.",
        scores: [2,1,1,1,0,3],
        feedback: "Weak. Unassigned commitments and undocumented next steps are easily lost across departments and external relationships."
      },
      {
        title: "Send a broad victory announcement",
        detail: "Describe the meeting as successful before confirming what the government office actually agreed to do.",
        scores: [0,1,0,2,0,1],
        feedback: "Risky. Public reporting should match the documented commitment and avoid inflating access into agreement."
      }
    ]
  }
];

const stakeholderData = [
  {type:"government", name:"County supervisor’s health-policy deputy", need:"Patient impact, service-area evidence, one concrete ask", follow:"Written recap and requested data deadline"},
  {type:"government", name:"State legislative health staff", need:"Bill text, fiscal assumptions, operational feasibility", follow:"Amendment watch and committee timeline"},
  {type:"community", name:"Patient leaders", need:"Plain-language effects, what is known, participation options", follow:"Bilingual update and feedback channel"},
  {type:"community", name:"Coalition partners", need:"Shared facts, message boundaries, division of roles", follow:"Weekly alignment note and attribution rules"},
  {type:"internal", name:"Executive leadership", need:"Decision, risk, recommendation, approvals, timing", follow:"Briefing memo and decision log"},
  {type:"internal", name:"Clinical and operations teams", need:"Possible service impact and frontline guidance", follow:"FAQ, escalation path, change notice"},
  {type:"media", name:"Local health reporter", need:"Verified facts, named spokesperson, next update time", follow:"Holding response and scheduled callback"},
  {type:"media", name:"Community-language outlet", need:"Accessible translated materials and local relevance", follow:"Spanish notice and spokesperson availability"},
  {type:"community", name:"Right-to-health committee", need:"Training materials, issue context, safe action options", follow:"Facilitated session and commitment tracker"}
];

const deliverables = [
  ["01", "Leadership briefing memo", "Decision requested, verified facts, unknowns, patient impact, options, recommendation, and approvals."],
  ["02", "Talking points", "A consistent message spine with audience-specific proof points and boundaries."],
  ["03", "Government meeting brief", "Participants, office context, objectives, concrete ask, anticipated questions, and follow-up."],
  ["04", "Public comment", "A concise evidence-based statement connecting the proposal to access and equity."],
  ["05", "Stakeholder matrix", "Audience, information need, owner, channel, relationship status, and next action."],
  ["06", "Advocacy event plan", "Purpose, participants, agenda, materials, roles, access needs, approvals, and risks."],
  ["07", "Media response and Q&A", "Holding statement, difficult questions, approved facts, bridges, and next update."],
  ["08", "Commitment tracker", "Promises, open questions, owners, due dates, approval status, and completion evidence."]
];

const timeline = [
  ["Week 1", "Verify and scope", "Confirm policy text, dates, authority, assumptions, and decision needs."],
  ["Week 2", "Analyze impact", "Develop patient, equity, operational, and communications implications."],
  ["Week 3", "Align internally", "Brief leaders, confirm position, secure approvals, prepare spokespeople."],
  ["Week 4", "Engage partners", "Hold government meetings, coalition briefings, and patient-leader sessions."],
  ["Week 5", "Communicate", "Publish approved materials, monitor inquiries, correct message drift."],
  ["Week 6", "Close the loop", "Track commitments, report outcomes, document lessons, revise the playbook."]
];

let step = 0;
let selections = Array(decisions.length).fill(null);
let totals = Array(dimensions.length).fill(0);

const q = (s) => document.querySelector(s);
const qa = (s) => [...document.querySelectorAll(s)];

function renderScoreboard() {
  const maxPerDimension = decisions.length * 4;
  const score = Math.round(totals.reduce((a,b)=>a+b,0) / (dimensions.length * maxPerDimension) * 100);
  q("#total-score").textContent = score;
  q("#score-bars").innerHTML = dimensions.map((d,i) => `
    <div class="scorebar-row">
      <label>${d}</label>
      <div class="mini-track"><span style="width:${totals[i]/maxPerDimension*100}%"></span></div>
      <output>${totals[i]}</output>
    </div>`).join("");
}

function recalcScores() {
  totals = Array(dimensions.length).fill(0);
  selections.forEach((choiceIndex, decisionIndex) => {
    if (choiceIndex === null) return;
    decisions[decisionIndex].choices[choiceIndex].scores.forEach((v,i) => totals[i] += v);
  });
  renderScoreboard();
}

function renderDecision() {
  const d = decisions[step];
  q("#step-label").textContent = `Decision ${step + 1} of ${decisions.length}`;
  q("#progress-fill").style.width = `${(step + 1) / decisions.length * 100}%`;
  q("#decision-kicker").textContent = d.kicker;
  q("#decision-title").textContent = d.title;
  q("#decision-context").textContent = d.context;
  q("#choice-list").innerHTML = d.choices.map((c,i) => `
    <button class="choice ${selections[step] === i ? "selected" : ""}" data-choice="${i}" type="button">
      <strong>${c.title}</strong><span>${c.detail}</span>
    </button>`).join("");
  const selected = selections[step];
  q("#feedback").hidden = selected === null;
  q("#feedback").innerHTML = selected === null ? "" : `<strong>Assessment:</strong> ${d.choices[selected].feedback}`;
  q("#next-button").disabled = selected === null;
  q("#next-button").textContent = step === decisions.length - 1 ? "View assessment" : "Next decision";
  q("#back-button").disabled = step === 0;
  qa(".choice").forEach(btn => btn.addEventListener("click", () => {
    selections[step] = Number(btn.dataset.choice);
    recalcScores();
    renderDecision();
  }));
}

function showResults() {
  const max = decisions.length * 4;
  const score = Math.round(totals.reduce((a,b)=>a+b,0) / (dimensions.length * max) * 100);
  const ranked = dimensions.map((d,i)=>({d, value:totals[i], pct:totals[i]/max})).sort((a,b)=>b.value-a.value);
  let title = "Developing readiness";
  let summary = "Your choices show useful instincts, with room to make verification, approvals, and documented follow-through more consistent.";
  if (score >= 85) { title = "High-readiness response"; summary = "Your choices consistently balanced speed, evidence, equity, relationship judgment, and accountable follow-through."; }
  else if (score >= 65) { title = "Sound foundation"; summary = "Your approach is generally credible, but a few choices could better separate verified facts from advocacy assumptions or make ownership more explicit."; }
  q("#result-title").textContent = title;
  q("#result-summary").textContent = summary;
  q("#final-score").textContent = score;
  q("#strength-list").innerHTML = ranked.slice(0,3).map(x=>`<li>${x.d}: ${Math.round(x.pct*100)}%</li>`).join("");
  q("#development-list").innerHTML = ranked.slice(-3).reverse().map(x=>`<li>${x.d}: strengthen this in the next run</li>`).join("");
  q("#results-panel").hidden = false;
  q("#results-panel").scrollIntoView({behavior:"smooth", block:"center"});
}

function renderStakeholders(filter="all") {
  const data = filter === "all" ? stakeholderData : stakeholderData.filter(x=>x.type===filter);
  q("#stakeholder-grid").innerHTML = data.map(x=>`<article class="stakeholder-card">
    <span class="tag">${x.type}</span><h3>${x.name}</h3>
    <p><strong>Needs:</strong> ${x.need}</p><p><strong>Follow-through:</strong> ${x.follow}</p>
  </article>`).join("");
}

function renderStaticLists() {
  q("#deliverable-grid").innerHTML = deliverables.map(x=>`<article class="deliverable-card"><span>${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join("");
  q("#timeline-list").innerHTML = timeline.map(x=>`<article class="timeline-item"><span>${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join("");
}

q("#next-button").addEventListener("click", () => {
  if (selections[step] === null) return;
  if (step === decisions.length - 1) { showResults(); return; }
  step += 1; renderDecision();
});
q("#back-button").addEventListener("click", () => { if (step > 0) { step -= 1; renderDecision(); } });
q("#reset-button").addEventListener("click", () => { step=0; selections=Array(decisions.length).fill(null); totals=Array(dimensions.length).fill(0); q("#results-panel").hidden=true; recalcScores(); renderDecision(); q("#simulation").scrollIntoView({behavior:"smooth"}); });

qa(".filter").forEach(btn => btn.addEventListener("click", () => {
  qa(".filter").forEach(x=>x.classList.remove("active")); btn.classList.add("active"); renderStakeholders(btn.dataset.filter);
}));

qa(".language-toggle button").forEach(btn => btn.addEventListener("click", () => {
  qa(".language-toggle button").forEach(x=>x.classList.remove("active")); btn.classList.add("active");
  const es = btn.dataset.lang === "es"; q("#notice-en").hidden = es; q("#notice-es").hidden = !es;
}));

q("#check-draft").addEventListener("click", () => {
  const text = q("#media-draft").value.toLowerCase();
  const checks = [
    ["Acknowledges concern", /(understand|recognize|concern|expect)/],
    ["States verified status", /(not confirmed|reviewing|verifying|confirmed information)/],
    ["Avoids speculation", !/(definitely|probably|will cancel|blame)/],
    ["Commits to next update", /(by |update|tomorrow|p\.m\.|website|contact)/]
  ];
  const chips = checks.map(([label,test])=>{
    const pass = test instanceof RegExp ? test.test(text) : test;
    return `<span class="draft-chip ${pass?"pass":"miss"}">${pass?"✓":"○"} ${label}</span>`;
  }).join("");
  q("#draft-feedback").innerHTML = `<strong>Structure check</strong><div>${chips}</div><p class="micro">This keyword check is illustrative. Actual responses require approved facts, organizational review, and spokesperson judgment.</p>`;
});
q("#show-model").addEventListener("click", () => { q("#model-response").hidden = !q("#model-response").hidden; });

q(".menu-button").addEventListener("click", (e) => {
  const open = q("#site-nav").classList.toggle("open"); e.currentTarget.setAttribute("aria-expanded", String(open));
});
qa("#site-nav a").forEach(a=>a.addEventListener("click",()=>{q("#site-nav").classList.remove("open"); q(".menu-button").setAttribute("aria-expanded","false");}));

renderScoreboard();
renderDecision();
renderStakeholders();
renderStaticLists();


// GitHub Pages fallback: embed the downloadable packet so the public version remains self-contained.
const embeddedPacketPdf = "JVBERi0xLjQKJZOMi54gUmVwb3J0TGFiIEdlbmVyYXRlZCBQREYgZG9jdW1lbnQgKG9wZW5zb3VyY2UpCjEgMCBvYmoKPDwKL0YxIDIgMCBSIC9GMiAzIDAgUgo+PgplbmRvYmoKMiAwIG9iago8PAovQmFzZUZvbnQgL0hlbHZldGljYSAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjEgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iagozIDAgb2JqCjw8Ci9CYXNlRm9udCAvSGVsdmV0aWNhLUJvbGQgL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcgL05hbWUgL0YyIC9TdWJ0eXBlIC9UeXBlMSAvVHlwZSAvRm9udAo+PgplbmRvYmoKNCAwIG9iago8PAovQ29udGVudHMgMTcgMCBSIC9NZWRpYUJveCBbIDAgMCA2MTIgNzkyIF0gL1BhcmVudCAxNiAwIFIgL1Jlc291cmNlcyA8PAovRm9udCAxIDAgUiAvUHJvY1NldCBbIC9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUkgXQo+PiAvUm90YXRlIDAgL1RyYW5zIDw8Cgo+PiAKICAvVHlwZSAvUGFnZQo+PgplbmRvYmoKNSAwIG9iago8PAovQ29udGVudHMgMTggMCBSIC9NZWRpYUJveCBbIDAgMCA2MTIgNzkyIF0gL1BhcmVudCAxNiAwIFIgL1Jlc291cmNlcyA8PAovRm9udCAxIDAgUiAvUHJvY1NldCBbIC9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUkgXQo+PiAvUm90YXRlIDAgL1RyYW5zIDw8Cgo+PiAKICAvVHlwZSAvUGFnZQo+PgplbmRvYmoKNiAwIG9iago8PAovQ29udGVudHMgMTkgMCBSIC9NZWRpYUJveCBbIDAgMCA2MTIgNzkyIF0gL1BhcmVudCAxNiAwIFIgL1Jlc291cmNlcyA8PAovRm9udCAxIDAgUiAvUHJvY1NldCBbIC9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUkgXQo+PiAvUm90YXRlIDAgL1RyYW5zIDw8Cgo+PiAKICAvVHlwZSAvUGFnZQo+PgplbmRvYmoKNyAwIG9iago8PAovQ29udGVudHMgMjAgMCBSIC9NZWRpYUJveCBbIDAgMCA2MTIgNzkyIF0gL1BhcmVudCAxNiAwIFIgL1Jlc291cmNlcyA8PAovRm9udCAxIDAgUiAvUHJvY1NldCBbIC9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUkgXQo+PiAvUm90YXRlIDAgL1RyYW5zIDw8Cgo+PiAKICAvVHlwZSAvUGFnZQo+PgplbmRvYmoKOCAwIG9iago8PAovQ29udGVudHMgMjEgMCBSIC9NZWRpYUJveCBbIDAgMCA2MTIgNzkyIF0gL1BhcmVudCAxNiAwIFIgL1Jlc291cmNlcyA8PAovRm9udCAxIDAgUiAvUHJvY1NldCBbIC9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUkgXQo+PiAvUm90YXRlIDAgL1RyYW5zIDw8Cgo+PiAKICAvVHlwZSAvUGFnZQo+PgplbmRvYmoKOSAwIG9iago8PAovQ29udGVudHMgMjIgMCBSIC9NZWRpYUJveCBbIDAgMCA2MTIgNzkyIF0gL1BhcmVudCAxNiAwIFIgL1Jlc291cmNlcyA8PAovRm9udCAxIDAgUiAvUHJvY1NldCBbIC9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUkgXQo+PiAvUm90YXRlIDAgL1RyYW5zIDw8Cgo+PiAKICAvVHlwZSAvUGFnZQo+PgplbmRvYmoKMTAgMCBvYmoKPDwKL0NvbnRlbnRzIDIzIDAgUiAvTWVkaWFCb3ggWyAwIDAgNjEyIDc5MiBdIC9QYXJlbnQgMTYgMCBSIC9SZXNvdXJjZXMgPDwKL0ZvbnQgMSAwIFIgL1Byb2NTZXQgWyAvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJIF0KPj4gL1JvdGF0ZSAwIC9UcmFucyA8PAoKPj4gCiAgL1R5cGUgL1BhZ2UKPj4KZW5kb2JqCjExIDAgb2JqCjw8Ci9Db250ZW50cyAyNCAwIFIgL01lZGlhQm94IFsgMCAwIDYxMiA3OTIgXSAvUGFyZW50IDE2IDAgUiAvUmVzb3VyY2VzIDw8Ci9Gb250IDEgMCBSIC9Qcm9jU2V0IFsgL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSSBdCj4+IC9Sb3RhdGUgMCAvVHJhbnMgPDwKCj4+IAogIC9UeXBlIC9QYWdlCj4+CmVuZG9iagoxMiAwIG9iago8PAovQ29udGVudHMgMjUgMCBSIC9NZWRpYUJveCBbIDAgMCA2MTIgNzkyIF0gL1BhcmVudCAxNiAwIFIgL1Jlc291cmNlcyA8PAovRm9udCAxIDAgUiAvUHJvY1NldCBbIC9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUkgXQo+PiAvUm90YXRlIDAgL1RyYW5zIDw8Cgo+PiAKICAvVHlwZSAvUGFnZQo+PgplbmRvYmoKMTMgMCBvYmoKPDwKL0NvbnRlbnRzIDI2IDAgUiAvTWVkaWFCb3ggWyAwIDAgNjEyIDc5MiBdIC9QYXJlbnQgMTYgMCBSIC9SZXNvdXJjZXMgPDwKL0ZvbnQgMSAwIFIgL1Byb2NTZXQgWyAvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJIF0KPj4gL1JvdGF0ZSAwIC9UcmFucyA8PAoKPj4gCiAgL1R5cGUgL1BhZ2UKPj4KZW5kb2JqCjE0IDAgb2JqCjw8Ci9QYWdlTW9kZSAvVXNlTm9uZSAvUGFnZXMgMTYgMCBSIC9UeXBlIC9DYXRhbG9nCj4+CmVuZG9iagoxNSAwIG9iago8PAovQXV0aG9yIChNaWNoYWVsIEZhcnppbnBvdXIpIC9DcmVhdGlvbkRhdGUgKEQ6MjAyNjEwMjQxOTMxMTErMDEnMDAnKSAvQ3JlYXRvciAoXCh1bnNwZWNpZmllZFwpKSAvS2V5d29yZHMgKCkgL01vZERhdGUgKEQ6MjAyNjEwMjQxOTMxMTErMDEnMDAnKSAvUHJvZHVjZXIgKFJlcG9ydExhYiBQREYgTGlicmFyeSAtIFwob3BlbnNvdXJjZVwpKSAKICAvU3ViamVjdCAoXCh1bnNwZWNpZmllZFwpKSAvVGl0bGUgKENvbW11bml0eSBIZWFsdGggQWR2b2NhY3kgYW5kIEdvdmVybm1lbnQgQWZmYWlycyBMYWIgUGFja2V0KSAvVHJhcHBlZCAvRmFsc2UKPj4KZW5kb2JqCjE2IDAgb2JqCjw8Ci9Db3VudCAxMCAvS2lkcyBbIDQgMCBSIDUgMCBSIDYgMCBSIDcgMCBSIDggMCBSIDkgMCBSIDEwIDAgUiAxMSAwIFIgMTIgMCBSIDEzIDAgUiBdIC9UeXBlIC9QYWdlcwo+PgplbmRvYmoKMTcgMCBvYmoKPDwKL0ZpbHRlciBbIC9BU0NJSTg1RGVjb2RlIC9GbGF0ZURlY29kZSBdIC9MZW5ndGggMTAzMQo+PgpzdHJlYW0KR2F0bTo/I1MxRydSZWxCXDUwJnJAVmopKScoTj0wIi8ta0lPaVAvRk06N2hQRUgiZ0tyLUdOMEFoMzJVJEU6JWlbJz1jImEkJS1jIixcMFk/QWYkRywpOCtEJGxGYzQhW2BfUnIhR1hLQjBYW2IuZ18nTTtSVXE0KWkuJDI6TFlHJEFYUillZjNwPmUnYyl0Ll5naHMiKWQkQDZAUEZyYigvLnJ0Oj8vL2tUUT5SXFMyQ2UmZHFsKW0+TXQ3WiJNVTd0PG5iRWVucGE/ZlxXKShGcTAwbmUibWVDOj0+MXBDKm9BMkpYMGkvP1wsLltqXEQsO2s8NUwmaDA6S2NuLjxkOixwK1t1YjFtSDk2VGlCc3JdTDk5Zl9qYTovSHV0PEQmWzxfYl9TW3RCSFFxSFcjcVhyRFZWLz1nZllUIzxscWtURnE5cChZZllXUS9BWTluZSxnRz5Kb1x1WUNXSTxNKEs/Z01pKTtpPnM+MFZxMjFFSkdlZSlqTmJUb09yVDNfMlpGUF9OZXQtcHQuKkAnPTg/VE5Nc3M6Y0tlUDonaDQmPVEjSWldUVFXIVl0W0JbW0tKSFxxO3FQQWxXdUg+ZV4xO1Q8WStxUHBQVi9NUWghWkQmWWtQUk1Qb2g+PSUibSVpNSJEJUBMVlNeXiQscGpxTWosLFV1RHJGYjhGJC9xRVVEXiQnZmEyO11gbV9FJyxCMENnMEIrUDdycTtUOU5cQ0opTytZQD0vb0ItInEsYSg9UjFyWiFCW1xXKjxPaD5BQ3ArYixnYGgnIlpmKSlWUm9sJDtaPCtERE4hMGQ8TDFMVyhrJTUpPVVpZisiZjtWPmlgPFwyKUsncGhDLixHVz5rM1dpOi1ncmtlLTRkWUtPMWZRJCdqdUBTKzY6alVvb01ALmReVi0qNlFlXDpmMSg/RHRaYUgqRDFvZzchMSombXUmMEwjTG5IN0F1clxiI2o6UExnci41aFphLlM/Lz1AVmNNSV1GYUg+VV04YFpXaSZQNT1NJCJAcDxxLHQ0TjVmTl1uRkA3XCVKIzROPC5QLU9vUHVjUTleLEAiNV1bOV91W19cN00rVj8iSixKYV1JYjIqP1xjQypfaD1hRGplTHFxbGdDVT4sYU1wWz1DOE9RXikxKG8yU29rJm1fJmQtSmAsIko7KUg4PV1PaTZmJVIhVERDT29EOGcrQTEqInJqU2stbEsuNEkhWF9OcFQkVTNUOCJ1OTM4SzZpdDMvLnIia0ZEMkc2aDAxaVNWSUIlPCxkO041cnE2VTIqaENOM1BlW0d0WEVNOm5zIVx1JmsoNEkxYWAsJDkrW08paDg3WjZOTkZqIyciJjxbJjkpXGlSU0dgVWUiX1tRfj5lbmRzdHJlYW0KZW5kb2JqCjE4IDAgb2JqCjw8Ci9GaWx0ZXIgWyAvQVNDSUk4NURlY29kZSAvRmxhdGVEZWNvZGUgXSAvTGVuZ3RoIDE4NzUKPj4Kc3RyZWFtCkdhdWBUYkF1PnEnXSVxJm1cWlBeQGtmL3JsSllJWEgrNy0qQmM6ZEA5ZjxRLi4zXW9BIm9wNSo/ZihyXlBcJUo0VWAiT0ViYT5YQCI2VmtuXEhgVVlManUsdVNsUzdfa09lJHBVYkpOZzoxNS1cMWsvPGlqdEZIYGZZIVVUTTBoLDdJI1xAcjQ8NnFVS1MhX09jR2gkbFYtPW1WMk5HaG9QYktHPUwpJUQ3UGM5cUooKyUnYGorZCorW2FaXkJGJmJoJDdUT0BUZ18wR3JOQDQ/YVZNM3JrL3FzOUpsVUo7WShSZmlNcTYwNVFTUHRcMiUsdC1LZ24rLjAvPUU2J2VVSmBzbUlDT1UtSUR0W2RnRF1QX2Z1bFUtNThsOTB1QHVFLWhlaSdkYENoUmw4IylRbSprIVluRkFgI04zdCpGNmEqb1k+aDJSRV5tMktQcDRMaTdaZyVMOHFLMU1gcnBcMFctUyZcXktTIi5fOlBOQEFWcGY9RDQ5VUNHbz9dZ20iXlUvSTRMVmRdVmZ0KGlbVDZdam0zJXQrVyImZmRcKjxebFphcDZeOj5DbUY5ckQhNjo7PGlGZW9nKk5tMzlsMWU6ckZMMmxgbjM+MXRpXmstIjBzIUY0JT1halA3XDAidUBAY2ZwYDFgWDltZ01lZmxpPU86YTMuImFJUWM2dVwwJUIsT3FhSD9lLWNxS24zVjg6Ik5XNUlTWFRtazFhNTdwRDhEcVM3PGNLViYoOjZcaWxFXCk6IkhMUVAsOFtjUzEmbVknY0RiPG4oODQ3NSRWPCY0NzxBV1g3O3BDWCovTGFiaT1KUStiVHA0ZjFYOzonMGknPDc9RSkwK1NQRlwwOD1xckYmZmJEYnBxZyZnJWpBXiQ3W11pXUMwXmFmRkQ8bXNEKikuJzw4MF9wbU5xX1VeMFlyb3Q3UEROMFA2a01rSV1tK2U5c1JaNk0pTmNKNHIlVTBDOVY8REJyT1BXQUpPY05BSTRLNFooLFUzYjBqP1woYUg6Z1NhbVl1T0wqTV9KKG9ga1klaUMnNGRwSWMqbj1IXWw/L2FmOE1pUmouSnJzXEluaG1RbCdcZUpNV1YhN1I7Ql1gcGBtcFpGa29aSjI5K0tLKlJQM2tAc2csN09nRTJBS2RtazhlU0toYT1rRkRQbjNpWygzbXMnPyZWSWciXE1UKl9FPGdVKXFIPHI4TFliaU41Zm0yND10blFnQURndDpmcyksV0hmdS8+TEpMRjxeVipybWsqc2c4I19tOCI2WGZjWzxmNHJWMUY7aD07bFRoN15saWM9LG01XDJDSTtQV2YjUWwpTmheNGdwU1I5RENNITtdQidJPUhiKz1KQylFZWJGNUQzPmslMyhJXTREQ2lSUGJqJG9KNElcW1xPL0wuMjYyOT83LDlgbEkwUmwpXEpCdHRdWmIlKTVAKDJkJCtFTlU0PDhTT1VJayNNLks2NXEsTWs5YEhpbVVYSDBqJ3Qsby5nLEcjW1RuYW5YT3MkNEZzdWBuaFRdN0I5a2gyYk5FXlw9Nl5ZPVIqb1ZPYmNOKk80QC9BZ1ErMlUmckshJSYlN0wuKlc/NjVTRURTRDpiQm0iKFhCXlZGKD9pXEYlc1FdJExpN1kkJzhuXXEkc1IoQVhiRWpMOzxrP1Vgb3NHYydeQGlmPTVGKD43VV1rWTE6PCVDLjdLQTI5LHAvY1w0ZzotWmlkaDFtYk1iZltGVk41UWwiNjpiVlQ2az05KDVQVCg5Xko+bEJjVEJfQVQiNSUrQzVNamdERHNQVmlJZDEsQUdlPzh0Mi1iOUlDVURIMzohKkFOQVBPRjpBPmZXIWUocExgLkAvWyxCUy5CVitXWmQ9Mm9rTj9rL0RMQSVZaGVSU0RqVD9vOUZCMEdBVTBmQ1AwNDBxazpWbisxZidcR2pZLjdoQy8ldFVzSGhhOTFyO25DXWdEVm9IbC9vUkljU2lNbmlVOms7SVdPNlAjdGopNC1ANk44bjxHZycpNFlCZG1UQ1dFK18iaTtyK3QzcF5YX0U6ZTZob3BNP05FMUokLm5BRXIkU1s4JmMnYUVgWTpkNkk5ZmUpKzYxQ1FeOV0lYGkzRDpTRTFwL1tdaHJZQ2cxYWEsKFZpTWtsJCZaPzpoQiVvOlJwQm42KzVjOFddTCZfVF1oQUslZ19ZKTo8Oj9VPyxuKE8+U2klS2BdZS9HK2lyUjZcUlRxRy4kP0I1NEgkTCM/U2dRYklRJSdlUldUV2d1U1hkIi5pPVFaZ3VnJzc5Um1SQ0w2al9jVTNkTEhHI2w5J0Q9TGM/TnVAY01sJUc5Pi5XRWhEO1RnPUVAO2sucj8vJElJKG1rPHMlXjFqN05SUyhiOjhCdHE+UFwxSmUvKzgvKkVsO1cqVVUnMSZMRFo1KTk5QyE8KFVNNUVJbkI+IUY6YGxUMT8rXkg+TW0hPi1XLDRYU1NBMC9xQGtcKFxhSmAoXXFaNSclSWZcLHFNdEl+PmVuZHN0cmVhbQplbmRvYmoKMTkgMCBvYmoKPDwKL0ZpbHRlciBbIC9BU0NJSTg1RGVjb2RlIC9GbGF0ZURlY29kZSBdIC9MZW5ndGggMTM1Ngo+PgpzdHJlYW0KR2F1SEo5bG8mSSZBQHNCbSZiJENCI0pXUVJcWk1yUlNLPTpRalglSydHOnNiISlUXW5saGByaW5sS0FGMUtObFxkM0Avb0lDbnQ4REc1LUxgb0FIOEx1J2ZMaC91RDI2SGIsQy9CVlolLWlMY2xwaTNRJy5BSyFGL2JcWEEmN25rKFBXOzIuNEMvXlZmZiVMJnFocWQpV1tQdDY+aElIaj4mbDlVQXI8Q2U3NSsvKDRuWmhrYFtHUUJhX2pwK1IqYUhcLi1aclZDRjBhJDFPQz9oRFstKGgvXGZeKFwpQC5UUVRVMiQvNT5bczpTMWM/LihzOWwyX1o1cScqTTteLSkwUUNoRkkvZ05STyZiLFduc2ViOkouJUE1NmpLcTskMFtFQT0+JzlZdFZmZTlAbHJxSjt1JG1YYEQrNSlWbCZzOC9tVGFsaC06LC5pY3FbWVMnTT9XOzlJaVRFY2w4TFhVJlRRbTF0NEU+IStfLHMhb0UiN19TK2VVWyZGJ0FlIidaRUxBYzNsYjguUzk0WkRXQU8sZDtNXjpCSGgqI0dNQDdtUUA7Pj5fM0E7WjlNNGpyXFs8O1M5c1gpZWZhKSZXLDtlK0hPOCM2VSdqcW1sYT5RTj1DbyU5OlInZmdvN3VhZSdpdFReWktZSWNKMGIkc3FsNSYkMmVYYjQ8R21jdUVeRFxZajRUMkhuTlVYUDEvTzQuSVE4TDpTP0g+WyMqXDVXI0lfLTZrai1eXSxXODlNMlNlITlSPzxKUUs4PDRKTFdlQT9zVlYwUzIvRW1bVz0ycXRgWkEoXiVjajA1Km5uVU9uNiI7U1hUYSxoQTpuQF5GMjs/MnFDJ2RTY2AiMk4xKkRvOD41My1uVWpUcUclNFZPRDUrdWNyQT4yRHFdOGsyb3VVdENcMTtwJm9ISm9UaGBdPlJQSCowLixxMGg8aCs1ZFxdSCo4JToybidhXjNKbjQ4KnBzU3JmcGw7Qj4uNnFjLTFeIUgpVFM7dDwsWmZUTjlBMTxdSTBBMitMMVtTalcjSkBwZj9AL0xraD1HLDVhWEY1RXJXWUBVJGJmO1E5ZS5HcE9hM2lILDVubyJGWDtZImhAZCFyV1BhUDhUbUwhcSlpckdWRGkwYjBwTERuZElUKShlW1srJyhGSCZhKXAoc1UyPWBDPzBmcC9RT2dZcXJCYlxfWE8rWyRxKm1BJzxUYzQ0R1RHJz0nYTxSLFhscC9KPWU8dVMkaWVkc0g7cj47T0xuLzpoZ1BiMSUnMWVjKmtZSHIkal8qb181OCtDITxaJWQxP1Y8UzsqWEU4MDVqZiY8XmlXRjgjSjY3N19AWkQjMiddQGFgZXRMLVY6PzBwQjYhSGJLYDxrPEdVT0tJQWYtbWcvMEYsTjRCJk9NKVVjVygvS0Q2P0ZaN2tRXTtVazVsIlB1SWJOY19QcDFTIz5IXGpRJ0twb0kpXTFtdE9qKzowbWwlTl5Hal1JMjwhUy9WQmE7PSMuSj1eNDk8KzRrdCdXRWddKXAnQyleVVRxRDNWTiRdQWk5N08mXW9tZ0JDZHA1cyRcYzMoIShgXSpSQldvLyEsMVRINSxMRCJgSGw8aCZrTVNGZjotVFxuO2wyJVxWUFdRXmhCR29bbFgiYGMmQjdJOEZObFVTL0pyKyNcbztqZDs6OVVybWJacE9mV19QdEdLTCVRdGE1PXVJI1hfZCMtSS5VOmk1ZTskLl05akVVKzRaUDFsWVE3b2BadG1uWllaYkdIayVPQmtZbF9iW19pREpuWFBvajZxQnUudD8yT3ByMlZxQH4+ZW5kc3RyZWFtCmVuZG9iagoyMCAwIG9iago8PAovRmlsdGVyIFsgL0FTQ0lJODVEZWNvZGUgL0ZsYXRlRGVjb2RlIF0gL0xlbmd0aCAxNTA1Cj4+CnN0cmVhbQpHYXVgUzlsbyZJJkFAc0JtJmIwR0BgMzMsNGBtLGZnYEdJcEQpQl43L2VBO0dFKFBRXDVWKCFcbWZQI15PdTgsbSkuZFIvTGEhLTxEcjl1c1tnSGkuczAyT2ElRk5vSl10Ik0iTitjNmlRaW1gP2hVQippZWBYIitTTktJQVhtLFtDKCdNYClNdDMqYUY8IiZeT05iU0YlRyo3Llo9JCFyKVc2O1k/L0o2QVVmT1FEVz0lI1tIbWhMZTJRa1E7ZTc8Lj5lXV1cPzpKbUcsXiNUbkEyO0wiWTxOOSlEayF0aydkZC8/cnBYVXMyJmRDb0lWKFhubllfQWBcQ1w7JWpAQyYmdFcnJjRSU2k9LyNOMD81W0VzYStATGlMWSZvUTtFaE1aJyUlZ2RNb2g0WnRxN2Y+JFchQDh1N2hcSk4rU1tAanV1TUszQHVeInAkWmpUIiJgT3EjJWxob1c8L2FaTDFDX0NXZ0wpMzBuUCdXOmlEbjVwMlFVaE1Mczo+Qj5gIjFrPmRGSm1vT0N0QiRjLGNyc2g9SzJNKT5yP0FaR0o1Nzg2ZyVLPzVVVmJSNiRrOTdfSCImWk5OJiY/RjJCIU80LjlKbG10XTJxZydaMikxRignWFxPb10vbCY4KlhBTSRCQSkqcUxYQixHaSciRjBOVF8sUHVMY15oOU1oWy8wY1IkQ0RDXUxqX2gva1YrWXJHLyU0Jz5ecyNgV3A2JWg2LC9nLTtXKFtGRm4jaHM3ViYpXUtFOj0xYFc7ODlTVEw2RUtcTTIuPGdJMjFkQDE+bHU3ZEk7MnVCdEshJT1sR3RyaUMxWTJqMDsqWiw+KFZyMFxUKjNccid0NTwoOmBgaV9bXHBZSUkqSHMiLlcrNj5JQkhxJyEuSGoqOkBQYD1TV3RMYmBoR2AqLkFVRUpScDFMKldJaXJmNklQNjEyOVpATz1jS1VLKiU1WCpRX1VdSC9JSlxbaF4rLWomOm9DRzp1MyshJkorSllcMF5KJkpJQWhNIVJeWTc7OnI5aUwpJWN0P2hhUUlkcGUsczZeOFpdUWBLSGBvMS1XRiEoWjw4UkRwJmxPPikzYFdgIzo/UTUrSGQ7JG4lOiRjcV1FWHA/b0ddUyIkPVMzcTEjV3FfQWssXkZEYlFyLSt1WUprNiJvWVJpQFAuWDw5LCwlUW5CV1lObkUobmonT0pWM1xPTXE3NnFwTyVoV1o+KWkwcWZrLiN1YjVEam40dDhqXy0qWj8wQjlmVF81XHVTKl5uYkExOXI1VStCLkJwKSpdZV0sOkdrVFQ+MGZXJnU8RClJVyY4aUwvSjhGWGokYkJET3BiNDtbREIpNWloZSlPKW02IXBIJE1wWTEzUCc6bTxOUWxTImpMY3EzIzI+VGxbIiIubTcpOFU4MGtbWDsuVTdGRS1RPDBnRUMvOyxLXU1hcDFUM29cNDxJc3VxXW5hZm4vIVs9U04zPWQ4TkkzUVdWZEBTbSw3YDxGXi0yNDE+SEM/V2M6XnMnKj41Yj5cWSxvIldXb3FVITRccjwjRVZBZWszNyFGZWs8TkA+KjBuWVM5TVpML3BcJClgWTY8RU87WmRTK1xedFJSdGtvWSxkR3Q5LSFVPUFMJV9zYmFaRURJLkciPm9obktIQ100R3JFWGkwNlUibklXSmA5dG8hLWwiQEwrQypOc2glJydRNF9WUHBZbiIrN3BCKzlfKC5GSFhCMUhzR1hgaFZXYSNhcDJIUk5ORmxsXVpKJDRPbE0pMGU2NSM8clA0WENlIiI3VHJoMEtCWjYram0oQkJbLlMuUHBqZGctND5ZS1tSM0AwY2ErPFFqSCsyUSkxa2dzcW9LWz1gOFVTKSpccEhTcypDKDowM0opWlBwSEUlQ0tUKTBtVSgvQVoiRDhZU2RxVnQhXVAySDJQcEc6LFgnV29EbzBfLj5sKG8kVCMnUzV1b1UqRHRyLnM1OWAlWjlBRDhrZSJpLUVCMHA6LiQkcnI+UVM3Ujd+PmVuZHN0cmVhbQplbmRvYmoKMjEgMCBvYmoKPDwKL0ZpbHRlciBbIC9BU0NJSTg1RGVjb2RlIC9GbGF0ZURlY29kZSBdIC9MZW5ndGggMTAyOQo+PgpzdHJlYW0KR2F0biM5NWlRRSdTWjtXJ21IJlU7VXBzJzhzXnRSa1tIVT9UTyllLztjYWBNTUghLWhZNUBQSjpwUVhoSklyIzUkcVQ8b11dWGIsOmFuIWM5O2VdU009K0Y6bVFSSShVSydzJFQmZDlUTF0xVWM0XjkiL1doYkdEXCZXYzE4RmpAOVdlLUNDT2t1QlFcUDprSypZNlE+VW8oNGFFKnVKbnBJWVgkTlI0SXBfWlNxLSFZKl83ZW5TZDxYKyZQQkRQOnVPPWpcVEM0MklCUkwmN2puP3E5c0c8bzdXYT0wMj9uUHAwImZJJGtfMVEraSVgO3Q4JyFzM1NaL0hObT5JPF5GRmMwcVUjZkFcK3JrYWw3KW1HRWl1WkdJIWxRNFNkZl03Vk9tQVIzNWFhKTpyJWBxSScxQWJyaSEjWENjYF5zLGlhVzc2YklfPS1dcjNcYixLWSwoQzssN04lR2RBUjZyXF1eJVVfKD0sc1ZkRkNmajkiMm5eUUs9cS82UlMqQ0AyZUZBP2FLPl8nS1RbMkZLZCF0ZW1aTC1MTTZLczwmZF5ZLFxSJl5JMiRSOWg0N0lSYl9vY08+PF1APlRkL1lqOmpZcyEoRzFFWz5Kb1hEWTZTXWFXYVNEbWtONWtVcypEbSpzJ1I0PmtNdWVJSCNcQzg7LTByNFEiUUZjSUJtVmwoU3UqQEBES1xyUUZJSTghVDtwTllMJ15qW284R0VsSVxwUF9ZRGQxRkEkTGJEciRfbG0nbW9qIjFBdFcxV0piaE0+cHRYOy1vbigzOFAzcz9sNFFaSHRMcmYvXVVkL0ZsWSNbTlxbPCMnSnVmbm5QUjJvM3NKTGVLcHMjbTJOczhhREVwOG5PVEM+OWdNYSEkQmgnc2A0TismbCVMLWgnRE9fUClqOycxKWJNXC4xPi03VyVMTDxSN0szKy9cNTZgXihVIUUpKCxAVStNVVVwVWlraWxTMUxtbWguIiFUUUI5Mj0nbTBmVHJTUyYuLzZRdFk9IiczYS9oWmYoVW1tRHRuVk1lTlt0KlVhXjJPJC9zOnJWSUJkPClpT2UlLT9UQ101UmAnO2E9ci0sKSMwQzI2Q21eMltPbVIqVFRHRGxwSkVQKl1CdWxMQzwpN19EVWRyJUtJRXJDPFFIbTZIKmYiLzotIyFZTFo4L0hGPyVVZ3RCSj1ic1NAJ3JXXFtaOyVmIyxQbHAnVWl0K3FTbl0qYTIhRWl0LWsoTD5JQXV1S1Y4OUEhPywrQClkLSteX2xGUzReMSJjYmJOLDZoSkVxbk8iImAnS2FyU1NmPzAza3VNUEtNOVo/O2IkJldAPVBwIW8qN3V1Z2ZxOTMtSCxFO1wlXytsSXAscjBhVH4+ZW5kc3RyZWFtCmVuZG9iagoyMiAwIG9iago8PAovRmlsdGVyIFsgL0FTQ0lJODVEZWNvZGUgL0ZsYXRlRGVjb2RlIF0gL0xlbmd0aCAxNTM3Cj4+CnN0cmVhbQpHYXQlIzswMUpNJSI/TyteZ2whLlcwL15ScEBZRTxsSi1QU1JsJyFxWjU2XHJDYzMhLDptPCFoZis0KlY4a2dvNSgxL1U1I185XkclajJtQzpTNDxVOigpVEEyMS9MMCY7Nzo1K2MqYzplcCRWL0lKJVgyWGoiSzIvaEsuRi48czVhJDBPJGZZb2JOXCE7K2stIythZCZuSjJcVSpdWWUwaDI4K2IvJy5wNVI6MXNFLG42KTJScDY5JlRdL0JsUXJTXWVfSU8vTjRQX18rWVtbSDkva100MT9YV2dRZidpIl9LM2RJYm49aiYmcEgoT0IvT0Q1PklcW3NSSDpVP0hfYDovWCgqcllQQkdTaFNpLl5rWlVaWGFzaGUobGNiXjA4bSQ2X3FZR1QlLk00VzNzUDQhY1ozRTZqTCpZTUtmRSVRQTpQTSEpdCkpYls0UnElKmM9O1NFV2hjajlHb25tanM0TCUmXllEYFAuUmklOi4rbU8uWGNfZSU+ZXBfUzwxcmpVKTNLI11aTT5qdXRiL2EnQ3RAMGZISjZWR3FAMmU3XzhdIVRYS0syNlgwOzVTVDAyRztwSC5mVixCVjJMWGcmaHVJZCdbMUQrSGBMS2c3OUVxdCZgXy9AS1pUMFRmaXJoZTgvcmZELzZbQUFkLnJcbk07bDBnMWBOSERfLGdgP2wqI1pMaHJwWU4kU0xCInBJV29gKis9VXJSLCltVmMnXVdIMSteYkxPRUJWbDlAU1hUKl5NS2pYX2ZeSFI2Y09RY1ZxSmcpQXVxU0BxciM4T0lhOkVINltbQiIoJTRWK3VzL209UmNfVlFzOUAxJVVsUWIyI2JlUlhrS1A5S2NOPUAmRUEnXkxvcVQ/bU4wYnBcU1k2PEdwVXUhXGg5dVNLcG5zZCEpZjUrPnNRQzxLKyhtMFwvWWY3SyNQaWhWTWNUM0VRXWxbLCdwM3FjTGItbmF0VV9qRGUwUzxiNmZrSUFcLT1OYT09cF9KdChlIiZZLVU5OWcwaVdvNTM1KyNCIl4oOyM2U3MiQihgQzBpJTQzZVxNIldyLyw0RVZHZXNJV1FCPSY8XT9JV0RDXmYoMSFwWTBKI3VsTSUjY1ssZmtRUzQzSiwyc04mJWBIJjYnXGpVSUJmVUReJCRiZjhldW0qRS0jS2dhKzEtO0k2ZUZXUjxzV2wwYHFKOyphPDlnYGVhJkcsSHA1MGApLEQ+YjYjXFRJciNuJSY0MCtbNXEhNFQoRUZCTUhXb2chVGZXIVs/c1lIbUw0I2ksVzdrUUFGRV9mLlM9VzxfNltbXlk3VDRLbjU8YVIhQz9vZERvJTZxKCxjUHBTMV1OJUhKL3M3ZT0mMztnJ1ZMXmAoVT9gKEZWSyI9NllaOk1sXkwhV20sN2A2VW5rUFRbZ28sLUAhP0VZQzc+LzVATm9bcl5NOE44KF9udCssQUJMSSlEMzdlRD9PcmFWaCohPEcpYHByXmBfZEViXzZPK2s3JztXbGA1amlaKChaTVdQKmRnUHRmclg1amdCRW07MkRSR0FTQmNKYkIxKj1sX1xCZTNvJHFYaURNPU1fR3M3RlI9SSFAYSNwJkpoYktMTW1acDs0YjIyTFAjbyZrSE0ibjlNQ1BZJiU2PmY+VXNPVCJHXEpXXUd1WShBOU9tIVZMOjVGLTg3VnRzKWkpSlQkKEVXVl9qYzFta1pQdTRbOFdbJW1bJDwlO3NaI0c1T25fKVMuMjlZKmBxIyglI0lUMG1SayVXKFFgQSd1PjZKZThFREZONDFwVSIrKkRRR1Q+WSpjIzUpNlMibENwUV5bNU1nVzgiZSc+a3NbVj46YCFzKmRCY0hPSURTYF82MkZtYUwnMm00WFpVXTEhT2xJRj5oO0dcWjxRb0xHPDZjb1M7JFphWjk+LVAkSCZJaiJLNHE0XFpZSD4xZiNQP3A5VUgqSD06NmF0cXNrbFBbLXFZNVpRckpiOydnOilNV04wZExBXUArRmQvJGdZJGluOVVqWF5AZFo8ZlBsdTpYWztHIic+TCdmaDg5JH4+ZW5kc3RyZWFtCmVuZG9iagoyMyAwIG9iago8PAovRmlsdGVyIFsgL0FTQ0lJODVEZWNvZGUgL0ZsYXRlRGVjb2RlIF0gL0xlbmd0aCAxNDU0Cj4+CnN0cmVhbQpHYXUwQzlsSyZNJkFANy5iVjpcWVhmNSs+W3FsVWMmJWNQYUU3KWo4KGxHViU5O0ZtUHA4NVU9NlZAJjUjb3EtZVNIK3NAOzwkWCpdZi5fTWBxV0AtMDw1KztjZio/MyEiISg/IWY7T0hrJFIockllQSo9NUtTTXE0aipZQVMuTlcmMXM/UjxPdGsnVyFkYGhmUDVgQD0pR0Q4SSFyUUY4Zi8oN0U6bStqJUFBSzRGNUxNbG5abjU5KCdHc11WJ20zSTU4IW1vWDlzPnIqKCFOV1U9MyprPXFEWGZBIjd0RitnM11rRzBhWmhmOVJhLDk4L0U4T14iTTpfJiVoJ0xLJChxPWRCYWIzSzVobG4uImBYYVFPJ2N0U0BtXCIoYUFfOTpVOlUnbEdNWTdFLihybCdyMSshbWFsPjROdG1xYFFANjVdUlNWNUAwVTJnc003JGBkSGIkcT9mKyxpLzFtPjo2b0RWPW0oU0s4JEs3S2I7MkdXZCdSPW5ILipbbmJiVGI+RyFOXkpyTGxIcjthOj1YSjtLbWVNKlM1c2U+W3U+PDppM08zMydRUzByQy00S3FUWjoobGI0JGs4cyhqLzcsaE9EdUVfIkdGLnN0I0BFcyMnMTIpSWlyKFhNOTEpYElyQD8uPGxKPXFoc1BPcSNyQihiM0FaMFtYdSEoOiRvTnBAbENjaCpxLjVLLTVMR1luXks1TjpSP14sUFVxTWhrPzZKY1BiLyZRR2FlWig4czpqMHBFcUo/X0JzakorSlBzUlVhRzpCbz0/OStVKWBgXFtjQ0U6LzBKJiYqUkorRilJKkljdV5YVyJETzBvJTtDVmhRZGdVQFlpXSxSSmVwQU1rc21kJFwuT01ETyhxdUdFPUIzcC0uVi42YmBbJ3EyUDxuSU8zL1hlIlohS0RXQ09xIj46Nk5uN3VuZDVTcDtZTkU8J0BxIyo4LE0mZSs5Nl1gZ0RpOi1FaWoidV0pV05XOUYoWk4zWlA3KG0tRTovUjQ8bGJUODQ3cVkyUCM0VEVYPiVqQ1c+MTxPLUwkUlNaOSRXPkJiI1gkcTouZWlATiUzLTUhc1Q/TWlWPG9BKW9DK0dYPFRIV1A3cUdaVDBGJGM7Mi1taCJeTSdNPVUpP3BaVzE9Xm8qT1JrJ3BPcWMwTT9NQi9aQVouIjUnQEM2SjAiTV4jNVhpLj8yOjo6P2lAMUNNWGBANjdkZFlhQG5IRV9uX0dyNj06bksqKE8zblUvdExScUAlITosSjFmKD42ViVGWy0qc1QtX1ZFMjNtLG5aVSZObmEnSCNAaERldDBVXis9QlpGO1ZnW2A5TG5mXl4jUz9BMElKNyFAYVxLbktmIS8+I1VkIW40JSxeO2BAWiwsaDBOIyMvVkUnJjooV2lyVlUjYnMvQEpzNyxVcGVAVlFvJ15fcF5kIWhgVFlsK1ckMzJbc0UuQ29jL1ZlP0hgTicsMF9PKS5APDQ8SGM+cTEjM1MhZ1tgWjxoZmllcjZfbi4+QGNBRGVvVCtgQmc/W0xnQVAvN1RmLWthWTIpWV9mXkUrQyIyRU5XQlQ0Ikwkb2YpLmQoaDc4XzooXFZLVjoiKEFIP1dmK1JTJjUvYSkwPUVQTElTMTA6JkBTWWw0XHM9J1NPTFxLYnFaISIsNExbcDkoL1tbI1IqZzg3W0ZfbSUxOnFRX2Y2Y1kqSHVYPylQNlkjcWZkVj5ZQFxXR002b2dmRTdIWVRwMkdDVT50U1swXVZLcCNaVHVGOWttS1tvR0UsUGAsT3BddUZDUT08R1BLOUoyVUNtV09GcWJDU29dLUJZZFlqRCppckhXJzQ9WmBTUk4oOnFqbDwrYiczOjJTTDk+OUMwJHBWWTFXPy9MOHM3Q3QxKjdfYSs4Ik49WidbRyxvXy4/Rj1zREhnKlxmRWtnXSNQKjI2OkJ+PmVuZHN0cmVhbQplbmRvYmoKMjQgMCBvYmoKPDwKL0ZpbHRlciBbIC9BU0NJSTg1RGVjb2RlIC9GbGF0ZURlY29kZSBdIC9MZW5ndGggMTUwOQo+PgpzdHJlYW0KR2F1MEM5bG8mSSZBQHNCbSY8dUgjcFhtbG1AaVBjcEBzX2tsOXExTEVlLWJQNjoxZV8hKHJyN0kzMiI7UDJkc3RBbE8rSCohLV1GbUkmYDwvImBeNnBZNCNxLF5SLnM9MTpCaCFBLkA1N3BcVEFHQkMxJHFKdC1UVWdFRHJrNUA9TkdnUyZLZFs3W2xsSF4tOW9cLGwvcWhxNWZSbydgRFw/TWROWGlSUz9PcWY2UWM3PW5jQnJQImFZI0hQWSksXHJnRiU+Rm1PSk1NVEEvaU1yXG4xXyhhQGIiWihMJGAwTWROJUIsOmRjcEhWa1d1Iz45UU8yNWYtVGwkTjFaKiJOJCElOHJrRjkhIUJnLi5rRUFdWUhaczRPWV9YZXJxUDptY0lUWyFWbzsrU2ktazxwSDA3TjUmYUZMQmZJaThlLEFxYV9iV3JSb0BgIW07WmtqYCM7W2FEbTdsSzsrcj46dSU+NU01akpWPiQ4ImUoaCVhKjdrLFdga1ZUQWg4amM9X0JWbWRFX3QhXzg4NzciLlc/XkxiYyZPJj5XZzdtS2U0S0JePk05OmhiRGtxcDR0MkBJQ3NNPFcqMFlJM2NIaCE9L0NbXGopYDwuZWk7PTtSPVtWUCs+KiI3Sm8mVyJnZ08rWk5kYlZiRzNrQ1dVWU9UPSNXcCZIPnIoYltUK1tPciJTS10ySDYsR2UyPidVdFUlcjQ3N3RYZjQqOkdmPWQoVT5fLmZLQmprL0Y4Zj8iNT5xXmAkO0FNZSs8WGRTYU9gQkJdJ2w0YWtFbks6UWVDRmZLK1kuOjBNWyNROVYzM11oaWZJc0RkQFo6dTxASykubDA+NlAyP1NLZFpeJmxgY1dkJig7OEQxJ15hbj90WXU7LFJQNzorL0YpOkxNVU5KLy9MJ1oyNFUlI1BVUFVgbS9hSnItUFhgaExWPFBAODk7NDExJkh0ZThxMC44PygnVWE2b2hPVVhPWEpLa0pARzQ9IWE4N1M5aWQjaiVWSyFNXU5pJGE2QypnMHNZazRkU2BlRDlnaS81aW1DM1lvP1ROYSY+IiRKVDVCanNfOD5ELSVFTmJWJHBOXDRtSXFGSVRqSXVIVyRVMnFMU2FYTjIjZms3Oi0iamBtRipPIjRMbmBdK048QTVSWERScGpiZjFfJ1dOX11YPmU0JSJIVyI7cUkyPSgtKzpPZUdeSjBHJXJKX0MzbyUqQixsYylAZGNBcElVQCpNOixsYWJxa2RxPStiKDdKIl4hbkpYakhXMSIsNl1eO2FBOzVlNmFRTGRDby84OE5WTzVxdWVkdTMxM1glOTZrLFcoLlBDJTh1OXFiRGwucUluV2YhXSVxU0RUbmRfa2A0byhkXV4mdFdTYXNVNSQ/OHE1VGI8U0VvNVY8Y3BsRnAtKnBOYUx1b0xwbyskQE8zWG4vSzdhaFwkJmZHW0UicmBRQTRlLGdlJjRGKzlnJ3AjL19xRTRSVCwxSkg8b2NkT1BxJHRoOF8zIWRDSSM/Si1PJnVFOCVxbl89RyZgSlFhJFlycmkkI29LKyNnPkwsVyIqOmEmcXE5TzUxcGNkZGI+aGE6SEZkWk88W1pnY0RVKE0vOjFjSydOQkIvPzJIJyJIJmo9PDhhbTkkOk1eVTJzPy1aQE1fU0cpIXVKNjtrMXAuJVJlQG84WzlQKDxvQU9fREY8OUoxcUhjZj9KMixgcWpFJ0M5Xyo/YyZVXWhjTztgQFNWbTBiJ0lPWVY5ZzhBZTkpJCNaNVxbWyxmSCpXQmI8YVg9Iyo7IWxyZi5ZKnJBLERJWmRGNltYbVFlajpyMWNOY1A3aj5WN0QiPF1PMmZcOltuQExfcEZeQ2wnPyEsYVI/RVAtV0tiMFdMbnImNGdZI0spc0trdFE3ZlhbKERxIWM+LmZGaTJHZGVuaiFeQmxiSUYlWVpbTnRhTVtVc1YoLlZtLE8kLzxGbSNUS2RpIWhBc0cxWmQyMTAuRWEvZSlbZnFyJF0nNUZRZC8tM34+ZW5kc3RyZWFtCmVuZG9iagoyNSAwIG9iago8PAovRmlsdGVyIFsgL0FTQ0lJODVEZWNvZGUgL0ZsYXRlRGVjb2RlIF0gL0xlbmd0aCAxMDM2Cj4+CnN0cmVhbQpHYXRtOT8jU0ZOJ1JmR1JcO3RJW2djMlBQa1tVTWtTKCgwJ0w5cWInL3I5VSlybEZHWk1aKkJXLVNXK2VLSS5HMChzJV4qM1RsdUQzK1ZbRF9tUW9RW3JdJ25rSjIvK1lDSSEtQC9eLk1vO2VLYnFgPk9WbC4wXE4zdSdHKC9iO1I5UDhVIVgqNVhiZW8pNlMmQTVnUHFVQ0FlS21XST8ibidIVC5ORzkyNj5SLkFBaDkkXSgrX29hTjlJNnBhYjZnSCFIQHNBVTRiZD10W0QhL2lAL144akRjPys7Pyk2Q1AnWS0+TEhHbTRDZnNCdElgOE9MOzo4IlciLDRyOj5oY1Y5NT88ImAyWmtUbEo2Rz91bjYnNj8pXjxfQHNLMDRibFA/Vm4yPlBIKSNPY1VxUz9bU2Jlb2lMVUdtY0E5XS5jJ1JLZz8/JldjdGxtR2J0ZF9saVgiUXU3ajU0bFBoJSVsOjJvOjkhSUgpPkY5PFYkMUFVOidnOE9hJyJwSWtYL1Z0I14uI1plRlg+ZDBETkdAQmM2VWdKVl9wWD1wVEdzPXU6ZzombiwnNGItW0k3RDFLL1dNVTdsOVE2MUZeWCliRFJVTzEuX2gzUV9NVnA+LFRpXk89LzdzbycvSyJfaTBRZS1qRjlqNENIb2ltNWdeQDlWdW9JaWpRXCpKdSlBKjpxTXUmPF0oPCIubkJgI1NCKVFNV3JqQS03Z2BwPitEdCotPFgkMWJVbCc9Rys3Klw+alVSMDsvMz5QWFsqMTtoXV8qSEMtTy0yRFliTktBJGRoJSwyaGg/VCRMUUsmWV1YJmxrb2pfXjpqJERvUVhvNDtOMyUlSHMmW2UyUz5vcUMnYmZQTiIhPFZULUQ9SWk6NUYoY1ZXWil1ZFJgMSgoKSYuWWlYS0VcSF82M0ldMEpsWG90UWBwRXNVUj8oKUtFXV10JlldU0ZcN0JtWExFa0lRXExkIzlXW1BlRl1fM1UrJy9aSmxrIjpDIl9lISk7NlsiLlMjZ1ZcZGlEWVRhLEMzNSUkTDRCZ2FZIkY9LFslJTIjU1lZWydWVz9RJy0ubGVgPjJFcilldU5KXD9wTGFFLSk3cl80PS5CZEVPb1JCNkZlQEohT0dKcT5vXD5TUGhlZllzY206WzxqQGQjNChXR00lRks6bF8zQ01dJFJmWUonXU86cEhNQDBEPlc5WSNuRCE8cj1oTD1kJSg3bDl1Tj5qPChlVzFVYkByUURJYkY/JiIyOzU6P0QiQWQ3N051YWM0QSNxQyoibVVeOzZJKmx1MD0iWjtwMSRwNzNsZEFXckVvbUksaG1pUCdOLXVHQScvU1hEIkNPdDtPTmNJWUEyRkQlWUA+XkxUQjtHW1NoR34+ZW5kc3RyZWFtCmVuZG9iagoyNiAwIG9iago8PAovRmlsdGVyIFsgL0FTQ0lJODVEZWNvZGUgL0ZsYXRlRGVjb2RlIF0gL0xlbmd0aCAxMTI2Cj4+CnN0cmVhbQpHYXQlIjk2NlJWJkFJPS9tJzRmLy1rXGteWiJdW2stTCciIj81K1BFOGhhJ0I4X21iMidqdVxuVUdRQ2dDJWVcLUcjb2shaV5gaVBcSE9zIl81ZHFGS1loSTVLRVZjYlFnZW04byc5aUksWEg2TGZnblZhSj5KYl8wYSlKZTEvPlckWD1QNHUxRU4+V2lyQk8raVBnTTpYZmI4bkoxYm5DLyxVaSNXJTY/IlgkVG43a1xYQiwuZnFwYTpaK2pnKWtkVksmRV0kK2xgKWBvQDxEc1k7c1NlbS0nIi49RVouIzg/Yz5KOCQicjhUbi46ZEdgTWFFPEAvK2Mjb0g3WlZNJVUpbT5wPE1lKC1hdVQjYSUiQ2xASylyST1EI0RdUWRAbFwlOkRMUEg5XylHS0wkbkRXZCZXRkUhQyttQzlPb0AwZVNaOz4/Kik/a2ZcPGQ/PUd0SmIzO3VPQEFqUkpySSNdakxFMmRBITcrSF9CTz84N0klLzEoQ15PMydUSzVwYj1CVy44MkpGWGFQTWVUKkpddVpSJ2ZOUjdrPSNXOWleN2hUYy1IOSJsLjVHbj5RaW9sO1Y3JENkQnFiLV5kcks0SHJLNi4kKFVePmsiOzlJLjcxS1NdMVc/WSJhJiI0al5SMW1AIjM8TjZdY0k9b0U2M1gtWXVSMy1mVy5ca21mIldJJ1YxLUtmXGBZSSk/KnEhbTxpUyQlJFhZbGohOk1SdFJSWkpBckEoTCQ1LDQyLEtTNTBQQG1ZRiRJQSldRTtVWzheZVUtaWpCdG1pJm0kWWxWR1hfWWBWKVJCZj1nWE9mZS4iZ25BJG1ZWXJnSGw1PGcrTzJURkRMQ0BfZlNtJGxVbzhfIm1IJ0R1Sk5ZKi44YGJSWWY5Sj9UM2xkQGJlXVJMZEZ0Jj40JVs2PFxRL2hZQVxlYWxqRHBHSDE3XUs/Jz8kVGtHJSIrS0BOVVg+Pih0XnJeQ2AudCFtVUhSVTlIMGBGRF1eIlJLa21JNkg0ZGdrJUhdcy8qXzFqL2QlSU5mNyVzTHRYRyhBLl1RZiFwZUBvRTNXczw8VVlTMiVaJGVhTkdXSiwtdSs8OW9TQlZDb2xpQVkuMGtJSEo6MHFgREJXT3I3ZzttbjNhZ2suYSIzP0tgK1NjRTlVJGs0XlVaKE8nYTZUcydhKy5CMSowbSlgcDphMUFqUUtdbWFZNDY3WFtdMlZhTSsnQzAwQWMsYWhiOUNuUzwwYytpLkp1aWg/VjtULCcvIlZXOCowRV87J1pZPyFwbFlSJ2BkW1JSN01NJ0JeJi5oayRMZytOOSsmU0N0PCJoMGFdaissVVRYUnE9YXIpIW50ZSskSkZXJXIndXJDPG8sQVQvcSNYVzgoN1xVRz4+Tk5fMT1XbVx1YDhFQGVmXDMuRCcoT1M9XUIycmVGYk4sZEsxJVpOOV9jdU9sM2okXCI5WWo3NzpWUEVga2s7WSNRN2RuNjRjaFouQUU6T2goLkZ1Zn4+ZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgMjcKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDYxIDAwMDAwIG4gCjAwMDAwMDAxMDIgMDAwMDAgbiAKMDAwMDAwMDIwOSAwMDAwMCBuIAowMDAwMDAwMzIxIDAwMDAwIG4gCjAwMDAwMDA1MTYgMDAwMDAgbiAKMDAwMDAwMDcxMSAwMDAwMCBuIAowMDAwMDAwOTA2IDAwMDAwIG4gCjAwMDAwMDExMDEgMDAwMDAgbiAKMDAwMDAwMTI5NiAwMDAwMCBuIAowMDAwMDAxNDkxIDAwMDAwIG4gCjAwMDAwMDE2ODcgMDAwMDAgbiAKMDAwMDAwMTg4MyAwMDAwMCBuIAowMDAwMDAyMDc5IDAwMDAwIG4gCjAwMDAwMDIyNzUgMDAwMDAgbiAKMDAwMDAwMjM0NSAwMDAwMCBuIAowMDAwMDAyNjc3IDAwMDAwIG4gCjAwMDAwMDI3OTYgMDAwMDAgbiAKMDAwMDAwMzkxOSAwMDAwMCBuIAowMDAwMDA1ODg2IDAwMDAwIG4gCjAwMDAwMDczMzQgMDAwMDAgbiAKMDAwMDAwODkzMSAwMDAwMCBuIAowMDAwMDEwMDUyIDAwMDAwIG4gCjAwMDAwMTE2ODEgMDAwMDAgbiAKMDAwMDAxMzIyNyAwMDAwMCBuIAowMDAwMDE0ODI4IDAwMDAwIG4gCjAwMDAwMTU5NTYgMDAwMDAgbiAKdHJhaWxlcgo8PAovSUQgCls8NDhkMDg4ZjlhYzc2OTEyYzVkMjJmZjk5OWE1MWE4NWM+PDQ4ZDA4OGY5YWM3NjkxMmM1ZDIyZmY5OTlhNTFhODVjPl0KJSBSZXBvcnRMYWIgZ2VuZXJhdGVkIFBERiBkb2N1bWVudCAtLSBkaWdlc3QgKG9wZW5zb3VyY2UpCgovSW5mbyAxNSAwIFIKL1Jvb3QgMTQgMCBSCi9TaXplIDI3Cj4+CnN0YXJ0eHJlZgoxNzE3NAolJUVPRgo=";
const embeddedPacketZip = "UEsDBBQAAAAIAOWbWF1cBFkUoQEAALcCAAANAAAAMDBfUkVBRF9NRS5tZGVSyW7cMAy96ysIBEgvroDu7XG6pkUCTJH+AC3TFjGyKEjyTN2vL+VppgFyMWRSfHyLruCTzPMSua5wQxiqh91wFIduhWv4JkfKcaZYYTeOyLnALfbGfI8DJdKPNkZ2lSVigCS5jhJYoPC8BGxl6Fe4Y+eRAnzF/IdjkiV3sPefrTE3mHvJHzMPEz0h0gHp9lVhA7u1g1LxQF7CQDo/8rRk6iB5iQRxmftWxTiALNXJTMARqucCCd2BKujpwtTCL08wY6XMGAoMNEssNWsBEFKWJIUGmC7qn+M/9W2BO/N0m74CJ8mHMchpA10Bs9KRCoEmDN0jjA78Jsth4y0ZgvT9ynECHI7saMN+mNZ9HFj5DHBizeS+WvghPj4rT2xSG6+uYH9W6SRW3VXMCwu3hGpV8Zygz0xjWzWrUvNSqWI4tP8k3G6/so+jnolqa25T5rWF/dJrBJtw7Zs3Vvlcsmg+Zv5t3tr/L0eDU5wUMJp3Fu5oYIRMJalfZ50/r3fmvYUvcQpc/Fa6TxjbOamvbVptUFfMB7sp5rpR04xUZzZ/AVBLAwQUAAAACADlm1hdTiQ0McADAACVBwAAHgAAADAxX0xlYWRlcnNoaXBfQnJpZWZpbmdfTWVtby5tZGVVyXIbNxC9z1d0lco+qMipsuNcdFEpXuJDYqcsVXIGgR4OIgwwwcIlX5/XAIeklJNETs/r7rc0b+g3VoZjGu1Mv0TLg/Vb+p2n0HW3t0/h7vaWPh9Yl2x3fF37xGoiQs2XGCap+jXsOPqJfaaHYVA2JnpLH8M0FW/zkX6wU9kGn+pLj2XzN+ss732xWr5XjlJWmcmrnd3WUppjmEPCE+UN6VA8cKawsY7XWkWmyDubpFAgP7FuHyL/UzhlNoL+MAMEkyvCdHawuiKvB4yXif1WbbmOPDvlaxtV8hii/ZcpeEZTryNnXkBpCJFY6ZHm4Kw+Uo5KP/ddd3NDjzaXit6t6YGGV2udd9mH4rBNZPlWUd6H9ZFVpG1UvuFPxWXroENBOfsYnKszqpQswLzmFeYZOEY8v9C1OtG0MB5KjjJq/2qeE5Fn8tpAkU3RTHnkFxQr50LjjDZHevf+TWsyKr/FThwx7yQT0cQqlchJun1jC5x42dkm9Efvnh457izKG0KiUUEcHzJtmL3QDWUmNo3RP6tkbCoreQQKHzhCZkaTx0rrCOrA1B15C7mMOiZSe3WUKT62PXch8x0le8jS4UXFVxU3IcL1BsvoEiNYdiAOewE7vSAitcETWY9RIvNrRq3sLlN/n9GnukXsjjZ/jRaGufI1H1CSgLUwvFcbx/e1VGVIMYeYJYebEg0vCok0zUvNKs1C9+cGi/JWgCHSon/buWFs0G8YkDyQCj0F8pUdBO9TAMTVM4Ulj/AedteuGCaEBeYEaUqDkrSSGOzYkTn7E4L5sE5j2BPXhum+kvNHZGcneCEeaQYb1dcYFvESz9ppdqeMpu7bhbGheCOE6LoFqmqor7PhzSUTYGJ2XF+0AymDfhgMmsoNkyTbWFOf8GFSVgiOzyJBT0//Z+TU9BSQtnF15Gl+cDsGPBbn+JNnznZZQcNMWw7QbIZMddCkR4BJwhdykPkkGcDrhp2Iw+iAhJUN+CDtlJ2aXSZc4OazHyyKszft6LzrW14W/8qumQ95BaMmLUc0pTLNldp2KsxyMY24ve/eI55lFu9V8bcBL4VB3IpqzHTl4P0oS56OouyxMHhl3npNF3OvdcCCi2/67qeeHtLztcmEUXXNFFRWOl/MV/FQJpDrMuPicAtJo0qgJOt996EXm801XO38m0WrFf6J2XNsDODSWAVKM4hTLtV4CWSWGPqwqHi+VgJ5daN+hl/k/tfo2VwtBevvgY+/Bj+W0Fg80MZAh9bWQxYqc6Vd7on80qQR4IZc2Pbdf1BLAwQUAAAACADlm1hd+KrSTHsCAADPBAAAFAAAADAyX1RhbGtpbmdfUG9pbnRzLm1kdVRLbtswEN37FANk0Y3tQzRddNOiaHOBETWSBqE4ypCy65y+j5TttAa6k0Ty/eZRT/TC8VXTSD9MU8m73dMTPZsLzZIzj7J7tnlek5YLTcKxTLRY1HChPNkae9J5cTsJcQg4QGct+F4ouHCpsHwy7bmLQh27q3imwZwWrAr4CM9rmjmBqu3iftakuTg2ALZbvZe0nck8SLkckhSqnNoD7NgE/ypcpH5cLHPcHegre2f+2bUfhfK6LObgKpPQaBzJBprXWDRC4Yr3xCcdQWiJOPUU7pZhBUbCdATmC06bj5z0fduqmVxOKufmM0Y7NwfBcsl7LFXSuuTytqrLXP3uGwFCi+19AyoKz+ONI1hCevBTz0kulSdEYd/T2fy1cYzOqVDkKh8Oy8SFhjX1mTrDiHrQhfJoq9rXNDgj3TWU1eUmDWtGvUQk7qTleG3BmhBBtZgBAXXfjbL4SQNETuCWTOxN8KA+S398TB7KOWf0osaA2WSt4mUYoA6jTzRbp1EOocJsDdrfM6eeL9e8bgNRMFYFG9X/wmIaxZDQMmlox6tJOEHqjFTQtXjJ2NfJUIteGkzzerIim/lvW/sRJ1Jl9DaD8ItRsoKgcnDtPgpXXdKgwD1+7FoQq4IucAoSYxvDx/3gpV2bnmwRb2uoodROY/dfKMjZIVpc35FQQnMHDcrxU655apvt/c5tc2hoFeKnDBgn+HvcwCIHF6gAZQuqqcHUy0OrAXzXliwtjA5nEI8rQJq21o1obaZ1MFpqk3f/DP6sMeIPUceKSumgQEP17Kpuf7v/d9htzkl+F8pFlnpX3dZxQhtr+/FLCOjCWTp4lv3DLa0iU/sZ/AFQSwMEFAAAAAgA5ZtYXbB/mPvdAgAAcQUAAB4AAAAwM19Hb3Zlcm5tZW50X01lZXRpbmdfQnJpZWYubWRtVMuO00AQvPsrWtoD0iqxYOG0HBAgHgeWjeDAuTPTjmcZz5h5JOu/p9oxSRbtzfb0dFVXVfuKvsS9pDBIKHQnUlzY0YfkpGua6+vlw+31NX2MNZSJch0l7V2O6UWmXtiXfj1G78xEVsaKCsK9bxJ2pddrNy9pcKEWyfPBpqYxZpkbek6um6j0Qp0zxcXAnoa4dV7WhpOQiaEkNoWSABHnxMHi5U+VXPBMeHJAdMP4r0oOtJUu4rK23ccibdNcXdGGU3HGjRxKbtb0ldM2Joxpd0LyKKYWtxfywvYWfTwrm9y7cUa0Yhb4WvqYAIkWF7Jx17FLGXxjsi5wiemWeCfB8ooCOOQVDVwkOfZ41JZd9D4e1nVEp3soegQE9Jgkoycrn1vKqrURqGLFzxcxq5fhWAFGsxR6dZ7yfvsgRm/m5lULx0Ln0kCHngs50Os57ODmCl8kHHnUYCXhHZ6cp2ubm5Z+LDLvJO4Sj70z84URuEBfL5pbKex827xu6dPj6NmFJ9oiIxjIO0SA06SGGohGBwekWkglzDoJMlcDXlznxJJ0HcbIbfOmpZ/wBm4yBR5wpJFQ3CcakoW4z/sODUwSnHL+3WzgL+YcU9w7e6xcBF4jboym7KcMpbR7Nr3Y6hW6iOmDM0jnGVJHwLCdxmZbswuSM3hMmXIEy2Go4RxNaI+0bpVFRh3meJbs+3DMaEHB2VikNR6QnzCRboE2i9Xbud0slNh3cCuPKEZk7jQqKijmmN098PSWbNQgnkYHmxp41FfVG0iaz3bejPx0O8DciEfVIlW+BPsej6nCdi8Lq4kTq51+aezwf4Dhc5rBQf7rDXz9G1x23Gj+E6rZGJX00ON3QA/RheKnZcV1OuwMFByUHA2wFSFZfLt09JQklffzaed+YjXhawdrKlxNYvjkaAxPDdVNMNhrEuRzmq11RRdwRfEQJK2wA2yhuODDKOeVPC7YUWSAaM4rmPwFUEsDBBQAAAAIAOWbWF2hDCem/wEAAJ8DAAAUAAAAMDRfUHVibGljX0NvbW1lbnQubWRVk02O2zAMhfc5BYFuMzlAlzOb2fQHaC9AS7RNRKY8+oknt++TbLfoJoAYiXzve/QX+sXLGoR+1iGoo7e4LGLlcnmbWROxeVpkGSTlK5WZ7U7PWGmMCSehuK4xlWpanlQiuf3xjd45DTG9JvWT9Jb7lXfhUGbSTEyjuqLROFDmUcrzxaTQmuJDvSSqWfwxBbfbkDEGjSSfkpxmuV0u3+Kg0O04tR/DcDNx6MFFISLTppiVJT3UCU6zGJXElls3brOvtMV0p+xm8TUIHAa2qTI0s8MbFLxmxhiIvxLU4FjYnNDCd2ndvB4mGCTUytInex1hrwaQeBW4gECgm9SmTu2fdWhGE1egBDPzvf/tYrWd59oyyTNoTRKnxOuMhFok8lEbT11WPEaFwzMr5MrnGliN5rj1VuC5xoZylQQdy65dONcEJDDZRnXOsZYk7Obefnff6Vz3QgjoeKaTe+3gTEG416A3yUNlOzyah9+MoL7HM4UdQ5vckEQbNS3ib/SjJrz9qJJLW44MJjrNiDxtnPzXgza6Br1LeJ76ZBwReKaHZh2wCsPOul18xCI7KQR2QiziZlMH7lgmGHqpa/O0e23LYgw5FDc7PXp4C2rSbPz+b/uhPjcWLVP+2wVfSF/i0nWdS4RlhtiGDvh3oGouVC/5CHz/QBTnJYIBd2Mgc/kDUEsDBBQAAAAIAOWbWF1ZUmFqWQIAABQEAAAZAAAAMDVfU3Rha2Vob2xkZXJfTWF0cml4LmNzdkWTTXLbMAxG9z4FDkCfIKvETTKdaRM3bto1TEISxhTB8MeKbl9QUuqVF4aAh4eP99UxBUvme+gkjVhYAgQiZw6SCEbKGXsyr1OgZA4DhkDevNBnAbStdneQGsoMA6Evwz6KZztDLth15jVS0oZXAo+hr9oHMDjIlK5saY+JEKjryJZsjvXsOQ/AY9TGWod+zpzhTF3jKAPBVQqZZ7lSCiMFrek65JTNT6LCoV96d+K9TPsalXwU3SF0nEZwWBAcofMcaHcqWJSJes5+5Vt5nxNqW0eZ+7B0Qzdy4Fy2LTrCzGf2XGbzVPX/gFfuV2UTlwEmSRc8e4JEUVKDMo+fZOs6I0rIksxDYuoar0Xvze+E9gKoC7m2VN4dtV/bzist6XZHjxz2/wUqaal5oYuoIyzHFUBi+8nmRcDqmXrSIhVnVwPk7kDFccfkoEbXBBQZJSWZ1NI41qBbAYVehzQQ86B7tpleTd78BtGRpF94r2eDj0p5GasxQPXSQBpWaOSnQQH0JHrPFTiJqrEeUxN4EEmOQwNp7qSWr7CBU85ibh09I2cJ5i/Rxc9w3gSaN7KcbPWtR5sCeVDU3UHBWeUuM2XNoCJuRz5K1iMqyBbDmy2tpqzf4bZGGcx71sjGmDR0Dp7uf60Z89i3v5czqV+rgcxfYW8nOLVBMFTnPJn3VXaXJJSWPsg2cSy7H2IXt47R/Pm6zM3VdiOrIWiv842uTBPog9DcUZpwvtNXqq9wq8OyJENbFB7JnKJcKCtR0/Y4Iq8yWuLOmjfzTWxd3hCHj8ppXs9DS0Rp9w9QSwMEFAAAAAgA5ZtYXUNDQTeoAgAAFQUAABkAAAAwNl9BZHZvY2FjeV9FdmVudF9QbGFuLm1kXVRNb9swDL37VxDoLagD7PPgW1Z06GHrsgHDzoxM20RkSaXkpPn3o2Q7zXYJFJkf7z0+6g527ckbNBdA18IDn9jUj67HnkZyCR5P+Xdv0VXVZlP+NZsNPPhxnBynCzwR2jTAzhiKEb4IU8euB9Do/STBR8rxj6/BIjtIA0HHJrF3aCGI1wC08R4GQoGAiXO7l4liDtH7DErDTtwSOO8CSuKIDsrBcM7wDth1XsZy3lbV3R3senItVu+28Ies8SNppYKQD2wV9j0oo35SlhCnELykudVIlDL8MEOv3muBARNwhBMJd0ztPZyXmxl+vsmp5VZoVJoRJnd0/uyqD1vY+6ScWOnOCEowvUxZvCvR6uMWnvxZ+x4sG1DERf0cmpVRSBHOXo7VJy24qFSkURkcyU2hz1t4ptcEU2gxKW1FQbII2RG1BzRHMAM6R7ZI9V3DROHFqoZdyFpTC1mlrI+FDk2COKgu+v0bSk91UDzavkhc6q7SWoKWe06aZny4aMK+8KlXPipNkqmMP4J2OGqr5MF36oms0IIrQ/m5MAKD0i6iRYN2HngetwY9e/3sWs5UQeF4icW2ylcwD1IPXjRmDMi9g3HhWoj/8pZyp69osicweWluWQnFQCZ1k/3XbZmWV1YXsIRtc3Xx6tUy5LeB1PAjkODCuWQY7zqWUclHEl04ujVwkXn2Zr04JibsukaDFH0QSrMGuV0SdFE10VLjzRyf1XOQ8EjSFC9xWlTxgdz/69V5a/25nsLilVkcjsdZdQWbxJeyv926BGB0nUfljlOkvEwHUv7Z96qat6d1KVBtobrPaWZZ0BoerkNbsTRvW06TsrJXJW+kmUuuHlWJpBVkG3PJvSIvj8owP0g3aY2OsmXRWWazoVbmU+69PDf18gKs7ttWfwFQSwMEFAAAAAgA5ZtYXZW9SuPcAgAAkgUAABsAAAAwN19NZWRpYV9SZXNwb25zZV9hbmRfUUEubWRtlEtP3EAQhO/7K1pCSqQVrJByyyUigMQlkQBFnMfjtt1iXpnHLubXp2ZslgXl6Hl0V1d94zP6xb0ouvOmFzfSA6fgXWJSrqf7L1ebzdnZcTOum5snpuJ6jinXY4dppqCysMup3RuUFSOMj8ikvdMcHff0djZPPBO/BNYZq1ksm5nEDT5aVPGOhugtlbQj9Kkl9hxlmKsCXEXB4jI6Rh98UqaVFXQOPkOBYCVx3Itm4mFAj0QdozYT1OZapCoyJaFTQkGVyaqZ9KTcyDv67UmF4MVli2rr8nGSQaLlvgk7iEGn6ahPMMvpEFWWcjM55h5bq0E0FukVHKFupm/fLy8p7OyOsrc+Rn+AnujLOJEvkQ7cJcl8TtqIE53OW03trS1OqgMqZocQdi2kGxkG0cVk+ls4VQlps90+we9e+vd8JlaRVOdLRi9Ji9fJ6+qbbShgxpR/bLdEmyv97PzBcD/yan3Lcke3L8EocYt9dcfHUTl5XUZH2Y+RfcjKB47tHL7XhHZ0jakEpeA+JZABPzWV0KvMjZBldITh2GDe7fYKvs++UFKfwUD3UHJL+p3KTFHS8zLVjSfnW7RRAcEor4zkKjw7esytI6oprTmldzPpTsXOx59RqhsHtcCuzPyKdFfC6r09MGwK7xCnrQSc8JQWbDqIrRDA2UUSqFsWjFqafeJtlQwf99JDG1nf19vkiu0YqEieaqRohSP/MRpr4K5+NG1Pk2hAVolB8IlSgcaYq6MRDwnY4eQHt8QGvFLljpe+puNB6OOko3QnmgET1wxAbSidQZrwuo52DlboECXD8PYkeTHGOzMvJN8mrRYfKEcZRyC+uaD7NQhEtfdmfxLvxRGYk/eHGw/cwiOskeERLtSUY4ic3478cce3qwG0BSho2ZX2Y/IfIsfpRxld7YPs8agwMQeENiPOfGBMs7jP9Qeo11/hOjtOwl5oRpVrrEsDG7q0skGh7JGzzT9QSwMEFAAAAAgA5ZtYXWV3yFnXAQAAPgMAAB4AAAAwOF9CaWxpbmd1YWxfUGF0aWVudF9Ob3RpY2UubWRtkj1u3DAQhfs9xQDbOIAtKD/buExgIAacIEGK1LPUSBqAHCpDSgsdJwdIEbhzq4tlKK2BrJNulxq++d573MOddJ5Tv9vt9/ApHtnTjUMlSKQTO0qgFJAFkuupGT01cOptCD6iHqO+V246spmJ6ZQg9wQujpJnGDQOMaGvdrvPEXAYIksOJBlcj9KZcI8TwZFI7Iq0rIGaCr4TlO2bIEu3Sj5rAYqtZ+8h9WVqIuWWDYmljRowcxQ4zvD2tq5hqEIFOYaoGk8V3Lcwx1H/R3IN5cPqOhOGbYMxZXS5XIKGlVz2s3n5OlIqa9ItfEAbK3gtu3JkfIMhFOG/eTyLecpwdTgcXkH9ur55866uTWoPd2nA5Xf0a/gPMZ1DZ/vVlDskjpdHgbA8TrwhsSxPKCWRTjFgY6OhrFRM/1aSEDyu6RVqNNFVpLFrWy2JrIXn+O0UxCJfnqwRDEeOhcJxxspIM4aYzqpikxfCs2mEATVbUGXs7H+j31py2CAEs4uC1mOm1aM37HNbYHV9Y0jjunIjwGuQskEj0I+Rh3iZSyqvLYxi4rr8LD5gTNnew1YYlpLJnH5R6uxRopX24O0U1lz88ksIt/Ycl3Quuc2PebQ/tNJavS8r/ANQSwMEFAAAAAgA5ZtYXU/uGJJTAQAAUgIAABkAAAAwOV9Db21taXRtZW50X1RyYWNrZXIuY3N2ZVLLUsMwDLz3K/QB7gEo3IEOjwO0Q79AtdVUg2sbW07J3yMnpcPQWxLtale7WaKQ2Qh+0j56R9k8xsOB5UBBIGb4qlSEYzCrY9DhshK4xrhPKccePRRBqcW807dATeNMNyRPjQXUs6NgafbEtn1QgsMBrhRTgwyQomc7gKNUZTBrXal4KJR7tjTHTAiopKFwMc+xpxxGY7jbIedilrrrzqwpOA7d+HYDmSwmcyH4gnkb80Nm1xHERBnbuJi36MhDrKJadj9v4GIpYOZYzOqMO9mQUWRhXgPo/V2mMplYwDYz7ZqLf8rXeip6HtNImEVTLOZDc6EjlL1e6GCHVvSZSP5gPSMXzb1tv9V4yRWwWk0NbH8tnTqYMKDMborHoveXPtZKa1NP6JqJTd1q0SAxAVqrl5zLLuNPoEraEIUOO2prT1am5slN4cOWvV5dVeXU/uwHUEsBAhQDFAAAAAgA5ZtYXVwEWRShAQAAtwIAAA0AAAAAAAAAAAAAAKSBAAAAADAwX1JFQURfTUUubWRQSwECFAMUAAAACADlm1hdTiQ0McADAACVBwAAHgAAAAAAAAAAAAAApIHMAQAAMDFfTGVhZGVyc2hpcF9CcmllZmluZ19NZW1vLm1kUEsBAhQDFAAAAAgA5ZtYXfiq0kx7AgAAzwQAABQAAAAAAAAAAAAAAKSByAUAADAyX1RhbGtpbmdfUG9pbnRzLm1kUEsBAhQDFAAAAAgA5ZtYXbB/mPvdAgAAcQUAAB4AAAAAAAAAAAAAAKSBdQgAADAzX0dvdmVybm1lbnRfTWVldGluZ19CcmllZi5tZFBLAQIUAxQAAAAIAOWbWF2hDCem/wEAAJ8DAAAUAAAAAAAAAAAAAACkgY4LAAAwNF9QdWJsaWNfQ29tbWVudC5tZFBLAQIUAxQAAAAIAOWbWF1ZUmFqWQIAABQEAAAZAAAAAAAAAAAAAACkgb8NAAAwNV9TdGFrZWhvbGRlcl9NYXRyaXguY3N2UEsBAhQDFAAAAAgA5ZtYXUNDQTeoAgAAFQUAABkAAAAAAAAAAAAAAKSBTxAAADA2X0Fkdm9jYWN5X0V2ZW50X1BsYW4ubWRQSwECFAMUAAAACADlm1hdlb1K49wCAACSBQAAGwAAAAAAAAAAAAAApIEuEwAAMDdfTWVkaWFfUmVzcG9uc2VfYW5kX1FBLm1kUEsBAhQDFAAAAAgA5ZtYXWV3yFnXAQAAPgMAAB4AAAAAAAAAAAAAAKSBQxYAADA4X0JpbGluZ3VhbF9QYXRpZW50X05vdGljZS5tZFBLAQIUAxQAAAAIAOWbWF1P7hiSUwEAAFICAAAZAAAAAAAAAAAAAACkgVYYAAAwOV9Db21taXRtZW50X1RyYWNrZXIuY3N2UEsFBgAAAAAKAAoAwQIAAOAZAAAAAA==";
qa(".packet-pdf").forEach(link => {
  link.href = "data:application/pdf;base64," + embeddedPacketPdf;
  link.download = "Community_Health_Advocacy_Communications_Packet.pdf";
});
qa(".packet-zip").forEach(link => {
  link.href = "data:application/zip;base64," + embeddedPacketZip;
  link.download = "Community_Health_Advocacy_Communications_Packet.zip";
});

