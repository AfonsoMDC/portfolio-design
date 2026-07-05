/* Afonso Matos da Cruz · project.js */
'use strict';

document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

/* ── READY (no loader) ──────────────────────────────────────────── */
document.body.classList.add('is-ready');

/* ── SCROLL + NAV HIDE/SHOW ─────────────────────────────────────── */
const progress = document.getElementById('progress');
const nav = document.getElementById('nav');
let lastScrollY = 0;
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const h = document.documentElement;
      if (progress) progress.style.width = (scrollY / (h.scrollHeight - h.clientHeight) * 100) + '%';
      if (nav) {
        nav.classList.toggle('is-solid', scrollY > 50);
        if (scrollY > 120) {
          if (scrollY > lastScrollY + 8)  nav.classList.add('is-hidden');
          else if (scrollY < lastScrollY - 4) nav.classList.remove('is-hidden');
        } else {
          nav.classList.remove('is-hidden');
        }
      }
      lastScrollY = scrollY;
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

/* ── HAMBURGER ──────────────────────────────────────────────────── */
const hbg = document.getElementById('hbg');
const mob = document.getElementById('mobile-menu');
const closeMenu = () => {
  hbg?.classList.remove('open');
  mob?.classList.remove('open');
  hbg?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
};
hbg?.addEventListener('click', () => {
  const o = hbg.classList.toggle('open');
  mob?.classList.toggle('open', o);
  hbg.setAttribute('aria-expanded', String(o));
  document.body.style.overflow = o ? 'hidden' : '';
});
mob?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

/* ── SCROLL REVEALS ─────────────────────────────────────────────── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('show');
    revObs.unobserve(e.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.fu, .cr').forEach(el => revObs.observe(el));

/* ── SLIDESHOW ──────────────────────────────────────────────────── */
document.querySelectorAll('.slideshow').forEach(ss => {
  const slides = ss.querySelectorAll('.slide');
  const dots   = ss.querySelectorAll('.slide-dot');
  const count  = ss.querySelector('.slide-count');
  let current  = 0;
  const go = n => {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
    if (count) count.textContent =
      String(current + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
  };
  ss.querySelector('.slide-btn-p')?.addEventListener('click', () => go(current - 1));
  ss.querySelector('.slide-btn-n')?.addEventListener('click', () => go(current + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
});

/* ── LIGHTBOX ────────────────────────────────────────────────────── */
const lb    = document.getElementById('lightbox');
const lbImg = lb?.querySelector('.lb-img');
const lbCap = lb?.querySelector('.lb-cap');
let lbAll = [], lbIdx = 0;

function buildLb() {
  const els = document.querySelectorAll('[data-lightbox]');
  lbAll = Array.from(els).map(e => ({ src: e.src, alt: e.alt }));
  els.forEach((el, i) => {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => lbOpen(i));
  });
}
const lbOpen = i => {
  if (!lb || !lbImg) return;
  lbIdx = i;
  lbImg.src = lbAll[i].src;
  lbImg.alt = lbAll[i].alt;
  if (lbCap) lbCap.textContent = lbAll[i].alt;
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
      lbImg.style.opacity = '1';
    }, 160);
  }
};
if (lb) {
  if (lbImg) lbImg.style.transition = 'opacity .16s';
  lb.querySelector('.lb-close')?.addEventListener('click', lbClose);
  lb.querySelector('.lb-prev')?.addEventListener('click', () => lbNav(-1));
  lb.querySelector('.lb-next')?.addEventListener('click', () => lbNav(1));
  lb.addEventListener('click', e => { if (e.target === lb) lbClose(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     lbClose();
    if (e.key === 'ArrowLeft')  lbNav(-1);
    if (e.key === 'ArrowRight') lbNav(1);
  });
}
buildLb();
