/* Afonso Matos da Cruz — main.js */
'use strict';

/* Year */
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

/* ── READY (no loader) ──────────────────────────────────────────── */
document.body.classList.add('is-ready');

/* ── LANGUAGE SWITCHER ──────────────────────────────────────────── */
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    if (typeof setLanguage === 'function') setLanguage(lang);
  });
});

/* ── SCROLL PROGRESS ────────────────────────────────────────────── */
const progress = document.getElementById('progress');
const nav = document.getElementById('nav');
let lastScrollY = 0;
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const h = document.documentElement;
      const pct = scrollY / (h.scrollHeight - h.clientHeight) * 100;

      if (progress) progress.style.width = pct + '%';

      if (nav) {
        nav.classList.toggle('is-solid', scrollY > 50);
        if (scrollY > 120) {
          if (scrollY > lastScrollY + 8)  nav.classList.add('is-hidden');
          else if (scrollY < lastScrollY - 4) nav.classList.remove('is-hidden');
        } else {
          nav.classList.remove('is-hidden');
        }
      }

      /* Active nav links */
      let current = '';
      document.querySelectorAll('section[id]').forEach(s => {
        if (scrollY >= s.offsetTop - 160) current = s.id;
      });
      document.querySelectorAll('.nav-links a[href^="#"]').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
      });

      lastScrollY = scrollY;
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

/* ── HAMBURGER ──────────────────────────────────────────────────── */
const hbg  = document.getElementById('hbg');
const menu = document.getElementById('mobile-menu');
const closeMenu = () => {
  hbg?.classList.remove('open');
  menu?.classList.remove('open');
  hbg?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
};
hbg?.addEventListener('click', () => {
  const open = hbg.classList.toggle('open');
  menu?.classList.toggle('open', open);
  hbg.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});
menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

/* ── SCROLL REVEALS ─────────────────────────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('show');
    revealObs.unobserve(e.target);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.fu, .cr').forEach(el => revealObs.observe(el));

/* ── INTERSTITIAL PARALLAX ──────────────────────────────────────── */
const intEls = document.querySelectorAll('.interstitial');
const intObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in-view'); intObs.unobserve(e.target); }
  });
}, { threshold: 0.06 });
intEls.forEach(el => intObs.observe(el));

window.addEventListener('scroll', () => {
  intEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const pct = -rect.top / window.innerHeight;
      const img = el.querySelector('img');
      if (img) img.style.transform = `scale(1.06) translateY(${pct * 28}px)`;
    }
  });
}, { passive: true });

/* ── FOOTER REVEAL ──────────────────────────────────────────────── */
const footObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.rl-line').forEach((el, i) => {
      el.style.transitionDelay = (i * 0.14) + 's';
      el.classList.add('rl-show');
    });
    footObs.unobserve(e.target);
  });
}, { threshold: 0.18 });
document.querySelectorAll('.footer-big').forEach(el => footObs.observe(el));

/* Hero discipline cycle moved to updateHeroDisciplines() */

/* ── DYNAMIC CONTENT BUILDERS (i18n-aware) ──────────────────────── */

/* Helper: get translated array/object from translations */
function getTranslated(key, fallback) {
  if (typeof t !== 'function') return fallback;
  const val = t(key);
  return val !== key ? val : fallback;
}

/* ── PROJECTENLIJST — Dynamisch opgebouwd met vertalingen ───────────────────── */
function buildProjects() {
  const plist = document.getElementById('project-list');
  if (!plist) return;

  const projects = [
    {
      num: '01', year: '2025',
      titleKey: 'project.disco.title',
      subKey: 'project.disco.sub',
      catsKey: 'project.disco.cats',
      href: 'project/disco.html',
      img: 'assets/disco/hero.jpg',
      alt: 'Project Disco editorial spread',
    },
    {
      num: '02', year: '2025',
      titleKey: 'project.smak.title',
      subKey: 'project.smak.sub',
      catsKey: 'project.smak.cats',
      href: 'project/smak.html',
      img: 'assets/smak/pixelbeeld.jpg',
      alt: 'S.M.A.K. tentoonstellingsaffiche',
    },
    {
      num: '03', year: '2026',
      titleKey: 'project.oostende.title',
      subKey: 'project.oostende.sub',
      catsKey: 'project.oostende.cats',
      href: 'project/oostende.html',
      img: 'assets/oostende/hero-project.jpg',
      alt: 'Project Oostende styleguide',
    }
  ];

  plist.className = 'project-list';
  plist.innerHTML = '';

  projects.forEach((p, i) => {
    const title = getTranslated(p.titleKey, p.titleKey);
    const sub = getTranslated(p.subKey, p.subKey);
    const catsArr = getTranslated(p.catsKey, ['Branding','Print','Motion','Web']);
    const cats = Array.isArray(catsArr) ? catsArr.join('<span class="project-category-sep">·</span>') : catsArr;
    const viewLabel = getTranslated('work.view', 'BEKIJK');

    const item = document.createElement('a');
    item.className = 'project-item fu';
    item.href = p.href;
    item.setAttribute('role', 'listitem');
    item.style.setProperty('--delay', (i * 0.1) + 's');
    item.setAttribute('aria-label', title.replace(/<[^>]+>/g, ''));
    item.innerHTML = `
      <span class="project-num">${p.num}</span>
      <div class="project-info">
        <div class="project-category">${cats}</div>
        <div class="project-title">${title}</div>
        <div class="project-sub">${sub}</div>
        <div class="project-year-row">
          <span class="project-year">${p.year}</span>
          <span class="project-year-line" aria-hidden="true"></span>
        </div>
      </div>
      <div class="project-thumb">
        <img src="${p.img}" alt="${p.alt}" loading="lazy" decoding="async">
        <div class="project-thumb-label" aria-hidden="true"><span>${viewLabel}</span></div>
      </div>`;
    plist.appendChild(item);
    revealObs.observe(item);
  });
}

/* ── ARCHIVE GRID — uniform with info overlay ───────────────────── */
function buildArchive() {
  const agrid = document.getElementById('archive-grid');
  if (!agrid) return;

  const works = getTranslated('archive.works', []);
  if (!Array.isArray(works) || works.length === 0) return;

  agrid.innerHTML = '';

  // EXACT 13 ITEMS (Index 0 t/m 12)
  const ARCHIVE_IMGS = [
    'assets/algemeen/Viktor Gyökeres Poster Afonso.jpg',    // 0
    'assets/algemeen/Travis Scott Poster Afonso.jpg',      // 1
    'assets/algemeen/English-Breakfast-Poster.jpg',        // 2
    'assets/algemeen/Poster-Verbondenheid-Web.jpg',         // 3
    'assets/algemeen/compositie_silent_spring_afonso.jpg', // 4
    'assets/algemeen/Waveform Ticket.jpg',                 // 5
    null,                                                  // 6: Visitekaartje
    'assets/algemeen/Afonso-Logo.jpg',                     // 7: Personal Branding Logo
    null,                                                  // 8: Marcel Broodthaers
    null,                                                  // 9: Harry Bertoia (gebruikt PAGES)
    'assets/algemeen/The Circle Logo.jpg',                 // 10: The Circle Logo
    null,                                                  // 11: The Circle Business Card (gebruikt PAGES)
    null                                                   // 12: The Circle Mockups (gebruikt PAGES)
  ];

  // EXACT 13 ITEMS (Index 0 t/m 12)
  const ARCHIVE_PAGES = [
    null, // 0
    null, // 1
    null, // 2
    null, // 3
    null, // 4
    null, // 5
    [
      'assets/algemeen/Kaart Vis voorkant kaart.jpg', 
      'assets/algemeen/Kaart Vis achterkant kaar.jpg'
    ], // 6: Visitekaartje
    null, // 7
    [
      'assets/algemeen/PopArt Spread Marcel Broodthaers.jpg', 
      'assets/algemeen/PopArt Spread Marcel Broodthaers2.jpg', 
      'assets/algemeen/PopArt Spread Marcel Broodthaers3.jpg'
    ], // 8: Marcel Broodthaers
    [
      'assets/algemeen/Harry Bertoia Spread.jpg',
      'assets/algemeen/Harry Bertoia Spread2.jpg'
    ], // 9: Harry Bertoia (2 pagina's) -> PAS BESTANDSNAMEN AAN
    null, // 10: The Circle Logo
    [
      'assets/algemeen/Buisiness card The Circle_Tekengebied 1.jpg',
      'assets/algemeen/Buisiness card The Circle-02.jpg'
    ], // 11: The Circle Business Card (2 pagina's) -> PAS BESTANDSNAMEN AAN
    [
      'assets/algemeen/Business Cards Mockup The Circle 1.jpg',
      'assets/algemeen/Business Cards Mockup The Circle 2.jpg',
      'assets/algemeen/Business Cards Mockup The Circle 3.jpg'
    ] // 12: The Circle Mockups (3 pagina's) -> PAS BESTANDSNAMEN AAN
  ];

  works.forEach((a, i) => {
    const el = document.createElement('div');
    el.className = 'archive-item fu';
    el.setAttribute('role', 'listitem');
    el.style.setProperty('--delay', (i * 0.05) + 's');

    const hasPages = ARCHIVE_PAGES[i] && ARCHIVE_PAGES[i].length > 1;
    const imgSrc = hasPages ? ARCHIVE_PAGES[i][0] : ARCHIVE_IMGS[i];
    const zoomAction = getTranslated('archive.action.zoom', 'Klik om te vergroten');
    const pagesAction = getTranslated('archive.action.pages', "Klik voor pagina's / vergroten");
    const pageBadge = getTranslated('archive.pageBadge', "pagina's");
    const prevLabel = '‹';
    const nextLabel = '›';

    if (hasPages) {
      el.innerHTML = `
        <span class="archive-page-badge" aria-hidden="true">${ARCHIVE_PAGES[i].length} ${pageBadge}</span>
        <div class="archive-thumb">
          <img src="${imgSrc}" alt="${a.name}" loading="lazy" decoding="async" data-lightbox data-page="0" data-pages="${ARCHIVE_PAGES[i].join('|')}" data-work="${i}" data-desc="${a.desc}">
          <div class="archive-pages" aria-hidden="true">
            <button class="archive-page-btn" data-dir="prev" data-work="${i}" aria-label="Vorige pagina">${prevLabel}</button>
            <button class="archive-page-btn" data-dir="next" data-work="${i}" aria-label="Volgende pagina">${nextLabel}</button>
          </div>
          <div class="archive-info-overlay" aria-hidden="true">
            <div class="archive-info-title">${a.name}</div>
            <div class="archive-info-desc">${a.desc}</div>
            <div class="archive-info-action">${pagesAction}</div>
          </div>
        </div>
        <div class="archive-info">
          <div class="archive-name">${a.name}</div>
          <div class="archive-type">${a.type}</div>
        </div>`;
    } else {
      el.innerHTML = `
        <div class="archive-thumb">
          <img src="${imgSrc}" alt="${a.name}" loading="lazy" decoding="async" data-lightbox data-desc="${a.desc}">
          <div class="archive-info-overlay" aria-hidden="true">
            <div class="archive-info-title">${a.name}</div>
            <div class="archive-info-desc">${a.desc}</div>
            <div class="archive-info-action">${zoomAction}</div>
          </div>
        </div>
        <div class="archive-info">
          <div class="archive-name">${a.name}</div>
          <div class="archive-type">${a.type}</div>
        </div>`;
    }
    agrid.appendChild(el);
    revealObs.observe(el);
  });

  /* Multi-page navigation */
  agrid.addEventListener('click', e => {
    const btn = e.target.closest('.archive-page-btn');
    if (!btn) return;
    e.stopPropagation();
    const workIdx = parseInt(btn.dataset.work);
    const dir = btn.dataset.dir;
    const pages = ARCHIVE_PAGES[workIdx];
    if (!pages) return;

    const img = btn.closest('.archive-item').querySelector('img[data-page]');
    if (!img) return;
    let page = parseInt(img.dataset.page || '0');

    if (dir === 'prev') page = (page - 1 + pages.length) % pages.length;
    else page = (page + 1) % pages.length;

    img.src = pages[page];
    img.dataset.page = String(page);
  });
}

/* ── BEELD & BEWEGING — Photo & Film ────────────────────────────── */
const PHOTOS = [
  { src: 'assets/fotografie/20240720-IMG_2851.jpg',        alt: 'Waterfront dramatische lucht',          tall: true },
  { src: 'assets/fotografie/Richtingen en dualiteit Van Snick.jpg', alt: 'Grafisch architectuurdetail',  tall: false },
  { src: 'assets/fotografie/20250820-IMG_6478.jpg',        alt: 'Klassieke auto\'s Rome',                tall: true },
  { src: 'assets/fotografie/20250820-IMG_6482-3.jpg',      alt: 'Brug met tram en lichten',             tall: false },
  { src: 'assets/fotografie/20250820-IMG_6498-2.jpg',      alt: 'Minimalist raam zonsondergang',         tall: true },
  { src: 'assets/fotografie/20250823-IMG_6627-2.jpg',      alt: 'Nacht-architectuur Opera',              tall: false },
  { src: 'assets/fotografie/20251001-IMG_7026.jpg',        alt: 'Groene trap Parijs uitzicht',          tall: true },
  { src: 'assets/fotografie/20251001-IMG_7029.jpg',        alt: 'Parijse straatarchitectuur',            tall: false },
  { src: 'assets/fotografie/20251001-IMG_7045-4.jpg',      alt: 'Dakpannen zonsondergang',               tall: true },
  { src: 'assets/fotografie/20251002-IMG_7261-2.jpg',      alt: 'Landhuis met vijver',                   tall: false },
  { src: 'assets/fotografie/20251002-IMG_7286.jpg',        alt: 'Eiffeltoren nacht symmetrisch',         tall: true },
  { src: 'assets/fotografie/IMG_0048.jpg',                 alt: 'Fotografie detail',                     tall: false },
  { src: 'assets/fotografie/IMG_0049.jpg',                 alt: 'Straatfoto urban',                      tall: true },
  { src: 'assets/fotografie/IMG_0050.jpg',                 alt: 'Compositie en licht',                   tall: false },
  { src: 'assets/fotografie/IMG_0057.jpg',                 alt: 'Fotografische studie',                  tall: true },
  { src: 'assets/fotografie/IMG_0062.jpg',                 alt: 'Detail en textuur',                     tall: false },
  { src: 'assets/fotografie/IMG_0073.jpg',                 alt: 'Sfeerbeelden',                          tall: true },
  { src: 'assets/fotografie/IMG_0074.jpg',                 alt: 'Licht en schaduw',                      tall: false },
  { src: 'assets/fotografie/IMG_0076.jpg',                 alt: 'Urban fotografie',                      tall: true },
  { src: 'assets/fotografie/IMG_0077.jpg',                 alt: 'Kleur en compositie',                   tall: false },
  { src: 'assets/fotografie/IMG_0078.jpg',                 alt: 'Straatscène',                           tall: true },
  { src: 'assets/fotografie/IMG_0090.jpg',                 alt: 'Fotografische moment',                  tall: false },
  { src: 'assets/fotografie/IMG_9320.jpg',                 alt: 'Detail fotografie',                     tall: true },
  { src: 'assets/fotografie/IMG_9333.jpg',                 alt: 'Compositie studie',                     tall: false },
  { src: 'assets/fotografie/IMG_9336.jpg',                 alt: 'Licht en sfeer',                        tall: true },
  { src: 'assets/fotografie/IMG_9344.jpg',                 alt: 'Fotografische kunst',                   tall: false },
  { src: 'assets/fotografie/IMG_9467.jpg',                 alt: 'Finale compositie',                     tall: true },
];

function buildPhotos() {
  const mosaic = document.getElementById('photo-mosaic');
  if (!mosaic) return;
  mosaic.innerHTML = '';
  PHOTOS.forEach(p => {
    const cell = document.createElement('div');
    cell.className = 'photo-cell fu' + (p.tall ? ' tall' : '');
    cell.setAttribute('role', 'listitem');
    cell.innerHTML = `
      <img src="${p.src}" alt="${p.alt}" loading="lazy" decoding="async" data-lightbox>
      <div class="photo-zoom-hint" aria-hidden="true">↗</div>`;
    mosaic.appendChild(cell);
    revealObs.observe(cell);
  });
}

/* ── LIGHTBOX ────────────────────────────────────────────────────── */
const lb     = document.getElementById('lightbox');
const lbImg  = lb?.querySelector('.lb-img');
const lbCap  = lb?.querySelector('.lb-cap');
const lbInfo = lb?.querySelector('.lb-info');
let lbAll = [], lbIdx = 0;

function refreshLb() {
  const els = document.querySelectorAll('[data-lightbox]');
  lbAll = Array.from(els).map(el => {
    const pages = el.dataset.pages;
    if (pages) {
      const page = parseInt(el.dataset.page || '0');
      const pageList = pages.split('|');
      return { src: pageList[page], alt: el.alt, desc: el.dataset.desc || '' };
    }
    return { src: el.src, alt: el.alt, desc: el.dataset.desc || '' };
  });
  return lbAll;
}

function initLb() {
  const els = document.querySelectorAll('[data-lightbox]');
  refreshLb();
  els.forEach((el, i) => {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => {
      refreshLb();
      lbOpen(i);
    });
  });

  /* Also make entire archive-item clickable (click on non-button area) */
  document.querySelectorAll('.archive-item').forEach(item => {
    item.addEventListener('click', e => {
      if (e.target.closest('.archive-page-btn')) return; // skip page nav buttons
      const img = item.querySelector('[data-lightbox]');
      if (!img) return;
      const idx = Array.from(document.querySelectorAll('[data-lightbox]')).indexOf(img);
      if (idx >= 0) { refreshLb(); lbOpen(idx); }
    });
  });
}

const lbOpen = i => {
  if (!lb || !lbImg) return;
  lbIdx = i;
  lbImg.src = lbAll[i].src;
  lbImg.alt = lbAll[i].alt;
  if (lbCap) lbCap.textContent = lbAll[i].alt;
  if (lbInfo) lbInfo.textContent = lbAll[i].desc;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
};

const lbClose = () => { lb?.classList.remove('open'); document.body.style.overflow = ''; };

const lbNav = d => {
  lbIdx = (lbIdx + d + lbAll.length) % lbAll.length;
  if (lbImg) {
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = lbAll[lbIdx].src;
      lbImg.alt = lbAll[lbIdx].alt;
      if (lbCap) lbCap.textContent = lbAll[lbIdx].alt;
      if (lbInfo) lbInfo.textContent = lbAll[lbIdx].desc;
      lbImg.style.opacity = '1';
    }, 160);
  }
};

if (lb) {
  if (lbImg) lbImg.style.transition = 'opacity .16s';
  lb.querySelector('.lb-close')?.addEventListener('click', lbClose);
  lb.querySelector('.lb-prev')?.addEventListener('click',  () => lbNav(-1));
  lb.querySelector('.lb-next')?.addEventListener('click',  () => lbNav(1));
  lb.addEventListener('click', e => { if (e.target === lb) lbClose(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     lbClose();
    if (e.key === 'ArrowLeft')  lbNav(-1);
    if (e.key === 'ArrowRight') lbNav(1);
  });
}

/* ── CONTACTFORMULIER — Formspree integratie ────────────────────────── */
const form   = document.getElementById('contact-form');
const fstatus = document.getElementById('form-status');
if (form && fstatus) {
  const fn = document.getElementById('fn');
  const fe = document.getElementById('fe');
  const fm = document.getElementById('fm');

  // Verwijder foutstatus bij typen
  [fn, fe, fm].forEach(el => el?.addEventListener('input', () => el.closest('.field')?.classList.remove('has-error')));

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Honeypot — blokkeer bots die verborgen veld invullen
    const honeypot = form.querySelector('[name="website"]');
    if (honeypot && honeypot.value.trim() !== '') return;

    // Validatie
    let ok = true;
    const check = (el, test) => {
      const pass = test(el?.value.trim() || '');
      el?.closest('.field')?.classList.toggle('has-error', !pass);
      if (!pass) ok = false;
    };
    check(fn, v => v.length > 0 && v.length <= 200);
    check(fe, v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 254);
    check(fm, v => v.length > 0 && v.length <= 3000);
    if (!ok) return;

    // Loading state
    const btn = document.getElementById('submit-btn');
    const sendingText = getTranslated('contact.form.sending', 'Verzenden...');
    const submitText = getTranslated('contact.form.submit', 'Bericht versturen');
    const errorText = getTranslated('contact.form.error', 'Er ging iets mis. Probeer opnieuw.');

    if (btn) {
      btn.disabled = true;
      btn.textContent = sendingText;
      btn.setAttribute('aria-busy', 'true');
    }

    try {
      // Formspree POST request
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        // succes — redirect naar bedankpagina
        window.location.href = 'thank-you.html';
      } else {
        throw new Error('Formspree error');
      }
    } catch (err) {
      // foutmelding
      fstatus.innerHTML = '<span class="status-err">' + errorText + '</span>';
      fstatus.focus();
      if (btn) {
        btn.disabled = false;
        btn.textContent = submitText;
        btn.setAttribute('aria-busy', 'false');
      }
    }
  });
}

/* ── HERO DISCIPLINES UPDATE ────────────────────────────────────── */
function updateHeroDisciplines() {
  const discContainer = document.querySelector('.hero-disc');
  if (!discContainer || typeof t !== 'function') return;
  const disciplines = t('hero.disciplines');
  if (!Array.isArray(disciplines) || disciplines.length === 0) return;
  discContainer.innerHTML = '';
  disciplines.forEach((d, i) => {
    const span = document.createElement('span');
    span.className = 'hero-disc-item' + (i === 0 ? ' is-active' : '');
    span.textContent = d;
    discContainer.appendChild(span);
  });
  /* Restart cycle */
  const discItems = discContainer.querySelectorAll('.hero-disc-item');
  if (discItems.length > 1) {
    let discIdx = 0;
    setInterval(() => {
      discItems[discIdx].classList.remove('is-active');
      discIdx = (discIdx + 1) % discItems.length;
      discItems[discIdx].classList.add('is-active');
    }, 2200);
  }
}

/* ── INITIALIZATION ─────────────────────────────────────────────── */
function initAll() {
  buildProjects();
  buildArchive();
  buildPhotos();
  updateHeroDisciplines();
  requestAnimationFrame(initLb);
}

/* Run init after i18n is ready */
if (typeof initI18n === 'function') {
  initI18n();
  initAll();
} else {
  /* Fallback if translations.js not loaded yet */
  initAll();
}

/* Rebuild dynamic content on language change */
window.addEventListener('languageChanged', () => {
  buildProjects();
  buildArchive();
  updateHeroDisciplines();
  /* Re-init lightbox after rebuild */
  requestAnimationFrame(() => {
    initLb();
  });
});
