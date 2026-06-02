### Value Prioritization Patterns
_Frameworks de priorizaÃ§Ã£o validados_

**Exemplo**:
```yaml
- framework: "RICE Score (Reach Ã— Impact Ã— Confidence / Effort)"
  example:
    feature_a:
      reach: 10000  # users affected
      impact: 3     # 0=minimal, 1=low, 2=medium, 3=high
      confidence: 80%
      effort: 13    # story points
      rice_score: 1846  # (10000 Ã— 3 Ã— 0.8) / 13
    feature_b:
      reach: 2000
      impact: 3
      confidence: 100%
      effort: 5
      rice_score: 1200
  decision: "Feature A prioritized (higher RICE)"
  pros: "Quantitativo, menos bias, transparente"
  cons: "Estimativas de reach podem ser imprecisas"
  best_for: "B2C products, data-driven orgs"
  
- framework: "MoSCoW (Must/Should/Could/Won't)"
  example:
    must_have:
      - "User authentication (security)"
      - "Core CRUD operations"
    should_have:
      - "Email notifications"
      - "Export to Excel"
    could_have:
      - "Dark mode"
      - "Advanced filters"
    wont_have:
      - "Mobile app (future release)"
  pros: "Simples, stakeholders entendem facilmente"
  cons: "Subjetivo (tudo vira 'Must' se nÃ£o facilitar bem)"
  best_for: "Fixed-scope projects, MVP definition"
  
- framework: "Kano Model (Basic/Performance/Delight)"
  example:
    basic: "Sistema deve ser rÃ¡pido (< 2s load time)" # Absence = dissatisfaction
    performance: "Mais features de relatÃ³rios" # More = better
    delight: "Smart suggestions baseadas em ML" # Unexpected wow
  decision: "Basicos primeiro, depois performance, delight opcional"
  pros: "Foco em user satisfaction, nÃ£o apenas features"
  cons: "Requer research (surveys, user testing)"
  best_for: "Consumer products, competitive markets"
```

---

### Backlog Grooming Insights
_EstratÃ©gias eficazes de manutenÃ§Ã£o de backlog_

**Exemplo**:
```yaml
- practice: "Epics > Features > Stories (3-tier hierarchy)"
  rationale: "Clareza de roadmap (epics), flexibilidade de execution (stories)"
  example:
    epic: "E-commerce Checkout Optimization"
    features:
      - "One-click purchase"
      - "Guest checkout"
      - "Multiple payment methods"
    stories:
      - "Como usuÃ¡rio, quero salvar meu cartÃ£o..."
      - "Como guest, quero comprar sem criar conta..."
  benefit: "Roadmap communication (JoÃ£o PM) + team execution (Roberto SM)"
  
- practice: "Backlog grooming cadence: bi-weekly"
  activities:
    - "Review top 20 PBIs (priority order)"
    - "Refine top 5-8 (next sprint candidates)"
    - "Archive/delete stale items (>6 months old)"
  participants: "Paula (PO) + Roberto (SM) + Tiago (Dev) + Maria (Analyst se needed)"
  duration: "90 minutos"
  impact: "Planning meetings -50% duration (PBIs jÃ¡ prontos)"
  
- practice: "User Story Splitting (quando PBI > 8 SP)"
  techniques:
    - "Workflow steps (vertical slice cada step)"
    - "CRUD operations (Create, Read separados)"
    - "Happy path vs edge cases"
    - "Simple/complex variants"
  benefit: "Stories fit in sprint, deploy incrementally"
```

---

### Stakeholder Management Patterns
_EstratÃ©gias de gestÃ£o de expectativas_

**Exemplo**:
```yaml
- stakeholder_type: "Executive Sponsor (C-level)"
  communication_style: "High-level, outcome-focused"
  cadence: "Monthly (roadmap review)"
  artifacts:
    - "Product roadmap (3-6 months)"
    - "OKRs progress (Objectives & Key Results)"
    - "Business metrics dashboard (revenue, users, NPS)"
  pitfall_avoided: "Status updates tÃ©cnicos detalhados â†’ bore executives"
  success_pattern: "Business value storytelling - 'Feature X increased retention 15%'"
  
- stakeholder_type: "End Users (Beta testers)"
  communication_style: "Hands-on, feedback-driven"
  cadence: "Bi-weekly (demo + feedback sessions)"
  artifacts:
    - "Clickable prototypes (Sofia UX)"
    - "Beta releases (staging environment)"
    - "Feedback surveys (Google Forms)"
  pitfall_avoided: "Aceitar todo feedback sem filtro â†’ feature creep"
  success_pattern: "Validar feedback com data (analytics) antes de priorizar"
  
- stakeholder_type: "Internal Teams (Sales, Support)"
  communication_style: "Collaborative, early involvement"
  cadence: "Sprint reviews (showcase new features)"
  artifacts:
    - "Release notes"
    - "Training materials (for sales enablement)"
    - "FAQs (for support team)"
  pitfall_avoided: "Surpresas em production â†’ unprepared teams"
  success_pattern: "Involve early (discovery phase) â†’ they sell/support better"
```

---

### User Story Quality Patterns
_CaracterÃ­sticas de boas user stories_

**Exemplo**:
```yaml
- pattern: "INVEST Criteria (Good Story)"
  independent: "NÃ£o depende de outras stories para ser deployada"
  negotiable: "Detalhes de implementaÃ§Ã£o flexÃ­veis (converse com dev)"
  valuable: "Entrega valor ao usuÃ¡rio/negÃ³cio (nÃ£o apenas tarefa tÃ©cnica)"
  estimable: "Time consegue estimar esforÃ§o (se nÃ£o: refinar ou spike)"
  small: "Cabe em 1 sprint (<= 8 SP idealmente)"
  testable: "Acceptance criteria claros, QA consegue validar"
  
- anti_pattern: "Technical Task disfarÃ§ada de User Story"
  bad_example: "Como desenvolvedor, quero refatorar o mÃ³dulo de autenticaÃ§Ã£o..."
  problem: "NÃ£o entrega valor direto ao usuÃ¡rio"
  fix: "Como usuÃ¡rio, quero login mais rÃ¡pido (<2s) para acessar sistema rapidamente"
  lesson: "Frame em termos de user value, nÃ£o tarefa tÃ©cnica"
  
- pattern: "Acceptance Criteria SMART"
  specific: "Sistema deve enviar email em atÃ© 5 minutos apÃ³s aÃ§Ã£o"
  measurable: "QA pode validar (nÃ£o vago como 'sistema deve ser rÃ¡pido')"
  achievable: "Tecnicamente possÃ­vel com stack atual"
  relevant: "Alinhado com objetivo da story"
  testable: "Carla (QA) consegue escrever test case"
  
  example:
    story: "Como usuÃ¡rio, quero recuperar senha via email"
    acceptance_criteria:
      - "Email enviado em atÃ© 5min apÃ³s request"
      - "Link de reset expira em 24h"
      - "UsuÃ¡rio consegue criar nova senha (min 8 chars, 1 nÃºmero)"
      - "Email contÃ©m branding da empresa (logo, cores)"
```

---

## ðŸ“Š Product Metrics & Analytics

### Key Product Metrics Tracked
_MÃ©tricas que Paula monitora para decisÃµes_

**Exemplo**:
```yaml
- category: "Acquisition"
  metrics:
    - name: "Signup conversion rate"
      current: "12%"
      target: "15%"
      actions: "Simplificar onboarding (Sofia UX + Tiago Dev)"
    - name: "Cost per acquisition (CPA)"
      current: "R$ 50"
      target: "R$ 40"
      actions: "Melhorar SEO, viral loops"
  
- category: "Activation"
  metrics:
    - name: "Time to first value (TTFV)"
      current: "8 minutos"
      target: "< 5 minutos"
      actions: "Onboarding interativo (tooltips, quick wins)"
    - name: "Feature adoption (% users using Feature X)"
      current: "30%"
      target: "50%"
      actions: "In-app messaging, user education"
  
- category: "Retention"
  metrics:
    - name: "Monthly Active Users (MAU)"
      current: "10k"
      target: "15k (50% growth)"
      actions: "Email campaigns, push notifications"
    - name: "Churn rate"
      current: "5%/month"
      target: "< 3%/month"
      actions: "Exit surveys (identify reasons), retention features"
  
- category: "Revenue"
  metrics:
    - name: "Monthly Recurring Revenue (MRR)"
      current: "R$ 100k"
      target: "R$ 150k"
      actions: "Upsell features, new pricing tiers"
    - name: "Customer Lifetime Value (LTV)"
      current: "R$ 1200"
      target: "R$ 1500"
      actions: "Reduce churn, increase ARPU"
```

---

### A/B Testing Insights
_Experimentos que informaram decisÃµes de produto_

**Exemplo**:
```yaml
- experiment: "Onboarding flow (5 steps vs 2 steps)"
  hypothesis: "Shorter onboarding â†’ higher completion rate"
  variants:
    control: "5 steps (email, name, company, role, preferences)"
    variant_a: "2 steps (email, password - resto opcional)"
  metric: "Signup completion rate"
  results:
    control: "65% completion"
    variant_a: "82% completion (+26%)"
  decision: "Ship variant A - significativo (p<0.05)"
  learning: "Reduce friction em signup, collect data progressively"
  
- experiment: "Pricing page (3 tiers vs 4 tiers)"
  hypothesis: "Mais opÃ§Ãµes â†’ mais conversÃµes (choice paradox test)"
  variants:
    control: "3 tiers (Basic R$49, Pro R$99, Enterprise custom)"
    variant_a: "4 tiers (Basic, Plus R$79, Pro, Enterprise)"
  metric: "Paid conversion rate"
  results:
    control: "8% conversion"
    variant_a: "6% conversion (-25%)"
  decision: "Keep control - menos opÃ§Ãµes Ã© melhor (paradox of choice confirmed)"
  learning: "3 tiers Ã© sweet spot, 4+ confunde usuÃ¡rios"
```

---

### Feature Success/Failure Post-Mortems
_Learnings de features shipped_

**Exemplo**:
```yaml
- feature: "Dark Mode (SUCCESS)"
  motivation: "User requests (top 5 no feedback forum)"
  effort: "5 story points (Tiago + Sofia)"
  impact:
    - "User satisfaction +10% (NPS survey)"
    - "Session duration +15% (less eye strain â†’ longer usage)"
    - "App Store rating 4.2 â†’ 4.5"
  learning: "Low effort, high impact - listen to vocal users"
  
- feature: "Advanced Search Filters (FAILURE)"
  motivation: "Assumption: power users need complex filters"
  effort: "34 story points (1 sprint completo)"
  impact:
    - "Usage: 2% of users (98% never touched)"
    - "Complexity added â†’ other features delayed"
  learning: "Validate assumptions BEFORE building - data > opinions"
  action: "Deprecate feature, simplify UI (remove clutter)"
  
- feature: "Social Sharing (MIXED)"
  motivation: "Viral growth strategy"
  effort: "13 story points"
  impact:
    - "Shares: 500/month (lower than expected 2k/month)"
    - "Acquisition from shares: 50 users (not enough)"
    - "However: Existing users loved it (NPS +5%)"
  learning: "Not a growth driver, but good retention feature - repurpose"
```

---

## ðŸŽ¯ Roadmap Planning Insights

### Roadmap Horizon Strategies
_Como estruturar roadmap temporal_

**Exemplo**:
```yaml
- horizon: "Now (Current Sprint)"
  detail_level: "Stories (INVEST, estimadas)"
  commitment: "100% (committed sprint backlog)"
  change_tolerance: "Baixa (apenas emergÃªncias)"
  
- horizon: "Next (1-2 sprints)"
  detail_level: "Features (refined PBIs)"
  commitment: "80% (high confidence)"
  change_tolerance: "MÃ©dia (reprioritize se needed)"
  
- horizon: "Later (3-6 months)"
  detail_level: "Epics (high-level themes)"
  commitment: "50% (roadmap indicativo)"
  change_tolerance: "Alta (pivot-friendly)"
  example: "Q3: Mobile app, Q4: Integrations marketplace"
  
- horizon: "Future (6+ months)"
  detail_level: "Vision (strategic bets)"
  commitment: "20% (exploratÃ³rio)"
  change_tolerance: "Muito alta"
  example: "AI-powered recommendations, blockchain integration"
```

---

### OKR Integration with Backlog
_Como OKRs informam priorizaÃ§Ã£o_

**Exemplo**:
```yaml
- quarter: "Q1 2024"
  objective: "Aumentar user retention"
  key_results:
    - kr1: "Reduce churn de 5% para 3%"
    - kr2: "Increase DAU/MAU ratio de 0.3 para 0.4"
    - kr3: "NPS score de 35 para 45"
  
  backlog_impact:
    high_priority:
      - "Onboarding improvements (kr1, kr2)"
      - "Push notifications (kr2)"
      - "In-app user education (kr1)"
    medium_priority:
      - "Gamification (kr2)"
    deprioritized:
      - "New acquisition features (nÃ£o alinhado com OKR Q1)"
  
  result:
    - kr1: "âœ… 2.8% churn (exceeded)"
    - kr2: "ðŸŸ¡ 0.38 DAU/MAU (missed slightly)"
    - kr3: "âœ… NPS 47 (exceeded)"
  learning: "OKRs focused backlog â†’ clear wins, some misses acceptable"
```

---

## ðŸ¤ Cross-Functional Collaboration

### Collaboration with Maria (Analyst)
_Patterns de trabalho conjunto_

**Exemplo**:
```yaml
- workflow: "Discovery â†’ PRD"
  steps:
    1. "Paula define business problem/opportunity"
    2. "Maria executes Discovery Protocol (user research)"
    3. "Paula + Maria co-create PRD (business value + user needs)"
  artifact: "${AVANADE_PRD_TEMPLATE_YAML}"
  benefit: "PRDs com user validation, nÃ£o apenas assumptions"
  
- anti_pattern_avoided: "Paula escreve PRD sozinha (sem user validation)"
  problem: "Build wrong thing (nÃ£o valida com usuÃ¡rios)"
  fix: "Maria sempre envolvida em discovery antes de PRD"
```

---

### Collaboration with Sofia (UX)
_Design + Product partnership_

**Exemplo**:
```yaml
- workflow: "Wireframes â†’ PRD iteration"
  steps:
    1. "Paula compartilha user stories draft"
    2. "Sofia cria low-fi wireframes (validaÃ§Ã£o visual)"
    3. "Paula + Sofia validam com usuÃ¡rios (usability testing)"
    4. "Paula refina stories baseado em feedback"
  artifact: "Figma prototypes + ${AVANADE_PRD_TEMPLATE_YAML}"
  benefit: "UX validation antes de dev â†’ menos rework"
  
- pattern: "Design Sprints (1 semana)"
  when: "New features complexas ou incertas"
  participants: "Paula + Sofia + Maria + 2-3 stakeholders"
  output: "Validated prototype + PRD"
  effectiveness: "Alta (economiza 2-3 sprints de dev se feature nÃ£o validar)"
```

---

### Collaboration with Roberto (SM)
_PO + SM partnership_

**Exemplo**:
```yaml
- workflow: "Backlog refinement colaborativo"
  cadence: "Bi-weekly (90min)"
  participants: "Paula + Roberto + Tiago (tech input)"
  activities:
    - "Paula: Apresenta PBIs, business value, acceptance criteria"
    - "Roberto: Facilita discussion, identifica dependencies"
    - "Tiago: Technical feasibility, estimativas iniciais"
  output: "PBIs ready for Planning (INVEST compliant)"
  
- boundary_definition:
  paula_owns: "WHAT (features) e WHY (value)"
  roberto_owns: "HOW (process) e WHEN (sprint planning)"
  shared: "Refinement, priority trade-offs"
  lesson: "Clear boundaries evitam conflitos de responsabilidade"
```

---

## ðŸ”— Cross-References

### Artifacts Relacionados:
- PRD Template: `${AVANADE_PRD_TEMPLATE_YAML}`
- Story Template: `${AVANADE_STORY_TEMPLATE_YAML}`
- Value Validation: `${AVANADE_TASK_VALUE_VALIDATION}`
- Story Readiness: `${AVANADE_TASK_STORY_READINESS}`

### Agent Memories:
```yaml
supervisor: ${AVANADE_MEMORY_SUPERVISOR}
analyst: ${AVANADE_MEMORY_ANALYST_MARIA}
ux: ${AVANADE_MEMORY_UX_SOFIA}
sm: ${AVANADE_MEMORY_SM_ROBERTO}
pm: ${AVANADE_MEMORY_PM_JOAO}
```

---

## ðŸ“Œ Como Usar Esta MemÃ³ria

### âœ… ANTES de planejar features:
1. Consultar **Value Prioritization Patterns** â†’ framework adequado ao contexto
2. Revisar **Product Metrics** â†’ decisÃµes data-driven
3. Consultar **Feature Success/Failure** â†’ evitar erros passados

### âœ… DURANTE backlog management:
1. Aplicar **User Story Quality Patterns** â†’ INVEST compliance
2. Usar **Backlog Grooming Insights** â†’ manter backlog saudÃ¡vel
3. Aplicar **Stakeholder Management** â†’ expectativas alinhadas

### âœ… PARA roadmap planning:
1. Usar **Roadmap Horizon Strategies** â†’ nÃ­vel de detalhe apropriado
2. Integrar **OKRs** â†’ alignment estratÃ©gico
3. Considerar **A/B Testing Insights** â†’ validate assumptions

### âœ… APÃ“S features shipped:
1. **Atualizar memÃ³ria** com metrics de impacto
2. Documentar **Feature Post-Mortems** â†’ learning loop
3. Atualizar **Product Metrics** â†’ track progress

---
