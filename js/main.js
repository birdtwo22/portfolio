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
      titleEn: 'IVI Real-Time Data Service',
      titleKo: 'IVI 실시간 데이터 서비스',
      client: 'Hyundai Motor Company',
      category: 'Automotive · UX Research',
      descEn: 'End-to-end UX planning for a context-aware in-vehicle data service.',
      descKo: '맥락 인지형 차량용 데이터 서비스 앱의 UX 기획 전 과정.',
      stat: 'IDI + UPD research',
      img: null,
      placeholder: 'Hyundai\nIVI Service',
      url: 'project/ivi-service.html',
    },
    {
      num: '08',
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
  const splash      = document.getElementById('splash');
  const splashEnter = document.getElementById('splash-enter');
  const splashGrid  = document.getElementById('splash-grid');
  const splashCards = Array.from(splashGrid.querySelectorAll('.sg-card'));

  if (sessionStorage.getItem('sp-visited')) {
    splash.style.display = 'none';
  } else {
    let dismissed = false;

    function dismissSplash() {
      if (dismissed) return;
      dismissed = true;
      sessionStorage.setItem('sp-visited', '1');
      splash.classList.add('hidden');
      const blockScroll = e => e.preventDefault();
      document.addEventListener('wheel', blockScroll, { passive: false });
      setTimeout(() => {
        splash.style.display = 'none';
        document.removeEventListener('wheel', blockScroll);
        setTimeout(initAboutAnimations, 700);
      }, 750);
    }

    const OFFSETS = [
      [-100, -80], [0, -80], [0, -80], [100, -80],
      [-100,   0], [0,   0], [0,   0], [100,   0],
      [-100,  80], [0,  80], [0,  80], [100,  80],
    ];
    splashCards.forEach((card, idx) => {
      const [dx, dy] = OFFSETS[idx] || [0, -60];
      card.style.transition = 'none';
      card.style.transform = `translate(${dx}px, ${dy}px) scale(0.88) rotate(12deg)`;
    });
    const SCATTER = [0, 1, 4, 2, 5, 8, 3, 6, 9, 7, 10, 11];
    const N = SCATTER.length - 1;
    SCATTER.forEach((idx, i) => {
      setTimeout(() => {
        splashCards[idx].style.transition = 'opacity 0.5s cubic-bezier(0.0,0.0,0.2,1), transform 0.7s cubic-bezier(0.34,1.56,0.64,1), background-color 0.6s ease';
        splashCards[idx].style.opacity = '1';
        splashCards[idx].style.transform = 'translateY(0)';
      }, 60 + i * 60);
    });
    setTimeout(() => splash.classList.add('ready'), 60 + N * 60 + 150);
    setTimeout(() => {
      splash.classList.add('phase2');
      const T = 'transform 1s cubic-bezier(0.34,1.2,0.64,1), background-color 0.6s ease';
      [0,3,4,7,8,11].forEach(i=>{splashCards[i].style.transition=T;splashCards[i].style.transform='translateY(0)';});
      [1,5].forEach(i=>{splashCards[i].style.transition=T;splashCards[i].style.transform='translateY(-400px)';});
      splashCards[9].style.transition=T;splashCards[9].style.transform='translateY(100px)';
      [2,6].forEach(i=>{splashCards[i].style.transition=T;splashCards[i].style.transform='translateY(-400px)';});
      splashCards[10].style.transition=T;splashCards[10].style.transform='translateY(100px)';
      document.getElementById('splash-headline').classList.add('visible');
    }, 60 + N * 60 + 600);

    splashCards.forEach(card => {
      card.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const h = Math.floor(Math.random() * 360);
        card.style.backgroundColor = `hsl(${h},50%,14%)`;
      });
    });

    splashEnter.addEventListener('click', e => { e.stopPropagation(); dismissSplash(); });
    splash.addEventListener('click', e => {
      if (!e.target.closest('.sg-card')) dismissSplash();
    });
    document.addEventListener('keydown', e => {
      if (dismissed) return;
      if (e.key === 'Enter' || e.key === 'Escape') dismissSplash();
    });
  }

  // ── Project display ───────────────────────────────────────
  let activeIdx = -1;

  // ── Project list click ────────────────────────────────────
  const listItems = document.querySelectorAll('.proj-list-item');

  listItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.dataset.idx);
      activeIdx = idx;
      listItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      showProject(idx);
    });
  });

  // 이름 클릭 → 소개 화면으로 돌아가기
  const colName = document.querySelector('.col-name');
  if (colName) colName.addEventListener('click', showIntro);

  // ── Language toggle ──────────────────────────────────────
  function applyLang(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
      el.style.display = el.dataset.lang === lang ? '' : 'none';
    });
  }
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyLang(btn.dataset.lang);
    });
  });
  applyLang('en');
  function showIntro() {
    listItems.forEach(i => i.classList.remove('active'));
    activeIdx = -1;
    document.getElementById('intro-panel').style.display = '';
    document.getElementById('project-panel').style.display = 'none';
    clearSliders();
  }
  function showProject(idx) {
    const p = PROJECTS[idx];
    if (!p) return;
    const lang = document.querySelector('.lang-btn.active')?.dataset.lang || 'en';
    const heroHtml = p.img
      ? `<img src="${p.img}" alt="${p.titleEn}" class="proj-hero-img" />`
      : `<div class="proj-hero-placeholder">${(p.placeholder || p.titleEn).replace('\n', '<br>')}</div>`;
    document.getElementById('project-content').innerHTML = `
      <div class="detail-hero">${heroHtml}</div>
      <div class="detail-section">
        <span class="detail-label">${p.num} · ${p.category}</span>
        <h1 class="detail-title">
          <span data-lang="en">${p.titleEn}</span>
          <span data-lang="ko">${p.titleKo}</span>
        </h1>
        <p class="detail-client">${p.client}</p>
        <p class="detail-stat">${p.stat}</p>
        <p class="detail-desc">
          <span data-lang="en">${p.descEn}</span>
          <span data-lang="ko">${p.descKo}</span>
        </p>
        <a href="${p.url}" class="detail-cta">
          <span data-lang="en">View case study \u2192</span>
          <span data-lang="ko">\ucf00\uc774\uc2a4 \uc2a4\ud130\ub514 \ubcf4\uae30 \u2192</span>
        </a>
      </div>
    `;
    document.getElementById('intro-panel').style.display = 'none';
    const panel = document.getElementById('project-panel');
    panel.style.display = '';
    panel.scrollTop = 0;
    applyLang(lang);
    clearSliders();
    initSliders(panel);
    initScrollAnimations(panel);
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
      }, i * 80);
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
