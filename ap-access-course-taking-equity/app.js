(() => {
  const rows = window.AP_SCHOOL_DATA || [];
  const $ = (id) => document.getElementById(id);
  const filters = {
    state: $("state-filter"), district: $("district-filter"), locale: $("locale-filter"), urm: $("urm-filter")
  };
  const unique = (key, source = rows) => [...new Set(source.map(d => d[key]))].sort();
  const option = value => `<option value="${value}">${value}</option>`;
  filters.state.insertAdjacentHTML("beforeend", unique("StateName").map(option).join(""));
  filters.locale.insertAdjacentHTML("beforeend", unique("Locale").map(option).join(""));
  filters.urm.insertAdjacentHTML("beforeend", unique("UnderrepresentedEnrollmentBand").map(option).join(""));

  function updateDistrictOptions() {
    const selected = filters.district.value;
    const source = filters.state.value === "All" ? rows : rows.filter(d => d.StateName === filters.state.value);
    filters.district.innerHTML = '<option value="All">All districts</option>' + unique("DistrictName", source).map(option).join("");
    if ([...filters.district.options].some(o => o.value === selected)) filters.district.value = selected;
  }

  function filteredRows() {
    return rows.filter(d =>
      (filters.state.value === "All" || d.StateName === filters.state.value) &&
      (filters.district.value === "All" || d.DistrictName === filters.district.value) &&
      (filters.locale.value === "All" || d.Locale === filters.locale.value) &&
      (filters.urm.value === "All" || d.UnderrepresentedEnrollmentBand === filters.urm.value)
    );
  }

  const percent = value => Number.isFinite(value) ? `${(value * 100).toFixed(1)}%` : "—";
  const safe = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function stateBars(data) {
    const groups = Object.values(data.reduce((acc, d) => {
      const g = acc[d.StateName] ||= {name:d.StateName,total:0,offering:0};
      g.total++; g.offering += d.APOfferedFlag;
      return acc;
    }, {})).map(g => ({...g, rate:g.offering/g.total})).sort((a,b)=>b.rate-a.rate);
    $("state-bars").innerHTML = groups.length ? groups.map(g => `<div class="bar-row"><span>${safe(g.name)}</span><div class="bar-track"><div class="bar-fill" style="width:${g.rate*100}%"></div></div><span class="bar-value">${percent(g.rate)}</span></div>`).join("") : "<p>No records match these filters.</p>";
  }

  function bandBars(data) {
    const order = ["High","Medium","Low"];
    const groups = Object.values(data.reduce((acc,d)=>{
      const g=acc[d.UnderrepresentedEnrollmentBand] ||= {name:d.UnderrepresentedEnrollmentBand,ap:0,grade:0};
      g.ap += d.APEnrollment; g.grade += d.Grade12Enrollment; return acc;
    },{})).sort((a,b)=>order.indexOf(a.name)-order.indexOf(b.name));
    const max = Math.max(1,...groups.map(g=>g.grade));
    $("band-bars").innerHTML = groups.length ? groups.map(g=>`<div class="bar-row"><span>${safe(g.name)}</span><div class="bar-track" title="AP enrollment ${g.ap.toLocaleString()}"><div class="bar-fill" style="width:${g.ap/max*100}%"></div></div><div class="bar-track" title="Grade-12 enrollment ${g.grade.toLocaleString()}"><div class="bar-fill grade" style="width:${g.grade/max*100}%"></div></div></div>`).join("") : "<p>No records match these filters.</p>";
  }

  function table(data) {
    $("school-table").innerHTML = data.slice(0,12).map(d => {
      const review = d.SuppressedFlag || !d.MatchedNCESFlag;
      return `<tr><td>${safe(d.SchoolName)}</td><td>${safe(d.DistrictName)}</td><td>${safe(d.Locale)}</td><td>${d.APCoursesOffered}</td><td>${d.SuppressedFlag ? "Suppressed" : d.APEnrollment}</td><td class="${review?'qa-review':'qa-pass'}">${review?'Review':'Pass'}</td></tr>`;
    }).join("") || '<tr><td colspan="6">No records match these filters.</td></tr>';
  }

  function render() {
    const data = filteredRows();
    const total = data.length;
    const offering = data.reduce((s,d)=>s+d.APOfferedFlag,0);
    const matched = data.reduce((s,d)=>s+d.MatchedNCESFlag,0);
    $("kpi-schools").textContent = total.toLocaleString();
    $("kpi-offering").textContent = offering.toLocaleString();
    $("kpi-access").textContent = percent(offering/total);
    $("kpi-match").textContent = percent(matched/total);
    const labels = Object.values(filters).map(f=>f.value).filter(v=>v!=="All");
    $("filter-summary").textContent = `${total} synthetic school record${total===1?'':'s'} shown${labels.length ? ` · Filters: ${labels.join(' · ')}` : ' · No filters applied'}.`;
    stateBars(data); bandBars(data); table(data);
  }

  filters.state.addEventListener("change",()=>{updateDistrictOptions();render();});
  [filters.district,filters.locale,filters.urm].forEach(f=>f.addEventListener("change",render));
  $("reset-filters").addEventListener("click",()=>{Object.values(filters).forEach(f=>f.value="All");updateDistrictOptions();render();});
  updateDistrictOptions(); render();
})();
