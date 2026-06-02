## ðŸ“‹ O que Ã© este Artefato?

Este Ã© o **framework de priorizaÃ§Ã£o RICE** usado na Avanade Method para tomar decisÃµes objetivas sobre o que construir primeiro. RICE combina:
- **R**each: Quantas pessoas/usuÃ¡rios impacta por perÃ­odo?
- **I**mpact: QuÃ£o significativo Ã© o impacto por usuÃ¡rio?
- **C**onfidence: Qual nosso nÃ­vel de certeza sobre Reach/Impact/Effort?
- **E**ffort: Quanto tempo/recursos necessÃ¡rios?

**FÃ³rmula**: `RICE Score = (Reach Ã— Impact Ã— Confidence) / Effort`

---

## ðŸŽ¯ Quando Usar

### âœ… USE para:
- Priorizar features no backlog (P0 vs P1 vs P2)
- Decidir entre mÃºltiplas iniciativas competindo por recursos
- Validar se "hot request" de stakeholder merece prioridade imediata
- Comunicar decisÃµes de priorizaÃ§Ã£o de forma objetiva
- Roadmap planning (O que vai em Q1 vs Q2 vs Q3?)

### âŒ NÃƒO USE para:
- Bugs crÃ­ticos de produÃ§Ã£o (P0 sempre, sem RICE)
- Compliance requirements (obrigatÃ³rios, sem escolha)
- DecisÃµes estratÃ©gicas top-down (CEO mandates)
- Features jÃ¡ comprometidas com clientes enterprise

---

## ðŸ“Š Como Calcular RICE Score

### Step 1: Estimar REACH (Quantas pessoas por perÃ­odo)

**DefiniÃ§Ã£o**: Quantos usuÃ¡rios/customers serÃ£o impactados pelo feature no perÃ­odo de tempo escolhido (geralmente quarter)?

**Fontes de dados:**
- Analytics (MAU, DAU)
- Customer surveys
- Sales data
- User segmentation

**Exemplos:**
```yaml
feature: "Export Automation"
reach:
  calculation: "100 enterprise customers Ã— 5 users/customer = 500 users/quarter"
  source: "Salesforce customer data + usage analytics"
  value: 500

feature: "Dark Mode"
reach:
  calculation: "10,000 MAU Ã— 60% interested (survey) = 6,000 users/quarter"
  source: "User survey (n=500, 60% said 'would use dark mode')"
  value: 6000

feature: "Admin Dashboard Redesign"
reach:
  calculation: "50 admin users total (all would use)"
  source: "User role analytics"
  value: 50
```

**âš ï¸ Importante**: Escolha perÃ­odo consistente (month vs quarter vs year). **Recomendado: quarter** para balancear short-term e long-term.

---

### Step 2: Estimar IMPACT (Qual tamanho do impacto por usuÃ¡rio)

**DefiniÃ§Ã£o**: Quanto cada usuÃ¡rio individual se beneficia? Escala de 0.25 a 3:

| Score | Label    | DescriÃ§Ã£o | Exemplo |
|-------|----------|-----------|---------|
| **3** | Massive  | Muda completamente como usuÃ¡rio trabalha, game-changer | AutomaÃ§Ã£o que elimina 2h/dia de trabalho manual |
| **2** | High     | Melhoria significativa, usuÃ¡rio nota claramente | Reduz tarefa de 30min para 5min |
| **1** | Medium   | Melhoria moderada, usuÃ¡rio percebe mas nÃ£o Ã© transformador | Adiciona atalho de teclado Ãºtil |
| **0.5** | Low    | Pequena melhoria, "nice to have" | Tooltip mais descritivo |
| **0.25** | Minimal | Quase imperceptÃ­vel, polimento | Ajuste de padding de 8px para 12px |

**Exemplos prÃ¡ticos:**
```yaml
feature: "Export Automation"
impact:
  score: 3  # Massive
  reasoning: |
    Reduz 1.8h/dia de trabalho manual para 15min.
    Elimina 40% error rate (dados crÃ­ticos).
    ROI mensurÃ¡vel: $120k/ano em time savings.
  source: "User interviews (n=12), time tracking data"

feature: "Dark Mode"
impact:
  score: 0.5  # Low
  reasoning: |
    PreferÃªncia estÃ©tica, nÃ£o melhora produtividade.
    Reduz eyestrain para alguns usuÃ¡rios (hard to quantify).
  source: "User survey feedback"

feature: "Real-time Collaboration (Google Docs-like)"
impact:
  score: 2  # High
  reasoning: |
    Elimina back-and-forth de emails/Slack para ediÃ§Ã£o.
    Reduz conflitos de versÃ£o de 30% para <5%.
  source: "Benchmark de competidores + user pain points"
```

**Dica**: Se em dÃºvida entre dois scores, escolha o menor (conservative estimate).

---

### Step 3: Estimar CONFIDENCE (Certeza sobre Reach/Impact/Effort)

**DefiniÃ§Ã£o**: QuÃ£o confiantes estamos nos dados de Reach, Impact e Effort? Escala de 0% a 100%:

| Score | Label | Quando Usar |
|-------|-------|-------------|
| **100%** | High Confidence | Dados sÃ³lidos (analytics, A/B tests, produÃ§Ã£o) |
| **80%** | Medium Confidence | Pesquisa qualitativa boa (interviews, surveys n>50) |
| **50%** | Low Confidence | Assumptions educadas, dados limitados |

**Exemplos:**
```yaml
feature: "Export Automation"
confidence:
  score: 80%  # Medium-High
  reasoning: |
    Reach: 100% (dados exatos de Salesforce)
    Impact: 80% (time tracking + interviews, nÃ£o A/B test)
    Effort: 70% (estimativa de engineering, nÃ£o prototipado)
    Average: 83% â†’ round to 80%
  data_quality:
    reach: "High (exact analytics)"
    impact: "Medium (user research, no A/B test)"
    effort: "Medium (estimation, no spike)"

feature: "AI-Powered Recommendations"
confidence:
  score: 50%  # Low
  reasoning: |
    Reach: 80% (analytics sÃ³lidos)
    Impact: 30% (nÃ£o sabemos se usuÃ¡rios confiarÃ£o em AI)
    Effort: 40% (nova tecnologia, muitas unknowns)
    Average: 50%
  data_quality:
    reach: "High"
    impact: "Low (hypothesis nÃ£o validada)"
    effort: "Low (technical spike needed)"
```

**Red flags para LOW confidence (<50%):**
- ðŸš© Nenhuma user research feita
- ðŸš© Tecnologia nova sem experiÃªncia de equipe
- ðŸš© Estimativas de effort baseadas em "gut feeling"
- ðŸš© Impact Ã© "achismo" sem dados

**Como aumentar confidence:**
- âœ… Fazer user interviews/surveys
- âœ… Rodar technical spike (proof of concept)
- âœ… Analisar competidores (benchmarking)
- âœ… A/B test ou prototype antes de commit

---

### Step 4: Estimar EFFORT (Pessoa-meses de trabalho)

**DefiniÃ§Ã£o**: Quanto trabalho total (todas equipes) necessÃ¡rio para lanÃ§ar feature? Unidade: **person-months** (1 pessoa em tempo integral por 1 mÃªs).

**Inclua no cÃ¡lculo:**
- Development (frontend + backend)
- Design (UX research, wireframes, visual design)
- QA (test planning, automation, manual testing)
- DevOps (infra, monitoring, deployment)
- PM (coordination, documentation)
- Post-launch support (30 dias apÃ³s GA)

**Exemplos de cÃ¡lculo:**
```yaml
feature: "Export Automation"
effort:
  breakdown:
    backend_dev: 1.5  # 1 dev Ã— 1.5 months
    frontend_dev: 1.0  # 1 dev Ã— 1 month
    ux_design: 0.5    # 1 designer Ã— 0.5 month
    qa: 0.5           # 1 QA Ã— 0.5 month
    devops: 0.3       # 1 DevOps Ã— 0.3 month (infra setup)
    pm: 0.2           # 1 PM Ã— 0.2 month (coordination)
  total: 4.0  # person-months
  calendar_time: "6 weeks (with parallel work)"
  assumptions:
    - "Team disponÃ­vel (nÃ£o bloqueado por dependencies)"
    - "Scope nÃ£o cresce (no scope creep)"
    - "Technical spike jÃ¡ foi feito"

feature: "UI Polishing (buttons, spacing, colors)"
effort:
  breakdown:
    frontend_dev: 0.3  # 1 dev Ã— 0.3 month (1.5 weeks)
    ux_design: 0.2     # 1 designer Ã— 0.2 month
    qa: 0.1            # 1 QA Ã— 0.1 month (quick regression)
  total: 0.6  # person-months
  calendar_time: "2 weeks"
```

**âš ï¸ Armadilhas comuns:**
```
âŒ Subestimar: "Engineering disse 2 weeks" â†’ Esquecer design, QA, DevOps
âœ… Incluir tudo: Engineering (2w) + Design (1w) + QA (0.5w) + DevOps (0.5w) = 1 month

âŒ Confundir calendar time com person-months:
   "3 devs vÃ£o fazer em 1 month" â†’ Effort = 3 person-months (nÃ£o 1!)

âŒ Ignorar post-launch:
   "Feature pronto" â†’ Esquecer bug fixes, monitoring, documentaÃ§Ã£o
```

---

### Step 5: Calcular RICE Score Final

**FÃ³rmula**: `RICE Score = (Reach Ã— Impact Ã— Confidence) / Effort`

**Exemplo completo:**
```yaml
feature: "Export Automation"

reach: 500  # users/quarter
impact: 3   # Massive (3.0)
confidence: 0.8  # 80%
effort: 4.0  # person-months

rice_score: (500 Ã— 3 Ã— 0.8) / 4.0 = 1200 / 4 = 300

interpretation: "300 Ã© ALTO â†’ Prioridade P0"
```

---

## ðŸ† InterpretaÃ§Ã£o de RICE Scores

### Score Ranges (Guia Geral)

| RICE Score | Prioridade | AÃ§Ã£o Recomendada |
|------------|-----------|------------------|
| **>100** | ðŸ”¥ **P0 - Critical** | Roadmap imediato, comeÃ§a prÃ³ximo sprint |
| **50-100** | âš¡ **P1 - High** | PrÃ³ximo quarter, planning jÃ¡ |
| **20-50** | â­• **P2 - Medium** | Backlog, considerar para futuro |
| **<20** | ðŸ”µ **P3 - Low** | Ice box, apenas se tiver spare capacity |

**âš ï¸ Importante**: Ranges sÃ£o relativos ao seu contexto. Calibre com sua equipe!

### Exemplos de ComparaÃ§Ã£o

```yaml
features:
  - name: "Export Automation"
    reach: 500
    impact: 3
    confidence: 0.8
    effort: 4.0
    rice: 300  # ðŸ”¥ P0
    reasoning: "High impact, feasible effort, clear user need"
  
  - name: "Real-time Collaboration"
    reach: 2000
    impact: 2
    confidence: 0.5
    effort: 12.0
    rice: 167  # ðŸ”¥ P0
    reasoning: "Massive reach, mas effort alto e confidence baixa (risk!)"
  
  - name: "Dark Mode"
    reach: 6000
    impact: 0.5
    confidence: 1.0
    effort: 2.0
    rice: 1500  # ðŸ”¥ðŸ”¥ P0+
    reasoning: "Reach enorme, effort baixo, easy win!"
  
  - name: "Advanced Analytics Dashboard"
    reach: 50
    impact: 2
    confidence: 0.8
    effort: 8.0
    rice: 10  # ðŸ”µ P3
    reasoning: "Reach muito baixo (sÃ³ admins), effort alto, nÃ£o justifica"
  
  - name: "Keyboard Shortcuts"
    reach: 3000
    impact: 1
    confidence: 1.0
    effort: 1.0
    rice: 3000  # ðŸ”¥ðŸ”¥ðŸ”¥ P0 (QUICK WIN!)
    reasoning: "Reach grande, effort mÃ­nimo, confidence alta = LOW-HANGING FRUIT"

sorted_by_rice:
  1. "Keyboard Shortcuts (3000)" â†’ DO FIRST (quick win)
  2. "Dark Mode (1500)" â†’ DO SECOND (quick win)
  3. "Export Automation (300)" â†’ DO THIRD (high value)
  4. "Real-time Collaboration (167)" â†’ SPIKE FIRST (reduce confidence risk)
  5. "Advanced Analytics Dashboard (10)" â†’ DEPRIORITIZE
```

---

## ðŸŽ¯ Como Usar RICE no Workflow de PM

### Workflow Completo

```yaml
step_1_discovery:
  action: "Gather initial data for RICE inputs"
  tasks:
    - "User interviews para entender impact"
    - "Analytics para calcular reach"
    - "Engineering spike para estimar effort"
    - "Competitive analysis para calibrar impact"
  output: "RICE scores iniciais para top 10 features do backlog"

step_2_prioritization:
  action: "Score e rankear features"
  tasks:
    - "Calcular RICE para cada feature"
    - "Ordenar por score (descendente)"
    - "Agrupar em P0/P1/P2/P3"
  output: "Priorized backlog com justificativas"

step_3_validation:
  action: "Calibrar com stakeholders"
  tasks:
    - "Apresentar top 5 features com RICE scores"
    - "Discutir assumptions (reach, impact, effort)"
    - "Ajustar confidence se stakeholders discordam"
  output: "RICE scores validados e aprovados"

step_4_roadmap_planning:
  action: "Montar roadmap baseado em RICE"
  tasks:
    - "P0 features â†’ Q1 2025"
    - "P1 features â†’ Q2 2025"
    - "P2 features â†’ Backlog"
  output: "Roadmap quantitativo com RICE justifications"

step_5_retrospective:
  action: "Validar RICE predictions pÃ³s-launch"
  tasks:
    - "Reach real vs estimado?"
    - "Impact real vs estimado?"
    - "Effort real vs estimado?"
  output: "Calibrate future RICE estimates com learnings"
```

---

## ðŸ“ Template para CÃ¡lculo RICE

```yaml
feature: "[Nome do Feature]"

# ===== INPUTS =====
reach:
  value: [nÃºmero]
  period: "quarter | month | year"
  calculation: "[Mostrar cÃ¡lculo - ex: 100 customers Ã— 5 users = 500]"
  source: "[Analytics, survey, sales data]"
  notes: "[Assumptions importantes]"

impact:
  value: [0.25 | 0.5 | 1 | 2 | 3]
  label: "[Minimal | Low | Medium | High | Massive]"
  reasoning: |
    [Por que esse score? Qual benefÃ­cio concreto?]
  source: "[User interviews, A/B test, benchmarks]"
  notes: "[Se em dÃºvida entre dois scores, qual escolheu e por quÃª]"

confidence:
  value: [0.50 | 0.80 | 1.00]
  label: "[Low | Medium | High]"
  breakdown:
    reach_confidence: "[Low | Medium | High]"
    impact_confidence: "[Low | Medium | High]"
    effort_confidence: "[Low | Medium | High]"
  reasoning: |
    [Qual qualidade dos dados? O que aumentaria confidence?]
  data_quality: "[Ã“tima | Boa | Fraca]"

effort:
  value: [person-months]
  breakdown:
    backend: [person-months]
    frontend: [person-months]
    design: [person-months]
    qa: [person-months]
    devops: [person-months]
    pm: [person-months]
  calendar_time: "[weeks ou months]"
  assumptions:
    - "[Assumption 1]"
    - "[Assumption 2]"
  notes: "[Inclui post-launch support? Spike feito?]"

# ===== OUTPUT =====
rice_score:
  calculation: "(reach Ã— impact Ã— confidence) / effort"
  value: [nÃºmero calculado]
  formula_filled: "([reach] Ã— [impact] Ã— [confidence]) / [effort] = [score]"

priority:
  level: "P0 | P1 | P2 | P3"
  reasoning: "[Por que esse nÃ­vel de prioridade?]"
  recommended_action: "[Roadmap Q1, Backlog, Ice Box, etc]"

# ===== METADATA =====
metadata:
  author: "[Nome do PM]"
  date: "YYYY-MM-DD"
  status: "Draft | Reviewed | Approved"
  reviewers:
    - name: "[Nome]"
      role: "[Engineering Lead, VP Product, etc]"
      approved: true/false
      comments: "[Feedback]"
  change_log:
    - date: "YYYY-MM-DD"
      change: "[O que mudou]"
      reason: "[Por que mudou]"
```

---

## ðŸ” Exemplos Reais Preenchidos

### Exemplo 1: Feature de Alto Impacto

```yaml
feature: "Automated Data Export System"

reach:
  value: 500
  period: "quarter"
  calculation: "100 enterprise customers Ã— 5 data analysts/customer = 500 users/quarter"
  source: "Salesforce customer data + user role analytics (Jan 2025)"
  notes: "Conservative estimate - only counting active data analysts, not occasional users"

impact:
  value: 3
  label: "Massive"
  reasoning: |
    Current state: 1.8h/day manual exports com 40% error rate
    Future state: 15min/day automated com <5% error rate
    Time savings: 1.65h/day Ã— 500 users Ã— $50/hour = $412k/year
    Error reduction: Critical business data accuracy improved
  source: "User interviews (n=12), time tracking study (n=50), error logs analysis"
  notes: "Scored 3 (Massive) porque Ã© game-changer para workflow diÃ¡rio"

confidence:
  value: 0.80
  label: "Medium-High"
  breakdown:
    reach_confidence: "High (exact data from Salesforce)"
    impact_confidence: "Medium (user research sÃ³lido, mas nÃ£o A/B tested)"
    effort_confidence: "Medium (estimation de engineering, sem spike tÃ©cnico)"
  reasoning: |
    Reach: 100% confidence (dados exatos)
    Impact: 70% confidence (user research + analytics, nÃ£o production test)
    Effort: 80% confidence (similar features antes, mas nova tech stack)
    Average: ~83% â†’ Rounded to 80%
  data_quality: "Boa (mix de quantitativo e qualitativo)"

effort:
  value: 4.0
  breakdown:
    backend: 1.5  # Celery integration, validation service
    frontend: 1.0  # Export UI, scheduling interface
    design: 0.5   # Wireframes, user flows
    qa: 0.5       # Test plans, automation
    devops: 0.3   # Infrastructure setup (S3, Redis)
    pm: 0.2       # Coordination, documentation
  calendar_time: "6 weeks (com work paralelo)"
  assumptions:
    - "Team disponÃ­vel (2 backend devs, 1 frontend, 1 designer, 1 QA)"
    - "Dependencies prontas (Auth Service, Data Warehouse)"
    - "No scope creep (scope locked apÃ³s PRD approval)"
  notes: "Inclui 2 semanas de buffer para bug fixes pÃ³s-launch"

rice_score:
  calculation: "(reach Ã— impact Ã— confidence) / effort"
  value: 300
  formula_filled: "(500 Ã— 3 Ã— 0.8) / 4.0 = 1200 / 4 = 300"

priority:
  level: "P0"
  reasoning: |
    RICE 300 Ã© alto score. CombinaÃ§Ã£o de:
    - High reach (500 users)
    - Massive impact (transforma workflow diÃ¡rio)
    - Reasonable effort (4 months viÃ¡vel)
    - Strong business case ($412k/year ROI)
  recommended_action: "Roadmap para Q1 2025, comeÃ§ar desenvolvimento em prÃ³ximo sprint"

metadata:
  author: "JoÃ£o Silva (PM)"
  date: "2025-02-03"
  status: "Approved"
  reviewers:
    - name: "Wilson Souza (Engineering Lead)"
      role: "Technical Feasibility"
      approved: true
      comments: "Effort estimate razoÃ¡vel, arquitetura validada"
    - name: "Maria Oliveira (VP Product)"
      role: "Business Value"
      approved: true
      comments: "Strong ROI, alinha com OKR Q1 de efficiency"
  change_log:
    - date: "2025-02-03"
      change: "Initial RICE calculation"
      reason: "PRD approval process"
```

---

### Exemplo 2: Quick Win (Low Effort, High Reach)

```yaml
feature: "Keyboard Shortcuts for Common Actions"

reach:
  value: 3000
  period: "quarter"
  calculation: "10,000 MAU Ã— 30% power users = 3,000 users/quarter"
  source: "Mixpanel usage analytics (power users = >10 sessions/week)"
  notes: "Conservative - only power users will adopt shortcuts initially"

impact:
  value: 1
  label: "Medium"
  reasoning: |
    Saves 5-10 seconds per action Ã— 50 actions/day = 4-8min/day
    Not transformational, but quality-of-life improvement for power users
    Reduces friction, improves user satisfaction (NPS boost)
  source: "User feature requests (n=120), competitive benchmarking"
  notes: "Scored 1 (Medium) - useful but nÃ£o game-changer"

confidence:
  value: 1.0
  label: "High"
  breakdown:
    reach_confidence: "High (analytics precisos)"
    impact_confidence: "High (feature comum, benchmarks claros)"
    effort_confidence: "High (technology bem conhecida)"
  reasoning: |
    Reach: 100% (dados exatos de analytics)
    Impact: 100% (feature padrÃ£o, sabemos exatamente o que faz)
    Effort: 100% (jÃ¡ implementamos shortcuts antes, tech simples)
  data_quality: "Ã“tima"

effort:
  value: 1.0
  breakdown:
    backend: 0.0   # Nenhum backend work
    frontend: 0.7  # Keyboard event handlers, UI hints
    design: 0.2    # Shortcut cheatsheet, visual hints
    qa: 0.1        # Quick regression testing
    devops: 0.0    # No infrastructure changes
    pm: 0.0        # Minimal coordination
  calendar_time: "2 weeks"
  assumptions:
    - "Usando biblioteca existente (react-hotkeys)"
    - "Apenas 10-15 shortcuts mais usados (nÃ£o comprehensive)"
  notes: "Low complexity feature, no dependencies"

rice_score:
  calculation: "(reach Ã— impact Ã— confidence) / effort"
  value: 3000
  formula_filled: "(3000 Ã— 1 Ã— 1.0) / 1.0 = 3000 / 1 = 3000"

priority:
  level: "P0 (Quick Win!)"
  reasoning: |
    RICE 3000 Ã© ALTÃSSIMO por causa de:
    - Massive reach (3k power users)
    - Minimal effort (1 person-month)
    - High confidence (low risk)
    â†’ ClÃ¡ssico "low-hanging fruit" - alto ROI com baixo investimento
  recommended_action: "Implementar imediatamente (next sprint), easy win para equipe"

metadata:
  author: "JoÃ£o Silva (PM)"
  date: "2025-02-03"
  status: "Approved"
  change_log:
    - date: "2025-02-03"
      change: "Initial RICE - identified as quick win"
```

---

## ðŸš¨ Armadilhas Comuns e Como Evitar

### Armadilha 1: "Gut Feeling" Prioritization
```
âŒ ERRADO: "CEO quer esse feature, Ã© P0"
âœ… CORRETO: "Vamos calcular RICE para validar se alinha com dados"

SoluÃ§Ã£o:
- Use RICE para TODAS features (mesmo CEO requests)
- Se RICE baixo mas CEO insiste â†’ Document como "Strategic override"
- Reavaliar quarterly: Feature teve impact esperado?
```

### Armadilha 2: Sandbagging (Inflating Scores)
```
âŒ ERRADO: PM infla impact/reach do seu feature favorito
âœ… CORRETO: Peer review de RICE scores com Engineering/Data

SoluÃ§Ã£o:
- RICE scores precisam approval de pelo menos 2 stakeholders
- Use dados objetivos (analytics, nÃ£o opinions)
- Retrospectives: Compare RICE predicted vs actual
```

### Armadilha 3: Analysis Paralysis
```
âŒ ERRADO: Gastar 1 semana calculando RICE perfeitamente
âœ… CORRETO: 80/20 rule - estimativas rÃ¡pidas, iterar depois

SoluÃ§Ã£o:
- Primeira passada: 30min por feature (ballpark RICE)
- Segunda passada (top 5 only): Deep dive com research
- RICE nÃ£o Ã© ciÃªncia exata, Ã© framework de decisÃ£o
```

### Armadilha 4: Ignorar Confidence
```
âŒ ERRADO: Feature com RICE 500 mas confidence 30% â†’ Priorizar P0
âœ… CORRETO: Low confidence = HIGH RISK â†’ Spike first

SoluÃ§Ã£o:
- RICE > 100 MAS confidence < 50% â†’ Fazer spike/prototype PRIMEIRO
- Aumentar confidence antes de commit a full development
- Re-calcular RICE apÃ³s spike com confidence atualizada
```

---

## ðŸ”„ Retrospective: Validar RICE Predictions

ApÃ³s launch, compare predicted vs actual:

```yaml
feature: "Export Automation"

predicted_rice:
  reach: 500
  impact: 3
  confidence: 0.8
  effort: 4.0
  rice: 300

actual_results:
  reach: 450  # 90% of predicted (some customers delayed adoption)
  impact: 2.5 # 83% of predicted (time savings confirmed, but error reduction lower)
  effort: 5.5 # 137% of predicted (scope creep + bug fixes)
  confidence_validated: 0.7  # Lower than predicted

actual_rice_retrospective:
  calculation: "(450 Ã— 2.5 Ã— 0.7) / 5.5 = 144"
  variance: "-52% vs predicted (300 â†’ 144)"

learnings:
  - lesson: "Underestimated effort - scope creep com 'just one more format'"
    action: "Lock scope mais rigidamente em PRD, usar feature flags"
  
  - lesson: "Impact superestimado - error reduction teve challenges tÃ©cnicos"
    action: "Validation layer needs Phase 2 improvements"
  
  - lesson: "Reach demorou mais - adoption slower than expected"
    action: "Invest more in onboarding/training para future features"

calibration:
  future_estimates:
    - "Multiplicar effort estimates por 1.2x (buffer para scope creep)"
    - "Ser mais conservative com impact scores (escolher lower bound)"
    - "Reach em quarter 1 Ã© 70-80% de total reach (adoption curve)"
```

---

## ðŸ”— IntegraÃ§Ã£o com Outros Artefatos

- **${AVANADE_PRD_TEMPLATE_YAML}**: RICE score vai na seÃ§Ã£o `strategic_alignment.priority`
- **${AVANADE_PM_CHECKLIST_MD}**: RICE validation Ã© gate para PRD approval
- **${AVANADE_DISCOVERY_TEMPLATE_YAML}**: Research alimenta inputs de RICE (reach, impact)
- **${AVANADE_MEMORY_PM_JOAO}**: Armazenar RICE scores histÃ³ricos para calibraÃ§Ã£o

