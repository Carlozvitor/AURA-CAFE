# Identidade visual

> Como a marca aparece em tudo que o MazyOS gera.
> As skills de conteúdo, carrossel e post leem esse arquivo antes de criar qualquer visual.
> Edite quando a marca evoluir.

---

## Cores

Paleta 100% de neutros quentes — sem cor de destaque isolada. O contraste
vem da alternância entre blocos escuros (abertura/fechamento, cinematográficos)
e blocos claros (miolo editorial), não de uma cor de marca.

- **Fundo escuro (hero / fechamento "Contato"):** `#0a0a0a` (hero/body) e
  `#14120f` (menu mobile e seção "Contato" — preto levemente amadeirado)
- **Fundo claro (miolo — "A Aura", "Cafés", "Nossa Casa"):** `#f3ede3`
- **Cor de destaque / CTA:** não existe uma cor de destaque própria. CTAs
  são tipográficos: texto pequeno, uppercase, letter-spacing largo, às
  vezes sublinhado fino — nunca um botão colorido/preenchido.
- **Texto principal sobre fundo escuro:** `#f6f3ee` (creme)
- **Texto principal sobre fundo claro (títulos):** `#201d18`
- **Texto secundário sobre fundo claro (corpo):** `#7c7364`
- **Texto kicker/label sobre fundo claro:** `#96897a`
- **Texto detail/muted sobre fundo claro:** `#ab9f8d`
- **Cor proibida:** qualquer cor saturada/vibrante (verde, laranja, azul
  vivos), preto puro `#000` e branco puro `#fff` — sempre usar os
  neutros quebrados acima.

---

## Tipografia

- **Família única:** Instrument Sans (Google Fonts), usada em títulos e
  corpo — a marca não mistura uma segunda família.
- **Títulos e destaques:** Instrument Sans, peso 600, letter-spacing
  levemente negativo (`-0.01em` a `-0.02em`), line-height apertado (~1.1).
- **Corpo, subtítulos e botões:** Instrument Sans, peso 400 (corpo) ou 500
  (labels/kickers/links), line-height solto (~1.6–1.8) no corpo.
- **Peso do título:** 600 (semibold) — nunca bold 700 nem regular 400.
- **Kickers/labels:** sempre uppercase, `letter-spacing: 0.14em` a
  `0.18em`, tamanho pequeno (~0.7–0.8rem).

---

## Estilo geral

Editorial, minimalista, cinematográfico. Composição assimétrica ou
centralizada com bastante respiro (nunca grid denso). Entradas suaves —
fade + leve translateY, nunca bounce ou easing exagerado — disparadas uma
única vez ao entrar na viewport (`ScrollTrigger` + `toggleActions: play
none none reverse`) ou amarradas 1:1 ao progresso do scroll quando fazem
parte da narrativa (vídeo-scroll do hero, queda dos produtos em "Cafés").
Nada de animação decorativa solta, sem relação com o scroll do usuário.

---

## Elementos-chave

- **Bordas:** quase inexistentes. Único uso: `border-left: 1px solid
  rgba(32,29,24,0.15)` numa frase de destaque (highlight), nunca em cards.
- **Border-radius dos cards:** nenhum — cantos sempre retos, inclusive em
  imagens de produto.
- **Botões:** não existem botões tradicionais (sem preenchimento/fundo).
  CTAs são links de texto: uppercase, letter-spacing largo, ou sublinhado
  fino de 1px que reforça a cor no hover.
- **Sombras:** só `text-shadow` sutil para legibilidade de texto sobre
  vídeo/imagem (ex.: `0 2px 28px rgba(0,0,0,0.5)`). Nunca `box-shadow` em
  cards ou blocos.

---

## O que NUNCA fazer

- Cor saturada/vibrante ou gradiente colorido chamativo
- Ícone clichê de cafeteria (xícara fumegante genérica, grão de café como
  bullet, etc.)
- Botão preenchido/pill colorido — CTA é sempre tipográfico
- Cantos arredondados grandes ou cards com sombra
- Excesso de emoji ou elementos gráficos soltos sem relação com fotografia/vídeo real
- Animação que não está amarrada ao scroll do usuário (nada rodando sozinho)

---

## Logo

- **Arquivo:** `identidade/logo.png`
- **Versão pra fundo escuro:** não existe arquivo separado — a versão
  branca é gerada via CSS (`filter: brightness(0) invert(1)`) em cima do
  PNG original.
- **Onde usar:** navbar (topo de todas as páginas), abertura do hero,
  rodapé, slide final do carrossel (CTA), header de propostas.
- **Tamanho sugerido:** 26–48px de altura em navbar/rodapé; 120–240px de
  largura em blocos de abertura/CTA.

---

## Observações adicionais

Esses valores foram extraídos do site já construído (`site/css/style.css`)
em vez de definidos do zero — o sistema visual nasceu no código antes de
ser documentado aqui. Se a direção visual mudar, atualizar os dois lados
juntos (CSS do site + este arquivo).
