/**
 * Vídeo do fundo da seção "A Aura" (mão colocando a xícara). Toca do
 * início toda vez que a seção volta a ficar perto/visível
 * (IntersectionObserver, não ScrollTrigger — não interfere no scroll).
 * Pausa ao sair da seção.
 */
(function () {
  const section = document.getElementById('about-section');
  const video = document.getElementById('about-graphic-video');
  if (!section || !video) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.currentTime = 0;
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
