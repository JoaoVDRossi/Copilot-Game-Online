## Objetivo
Validar aderÃªncia do projeto Ã  Avanade Method e best practices de delivery.

---

## ðŸ“‹ Avanade Method Pillars

### 1. Discovery First (Entender Antes de Construir)
**CritÃ©rio**: Problema e contexto profundamente entendidos antes de soluÃ§Ãµes

**Checklist**:
- [ ] **Problem Statement**: Problema claramente definido
- [ ] **Stakeholders**: Mapeados (poder vs interesse)
- [ ] **User Research**: Entrevistas, surveys, ou dados qualitativos
- [ ] **Current State**: As-Is documentado (processos, sistemas)
- [ ] **Success Criteria**: MÃ©tricas de sucesso definidas

**Red Flags**:
- âŒ "Vamos construir X porque sim"
- âŒ Pulando direto para soluÃ§Ã£o tÃ©cnica
- âŒ Stakeholders descobertos durante implementaÃ§Ã£o

**Artifacts**:
- Discovery Document (${AVANADE_DISCOVERY_TEMPLATE_YAML})
- User Personas
- Stakeholder Map
- Current State Assessment

---

### 2. Artifacts-Driven (DocumentaÃ§Ã£o Viva)
**CritÃ©rio**: Artefatos estruturados, completos, e mantidos atualizados

**Checklist**:
- [ ] **PRD**: Product Requirements Document atualizado
- [ ] **Architecture**: DocumentaÃ§Ã£o tÃ©cnica (ADRs, diagramas C4)
- [ ] **Stories**: Backlog com User Stories INVEST-compliant
- [ ] **Tests**: Test plans e casos de teste documentados
- [ ] **Design**: Wireframes, UI specs, Figma/Sketch files
- [ ] **API Specs**: OpenAPI/Swagger para APIs
- [ ] **Deployment**: Runbooks, infra-as-code (Terraform/Bicep)

**PadrÃ£o de Qualidade**:
Todos artefatos devem passar:
- ${AVANADE_TASK_EDITORIAL_REVIEW_PROSE} (clareza)
- ${AVANADE_TASK_EDITORIAL_REVIEW_STRUCTURE} (completude)

**Red Flags**:
- âŒ "CÃ³digo Ã© a documentaÃ§Ã£o"
- âŒ Artefatos desatualizados (>1 sprint)
- âŒ DecisÃµes arquiteturais nÃ£o documentadas (sem ADRs)

---

### 3. Quality Gates (ValidaÃ§Ã£o em Cada Fase)
**CritÃ©rio**: ValidaÃ§Ã£o rigorosa antes de avanÃ§ar para prÃ³xima fase

**Quality Gates por Fase**:

#### ðŸ” Discovery â†’ Planning
- [ ] **Discovery completo**: Todos stakeholders entrevistados
- [ ] **Problem validation**: Dados suportam necessidade
- [ ] **Success metrics**: KPIs definidos e mensurÃ¡veis
- [ ] **Scope agreed**: PO e stakeholders alinhados

#### ðŸ“ Planning â†’ Design
- [ ] **PRD aprovado**: PO validou requisitos
- [ ] **Stories escritas**: Backlog priorizado (RICE/INVEST)
- [ ] **Dependencies mapeadas**: IntegraÃ§Ãµes/APIs identificadas
- [ ] **Risks identified**: Riscos tÃ©cnicos e de negÃ³cio documentados

#### ðŸ—ï¸ Design â†’ Development
- [ ] **Architecture reviewed**: ${AVANADE_TASK_ARCHITECTURE_QUALITY}
- [ ] **ADRs criados**: DecisÃµes crÃ­ticas documentadas
- [ ] **Wireframes aprovados**: UX validada com usuÃ¡rios/stakeholders
- [ ] **DoD definido**: Definition of Done acordado

#### ðŸ’» Development â†’ QA
- [ ] **Code review**: Aprovado por peer (${AVANADE_TASK_CODE_REVIEW})
- [ ] **Unit tests**: Coverage â‰¥ 80% (${AVANADE_TASK_TEST_COVERAGE})
- [ ] **Documentation**: README, comments, API docs atualizados
- [ ] **CI/CD**: Pipeline verde (build + tests passando)

#### âœ… QA â†’ Production
- [ ] **Test plan executed**: Todos cenÃ¡rios testados
- [ ] **UAT approved**: PO/usuÃ¡rios validaram funcionalidade
- [ ] **Performance tested**: Load tests executados
- [ ] **Security reviewed**: Scan de vulnerabilidades (Snyk, SonarQube)
- [ ] **Deployment plan**: Runbook pronto, rollback strategy definida

**Red Flags**:
- âŒ Pular fases ("vamos codificar direto")
- âŒ Aprovar fase com issues conhecidos
- âŒ QA comeÃ§ando apenas no final

---

### 4. Self-Evolution (Melhoria ContÃ­nua)
**CritÃ©rio**: Time reflete e melhora processos regularmente

**Checklist**:
- [ ] **Retrospectives**: Executadas a cada sprint
- [ ] **Action items**: Rastreados e implementados
- [ ] **Metrics tracking**: Velocity, quality, happiness medidos
- [ ] **Knowledge sharing**: Learnings compartilhados (wiki, demos)
- [ ] **Process improvements**: Workflow ajustado baseado em feedback

**Artifacts**:
- Sprint Retrospective Notes (${AVANADE_TASK_RETROSPECTIVE_FACILITATION})
- Action Items Tracker
- Metrics Dashboard (Velocity, Defect Density, Lead Time)

**Red Flags**:
- âŒ Mesmos problemas recorrentes (3+ sprints)
- âŒ Retrospectives canceladas ou superficiais
- âŒ AÃ§Ãµes nunca implementadas

---

### 5. Multi-Agent Coordination (ColaboraÃ§Ã£o Estruturada)
**CritÃ©rio**: Agentes/personas trabalham em sinergia, nÃ£o silos

**Checklist**:
- [ ] **Handoffs claros**: Discovery â†’ PM â†’ Architect â†’ Dev â†’ QA â†’ PO
- [ ] **Shared context**: Todos agentes acessam mesmos artefatos
- [ ] **Cross-functional reviews**: Architect revisa stories, QA participa de design
- [ ] **Party Mode**: DiscussÃµes colaborativas quando apropriado (${AVANADE_PARTY_MODE_GUIDE})
- [ ] **Memory sharing**: Aprendizados de 1 agente disponÃ­veis para outros

**Exemplos de ColaboraÃ§Ã£o**:
```
âœ… Bom: Wilson (Architect) + Tiago (Dev) + Carla (QA) discutem design juntos
âŒ Ruim: Architect desenha sozinho â†’ joga para Dev â†’ problemas surgem depois
```

**Party Mode Scenarios**:
- DecisÃµes arquiteturais crÃ­ticas â†’ Architecture Party
- Sprint retrospectives â†’ Full Party
- Design reviews â†’ UX + Dev + Architect

---

## ðŸ§  Memory System (Knowledge Management)
**CritÃ©rio**: Conhecimento Ã© capturado, armazenado, e reutilizado

**Checklist**:
- [ ] **Agent-specific memories**: Cada agente mantÃ©m memÃ³ria (decisions, patterns, learnings)
- [ ] **Consulta prÃ©-execuÃ§Ã£o**: Agentes consultam memÃ³ria ANTES de executar
- [ ] **AtualizaÃ§Ã£o pÃ³s-execuÃ§Ã£o**: MemÃ³ria atualizada APÃ“S cada interaÃ§Ã£o
- [ ] **Cross-agent access**: Supervisor acessa memÃ³ria de todos agentes

**Estrutura de MemÃ³ria**:
```
_memory/
â”œâ”€â”€ analyst-sidecar/        â†’ ${AVANADE_MEMORY_ANALYST_MARIA}
â”œâ”€â”€ architect-sidecar/      â†’ ${AVANADE_MEMORY_ARCHITECT_WILSON}
â”œâ”€â”€ po-sidecar/             â†’ ${AVANADE_MEMORY_PO_PAULA}
â”œâ”€â”€ sm-sidecar/             â†’ ${AVANADE_MEMORY_SM_ROBERTO}
â”œâ”€â”€ qa-sidecar/             â†’ ${AVANADE_MEMORY_QA_CARLA}
â”œâ”€â”€ dev-sidecar/            â†’ ${AVANADE_MEMORY_DEV_TIAGO}
â”œâ”€â”€ ux-sidecar/             â†’ ${AVANADE_MEMORY_UX_SOFIA}
â””â”€â”€ supervisor-sidecar/     â†’ ${AVANADE_MEMORY_SUPERVISOR}
```

**ConteÃºdo TÃ­pico**:
- Decisions & rationale (por que escolhemos X?)
- Patterns validados (code patterns, design patterns)
- Common mistakes (bugs recorrentes, anti-patterns)
- User preferences (templates customizados)

**Red Flags**:
- âŒ Mesma pergunta feita mÃºltiplas vezes (memÃ³ria nÃ£o consultada)
- âŒ DecisÃµes nÃ£o documentadas (lost knowledge)
- âŒ Zero reuso de padrÃµes validados

---

## ðŸ“Š Compliance Scoring

**Pontos por pilar** (0-20):
- Discovery First: /20
- Artifacts-Driven: /20
- Quality Gates: /20
- Self-Evolution: /20
- Multi-Agent Coordination: /20

**Total: /100**

**InterpretaÃ§Ã£o**:
- **85-100**: âœ… **EXCELENTE** - Avanade Method totalmente implementado
- **70-84**: ðŸŸ¢ **BOM** - AderÃªncia forte, gaps menores
- **50-69**: ðŸŸ¡ **ADEQUADO** - Avanade Method parcialmente seguido
- **30-49**: ðŸŸ  **FRACO** - Desvios significativos da metodologia
- **0-29**: ðŸ”´ **INADEQUADO** - Metodologia nÃ£o estÃ¡ sendo seguida

---

## ðŸŽ¯ AÃ§Ãµes Corretivas por Faixa

### 85-100 (Excelente)
**AÃ§Ãµes**:
- Continuar prÃ¡ticas atuais
- Compartilhar learnings com outros projetos
- Considerar tornar-se projeto referÃªncia

### 70-84 (Bom)
**AÃ§Ãµes**:
- Identificar gaps especÃ­ficos (scoring detalhado)
- Priorizar 2-3 melhorias para prÃ³ximo sprint
- Revisar retrospectives (estÃ£o gerando aÃ§Ãµes?)

### 50-69 (Adequado)
**AÃ§Ãµes**:
- Revisar processos com Supervisor
- Training sessions em Ã¡reas fracas
- Aumentar frequÃªncia de quality gates

### 30-49 (Fraco)
**AÃ§Ãµes**:
- **IntervenÃ§Ã£o necessÃ¡ria**: RevisÃ£o completa de processo
- Workshop de Avanade Method com todo time
- Supervisor ativamente facilitando handoffs

### 0-29 (Inadequado)
**AÃ§Ãµes**:
- **Red Alert**: EscalaÃ§Ã£o para lideranÃ§a
- Parar e reavaliar se metodologia estÃ¡ sendo seguida
- Reset do projeto com fundamentaÃ§Ã£o adequada

---

## ðŸ“‹ Checklist RÃ¡pida (Sprint Review)

Ao final de cada sprint, validar:
- [ ] **Discovery**: Requisitos claros? Problema validado?
- [ ] **Artifacts**: Atualizados e completos?
- [ ] **Quality Gates**: Todos passaram?
- [ ] **Retrospective**: Executada com aÃ§Ãµes rastreadas?
- [ ] **Collaboration**: Agentes trabalharam juntos?
- [ ] **Memory**: Aprendizados documentados?

**Se qualquer item falhar**: Adicionar aÃ§Ã£o corretiva na retrospective.

---

## ðŸ”— IntegraÃ§Ã£o com Metodologia Avanade

- **FrequÃªncia**: Avaliar a cada sprint review (quinzenal)
- **Owner**: Supervisor ou Scrum Master
- **Output**: Compliance Report + Action Plan
- **Artifacts Relacionados**:
  - ${AVANADE_TASK_EDITORIAL_REVIEW_STRUCTURE}
  - ${AVANADE_TASK_ADVERSARIAL_REVIEW}
  - ${AVANADE_PARTY_MODE_GUIDE}
  - Todas as ${AVANADE_MEMORY_*} (memÃ³rias de agentes)

