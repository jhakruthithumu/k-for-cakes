/* ============================================
   K for Cakes — Premium JavaScript
============================================ */
(function () {
  'use strict';

  /* ── Scroll Progress Bar ── */
  const progressBar = document.getElementById('progress-bar');
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  /* ── Sticky Nav ── */
  const navbar = document.getElementById('navbar');
  function handleNav() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }

  /* ── Floating WA Button ── */
  const fabWa = document.getElementById('fabWa');
  function handleFab() {
    fabWa.classList.toggle('visible', window.scrollY > window.innerHeight * 0.5);
  }

  window.addEventListener('scroll', () => {
    updateProgress();
    handleNav();
    handleFab();
  }, { passive: true });

  handleNav();
  handleFab();
  updateProgress();

  /* ── Mobile Menu ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ── Smooth Scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── Particle Confetti in Hero ── */
  const particleContainer = document.getElementById('particles');
  if (particleContainer) {
    const colors = [
      '#C9963E', '#E4B86A', '#7B1530', '#F5C6D0',
      '#fff',    '#FBBFD2', '#A8D8EA', '#F9E4B7'
    ];
    const sizes  = [4, 5, 6, 7, 8, 10];
    const COUNT  = 28;

    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement('span');
      p.className = 'particle';
      const size  = sizes[Math.floor(Math.random() * sizes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      p.style.cssText = [
        `width:${size}px`,
        `height:${size}px`,
        `background:${color}`,
        `left:${Math.random() * 100}%`,
        `--dur:${7 + Math.random() * 8}s`,
        `--delay:${Math.random() * 6}s`,
        `opacity:0`
      ].join(';');
      particleContainer.appendChild(p);
    }
  }

  /* ── Intersection Observer: Scroll Reveal ── */
  const revealEls = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right'
  );

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── Counter Animation ── */
  const counters = document.querySelectorAll('.counter');

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const dur    = 1800;
      const start  = performance.now();

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / dur, 1);
        // Ease out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(ease * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString();
      }

      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  /* ── Gallery: Hover label on touch devices ── */
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const caption = item.querySelector('.gallery-caption');
      if (!caption) return;
      const isVisible = caption.style.opacity === '1';
      caption.style.opacity = isVisible ? '' : '1';
      caption.style.transform = isVisible ? '' : 'translateY(0)';
    });
  });

  /* ── Ticker pause on hover ── */
  const tickerTrack = document.querySelector('.ticker-track');
  if (tickerTrack) {
    const strip = document.querySelector('.ticker-strip');
    strip.addEventListener('mouseenter', () => {
      tickerTrack.style.animationPlayState = 'paused';
    });
    strip.addEventListener('mouseleave', () => {
      tickerTrack.style.animationPlayState = 'running';
    });
  }

})();
