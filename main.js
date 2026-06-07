/* ----------------------------------------------------------------------------
   RENDER FUNCTIONS
   Each one writes one part of the page from CONFIG. They run immediately (before
   any animation), so the site shows real content even if GSAP fails to load.
   ---------------------------------------------------------------------------- */

/* set <title>, meta description, nav logo, preloader name */
function renderMeta(){
  const p = CONFIG.profile;
  document.title = CONFIG.meta.title;
  document.getElementById('metaDesc').setAttribute('content', CONFIG.meta.description);
  document.getElementById('navLogo').innerHTML = (p.firstName[0]+p.lastName[0]) + '<span style="color:var(--accent)">.</span>';
  document.getElementById('loaderName').innerHTML = `${p.firstName}<br><span class="it">${p.lastName}</span>`;
}

/* nav links (desktop) and the mobile menu links */
function renderNav(){
  const desktop = CONFIG.nav.map(n => `<a href="${n.href}">${n.label}</a>`).join('');
  document.getElementById('navLinks').innerHTML = desktop;
  document.getElementById('mmenuLinks').innerHTML = desktop;
}

/* hero: eyebrow, availability, headline, lede, the two CTA buttons */
function renderHero(){
  const p = CONFIG.profile, h = CONFIG.hero;
  document.getElementById('heroEyebrow').innerHTML =
    `<span class="idx">[ ${p.firstName} ${p.lastName} ]</span> ${p.roleTag}`;
  document.getElementById('heroAvail').textContent = p.availableLabel;
  document.getElementById('heroHeadline').innerHTML =
    h.headline.map(line => `<span class="line" style="height:13rem" ><span>${lineSegments(line)}</span></span>`).join('');
  document.getElementById('heroLede').textContent = h.lede;
  document.getElementById('heroCtas').innerHTML =
    `<a href="${h.ctaPrimary.href}" class="btn" data-reveal data-magnetic>${h.ctaPrimary.label} <span class="arrow">&rarr;</span></a>
     <a href="${h.ctaSolid.href}" class="btn solid" data-reveal data-magnetic>${h.ctaSolid.label} <span class="arrow">&rarr;</span></a>`;
}

/* about: head note, photo + monogram fallback, rotating badge, lead + sub text */
function renderAbout(){
  const p = CONFIG.profile, a = CONFIG.about;
  document.getElementById('aboutHeadRight').textContent = a.headRight;
  document.getElementById('avatarImg').src = p.photo;
  document.getElementById('avatarImg').alt = `${p.firstName} ${p.lastName}`;
  document.getElementById('avatarMono').textContent = p.firstName[0]+p.lastName[0];
  document.getElementById('badgeText').textContent = (p.badgeText+' ').repeat(2);
  document.getElementById('aboutLead').textContent = a.lead;
  document.getElementById('aboutSub').textContent = a.sub;
}

/* the four stat cells. Numeric ones get data-count so they animate on scroll */
function renderStats(){
  document.getElementById('statline').innerHTML = CONFIG.stats.map(s => {
    const inner = (s.value === null)
      ? `<div class="num">${s.display}</div>`
      : `<div class="num" data-count="${s.value}" data-suffix="${s.suffix||''}">0</div>`;
    return `<div class="s">${inner}<div class="lbl">${s.label}</div></div>`;
  }).join('');
}

/* kinetic band words, tripled so the loop has room to travel */
function renderKinetic(){
  const set = CONFIG.kinetic.map(k => `<span>${k}<span class="star">&#9670;</span></span>`).join('');
  document.getElementById('ktrack').innerHTML = set + set + set;
}

/* project cards. Each card gets an increasing 'top' + z-index so they stack */
function renderWork(){
  document.getElementById('stack').innerHTML = CONFIG.projects.map((p,i) => `
    <a class="pcard" href="${p.url}" target="_blank" rel="noopener" style="top:calc(92px + ${i*14}px);z-index:${i+1}">
      <div>
        <div class="pidx">[ ${p.n} ]</div>
        <h3>${p.t}</h3>
        <p>${p.d}</p>
        <div class="ptags">${p.tags.map(t => `<em>${t}</em>`).join('')}</div>
      </div>
      <div class="pgo">View repo <span class="arrow">&nearr;</span></div>
    </a>`).join('');
}

/* experience rows */
function renderExperience(){
  document.getElementById('xp').innerHTML = CONFIG.experience.map(x => `
    <div class="xp-item" data-reveal>
      <div class="when">${x.when}</div>
      <div>
        <div class="role">${x.role}</div>
        <span class="org">${x.org}</span>
        <ul>${x.points.map(pt => `<li>${pt}</li>`).join('')}</ul>
      </div>
    </div>`).join('');
}

/* education block + earlier-highlights block */
function renderBackground(){
  const e = CONFIG.education;
  document.getElementById('eduBlock').innerHTML = `
    <h4>Education</h4>
    <div class="bg-item">
      <div class="t">${e.degree}</div>
      <div class="m">${e.meta}</div>
      <div class="d">${e.detail}</div>
    </div>`;
  document.getElementById('hlBlock').innerHTML = `
    <h4>Earlier highlights</h4>
    ${CONFIG.highlights.map(h => `
      <div class="bg-item">
        <div class="t">${h.title} <span class="pop">${h.pop}</span></div>
        <div class="m">${h.meta}</div>
        <div class="d">${h.detail}</div>
      </div>`).join('')}`;
}

/* certification cards (horizontal track) */
function renderCerts(){
  document.getElementById('ctrack').innerHTML = CONFIG.certs.map(c => `
    <a class="cert" href="${c.url}" target="_blank" rel="noopener">
      <div class="issuer">${c.issuer}</div>
      <div class="ctitle">${c.title}</div>
      <span class="clink">Certificate <span class="arrow">&nearr;</span></span>
    </a>`).join('');
}

/* contact heading, links, CTA and footer (copyright year is automatic) */
function renderContact(){
  const p = CONFIG.profile, c = CONFIG.contact;
  document.getElementById('contactHeadline').innerHTML =
    c.headline.map(line => `<span class="line" style="height:11rem" ><span>${lineSegments(line)}</span></span>`).join('');
  document.getElementById('contactLinks').innerHTML = `
    <a href="mailto:${p.email}" data-magnetic>${p.email} <span class="arrow">&rarr;</span></a>
    <a href="tel:${p.phoneHref}" data-magnetic>${p.phone} <span class="arrow">&rarr;</span></a>
    <a href="${p.github}" target="_blank" rel="noopener" data-magnetic>GitHub <span class="arrow">&nearr;</span></a>
    <a href="${p.linkedin}" target="_blank" rel="noopener" data-magnetic>LinkedIn <span class="arrow">&nearr;</span></a>`;
  const cta = document.getElementById('contactCta');
  cta.href = `mailto:${p.email}`;
  cta.innerHTML = `${c.ctaLabel} <span class="arrow">&rarr;</span>`;
  document.getElementById('footCopy').textContent = `© ${new Date().getFullYear()} ${p.firstName} ${p.lastName}`;
  document.getElementById('footLoc').innerHTML = `${p.location} · <span class="clock" id="clock">--:--:--</span> local`;
  document.getElementById('footNote').textContent = c.footerNote;
}

/* run every renderer once, in order */
function renderAll(){
  renderMeta(); renderNav(); renderHero(); renderAbout(); renderStats();
  renderKinetic(); renderWork(); renderExperience(); renderBackground();
  renderCerts(); renderContact();
}
renderAll();   /* build the page content right away */

/* ----------------------------------------------------------------------------
   PRELOADER : animate a 0 to 100 counter, then reveal the site
   ---------------------------------------------------------------------------- */
(function(){
  const loader=document.getElementById('loader'),pct=document.getElementById('pct'),bar=document.getElementById('lbar');
  let v=0;
  (function tick(){
    v += Math.max(1,(100-v)*0.07);
    if(v>=100) v=100;
    pct.textContent=Math.round(v); bar.style.width=v+'%';
    if(v<100) requestAnimationFrame(tick); else done();
  })();
  function done(){
    if(window.gsap){
      gsap.to(loader,{autoAlpha:0,duration:.7,ease:"power3.inOut",delay:.2,onStart:init,onComplete:()=>loader.remove()});
    } else {
      loader.remove();
      const cg=document.getElementById('cgallery'); if(cg) cg.style.overflowX='auto';
      init();
    }
  }
  setTimeout(()=>{ if(document.body.contains(loader)){loader.remove(); init();} },4500);
})();

/* ----------------------------------------------------------------------------
   init() : all scroll + entrance animations. Runs once, after the preloader.
   ---------------------------------------------------------------------------- */
let started=false;
function init(){
  if(started) return; started=true;
  if(!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);

  let lenis;
  if(window.Lenis){
    lenis=new Lenis({lerp:.085,smoothWheel:true});
    lenis.on('scroll',ScrollTrigger.update);
    gsap.ticker.add(t=>lenis.raf(t*1000));
    gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
      const el=document.querySelector(a.getAttribute('href'));
      if(el){ e.preventDefault(); lenis.scrollTo(el,{offset:-10}); }
    }));
  }

  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;

  gsap.set('.line > span',{yPercent:115});

  if(!reduce){
    gsap.to('.hero .line > span',{yPercent:0,duration:1.15,ease:"expo.out",stagger:.1,delay:.05});
    gsap.from('.hero [data-reveal]',{y:26,opacity:0,duration:1,ease:"power3.out",stagger:.08,delay:.5});

    gsap.utils.toArray('[data-reveal]').forEach(el=>{
      if(el.closest('.hero')) return;
      gsap.from(el,{y:46,opacity:0,duration:1.1,ease:"expo.out",scrollTrigger:{trigger:el,start:"top 90%"}});
    });

    gsap.utils.toArray('[data-splitlines]').forEach(p=>{
      splitToLines(p);
      gsap.set(p.querySelectorAll('.line > span'),{yPercent:115});
      gsap.to(p.querySelectorAll('.line > span'),{yPercent:0,duration:1.1,ease:"expo.out",stagger:.08,scrollTrigger:{trigger:p,start:"top 86%"}});
    });

    gsap.utils.toArray('.contact .line > span').forEach(s=>{
      gsap.to(s,{yPercent:0,duration:1.1,ease:"expo.out",scrollTrigger:{trigger:s.closest('.big'),start:"top 86%"}});
    });

    gsap.utils.toArray('[data-count]').forEach(el=>{
      const end=+el.dataset.count, suf=el.dataset.suffix||'', o={v:0};
      ScrollTrigger.create({trigger:el,start:"top 92%",once:true,onEnter:()=>
        gsap.to(o,{v:end,duration:1.7,ease:"power2.out",onUpdate:()=>el.textContent=Math.round(o.v)+suf})});
    });

    const ktrack=document.getElementById('ktrack');
    gsap.fromTo(ktrack,{xPercent:5},{xPercent:-38,ease:"none",scrollTrigger:{trigger:'.kband',start:"top bottom",end:"bottom top",scrub:1}});
    const skewTo=gsap.quickTo(ktrack,"skewX",{duration:.5,ease:"power3"});
    ScrollTrigger.create({onUpdate:self=>{
      const v=gsap.utils.clamp(-8,8,self.getVelocity()/-280);
      skewTo(v);
      clearTimeout(ktrack._t); ktrack._t=setTimeout(()=>skewTo(0),120);
    }});

    const cards=gsap.utils.toArray('.pcard');
    cards.forEach((card,i)=>{
      if(i===cards.length-1) return;
      gsap.to(card,{scale:.94,opacity:.55,ease:"none",scrollTrigger:{trigger:cards[i+1],start:"top 80%",end:"top 32%",scrub:true}});
    });

    const ctrk=document.getElementById('ctrack'),cgal=document.getElementById('cgallery');
    const cdist=()=>Math.max(0, ctrk.scrollWidth - cgal.clientWidth + parseFloat(getComputedStyle(ctrk).paddingLeft));
    gsap.to(ctrk,{x:()=>-cdist(),ease:"none",
      scrollTrigger:{trigger:cgal,start:"center center",end:()=>"+="+cdist(),pin:true,scrub:1,anticipatePin:1,invalidateOnRefresh:true}});

  } else {
    gsap.set('.line > span',{yPercent:0});
    const cg=document.getElementById('cgallery'); if(cg) cg.style.overflowX='auto';
  }

  ScrollTrigger.refresh();
}

/* split a paragraph into real visual lines, each wrapped in an overflow-hidden
   mask, so the text can rise line by line */
function splitToLines(p){
  const words=p.textContent.trim().split(' ');
  const frag=document.createElement('div');
  words.forEach((w,i)=>{const s=document.createElement('span');s.textContent=w+(i<words.length-1?' ':'');s.style.display='inline-block';frag.appendChild(s)});
  p.textContent=''; p.appendChild(frag);
  const lines=[]; let cur=[], last=null;
  [...frag.children].forEach(s=>{const top=s.offsetTop;if(last===null)last=top;if(top>last){lines.push(cur);cur=[];last=top}cur.push(s.textContent)});
  if(cur.length) lines.push(cur);
  p.innerHTML=lines.map(l=>`<span class="line"><span>${l.join('')}</span></span>`).join('');
}

/* ----------------------------------------------------------------------------
   CUSTOM CURSOR + MAGNETIC BUTTONS (skipped on touch devices)
   ---------------------------------------------------------------------------- */
(function(){
  if(matchMedia('(hover:none)').matches) return;
  const cur=document.querySelector('.cursor'),dot=document.querySelector('.cursor-dot');
  let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
  addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`});
  (function loop(){cx+=(mx-cx)*.16;cy+=(my-cy)*.16;cur.style.transform=`translate(${cx}px,${cy}px) translate(-50%,-50%)`;requestAnimationFrame(loop)})();
  document.querySelectorAll('a,button,.pcard,.cert,[data-magnetic]').forEach(el=>{
    el.addEventListener('mouseenter',()=>cur.classList.add('is-hover'));
    el.addEventListener('mouseleave',()=>cur.classList.remove('is-hover'));
  });
  document.querySelectorAll('[data-magnetic]').forEach(el=>{
    el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();
      if(window.gsap)gsap.to(el,{x:(e.clientX-(r.left+r.width/2))*.3,y:(e.clientY-(r.top+r.height/2))*.4,duration:.4,ease:"power3.out"})});
    el.addEventListener('mouseleave',()=>{if(window.gsap)gsap.to(el,{x:0,y:0,duration:.6,ease:"elastic.out(1,.4)"})});
  });
})();

/* ----------------------------------------------------------------------------
   MOBILE MENU : open/close the fullscreen overlay
   ---------------------------------------------------------------------------- */
(function(){
  const t=document.getElementById('menuToggle'),c=document.getElementById('menuClose'),m=document.getElementById('mmenu');
  if(!t||!m) return;
  const open=()=>{m.classList.add('open');m.setAttribute('aria-hidden','false')};
  const close=()=>{m.classList.remove('open');m.setAttribute('aria-hidden','true')};
  t.addEventListener('click',open);
  if(c) c.addEventListener('click',close);
  m.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setTimeout(close,10)));
})();

/* ----------------------------------------------------------------------------
   LIVE CLOCK : shows current local time in your timezone, updates every second
   ---------------------------------------------------------------------------- */
(function(){
  const el=document.getElementById('clock'); if(!el) return;
  const upd=()=>el.textContent=new Intl.DateTimeFormat('en-GB',{timeZone:CONFIG.profile.timezone,hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(new Date());
  upd(); setInterval(upd,1000);
})();
