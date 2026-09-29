(function () {
  'use strict';

  const isPlaceholder = (v) =>
    typeof v !== 'string' || v.trim() === '' || /^\[.*\]$/.test(v.trim());

  /* ---------- Texto a partir do CONFIG ---------- */
  document.querySelectorAll('[data-cfg]').forEach((el) => {
    const value = CONFIG[el.dataset.cfg];
    const fallback = el.dataset.fallback;
    if (isPlaceholder(value) && fallback) {
      el.textContent = fallback;          // placeholder específico daquele trecho da copy
    } else if (typeof value === 'string' && value.trim() !== '') {
      el.textContent = value;
    }
  });

  document.querySelectorAll('[data-cfg-email]').forEach((el) => {
    if (!isPlaceholder(CONFIG.email)) el.href = 'mailto:' + CONFIG.email;
  });

  /* Redes sociais: só vira link quando a URL existir. Rede sem link sai do rodapé
     (com o separador), e a linha "Redes" só aparece se sobrar pelo menos uma. */
  let temRede = false;
  document.querySelectorAll('[data-social]').forEach((el) => {
    const url = CONFIG[el.dataset.social];
    if (typeof url === 'string' && /^https?:\/\//.test(url)) {
      el.href = url;
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
      temRede = true;
    } else {
      const sep = el.nextElementSibling;
      if (sep && sep.classList.contains('sep')) sep.remove();
      el.remove();
    }
  });
  const socialsRow = document.querySelector('[data-socials]');
  if (socialsRow && temRede) socialsRow.hidden = false;

  /* Depoimentos: só entram os preenchidos. Sem nenhum real, a seção continua oculta. */
  const tWrap = document.querySelector('[data-testimonials]');
  const tSection = document.getElementById('depoimentos');
  const depoimentosReais = (Array.isArray(CONFIG.depoimentos) ? CONFIG.depoimentos : [])
    .filter((d) => d && !isPlaceholder(d.frase));
  if (tWrap && tSection && depoimentosReais.length) {
    tSection.hidden = false;
    tWrap.textContent = '';
    depoimentosReais.forEach((d) => {
      const fig = document.createElement('figure');
      fig.className = 'testimonial reveal';
      const bq = document.createElement('blockquote');
      const p = document.createElement('p');
      p.textContent = d.frase;
      bq.appendChild(p);
      const cap = document.createElement('figcaption');
      const strong = document.createElement('strong');
      strong.textContent = d.nome;
      cap.appendChild(strong);
      cap.appendChild(document.createTextNode(d.local + ' · ' + d.equipamento));
      fig.appendChild(bq);
      fig.appendChild(cap);
      tWrap.appendChild(fig);
    });
  }

  /* ---------- Links do WhatsApp ---------- */
  const number = String(CONFIG.WHATSAPP_NUMBER || '').replace(/\D/g, '');
  const validNumber = /^55\d{10,11}$/.test(number);
  if (!validNumber) {
    console.warn('[Distrito] WHATSAPP_NUMBER ainda não configurado. Os botões abrem o WhatsApp sem destinatário.');
  }
  const waLink = (key) => {
    const text = encodeURIComponent(WA_MESSAGES[key] || WA_MESSAGES.geral);
    return validNumber
      ? 'https://wa.me/' + number + '?text=' + text
      : 'https://wa.me/?text=' + text;
  };
  document.querySelectorAll('[data-wa]').forEach((el) => {
    el.href = waLink(el.dataset.wa);
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });

  /* ---------- Menu mobile ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('menu-principal');
  const desktop = window.matchMedia('(min-width: 1100px)');

  const setMenu = (open, returnFocus) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-aberto', open);
    if (!open && returnFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', (e) => {
    if (e.target.closest('a') && !desktop.matches) setMenu(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false, true);
    }
  });

  document.addEventListener('click', (e) => {
    if (toggle.getAttribute('aria-expanded') === 'true' && !e.target.closest('.site-header')) {
      setMenu(false);
    }
  });

  desktop.addEventListener('change', () => setMenu(false));

  /* ---------- Vídeo do Hero ---------- */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo && !reduceMotion) {
    heroVideo.muted = true;
    heroVideo.setAttribute('muted', ''); // alguns iPhones exigem o atributo além da propriedade
    let heroVisivel = true;
    const playVideo = () => {
      if (!heroVisivel || !heroVideo.paused) return;
      const p = heroVideo.play();
      if (p) p.catch(() => {});
    };
    playVideo(); // tenta já ao abrir a página
    heroVideo.addEventListener('canplay', playVideo, { once: true });
    // Se o celular bloqueou o início automático (ex.: economia de bateria),
    // tenta de novo no primeiro toque, clique ou rolagem.
    ['touchstart', 'click', 'scroll'].forEach((ev) =>
      window.addEventListener(ev, playVideo, { once: true, passive: true }));
    // Só toca enquanto o Hero está visível (economiza bateria e CPU)
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          heroVisivel = entry.isIntersecting;
          if (heroVisivel) playVideo(); else heroVideo.pause();
        });
      }).observe(heroVideo);
    }
  }
  // Com "reduzir movimento" ativo, o vídeo não toca e fica só o poster.

  /* ---------- Animações de entrada ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    // Itens de uma mesma lista entram em cascata (80 ms entre um e outro)
    document.querySelectorAll('.services-grid, .diffs, .steps, .highlights ul, .testimonials').forEach((list) => {
      list.querySelectorAll(':scope > .reveal').forEach((el, i) => {
        el.style.transitionDelay = `${i * 80}ms`;
      });
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add('is-visible');
          io.unobserve(el);
          // depois da entrada, o atraso não pode afetar o hover
          setTimeout(() => { el.style.transitionDelay = ''; }, 1200);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    revealEls.forEach((el) => io.observe(el));
  }
})();
