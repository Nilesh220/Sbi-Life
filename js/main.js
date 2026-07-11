/* ============================================================
   main.js — Global nav, scroll effects, shared utilities
   ============================================================ */

/* ── Navigation ───────────────────────────────────────────── */
(function initNav() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  // Scroll shrink with RequestAnimationFrame throttling to eliminate page lag
  let navScheduled = false;
  const onScroll = () => {
    if (navScheduled) return;
    navScheduled = true;
    requestAnimationFrame(() => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 60);
      navScheduled = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-menu-close');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('mobile-menu--open');
      document.body.style.overflow = 'hidden';
    });
    mobileClose?.addEventListener('click', closeMobileMenu);
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) closeMobileMenu();
    });
    function closeMobileMenu() {
      mobileMenu.classList.remove('mobile-menu--open');
      document.body.style.overflow = '';
    }
  }

  // Active link highlighting for regular and dropdown items
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .mobile-menu__link, .nav__dropdown-item').forEach(link => {
    if (link.getAttribute('href') === currentPage || link.getAttribute('href') === './' + currentPage) {
      if (link.classList.contains('nav__dropdown-item')) {
        link.classList.add('nav__dropdown-item--active');
        const parentToggle = link.closest('.nav__dropdown')?.querySelector('.nav__dropdown-toggle');
        if (parentToggle) {
          parentToggle.classList.add('nav__link--active');
        }
      } else {
        link.classList.add('nav__link--active');
      }
    }
  });
})();

/* ── Scroll progress bar ──────────────────────────────────── */
(function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  
  let progressScheduled = false;
  window.addEventListener('scroll', () => {
    if (progressScheduled) return;
    progressScheduled = true;
    requestAnimationFrame(() => {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      bar.style.width = Math.min(pct, 100) + '%';
      progressScheduled = false;
    });
  }, { passive: true });
})();

/* ── Intersection Observer reveal ─────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('reveal--visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
})();

/* ── Animated Number Counter ──────────────────────────────── */
function animateCounter(el, target, duration = 2000, suffix = '') {
  const start = performance.now();
  const startVal = 0;

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startVal + (target - startVal) * eased);
    el.textContent = formatNumber(current) + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = formatNumber(target) + suffix;
  }
  requestAnimationFrame(update);
}

function formatNumber(n) {
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'K';
  return n.toLocaleString('en-IN');
}

/* ── Init counters when visible ───────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.animated) {
        e.target.dataset.animated = '1';
        const target = parseInt(e.target.dataset.counter);
        const suffix = e.target.dataset.suffix || '';
        animateCounter(e.target, target, 2200, suffix);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}
document.addEventListener('DOMContentLoaded', initCounters);

/* ── Countdown timer ──────────────────────────────────────── */
function initCountdown(targetDateStr, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const targetDate = new Date(targetDateStr).getTime();

  function update() {
    const now = Date.now();
    const diff = targetDate - now;
    if (diff <= 0) {
      container.innerHTML = '<span style="color:var(--saffron);font-weight:700">Deadline Passed</span>';
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    container.innerHTML = `
      <div class="countdown-unit"><span class="countdown-number">${String(d).padStart(2,'0')}</span><span class="countdown-label">Days</span></div>
      <span class="countdown-sep">:</span>
      <div class="countdown-unit"><span class="countdown-number">${String(h).padStart(2,'0')}</span><span class="countdown-label">Hrs</span></div>
      <span class="countdown-sep">:</span>
      <div class="countdown-unit"><span class="countdown-number">${String(m).padStart(2,'0')}</span><span class="countdown-label">Min</span></div>
      <span class="countdown-sep">:</span>
      <div class="countdown-unit"><span class="countdown-number">${String(s).padStart(2,'0')}</span><span class="countdown-label">Sec</span></div>
    `;
  }
  update();
  setInterval(update, 1000);
}

/* ── FAQ accordion ────────────────────────────────────────── */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('faq-item--open');

      // Close all
      document.querySelectorAll('.faq-item--open').forEach(open => {
        open.classList.remove('faq-item--open');
        open.querySelector('.faq-answer').classList.remove('faq-answer--open');
      });

      if (!isOpen) {
        item.classList.add('faq-item--open');
        answer.classList.add('faq-answer--open');
      }
    });
  });
}
document.addEventListener('DOMContentLoaded', initFAQ);

/* ── Filter tabs ──────────────────────────────────────────── */
function initFilterTabs(containerSelector, onFilter) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      container.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('filter-tab--active'));
      tab.classList.add('filter-tab--active');
      onFilter(tab.dataset.filter);
    });
  });
}

/* ── Toast ────────────────────────────────────────────────── */
function showToast(message, type = 'success', duration = 3500) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `<span class="toast__icon">${icon}</span><span class="toast__text">${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(20px)'; toast.style.transition = 'all 0.3s'; setTimeout(() => toast.remove(), 300); }, duration);
}

/* ── Card tilt effect ─────────────────────────────────────── */
function initTiltCards() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
document.addEventListener('DOMContentLoaded', initTiltCards);

/* ── Particle canvas ──────────────────────────────────────── */
function initParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.3,
    vx: (Math.random() - 0.5) * 0.4,
    vy: -(Math.random() * 0.5 + 0.2),
    alpha: Math.random() * 0.5 + 0.1,
    color: Math.random() > 0.5 ? 'rgba(255,107,26,' : 'rgba(0,212,184,'
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.001;
      if (p.y < -5 || p.alpha <= 0) {
        p.x = Math.random() * canvas.width;
        p.y = canvas.height + 5;
        p.alpha = Math.random() * 0.5 + 0.1;
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ── Phase tracker auto-highlight ─────────────────────────── */
function renderPhaseTracker(containerId) {
  const container = document.getElementById(containerId);
  if (!container || !IdeationXData) return;

  const { phases, currentPhase } = IdeationXData.config;
  container.innerHTML = phases.map(phase => {
    let cls = '';
    if (phase.locked) cls = 'phase-step--locked';
    else if (phase.id < currentPhase) cls = 'phase-step--done';
    else if (phase.id === currentPhase) cls = 'phase-step--active';

    const dotContent = phase.id < currentPhase ? '✓' : phase.id;
    return `
      <div class="phase-step ${cls}">
        <div class="phase-dot">${dotContent}</div>
        <div class="phase-label">${phase.name}</div>
        <div class="phase-label" style="font-size:0.68rem;color:var(--text-muted);margin-top:2px">${phase.date}</div>
      </div>
    `;
  }).join('');
}

/* ── Progress bar animation ───────────────────────────────── */
function animateProgressBars() {
  document.querySelectorAll('.progress-bar__fill[data-progress]').forEach(bar => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          bar.style.width = bar.dataset.progress + '%';
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(bar);
  });
}
document.addEventListener('DOMContentLoaded', animateProgressBars);

/* ── Score ring SVG ───────────────────────────────────────── */
function renderScoreRing(containerId, score, maxScore = 1000) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const pct = score / maxScore;
  const circumference = 339.292;
  const offset = circumference * (1 - pct);

  el.innerHTML = `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stop-color="var(--saffron)"/>
          <stop offset="100%" stop-color="var(--teal)"/>
        </linearGradient>
      </defs>
      <circle class="score-ring__bg"   cx="60" cy="60" r="54"/>
      <circle class="score-ring__fill" cx="60" cy="60" r="54"
              stroke-dashoffset="${circumference}"
              style="stroke-dashoffset:${circumference};transition:stroke-dashoffset 1.2s cubic-bezier(0,0,0.2,1)"/>
    </svg>
    <div class="score-ring__label">
      <span class="score-ring__number text-gradient-saffron">${score}</span>
      <span class="score-ring__unit">XP</span>
    </div>
  `;

  // Animate after paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.querySelector('.score-ring__fill').style.strokeDashoffset = offset;
    });
  });
}

/* ── Marquee auto-duplicate ───────────────────────────────── */
function initMarquees() {
  document.querySelectorAll('.marquee-inner').forEach(inner => {
    inner.innerHTML += inner.innerHTML;
  });
}
document.addEventListener('DOMContentLoaded', initMarquees);

/* ── Generic render helpers ───────────────────────────────── */
function renderThemeTag(themeId) {
  const theme = IdeationXData?.themes?.find(t => t.id === themeId);
  if (!theme) return '';
  return `<span class="tag" style="background:rgba(${hexToRgb(theme.color)},0.12);color:${theme.color};border-color:rgba(${hexToRgb(theme.color)},0.3)">${theme.icon} ${theme.name}</span>`;
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

/* ── Expose globally ──────────────────────────────────────── */
window.IdeationX = {
  animateCounter,
  formatNumber,
  initCountdown,
  renderPhaseTracker,
  renderScoreRing,
  initFilterTabs,
  showToast,
  initParticles,
  renderThemeTag
};
