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
  const splashInner = splash.querySelector('.splash-inner');
  const carousel    = document.getElementById('splash-carousel');
  const cylinder    = document.getElementById('cylinder');
  const splashCards = Array.from(cylinder.querySelectorAll('.sc'));
  const TOTAL       = splashCards.length; // 8
  const ANGLE       = 360 / TOTAL;        // 45deg per card

  // 카드를 원통 표면에 배치 (한 번만 호출)
  function initCylinder() {
    // requestAnimationFrame 이후에 offsetWidth가 정확히 잡힘
    const cardW  = splashCards[0].offsetWidth || 256;
    const RADIUS = Math.ceil(cardW / (2 * Math.sin(Math.PI / TOTAL)) * 1.08);
    splashCards.forEach((card, i) => {
      card.style.transform = `rotateY(${i * ANGLE}deg) translateZ(${RADIUS}px)`;
    });
    // 반지름 저장
    cylinder.dataset.radius = String(RADIUS);
  }

  // 원통을 회전시켜 activeIdx 카드를 정면으로
  function positionCards(activeIdx) {
    cylinder.style.transform = `rotateY(${-activeIdx * ANGLE}deg)`;
    splashCards.forEach((card, i) => {
      card.classList.toggle('active', i === activeIdx);
    });
  }

  if (sessionStorage.getItem('sp-visited')) {
    splash.style.display = 'none';
  } else {
    let activeIdx  = 0; // 첫 번째 카드(Monimo)부터 시작
    let dismissed  = false;
    let accumDelta = 0;
    const SNAP_THRESHOLD = 120;

    requestAnimationFrame(() => {
      initCylinder();
      positionCards(activeIdx);
      setTimeout(() => splash.classList.add('ready'), 80);
    });

    function dismissSplash() {
      if (dismissed) return;
      dismissed = true;
      sessionStorage.setItem('sp-visited', '1');
      splash.classList.add('hidden');

      // 페이드아웃 중 wheel 이벤트가 아래 패널로 새는 것 방지
      const blockScroll = e => e.preventDefault();
      document.addEventListener('wheel', blockScroll, { passive: false });
      setTimeout(() => {
        splash.style.display = 'none';
        document.removeEventListener('wheel', blockScroll);
      }, 750);
    }

    function advance(dir) {
      // dir: +1 = 오른쪽(다음), -1 = 왼쪽(이전)
      const next = activeIdx + dir;
      if (next < 0) return;
      if (next >= TOTAL) { dismissSplash(); return; }
      activeIdx = next;
      positionCards(activeIdx);
    }

    // 휠 스크롤 → 카드 이동
    splash.addEventListener('wheel', e => {
      e.preventDefault();
      accumDelta += e.deltaY;
      if (accumDelta > SNAP_THRESHOLD)  { advance(+1); accumDelta = 0; }
      if (accumDelta < -SNAP_THRESHOLD) { advance(-1); accumDelta = 0; }
    }, { passive: false });

    // 터치 스와이프
    let touchX = 0, touchY = 0;
    splash.addEventListener('touchstart', e => {
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY;
    }, { passive: true });
    splash.addEventListener('touchmove', e => {
      e.preventDefault();
      const dx = touchX - e.touches[0].clientX;
      const dy = touchY - e.touches[0].clientY;
      if (Math.abs(dy) > Math.abs(dx)) {
        accumDelta += dy;
      } else {
        accumDelta += dx;
      }
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY;
      if (accumDelta > SNAP_THRESHOLD)  { advance(+1); accumDelta = 0; }
      if (accumDelta < -SNAP_THRESHOLD) { advance(-1); accumDelta = 0; }
    }, { passive: false });

    // 카드 클릭 → active 카드면 상세 페이지, 아니면 그 카드로 이동
    splashCards.forEach((card, i) => {
      card.addEventListener('click', e => {
        e.stopPropagation();
        if (i === activeIdx) {
          window.location.href = card.href;
        } else {
          advance(i > activeIdx ? 1 : -1);
        }
      });
    });

    // Enter 버튼 · 빈 영역 클릭 · 키보드
    splashEnter.addEventListener('click', e => { e.stopPropagation(); dismissSplash(); });
    splash.addEventListener('click', e => {
      if (!e.target.closest('.sc')) dismissSplash();
    });
    document.addEventListener('keydown', e => {
      if (dismissed) return;
      if (e.key === 'ArrowRight') advance(+1);
      else if (e.key === 'ArrowLeft') advance(-1);
      else if (e.key === 'Enter' || e.key === 'Escape') dismissSplash();
    });
  }

  // ── Current language ──────────────────────────────────────
  let currentLang = localStorage.getItem('sp-lang') || 'en';
  applyLang(currentLang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentLang = btn.dataset.lang;
      applyLang(currentLang);
      localStorage.setItem('sp-lang', currentLang);
    });
  });

  function applyLang(lang) {
    document.body.classList.toggle('lang-ko', lang === 'ko');
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
  }

  // ── Panels ───────────────────────────────────────────────
  const introPanel   = document.getElementById('intro-panel');
  const projectPanel = document.getElementById('project-panel');
  const scrollFade   = document.getElementById('panel-scroll-fade');

  function updateScrollFade() {
    if (!scrollFade) return;
    const hasOverflow = projectPanel.scrollHeight > projectPanel.clientHeight + 16;
    const atEnd = projectPanel.scrollTop + projectPanel.clientHeight >= projectPanel.scrollHeight - 16;
    scrollFade.classList.toggle('visible', hasOverflow && !atEnd);
  }

  projectPanel.addEventListener('scroll', updateScrollFade, { passive: true });

  function showIntro() {
    activeIdx = -1;
    listItems.forEach(i => i.classList.remove('active'));
    projectPanel.classList.add('fading');
    scrollFade.classList.remove('visible');
    setTimeout(() => {
      projectPanel.style.display = 'none';
      projectPanel.classList.remove('fading');
      introPanel.style.display = 'flex';
    }, 200);
  }

  async function showProject(idx) {
    clearSliders();
    const p = PROJECTS[idx];
    introPanel.classList.add('fading');
    setTimeout(async () => {
      introPanel.style.display = 'none';
      introPanel.classList.remove('fading');
      projectPanel.style.display = 'block';
      projectPanel.scrollTop = 0;
      scrollFade.classList.remove('visible');

      // 스켈레톤 표시
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

        // 슬라이더 초기화
        initSliders(content);
        // 스크롤 힌트 업데이트
        requestAnimationFrame(updateScrollFade);
      } catch (e) {
        content.innerHTML = `<p style="padding:40px;color:var(--text-muted)">Failed to load.</p>`;
      }
    }, 200);
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
      slides.addEventListener('transitionend', () => {
        if (current === 0) {
          slides.style.transition = 'none';
          current = imgs.length;
          slides.style.transform = `translateX(-${current * 100}%)`;
          slides.getBoundingClientRect(); // reflow
          slides.style.transition = '';
        } else if (current === total - 1) {
          slides.style.transition = 'none';
          current = 1;
          slides.style.transform = `translateX(-${current * 100}%)`;
          slides.getBoundingClientRect(); // reflow
          slides.style.transition = '';
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
          goTo(current + (dx < 0 ? 1 : -1));
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
          goTo(current + (dx < 0 ? 1 : -1));
          resetTimer();
        }
      }, { passive: true });

      const id = setInterval(() => goTo(current + 1), 3500);
      _sliderIntervals.push(id);
    });
  }

  // 직접 접근 시 (detail 페이지 단독 로드)
  initSliders(document);

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
