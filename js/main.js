(() => {
  const section = document.querySelector('#section01');
  if (!section || typeof Swiper === 'undefined') return;

  const wrapper = section.querySelector('.swiper-wrapper');
  const pages = section.querySelector('.pages');
  const originals = [...wrapper.querySelectorAll(':scope > .item')];
  const logicalCount = originals.length;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let visible = true;

  /*
   * Swiper 9+ 的 loop 不再像旧版本那样生成 duplicate 节点，而是动态重排现有 slide。
   * 在大屏 5.5 张 + centeredSlides 的组合下，9 张内容刚好处于最低安全数量，
   * 首尾附近仍可能出现短暂空白。这里在初始化前复制一整组作为循环缓冲，
   * 但分页仍只对应原始 9 条内容，维护时只需要编辑 HTML 中的原始卡片。
   */
  originals.forEach((item, index) => {
    item.dataset.key = String(index);
  });

  originals.forEach(item => {
    const copy = item.cloneNode(true);
    copy.classList.add('copy');
    copy.dataset.key = item.dataset.key;
    wrapper.appendChild(copy);
  });

  const videos = [...section.querySelectorAll('.video')];
  const dots = [];

  if (pages) {
    pages.innerHTML = '';
    for (let index = 0; index < logicalCount; index += 1) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot';
      dot.setAttribute('aria-label', `切换到第 ${index + 1} 张`);
      dot.dataset.key = String(index);
      pages.appendChild(dot);
      dots.push(dot);
    }
  }

  const swiper = new Swiper(section.querySelector('.reels'), {
    centeredSlides: true,
    loop: true,
    speed: reducedMotion ? 0 : 600,
    slideToClickedSlide: true,
    roundLengths: true,
    navigation: {
      prevEl: section.querySelector('.prev'),
      nextEl: section.querySelector('.next')
    },
    breakpoints: {
      320: { slidesPerView: 1.2, spaceBetween: 10 },
      480: { slidesPerView: 1.5, spaceBetween: 15 },
      768: { slidesPerView: 3.5, spaceBetween: 20 },
      992: { slidesPerView: 4.2, spaceBetween: 30 },
      1500: { slidesPerView: 5.5, spaceBetween: 30 }
    },
    on: {
      init() {
        requestAnimationFrame(() => {
          updatePages(this);
          playActive();
        });
      },
      slideChange() {
        updatePages(this);
      },
      slideChangeTransitionStart: pauseAll,
      slideChangeTransitionEnd: playActive
    }
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const key = Number(dot.dataset.key);
      const candidates = [...swiper.slides]
        .map((slide, index) => ({
          slide,
          index,
          dataIndex: Number(slide.getAttribute('data-swiper-slide-index'))
        }))
        .filter(item => Number(item.slide.dataset.key) === key)
        .sort((a, b) => Math.abs(a.index - swiper.activeIndex) - Math.abs(b.index - swiper.activeIndex));

      const target = candidates[0];
      if (!target || Number.isNaN(target.dataIndex)) return;
      swiper.slideToLoop(target.dataIndex);
    });
  });

  function logicalKey(slide) {
    const key = Number(slide?.dataset.key);
    return Number.isFinite(key) ? key : 0;
  }

  function updatePages(instance) {
    const active = instance?.slides?.[instance.activeIndex];
    const key = logicalKey(active);

    dots.forEach((dot, index) => {
      const current = index === key;
      dot.classList.toggle('active', current);
      dot.toggleAttribute('aria-current', current);
    });
  }

  function stateOf(video) {
    return video.closest('.item');
  }

  function setPlayState(video, playing) {
    const button = stateOf(video)?.querySelector('.play');
    if (button) button.dataset.state = playing ? 'playing' : 'paused';
  }

  function pause(video) {
    if (!video) return;
    video.pause();
    setPlayState(video, false);
  }

  function pauseAll() {
    videos.forEach(pause);
  }

  async function play(video) {
    if (!video || !visible || document.hidden || reducedMotion) return;
    try {
      await video.play();
      setPlayState(video, true);
    } catch (error) {
      setPlayState(video, false);
    }
  }

  function getActiveVideo() {
    return section.querySelector('.swiper-slide-active .video');
  }

  function playActive() {
    pauseAll();
    play(getActiveVideo());
  }

  section.querySelectorAll('.item').forEach(item => {
    const video = item.querySelector('.video');
    const playButton = item.querySelector('.play');
    const muteButton = item.querySelector('.mute');
    const progress = item.querySelector('.bar span');

    if (!video) return;

    playButton?.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      if (!item.classList.contains('swiper-slide-active')) return;
      video.paused ? play(video) : pause(video);
    });

    muteButton?.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      if (!item.classList.contains('swiper-slide-active')) return;
      video.muted = !video.muted;
      muteButton.dataset.state = video.muted ? 'muted' : 'unmuted';
    });

    video.addEventListener('timeupdate', () => {
      if (!progress || !video.duration) return;
      progress.style.width = `${(video.currentTime / video.duration) * 100}%`;
    });

    video.addEventListener('play', () => setPlayState(video, true));
    video.addEventListener('pause', () => setPlayState(video, false));
  });

  section.querySelectorAll('.info').forEach(link => {
    link.addEventListener('click', event => {
      if (link.getAttribute('href') === '#') event.preventDefault();
    });
  });

  const observer = new IntersectionObserver(entries => {
    visible = entries[0]?.isIntersecting ?? true;
    visible ? playActive() : pauseAll();
  }, { threshold: 0.35 });

  observer.observe(section);

  document.addEventListener('visibilitychange', () => {
    document.hidden ? pauseAll() : playActive();
  });
})();
