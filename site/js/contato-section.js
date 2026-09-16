gsap.registerPlugin(ScrollTrigger);

/**
 * Entrada da seção "Contato" — mesma lógica editorial das seções
 * anteriores: revelação única ao entrar na viewport, na ordem
 * kicker → título → texto → links → localização.
 */
const contatoTl = gsap.timeline({
  paused: true,
  defaults: { ease: 'power2.out' },
});

contatoTl
  .to('#contato-kicker', { opacity: 1, duration: 0.9 })
  .fromTo(
    '#contato-title',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 1 },
    '-=0.5'
  )
  .to('#contato-body', { opacity: 1, duration: 0.9 }, '-=0.55')
  .to('#contato-links', { opacity: 1, duration: 0.8 }, '-=0.5')
  .to('#contato-detail', { opacity: 1, duration: 0.8 }, '-=0.45');

ScrollTrigger.create({
  trigger: '#contato-section',
  start: 'top 75%',
  toggleActions: 'play none none reverse',
  animation: contatoTl,
});
