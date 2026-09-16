gsap.registerPlugin(ScrollTrigger);

/**
 * Navbar fixa sobre o Hero. Cor (não fundo) troca quando a seção clara
 * "A Aura" começa a entrar na viewport — ScrollTrigger próprio, simples
 * enter/leave, sem scrub e sem tocar nos outros ScrollTriggers do site.
 */
(function () {
  const navbar = document.getElementById('navbar');
  const aboutSection = document.getElementById('about-section');
  const contatoSection = document.getElementById('contato-section');
  if (!navbar || !aboutSection) return;

  ScrollTrigger.create({
    trigger: aboutSection,
    start: 'top 85%',
    onEnter: () => navbar.classList.add('navbar--dark'),
    onLeaveBack: () => navbar.classList.remove('navbar--dark'),
  });

  /**
   * "Contato" volta ao fundo escuro do Hero — a navbar precisa reverter
   * pro estado claro (logo + texto branco) enquanto essa seção estiver
   * na viewport. Trigger independente, não mexe no de cima.
   */
  if (contatoSection) {
    ScrollTrigger.create({
      trigger: contatoSection,
      start: 'top 85%',
      onEnter: () => navbar.classList.remove('navbar--dark'),
      onLeaveBack: () => navbar.classList.add('navbar--dark'),
    });
  }
})();

/**
 * Menu mobile — painel cheio, abre/fecha por classe (transição via CSS).
 */
(function () {
  const openBtn = document.getElementById('navbar-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const menu = document.getElementById('mobile-menu');
  if (!openBtn || !closeBtn || !menu) return;

  function openMenu() {
    menu.classList.add('is-open');
    openBtn.setAttribute('aria-expanded', 'true');
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.paused(true);
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    openBtn.setAttribute('aria-expanded', 'false');
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.paused(false);
  }

  openBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  menu.querySelectorAll('.mobile-menu__link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
})();
