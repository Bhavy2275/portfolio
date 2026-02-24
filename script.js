/* ============================================
   PORTFOLIO SCRIPT — BHAVYA SONI
   ============================================ */

'use strict';

// === LOADER ===
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => { loader.style.display = 'none'; }, 600);
    }
    initHeroAnimations();
  }, 2000);
});

// === CUSTOM CURSOR ===
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

const smoothFollower = () => {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(smoothFollower);
};
smoothFollower();

// Cursor scale on hover
const hoverTargets = document.querySelectorAll('a, button, .project-card, .cert-item, .contact-card, .skill-pill');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    follower.style.width = '56px';
    follower.style.height = '56px';
    follower.style.borderColor = 'rgba(255,255,255,0.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.width = '36px';
    follower.style.height = '36px';
    follower.style.borderColor = 'rgba(255,255,255,0.3)';
  });
});

// === NAVIGATION ===
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  updateActiveNavLink();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
  });
});

// Active nav link tracking
const sections = document.querySelectorAll('section[id]');
function updateActiveNavLink() {
  const scrollY = window.scrollY;
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    const bottom = top + sec.offsetHeight;
    const id = sec.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
    if (navLink) {
      if (scrollY >= top && scrollY < bottom) {
        document.querySelectorAll('.nav-link').forEach(l => l.style.color = '');
        navLink.style.color = 'var(--pure-white)';
      }
    }
  });
}

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// === INTERSECTION OBSERVER — REVEAL ANIMATIONS ===
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger delay for siblings
      const siblings = entry.target.parentElement?.querySelectorAll('.reveal-up');
      if (siblings) {
        let delay = 0;
        siblings.forEach((sib, i) => {
          if (sib === entry.target) delay = i * 80;
        });
        entry.target.style.transitionDelay = delay + 'ms';
      }
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

// === HERO ANIMATIONS ===
function initHeroAnimations() {
  const heroEls = document.querySelectorAll('.hero .reveal-up, .hero .reveal-line');
  heroEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * 120);
  });
}

// === COUNTER ANIMATION ===
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

function animateCounter(el, target) {
  const duration = 1800;
  const startTime = performance.now();
  const easing = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easing(progress);
    el.textContent = Math.round(easedProgress * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

// === SKILL BAR ANIMATION ===
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const pills = entry.target.querySelectorAll('.skill-pill');
      pills.forEach((pill, i) => {
        const level = pill.dataset.level || '70';
        pill.style.setProperty('--fill', level + '%');
        pill.style.setProperty('--delay', (i * 0.1) + 's');
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));

// === PARALLAX GRID ===
const gridOverlay = document.querySelector('.grid-overlay');
window.addEventListener('mousemove', (e) => {
  if (!gridOverlay) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  gridOverlay.style.transform = `translate(${x}px, ${y}px)`;
});

// === TILT EFFECT ON PROJECT CARDS ===
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (e.clientX - rect.left - cx) / cx;
    const dy = (e.clientY - rect.top - cy) / cy;
    card.style.transform = `translateY(-6px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
    card.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'var(--transition-slow)';
  });
});

// === TYPEWRITER EFFECT FOR HERO ROLE ===
const heroRole = document.querySelector('.hero-role');
if (heroRole) {
  const roles = [
    'Full Stack Developer · ML Engineer · Cybersecurity',
    'MERN Stack Expert · NLP Engineer · CTF Hacker',
    'React Developer · Python Developer · Problem Solver'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let roleTimer;

  function typeRole() {
    const current = roles[roleIndex];
    if (isDeleting) {
      heroRole.innerHTML = formatRole(current.substring(0, charIndex - 1));
      charIndex--;
    } else {
      heroRole.innerHTML = formatRole(current.substring(0, charIndex + 1));
      charIndex++;
    }

    let speed = isDeleting ? 30 : 50;
    if (!isDeleting && charIndex === current.length) {
      speed = 2500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }
    roleTimer = setTimeout(typeRole, speed);
  }

  function formatRole(text) {
    return text.replace(/·/g, '<span class="divider">·</span>');
  }

  // Start typewriter after loader
  setTimeout(typeRole, 3000);
}

// === NOISE TEXTURE SUBTLE MOVEMENT ===
const noiseOverlay = document.querySelector('.noise-overlay');
if (noiseOverlay) {
  let noiseAngle = 0;
  const animateNoise = () => {
    noiseAngle += 0.005;
    const x = Math.sin(noiseAngle) * 10;
    const y = Math.cos(noiseAngle * 0.7) * 10;
    noiseOverlay.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
    requestAnimationFrame(animateNoise);
  };
  requestAnimationFrame(animateNoise);
}

// === SCROLL PROGRESS INDICATOR ===
const scrollBar = document.createElement('div');
scrollBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: rgba(255,255,255,0.4);
  z-index: 9999;
  width: 0%;
  transition: width 0.1s linear;
`;
document.body.appendChild(scrollBar);

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const max = document.body.scrollHeight - window.innerHeight;
  const progress = (scrolled / max) * 100;
  scrollBar.style.width = progress + '%';
});

// === PREVENT CURSOR FLICKER ON LOAD ===
document.addEventListener('DOMContentLoaded', () => {
  cursor.style.opacity = '0';
  follower.style.opacity = '0';
  setTimeout(() => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
    cursor.style.transition = 'opacity 0.3s ease, transform 0.2s ease';
    follower.style.transition = 'opacity 0.3s ease, width 0.3s ease, height 0.3s ease, border-color 0.3s ease';
  }, 2100);
});

// ============================================================
//  CURVED LOOP TEXT MARQUEE — SVG textPath scroll
// ============================================================
(function initCurvedLoop() {
  const textEl = document.querySelector('.cl-row1 textPath');
  if (!textEl) return;

  let offset = 0;
  const SPEED = 0.018;   // % per ms — tweak to go faster/slower
  let lastTime = null;
  let scrollBoost = 0;

  // Boost speed briefly when user scrolls
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const dy = Math.abs(window.scrollY - lastScrollY);
    scrollBoost = Math.min(dy * 0.003, 0.06);
    lastScrollY = window.scrollY;
  });

  function tick(now) {
    if (lastTime === null) lastTime = now;
    const dt = now - lastTime;
    lastTime = now;

    scrollBoost *= 0.92; // decay boost
    offset -= (SPEED + scrollBoost) * dt;
    if (offset <= -100) offset += 100; // seamless loop

    textEl.setAttribute('startOffset', offset.toFixed(3) + '%');
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();

// ============================================================
//  LIVE COURSERA CERTIFICATES — Dynamic Fetch & Render
// ============================================================

(function initCertificates() {

  const grid = document.getElementById('courses-grid');
  const filtersEl = document.getElementById('courses-filters');
  const emptyEl = document.getElementById('courses-empty');
  const updatedEl = document.getElementById('courses-updated');

  if (!grid) return;

  // Determine base path for certificates.json
  // Works both locally (file://) and when hosted
  const BASE = (() => {
    const scripts = document.querySelectorAll('script[src]');
    const self = [...scripts].find(s => s.src.includes('script.js'));
    if (self) {
      return self.src.replace('script.js', '');
    }
    return './';
  })();

  let allCerts = [];
  let activeFilter = 'all';

  // ── LOAD ──────────────────────────────────────────────────
  async function loadCertificates() {
    // PRIMARY: read from the inline data script (works file:// + hosted)
    if (window.CERTS_DATA) {
      const data = window.CERTS_DATA;
      allCerts = data.certificates || [];
      allCerts.sort((a, b) => new Date(b.date) - new Date(a.date));
      renderMetaBar(data.lastUpdated);
      buildFilters();
      renderCards('all');
      return;
    }

    // FALLBACK: try fetch (only works on http/https — e.g. GitHub Pages)
    try {
      const url = './certificates.json?v=' + Date.now();
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      allCerts = data.certificates || [];
      allCerts.sort((a, b) => new Date(b.date) - new Date(a.date));
      renderMetaBar(data.lastUpdated);
      buildFilters();
      renderCards('all');
    } catch (err) {
      console.warn('Certificates: data not available —', err.message);
      grid.innerHTML = '';
      if (emptyEl) emptyEl.style.display = 'block';
      if (updatedEl) updatedEl.textContent = 'Edit certificates-data.js to add certs';
    }
  }

  // ── META BAR ───────────────────────────────────────────────
  function renderMetaBar(lastUpdated) {
    if (!updatedEl) return;
    if (lastUpdated) {
      const d = new Date(lastUpdated);
      updatedEl.textContent = 'Updated ' + d.toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
      });
    } else {
      updatedEl.textContent = allCerts.length + ' certificate' + (allCerts.length !== 1 ? 's' : '');
    }
  }

  // ── FILTER TABS ────────────────────────────────────────────
  function buildFilters() {
    if (!filtersEl) return;
    // Collect unique platforms
    const platforms = [...new Set(allCerts.map(c => c.platform || 'Other'))];
    filtersEl.innerHTML = '';

    const allBtn = makeFilterBtn('All', 'all', true);
    filtersEl.appendChild(allBtn);

    platforms.forEach(p => {
      filtersEl.appendChild(makeFilterBtn(p, p, false));
    });

    // Add hover cursor to new buttons
    filtersEl.querySelectorAll('.filter-btn').forEach(btn => attachCursor(btn));
  }

  function makeFilterBtn(label, value, isActive) {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (isActive ? ' active' : '');
    btn.dataset.filter = value;
    btn.textContent = label + (value !== 'all' ? ' (' + allCerts.filter(c => (c.platform || 'Other') === value).length + ')' : '');
    btn.addEventListener('click', () => {
      filtersEl.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = value;
      renderCards(value);
    });
    return btn;
  }

  // ── RENDER CARDS ──────────────────────────────────────────
  function renderCards(filter) {
    if (!grid) return;

    const filtered = filter === 'all'
      ? allCerts
      : allCerts.filter(c => (c.platform || 'Other') === filter);

    if (filtered.length === 0) {
      grid.innerHTML = '';
      emptyEl.style.display = 'block';
      return;
    }

    emptyEl.style.display = 'none';
    grid.innerHTML = '';

    filtered.forEach((cert, i) => {
      const card = buildCard(cert, i);
      grid.appendChild(card);
      // Re-observe for reveal animation
      revealObserver.observe(card);
      // Cursor hover
      attachCursor(card);
    });
  }

  // ── BUILD A SINGLE CARD ────────────────────────────────────
  function buildCard(cert, index) {
    const isNew = isRecentCert(cert.date, 30);
    const hasLink = cert.credentialUrl && cert.credentialUrl.trim() !== '';

    const card = document.createElement('div');
    card.className = 'course-card reveal-up';
    card.style.animationDelay = (index * 60) + 'ms';

    // NEW badge
    const newBadge = isNew
      ? `<span class="course-new-badge">NEW</span>`
      : '';

    // Platform logo (inline SVG for Coursera, fallback text)
    const platformLogo = getPlatformLogo(cert.platform);

    // Skills
    const skillsHtml = (cert.skills || [])
      .slice(0, 4)
      .map(s => `<span class="course-skill">${escHtml(s)}</span>`)
      .join('');

    // Date
    const dateStr = cert.date
      ? new Date(cert.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
      : '';

    // Verify link
    const verifyHtml = hasLink
      ? `<a href="${cert.credentialUrl}" target="_blank" rel="noopener" class="course-verify-link">
           <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
             <path d="M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V7M8 1h3m0 0v3m0-3L5 6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>
           Verify
         </a>`
      : `<span class="course-no-link">No link yet</span>`;

    card.innerHTML = `
      ${newBadge}
      <div class="course-platform-row">
        ${platformLogo}
        <span class="course-platform-name">${escHtml(cert.platform || 'Online')}</span>
      </div>
      <h3 class="course-title">${escHtml(cert.title)}</h3>
      <p class="course-issuer">${escHtml(cert.issuer || '')}</p>
      <div class="course-skills">${skillsHtml}</div>
      <div class="course-footer">
        <span class="course-date">${dateStr}</span>
        ${verifyHtml}
      </div>
    `;

    // Prevent smooth-scroll on verify link clicks
    const verifyLink = card.querySelector('.course-verify-link');
    if (verifyLink) {
      verifyLink.addEventListener('click', e => e.stopPropagation());
    }

    return card;
  }

  // ── HELPERS ────────────────────────────────────────────────

  function isRecentCert(dateStr, days) {
    if (!dateStr) return false;
    const cert = new Date(dateStr);
    const now = new Date();
    return (now - cert) / (1000 * 60 * 60 * 24) <= days;
  }

  function escHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getPlatformLogo(platform) {
    const p = (platform || '').toLowerCase();
    if (p.includes('coursera')) {
      // Coursera "C" logo in their brand blue
      return `<svg class="course-platform-logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#0056D2"/>
        <path d="M12 6a6 6 0 100 12A6 6 0 0012 6zm0 9.6a3.6 3.6 0 110-7.2 3.6 3.6 0 010 7.2z" fill="white"/>
        <path d="M15.6 12a3.6 3.6 0 01-3.6 3.6v2.4A6 6 0 0018 12h-2.4z" fill="#F5A623"/>
      </svg>`;
    }
    if (p.includes('udemy')) {
      return `<svg class="course-platform-logo" viewBox="0 0 24 24" fill="#A435F0" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#A435F0"/>
        <text x="5" y="17" font-size="13" fill="white" font-weight="bold" font-family="sans-serif">U</text>
      </svg>`;
    }
    // Generic fallback
    return `<svg class="course-platform-logo" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#333"/>
      <text x="6" y="17" font-size="12" fill="#aaa" font-family="monospace">📜</text>
    </svg>`;
  }

  // Attach cursor effect to dynamically added elements
  function attachCursor(el) {
    el.addEventListener('mouseenter', () => {
      if (!cursor) return;
      cursor.style.transform = 'translate(-50%, -50%) scale(2)';
      follower.style.width = '56px';
      follower.style.height = '56px';
      follower.style.borderColor = 'rgba(255,255,255,0.5)';
    });
    el.addEventListener('mouseleave', () => {
      if (!cursor) return;
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.width = '36px';
      follower.style.height = '36px';
      follower.style.borderColor = 'rgba(255,255,255,0.3)';
    });
  }

  // ── KICK OFF ───────────────────────────────────────────────
  loadCertificates();

})();
