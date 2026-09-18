gsap.registerPlugin(ScrollTrigger);

/**
 * Seção "CAFÉS" — os 4 produtos "caem" na composição um a um, controlados
 * 100% pelo progresso do scroll (nada de animação independente rodando
 * sozinha: parar o scroll congela exatamente ali, voltar reverte).
 *
 * Desktop: a seção fica presa (pin) enquanto o progresso avança pela
 * introdução + os 4 produtos em sequência, cada um com sua fatia do
 * progresso total. Mobile: sem pin — cada produto revela conforme entra
 * na viewport (mesma física de queda, layout empilhado em vez de fixo).
 */
const cafesSection = document.getElementById('cafes-section');
const cafesSticky = document.getElementById('cafes-sticky');
const cafesIntroEl = document.getElementById('cafes-intro');
const cafesProducts = Array.from(document.querySelectorAll('.cafes-product'));

function clamp01(v) {
  return Math.min(Math.max(v, 0), 1);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function applyProduct(el, rawLocalT, fallVh) {
  const t = clamp01(rawLocalT);
  const eased = easeOutCubic(t);
  const imgWrap = el.querySelector('.cafes-product__image-wrap');
  const info = el.querySelector('.cafes-product__info');

  imgWrap.style.transform = `translateY(${(1 - eased) * -fallVh}vh)`;

  const infoT = clamp01((t - 0.35) / 0.65);
  const infoEased = easeOutCubic(infoT);
  info.style.opacity = infoEased;
  info.style.transform = `translateY(${(1 - infoEased) * 10}px)`;
}

function applyIntro(t) {
  cafesIntroEl.style.opacity = t;
  cafesIntroEl.style.transform = `translateY(${(1 - t) * 12}px)`;
}

ScrollTrigger.matchMedia({
  '(min-width: 901px)': function () {
    const INTRO_END = 0.08;
    const span = (1 - INTRO_END) / cafesProducts.length;

    // Estado inicial (t=0): sem isso, o primeiro paint usa o layout puro do
    // CSS (produtos já visíveis/parados) até o ScrollTrigger disparar o
    // primeiro onUpdate real — daí eles "pulam" pro escondido antes de cair.
    applyIntro(0);
    cafesProducts.forEach((el) => applyProduct(el, 0, 90));

    const st = ScrollTrigger.create({
      trigger: cafesSection,
      start: 'top top',
      end: 'bottom bottom',
      pin: cafesSticky,
      pinSpacing: false,
      onUpdate: (self) => {
        const p = self.progress;
        applyIntro(clamp01(p / INTRO_END));

        cafesProducts.forEach((el, i) => {
          const startP = INTRO_END + i * span;
          applyProduct(el, (p - startP) / span, 90);
        });
      },
    });

    return () => st.kill();
  },

  '(max-width: 900px)': function () {
    applyIntro(0);
    cafesProducts.forEach((el) => applyProduct(el, 0, 30));

    const introST = ScrollTrigger.create({
      trigger: cafesIntroEl,
      start: 'top 85%',
      end: 'top 55%',
      scrub: true,
      onUpdate: (self) => applyIntro(self.progress),
    });

    const productSTs = cafesProducts.map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: 'top 92%',
        end: 'top 40%',
        scrub: true,
        onUpdate: (self) => applyProduct(el, self.progress, 30),
      })
    );

    return () => {
      introST.kill();
      productSTs.forEach((t) => t.kill());
    };
  },
});
