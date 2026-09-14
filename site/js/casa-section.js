gsap.registerPlugin(ScrollTrigger);

/**
 * Entrada da seção "Nossa Casa" — mesma lógica da "A Aura": revelação
 * editorial única ao entrar na viewport (não é scroll-scrub), na ordem
 * pedida: identificador → título → texto → vídeo → localização.
 */
const casaTl = gsap.timeline({
  paused: true,
  defaults: { ease: 'power2.out' },
});

casaTl
  .to('#casa-kicker', { opacity: 1, duration: 0.9 })
  .fromTo(
    '#casa-title',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 1 },
    '-=0.5'
  )
  .to('#casa-body', { opacity: 1, duration: 0.9 }, '-=0.5')
  .to('#casa-media', { opacity: 1, duration: 1 }, '-=0.4')
  .to('#casa-location', { opacity: 1, duration: 0.8 }, '-=0.5');

ScrollTrigger.create({
  trigger: '#casa-section',
  start: 'top 75%',
  toggleActions: 'play none none reverse',
  animation: casaTl,
});

/**
 * Vídeo do espaço físico — toca/pausa só por visibilidade
 * (IntersectionObserver, não ScrollTrigger — não interfere no scroll).
 * Loop ambiente: não reseta o tempo, só retoma de onde parou.
 */
(function () {
  const section = document.getElementById('casa-section');
  const video = document.getElementById('casa-video');
  if (!section || !video) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { rootMargin: '15% 0px 15% 0px', threshold: 0.01 }
  );

  observer.observe(section);
})();
