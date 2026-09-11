gsap.registerPlugin(ScrollTrigger);

/**
 * Entrada da seção "A Aura" — dispara uma vez quando a seção entra na
 * viewport (não é scroll-scrub como o vídeo; é uma revelação editorial,
 * lenta e discreta, na ordem: gráfico + kicker → título → subtítulo → marca).
 */
const aboutTl = gsap.timeline({
  paused: true,
  defaults: { ease: 'power2.out' },
});

aboutTl
  .to('#about-kicker', { opacity: 1, duration: 1 })
  .to('.about-graphic', { opacity: 1, duration: 1.6 }, '<')
  .fromTo(
    '#about-title',
    { y: 22, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.1 },
    '-=0.6'
  )
  .to('#about-subtitle', { opacity: 1, duration: 1 }, '-=0.55')
  .to('#about-mark', { opacity: 1, duration: 0.9 }, '-=0.5');

ScrollTrigger.create({
  trigger: '#about-section',
  start: 'top 75%',
  toggleActions: 'play none none reverse',
  animation: aboutTl,
});
