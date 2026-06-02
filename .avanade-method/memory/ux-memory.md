### Design System Patterns
_Componentes e padrÃµes reutilizÃ¡veis_

**Exemplo**:
```yaml
- design_system: "Fluent UI (Microsoft Design Language)"
  components_used:
    - "Buttons (Primary, Secondary, Icon)"
    - "Forms (TextField, Dropdown, Checkbox)"
    - "Navigation (Nav, Breadcrumb, Pivot)"
    - "Feedback (MessageBar, Dialog, ProgressIndicator)"
  benefits:
    - "ConsistÃªncia visual (todo app usa mesmos components)"
    - "Acessibilidade built-in (WCAG AA compliance)"
    - "Development speed (Tiago reutiliza components)"
  customization: "Theming (cores brand, typography)"
  documentation: "Storybook (catalog de components com exemplos)"
  
- pattern: "Atomic Design (Atoms â†’ Molecules â†’ Organisms)"
  atoms: "Button, Input, Label (building blocks)"
  molecules: "SearchBar (Input + Button), FormField (Label + Input + Error)"
  organisms: "Header (Logo + Nav + SearchBar), Card (Image + Title + Description)"
  benefits: "Reusabilidade, escalabilidade (adicionar features combina components)"
  tool: "Figma (componentes com variants, auto-layout)"
  
- pattern: "Responsive Design (mobile-first)"
  breakpoints:
    - "Mobile: 320-767px"
    - "Tablet: 768-1023px"
    - "Desktop: 1024px+"
  approach: "Design mobile primeiro, progressive enhancement"
  rationale: "62% do trÃ¡fego Ã© mobile (analytics)"
  testing: "Browserstack, Chrome DevTools (device emulation)"
```

---

### User Research Insights
_Descobertas de pesquisa com usuÃ¡rios_

**Exemplo**:
```yaml
- research_method: "Usability Testing (moderated)"
  participants: "5 usuÃ¡rios (persona: Sarah, Gerente de Vendas)"
  task: "Cadastrar novo cliente no CRM"
  findings:
    - "100% dos usuÃ¡rios clicaram em 'Save' antes de preencher campos obrigatÃ³rios (erro UX)"
    - "80% nÃ£o viram mensagem de erro (posicionada no topo, fora do viewport)"
    - "60% tentaram usar Ctrl+F para buscar cliente (search box nÃ£o Ã³bvia)"
  actions:
    - "Disable 'Save' button atÃ© campos obrigatÃ³rios preenchidos"
    - "Mostrar erros inline (prÃ³ximo ao campo, nÃ£o topo)"
    - "Search box mais proeminente (hero position)"
  impact: "Task completion time 3min â†’ 1min (-66%)"
  
- research_method: "A/B Testing (quantitative)"
  hypothesis: "BotÃ£o CTA verde converte mais que azul"
  variants:
    control: "BotÃ£o azul (brand color)"
    variant_a: "BotÃ£o verde (high contrast)"
  sample_size: "10k visitors (5k cada variante)"
  results:
    control: "Conversion rate 5.2%"
    variant_a: "Conversion rate 6.8% (+30%)"
  decision: "Ship variant A (green button)"
  learning: "Contrast > brand consistency (quando conversion crÃ­tica)"
  
- research_method: "Heatmaps & Session Recordings (Hotjar)"
  page: "Homepage"
  findings:
    - "80% scroll atÃ© hero section apenas (conteÃºdo abaixo ignorado)"
    - "20% clicaram em imagem (esperando link, mas nÃ£o era clicÃ¡vel)"
    - "Exit rate alto (40%) no formulÃ¡rio de signup (campo 'Company Tax ID' confuso)"
  actions:
    - "Above-the-fold optimization (conteÃºdo crÃ­tico no hero)"
    - "Fazer imagens clicÃ¡veis (link para product page)"
    - "Simplificar signup (Tax ID opcional, nÃ£o obrigatÃ³rio)"
  impact: "Bounce rate 55% â†’ 40%, signup completion +25%"
```

---

### Accessibility (WCAG) Compliance
_PadrÃµes de acessibilidade validados_

**Exemplo**:
```yaml
- wcag_level: "AA (target)"
  criteria_checklist:
    perceivable:
      - "Contrast ratio â‰¥4.5:1 (texto normal) â‰¥3:1 (texto grande)" # âœ…
      - "Alt text para imagens" # âœ…
      - "Captions para vÃ­deos" # âœ…
    operable:
      - "NavegaÃ§Ã£o via teclado (Tab, Enter, Esc)" # âœ…
      - "Skip links (pular para conteÃºdo principal)" # âœ…
      - "Focus visÃ­vel (outline em elementos focados)" # âœ…
    understandable:
      - "Labels claros em formulÃ¡rios" # âœ…
      - "Mensagens de erro descritivas" # âœ…
      - "Linguagem simples (evitar jargÃ£o)" # âœ…
    robust:
      - "HTML semÃ¢ntico (<header>, <nav>, <main>)" # âœ…
      - "ARIA labels onde necessÃ¡rio (role, aria-label)" # âœ…
  
- tool: "axe DevTools (Chrome extension)"
  usage: "Scan de cada pÃ¡gina antes de ship"
  findings_example:
    - "âŒ Link sem texto descritivo ('Clique aqui' â†’ 'Saiba mais sobre produto')"
    - "âŒ FormulÃ¡rio sem labels associados (<label for='email'>)"
    - "âš ï¸ Contrast ratio 3.8:1 (abaixo do 4.5:1 requerido)"
  fix: "Corrigir antes de merge (blocker em code review)"
  
- assistive_tech_testing:
  - "NVDA (screen reader Windows) - testado por Sofia mensalmente"
  - "VoiceOver (screen reader macOS) - testado por Sofia mensalmente"
  - "Keyboard-only navigation - testado em cada feature"
  impact: "Accessibility compliant â†’ WCAG AA certification (requirement para govt contracts)"
```

---

### UI Component Library
_Componentes customizados documentados_

**Exemplo**:
```yaml
- component: "DataTable (sortable, filterable, paginated)"
  variants:
    - "Simple (read-only)"
    - "Editable (inline editing)"
    - "Selectable (checkboxes, bulk actions)"
  props:
    - "columns: { key, label, sortable, filterable }"
    - "data: Array<object>"
    - "pageSize: number (default 25)"
    - "onRowClick: callback"
  accessibility:
    - "Sortable headers (keyboard: Enter to sort)"
    - "Screen reader announces row count"
    - "Aria-labels em aÃ§Ãµes (edit, delete)"
  figma_link: "https://figma.com/file/components/datatable"
  storybook_link: "http://localhost:6006/?path=/story/datatable"
  
- component: "Modal Dialog"
  variants:
    - "Confirmation (Yes/No)"
    - "Form (input fields + submit)"
    - "Alert (info, warning, error)"
  props:
    - "isOpen: boolean"
    - "title: string"
    - "content: ReactNode"
    - "onClose: callback"
    - "primaryAction: { label, onClick }"
  accessibility:
    - "Focus trap (Tab navega apenas dentro do modal)"
    - "Esc fecha modal"
    - "Focus retorna ao elemento que abriu (apÃ³s fechar)"
  figma_link: "https://figma.com/file/components/modal"
```

---

## ðŸŽ¯ User Personas & Journeys

### User Personas Recorrentes
_Personas validadas com research_

**Exemplo**:
```yaml
- persona: "Sarah, Gerente de Vendas"
  demographics:
    - "35-50 anos"
    - "Tecnicamente competente (usa CRM diariamente)"
    - "Mobile-first (60% do tempo em smartphone)"
  goals:
    - "Fechar vendas rapidamente"
    - "Acessar dados de clientes on-the-go"
    - "Gerar relatÃ³rios para apresentar a diretoria"
  pain_points:
    - "Sistema atual lento em mobile (frustraÃ§Ã£o)"
    - "Dados desatualizados (sincronizaÃ§Ã£o ruim)"
    - "RelatÃ³rios difÃ­ceis de customizar"
  tech_savviness: "MÃ©dia-Alta (smartphone power user, mas resiste a novos softwares)"
  quote: "'Preciso de um sistema que simplesmente funcione, sem me fazer pensar'"
  projects_referenced: 8
  
- persona: "Carlos, CFO"
  demographics:
    - "45-60 anos"
    - "Uso esporÃ¡dico de software (assistente faz data entry)"
    - "Desktop primÃ¡rio (Excel power user)"
  goals:
    - "Visualizar KPIs financeiros rapidamente"
    - "Export para Excel (anÃ¡lise adicional)"
    - "Compliance/audit trail (rastreabilidade)"
  pain_points:
    - "Dashboards complexos (quer simplicidade)"
    - "Falta de drill-down (quer detalhes sem abrir mÃºltiplas telas)"
  tech_savviness: "Baixa (nÃ£o navega bem em interfaces complexas)"
  quote: "'Mostre-me os nÃºmeros que importam, nÃ£o me faÃ§a procurar'"
  projects_referenced: 5
```

---

### User Journey Maps
_Jornadas mapeadas_

**Exemplo**:
```yaml
- journey: "Primeiro uso (onboarding)"
  persona: "Sarah, Gerente de Vendas"
  stages:
    1_signup:
      actions: "Cria conta via email"
      thoughts: "Espero que seja rÃ¡pido, odeio formulÃ¡rios longos"
      emotions: "ðŸ˜ Neutra (ceticismo inicial)"
      touchpoints: "Landing page â†’ Signup form"
      pain_points: "FormulÃ¡rio pede Tax ID (nÃ£o sei de cabeÃ§a)"
      opportunities: "Simplificar signup (Tax ID opcional)"
    
    2_onboarding:
      actions: "Tutorial interativo (5 tooltips)"
      thoughts: "Parece intuitivo, gosto do tour guiado"
      emotions: "ðŸ˜Š Positiva (first win - adicionou primeiro cliente)"
      touchpoints: "Dashboard â†’ Interactive tour"
      pain_points: "Tour longo demais (pula apÃ³s 3 steps)"
      opportunities: "Onboarding progressivo (nÃ£o tudo de uma vez)"
    
    3_daily_use:
      actions: "Adiciona clientes, atualiza pipeline"
      thoughts: "RÃ¡pido em mobile, melhor que sistema anterior"
      emotions: "ðŸ˜ƒ Satisfeita (adoption)"
      touchpoints: "Mobile app (80% do tempo)"
      pain_points: "Busca Ã s vezes lenta (>3s)"
      opportunities: "Otimizar busca (indexing, caching)"
    
    4_reporting:
      actions: "Gera relatÃ³rio de vendas (mensal)"
      thoughts: "Export to Excel funcionou, perfeito"
      emotions: "ðŸ˜ Encantada (delight moment)"
      touchpoints: "Reports â†’ Export to Excel"
      pain_points: "Nenhum (funcionalidade matadora)"
      opportunities: "Adicionar templates de relatÃ³rios prÃ©-configurados"
  
  overall_sentiment: "Positivo (NPS 9/10)"
  retention_risk: "Baixo (usuÃ¡ria ativa diÃ¡ria)"
```

---

## ðŸ–¼ï¸ Wireframing & Prototyping

### Low-Fi to Hi-Fi Progression
_Processo de design iterativo_

**Exemplo**:
```yaml
- stage_1: "Sketches (papel e caneta)"
  duration: "30min - 1h"
  purpose: "IdeaÃ§Ã£o rÃ¡pida (mÃºltiplas variantes)"
  artifact: "Foto de sketches (Figma import)"
  validation: "Team review (Paula PO, Maria Analyst)"
  
- stage_2: "Low-Fi Wireframes (Figma)"
  duration: "2-4h"
  purpose: "Estrutura de conteÃºdo, fluxos de navegaÃ§Ã£o"
  fidelity: "Grayscale, placeholders (lorem ipsum, boxes)"
  validation: "Usability test com 3 usuÃ¡rios (paper prototypes)"
  iterations: "2-3 rounds (baseado em feedback)"
  
- stage_3: "Mid-Fi Wireframes (com conteÃºdo real)"
  duration: "1-2 dias"
  purpose: "Validar copy, hierarquia de informaÃ§Ã£o"
  fidelity: "ConteÃºdo real, grayscale, spacing definido"
  validation: "Stakeholder review (Paula + JoÃ£o PM)"
  
- stage_4: "Hi-Fi Mockups (design visual)"
  duration: "2-3 dias"
  purpose: "Design final (cores, typography, imagery)"
  fidelity: "Pixel-perfect, brand guidelines aplicados"
  validation: "Design review (accessibility, brand compliance)"
  
- stage_5: "Interactive Prototype (Figma)"
  duration: "1-2 dias"
  purpose: "Simular fluxos (user testing)"
  interactions: "Click-through, hover states, transitions"
  validation: "Usability testing (5 usuÃ¡rios, moderated)"
  handoff: "Design to dev (Figma â†’ code by Tiago)"
```

---

### Design Handoff Process
_Como Sofia entrega designs para Tiago_

**Exemplo**:
```yaml
- tool: "Figma (design) + Figma Dev Mode (handoff)"
  assets_export:
    - "Icons (SVG, optimized)"
    - "Images (WebP, multiple resolutions)"
    - "Fonts (WOFF2)"
  css_extraction:
    - "Colors (hex codes)"
    - "Typography (font-family, size, weight, line-height)"
    - "Spacing (margins, paddings em px/rem)"
  component_specs:
    - "States (default, hover, active, disabled)"
    - "Variants (primary button, secondary button)"
    - "Responsive behavior (mobile, tablet, desktop)"
  
- documentation: "Design System Wiki (Notion)"
  contents:
    - "Component guidelines (quando usar cada component)"
    - "Accessibility notes (ARIA labels, keyboard navigation)"
    - "Edge cases (long text, empty states, error states)"
  
- collaboration: "Design review meeting (Sofia + Tiago)"
  frequency: "InÃ­cio de cada sprint"
  agenda:
    - "Sofia: Walkthrough de designs (15min)"
    - "Tiago: Perguntas tÃ©cnicas (feasibility)"
    - "Ambos: Clarify edge cases, animations, interactions"
  output: "Alignment (evita rework durante dev)"
```

---

## ðŸŽ¨ Visual Design Principles

### Color Theory Applications
_Uso estratÃ©gico de cores_

**Exemplo**:
```yaml
- principle: "60-30-10 Rule (color balance)"
  primary_60: "Neutral (branco, cinza claro) - backgrounds"
  secondary_30: "Brand color (azul) - headers, accents"
  accent_10: "High contrast (verde, vermelho) - CTAs, alerts"
  benefit: "Visual hierarchy clara, nÃ£o overwhelming"
  
- principle: "Color Psychology"
  blue: "ConfianÃ§a, profissionalismo (usado em brand)"
  green: "Sucesso, positivo (confirmaÃ§Ãµes, CTAs positivos)"
  red: "UrgÃªncia, erro (alerts, delete actions)"
  yellow: "AtenÃ§Ã£o, warning (avisos nÃ£o crÃ­ticos)"
  
- principle: "Accessibility (color blindness)"
  rule: "Nunca depender APENAS de cor (adicionar Ã­cones/texto)"
  example: "Sucesso = verde + âœ“ Ã­cone, Erro = vermelho + âœ— Ã­cone"
  testing: "Color blindness simulator (Figma plugin)"
```

---

### Typography Hierarchy
_Sistema tipogrÃ¡fico_

**Exemplo**:
```yaml
- scale: "Type Scale (modular, ratio 1.25)"
  h1: "48px (3rem) - Page titles"
  h2: "38px (2.4rem) - Section headers"
  h3: "30px (1.9rem) - Subsections"
  h4: "24px (1.5rem) - Card titles"
  body: "16px (1rem) - Body text"
  small: "14px (0.875rem) - Captions, footnotes"
  
- font_stack:
  primary: "Segoe UI (Fluent UI default)"
  fallback: "Arial, sans-serif"
  monospace: "Consolas, 'Courier New', monospace (code snippets)"
  
- readability_rules:
  - "Line height: 1.5 (body text)"
  - "Line length: 50-75 chars (optimal readability)"
  - "Paragraph spacing: 1.5em (breathing room)"
  - "Contrast: â‰¥4.5:1 (WCAG AA)"
```

---

## ðŸ”„ Iterative Design Process

### Design Critique & Feedback
_Como Sofia recebe e incorpora feedback_

**Exemplo**:
```yaml
- critique_session: "Weekly Design Review"
  participants: "Sofia + Paula (PO) + Maria (Analyst) + Tiago (Dev)"
  format:
    1. "Sofia apresenta designs (5-10min)"
    2. "Silent review (todos anotam feedback - 3min)"
    3. "DiscussÃ£o estruturada (30min)"
  feedback_categories:
    functional: "Fluxo faz sentido? AÃ§Ãµes claras?"
    usability: "UsuÃ¡rio consegue completar task?"
    aesthetic: "Visual apelativo? Brand-aligned?"
    technical: "Feasible? Performance concerns?"
  
- feedback_incorporation:
  high_priority: "Functional issues (blocker - refazer design)"
  medium_priority: "Usability improvements (iterar prÃ³xima versÃ£o)"
  low_priority: "Aesthetic preferences (considerar se alinhado)"
  reject: "Feedback fora do escopo ou contradiz user research"
  
- example_feedback:
  paula_po: "Adicionar filtro por data (business requirement)"
  action: "âœ… Incorporado (high priority - functional)"
  
  tiago_dev: "AnimaÃ§Ã£o complexa demais (performance concern)"
  action: "âœ… Simplificado (high priority - technical)"
  
  maria_analyst: "BotÃ£o verde pode confundir (nÃ£o Ã© aÃ§Ã£o positiva)"
  action: "ðŸŸ¡ A/B test (medium priority - validar com data)"
  
  personal_preference: "Prefiro fonte sans-serif (opiniÃ£o)"
  action: "âŒ Reject (design system usa Segoe UI)"
```

---

## ðŸ”— Cross-References

### Artifacts Relacionados:
- UX Checklist: `${AVANADE_TASK_UX_CHECKLIST}`
- Advanced Elicitation: `${AVANADE_TASK_ADVANCED_ELICITATION}`
- PRD Template: `${AVANADE_PRD_TEMPLATE_YAML}`

### Agent Collaboration:
```yaml
supervisor: ${AVANADE_MEMORY_SUPERVISOR}
analyst: ${AVANADE_MEMORY_ANALYST_MARIA}
po: ${AVANADE_MEMORY_PO_PAULA}
dev: ${AVANADE_MEMORY_DEV_TIAGO}
qa: ${AVANADE_MEMORY_QA_CARLA}
```

---

## ðŸ“Œ Como Usar Esta MemÃ³ria

### âœ… ANTES de design:
1. Consultar **User Personas** â†’ entender usuÃ¡rio-alvo
2. Revisar **User Research Insights** â†’ evitar erros passados
3. Consultar **Design System Patterns** â†’ reutilizar components

### âœ… DURANTE design:
1. Aplicar **Visual Design Principles** â†’ hierarquia, cores, tipografia
2. Seguir **Low-Fi to Hi-Fi Progression** â†’ validar early, iterar
3. Validar **Accessibility Compliance** â†’ WCAG AA checklist

### âœ… PARA handoff:
1. Usar **Design Handoff Process** â†’ assets, specs, documentation
2. Colaborar com Tiago â†’ alignment tÃ©cnico
3. Documentar **Edge Cases** â†’ evitar rework

### âœ… APÃ“S user testing:
1. **Atualizar memÃ³ria** com novos insights
2. Documentar **User Journey Maps** â†’ flows validados
3. Incorporar **Feedback** â†’ continuous improvement

---
