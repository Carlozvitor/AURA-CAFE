gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Inércia leve no scroll da página (ScrollSmoother precisa da estrutura
// #smooth-wrapper > #smooth-content no HTML). Ele mantém o ScrollTrigger
// sincronizado automaticamente, então o resto do arquivo não muda.
ScrollSmoother.create({
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
  smooth: 1,
});

const section = document.getElementById('scroll-video-section');
const canvas = document.getElementById('scroll-frame');
const ctx = canvas.getContext('2d');

const FRAME_COUNT = 240;
const FRAME_W = 1280;
const FRAME_H = 720;

function framePath(i) {
  return `assets/frames/frame-${String(i).padStart(3, '0')}.jpg`;
}

/**
 * O vídeo de origem é um showcase editado: planos contínuos (parados/lentos)
 * intercalados com transições rápidas (corte com movimento borrado). Mapear
 * o scroll 1:1 pro tempo do vídeo faz o usuário "esticar" essas transições
 * por muitos pixels de scroll, parecendo pular entre cenas muito diferentes.
 * Por isso o progresso do scroll é remapeado: planos contínuos recebem mais
 * espaço de scroll (fica suave/detalhado) e transições recebem pouco espaço
 * (passam rápido, como passariam num vídeo normal). Frações da duração,
 * identificadas por diferença de pixel quadro a quadro do vídeo original.
 */
const TIME_MAP = [
  { p0: 0.0, p1: 0.1803, t0: 0.0, t1: 0.14 },
  { p0: 0.1803, p1: 0.2509, t0: 0.14, t1: 0.3 },
  { p0: 0.2509, p1: 0.5729, t0: 0.3, t1: 0.55 },
  { p0: 0.5729, p1: 0.5994, t0: 0.55, t1: 0.61 },
  { p0: 0.5994, p1: 0.7668, t0: 0.61, t1: 0.74 },
  { p0: 0.7668, p1: 0.8197, t0: 0.74, t1: 0.86 },
  { p0: 0.8197, p1: 1.0, t0: 0.86, t1: 1.0 },
];

function mapProgressToTimeFraction(progress) {
  const seg = TIME_MAP.find((s, i) => progress <= s.p1 || i === TIME_MAP.length - 1);
  const localP = Math.min(Math.max((progress - seg.p0) / (seg.p1 - seg.p0), 0), 1);
  return seg.t0 + localP * (seg.t1 - seg.t0);
}

/**
 * Frases sincronizadas ao PROGRESSO do scroll (não ao tempo do vídeo).
 * Cada uma ocupa uma faixa de progresso; nas bordas de cada faixa ela
 * entra/sai em fade ao longo de FADE_ZONE (fração do progresso total).
 * A posição varia por frase conforme o espaço livre na cena do vídeo
 * naquele trecho, pra não cobrir o assunto principal nem repetir sempre
 * o mesmo canto.
 */
const TEXT_BOUNDARIES = [0, 0.2, 0.45, 0.7, 1.0];
const TEXT_CONTENT = [
  { kicker: 'AURA CAFÉ, 01', line: 'Um momento para saborear.', position: 'bottom-left' },
  { kicker: 'AURA CAFÉ, 02', line: 'Feito com intenção.', position: 'bottom-right' },
  { kicker: 'AURA CAFÉ, 03', line: 'Do grão à experiência.', position: 'top-right' },
  { kicker: 'AURA CAFÉ, 04', line: 'Isso é Aura.', position: 'top-left' },
];
const TEXT_FADE_ZONE = 0.04;

const textEl = document.getElementById('scroll-text');
const textKicker = document.getElementById('scroll-text-kicker');
const textLine = document.getElementById('scroll-text-line');
let currentPhraseIndex = -1;

function updateText(progress) {
  let seg = TEXT_BOUNDARIES.length - 2;
  for (let i = 0; i < TEXT_BOUNDARIES.length - 1; i++) {
    if (progress < TEXT_BOUNDARIES[i + 1]) {
      seg = i;
      break;
    }
  }

  if (seg !== currentPhraseIndex) {
    currentPhraseIndex = seg;
    const content = TEXT_CONTENT[seg];
    textKicker.textContent = content.kicker;
    textLine.textContent = content.line;
    textEl.className = `scroll-text scroll-text--${content.position}`;
  }

  const segStart = TEXT_BOUNDARIES[seg];
  const segEnd = TEXT_BOUNDARIES[seg + 1];
  const distFromStart = progress - segStart;
  const distFromEnd = segEnd - progress;

  let opacity = 1;
  if (distFromStart < TEXT_FADE_ZONE) opacity = distFromStart / TEXT_FADE_ZONE;
  if (distFromEnd < TEXT_FADE_ZONE) opacity = Math.min(opacity, distFromEnd / TEXT_FADE_ZONE);

  textEl.style.opacity = Math.min(Math.max(opacity, 0), 1);
}

/**
 * Abertura sobre o primeiro frame (0%) — some suavemente nos primeiros
 * ~8% do progresso do scroll. Puramente decorativa, sem lógica própria
 * de scroll: só lê o mesmo `self.progress` do ScrollTrigger do vídeo.
 */
const INTRO_FADE_END = 0.08;
const introEl = document.getElementById('scroll-intro');

function updateIntro(progress) {
  const opacity = 1 - Math.min(progress / INTRO_FADE_END, 1);
  introEl.style.opacity = opacity;
}

const images = new Array(FRAME_COUNT);
let currentFrame = -1;

function drawFrame(i) {
  if (i === currentFrame || !images[i]) return;
  currentFrame = i;
  ctx.drawImage(images[i], 0, 0, FRAME_W, FRAME_H);
}

function loadFrame(i) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      images[i] = img;
      resolve();
    };
    img.src = framePath(i);
  });
}

canvas.width = FRAME_W;
canvas.height = FRAME_H;

loadFrame(0).then(() => drawFrame(0));

const rest = [];
for (let i = 1; i < FRAME_COUNT; i++) rest.push(loadFrame(i));

Promise.all(rest).then(() => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom bottom',
    pin: '.scroll-video-sticky',
    pinSpacing: false,
    onUpdate: (self) => {
      const timeFraction = mapProgressToTimeFraction(self.progress);
      const frameIndex = Math.round(timeFraction * (FRAME_COUNT - 1));
      drawFrame(frameIndex);
      updateText(self.progress);
      updateIntro(self.progress);
    },
  });
});
