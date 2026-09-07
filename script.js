/* ============================================================
   LOADER
============================================================ */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('done'), 400);
});

/* ============================================================
   CUSTOM CURSOR
============================================================ */
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
window.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px'; dot.style.top = my + 'px';
});
const isTouchDevice = window.matchMedia('(hover: none)').matches;
if (!isTouchDevice) {
 (function animateRing(){
  rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
})();
}
document.querySelectorAll('a,button,.skill-card,.project-card,.cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hover'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
});

/* ============================================================
   SCROLL PROGRESS + NAVBAR STATE + BACK TO TOP
============================================================ */
const progress = document.getElementById('scroll-progress');
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progress.style.width = pct + '%';
  navbar.classList.toggle('scrolled', h.scrollTop > 10);
  backToTop.classList.toggle('show', h.scrollTop > 600);
});
backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

/* ============================================================
   MOBILE MENU
============================================================ */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  burger.classList.toggle('open');
});
document.querySelectorAll('#mobile-menu a').forEach(a =>
  a.addEventListener('click', () => mobileMenu.classList.remove('open'))
);

/* ============================================================
   ACTIVE NAV LINK ON SCROLL
============================================================ */
const sections = document.querySelectorAll('main section, .hero');
const navLinks = document.querySelectorAll('.nav-link');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });
sections.forEach(s => navObserver.observe(s));

/* ============================================================
   THEME TOGGLE
============================================================ */
const themeBtn = document.getElementById('theme-toggle');
function setTheme(theme){
  document.body.setAttribute('data-theme', theme);
  themeBtn.innerHTML = theme === 'light' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  localStorage.setItem('theme', theme);
}
setTheme(localStorage.getItem('theme') || 'dark');
themeBtn.addEventListener('click', () => {
  setTheme(document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
});

/* ============================================================
   REVEAL ON SCROLL
============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================================
   TYPING ANIMATION (HERO)
============================================================ */
const typedEl = document.getElementById('typed');
const phrases = ['data pipelines', 'machine learning models', 'Generative AI applications', 'scalable cloud systems'];
let pIdx = 0, cIdx = 0, deleting = false;
function typeLoop(){
  const phrase = phrases[pIdx];
  if (!deleting) {
    cIdx++;
    typedEl.textContent = phrase.slice(0, cIdx);
    if (cIdx === phrase.length) { deleting = true; setTimeout(typeLoop, 1600); return; }
  } else {
    cIdx--;
    typedEl.textContent = phrase.slice(0, cIdx);
    if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
  }
  setTimeout(typeLoop, deleting ? 35 : 65);
}
typeLoop();

/* ============================================================
   ANIMATED COUNTERS
============================================================ */
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.target;
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const tick = () => {
        cur += step;
        if (cur >= target) { el.textContent = target; return; }
        el.textContent = cur;
        requestAnimationFrame(tick);
      };
      tick();
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

/* ============================================================
   SKILLS DATA + RENDER
============================================================ */
const skillsData = {
  languages: [
    { name:'Python', icon:'fa-brands fa-python', level:90 },
    { name:'Java', icon:'fa-solid fa-mug-saucer', level:75 },
    { name:'SQL', icon:'fa-solid fa-database', level:85 },
    { name:'Data Structures & Algorithms', icon:'fa-solid fa-diagram-project', level:80 },
  ],
  data: [
    { name:'Data Analysis & Visualization', icon:'fa-solid fa-chart-column', level:85 },
    { name:'ETL Pipelines', icon:'fa-solid fa-arrows-spin', level:78 },
    { name:'Data Warehousing', icon:'fa-solid fa-warehouse', level:75 },
  ],
  ai: [
    { name:'Machine Learning', icon:'fa-solid fa-robot', level:85 },
    { name:'Deep Learning', icon:'fa-solid fa-brain', level:88 },
    { name:'Generative AI', icon:'fa-solid fa-wand-magic-sparkles', level:80 },
    { name:'LLMs & RAG', icon:'fa-solid fa-comments', level:78 },
    { name:'Natural Language Processing', icon:'fa-solid fa-language', level:80 },
  ],
  devops: [
    { name:'Git', icon:'fa-brands fa-git-alt', level:88 },
    { name:'GitHub', icon:'fa-brands fa-github', level:90 },
    { name:'Linux', icon:'fa-brands fa-linux', level:80 },
    { name:'Docker', icon:'fa-brands fa-docker', level:75 },
    { name:'CI/CD Pipelines', icon:'fa-solid fa-infinity', level:72 },
  ],
  cloud: [
    { name:'AWS (Learning)', icon:'fa-brands fa-aws', level:55 },
    { name:'Project Leadership', icon:'fa-solid fa-people-group', level:85 },
    { name:'Project Management', icon:'fa-solid fa-list-check', level:82 },
  ],
};

const skillsGrid = document.getElementById('skills-grid');
function renderSkills(tab){
  skillsGrid.innerHTML = '';
  skillsData[tab].forEach((s, i) => {
    const card = document.createElement('div');
    card.className = 'skill-card reveal';
    card.style.transitionDelay = (i * 0.05) + 's';
    card.innerHTML = `
      <i class="${s.icon} skill-icon"></i>
      <div class="skill-name">${s.name}</div>
      <div class="skill-bar"><span style="width:${s.level}%"></span></div>
    `;
    skillsGrid.appendChild(card);
    revealObserver.observe(card);
  });
}
renderSkills('languages');
document.querySelectorAll('#skills-tabs .tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#skills-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderSkills(btn.dataset.tab);
  });
});

/* ============================================================
   PROJECTS DATA + RENDER
============================================================ */
/* NOTE: Your resume didn't list specific projects, so these are
   placeholder templates aligned to your stated interests (Data
   Engineering, AI/ML, GenAI, DevOps, Cloud). Replace title/desc/
   tech/features/links with your real project details. */
const projectsData = [
  {
    title:'E-Commerce Data Warehouse',
    desc:'An end-to-end Data Engineering project built using the Olist Brazilian E-Commerce dataset. The objective of this project is to transform raw e-commerce data into a structured data warehouse for analytical reporting and business intelligence.',
    img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=60&auto=format',
    tech:['Python','SQL','ETL','Data Warehousing','Python','Pandas','SQLAlchemy'],
    features:['Data Ingestion','ETL Pipeline Development','Data Cleaning and Transformation','Data Warehouse Design',],
    github:'https://github.com/sujalkurkute/E-Commerce-Data-Warehouse'
  },
  {
    title:'Deepfake KYC Buster',
    desc:'An AI-powered system that detects deepfake images and videos to enhance digital identity verification and prevent fraud in KYC processes.',
    img:'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=60&auto=format',
    tech:['Python','Deep Learning','convolution Neural Network'],
    features:['Social media misinformation','Banking and fintech security','94% accuracy in deepfake detection'],
    github:'https://github.com/sujalkurkute/Deepfake-KYC-Buster'
  },
  { 
    title:'NDVI-values-predictor',
    desc:'An AI-powered web application that monitors crop health using Sentinel-2 satellite imagery and forecasts future NDVI values with Deep Learning. The project combines Google Earth Engine, Streamlit, and LSTM models to help monitor vegetation health and identify potential crop stress.',
    img:'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=60&auto=format',
    tech:['Python','Streamlit','google Earth Engine','Long and Short Term Memory'],
    features:['NDVI time-series visualization','Crop stress prediction','Export NDVI data as CSV','Interactive Streamlit dashboard'],
    github:'https://github.com/sujalkurkute/NDVI-values-predictor'
  },
  
  
];

const projectsGrid = document.getElementById('projects-grid');
projectsData.forEach((p, i) => {
  const card = document.createElement('article');
  card.className = 'project-card reveal';
  card.style.transitionDelay = (i * 0.07) + 's';
  card.innerHTML = `
    <div class="project-img"><img src="${p.img}" alt="${p.title}" loading="lazy"></div>
    <div class="project-body">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="project-tags">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
      <ul class="project-features">${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
      <div class="project-links">
        <a href="${p.github}" class="btn btn-glass" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Code</a>
      </div>
    </div>
  `;
  // 3D tilt
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  projectsGrid.appendChild(card);
  revealObserver.observe(card);
});

/* ============================================================
   CERTIFICATIONS DATA + RENDER + FILTER
============================================================ */
const certsData = [
  { name:'Deep Learning', org:'NPTEL - IIT Roper', date:'Add date', cat:'AI/ML', link:'https://drive.google.com/file/d/1u5ZOov7q_h98xKVjw753lV3xkJD_3Mav/view?usp=drive_link' },
  { name:'Software Engineer Intern', org:'Hackerrank', date:'Add date', cat:'software Engg', link:'https://www.hackerrank.com/certificates/7905724ea313' },
  { name:'Python', org:'Hackerrank', date:'Add date', cat:'Dev', link:'https://www.hackerrank.com/certificates/7905724ea313' },
  { name:'Project Management Skills for Leaders', org:'Linkedln', date:'Add date', cat:'Dev', link:'https://www.linkedin.com/learning/certificates/a45df13cf2398849dc5c5c0f052d6b6829b857e2903f1ac3e23bbadd261b1a7d?trk=share_certificate' },
  { name:'Data Analytics', org:'Geek for Geeks', date:'Add date', cat:'AI/ML', link:'https://www.geeksforgeeks.org/certificate/350504a0f723385cf5470f7f3e6d6573?utm_source=socials&utm_medium=cc_link' },
  { name:'Structured Query Language', org:'Hackerrank', date:'Add date', cat:'AI/ML', link:'https://www.hackerrank.com/certificates/162c278a6565' },
  
];
const certsGrid = document.getElementById('certs-grid');
function renderCerts(filter){
  certsGrid.innerHTML = '';
  certsData
    .filter(c => filter === 'all' || c.cat === filter)
    .forEach((c, i) => {
      const card = document.createElement('div');
      card.className = 'cert-card reveal';
      card.style.transitionDelay = (i * 0.05) + 's';
      card.innerHTML = `
        <div class="cert-card-top">
          <i class="fa-solid fa-certificate cert-icon"></i>
          <span class="cert-tag">${c.cat}</span>
        </div>
        <h4>${c.name}</h4>
        <p class="cert-org">${c.org}</p>
        <p class="cert-date"><i class="fa-regular fa-calendar"></i> ${c.date}</p>
        <a href="${c.link}" class="cert-link" target="_blank" rel="noopener">View Credential <i class="fa-solid fa-arrow-right"></i></a>
      `;
      certsGrid.appendChild(card);
      revealObserver.observe(card);
    });
}
renderCerts('all');
document.querySelectorAll('#cert-filters .tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#cert-filters .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCerts(btn.dataset.filter);
  });
});

/* ============================================================
   ACHIEVEMENTS DATA + RENDER
============================================================ */
const achievementsData = [
  { icon:'📜', color:'#06B6D4', title:'Pune Agri Hackathon Finalist 2026 ', desc:'selected among top 15 teams from 1200+ participants' },
  { icon:'🗣️', color:'#2563EB', title:'Event Manager', desc:'AI & Data Science Students Association 2025-26.Organized 10+ events including tech fests, speaker sessions, and coding workshops,Engaged 500+ participants through strategic promotion and effective planning ,Led a core team of 15+ members and coordinated logistics end-to-end.' },
  { icon:'🎯', color:'#fbbf24', title:'Project Management Skills for Leaders', desc:'Certified in project leadership and management fundamentals.' },
];
const achTimeline = document.getElementById('achievements-timeline');
achievementsData.forEach((a, i) => {
  const item = document.createElement('div');
  item.className = 'ach-item reveal';
  item.style.transitionDelay = (i * 0.07) + 's';
  item.innerHTML = `
    <span class="ach-icon" style="color:${a.color}">${a.icon}</span>
    <div><h4>${a.title}</h4><p>${a.desc}</p></div>
  `;
  achTimeline.appendChild(item);
  revealObserver.observe(item);
});

/* ============================================================
   RESUME PREVIEW
============================================================ */
document.getElementById('preview-resume-btn').addEventListener('click', (e) => {
  e.preventDefault();
  window.open('assets/Sujal Kurkute - Resume.pdf', '_blank');
});

/* ============================================================
   CONTACT FORM (Formspree-ready, free tier)
   Replace YOUR_FORM_ID below with your free Formspree endpoint
   to receive real emails: https://formspree.io
============================================================ */
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('.btn-submit');
  const text = btn.querySelector('.btn-submit-text');
  text.textContent = 'Sending...';
  btn.disabled = true;

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
  const payload = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
  };

  try {
    if (!FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
      await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      await new Promise(r => setTimeout(r, 900)); // demo delay
    }
    document.getElementById('form-success').classList.add('show');
    contactForm.reset();
  } catch (err) {
    alert('Something went wrong — please email me directly instead.');
  } finally {
    text.textContent = 'Send Message';
    btn.disabled = false;
  }
});

/* ============================================================
   PARTICLE BACKGROUND (Canvas, vanilla — no library)
============================================================ */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = document.body.scrollHeight;
}
function initParticles(){
  const count = Math.min(80, Math.floor(window.innerWidth / 18));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.6 + 0.4,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    hue: Math.random() > 0.5 ? '37,99,235' : '6,182,212',
  }));
}
function drawParticles(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.hue},0.5)`;
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}
resizeCanvas();
initParticles();
drawParticles();
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

/* ============================================================
   404 HANDLING NOTE:
   For static hosts (Vercel/Netlify), add a separate 404.html
   alongside this file — most platforms auto-serve it.
============================================================ */