# Copilot Combate Game - UX/UI Design System

**Versão:** 2.0  
**Data:** 1 de junho de 2026  
**Tema:** Ambiente de Combate com Cores Escuras e Raios Laranjas

---

## Atualização v2.0 — Decisões de UX Implementadas

### Telas Implementadas

| Tela | Rota | Descrição |
|------|------|-----------|
| Home / Welcome | `/` | Landing page com opções de entrar como jogador, GM ou admin |
| Join Room | `/join` ou `/join/:code` | Jogador insere código de 6 dígitos para entrar na sala |
| Room Lobby | `/rooms/:roomId/lobby` | Seleção de time e nome do jogador |
| Round Selection | `/rounds` | Grid com 4 rounds, progresso por time, vilão de cada round |
| Game Board | `/round/:roundId/play` | Tabuleiro com 3 categorias de cartas (prompt, use case, tool) |
| GM Login | `/gamemaster` | Login do Game Master com ID único |
| GM Dashboard | `/gamemaster/dashboard` | Controle de salas, rounds, timer, pontuação dos times |
| Admin Login | `/admin/login` | Login com PIN numérico |
| Admin Dashboard | `/admin` | CRUD de cards, match rules, gerenciamento de salas |
| Debug Dashboard | `/debug` | Health check dos endpoints Azure (só funciona com backend ativo) |

### Mudanças de UX em Relação ao v1.0

1. **Sem campo "Área de Atuação"** — removido de todos os formulários e cards
2. **Cards reutilizáveis** — cards NÃO desaparecem do tabuleiro após uso
3. **Randomização** — prompts e use cases embaralham a cada nova rodada de match
4. **Tools fixos** — ferramentas não embaralham (mantêm ordem original)
5. **Posição embaralhada** — o card da resposta correta NÃO fica sempre na primeira posição
6. **Progress bar dinâmica** — baseada em match rules ativos, capped em 100%
7. **Prevenção de duplicatas** — combinação já acertada mostra erro se tentada novamente
8. **Matches configuráveis** — GM pode definir quantos matches cada round exige por sala
9. **Timer toggleável** — GM pode mostrar/ocultar o timer para os jogadores
10. **Room-scoped** — finalizar jogo afeta apenas as salas do GM, não todas

### Componentes de Card Implementados

**PlayingCard** — Card individual com:
- Ícone por tipo (Zap para prompt, Target para useCase, Wrench para tool)
- Badge de dificuldade (Fácil/Médio/Difícil) com cores distintas
- Estado selecionado com borda colorida e glow effect
- Hover com elevação (scale + shadow)

**MatchResult** — Modal de resultado:
- Avatar do vilão com mensagem temática
- Feedback visual: verde (correto) ou vermelho (errado)
- Explicação educativa do porquê o match é correto/incorreto
- Botão "Continuar" que re-embaralha as cartas

---

## 🎨 Design System Overview (v1.0 Original)

### Filosofia de Design

O Copilot Combate Game combina a **seriedade do aprendizado corporativo** com a **energia de um jogo de combate**, criando uma experiência que é simultaneamente **profissional e envolvente**. O design visual evoca uma **arena de batalha tecnológica** onde jogadores enfrentam vilões da produtividade armados com Microsoft 365 Copilot.

**Pilares do Design:**
1. **Atmosfera de Combate:** Fundo escuro com energia laranja pulsante
2. **Clareza:** Informação sempre legível, sem sacrificar estética
3. **Feedback Visual:** Interações recompensadas com animações satisfatórias
4. **Acessibilidade:** WCAG 2.1 AA compliance mínimo
5. **Responsividade:** Mobile-first, desktop-optimized

---

## 🌈 Color System

### Paleta Principal

```css
:root {
  /* === CORES DE FUNDO (ARENA ESCURA) === */
  --bg-primary: #0A0A0A;           /* Preto profundo - Fundo principal */
  --bg-secondary: #1A1A1A;         /* Cinza muito escuro - Cards, modais */
  --bg-tertiary: #2D2D2D;          /* Cinza escuro - Hover states */
  --bg-elevated: #1F1F1F;          /* Elementos elevados */
  
  /* === ENERGIA LARANJA (RAIOS DE COMBATE) === */
  --energy-primary: #FF6B35;       /* Laranja vibrante - Primário */
  --energy-secondary: #F7931E;     /* Laranja médio - Secundário */
  --energy-tertiary: #FDB750;      /* Laranja claro - Tertiary */
  --energy-glow: #FF8C42;          /* Brilho/Glow effects */
  
  /* === ACENTOS DE BATALHA === */
  --battle-red: #DC2626;           /* Vermelho - Erro, perigo */
  --battle-green: #10B981;         /* Verde - Sucesso, correto */
  --battle-blue: #3B82F6;          /* Azul - Informação */
  --battle-yellow: #FBBF24;        /* Amarelo - Atenção */
  --battle-purple: #8B5CF6;        /* Roxo - Especial */
  
  /* === NEUTROS (TEXTOS E ELEMENTOS UI) === */
  --neutral-50: #FAFAFA;           /* Branco quase puro - Títulos */
  --neutral-100: #F5F5F5;          /* Cinza muito claro */
  --neutral-200: #E5E5E5;          /* Cinza claro */
  --neutral-300: #D4D4D4;          /* Cinza médio-claro */
  --neutral-400: #A3A3A3;          /* Cinza médio - Textos secundários */
  --neutral-500: #737373;          /* Cinza médio-escuro */
  --neutral-600: #525252;          /* Cinza escuro */
  --neutral-700: #404040;          /* Cinza muito escuro */
  --neutral-800: #262626;          /* Quase preto */
  --neutral-900: #171717;          /* Preto UI */
  
  /* === CORES DOS VILÕES (Ver villain-design.md) === */
  --villain-1: #EF4444;            /* Mestre das Notificações */
  --villain-2: #F59E0B;            /* Capitã Pesquisa Infinita */
  --villain-3: #FCD34D;            /* Senhora Perfeccionista */
  --villain-4: #EA580C;            /* ControlC+V */
}
```

### Gradientes de Combate

```css
/* Gradiente de Fundo Principal */
.arena-background {
  background: linear-gradient(
    135deg,
    #0A0A0A 0%,
    #1A1A1A 50%,
    #0A0A0A 100%
  );
}

/* Gradiente de Energia (Raios Laranjas) */
.energy-gradient {
  background: linear-gradient(
    90deg,
    #FF6B35 0%,
    #F7931E 50%,
    #FDB750 100%
  );
}

/* Gradiente de Botão Primário */
.btn-primary-gradient {
  background: linear-gradient(
    135deg,
    #FF6B35 0%,
    #F7931E 100%
  );
  box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
}

/* Gradiente de Vitória */
.victory-gradient {
  background: linear-gradient(
    135deg,
    #10B981 0%,
    #059669 100%
  );
}

/* Gradiente de Derrota */
.defeat-gradient {
  background: linear-gradient(
    135deg,
    #DC2626 0%,
    #991B1B 100%
  );
}
```

### Uso de Cores por Contexto

| Contexto | Cor | Aplicação |
|----------|-----|-----------|
| **Fundo Principal** | `--bg-primary` | Body, containers principais |
| **Cards/Modais** | `--bg-secondary` | Cards de jogo, modais, dropdowns |
| **Hover States** | `--bg-tertiary` | Hover em cards, botões secundários |
| **CTA Principal** | `--energy-primary` | Botões de ação, links importantes |
| **Match Correto** | `--battle-green` | Feedback positivo, pontuação |
| **Match Errado** | `--battle-red` | Feedback negativo, erros |
| **Títulos** | `--neutral-50` | H1, H2 de páginas |
| **Textos Principais** | `--neutral-200` | Body text, descrições |
| **Textos Secundários** | `--neutral-400` | Metadados, timestamps |

---

## 📝 Typography

### Família de Fontes

```css
:root {
  /* Títulos - Forte e impactante */
  --font-display: 'Rajdhani', 'Orbitron', sans-serif;
  
  /* Corpo de texto - Legibilidade */
  --font-body: 'Inter', 'Roboto', system-ui, sans-serif;
  
  /* Monospace - Dados técnicos */
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

**Fontes Recomendadas:**
- **Rajdhani:** Títulos e headings (estilo futurista/combate)
- **Inter:** Textos de corpo (alta legibilidade)
- **JetBrains Mono:** Pontuações, códigos, dados técnicos

### Escala Tipográfica

```css
:root {
  /* Mobile-first (base 16px) */
  --text-xs: 0.75rem;      /* 12px - Metadados */
  --text-sm: 0.875rem;     /* 14px - Textos secundários */
  --text-base: 1rem;       /* 16px - Corpo de texto */
  --text-lg: 1.125rem;     /* 18px - Subtítulos */
  --text-xl: 1.25rem;      /* 20px - Títulos pequenos */
  --text-2xl: 1.5rem;      /* 24px - Títulos médios */
  --text-3xl: 1.875rem;    /* 30px - Títulos grandes */
  --text-4xl: 2.25rem;     /* 36px - Títulos hero */
  --text-5xl: 3rem;        /* 48px - Display */
  --text-6xl: 3.75rem;     /* 60px - Mega display */
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  :root {
    --text-4xl: 3rem;      /* 48px */
    --text-5xl: 4rem;      /* 64px */
    --text-6xl: 5rem;      /* 80px */
  }
}
```

### Pesos de Fonte

```css
:root {
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
}
```

### Estilos de Texto

```css
/* Título Hero (Tela de Vilão) */
.text-hero {
  font-family: var(--font-display);
  font-size: var(--text-6xl);
  font-weight: var(--font-extrabold);
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-transform: uppercase;
  background: var(--energy-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Título de Seção */
.text-heading {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--neutral-50);
  letter-spacing: 0.02em;
}

/* Corpo de Texto */
.text-body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  color: var(--neutral-200);
  line-height: 1.6;
}

/* Texto Secundário */
.text-muted {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--neutral-400);
}

/* Pontuação */
.text-score {
  font-family: var(--font-mono);
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--energy-primary);
  text-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
}
```

---

## 🔲 Spacing System

### Escala de Espaçamento (baseada em 8px)

```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;    /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;    /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-5: 1.25rem;    /* 20px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
}
```

### Grid & Layout

```css
/* Container Principal */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

@media (min-width: 768px) {
  .container {
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  }
}

/* Grid de Cards de Jogo */
.game-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

@media (min-width: 768px) {
  .game-grid {
    grid-template-columns: repeat(6, 1fr);
    gap: var(--space-6);
  }
}
```

---

## 🎴 Components

### Botões

```css
/* Botão Primário (CTA Principal) */
.btn-primary {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  padding: var(--space-4) var(--space-8);
  border: none;
  border-radius: 8px;
  
  background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
  color: var(--neutral-50);
  
  box-shadow: 
    0 4px 14px 0 rgba(255, 107, 53, 0.39),
    0 0 20px rgba(255, 107, 53, 0.2);
  
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 6px 20px 0 rgba(255, 107, 53, 0.5),
    0 0 30px rgba(255, 107, 53, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
}

/* Efeito de Brilho ao Hover */
.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.5s;
}

.btn-primary:hover::before {
  left: 100%;
}

/* Botão Secundário */
.btn-secondary {
  background: transparent;
  border: 2px solid var(--energy-primary);
  color: var(--energy-primary);
  padding: var(--space-3) var(--space-6);
  border-radius: 8px;
  font-weight: var(--font-semibold);
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--energy-primary);
  color: var(--neutral-50);
  box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
}

/* Botão Desabilitado */
.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

### Cards de Jogo

```css
/* Card Base */
.game-card {
  background: var(--bg-secondary);
  border: 2px solid transparent;
  border-radius: 12px;
  padding: var(--space-4);
  
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Subtle shadow */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.game-card:hover {
  transform: translateY(-4px) scale(1.02);
  border-color: var(--energy-primary);
  box-shadow: 
    0 10px 20px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(255, 107, 53, 0.2);
}

/* Card Selecionado */
.game-card.selected {
  border-color: var(--energy-primary);
  background: linear-gradient(
    135deg,
    var(--bg-secondary) 0%,
    rgba(255, 107, 53, 0.1) 100%
  );
  box-shadow: 
    0 0 0 4px rgba(255, 107, 53, 0.2),
    0 10px 20px rgba(0, 0, 0, 0.4);
}

/* Card Correto (Feedback) */
.game-card.correct {
  border-color: var(--battle-green);
  background: linear-gradient(
    135deg,
    var(--bg-secondary) 0%,
    rgba(16, 185, 129, 0.15) 100%
  );
  animation: pulse-green 0.6s ease;
}

@keyframes pulse-green {
  0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  50% { box-shadow: 0 0 0 20px rgba(16, 185, 129, 0); }
}

/* Card Errado (Feedback) */
.game-card.incorrect {
  border-color: var(--battle-red);
  animation: shake 0.5s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

/* Tipografia do Card */
.game-card__title {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--neutral-50);
  margin-bottom: var(--space-2);
}

.game-card__description {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--neutral-300);
  line-height: 1.5;
}

/* Badge de Tipo */
.game-card__type-badge {
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  
  padding: var(--space-1) var(--space-3);
  border-radius: 999px;
  
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  
  background: rgba(255, 107, 53, 0.2);
  color: var(--energy-primary);
  border: 1px solid var(--energy-primary);
}
```

### Modais

```css
/* Overlay de Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(4px);
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Container do Modal */
.modal-container {
  background: var(--bg-secondary);
  border: 2px solid var(--neutral-700);
  border-radius: 16px;
  
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.5),
    0 0 60px rgba(255, 107, 53, 0.1);
  
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Header do Modal */
.modal-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--neutral-700);
}

.modal-title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--neutral-50);
}

/* Corpo do Modal */
.modal-body {
  padding: var(--space-6);
}

/* Footer do Modal */
.modal-footer {
  padding: var(--space-6);
  border-top: 1px solid var(--neutral-700);
  display: flex;
  gap: var(--space-4);
  justify-content: flex-end;
}
```

### Toast Notifications

```css
.toast-container {
  position: fixed;
  top: var(--space-4);
  right: var(--space-4);
  z-index: 10000;
  
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.toast {
  background: var(--bg-elevated);
  border-left: 4px solid var(--energy-primary);
  border-radius: 8px;
  padding: var(--space-4);
  
  min-width: 300px;
  max-width: 400px;
  
  box-shadow: 
    0 10px 20px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(255, 107, 53, 0.2);
  
  animation: slideInRight 0.3s ease;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.toast.success { border-left-color: var(--battle-green); }
.toast.error { border-left-color: var(--battle-red); }
.toast.info { border-left-color: var(--battle-blue); }
.toast.warning { border-left-color: var(--battle-yellow); }

.toast__title {
  font-weight: var(--font-bold);
  color: var(--neutral-50);
  margin-bottom: var(--space-1);
}

.toast__message {
  font-size: var(--text-sm);
  color: var(--neutral-300);
}
```

---

## ✨ Visual Effects

### Raios Laranjas (Lightning Effects)

```css
/* Raios Animados nas Bordas da Tela */
.lightning-border {
  position: relative;
  overflow: hidden;
}

.lightning-border::before,
.lightning-border::after {
  content: '';
  position: absolute;
  width: 2px;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent,
    var(--energy-primary),
    transparent
  );
  animation: lightning-travel 3s linear infinite;
}

.lightning-border::before {
  left: 0;
  animation-delay: 0s;
}

.lightning-border::after {
  right: 0;
  animation-delay: 1.5s;
}

@keyframes lightning-travel {
  0% { transform: translateY(-100%); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100%); opacity: 0; }
}
```

### Glow Effects

```css
/* Brilho de Energia */
.energy-glow {
  box-shadow: 
    0 0 20px rgba(255, 107, 53, 0.4),
    0 0 40px rgba(255, 107, 53, 0.2),
    0 0 60px rgba(255, 107, 53, 0.1);
  
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 
      0 0 20px rgba(255, 107, 53, 0.4),
      0 0 40px rgba(255, 107, 53, 0.2);
  }
  50% {
    box-shadow: 
      0 0 30px rgba(255, 107, 53, 0.6),
      0 0 60px rgba(255, 107, 53, 0.3),
      0 0 90px rgba(255, 107, 53, 0.1);
  }
}
```

### Partículas de Vitória

```css
/* Container de Partículas */
.particle-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9998;
  overflow: hidden;
}

/* Partícula Individual */
.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--energy-primary);
  border-radius: 50%;
  
  animation: particle-float 3s ease-out forwards;
}

@keyframes particle-float {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
}
```

### Screen Shake (Impactos)

```css
@keyframes screen-shake {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-2px, 1px); }
  20% { transform: translate(2px, -1px); }
  30% { transform: translate(-2px, -1px); }
  40% { transform: translate(2px, 1px); }
  50% { transform: translate(-2px, 1px); }
  60% { transform: translate(2px, -1px); }
  70% { transform: translate(-2px, -1px); }
  80% { transform: translate(2px, 1px); }
  90% { transform: translate(-2px, 1px); }
}

.shake-screen {
  animation: screen-shake 0.5s ease;
}
```

---

## 📱 Responsive Design

### Breakpoints

```css
:root {
  --breakpoint-sm: 640px;    /* Mobile landscape */
  --breakpoint-md: 768px;    /* Tablet portrait */
  --breakpoint-lg: 1024px;   /* Tablet landscape / Desktop */
  --breakpoint-xl: 1280px;   /* Large desktop */
  --breakpoint-2xl: 1536px;  /* Extra large desktop */
}
```

### Layouts Responsivos

```css
/* === MOBILE (< 768px) === */
.game-board {
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
  padding: var(--space-4);
}

.villain-intro__avatar {
  width: 200px;
  height: 200px;
}

/* === TABLET (768px - 1023px) === */
@media (min-width: 768px) {
  .game-board {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-4);
    padding: var(--space-6);
  }
  
  .villain-intro__avatar {
    width: 300px;
    height: 300px;
  }
}

/* === DESKTOP (1024px+) === */
@media (min-width: 1024px) {
  .game-board {
    grid-template-columns: repeat(6, 1fr);
    gap: var(--space-6);
    padding: var(--space-8);
  }
  
  .villain-intro__avatar {
    width: 400px;
    height: 400px;
  }
}
```

---

## 🎯 Screens Design Specs

### 1. Tela de Login

```
┌──────────────────────────────────────────────┐
│ [Fundo: #0A0A0A com raios laranjas animados]│
│                                              │
│              [LOGO DO JOGO]                  │
│         COPILOT COMBATE GAME                 │
│                                              │
│     ┌────────────────────────────────┐      │
│     │  Email: ________________       │      │
│     │  Senha: ________________       │      │
│     │                                │      │
│     │  [ENTRAR NA ARENA] ───────►    │      │
│     │                                │      │
│     │  Não tem conta? Registrar      │      │
│     └────────────────────────────────┘      │
│                                              │
│  Powered by Microsoft 365 Copilot           │
└──────────────────────────────────────────────┘
```

### 2. Tela de Seleção de Rounds

```
┌──────────────────────────────────────────────┐
│ ⚡ ESCOLHA SEU DESAFIO                        │
│                                              │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────┐│
│ │ ROUND 1 │ │ ROUND 2 │ │ ROUND 3 │ │ R4  ││
│ │  [🐝]   │ │  [🦍]   │ │  [👻]   │ │[🤖]││
│ │         │ │         │ │         │ │     ││
│ │ Mestre  │ │ Capitã  │ │ Senhora │ │Ctrl ││
│ │   das   │ │ Pesquisa│ │Perfecci │ │ C+V ││
│ │Notifica │ │ Infinita│ │  onista │ │     ││
│ │  ções   │ │         │ │         │ │     ││
│ │         │ │         │ │         │ │     ││
│ │████░░░  │ │██░░░░░░ │ │░░░░░░░░ │ │░░░░││
│ │ 60%     │ │ 20%     │ │ 0%      │ │ 0% ││
│ │ 24 pts  │ │ 6 pts   │ │ 0 pts   │ │0pts││
│ └─────────┘ └─────────┘ └─────────┘ └─────┘│
│                                              │
│ [Filtro: Todos os Rounds ▼]                 │
└──────────────────────────────────────────────┘
```

### 3. Tela de Introdução do Vilão

```
┌──────────────────────────────────────────────┐
│                                              │
│        ╔═══════════════════════════╗         │
│        ║   [Raios laranjas]        ║         │
│        ║                           ║         │
│        ║      ┌─────────┐          ║         │
│        ║      │         │          ║         │
│        ║      │  [🐝]   │ 400x400  ║         │
│        ║      │ AVATAR  │          ║         │
│        ║      │ 3D      │          ║         │
│        ║      └─────────┘          ║         │
│        ║                           ║         │
│        ║ ⚡ ROUND 1: DESAFIO ⚡     ║         │
│        ║                           ║         │
│        ║  MESTRE DAS NOTIFICAÇÕES  ║         │
│        ║                           ║         │
│        ║ "Especialista em          ║         │
│        ║  interromper produtivi-   ║         │
│        ║  dade..."                 ║         │
│        ║                           ║         │
│        ║ [ENFRENTAR DESAFIO] ─────►║         │
│        ║                           ║         │
│        ╚═══════════════════════════╝         │
│                                              │
└──────────────────────────────────────────────┘
```

### 4. Tela de Game Board (Jogo)

```
┌──────────────────────────────────────────────┐
│ ⬅ Voltar | ROUND 1: Mestre das Notificações │
│                                              │
│ Equipe Alpha: 24 pts | Você: 15 pts         │
│ ████████████░░░░░░░░ Progresso 60%          │
│                                              │
│ === PROMPTS ===                              │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐    │
│ │ [P1]│ │ [P2]│ │ [P3]│ │ [P4]│ │ [P5]│    │
│ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘    │
│                                              │
│ === CASOS DE USO ===                         │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐    │
│ │ [U1]│ │ [U2]│ │ [U3]│ │ [U4]│ │ [U5]│    │
│ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘    │
│                                              │
│ === FERRAMENTAS ===                          │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐    │
│ │ [T1]│ │ [T2]│ │ [T3]│ │ [T4]│ │ [T5]│    │
│ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘    │
│                                              │
│          [VALIDAR MATCH] ───────►            │
│        [Testar no Trabalho]                  │
│                                              │
│ 🐝 Próximo match ganha +3 pontos!            │
└──────────────────────────────────────────────┘
```

### 5. Tela do Admin Dashboard

```
┌──────────────────────────────────────────────┐
│ 🛡️ ADMIN DASHBOARD                           │
│                                              │
│ [Monitor] [Validação] [Cards] [Rounds] [📊] │
│ ────────────────────────────────────────────│
│                                              │
│ === MONITOR DE SESSÃO ===                    │
│                                              │
│ Jogadores Ativos: 42                         │
│ Matches Hoje: 187                            │
│ Taxa de Acerto: 68%                          │
│                                              │
│ TOP 5 EQUIPES:                               │
│ 1. Equipe Alpha ........... 135 pts          │
│ 2. Equipe Beta ............ 128 pts          │
│ 3. Equipe Gamma ........... 121 pts          │
│                                              │
│ ATIVIDADE POR ROUND:                         │
│ Round 1: ████████████████ 42 jogadores       │
│ Round 2: ███████░░░░░░░░░ 18 jogadores       │
│ Round 3: ██░░░░░░░░░░░░░░  5 jogadores       │
│ Round 4: ░░░░░░░░░░░░░░░░  0 jogadores       │
│                                              │
│ [EXPORTAR RELATÓRIO] [RESETAR SESSÃO]       │
└──────────────────────────────────────────────┘
```

---

## ♿ Accessibility

### WCAG 2.1 AA Compliance

**Requisitos Mínimos:**
- Contraste de texto: mínimo 4.5:1 (textos normais), 3:1 (textos grandes)
- Interações via teclado: Tab, Enter, Esc funcionais
- Screen readers: ARIA labels corretos
- Foco visível: outline clara em elementos focados

```css
/* Focus Visível */
*:focus-visible {
  outline: 2px solid var(--energy-primary);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Contraste de Textos */
.text-body {
  color: var(--neutral-200); /* Contraste 12:1 com #0A0A0A */
}

.text-muted {
  color: var(--neutral-400); /* Contraste 7:1 com #0A0A0A */
}
```

### ARIA Labels

```html
<!-- Botão de Ação -->
<button 
  class="btn-primary"
  aria-label="Enfrentar desafio do Mestre das Notificações"
>
  ENFRENTAR DESAFIO
</button>

<!-- Card de Jogo -->
<div 
  class="game-card"
  role="button"
  tabindex="0"
  aria-label="Prompt: Resume notificações importantes"
  aria-pressed="false"
>
  <!-- Conteúdo -->
</div>

<!-- Toast Notification -->
<div 
  class="toast success"
  role="alert"
  aria-live="polite"
>
  <div class="toast__title">Match Correto!</div>
  <div class="toast__message">+3 pontos para sua equipe</div>
</div>
```

---

## 📦 Asset Library

### Ícones (Lucide React ou Hero Icons)

```tsx
import { 
  Zap,         // Raios/Energia
  Trophy,      // Vitória
  Target,      // Objetivos
  Users,       // Equipes
  Award,       // Conquistas
  AlertCircle, // Erros
  CheckCircle, // Sucesso
  XCircle,     // Falha
} from 'lucide-react';
```

### Imagens

```
/public/assets/
├── villains/
│   ├── mestre-notificacoes-avatar.png (512x512)
│   ├── mestre-notificacoes-intro.png (1920x1080)
│   ├── capitã-pesquisa-avatar.png
│   ├── capitã-pesquisa-intro.png
│   ├── senhora-perfeccionista-avatar.png
│   ├── senhora-perfeccionista-intro.png
│   ├── ctrlcv-avatar.png
│   └── ctrlcv-intro.png
├── backgrounds/
│   ├── arena-dark-bg.jpg
│   ├── lightning-overlay.png
│   └── energy-particles.png
└── ui/
    ├── logo.svg
    ├── lightning-bolt.svg
    └── energy-circle.svg
```

---

## 🚀 Implementation Checklist

### Fase 1: Design Tokens & Foundations
- [ ] Configurar variáveis CSS (cores, tipografia, espaçamento)
- [ ] Importar fontes (Rajdhani, Inter, JetBrains Mono)
- [ ] Setup de Tailwind CSS customizado
- [ ] Criar componentes base (Button, Card, Modal, Toast)

### Fase 2: Layouts & Screens
- [ ] Implementar tela de Login
- [ ] Implementar tela de Seleção de Rounds
- [ ] Implementar tela de Introdução do Vilão
- [ ] Implementar Game Board
- [ ] Implementar Admin Dashboard

### Fase 3: Animações & Effects
- [ ] Implementar raios laranjas animados
- [ ] Criar efeitos de glow
- [ ] Adicionar partículas de vitória
- [ ] Implementar screen shake
- [ ] Transições entre telas

### Fase 4: Responsividade
- [ ] Testar em mobile (375px, 414px)
- [ ] Testar em tablet (768px, 1024px)
- [ ] Testar em desktop (1280px, 1920px)
- [ ] Otimizar performance de animações

### Fase 5: Acessibilidade
- [ ] Adicionar ARIA labels
- [ ] Testar navegação por teclado
- [ ] Validar contrastes de cores
- [ ] Testar com screen readers (NVDA, JAWS)

---

## 📊 Design System Metrics

**Tamanho do Bundle CSS Estimado:** ~45KB (gzipped)  
**Fontes:** ~120KB (Google Fonts)  
**Cores Totais:** 30 variáveis  
**Componentes:** 15+ componentes reutilizáveis  
**Breakpoints:** 5 níveis responsivos  

---

**Criado por:** Avanade Master  
**Última Atualização:** 17 de março de 2026  
**Status:** Design System Completo ✅
