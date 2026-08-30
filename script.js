// ===========================================================
// eles — interacciones
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- navbar scroll state ---------- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 40) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- mobile menu ---------- */
  const burger = document.querySelector('.nav-burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      mobileMenu.classList.toggle('is-open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('is-open'));
    });
  }

  /* ---------- hero load-in ---------- */
  const hero = document.querySelector('.hero');
  if (hero) {
    requestAnimationFrame(() => {
      setTimeout(() => hero.classList.add('is-loaded'), 60);
    });
  }

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-in'));
  }

  /* ---------- collection filters ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const pieces = document.querySelectorAll('.catalog-grid .piece');
  if (filterBtns.length && pieces.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        pieces.forEach(p => {
          const match = cat === 'todos' || p.dataset.category === cat;
          p.dataset.hidden = match ? 'false' : 'true';
        });
      });
    });
  }

  /* ---------- product gallery thumbs ---------- */
  const thumbs = document.querySelectorAll('.product-thumb');
  const mainImg = document.querySelector('.product-gallery-main img');
  if (thumbs.length && mainImg) {
    thumbs.forEach(t => {
      t.addEventListener('click', () => {
        thumbs.forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        mainImg.src = t.dataset.full || t.querySelector('img').src;
      });
    });
  }

  /* ---------- accordion ---------- */
  document.querySelectorAll('.acc-item').forEach(item => {
    const head = item.querySelector('.acc-head');
    const body = item.querySelector('.acc-body');
    head.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.acc-body').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  /* ---------- contact form (demo only, no backend) ---------- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Mensaje enviado';
      form.reset();
      setTimeout(() => { btn.textContent = original; }, 2600);
    });
  }

});
