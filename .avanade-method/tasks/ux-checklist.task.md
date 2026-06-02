## Objetivo
Validar design de interfaces contra princÃ­pios de UX, acessibilidade e design systems.

---

## ðŸŽ¨ User Experience (UX) Principles

### 1. User-Centered Design
**CritÃ©rio**: Design serve necessidades reais de usuÃ¡rios, nÃ£o preferÃªncias pessoais

**Checklist**:
- [ ] **User Research**: Personas validadas ou user interviews realizadas
- [ ] **User Journey**: Fluxo mapeado (inÃ­cio ao fim)
- [ ] **Pain Points**: Problemas atuais identificados e endereÃ§ados
- [ ] **Jobs-to-be-Done**: "Quando [situaÃ§Ã£o], quero [aÃ§Ã£o], para que [benefÃ­cio]"
- [ ] **Success Metrics**: Como mediremos sucesso? (conversion, time-on-task, NPS)

**Exemplo**:
```
âŒ Ruim: "BotÃ£o azul porque eu gosto de azul"
âœ… Bom: "BotÃ£o azul porque teste A/B mostrou 12% mais conversÃ£o vs verde"
```

---

### 2. Accessibility (Acessibilidade) - WCAG 2.1 AA
**CritÃ©rio**: Design utilizÃ¡vel por todos, incluindo pessoas com deficiÃªncias

#### â™¿ Checklist WCAG AA

**Visual**:
- [ ] **Contraste**: Texto 4.5:1, UI components 3:1 (usar WebAIM Contrast Checker)
- [ ] **Tamanho de fonte**: MÃ­nimo 16px (body text)
- [ ] **Zoom**: ConteÃºdo legÃ­vel atÃ© 200% zoom sem scroll horizontal
- [ ] **Cor nÃ£o Ã© Ãºnica**: InformaÃ§Ã£o nÃ£o depende apenas de cor (adicionar Ã­cones, texto)

**Keyboard Navigation**:
- [ ] **Tab order**: LÃ³gico e sequencial
- [ ] **Focus indicator**: VisÃ­vel (outline, highlight)
- [ ] **Shortcuts**: Todos controles acessÃ­veis via teclado
- [ ] **Skip links**: "Pular para conteÃºdo principal"

**Screen Readers**:
- [ ] **Alt text**: Todas imagens tÃªm alt descritivo (ou alt="" se decorativa)
- [ ] **ARIA labels**: BotÃµes/links tÃªm labels claros (`aria-label`, `aria-labelledby`)
- [ ] **Landmarks**: `<header>`, `<nav>`, `<main>`, `<footer>`
- [ ] **Headings**: Hierarquia lÃ³gica (H1 â†’ H2 â†’ H3, sem pular nÃ­veis)

**Forms**:
- [ ] **Labels**: Todo input tem `<label>` associado
- [ ] **Error messages**: EspecÃ­ficas ("Email invÃ¡lido" nÃ£o "Erro no campo 3")
- [ ] **Required fields**: Marcados visualmente e com `aria-required`

**Ferramentas de ValidaÃ§Ã£o**:
- axe DevTools (browser extension)
- WAVE (webaim.org/wave)
- Screen reader: NVDA (Windows), VoiceOver (Mac)

**Artifact completo**: ${AVANADE_TASK_ACCESSIBILITY_WCAG}

---

### 3. Usability (Usabilidade) - Nielsen's 10 Heuristics
**CritÃ©rio**: Interface Ã© intuitiva, eficiente, e satisfatÃ³ria

#### ðŸ“‹ 10 HeurÃ­sticas

**1. Visibility of System Status**
- [ ] Loading indicators em operaÃ§Ãµes >1s
- [ ] Feedback visual em aÃ§Ãµes (botÃ£o clicado, item salvo)
- [ ] Progress bars em processos longos

**2. Match Between System and Real World**
- [ ] Linguagem familiar (nÃ£o jargÃ£o tÃ©cnico)
- [ ] MetÃ¡foras do mundo real (Ã­cones reconhecÃ­veis)
- [ ] Ordem lÃ³gica (formulÃ¡rio segue fluxo mental do usuÃ¡rio)

**3. User Control and Freedom**
- [ ] Undo/Redo
- [ ] "Cancelar" em processos longos
- [ ] FÃ¡cil sair de estados indesejados

**4. Consistency and Standards**
- [ ] BotÃµes primÃ¡rios sempre mesma cor/posiÃ§Ã£o
- [ ] Terminologia consistente ("Salvar" vs "Gravar" â†’ escolher 1)
- [ ] Seguir padrÃµes de plataforma (iOS HIG, Material Design, Fluent)

**5. Error Prevention**
- [ ] ValidaÃ§Ã£o inline (nÃ£o sÃ³ no submit)
- [ ] ConfirmaÃ§Ã£o em aÃ§Ãµes destrutivas ("Tem certeza que deseja deletar?")
- [ ] Desabilitar aÃ§Ãµes invÃ¡lidas (botÃ£o "Enviar" desabilitado se formulÃ¡rio incompleto)

**6. Recognition Rather than Recall**
- [ ] OpÃ§Ãµes visÃ­veis (nÃ£o escondidas em menus profundos)
- [ ] Autocomplete em inputs
- [ ] Tooltips em Ã­cones
- [ ] Recently used items

**7. Flexibility and Efficiency of Use**
- [ ] Keyboard shortcuts (Ctrl+S para salvar)
- [ ] AÃ§Ãµes em massa (selecionar mÃºltiplos itens)
- [ ] Templates/presets para usuÃ¡rios avanÃ§ados

**8. Aesthetic and Minimalist Design**
- [ ] Foco no essencial (remove elementos desnecessÃ¡rios)
- [ ] Whitespace adequado (evita sobrecarga visual)
- [ ] Hierarquia visual clara (tamanhos, cores, espaÃ§amento)

**9. Help Users Recognize, Diagnose, and Recover from Errors**
- [ ] Mensagens de erro claras ("Email invÃ¡lido: formato esperado exemplo@dominio.com")
- [ ] SugestÃµes de correÃ§Ã£o ("VocÃª quis dizer: usuario@gmail.com?")
- [ ] Highlight do campo com erro

**10. Help and Documentation**
- [ ] Contextual (ajuda onde usuÃ¡rio precisa, nÃ£o pÃ¡gina separada)
- [ ] BuscÃ¡vel
- [ ] Exemplos visuais (screenshots, vÃ­deos)
- [ ] Concisa

**Artifact completo**: ${AVANADE_TASK_USABILITY_HEURISTICS}

---

### 4. Fluent Design System (Microsoft)
**CritÃ©rio**: Segue padrÃµes do Fluent Design System

**Checklist**:
- [ ] **Typography**: Fluent typefaces (Segoe UI, Roboto)
- [ ] **Colors**: Palette Fluent (Primary, Neutral, Semantic)
- [ ] **Spacing**: 4px/8px grid system
- [ ] **Components**: Usar Fluent UI components (Button, Input, Card, etc.)
- [ ] **Icons**: Fluent Icons library
- [ ] **Motion**: Subtle animations (duraÃ§Ã£o 200-300ms)

**Resources**:
- Fluent UI: fluent2.microsoft.design
- Fluent Icons: aka.ms/fluentui-icons
- Color tokens: ${AVANADE_FLUENT_DESIGN_GUIDELINES}

**Componentes ObrigatÃ³rios**:
- **Buttons**: Primary, Secondary, Tertiary hierarchy
- **Forms**: Input, Select, Checkbox, Radio
- **Feedback**: Toast, Dialog, Progress
- **Navigation**: Navbar, Tabs, Breadcrumb

---

### 5. Responsive Design
**CritÃ©rio**: Design funciona em todos dispositivos/tamanhos de tela

**Breakpoints** (Fluent):
- Mobile: <640px
- Tablet: 640px - 1024px
- Desktop: >1024px

**Checklist**:
- [ ] **Mobile-first**: Design comeÃ§a em mobile, expande para desktop
- [ ] **Touch targets**: MÃ­nimo 44x44px (iOS) ou 48x48px (Android)
- [ ] **Readable text**: Sem zoom necessÃ¡rio
- [ ] **Navigation**: Hamburger menu em mobile, navbar em desktop
- [ ] **Tables**: Responsivas (scroll horizontal ou cards em mobile)
- [ ] **Images**: Responsive (`max-width: 100%`)

**Teste**:
- Chrome DevTools (device emulation)
- Dispositivos reais (iPhone, Android, iPad)

---

### 6. Performance (Perceived Performance)
**CritÃ©rio**: Interface **parece** rÃ¡pida mesmo se backend Ã© lento

**Checklist**:
- [ ] **Skeleton screens**: Placeholders enquanto carrega
- [ ] **Optimistic UI**: Atualizar UI imediatamente (assumindo sucesso)
- [ ] **Progressive loading**: Mostrar conteÃºdo Ã  medida que carrega
- [ ] **Lazy loading**: Imagens/componentes fora da viewport carregam depois
- [ ] **Debounce**: Search input nÃ£o dispara request a cada tecla

**Exemplos**:
```
âŒ Ruim: Loading spinner por 5s
âœ… Bom: Skeleton screen mostra estrutura enquanto carrega dados

âŒ Ruim: BotÃ£o "Curtir" espera resposta da API para mudar
âœ… Bom: BotÃ£o muda imediatamente (optimistic), reverte se API falhar
```

---

## ðŸ“Š Scoring System

**PontuaÃ§Ã£o por categoria** (0-5):
- User-Centered Design: /5
- Accessibility (WCAG AA): /5
- Usability (Nielsen): /5
- Fluent Design System: /5
- Responsive Design: /5
- Performance: /5

**Total: /30**

**InterpretaÃ§Ã£o**:
- **25-30**: âœ… Excelente UX - Production-Ready
- **20-24**: ðŸŸ¢ Boa UX - Melhorias menores
- **15-19**: ðŸŸ¡ UX Adequada - Revisar gaps
- **10-14**: ðŸŸ  UX ProblemÃ¡tica - Refazer partes
- **0-9**: ðŸ”´ UX Inadequada - Redesign necessÃ¡rio

---

## ðŸŽ¯ Deliverables (Artefatos de Design)

### Wireframes
- [ ] Low-fi (sketches, papel)
- [ ] Mid-fi (Figma/Sketch, estrutura clara)
- [ ] High-fi (mockups finais com visual design)

### Prototypes
- [ ] Clickable prototype (InVision, Figma)
- [ ] Interactions documentadas (hover, click, transitions)

### Design Specs
- [ ] Component library (Storybook, Figma)
- [ ] Spacing/sizing (margins, paddings, font sizes)
- [ ] Colors/typography
- [ ] Responsive breakpoints

### User Flows
- [ ] User journey maps
- [ ] Task flows (diagrama de fluxo)
- [ ] Edge cases documentados

### Accessibility Report
- [ ] WCAG checklist completo
- [ ] Screen reader testing notes
- [ ] Keyboard navigation validation

---

## ðŸ”— IntegraÃ§Ã£o com Metodologia Avanade

- **PrÃ©-requisito**: Requirements/User Stories definidas
- **ValidaÃ§Ã£o UX**: ${AVANADE_TASK_USABILITY_HEURISTICS}
- **ValidaÃ§Ã£o Acessibilidade**: ${AVANADE_TASK_ACCESSIBILITY_WCAG}
- **ValidaÃ§Ã£o Adversarial**: ${AVANADE_TASK_ADVERSARIAL_REVIEW}
- **Template**: ${AVANADE_WIREFRAME_TEMPLATE}
- **MemÃ³ria**: ${AVANADE_MEMORY_UX_SOFIA}


