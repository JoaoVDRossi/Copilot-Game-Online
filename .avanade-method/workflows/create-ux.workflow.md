## ðŸ“‹ O que Ã© este Workflow?

O **create-ux-design** Ã© um workflow Avanade Method v6 bi-modal que planeja a experiÃªncia do usuÃ¡rio ANTES de implementaÃ§Ã£o. Substitui wireframes isolados por **design system thinking** - patterns, journeys, e princÃ­pios reutilizÃ¡veis.

**Filosofia**: "UX planning nÃ£o Ã© Figma files - Ã© design decisions documentadas que guiam implementation"

---

## ðŸŽ¯ Quando Usar?

### âœ… Use create-ux-design quando:
- **UI-heavy project** (web apps, mobile apps, dashboards)
- **PRD criado** e precisa traduzir requirements em experiÃªncia
- **Design system** precisa ser definido (cores, typography, spacing, components)
- **User journeys** complexas que precisam ser mapeadas
- **Accessibility** Ã© requirement (WCAG compliance precisa ser planejado)
- **Responsive design** precisa ser pensado desde inÃ­cio

### âŒ NÃƒO use quando:
- **Backend API/service** sem UI (nÃ£o hÃ¡ experiÃªncia visual)
- **CLI tool** simples (UX Ã© command structure, nÃ£o visual design)
- **UX jÃ¡ existe** e estÃ¡ documentado (pode validar com VALIDATE mode)
- **Projeto muito simples** (<1 dia de dev, use quick-dev)

---

## ðŸ”„ Workflow Process - CREATE Mode (14 Steps)

### STEP 1: init
**Objetivo**: Detectar continuaÃ§Ã£o ou novo UX design
**AÃ§Ãµes**:
- Perguntar: "Criar novo UX design ou continuar existente?"
- Se existente: Carregar `{planning_artifacts}/ux-design.md`
- Se novo: Inicializar template vazio
- Configurar modo: CREATE (novo design) ou VALIDATE (review existente)

**Output**: UX design template ou design existente carregado

---

### STEP 2: discovery (PRD Context & UI Scope)
**Objetivo**: Carregar PRD e entender escopo de UI
**Descoberta Guiada**:
```yaml
Perguntas Facilitadoras:
1. "Qual PRD este UX design implementa?"
   â†’ Carregar PRD para contexto de requirements
2. "Quais sÃ£o as UI surfaces principais?"
   â†’ Web app? Mobile? Desktop? Dashboard? MÃºltiplos?
3. "Quem sÃ£o as user personas primÃ¡rias?"
   â†’ Do PRD - quais personas usarÃ£o a UI
4. "Quais sÃ£o as user journeys crÃ­ticas?"
   â†’ Top 3-5 journeys que UX deve otimizar
```

**ValidaÃ§Ã£o**: PRD carregado? UI surfaces claras? User personas identificadas?

---

### STEP 3: core-experience (Define Core Experience)
**Objetivo**: Articular a experiÃªncia central que queremos criar
**Descoberta Guiada**:
```yaml
Perguntas Facilitadoras:
1. "Qual Ã© a experiÃªncia CORE que este produto cria?"
   â†’ 1-2 frases - ex: "Effortless data export com 2 cliques"
2. "Qual a primeira impressÃ£o que usuÃ¡rio deve ter?"
   â†’ Visual tone - professional, playful, minimal, etc
3. "Qual a complexidade aceitÃ¡vel?"
   â†’ Simple (consumer), moderate (business), complex (enterprise)
4. "Qual a frequÃªncia de uso?"
   â†’ Daily (precisa ser ultra-familiar), occasional (precisa ser self-explanatory)
```

**DocumentaÃ§Ã£o**:
```markdown
## Core Experience

### Experience Vision
[1-2 frases sobre experiÃªncia que queremos criar]
Ex: "Export de relatÃ³rios deve ser tÃ£o simples quanto enviar um email - 
2 cliques, sem configuraÃ§Ã£o complexa, resultados imediatos"

### Design Principles
1. **Principle 1**: [ex: "Clarity over cleverness"]
   - Rationale: [Por que este princÃ­pio]
   - Application: [Como aplicar no design]

2. **Principle 2**: [ex: "Progressive disclosure"]
   - Rationale: [Mostrar complexidade sÃ³ quando necessÃ¡rio]
   - Application: [Advanced options em segundo nÃ­vel]

### Complexity Level
- Target: [Simple | Moderate | Complex]
- Usage Frequency: [Daily | Weekly | Occasional]
- User Expertise: [Novice | Intermediate | Expert]
```

---

### STEP 4: emotional-response (Emotional Design Goals)
**Objetivo**: Definir resposta emocional desejada
**Descoberta Guiada**:
```yaml
Perguntas Facilitadoras:
1. "Como usuÃ¡rio deve SE SENTIR ao usar o produto?"
   â†’ Confiante, no controle, eficiente, delighted
2. "Quais emoÃ§Ãµes EVITAR?"
   â†’ Confused, overwhelmed, frustrated, anxious
3. "Qual tom de voz do produto?"
   â†’ Professional, friendly, playful, authoritative
```

**DocumentaÃ§Ã£o**:
```markdown
## Emotional Design

### Desired Emotions
- **Primary**: [ex: "Confident - usuÃ¡rio sente controle sobre exports"]
- **Secondary**: [ex: "Efficient - sem friction, resultados rÃ¡pidos"]

### Emotions to Avoid
- [ex: "Overwhelmed - por complexidade desnecessÃ¡ria"]
- [ex: "Anxious - sobre se export funcionou corretamente"]

### Tone of Voice
- [ex: "Professional yet friendly - claro sem ser frio"]
```

---

### STEP 5: inspiration (Visual Inspiration & References)
**Objetivo**: Coletar referÃªncias visuais e patterns
**Descoberta Guiada**:
```yaml
Perguntas Facilitadoras:
1. "Quais produtos tÃªm UX que admira (mesma categoria)?"
   â†’ Competitors, similares, benchmarks
2. "Quais UI patterns desses produtos funcionam bem?"
   â†’ Specific patterns - nÃ£o copiar tudo, cherry-pick
3. "HÃ¡ brand guidelines ou design language existente?"
   â†’ Company branding, design system herdado
```

**DocumentaÃ§Ã£o**:
```markdown
## Visual Inspiration

### Reference Products
1. **[Product Name]**: [URL]
   - What works: [Specific pattern - ex: "One-click export button"]
   - Adapt for us: [Como aplicar - ex: "Simplificar nosso multi-step wizard"]

### UI Patterns to Consider
- [Pattern 1 - ex: "Dashboard with card-based layout"]
- [Pattern 2 - ex: "Inline editing (nÃ£o modal dialogs)"]
- [Pattern 3 - ex: "Progressive disclosure for advanced options"]

### Brand Guidelines
- Existing design system: [Nome/link se existe]
- Colors: [Se hÃ¡ paleta definida]
- Typography: [Se hÃ¡ font family obrigatÃ³ria]
```

---

### STEP 6: design-system (Choose/Define Design System)
**Objetivo**: Escolher design system foundation
**Descoberta Guiada**:
```yaml
Perguntas Facilitadoras:
1. "Usar design system existente ou criar custom?"
   â†’ Fluent (Microsoft), Material (Google), Bootstrap, Custom
2. "Se existente, qual design system?"
   â†’ Avaliar fit com brand, tech stack, team expertise
3. "Quais customizaÃ§Ãµes sÃ£o necessÃ¡rias?"
   â†’ Brand colors, custom components, theme overrides
```

**DocumentaÃ§Ã£o**:
```markdown
## Design System

### Foundation
- **Design System**: [ex: "Microsoft Fluent 2"]
  - Rationale: [Por que escolher - ex: "Azure integration, accessibility built-in"]
  - Version: [ex: "Fluent UI React v9"]

### Customizations
- **Color Palette**: 
  - Primary: [#hex] (brand color)
  - Secondary: [#hex]
  - Success/Warning/Error: [#hex, #hex, #hex]
  
- **Typography**:
  - Headings: [Font family, sizes]
  - Body: [Font family, sizes]
  - Code: [Monospace font]

- **Spacing Scale**:
  - Base unit: [ex: 4px or 8px]
  - Scale: [4, 8, 12, 16, 24, 32, 48, 64]

- **Custom Components**:
  - [Component 1 - ex: "Data grid com inline editing"]
  - [Component 2 - ex: "Export status toast notifications"]
```

**ReferÃªncia**: ${AVANADE_FLUENT_DESIGN_GUIDELINES} para Fluent guidelines completos

---

### STEP 7: defining-experience (Map Key Screens/Views)
**Objetivo**: Identificar screens/views principais
**Descoberta Guiada**:
```yaml
Perguntas Facilitadoras:
1. "Quais sÃ£o as screens/views principais?"
   â†’ Listar top-level navigation structure
2. "Qual a hierarquia de navegaÃ§Ã£o?"
   â†’ Parent-child relationships, breadcrumbs
3. "Qual screen Ã© entry point (landing)?"
   â†’ Onde usuÃ¡rio chega primeiro
```

**DocumentaÃ§Ã£o**:
```markdown
## Screen/View Structure

### Navigation Hierarchy
```
Home/Dashboard
â”œâ”€â”€ Reports
â”‚   â”œâ”€â”€ My Reports
â”‚   â”œâ”€â”€ Shared Reports
â”‚   â””â”€â”€ Templates
â”œâ”€â”€ Export
â”‚   â”œâ”€â”€ New Export
â”‚   â”œâ”€â”€ Scheduled Exports
â”‚   â””â”€â”€ Export History
â””â”€â”€ Settings
    â”œâ”€â”€ User Preferences
    â””â”€â”€ Integrations
```

### Key Screens
1. **Dashboard** (Landing)
   - Purpose: Overview de exports recentes, quick actions
   - Key Elements: Recent exports card, "New Export" CTA, stats widgets
   
2. **New Export**
   - Purpose: Configurar e executar export
   - Key Elements: Data source selector, format options, preview, execute button

3. **Export History**
   - Purpose: Ver histÃ³rico, re-run, download
   - Key Elements: Data grid, filters, status indicators, actions
```

---

### STEP 8: visual-foundation (Visual Style Decisions)
**Objetivo**: Definir estilo visual high-level
**Descoberta Guiada**:
```yaml
Perguntas Facilitadoras:
1. "Estilo visual: minimal, rich, ou data-dense?"
   â†’ Minimal (consumer), rich (marketing), data-dense (enterprise)
2. "Uso de iconografia?"
   â†’ Icon-heavy (self-explanatory), text-heavy (explicit), balanced
3. "Whitespace philosophy?"
   â†’ Generous spacing (luxury feel), compact (fit more data)
```

**DocumentaÃ§Ã£o**:
```markdown
## Visual Style

### Style Direction
- **Overall**: [ex: "Data-dense enterprise - maximize information density"]
- **Whitespace**: [ex: "Moderate - balance readability vs screen real estate"]
- **Iconography**: [ex: "Balanced - icons + text labels for clarity"]

### Visual Decisions
- **Cards vs Lists**: [Decision - ex: "Lists for data tables, cards for dashboards"]
- **Modals vs Inline**: [Decision - ex: "Prefer inline editing over modals"]
- **Animations**: [Decision - ex: "Subtle transitions (200ms), no gratuitous effects"]
```

---

### STEP 9: design-directions (Explore Design Variations)
**Objetivo**: Explorar 2-3 direÃ§Ãµes visuais
**AÃ§Ãµes**:
- NÃ£o criar wireframes completos - descrever visual directions
- Focar em decisÃµes de layout e pattern choices
- 2-3 options para discussÃ£o com stakeholders

**DocumentaÃ§Ã£o**:
```markdown
## Design Directions (Options to Discuss)

### Option A: "Single-Page Dashboard"
- Layout: All-in-one dashboard com tabs para diferentes views
- Navigation: Horizontal tabs no topo
- Pros: Less clicking, all info accessible
- Cons: Pode ficar overwhelming para novice users

### Option B: "Multi-Page Wizard"
- Layout: Dedicated pages para cada major function
- Navigation: Sidebar navigation
- Pros: Clear separation, progressive disclosure
- Cons: More clicks entre functions

### Option C: "Hybrid"
- Layout: Dashboard landing + drill-down pages
- Navigation: Top nav bar + contextual sidebar
- Pros: Best of both - overview + detail
- Cons: More complex navigation structure

**Recommendation**: [Qual option e por quÃª]
```

---

### STEP 10: user-journeys (Map User Journeys to UI)
**Objetivo**: Traduzir user journeys em UI flows
**Descoberta Guiada**:
```yaml
Para cada user journey crÃ­tica do PRD:
1. "Quais screens usuÃ¡rio navega?"
2. "Quais actions em cada screen?"
3. "Quais decision points?"
4. "Onde pode haver friction/errors?"
```

**DocumentaÃ§Ã£o**:
```markdown
## User Journey Flows

### Journey 1: "Export Monthly Report"
**Goal**: Financial analyst exporta relatÃ³rio consolidado mensal

**UI Flow**:
1. **Dashboard** â†’ Click "New Export" CTA
2. **New Export - Step 1**: Select data source (dropdown)
   - Options: ERP, CRM, Custom Query
   - Selection: ERP
3. **New Export - Step 2**: Choose format (radio buttons)
   - Options: Excel, PDF, CSV
   - Selection: Excel
4. **New Export - Step 3**: Preview data (table)
   - Action: Review data is correct
   - Option: "Edit query" if wrong
5. **New Export - Step 4**: Execute
   - Click "Export Now" button
   - Progress indicator (spinner + %)
6. **Completion**: Success toast + download link
   - Toast: "Export ready! Click to download"
   - Action: Click toast â†’ download file

**Friction Points**:
- Step 3 preview might be slow for large datasets â†’ Need loading state
- Step 6 download might fail â†’ Need error handling + retry

**Accessibility Notes**:
- All steps keyboard navigable
- Screen reader announces each step
- Progress indicator has aria-live region
```

---

### STEP 11: component-strategy (Component Library Planning)
**Objetivo**: Listar components que precisam ser criados/customizados
**Descoberta Guiada**:
```yaml
Perguntas Facilitadoras:
1. "Quais components do design system usaremos as-is?"
   â†’ Buttons, inputs, cards, etc (80% devem ser standard)
2. "Quais components precisam customizaÃ§Ã£o?"
   â†’ Branding, specific behaviors
3. "Quais components sÃ£o custom/new?"
   â†’ Domain-specific (ex: export configurator)
```

**DocumentaÃ§Ã£o**:
```markdown
## Component Strategy

### Standard Components (Use As-Is)
From Fluent UI:
- Button, Input, Dropdown, Checkbox, Radio
- Card, Dialog, Toast, Progress Bar
- Table, Pagination
- Navigation (Tabs, Breadcrumb)

### Customized Components
- **Button**: Apply brand primary color
- **Card**: Custom shadow and border radius
- **Table**: Add inline editing capability

### Custom Components (Build New)
1. **ExportConfigurator**
   - Purpose: Multi-step wizard para configurar exports
   - Complexity: High
   - Components used: Stepper (custom) + standard inputs

2. **ExportStatusTracker**
   - Purpose: Live progress de exports em background
   - Complexity: Medium
   - Components used: Progress bar + toast notifications

3. **DataPreviewGrid**
   - Purpose: Preview de dados antes de export
   - Complexity: Medium
   - Components used: Table + virtualization para performance
```

**ReferÃªncia**: ${AVANADE_FLUENT_DESIGN_GUIDELINES} para component specs

---

### STEP 12: ux-patterns (Document UX Patterns)
**Objetivo**: Documentar patterns reutilizÃ¡veis
**DocumentaÃ§Ã£o**:
```markdown
## UX Patterns

### Pattern 1: Empty States
**When**: Lista vazia (ex: no exports yet)
**Implementation**:
- Illustration (optional)
- Message: "No exports yet"
- CTA: "Create your first export" button
**Accessibility**: Button keyboard focusable

### Pattern 2: Loading States
**When**: Async operations (data loading, export processing)
**Implementation**:
- Skeleton screens for initial load
- Progress bars for operations with known duration
- Spinners for indeterminate operations
**Accessibility**: aria-live="polite" announcements

### Pattern 3: Error Handling
**When**: Operation fails (export error, network issue)
**Implementation**:
- Toast notification with error message
- Retry action available
- Detailed error in dedicated error panel (optional)
**Accessibility**: Error announced via aria-live="assertive"

### Pattern 4: Form Validation
**When**: User input validation (export configuration)
**Implementation**:
- Inline validation (on blur)
- Error messages below field
- Disabled submit until valid
**Accessibility**: aria-invalid + aria-describedby for errors
```

---

### STEP 13: responsive-accessibility (Responsive & Accessibility)
**Objetivo**: Definir estratÃ©gia responsive e accessibility
**Descoberta Guiada**:
```yaml
Perguntas Facilitadoras:
1. "Quais breakpoints suportamos?"
   â†’ Mobile (320px), tablet (768px), desktop (1024px+)
2. "Mobile Ã© first-class ou degraded experience?"
   â†’ Full-featured ou limited functionality
3. "WCAG level alvo?"
   â†’ A, AA (recomendado), ou AAA
```

**DocumentaÃ§Ã£o**:
```markdown
## Responsive Design

### Breakpoints
- **Mobile**: 320px - 767px
  - Stack layouts vertically
  - Hamburger menu for navigation
  - Simplified data tables (collapse columns)
  
- **Tablet**: 768px - 1023px
  - 2-column layouts
  - Sidebar navigation
  - Full tables with horizontal scroll
  
- **Desktop**: 1024px+
  - Multi-column layouts
  - Persistent sidebar
  - Full-featured tables

### Mobile Strategy
- **Approach**: [Progressive enhancement | Mobile-first | Responsive]
- **Features**: [Full feature parity | Core features only]

---

## Accessibility (WCAG 2.1 AA)

### Color Contrast
- Text: 4.5:1 contrast ratio
- UI components: 3:1 contrast ratio
- Test tool: [ex: "Axe DevTools"]

### Keyboard Navigation
- All interactive elements keyboard accessible (Tab order logical)
- Focus indicators visible (2px outline)
- Skip links for main content

### Screen Reader Support
- Semantic HTML (nav, main, article, etc)
- ARIA labels para interactive elements
- ARIA live regions para dynamic content
- Alt text para todas imagens

### Testing Strategy
- Automated: Axe, Lighthouse accessibility audit
- Manual: Keyboard-only navigation, screen reader (NVDA/JAWS)
- User testing: Include users with disabilities se possÃ­vel
```

**ReferÃªncia**: ${AVANADE_TASK_DOC_ACCESSIBILITY} para WCAG checklist completo

---

### STEP 14: complete (Finalize UX Design & Next Steps)
**Objetivo**: Finalizar UX design document e sugerir prÃ³ximos workflows
**AÃ§Ãµes**:
1. **Review Completeness**: Todas seÃ§Ãµes preenchidas?
2. **Generate Summary**: Resumo executivo do UX design
3. **Save UX Design**: Salvar `{planning_artifacts}/ux-design.md`
4. **Suggest Next Steps**:
   ```yaml
   PrÃ³ximos Workflows Recomendados:
   - create-architecture (se ainda nÃ£o criado) â†’ Arquitetura precisa considerar UX decisions
   - create-epics-and-stories â†’ Transformar UX design em stories implementÃ¡veis
   - validate-ux-design â†’ Review UX design com stakeholders/users
   ```

**Output Final**: `{planning_artifacts}/ux-design.md` completo

---

## ðŸ”„ Workflow Process - VALIDATE Mode

### O que Ã© VALIDATE Mode?

Valida UX design existente contra padrÃµes Avanade Method e best practices.

### Validation Dimensions (8 checks):

```yaml
check-01: Completeness
  - Todas seÃ§Ãµes obrigatÃ³rias preenchidas?
  - User journeys cobrem flows crÃ­ticos?

check-02: PRD Alignment
  - UX design implementa requirements do PRD?
  - User journeys mapeiam para PRD journeys?

check-03: Design System Consistency
  - Design system escolhido estÃ¡ claro?
  - Components mapeados corretamente?

check-04: Accessibility Compliance
  - WCAG 2.1 AA considerations documentadas?
  - Keyboard navigation planejada?

check-05: Responsive Strategy
  - Breakpoints definidos?
  - Mobile strategy clara (full/limited features)?

check-06: Component Feasibility
  - Custom components sÃ£o realmente necessÃ¡rios?
  - Complexidade Ã© realista para timeline?

check-07: User Journey Completeness
  - Friction points identificados?
  - Error states planejados?

check-08: Documentation Quality
  - Clarity: Desenvolvedor consegue implementar baseado neste doc?
  - Examples: Enough detail sem over-specification?
```

**Output**: `{planning_artifacts}/ux-validation-report.md`

---

## ðŸ“Š OUTPUT FORMAT

### UX Design Document Structure

```markdown
# UX Design: [Nome do Projeto]

**Created**: [Date]  
**Author**: Sofia UX  
**PRD Reference**: [PRD file]  
**Status**: Draft | In Review | Approved

---

## Executive Summary
[2-3 parÃ¡grafos: core experience, design system, key decisions]

---

## Core Experience
[Vision, principles, complexity level]

## Emotional Design
[Desired emotions, tone of voice]

## Design System
[Foundation, customizations, component strategy]

## Screen Structure
[Navigation hierarchy, key screens]

## User Journey Flows
[Cada journey mapeada para UI flows]

## UX Patterns
[Reusable patterns: empty states, loading, errors, etc]

## Responsive Design
[Breakpoints, mobile strategy]

## Accessibility
[WCAG compliance strategy]

---

## Next Steps
1. [Recommended workflow]
2. [Wireframe creation - opcional]
3. [Architecture alignment]
```

---

## ðŸ”— Integration Points

### Prerequisites (Required):
- **PRD** (obrigatÃ³rio) â†’ `create-prd` output
  - UX design traduz PRD requirements em experiÃªncia
  - User journeys do PRD guiam UI journeys

### Prerequisites (Recommended):
- **Product Brief** (opcional) â†’ Contexto de visÃ£o
- **Research** (se UX unknowns) â†’ User research, usability benchmarks

### Next Steps (Recommended):
1. **create-architecture** â†’ Arquitetura deve considerar UX decisions (ex: real-time updates, offline support)
2. **create-epics-and-stories** â†’ UX design alimenta breakdown de stories (features + UX patterns)
3. **wireframe creation** (opcional, fora Avanade Method) â†’ Figma/Sketch wireframes baseados neste design

### Artifact Dependencies:
- **Reads**: PRD (`prd-{project}.md`)
- **Creates**: UX Design (`ux-design.md`)
- **Referenced by**: Architecture, Epics & Stories

---

## âœ… Best Practices

### DO:
- âœ… **Start from PRD** - UX design implementa requirements, nÃ£o inventa features
- âœ… **Design system over custom** - Usar 80% de design system, custom sÃ³ quando necessÃ¡rio
- âœ… **Accessibility upfront** - Planejar WCAG desde inÃ­cio, nÃ£o retrofitar
- âœ… **Mobile strategy clara** - Decidir se mobile Ã© full-featured ou limited
- âœ… **Document patterns** - Empty states, loading, errors devem ser consistentes
- âœ… **User journey focus** - UX otimiza journeys, nÃ£o screens isoladas
- âœ… **Friction points** - Identificar onde usuÃ¡rio pode travar/errar

### DON'T:
- âŒ **NÃ£o pixel-perfect** - UX design Ã© decisÃµes, nÃ£o mockups detalhados
- âŒ **NÃ£o criar wireframes aqui** - Este workflow documenta patterns, nÃ£o Figma files
- âŒ **NÃ£o ignorar PRD** - UX deve implementar requirements, nÃ£o ser criativo demais
- âŒ **NÃ£o custom components desnecessÃ¡rios** - Se design system tem, use
- âŒ **NÃ£o pular accessibility** - WCAG nÃ£o Ã© "nice to have"
- âŒ **NÃ£o over-specify** - Developers precisam de flexibility para implementar

---

## ðŸš¨ Common Pitfalls

### Pitfall 1: **UX Design Becomes Wireframe Catalog**
**Sintoma**: UX design tem 50 screenshots de Figma mockups  
**Problema**: Wireframes mudam, doc fica desatualizado. Focus deve ser patterns e decisions  
**SoluÃ§Ã£o**: Documentar DECISIONS (ex: "Use cards for dashboard, tables for data"), nÃ£o screenshots

### Pitfall 2: **Custom Components Over-Engineering**
**Sintoma**: "Precisamos custom datepicker, custom dropdown, custom table"  
**Problema**: Reinventar wheel, accessibility bugs, maintenance burden  
**SoluÃ§Ã£o**: Use design system 80% do tempo. Custom sÃ³ se REALMENTE necessÃ¡rio

### Pitfall 3: **Ignoring Mobile**
**Sintoma**: "Design desktop-first, depois adaptamos mobile"  
**Problema**: Mobile vira afterthought, features nÃ£o funcionam bem  
**SoluÃ§Ã£o**: Definir mobile strategy upfront - full-featured ou limited?

### Pitfall 4: **Accessibility Retrofit**
**Sintoma**: "Adicionaremos accessibility depois"  
**Problema**: Retrofitar WCAG Ã© 10x mais caro que planejar desde inÃ­cio  
**SoluÃ§Ã£o**: Accessibility em STEP 13 Ã© obrigatÃ³rio - keyboard nav, screen readers, contrast

---

## ðŸ’¡ Examples

### Example: Good Component Strategy

**GOOD** âœ…:
```markdown
## Component Strategy

### Standard Components (Use As-Is)
- Button, Input, Dropdown (Fluent UI defaults)
- Table (Fluent UI DetailsList)
- Card (Fluent UI Card)

### Custom Components
1. **ExportConfigurator** (NEW)
   - Why custom: Domain-specific, complex wizard flow
   - Complexity: High (multi-step with validation)
   - Uses: Stepper (custom) + Fluent inputs
   
2. **LiveExportStatus** (NEW)
   - Why custom: Real-time progress tracking
   - Complexity: Medium (WebSocket integration)
   - Uses: Fluent Progress + Toast
```

**BAD** âŒ:
```markdown
## Components
We'll build custom: buttons, inputs, dropdowns, tables, cards, modals, toasts
```
**Por que BAD**: Reinventando wheel. Design systems existem exatamente para evitar isso.

---

## ðŸ“– References

- **Avanade Method Workflow Path**: `_avanade-method/bmm/workflows/2-plan-workflows/create-ux-design/`
- **Workflow Manifest Entry**: `workflow-manifest.csv` line 10
- **Command**: `avanade-method-bmm-create-ux-design` (CREATE), `avanade-method-bmm-validate-ux-design` (VALIDATE)
- **Owner Agent**: Sofia UX
