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
//  SILK BACKGROUND — WebGL fragment shader (contact section)
// ============================================================
(function initSilk() {
  const canvas = document.getElementById('silkCanvas');
  if (!canvas) return;

  const gl = canvas.getContext('webgl', { antialias: true, alpha: true });
  if (!gl) { canvas.style.display = 'none'; return; }

  const VS = `
    attribute vec2 a_pos;
    void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
  `;

  const FS = `
    precision mediump float;
    uniform vec2  u_res;
    uniform float u_time;

    vec2 hash2(vec2 p) {
      p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
      return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(dot(hash2(i + vec2(0,0)), f - vec2(0,0)),
            dot(hash2(i + vec2(1,0)), f - vec2(1,0)), u.x),
        mix(dot(hash2(i + vec2(0,1)), f - vec2(0,1)),
            dot(hash2(i + vec2(1,1)), f - vec2(1,1)), u.x),
        u.y);
    }

    float silk(vec2 uv, float t) {
      float n = 0.0;
      float amp   = 0.52;
      float freq  = 2.0;
      vec2  flow  = vec2(t * 0.12, t * 0.08);

      for (int i = 0; i < 5; i++) {
        vec2 q = uv * freq + flow;
        vec2 r = vec2(
          noise(q + vec2(0.0, t * 0.05)),
          noise(q + vec2(5.2, t * 0.04))
        );
        n   += amp * noise(q + 2.0 * r);
        uv  += 0.15 * vec2(cos(t * 0.06 + uv.y), sin(t * 0.05 + uv.x));
        freq *= 2.0;
        amp  *= 0.5;
        flow *= 1.2;
      }
      return n;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_res.xy;
      uv.x *= u_res.x / u_res.y;

      float t = u_time * 0.5;
      float n = silk(uv, t);
      n = n * 0.5 + 0.5;

      vec3 colA = vec3(0.08, 0.04, 0.25);
      vec3 colB = vec3(0.35, 0.10, 0.60);
      vec3 colC = vec3(0.65, 0.15, 0.55);
      vec3 colD = vec3(0.12, 0.06, 0.35);

      vec3 col = mix(colA, colB, smoothstep(0.0, 0.4, n));
      col = mix(col, colC, smoothstep(0.35, 0.70, n));
      col = mix(col, colD, smoothstep(0.65, 1.0, n));

      vec2 vig = uv - vec2(u_res.x / u_res.y * 0.5, 0.5);
      float vignette = 1.0 - 0.55 * dot(vig, vig);
      col *= vignette;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, 'u_res');
  const uTime = gl.getUniformLocation(prog, 'u_time');

  function resize() {
    const section = canvas.parentElement;
    const W = section.offsetWidth;
    const H = section.offsetHeight;
    canvas.width = W;
    canvas.height = H;
    gl.viewport(0, 0, W, H);
    gl.uniform2f(uRes, W, H);
  }
  resize();
  window.addEventListener('resize', resize);

  let running = false;
  let startTime = null;
  let rafId = null;

  function render(now) {
    if (!startTime) startTime = now;
    gl.uniform1f(uTime, (now - startTime) * 0.001);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (running) rafId = requestAnimationFrame(render);
  }

  const observer = new IntersectionObserver(entries => {
    const visible = entries[0].isIntersecting;
    if (visible && !running) {
      running = true;
      rafId = requestAnimationFrame(render);
    } else if (!visible && running) {
      running = false;
      cancelAnimationFrame(rafId);
    }
  }, { threshold: 0.01 });

  observer.observe(canvas.parentElement);
})();

// ============================================================
//  CURVED LOOP TEXT MARQUEE — SVG textPath scroll
// ============================================================
(function initCurvedLoop() {
  const textEl = document.querySelector('.cl-row1 textPath');
  if (!textEl) return;

  let offset = 0;
  const SPEED = 0.012;   // % per ms — smoother pace
  let lastTime = null;
  let scrollBoost = 0;

  // Boost speed briefly when user scrolls
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const dy = Math.abs(window.scrollY - lastScrollY);
    scrollBoost = Math.min(dy * 0.002, 0.04); // gentler boost
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

// ============================================================
//  CONTACT FORM HANDLING — Basic Validation & Messaging
// ============================================================
(function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const btn = document.getElementById('contact-btn');

  if (!form || !status || !btn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Visual feedback
    const originalBtnContent = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span>Sending...</span>';
    status.textContent = '';
    status.className = '';

    // Collect data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Basic local simulation (since there's no backend)
    // In a real scenario, you'd fetch() to an API endpoint
    setTimeout(() => {
      // Simulate success
      status.textContent = 'Message sent successfully! I will get back to you soon.';
      status.className = 'success';
      form.reset();

      // Reset button
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalBtnContent;
      }, 2000);
    }, 1500);

    // If you want to use a real service like Formspree, you could do:
    /*
    try {
      const response = await fetch('https://formspree.io/f/your-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) { ... success ... }
      else { throw new Error(); }
    } catch (err) { ... error ... }
    */
  });
})();

// ============================================================
//  SILK BACKGROUND — Vanilla WebGL port of reactbits.dev/Silk
// ============================================================
(function initSilk() {
  const canvas = document.getElementById('silkCanvas');
  if (!canvas) return;

  const gl = canvas.getContext('webgl', { antialias: true, alpha: true });
  if (!gl) { canvas.style.display = 'none'; return; }

  // ── CONFIG (matches reactbits defaults) ─────────────────────
  const SPEED = 5;
  const SCALE = 1;
  const COLOR = [0.482, 0.455, 0.506]; // #7B7481
  const NOISE_INTENSITY = 1.5;
  const ROTATION = 0;

  // ── SHADERS ─────────────────────────────────────────────────
  const VERT = `
    attribute vec2 a_position;
    varying   vec2 vUv;
    void main(){
      vUv = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }`;

  const FRAG = `
    precision highp float;
    varying vec2 vUv;

    uniform float uTime;
    uniform vec3  uColor;
    uniform float uSpeed;
    uniform float uScale;
    uniform float uRotation;
    uniform float uNoiseIntensity;

    const float e = 2.71828182845904523536;

    float noise(vec2 texCoord){
      float G = e;
      vec2  r = (G * sin(G * texCoord));
      return fract(r.x * r.y * (1.0 + texCoord.x));
    }

    vec2 rotateUvs(vec2 uv, float angle){
      float c = cos(angle);
      float s = sin(angle);
      mat2  rot = mat2(c, -s, s, c);
      return rot * uv;
    }

    void main(){
      float rnd     = noise(gl_FragCoord.xy);
      vec2  uv      = rotateUvs(vUv * uScale, uRotation);
      vec2  tex     = uv * uScale;
      float tOffset = uSpeed * uTime;

      tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

      float pattern = 0.6 +
                      0.4 * sin(5.0 * (tex.x + tex.y +
                                       cos(3.0 * tex.x + 5.0 * tex.y) +
                                       0.02 * tOffset) +
                               sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

      vec4 col  = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
      col.a = 1.0;
      gl_FragColor = col;
    }`;

  // ── HELPERS ─────────────────────────────────────────────────
  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error('Silk shader error:', gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  }

  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return;

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('Silk link error:', gl.getProgramInfoLog(prog));
    return;
  }
  gl.useProgram(prog);

  // ── FULL-SCREEN QUAD ────────────────────────────────────────
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1, 1, -1, -1, 1,
    -1, 1, 1, -1, 1, 1
  ]), gl.STATIC_DRAW);

  const aPos = gl.getAttribLocation(prog, 'a_position');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  // ── UNIFORMS ────────────────────────────────────────────────
  const uTime = gl.getUniformLocation(prog, 'uTime');
  const uColor = gl.getUniformLocation(prog, 'uColor');
  const uSpeed = gl.getUniformLocation(prog, 'uSpeed');
  const uScale = gl.getUniformLocation(prog, 'uScale');
  const uRotation = gl.getUniformLocation(prog, 'uRotation');
  const uNoiseIntensity = gl.getUniformLocation(prog, 'uNoiseIntensity');

  gl.uniform3fv(uColor, COLOR);
  gl.uniform1f(uSpeed, SPEED);
  gl.uniform1f(uScale, SCALE);
  gl.uniform1f(uRotation, ROTATION);
  gl.uniform1f(uNoiseIntensity, NOISE_INTENSITY);

  // ── RESIZE ──────────────────────────────────────────────────
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth * dpr;
    const h = canvas.clientHeight * dpr;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
  }
  window.addEventListener('resize', resize);
  resize();

  // ── RENDER LOOP ─────────────────────────────────────────────
  let time = 0;
  let running = false;
  let rafId;

  function render(now) {
    rafId = requestAnimationFrame(render);
    const delta = 1 / 60;            // fixed step ≈ 60 fps
    time += 0.1 * delta;
    resize();
    gl.uniform1f(uTime, time);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  // ── VISIBILITY GATE (perf) ──────────────────────────────────
  const observer = new IntersectionObserver(entries => {
    const visible = entries[0].isIntersecting;
    if (visible && !running) { running = true; rafId = requestAnimationFrame(render); }
    if (!visible && running) { running = false; cancelAnimationFrame(rafId); }
  }, { threshold: 0.01 });

  observer.observe(canvas.parentElement);
})();

// ============================================================
//  3D HERO — Procedural Wireframe Icosahedron + Particles
// ============================================================
(function initHero3D() {
  if (typeof THREE === 'undefined') return;

  const container = document.getElementById('hero3d');
  if (!container) return;

  // ── SCENE SETUP ──────────────────────────────────────────────
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // ── GROUP ────────────────────────────────────────────────────
  const group = new THREE.Group();
  scene.add(group);

  // ── WIREFRAME ICOSAHEDRON (outer) ────────────────────────────
  const icoGeo = new THREE.IcosahedronGeometry(1.4, 1);
  const icoMat = new THREE.MeshBasicMaterial({
    color: 0xffffff, wireframe: true, transparent: true, opacity: 0.15
  });
  group.add(new THREE.Mesh(icoGeo, icoMat));

  // ── INNER ICOSAHEDRON ────────────────────────────────────────
  const innerGeo = new THREE.IcosahedronGeometry(0.9, 1);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0xffffff, wireframe: true, transparent: true, opacity: 0.08
  });
  const inner = new THREE.Mesh(innerGeo, innerMat);
  group.add(inner);

  // ── EDGE HIGHLIGHTS ──────────────────────────────────────────
  const edgeGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.4, 1));
  const edgeMat = new THREE.LineBasicMaterial({
    color: 0xffffff, transparent: true, opacity: 0.25
  });
  group.add(new THREE.LineSegments(edgeGeo, edgeMat));

  // ── PARTICLES ────────────────────────────────────────────────
  const PCOUNT = 200;
  const positions = new Float32Array(PCOUNT * 3);
  const velos = [];

  for (let i = 0; i < PCOUNT; i++) {
    const r = 1.8 + Math.random() * 1.2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    velos.push({ speed: 0.001 + Math.random() * 0.003, axis: Math.random() > 0.5 ? 'y' : 'x' });
  }

  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({
    color: 0xffffff, size: 0.02, transparent: true, opacity: 0.5, sizeAttenuation: true
  });
  group.add(new THREE.Points(pGeo, pMat));

  // ── CONNECTING LINES ─────────────────────────────────────────
  const lp = [];
  for (let i = 0; i < 30; i++) {
    const a = Math.floor(Math.random() * PCOUNT) * 3;
    const b = Math.floor(Math.random() * PCOUNT) * 3;
    lp.push(positions[a], positions[a + 1], positions[a + 2], positions[b], positions[b + 1], positions[b + 2]);
  }
  const lGeo = new THREE.BufferGeometry();
  lGeo.setAttribute('position', new THREE.Float32BufferAttribute(lp, 3));
  group.add(new THREE.LineSegments(lGeo, new THREE.LineBasicMaterial({
    color: 0xffffff, transparent: true, opacity: 0.04
  })));

  // ── MOUSE PARALLAX ───────────────────────────────────────────
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  document.addEventListener('mousemove', e => {
    mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ── RESIZE ───────────────────────────────────────────────────
  function onResize() {
    const w = container.clientWidth, h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);

  // ── ANIMATE ──────────────────────────────────────────────────
  let running = false, rafId;

  function animate() {
    rafId = requestAnimationFrame(animate);

    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;

    group.rotation.y += 0.003;
    group.rotation.x += 0.001;
    inner.rotation.y -= 0.002;
    inner.rotation.z += 0.001;
    group.rotation.x += mouse.y * 0.003;
    group.rotation.y += mouse.x * 0.003;

    // Orbital particle drift
    const pos = pGeo.attributes.position.array;
    for (let i = 0; i < PCOUNT; i++) {
      const v = velos[i], idx = i * 3;
      const x = pos[idx], y = pos[idx + 1], z = pos[idx + 2];
      const c = Math.cos(v.speed), s = Math.sin(v.speed);
      if (v.axis === 'y') { pos[idx] = x * c - z * s; pos[idx + 2] = x * s + z * c; }
      else { pos[idx + 1] = y * c - z * s; pos[idx + 2] = y * s + z * c; }
    }
    pGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  // ── VISIBILITY GATE ──────────────────────────────────────────
  const obs = new IntersectionObserver(entries => {
    const v = entries[0].isIntersecting;
    if (v && !running) { running = true; rafId = requestAnimationFrame(animate); }
    if (!v && running) { running = false; cancelAnimationFrame(rafId); }
  }, { threshold: 0.01 });
  obs.observe(container.parentElement);
})();
