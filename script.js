let ar=false, index=0;
const $=id=>document.getElementById(id);

function apply(){
  $("groom").textContent=DATA.groom;$("bride").textContent=DATA.bride;
  $("footerNames").textContent=`${DATA.groom} & ${DATA.bride}`;
  $("heroDate").textContent=DATA.dateEN;$("heroTime").textContent=DATA.time;$("heroPlace").textContent=DATA.venue;
  $("rTime").textContent=DATA.time;$("rDay").textContent=`Friday ${DATA.dateEN.replace(",","")}`;$("rYear").textContent=new Date(DATA.eventISO).getFullYear();
  $("venueTitle").textContent=DATA.venue;$("mapBtn").href=DATA.mapLink;
  if(DATA.mapEmbed) $("mapFrame").src=DATA.mapEmbed; else $("mapFrame").style.display="none";
  renderAlbum();renderSchedule();renderCalendar();updateCountdown();
}
function renderAlbum(){
  $("albumImg").src=DATA.images[index%DATA.images.length];
  $("dots").innerHTML=DATA.images.map((_,i)=>`<span class="dot ${i===index?"active":""}"></span>`).join("");
}
$("next").onclick=()=>{index=(index+1)%DATA.images.length;renderAlbum()};
$("prev").onclick=()=>{index=(index-1+DATA.images.length)%DATA.images.length;renderAlbum()};

function renderSchedule(){
  $("schedule").innerHTML=DATA.schedule.map(x=>`<div class="event"><time>${x[0]}</time><div><h3 data-en="${x[1]}" data-ar="${x[2]}">${ar?x[2]:x[1]}</h3></div></div>`).join("");
}
function renderCalendar(){
  const d=new Date(DATA.eventISO), y=d.getFullYear(), m=d.getMonth(), selected=d.getDate();
  $("monthTitle").textContent=d.toLocaleString(ar?"ar-EG":"en-US",{month:"long",year:"numeric"});
  const first=new Date(y,m,1).getDay(), last=new Date(y,m+1,0).getDate();
  let out="";
  for(let i=0;i<first;i++)out+="<div></div>";
  for(let day=1;day<=last;day++)out+=`<div class="${day===selected?"event":""}">${day}</div>`;
  $("calendar").innerHTML=out;
}
function updateCountdown(){
  const diff=new Date(DATA.eventISO)-Date.now();
  if(diff<=0)return;
  $("days").textContent=Math.floor(diff/86400000).toString().padStart(2,"0");
  $("hours").textContent=Math.floor(diff%86400000/3600000).toString().padStart(2,"0");
  $("minutes").textContent=Math.floor(diff%3600000/60000).toString().padStart(2,"0");
  $("seconds").textContent=Math.floor(diff%60000/1000).toString().padStart(2,"0");
}
function setLang(){
  ar=!ar;document.documentElement.lang=ar?"ar":"en";document.documentElement.dir=ar?"rtl":"ltr";
  $("langBtn").textContent=ar?"English":"العربية";
  document.querySelectorAll("[data-en][data-ar]").forEach(e=>e.textContent=ar?e.dataset.ar:e.dataset.en);
  $("heroDate").textContent=ar?DATA.dateAR:DATA.dateEN;
  $("rDay").textContent=ar?DATA.dateAR:`Friday ${DATA.dateEN.replace(",","")}`;
  renderSchedule();renderCalendar();
}
$("langBtn").onclick=setLang;
$("rsvpForm").onsubmit=e=>{e.preventDefault();$("rsvpMessage").textContent=ar?"تم تسجيل تأكيد حضورك ❤️":"Your RSVP has been recorded ❤️";};
const music=$("music"),musicBtn=$("musicBtn");
musicBtn.onclick=()=>{if(music.paused){music.play();musicBtn.textContent="Ⅱ Pause Music"}else{music.pause();musicBtn.textContent="♪ Play Music"}};
apply();setInterval(updateCountdown,1000);
