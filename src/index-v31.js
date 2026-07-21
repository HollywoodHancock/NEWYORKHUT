import site from "./index-v30.js";

const VERSION = "v31";
const HTML_HEADERS = {
  "content-type": "text/html; charset=UTF-8",
  "cache-control": "no-store"
};

function calendarPage() {
  const year = new Date().getFullYear();
  const years = [year, year + 1, year + 2]
    .map((value) => `<option value="${value}">${value}</option>`)
    .join("");

  const months = Array.from({ length: 12 }, (_, index) => {
    const label = new Date(2026, index, 1).toLocaleString("en-US", { month: "long" });
    return `<option value="${index + 1}">${label}</option>`;
  }).join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Fleet Compliance Calendar | NewYorkHUT.com</title>
<meta name="description" content="Generate a printable fleet compliance calendar for HUT, IFTA, IRP, UCR and fleet record reviews.">
<style>
:root{--n:#082b4c;--b:#1768c5;--l:#dbe5ef;--g:#f4b83f;--m:#5b6b7e;--bg:#f5f9fc;--ok:#147a52;font-family:Inter,system-ui,sans-serif}*{box-sizing:border-box}body{margin:0;color:#122033;line-height:1.55}.w{width:min(1120px,calc(100% - 36px));margin:auto}.top{background:var(--n);color:#fff;padding:8px 0;font-size:.9rem}header{background:#fff;border-bottom:1px solid var(--l)}nav{min-height:72px;display:flex;justify-content:space-between;align-items:center;gap:18px}.brand,.links a,.btn{text-decoration:none}.brand{font-weight:900;color:var(--n)}.links{display:flex;gap:13px;align-items:center;font-weight:750}.links a{color:var(--n)}.btn{display:inline-flex;align-items:center;justify-content:center;border:0;background:var(--b);color:#fff!important;padding:11px 16px;border-radius:10px;font-weight:850;cursor:pointer}.btn.secondary{background:#fff;color:var(--b)!important;border:1px solid var(--b)}.hero{padding:58px 0 46px;background:linear-gradient(#f9fcff,#edf5fb)}h1{font-size:clamp(2.35rem,5vw,4rem);line-height:1;color:var(--n);margin:12px 0 18px}h2,h3{color:var(--n)}.lead{font-size:1.15rem;color:#4e6074;max-width:850px}.crumb{font-size:.9rem;color:var(--m)}.crumb a{color:var(--b);text-decoration:none}.eye{font-size:.78rem;text-transform:uppercase;letter-spacing:.1em;font-weight:900;color:var(--b)}section{padding:56px 0}.tool{display:grid;grid-template-columns:minmax(0,1fr) 380px;gap:28px;align-items:start}.panel,.result,.card{border:1px solid var(--l);border-radius:18px;background:#fff;padding:24px;box-shadow:0 8px 30px rgba(8,43,76,.05)}.fields{display:grid;grid-template-columns:1fr 1fr;gap:15px}.field{display:flex;flex-direction:column;gap:7px}label{font-weight:800;color:var(--n)}input,select{width:100%;border:1px solid #bccbda;border-radius:10px;padding:12px 13px;font:inherit;background:#fff}.checks{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}.check{display:flex;align-items:center;gap:9px;border:1px solid var(--l);padding:11px;border-radius:10px}.check input{width:auto}.actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}.notice{border-left:4px solid var(--g);background:#fff8e5;padding:15px 17px;margin:18px 0}.events{display:grid;gap:12px;margin-top:18px}.event{display:grid;grid-template-columns:125px 1fr auto;gap:14px;align-items:center;border:1px solid var(--l);border-radius:13px;padding:14px}.date{font-weight:900;color:var(--b)}.title{font-weight:850;color:var(--n)}.note{font-size:.86rem;color:var(--m)}.tag{font-size:.76rem;font-weight:850;background:var(--bg);padding:5px 8px;border-radius:999px}.result{position:sticky;top:20px}.badge{display:inline-flex;padding:5px 9px;border-radius:999px;background:#e7f6ef;color:var(--ok);font-weight:850;font-size:.8rem}footer{background:#071d33;color:#b7c6d6;padding:38px 0;margin-top:30px}@media(max-width:900px){.tool{grid-template-columns:1fr}.result{position:static}.links a:not(.btn){display:none}}@media(max-width:620px){.w{width:min(100% - 24px,1120px)}.fields,.checks{grid-template-columns:1fr}.event{grid-template-columns:1fr}}@media print{.top,header,footer,.no-print,.panel{display:none!important}.hero,section{padding:12px 0}.w{width:100%}.tool{display:block}.result{box-shadow:none;border:0;padding:0}}
</style>
</head>
<body>
<div class="top"><div class="w">Independent New York HUT guidance</div></div>
<header><nav class="w"><a class="brand" href="/">NewYorkHUT.com</a><div class="links"><a href="/tools/fleet-compliance">Fleet Dashboard</a><a href="/fleet-toolkit">Toolkit</a><a href="/tools/compliance-assistant">Assistant</a><a class="btn" href="https://nyhut.com/">Start Permit</a></div></nav></header>
<main>
<section class="hero"><div class="w"><div class="crumb"><a href="/">Home</a> / Tools / Compliance Calendar</div><div class="eye">Fleet deadline planner</div><h1>Fleet Compliance Calendar</h1><p class="lead">Create a practical annual schedule for HUT returns, IFTA returns, IRP renewal preparation, UCR review, and recurring fleet-record controls.</p></div></section>
<section><div class="w tool">
<div class="panel no-print"><h2>Build your calendar</h2><form id="calForm"><div class="fields"><div class="field"><label for="year">Calendar year</label><select id="year">${years}</select></div><div class="field"><label for="frequency">HUT filing frequency</label><select id="frequency"><option value="quarterly">Quarterly</option><option value="monthly">Monthly</option><option value="annual">Annual</option></select></div><div class="field"><label for="irpMonth">IRP renewal month</label><select id="irpMonth"><option value="">Not included / unknown</option>${months}</select></div><div class="field"><label for="fleetSize">Fleet size</label><input id="fleetSize" type="number" min="1" value="1"></div></div><h3>Programs and controls</h3><div class="checks"><label class="check"><input id="ifta" type="checkbox" checked> IFTA quarterly returns</label><label class="check"><input id="ucr" type="checkbox" checked> UCR annual review</label><label class="check"><input id="records" type="checkbox" checked> Monthly record review</label><label class="check"><input id="fleetAudit" type="checkbox" checked> Quarterly fleet reconciliation</label></div><div class="actions"><button class="btn" type="submit">Generate Calendar</button><button class="btn secondary" type="button" id="downloadIcs">Download ICS</button><button class="btn secondary" type="button" id="printCalendar">Print</button></div></form><div class="notice"><strong>Deadline rule:</strong> Filing dates shown are planning dates. Your Tax Department notice and account control.</div></div>
<aside id="result" class="result"><span class="badge">Customized schedule</span><h2>Your compliance calendar</h2><p id="placeholder">Generate the calendar to display deadlines.</p><div id="events" class="events"></div></aside>
</div></section>
</main>
<footer><div class="w"><strong>NewYorkHUT.com</strong><p>Private educational guidance and permit assistance. Not affiliated with New York State.</p></div></footer>
<script>
(function(){
const form=document.getElementById('calForm');
const eventsBox=document.getElementById('events');
const placeholder=document.getElementById('placeholder');
let generated=[];
function lastDay(year,month){return new Date(year,month,0)}
function addEvent(date,title,note,tag){generated.push({date,title,note,tag})}
function formatDate(date){return date.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
function build(){
  generated=[];
  const y=Number(document.getElementById('year').value);
  const frequency=document.getElementById('frequency').value;
  const irpMonth=Number(document.getElementById('irpMonth').value||0);
  const fleetSize=Number(document.getElementById('fleetSize').value||1);
  if(frequency==='monthly'){
    for(let m=1;m<=12;m++){addEvent(lastDay(y,m+1),'New York HUT monthly return','Return for '+new Date(y,m-1,1).toLocaleString('en-US',{month:'long'})+' reporting period.','HUT')}
  }else if(frequency==='quarterly'){
    [[3,4],[6,7],[9,10],[12,13]].forEach(pair=>addEvent(lastDay(y,pair[1]),'New York HUT quarterly return','Return for quarter ending '+new Date(y,pair[0]-1,1).toLocaleString('en-US',{month:'long'})+'.','HUT'))
  }else{
    addEvent(new Date(y+1,0,31),'New York HUT annual return','Annual filing planning date.','HUT')
  }
  if(document.getElementById('ifta').checked){[[3,4],[6,7],[9,10],[12,13]].forEach(pair=>addEvent(lastDay(y,pair[1]),'IFTA quarterly return','Quarter ending '+new Date(y,pair[0]-1,1).toLocaleString('en-US',{month:'long'})+'.','IFTA'))}
  if(document.getElementById('ucr').checked){addEvent(new Date(y,10,15),'UCR renewal review','Confirm registration for the following registration year.','UCR')}
  if(document.getElementById('records').checked){for(let m=0;m<12;m++){addEvent(new Date(y,m,15),'Monthly mileage and fuel review','Review records for '+fleetSize+' vehicle'+(fleetSize===1?'':'s')+'.','Records')}}
  if(document.getElementById('fleetAudit').checked){[0,3,6,9].forEach(m=>addEvent(new Date(y,m,10),'Quarterly fleet reconciliation','Reconcile active, added, sold, and retired vehicles.','Fleet'))}
  if(irpMonth){let prepMonth=irpMonth-3;let prepYear=y;if(prepMonth<0){prepMonth+=12;prepYear--}addEvent(new Date(prepYear,prepMonth,1),'Begin IRP renewal preparation','Start vehicle, mileage, and credential reconciliation.','IRP');addEvent(new Date(y,irpMonth-1,1),'IRP renewal month','Confirm renewal completion and cab-card distribution.','IRP')}
  generated.sort((a,b)=>a.date-b.date);
  placeholder.hidden=true;
  eventsBox.innerHTML=generated.map(e=>'<div class="event"><div class="date">'+formatDate(e.date)+'</div><div><div class="title">'+e.title+'</div><div class="note">'+e.note+'</div></div><div class="tag">'+e.tag+'</div></div>').join('');
}
function icsDate(date){return date.getFullYear()+String(date.getMonth()+1).padStart(2,'0')+String(date.getDate()).padStart(2,'0')}
form.addEventListener('submit',function(e){e.preventDefault();build()});
document.getElementById('printCalendar').addEventListener('click',function(){if(!generated.length)build();window.print()});
document.getElementById('downloadIcs').addEventListener('click',function(){if(!generated.length)build();const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//NewYorkHUT.com//Fleet Compliance Calendar//EN'];generated.forEach((e,i)=>{lines.push('BEGIN:VEVENT','UID:'+e.date.getTime()+'-'+i+'@newyorkhut.com','DTSTART;VALUE=DATE:'+icsDate(e.date),'SUMMARY:'+e.title.replace(/,/g,'\\,'),'DESCRIPTION:'+e.note.replace(/,/g,'\\,'),'END:VEVENT')});lines.push('END:VCALENDAR');const blob=new Blob([lines.join('\r\n')],{type:'text/calendar;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='newyorkhut-compliance-calendar.ics';a.click();URL.revokeObjectURL(a.href)});
})();
</script>
</body></html>`;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/tools/compliance-calendar") {
      return new Response(calendarPage(), { headers: HTML_HEADERS });
    }

    if (url.pathname === "/__version" || url.pathname === "/api/version") {
      return new Response(JSON.stringify({
        application: "NewYorkHUT.com",
        version: VERSION,
        deployedAt: "2026-07-21",
        features: [
          "/tools/vin-decoder",
          "/tools/compliance-calendar",
          "/tools/fleet-compliance",
          "/fleet-toolkit",
          "/tools/compliance-assistant"
        ]
      }, null, 2), {
        headers: {
          "content-type": "application/json; charset=UTF-8",
          "cache-control": "no-store",
          "x-newyorkhut-version": VERSION
        }
      });
    }

    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set("x-newyorkhut-version", VERSION);
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
