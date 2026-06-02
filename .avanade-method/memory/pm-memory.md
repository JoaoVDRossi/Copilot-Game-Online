### Project Archetypes & Risk Profiles
_Tipos de projetos gerenciados e padrÃµes de risco_

**Exemplo**:
```yaml
- archetype: "Fixed-Price Enterprise"
  characteristics:
    - Escopo fixo, prazo fixo, orÃ§amento fixo
    - Cliente grande (enterprise)
    - Compliance pesado (contratos rÃ­gidos)
  risk_profile:
    - scope_creep: "Alto"
    - timeline_slippage: "MÃ©dio"
    - budget_overrun: "Baixo (contractual)"
  management_approach: "Waterfall-hybrid, gates rigorosos, change control formal"
  success_rate: "75%"
  
- archetype: "Agile Retainer"
  characteristics:
    - Escopo flexÃ­vel, sprints contÃ­nuos
    - Cliente startup/scale-up
    - Value-driven priorities
  risk_profile:
    - scope_creep: "Controlado (backlog priorizado)"
    - timeline_slippage: "Baixo (releases incrementais)"
    - budget_overrun: "MÃ©dio (scope expansions)"
  management_approach: "Pure Scrum, product-oriented"
  success_rate: "88%"
  
- archetype: "Internal Product Development"
  characteristics:
    - Produto interno Avanade
    - Time distribuÃ­do (mÃºltiplos paÃ­ses)
    - Innovation-focused
  risk_profile:
    - scope_creep: "MÃ©dio (MVP mindset)"
    - timeline_slippage: "Alto (dependencies cross-team)"
    - budget_overrun: "Baixo (internal budget)"
  management_approach: "SAFe, PI Planning, Lean Portfolio"
  success_rate: "70%"
```

---

### Stakeholder Management Patterns
_EstratÃ©gias eficazes para diferentes tipos de stakeholders_

**Exemplo**:
```yaml
- stakeholder_type: "C-Level Sponsor"
  communication_frequency: "Bi-weekly (steering committee)"
  preferred_format: "Executive dashboard (RAG status, KPIs)"
  engagement_strategy:
    - "Focus em business value delivered, ROI"
    - "Escalation rÃ¡pida de riscos crÃ­ticos"
    - "Evitar detalhes tÃ©cnicos (high-level apenas)"
  pitfalls_avoided:
    - "Status reports longos (TL;DR apenas)"
    - "Surpresas em steering (pre-align offline)"
  
- stakeholder_type: "Product Owner (cliente)"
  communication_frequency: "Daily (async Slack) + Sprint ceremonies"
  preferred_format: "Demo de features, backlog review"
  engagement_strategy:
    - "Envolver em refinements (ownership)"
    - "ValidaÃ§Ã£o early de protÃ³tipos"
    - "Educar sobre trade-offs (scope/time/quality)"
  pitfalls_avoided:
    - "Aceitar todos os requests sem priorizaÃ§Ã£o"
    - "Deixar PO descobrir bugs em production"
  
- stakeholder_type: "Technical Lead (cliente)"
  communication_frequency: "Weekly (technical sync)"
  preferred_format: "Architecture reviews, code quality metrics"
  engagement_strategy:
    - "Envolver Wilson (Architect) diretamente"
    - "ADRs compartilhados (transparÃªncia tÃ©cnica)"
    - "Code reviews conjuntos (pair programming)"
  pitfalls_avoided:
    - "DecisÃµes arquiteturais sem consultÃ¡-lo"
    - "Vendor lock-in sem discussÃ£o"
```

---

### Resource Planning Patterns
_AlocaÃ§Ã£o eficaz de pessoas e budget_

**Exemplo**:
```yaml
- project_phase: "Discovery & Planning"
  team_composition:
    - maria_analyst: "100% (lead)"
    - sofia_ux: "50% (parallel wireframes)"
    - wilson_architect: "25% (spike tÃ©cnico se needed)"
  duration: "2-3 semanas"
  budget_allocation: "15% do total"
  lesson: "Investir em discovery upfront reduz rework -40%"
  
- project_phase: "Development"
  team_composition:
    - tiago_dev: "100% (2-3 devs se team maior)"
    - carla_qa: "50% (test automation parallel)"
    - wilson_architect: "10% (code reviews, spikes)"
  duration: "8-12 semanas (mÃºltiplos sprints)"
  budget_allocation: "60% do total"
  lesson: "QA desde Sprint 1 previne debt tÃ©cnico"
  
- project_phase: "Go-Live & Hypercare"
  team_composition:
    - tiago_dev: "50% (bug fixes)"
    - carla_qa: "25% (smoke tests, monitoring)"
    - roberto_sm: "25% (process adjustments)"
  duration: "2-4 semanas"
  budget_allocation: "10% do total"
  lesson: "Budget hypercare apropriado evita surpresas"
```

---

### Risk Mitigation Strategies
_EstratÃ©gias validadas para riscos comuns_

**Exemplo**:
```yaml
- risk: "Key Person Dependency (bus factor)"
  likelihood: "MÃ©dia"
  impact: "Alto"
  mitigation:
    - "Pair programming obrigatÃ³rio (knowledge sharing)"
    - "Documentation-as-code (ADRs, runbooks)"
    - "Cross-training sprints (devs aprendem QA, vice-versa)"
  effectiveness: "Alta (mitigou 4 de 5 incidentes)"
  
- risk: "Scope Creep (requirements expansion)"
  likelihood: "Alta"
  impact: "MÃ©dio-Alto"
  mitigation:
    - "Change control formal (fixed-price projects)"
    - "MoSCoW prioritization (Must/Should/Could/Won't)"
    - "Backlog grooming rigoroso (Paula PO + JoÃ£o PM)"
  effectiveness: "MÃ©dia (contÃ©m mas nÃ£o elimina)"
  
- risk: "Technical Debt Accumulation"
  likelihood: "Alta (pressure de deadlines)"
  impact: "Alto (longo prazo)"
  mitigation:
    - "Quality gates obrigatÃ³rios (Carla QA)"
    - "Refactoring time budgeted (20% de cada sprint)"
    - "Architecture reviews (Wilson) a cada 3 sprints"
  effectiveness: "MÃ©dia-Alta (debt controlado, nÃ£o eliminado)"
```

---

### Budget Management Insights
_Aprendizados sobre gestÃ£o financeira de projetos_

**Exemplo**:
```yaml
- learning: "Contingency reserve subestimado"
  context: "Projetos fixed-price com 10% contingency â†’ estouro de 15%"
  root_cause: "SubestimaÃ§Ã£o de rework, scope creep nÃ£o antecipado"
  adjustment: "Contingency 15-20% para fixed-price, 10% para agile retainer"
  impact: "Budget overruns reduzidos de 40% para 12% dos projetos"
  
- learning: "Discovery phase pagou-se sozinha"
  context: "Cliente queria pular discovery (economizar 15% budget)"
  outcome: "Sem discovery â†’ rework custou 30% a mais que projeto original"
  lesson: "Discovery nÃ£o Ã© custo, Ã© investimento (ROI de 2x em reduÃ§Ã£o de rework)"
  
- learning: "Hourly billing vs Fixed-price trade-offs"
  context: "Hourly billing â†’ cliente micro-gerencia, constant justifications"
  outcome: "Fixed-price â†’ cliente mais hands-off, focus em outcomes"
  recommendation: "Fixed-price preferÃ­vel para escopo razoavelmente definido"
```

---

## ðŸ“Š Timeline & Estimation Patterns

### Velocity Benchmarks por Tipo de Projeto
_Velocidades tÃ­picas de diferentes tipos de trabalho_

**Exemplo**:
```yaml
- project_type: "CRUD Application (standard)"
  team_size: "3 devs + 1 QA"
  avg_velocity: "25 story points/sprint (2 weeks)"
  complexity_factor: "Baixo"
  notes: "Tech stack conhecido, patterns estabelecidos"
  
- project_type: "Complex Integration (APIs legacy)"
  team_size: "2 devs + 1 architect + 1 QA"
  avg_velocity: "15 story points/sprint"
  complexity_factor: "Alto"
  notes: "Unknown unknowns, documentaÃ§Ã£o legacy pobre"
  
- project_type: "Greenfield Innovation"
  team_size: "2 devs + 1 UX + 1 QA"
  avg_velocity: "18 story points/sprint"
  complexity_factor: "MÃ©dio-Alto"
  notes: "Tech stack novo, learning curve, spikes frequentes"
```

---

### Milestone Patterns que Funcionam
_Estruturas de milestones eficazes_

**Exemplo**:
```yaml
- milestone_structure: "Agile Incremental"
  pattern:
    - M1: "Discovery + MVP scope definition (Week 1-2)"
    - M2: "Core features demo (Week 6)"
    - M3: "Beta release (Week 10)"
    - M4: "Production release (Week 12)"
  benefits: "ValidaÃ§Ã£o early, pivots possÃ­veis, stakeholder engagement"
  best_for: "Produtos novos, startups, high uncertainty"
  
- milestone_structure: "Waterfall Gates"
  pattern:
    - M1: "Requirements signed-off (Week 4)"
    - M2: "Architecture approved (Week 6)"
    - M3: "Development complete (Week 16)"
    - M4: "UAT passed (Week 18)"
    - M5: "Go-live (Week 20)"
  benefits: "Previsibilidade, contractual clarity"
  best_for: "Fixed-price enterprise, regulated industries"
```

---

## ðŸŽ­ Team Dynamics & Collaboration

### Team Composition Learnings
_O que funciona em formaÃ§Ã£o de times_

**Exemplo**:
```yaml
- composition: "Full-stack generalists"
  pros:
    - "Flexibilidade alta (qualquer um pega qualquer task)"
    - "Menos handoffs, comunicaÃ§Ã£o mais simples"
  cons:
    - "Jack of all trades, master of none"
    - "Performance/security pode sofrer (falta especializaÃ§Ã£o)"
  best_for: "Startups, MVPs, times pequenos (<5 pessoas)"
  
- composition: "Specialists (FE/BE/QA/DevOps separados)"
  pros:
    - "Expertise profundo (qualidade tÃ©cnica alta)"
    - "Escalabilidade (adicionar specialists Ã© fÃ¡cil)"
  cons:
    - "Silos, handoffs, bottlenecks (FE esperando BE)"
    - "ComunicaÃ§Ã£o overhead"
  best_for: "Enterprise, times grandes (>10 pessoas)"
  
- composition: "Hybrid (T-shaped people)"
  pros:
    - "EspecializaÃ§Ã£o + flexibilidade"
    - "Cross-functional collaboration natural"
  cons:
    - "DifÃ­cil de recrutar (T-shaped Ã© raro)"
  best_for: "Maioria dos projetos (sweet spot)"
```

---

### Conflict Resolution Patterns
_EstratÃ©gias para resolver conflitos de time_

**Exemplo**:
```yaml
- conflict_type: "Technical disagreement (Wilson vs Tiago)"
  scenario: "Microservices vs Monolith"
  resolution_approach:
    - "Architecture Party (multi-perspective)"
    - "ADR documenta rationale de cada lado"
    - "Spike tÃ©cnico para validar assumptions"
    - "Decision baseada em data (benchmarks)"
  outcome: "Consenso alcanÃ§ado 80% das vezes"
  lesson: "Evitar authority-based decisions (PM forÃ§ando escolha)"
  
- conflict_type: "Priority clash (Paula PO vs stakeholder)"
  scenario: "Feature A (high value) vs Feature B (stakeholder pet project)"
  resolution_approach:
    - "Value scoring transparente (ROI, user impact)"
    - "JoÃ£o (PM) facilita discussÃ£o com data"
    - "Escalation para sponsor se necessÃ¡rio"
  outcome: "Data-driven decision respeitada"
  lesson: "Frameworks de priorizaÃ§Ã£o evitam politizaÃ§Ã£o"
```

---

## ðŸ”„ Retrospective & Continuous Improvement

### Retrospective Insights Recorrentes
_Temas que aparecem em retros_

**Exemplo**:
```yaml
- theme: "Meetings excessivas (Zoom fatigue)"
  frequency: "Alta (70% das retros mencionam)"
  action_items:
    - "No-meeting Fridays (focus time)"
    - "Async-first communication (Slack, docs)"
    - "Timeboxing rigoroso (meetings nunca excedem)"
  impact: "SatisfaÃ§Ã£o de time +25%, velocity +10%"
  
- theme: "Unclear requirements (retrabalho)"
  frequency: "MÃ©dia (40% das retros)"
  action_items:
    - "Maria (Analyst) involvement early"
    - "Acceptance criteria obrigatÃ³rios (INVEST)"
    - "Prototype validation antes de dev"
  impact: "Rework -35%"
  
- theme: "Technical debt acumulando"
  frequency: "MÃ©dia-Alta (50% das retros)"
  action_items:
    - "Refactoring sprints (1 a cada 4)"
    - "Code quality gates (Carla QA + Tiago Dev)"
    - "Architecture reviews (Wilson) regulares"
  impact: "Debt controlado, velocity sustentÃ¡vel"
```

---

## ðŸ“ˆ Success Metrics & KPIs

### Project Health Indicators
_MÃ©tricas que JoÃ£o (PM) monitora_

**Exemplo**:
```yaml
- metric: "Sprint Velocity Trend"
  target: "EstÃ¡vel ou crescente"
  measurement: "Story points/sprint (moving average 3 sprints)"
  red_flag: "Queda >20% entre sprints consecutivos"
  action_if_red: "Retrospective emergencial, identificar blockers"
  
- metric: "Budget Burn Rate"
  target: "Linear (% budget = % timeline)"
  measurement: "Actual spend vs planned (weekly)"
  red_flag: "Burn rate >10% acima do planejado"
  action_if_red: "Scope reduction, resource reallocation"
  
- metric: "Stakeholder Satisfaction (NPS)"
  target: ">8/10"
  measurement: "Survey mensal (steering committee)"
  red_flag: "<6/10"
  action_if_red: "1-on-1 com stakeholders, identify pain points"
  
- metric: "Team Morale"
  target: ">7/10"
  measurement: "Anonymous survey (bi-weekly)"
  red_flag: "<5/10 ou trend decrescente"
  action_if_red: "Retrospective focada em well-being, workload review"
```

---

## ðŸ”— Cross-References

### Artifacts Relacionados:
- Methodology Compliance: `${AVANADE_TASK_METHODOLOGY_COMPLIANCE}`
- Retrospective Facilitation: `${AVANADE_TASK_RETROSPECTIVE_FACILITATION}`
- Value Validation: `${AVANADE_TASK_VALUE_VALIDATION}`

### Agent Collaboration:
```yaml
supervisor: ${AVANADE_MEMORY_SUPERVISOR}
analyst: ${AVANADE_MEMORY_ANALYST_MARIA}
po: ${AVANADE_MEMORY_PO_PAULA}
sm: ${AVANADE_MEMORY_SM_ROBERTO}
architect: ${AVANADE_MEMORY_ARCHITECT_WILSON}
```

---

## ðŸ“Œ Como Usar Esta MemÃ³ria

### âœ… ANTES de iniciar projeto:
1. Consultar **Project Archetypes** â†’ identificar tipo, risk profile
2. Revisar **Resource Planning Patterns** â†’ dimensionar time
3. Configurar **Success Metrics** â†’ KPIs apropriados
4. Planejar **Milestone Structure** â†’ adequada ao contexto

### âœ… DURANTE execuÃ§Ã£o:
1. Aplicar **Stakeholder Management Patterns** â†’ comunicaÃ§Ã£o eficaz
2. Monitorar **Project Health Indicators** â†’ early warning
3. Aplicar **Risk Mitigation Strategies** â†’ proactive management
4. Consultar **Budget Management Insights** â†’ evitar overruns

### âœ… APÃ“S conclusÃ£o:
1. **Atualizar memÃ³ria** com novos learnings
2. Documentar **Retrospective Insights** â†’ continuous improvement
3. Calcular **Velocity Benchmarks** â†’ melhorar estimativas futuras
4. Adicionar **Conflict Resolution Patterns** â†’ se novos surgidos

---
