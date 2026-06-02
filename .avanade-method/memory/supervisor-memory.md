### Project Archetypes Identificados
_Tipos de projetos e padrÃµes de orquestraÃ§Ã£o_

**Exemplo**:
```yaml
- archetype: "Enterprise Integration"
  characteristics:
    - MÃºltiplos sistemas legacy
    - Compliance pesado (LGPD, SOX)
    - Stakeholders tÃ©cnicos e de negÃ³cio
  recommended_workflow: "Waterfall-Agile hybrid"
  key_agents:
    - primary: [Wilson, Tiago, Carla]
    - secondary: [Maria, JoÃ£o]
  party_mode_usage: "Alta (Architecture Parties frequentes)"
  timeline_pattern: "3-6 meses, releases mensais"
  
- archetype: "MVP/Startup Product"
  characteristics:
    - Time pequeno (3-5 pessoas)
    - Pivot-friendly
    - Focus em speed-to-market
  recommended_workflow: "Lean Startup + Scrum"
  key_agents:
    - primary: [Paula, Sofia, Tiago]
    - secondary: [Maria, Roberto]
  party_mode_usage: "MÃ©dia (Design Parties)"
  timeline_pattern: "2-4 semanas, releases semanais"
  
- archetype: "E-commerce Platform"
  characteristics:
    - Alta carga (performance crÃ­tica)
    - UX Ã© diferencial competitivo
    - Escalabilidade horizontal necessÃ¡ria
  recommended_workflow: "Scrum com UX sprints antecipados"
  key_agents:
    - primary: [Sofia, Wilson, Tiago]
    - secondary: [Paula, Carla]
  party_mode_usage: "Alta (Design + Architecture Parties)"
  timeline_pattern: "4-8 meses, releases bi-semanais"
```

---

### Agent Coordination Patterns
_PadrÃµes de orquestraÃ§Ã£o entre agentes_

**Exemplo**:
```yaml
- pattern: "Discovery-Driven Development"
  sequence:
    1. Maria (Analyst): Discovery Protocol execution
    2. Sofia (UX): Wireframes baseados em discovery
    3. Paula (PO): PRD com value proposition validado
    4. Wilson (Architect): Arquitetura com NFRs claros
    5. Roberto (SM): Breakdown em stories
    6. Tiago (Dev): ImplementaÃ§Ã£o
    7. Carla (QA): Quality gates
  effectiveness: "Alta"
  best_for: "Greenfield projects, requirements incertos"
  
- pattern: "Architecture-First"
  sequence:
    1. Wilson (Architect): Spike tÃ©cnico, ADR inicial
    2. Maria (Analyst): Discovery focado em constraints tÃ©cnicos
    3. Paula (PO): PriorizaÃ§Ã£o baseada em capacidade tÃ©cnica
    4. Tiago (Dev): PoC de decisÃµes crÃ­ticas
    5. Fluxo normal (Roberto â†’ Tiago â†’ Carla)
  effectiveness: "MÃ©dia-Alta"
  best_for: "Projetos com constraints tÃ©cnicos fortes (compliance, performance)"
  
- pattern: "Lean UX Loop"
  sequence:
    1. Sofia (UX): Low-fi prototypes
    2. Maria (Analyst): ValidaÃ§Ã£o com usuÃ¡rios
    3. Sofia (UX): Refino baseado em feedback
    4. Paula (PO): Spec de features validadas
    5. Tiago (Dev): ImplementaÃ§Ã£o incremental
  effectiveness: "Alta"
  best_for: "Produtos consumer-facing, UX Ã© prioridade"
```

---

### Workflow Optimization Insights
_Aprendizados sobre execuÃ§Ã£o de workflows_

**Exemplo**:
```yaml
- workflow: "Create Architecture"
  insight: "ADRs devem ser escritos DURANTE discussÃ£o (nÃ£o depois)"
  rationale: "Context loss se deixar para depois â†’ decisÃµes mal documentadas"
  improvement: "Wilson documenta ADR real-time durante Architecture Party"
  impact: "Qualidade de ADRs +40%, tempo de revisÃ£o -30%"
  
- workflow: "Sprint Planning"
  insight: "Estimar stories > 8 SP em Planning Ã© bottleneck"
  rationale: "Stories grandes causam debates longos, estimativas imprecisas"
  improvement: "Refinement obrigatÃ³rio para PBIs > 5 SP antes de Planning"
  impact: "Planning duration -50% (4h â†’ 2h para sprint de 2 semanas)"
  
- workflow: "Code Review"
  insight: "Review apenas por Tiago perde perspectiva de qualidade"
  rationale: "Dev foca em code style, miss security/performance issues"
  improvement: "Quality Party para features crÃ­ticas (Tiago + Carla + Wilson)"
  impact: "Bugs em produÃ§Ã£o -60%, vulnerabilidades detectadas +80%"
```

---

### Party Mode Effectiveness Data
_AnÃ¡lise de quando Party Mode agrega valor_

**Exemplo**:
```yaml
- party_type: "Architecture Party"
  activation_count: 23
  avg_duration: "90 minutos"
  success_rate: "87% (decisÃµes nÃ£o revertidas apÃ³s)"
  value_indicators:
    - "ADRs mais completos (trade-offs documentados)"
    - "ImplementaÃ§Ã£o mais suave (menos surpresas)"
    - "Buy-in tÃ©cnico maior (devs participaram de decisÃ£o)"
  anti_patterns_avoided:
    - "Architecture Astronaut (Wilson sozinho â†’ overengineering)"
    - "YAGNI extremo (Tiago sozinho â†’ technical debt)"
  
- party_type: "Sprint Party"
  activation_count: 45
  avg_duration: "120 minutos"
  success_rate: "92% (sprints commitments cumpridos)"
  value_indicators:
    - "Estimativas mais precisas (planning poker com contexto)"
    - "QA envolvido early (Carla identifica test scenarios up-front)"
    - "Dependencies identificadas cedo (menos blockers)"
  
- party_type: "Full Party"
  activation_count: 8
  avg_duration: "180 minutos"
  success_rate: "75% (consenso alcanÃ§ado)"
  notes: "Usado para decisÃµes crÃ­ticas (pivot, tech stack change, major releases)"
  lesson: "Limitado a decisÃµes realmente crÃ­ticas - overhead alto"
```

---

### Deployment Patterns (Agent Terraform)
_ConfiguraÃ§Ãµes de VSCode deployment que funcionaram_

**Exemplo**:
```yaml
- deployment_type: "Full Stack Team"
  personas_deployed: "Todos os 8 agentes"
  templates_deployed: "PRD, Architecture, Story, Discovery"
  copilot_instructions: "Global (todos agentes acessÃ­veis)"
  project_type: "Enterprise application"
  team_size: ">10 pessoas"
  feedback: "Positivo - dropdown de personas muito usado"
  
- deployment_type: "Startup Lean Team"
  personas_deployed: "Paula, Sofia, Tiago (core 3)"
  templates_deployed: "PRD, Story"
  copilot_instructions: "Minimal (foco em speed)"
  project_type: "MVP development"
  team_size: "3-5 pessoas"
  feedback: "Positivo - menos overhead, mais agilidade"
  
- deployment_type: "Architecture Focus"
  personas_deployed: "Wilson, Tiago, Carla"
  templates_deployed: "Architecture, ADR"
  copilot_instructions: "Tech-heavy (NFRs, security)"
  project_type: "ModernizaÃ§Ã£o de legacy system"
  team_size: "5-8 pessoas (seniors)"
  feedback: "Positivo - ADRs documentados consistentemente"
```

---

### MCP Artifact Management Patterns
_EstratÃ©gias eficazes de uso de artifacts_

**Exemplo**:
```yaml
- pattern: "Artifact-Driven Generation"
  description: "Gerar .chatmode.md e .prompt.md automaticamente de artifacts"
  benefits:
    - "Single source of truth (MCP)"
    - "AtualizaÃ§Ã£o em todos projects simultaneamente"
    - "Versionamento centralizado"
  challenges:
    - "Requer MCP server funcionando"
    - "Troubleshooting mais complexo (layer adicional)"
  recommendation: "Usar para teams > 5 pessoas, mÃºltiplos projects"
  
- pattern: "Hybrid (Artifacts + Manual)"
  description: "Personas core via artifacts, customizaÃ§Ãµes manuais"
  benefits:
    - "Flexibilidade para project-specific needs"
    - "Fallback se MCP falhar"
  challenges:
    - "Risco de drift (manual diverge de artifacts)"
  recommendation: "Usar para experimentaÃ§Ã£o, novos workflows"
```

---

## ðŸŽ“ Methodological Learnings

### Elicitation Patterns que Funcionam
_TÃ©cnicas de discovery multi-agente_

**Exemplo**:
```yaml
- technique: "Reverse Pitch"
  description: "Maria (Analyst) apresenta entendimento de requisitos DE VOLTA ao stakeholder"
  effectiveness: "Alta (95% accuracy em capturar requirements)"
  why_works: "Stakeholder corrige mal-entendidos early, valida alinhamento"
  when_use: "ApÃ³s discovery inicial, antes de PRD"
  
- technique: "Five Whys (Party Mode)"
  description: "Design Party usa Five Whys colaborativamente"
  effectiveness: "MÃ©dia-Alta (insights mais profundos)"
  participants: "Maria (facilitador) + Paula (business value) + Sofia (user needs)"
  why_works: "MÃºltiplas perspectivas revelam root causes complexos"
  when_use: "Problem spaces complexos, soluÃ§Ãµes nÃ£o Ã³bvias"
```

---

### Quality Gate Configurations
_ConfiguraÃ§Ãµes de quality gates eficazes_

**Exemplo**:
```yaml
- gate: "Pre-Production Release Gate"
  checklist:
    - code_coverage: ">80% (Carla)"
    - security_scan: "No high/critical vulns (Wilson)"
    - performance_benchmark: "P95 < 200ms (Wilson)"
    - accessibility: "WCAG AA (Sofia)"
    - clean_code: "No major code smells (Tiago)"
  party_mode: "Quality Party (Carla + Tiago + Wilson)"
  pass_rate: "78%"
  lesson: "Gates rigorosos previnem 90% dos bugs em produÃ§Ã£o, mas aumentam cycle time +15%"
  
- gate: "Story Ready for Sprint"
  checklist:
    - invest_criteria: "Passed (Roberto)"
    - acceptance_criteria: "TestÃ¡veis (Carla)"
    - dependencies: "Identificadas (Roberto)"
    - estimation: "Team consensus (Tiago + Carla)"
  party_mode: "Sprint Party (refinement)"
  pass_rate: "92%"
  lesson: "Stories bem refinadas â†’ sprints mais previsÃ­veis"
```

---

## ðŸ”„ Self-Evolution Insights

### Supervisor Capabilities Evolution
_Como supervisor melhorou ao longo do tempo_

**Exemplo**:
```yaml
- version: "v5.0"
  capability: "Basic orchestration (Maria â†’ Paula â†’ Tiago)"
  limitation: "OrquestraÃ§Ã£o sequencial apenas, sem party mode"
  
- version: "v5.5"
  capability: "Party Mode introduzido (round-robin)"
  improvement: "DecisÃµes arquiteturais 40% mais rÃ¡pidas (consenso multi-agente)"
  
- version: "v6.0"
  capability: "Agent Terraform (VSCode auto-deploy)"
  improvement: "Setup time 0h (era 2-4h manuais), zero-config experience"
  next_evolution: "Self-healing deployments, auto-update artifacts"
```

---

### Retrospective Learnings (Meta)
_Aprendizados sobre como conduzir retrospectives_

**Exemplo**:
```yaml
- learning: "Retros precisam de facilitador neutro"
  context: "Roberto (SM) facilita, mas devs hesitam em criticar processo Scrum"
  solution: "Full Party com JoÃ£o (PM) facilitando - perspectiva externa"
  impact: "Feedback mais honesto, action items mais acionÃ¡veis"
  
- learning: "Action items sem owner morrem"
  context: "60% dos action items nÃ£o eram executados"
  solution: "Roberto atribui owner + deadline durante retro"
  impact: "Completion rate 60% â†’ 85%"
```

---

## ðŸ“Š Metrics & KPIs Tracking

### Agent Performance Indicators
_MÃ©tricas de eficÃ¡cia de cada agente_

**Exemplo**:
```yaml
- agent: "Maria (Analyst)"
  metric: "Discovery completeness"
  measurement: "% de requisitos nÃ£o descobertos em discovery"
  baseline: "25% miss rate"
  current: "8% miss rate"
  improvement_driver: "Advanced Elicitation Task + Memory usage"
  
- agent: "Wilson (Architect)"
  metric: "ADR quality"
  measurement: "ADRs revertidos ou heavily modified"
  baseline: "30% revert rate"
  current: "12% revert rate"
  improvement_driver: "Architecture Party (multi-perspective validation)"
  
- agent: "Tiago (Dev)"
  metric: "Code quality (Sonar)"
  measurement: "Code smells per 1k LOC"
  baseline: "15 smells/1k LOC"
  current: "6 smells/1k LOC"
  improvement_driver: "Clean Code Task enforcement"
```

---

## ðŸ”— Cross-References

### Artifacts Relacionados:
- Party Mode Guide: `${AVANADE_PARTY_MODE_GUIDE}`
- Methodology Compliance: `${AVANADE_TASK_METHODOLOGY_COMPLIANCE}`
- Retrospective Facilitation: `${AVANADE_TASK_RETROSPECTIVE_FACILITATION}`

### Agent Memories:
```yaml
analyst: ${AVANADE_MEMORY_ANALYST_MARIA}
architect: ${AVANADE_MEMORY_ARCHITECT_WILSON}
po: ${AVANADE_MEMORY_PO_PAULA}
sm: ${AVANADE_MEMORY_SM_ROBERTO}
qa: ${AVANADE_MEMORY_QA_CARLA}
dev: ${AVANADE_MEMORY_DEV_TIAGO}
ux: ${AVANADE_MEMORY_UX_SOFIA}
pm: ${AVANADE_MEMORY_PM_JOAO}
```

### Templates:
```yaml
prd: ${AVANADE_PRD_TEMPLATE_YAML}
architecture: ${AVANADE_ARCHITECTURE_TEMPLATE}
story: ${AVANADE_STORY_TEMPLATE_YAML}
discovery: ${AVANADE_DISCOVERY_TEMPLATE_YAML}
```

---

## ðŸ“Œ Como Usar Esta MemÃ³ria

### âœ… ANTES de orquestrar agentes:
1. Consultar **Project Archetypes** â†’ identificar tipo de projeto
2. Revisar **Agent Coordination Patterns** â†’ escolher fluxo adequado
3. Consultar **Party Mode Effectiveness** â†’ decidir quando usar Party Mode
4. Revisar **Quality Gate Configurations** â†’ configurar gates apropriados

### âœ… DURANTE orquestraÃ§Ã£o:
1. Aplicar **Workflow Optimization Insights** â†’ evitar anti-patterns conhecidos
2. Referenciar **Elicitation Patterns** â†’ guiar discovery multi-agente
3. Monitorar **Agent Performance Indicators** â†’ identificar gaps early

### âœ… APÃ“S conclusÃ£o de projeto:
1. **Atualizar memÃ³ria** com novos insights
2. Documentar **Self-Evolution** â†’ o que melhorou
3. Adicionar **Retrospective Learnings** â†’ liÃ§Ãµes para prÃ³ximos projetos
4. Atualizar **Deployment Patterns** â†’ configuraÃ§Ãµes VSCode eficazes

---
