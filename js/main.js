/* ============================================================
   SEUI PARK — Portfolio JS
   ============================================================ */

(function () {
  'use strict';

  // ── Project data ─────────────────────────────────────────
  const PROJECTS = [
    {
      num: '01',
      titleEn: 'Monimo App Card',
      titleKo: '모니모 앱카드',
      client: 'Samsung Financial Group',
      category: 'Fintech · Mobile UI',
      descEn: 'App card registration and main screen design for Samsung\'s integrated financial super-app.',
      descKo: '삼성금융네트웍스 통합 금융 슈퍼앱의 앱카드 등록 플로우 및 메인 화면 설계.',
      stat: '490K MAU ↑ · 85% positive response',
      img: 'images/monimo.jpg',
      url: 'project/monimo.html',
    },
    {
      num: '02',
      titleEn: 'Nuldam E-Commerce UX',
      titleKo: '널담 이커머스 UX',
      client: 'Join & Join',
      category: 'E-Commerce · Mobile',
      descEn: 'Information architecture and UI redesign for a vegan food e-commerce platform.',
      descKo: '비건·건강식품 이커머스 플랫폼의 정보구조 재설계 및 UI 개선.',
      stat: '25% cart abandon ↓ · 4% conversion ↑',
      img: 'images/nuldam.jpg',
      url: 'project/nuldam.html',
    },
    {
      num: '03',
      titleEn: 'UX Guideline Asset System',
      titleKo: 'UX 가이드라인 에셋 시스템',
      client: 'Hyundai Motor Company',
      category: 'Design System',
      descEn: 'Modular asset package and style guide system that cut documentation time by 66%.',
      descKo: '모듈형 에셋 패키지 및 스타일 가이드 시스템 구축으로 문서 작성 시간 66% 단축.',
      stat: '66% faster documentation',
      img: 'images/ux-guideline.jpg',
      url: 'project/ux-guideline.html',
    },
    {
      num: '04',
      titleEn: 'Slim Display HUD Concept',
      titleKo: '슬림 디스플레이 HUD 컨셉',
      client: 'Hyundai Motor Company',
      category: 'Automotive · HUD',
      descEn: 'Next-generation head-up display concept — minimal screen space, maximum clarity.',
      descKo: '차세대 헤드업 디스플레이 UI 컨셉 — 최소 화면 공간, 최대 정보 명확성 탐구.',
      stat: 'Concept selected ✓',
      img: 'images/slim-display.jpg',
      url: 'project/slim-display.html',
    },
    {
      num: '05',
      titleEn: 'Optical Display Concept',
      titleKo: '옵티컬 디스플레이 컨셉',
      client: 'LG Electronics',
      category: 'Automotive · R&D',
      descEn: 'CID and triple-display concept for automotive exhibition — research to GUI design.',
      descKo: '차량용 전시를 위한 CID 및 트리플 디스플레이 컨셉 — 리서치부터 GUI 설계까지.',
      stat: 'CID concept adopted ✓',
      img: 'images/lg-optical.jpg',
      url: 'project/lg-optical.html',
    },
    {
      num: '06',
      titleEn: 'Mohey Meeting Platform',
      titleKo: '모헤이 모임 플랫폼',
      client: 'Wiracle (Co-founder)',
      category: 'Platform · Startup',
      descEn: 'End-to-end product and brand design for a student networking startup.',
      descKo: '학생 네트워킹 스타트업의 프로덕트 및 브랜드 디자인 전체.',
      stat: '4,000 users · 200+ meetups',
      img: null,
      placeholder: 'Mohey\nPlatform',
      url: 'project/mohey.html',
    },
    {
      num: '07',
      titleEn: 'CCNC IVI GUI Resources',
      titleKo: 'CCNC IVI GUI 리소스',
      client: 'Hyundai Motor Company',
      category: 'Automotive · IVI',
      descEn: 'GUI resource production and design guide for next-generation in-vehicle infotainment.',
      descKo: '차세대 커넥티드카 내비게이션 센터 인포테인먼트 시스템 GUI 리소스 및 가이드 제작.',
      stat: '×2 follow-up contracts',
      img: null,
      placeholder: 'Hyundai\nCCNC IVI',
      url: 'project/ccnc.html',
    },
  ];

    // ── Splash screen ────────────────────────────────────────
  // ── Hero wave canvas ──────────────────────────────────────
  let heroWaveRafId = null;
  (function () {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    if (sessionStorage.getItem('sp-visited')) return;
    const ctx = canvas.getContext('2d');
    let width, height, imageData, data;
    const SCALE = 5;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      width  = Math.floor(canvas.width  / SCALE);
      height = Math.floor(canvas.height / SCALE);
      imageData = ctx.createImageData(width, height);
      data = imageData.data;
    };
    window.addEventListener('resize', resize);
    resize();

    const SIN_TABLE = new Float32Array(1024);
    const COS_TABLE = new Float32Array(1024);
    for (let i = 0; i < 1024; i++) {
      const a = (i / 1024) * Math.PI * 2;
      SIN_TABLE[i] = Math.sin(a);
      COS_TABLE[i] = Math.cos(a);
    }
    const tbl = (x, T) => {
      let n = x % (Math.PI * 2);
      if (n < 0) n += Math.PI * 2;
      return T[Math.floor((n / (Math.PI * 2)) * 1024) & 1023];
    };
    const fSin = x => tbl(x, SIN_TABLE);
    const fCos = x => tbl(x, COS_TABLE);

    const startTime = Date.now();
    const FRAME_MS = 1000 / 30;
    let lastFrame = 0;
    const render = (ts) => {
      heroWaveRafId = requestAnimationFrame(render);
      if (ts - lastFrame < FRAME_MS) return;
      lastFrame = ts;
      const t = (Date.now() - startTime) * 0.001;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const ux = (2 * x - width)  / height;
          const uy = (2 * y - height) / height;
          let a = 0, d = 0;
          for (let i = 0; i < 3; i++) {
            a += fCos(i - d + t * 0.5 - a * ux);
            d += fSin(i * uy + a);
          }
          const wave      = (fSin(a) + fCos(d)) * 0.5;
          const intensity = 0.05 + 0.13 * wave;
          const shift     = fSin(a * 1.3 + t * 0.15);
          const drift     = fCos(d * 0.8 + t * 0.1);
          const twist     = fSin(d * 1.1 - a * 0.7 + t * 0.08);
          // neon green + teal + blue mix
          const r = Math.max(0, Math.min(1, (0.45 + shift * 0.08 - twist * 0.15) * intensity));
          const g = Math.max(0, Math.min(1, (0.85 + shift * 0.08 - twist * 0.05) * intensity));
          const b = Math.max(0, Math.min(1, (0.22 + drift * 0.35 + twist * 0.6) * intensity));
          const idx = (y * width + x) * 4;
          data[idx]     = r * 255;
          data[idx + 1] = g * 255;
          data[idx + 2] = b * 255;
          data[idx + 3] = 255;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'low';
      ctx.drawImage(canvas, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
    };
    heroWaveRafId = requestAnimationFrame(render);
  })();

  const splash      = document.getElementById('splash');
  const splashEnter = document.getElementById('splash-enter');

  if (sessionStorage.getItem('sp-visited')) {
    splash.style.display = 'none';
  } else {
    let dismissed = false;

    function dismissSplash() {
      if (dismissed) return;
      dismissed = true;
      onSplash = false;
      hoverThumb.classList.remove('visible');
      sessionStorage.setItem('sp-visited', '1');
      splash.classList.add('hidden');
      if (heroWaveRafId) cancelAnimationFrame(heroWaveRafId);
      const blockScroll = e => e.preventDefault();
      document.addEventListener('wheel', blockScroll, { passive: false });
      setTimeout(() => {
        splash.style.display = 'none';
        document.removeEventListener('wheel', blockScroll);
        setTimeout(initAboutAnimations, 80);
      }, 600);
    }

    // Line mask reveal
    const lines = Array.from(document.querySelectorAll('.st-line'));
    const sub   = document.querySelector('.st-sub');
    const T = 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)';

    lines.forEach((line, i) => {
      setTimeout(() => {
        line.style.transition = T;
        line.style.transform = 'translateY(0)';
      }, 300 + i * 180);
    });

    setTimeout(() => {
      sub.style.transition = 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
      sub.style.transform = 'translateY(0)';
    }, 300 + lines.length * 180 + 80);

    setTimeout(() => {
      splashEnter.style.transition = 'opacity 0.8s ease';
      splashEnter.style.opacity = '1';
    }, 300 + lines.length * 180 + 500);

    splashEnter.addEventListener('click', e => { e.stopPropagation(); dismissSplash(); });
    splash.addEventListener('click', dismissSplash);
    window.addEventListener('wheel', e => { if (!dismissed) dismissSplash(); }, { passive: true, once: true });
    window.addEventListener('touchmove', e => { if (!dismissed) dismissSplash(); }, { passive: true, once: true });
    document.addEventListener('keydown', e => {
      if (dismissed) return;
      if (e.key === 'Enter' || e.key === 'Escape') dismissSplash();
    });
  }

  // ── Project display ───────────────────────────────────────
  let activeIdx = -1;

  // ── Cursor thumbnail (desktop only) ──────────────────────
  const isTouchDevice = window.matchMedia('(hover: none)').matches;

  const THUMB_IMGS = [
    'images/monimo.jpg',
    'images/nuldam.jpg',
    'images/ux-guideline.jpg',
    'images/slim-display.jpg',
    'images/lg-optical.jpg',
    'images/Mohey.png',
    'images/20260259.png',
  ];

  const hoverThumb = document.createElement('div');
  hoverThumb.className = 'hover-thumb';
  const thumbImgs = THUMB_IMGS.map((src, i) => {
    const img = document.createElement('img');
    img.className = 'hover-thumb-img';
    img.src = src;
    img.dataset.idx = i;
    hoverThumb.appendChild(img);
    return img;
  });
  if (!isTouchDevice) document.body.appendChild(hoverThumb);

  let tx = 0, ty = 0, cx = 0, cy = 0;
  let lastMX = 0, lastMY = 0, distAccum = 0, thumbImgIdx = 0;
  let onSplash = !sessionStorage.getItem('sp-visited');

  function setThumbIdx(idx) {
    thumbImgs.forEach((img, i) => img.classList.toggle('active', i === idx));
    thumbImgIdx = idx;
  }

  if (!isTouchDevice) {
    (function animateThumb() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      hoverThumb.style.translate = `${cx}px ${cy}px`;
      requestAnimationFrame(animateThumb);
    })();

    document.addEventListener('mousemove', e => {
      tx = e.clientX + 24;
      ty = e.clientY - 100;

      if (!onSplash) return;

      const dx = e.clientX - lastMX;
      const dy = e.clientY - lastMY;
      lastMX = e.clientX; lastMY = e.clientY;
      distAccum += Math.sqrt(dx * dx + dy * dy);

      hoverThumb.classList.add('visible', 'instant');

      if (distAccum > 120) {
        distAccum = 0;
        let next;
        do { next = Math.floor(Math.random() * THUMB_IMGS.length); }
        while (next === thumbImgIdx && THUMB_IMGS.length > 1);
        setThumbIdx(next);
      }
    });
  }

  // ── Custom cursor (dot + lagging ring) ───────────────────
  if (!isTouchDevice) {
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    const cursorRing = document.createElement('div');
    cursorRing.className = 'cursor-ring';
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    const hasSplash = !!document.getElementById('splash');
    let cmx = 0, cmy = 0;
    let cdx = 0, cdy = 0;
    let crx = 0, cry = 0;
    let cursorShown = false;

    document.addEventListener('mousemove', e => {
      cmx = e.clientX;
      cmy = e.clientY;
      const canShow = !hasSplash || !onSplash;
      if (canShow && !cursorShown) {
        cursorShown = true;
        document.body.classList.add('cursor-active');
        cursorDot.classList.add('active');
        cursorRing.classList.add('active');
      }
    });

    document.addEventListener('mouseover', e => {
      const hit = e.target.closest('a, button, [role="button"], input, textarea, select');
      cursorRing.classList.toggle('hovering', !!hit);
    });

    (function animateCursor() {
      cdx += (cmx - cdx) * 0.2;
      cdy += (cmy - cdy) * 0.2;
      crx += (cmx - crx) * 0.1;
      cry += (cmy - cry) * 0.1;
      cursorDot.style.translate = `${cdx}px ${cdy}px`;
      cursorRing.style.translate = `${crx}px ${cry}px`;
      requestAnimationFrame(animateCursor);
    })();
  }

  // ── Project list click ────────────────────────────────────
  const listItems = document.querySelectorAll('.proj-list-item');

  listItems.forEach(item => {
    const idx = parseInt(item.dataset.idx);
    if (!isTouchDevice) {
      item.addEventListener('mouseenter', () => {
        setThumbIdx(idx);
        hoverThumb.classList.remove('instant');
        hoverThumb.classList.add('visible');
        document.body.classList.add('thumb-active');
      });
      item.addEventListener('mouseleave', () => {
        hoverThumb.classList.remove('visible');
        document.body.classList.remove('thumb-active');
      });
    }
    item.addEventListener('click', () => {
      activeIdx = idx;
      listItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      if (typeof gtag !== 'undefined') {
        const name = item.querySelector('.proj-list-name')?.textContent.trim().replace(/\s+/g, ' ');
        gtag('event', 'project_click', { project_index: idx, project_name: name });
      }
      showProject(idx);
    });
  });

  // 이름 글자 분리 + 클릭 핸들러
  const colName = document.querySelector('.col-name');
  if (colName) {
    colName.innerHTML = [...colName.textContent.trim()].map(ch =>
      `<span class="letter">${ch === ' ' ? '&nbsp;' : ch}</span>`
    ).join('');
    colName.addEventListener('click', () => {
      sessionStorage.removeItem('sp-visited');
      window.location.reload();
    });
  }
  const aboutLink = document.getElementById('about-link');
  if (aboutLink) aboutLink.addEventListener('click', e => { e.preventDefault(); showIntro(); });

  // 이메일 복사 (프로필 패널)
  const profileEmail = document.getElementById('profile-email');
  if (profileEmail) {
    profileEmail.addEventListener('click', () => {
      navigator.clipboard.writeText('seui0710@naver.com').then(() => showToast('Email copied!'));
      if (typeof gtag !== 'undefined') gtag('event', 'email_copy');
    });
  }

  function showToast(msg) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('toast-show'));
    setTimeout(() => {
      t.classList.remove('toast-show');
      setTimeout(() => t.remove(), 300);
    }, 2000);
  }

  // ── Language toggle ──────────────────────────────────────
  function applyLang(lang) {
    document.querySelectorAll('[data-lang]:not(.lang-btn)').forEach(el => {
      el.style.display = el.dataset.lang === lang ? '' : 'none';
    });
  }
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.body.classList.toggle('lang-ko', btn.dataset.lang === 'ko');
      applyLang(btn.dataset.lang);
      if (typeof gtag !== 'undefined') gtag('event', 'language_toggle', { language: btn.dataset.lang });
    });
  });
  applyLang('en');

  // ── Analytics: external link clicks ──────────────────────
  document.querySelectorAll('a[href^="http"]').forEach(a => {
    a.addEventListener('click', () => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'external_link_click', { link_url: a.href, link_text: a.textContent.trim().slice(0, 50) });
      }
    });
  });

  function showIntro() {
    listItems.forEach(i => i.classList.remove('active'));
    activeIdx = -1;
    clearSliders();
    document.getElementById('project-panel').style.display = 'none';
    const introPanel = document.getElementById('intro-panel');
    introPanel.style.display = '';
    introPanel.scrollTo({ top: 0 });
    initAboutAnimations();
  }
  async function showProject(idx) {
    clearSliders();
    const p = PROJECTS[idx];
    if (!p) return;
    const lang = document.querySelector('.lang-btn.active')?.dataset.lang || 'en';

    document.getElementById('intro-panel').style.display = 'none';
    const panel = document.getElementById('project-panel');
    panel.style.display = '';
    panel.scrollTop = 0;

    const content = document.getElementById('project-content');
    content.innerHTML = `
      <div class="skeleton-img"></div>
      <div class="skeleton-hero">
        <div class="skeleton-line" style="width:38%"></div>
        <div class="skeleton-line" style="width:55%"></div>
        <div class="skeleton-title"></div>
      </div>`;

    try {
      const res  = await fetch(p.url, { cache: 'no-store' });
      const html = (await res.text()).replace(/\.\.\/images\//g, 'images/');
      const doc  = new DOMParser().parseFromString(html, 'text/html');

      content.innerHTML = '';
      ['.detail-img-hero', '.detail-hero', '.detail-body'].forEach(sel => {
        const el = doc.querySelector(sel);
        if (el) content.appendChild(document.adoptNode(el));
      });

      applyLang(lang);
      initSliders(content);
      initScrollAnimations(panel);
    } catch (e) {
      content.innerHTML = `<p style="padding:40px;color:var(--text-muted)">Failed to load.</p>`;
    }
  }
  // ── Image slider ─────────────────────────────────────────

  let _sliderIntervals = [];
  let _sliderCleanups = [];

  function clearSliders() {
    _sliderIntervals.forEach(clearInterval);
    _sliderIntervals = [];
    _sliderCleanups.forEach(fn => fn());
    _sliderCleanups = [];
  }

  function initSliders(root) {
    root.querySelectorAll('.img-slider').forEach(slider => {
      const slides = slider.querySelector('.img-slides');
      if (!slides) return;
      const imgs = Array.from(slides.querySelectorAll('img'));
      if (imgs.length < 2) return;

      // 무한 루프: 첫 번째·마지막 슬라이드 복제본을 앞뒤에 삽입
      // 순서: [lastClone, img0, img1, ..., imgN, firstClone]
      slides.appendChild(imgs[0].cloneNode(true));
      slides.insertBefore(imgs[imgs.length - 1].cloneNode(true), imgs[0]);
      const total = imgs.length + 2;
      let current = 1; // 실제 첫 번째 슬라이드 인덱스

      // 초기 위치 (애니메이션 없이)
      slides.style.transition = 'none';
      slides.style.transform = `translateX(-100%)`;
      slides.getBoundingClientRect();
      slides.style.transition = 'transform 0.6s ease';

      // 도트 생성
      const dotsWrap = document.createElement('div');
      dotsWrap.className = 'slider-dots';
      imgs.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
        dotsWrap.appendChild(dot);
      });
      slider.appendChild(dotsWrap);
      const dots = dotsWrap.querySelectorAll('.slider-dot');

      function updateDots() {
        const idx = ((current - 1) + imgs.length) % imgs.length;
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      }

      function goTo(n) {
        current = n;
        slides.style.transform = `translateX(-${current * 100}%)`;
        updateDots();
      }

      // transition 끝나면 clone → 실제 슬라이드로 순간이동 (무한 루프 핵심)
      const TRANS = 'transform 0.6s ease';
      slides.addEventListener('transitionend', () => {
        if (current === 0) {
          slides.style.transition = 'none';
          current = imgs.length;
          slides.style.transform = `translateX(-${current * 100}%)`;
          slides.getBoundingClientRect();
          slides.style.transition = TRANS;
        } else if (current === total - 1) {
          slides.style.transition = 'none';
          current = 1;
          slides.style.transform = `translateX(-${current * 100}%)`;
          slides.getBoundingClientRect();
          slides.style.transition = TRANS;
        }
      });

      dots.forEach((dot, i) => dot.addEventListener('click', () => {
        goTo(i + 1);
        resetTimer();
      }));

      // 타이머 리셋 헬퍼
      function resetTimer() {
        clearInterval(_sliderIntervals[_sliderIntervals.length - 1]);
        _sliderIntervals.pop();
        const id = setInterval(() => goTo(current + 1), 3500);
        _sliderIntervals.push(id);
      }

      // 드래그 / 스와이프
      const DRAG_THRESHOLD = 50;
      let dragStartX = 0;
      let isDragging = false;

      slider.addEventListener('mousedown', e => {
        dragStartX = e.clientX;
        isDragging = true;
        slider.style.cursor = 'grabbing';
        e.preventDefault();
      });
      function onMouseUp(e) {
        if (!isDragging) return;
        isDragging = false;
        slider.style.cursor = 'grab';
        const dx = e.clientX - dragStartX;
        if (Math.abs(dx) > DRAG_THRESHOLD) {
          goTo(current + (dx > 0 ? -1 : 1));
           resetTimer();
        }
      }
      document.addEventListener('mouseup', onMouseUp);
      _sliderCleanups.push(() => document.removeEventListener('mouseup', onMouseUp));

      // 터치 스와이프
      let touchStartX = 0;
      let touchStartY = 0;
      slider.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }, { passive: true });
      slider.addEventListener('touchmove', e => {
        const dx = Math.abs(e.touches[0].clientX - touchStartX);
        const dy = Math.abs(e.touches[0].clientY - touchStartY);
        if (dx > dy) e.preventDefault();
      }, { passive: false });
      slider.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > DRAG_THRESHOLD) {
          goTo(current + (dx > 0 ? -1 : 1));
           resetTimer();
        }
      }, { passive: true });

      const id = setInterval(() => goTo(current + 1), 3500);
      _sliderIntervals.push(id);
    });
  }

  // 직접 접근 시 (detail 페이지 단독 로드)
  initSliders(document);
     // ── Scroll animations ────────────────────────────────────
  function initScrollAnimations(root) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    root.querySelectorAll('.proj-list-item').forEach((el, i) => {
      el.classList.add('scroll-hidden');
      el.style.transitionDelay = `${i * 60}ms`;
      observer.observe(el);
    });

    root.querySelectorAll('.detail-section, .detail-hero').forEach((el, i) => {
      el.classList.add('scroll-hidden');
      el.style.transitionDelay = `${i * 80}ms`;
      observer.observe(el);
    });
  }

  initScrollAnimations(document);
     // ── About page scroll animations ─────────────────────────
  function initAboutAnimations() {
    const panel = document.getElementById('intro-panel');
    if (!panel) return;
    const targets = Array.from(panel.querySelectorAll(
      '.about-top, .about-divider, .about-section-title, .about-row'
    ));
    targets.forEach((el, i) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 40);
    });
  }

  if (sessionStorage.getItem('sp-visited')) {
    setTimeout(initAboutAnimations, 50);
  }
  // ── Clock ─────────────────────────────────────────────────
  const clockEl = document.getElementById('clock');
  if (clockEl) {
    function updateClock() {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      clockEl.textContent = `${h}:${m}:${s}`;
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

})();
