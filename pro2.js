/* ── Scroll reveal ── */
const obs = new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

/* ── Particles ── */
const emojis=['🏮','✦','᪻','🙏','🕯'];
const pb=document.getElementById('particles');
for(let i=0;i<16;i++){
  const el=document.createElement('div');
  el.className='particle';
  el.textContent=emojis[i%emojis.length];
  el.style.cssText=`left:${Math.random()*100}%;font-size:${.8+Math.random()*1.2}rem;animation-duration:${12+Math.random()*16}s;animation-delay:${-Math.random()*18}s;opacity:${.06+Math.random()*0.1};`;
  pb.appendChild(el);
}

/* ── Navbar ── */
window.addEventListener('scroll',()=>{document.getElementById('navbar').style.background=window.scrollY>50?'rgba(8,3,1,.98)':'rgba(13,6,2,.93)';});

/* ── Hamburger ── */
const ham=document.getElementById('ham'),nl=document.getElementById('navLinks');
const ms=document.createElement('style');
ms.textContent=`@media(max-width:900px){.nav-links.open{display:flex!important;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:rgba(8,3,1,.98);padding:20px 5%;gap:16px;border-bottom:1px solid rgba(212,175,55,.15);}}`;
document.head.appendChild(ms);
ham.addEventListener('click',()=>{
  const open=nl.classList.toggle('open');
  const b=ham.querySelectorAll('span');
  if(open){b[0].style.transform='translateY(6px) rotate(45deg)';b[1].style.opacity='0';b[2].style.transform='translateY(-6px) rotate(-45deg)';}
  else{b.forEach(x=>{x.style.transform='';x.style.opacity='';})}
});
nl.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nl.classList.remove('open');ham.querySelectorAll('span').forEach(b=>{b.style.transform='';b.style.opacity='';})}));

/* ── Filter ── */
document.querySelectorAll('.fbtn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.fbtn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.f;
    document.querySelectorAll('.fc').forEach(c=>{
      c.classList.toggle('hidden', f!=='all' && !c.dataset.f.includes(f));
    });
  });
});

/* ── Countdown to Apr 15 ── */
function tick(){
  const now=new Date();
  let t=new Date(now.getFullYear(),3,15);
  if(now>=t)t=new Date(now.getFullYear()+1,3,15);
  const d=t-now;
  const pad=n=>String(n).padStart(2,'0');
  document.getElementById('cdD').textContent=pad(Math.floor(d/86400000));
  document.getElementById('cdH').textContent=pad(Math.floor((d%86400000)/3600000));
  document.getElementById('cdM').textContent=pad(Math.floor((d%3600000)/60000));
  document.getElementById('cdS').textContent=pad(Math.floor((d%60000)/1000));
}
tick(); setInterval(tick,1000);