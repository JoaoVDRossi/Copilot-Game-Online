---

## ðŸŽ¯ Quando Usar Party Mode

### âœ… CenÃ¡rios Ideais:
- **Arquitetura Complexa**: Requer input de Architect (Wilson), Dev (Tiago), QA (Carla)
- **Design de Features**: Necessita colaboraÃ§Ã£o entre PO (Paula), UX (Sofia), Analyst (Maria)
- **Sprint Planning**: Envolve SM (Roberto), Dev (Tiago), QA (Carla), PO (Paula)
- **DecisÃµes de Trade-off**: MÃºltiplas perspectivas (tÃ©cnica, negÃ³cio, UX, qualidade)
- **Retrospectives**: Toda a equipe (todos os agentes)
- **Quality Gates**: ValidaÃ§Ã£o multi-dimensional antes de releases

### âŒ Quando NÃƒO Usar:
- Tarefas simples que um Ãºnico agente pode resolver
- Perguntas diretas com resposta Ãºnica
- EdiÃ§Ãµes de cÃ³digo triviais
- Consultas de documentaÃ§Ã£o

---

## ðŸŽª ConfiguraÃ§Ãµes de Party DisponÃ­veis

### 1. Architecture Party ðŸ—ï¸
**Participantes**: Wilson (Architect) + Tiago (Dev) + Carla (QA)  
**Foco**: DecisÃµes arquiteturais, ADRs, tech stack  
**Formato**: Round-robin discussion

**Comando**:
```
#party-mode â†’ architecture-party
```

**Fluxo**:
1. **Wilson**: PropÃµe arquitetura baseada em requisitos
2. **Tiago**: Valida implementabilidade, complexidade tÃ©cnica
3. **Carla**: Identifica riscos de qualidade, testabilidade
4. **Wilson**: Refina proposta com feedback
5. **Consenso**: ADR documentado

---

### 2. Design Party ðŸŽ¨
**Participantes**: Paula (PO) + Sofia (UX) + Maria (Analyst)  
**Foco**: User experience, product decisions, discovery  
**Formato**: Simultaneous discussion

**Comando**:
```
#party-mode â†’ design-party
```

**Fluxo**:
1. **Maria**: Apresenta discovery insights, user needs
2. **Sofia**: PropÃµe wireframes, design patterns
3. **Paula**: Valida value proposition, prioridade
4. **Todos**: IteraÃ§Ã£o colaborativa atÃ© consenso

---

### 3. Quality Party âœ…
**Participantes**: Carla (QA) + Tiago (Dev) + Wilson (Architect)  
**Foco**: Quality gates, code review, performance  
**Formato**: Sequential review

**Comando**:
```
#party-mode â†’ quality-party
```

**Fluxo**:
1. **Carla**: Executa test coverage analysis, identifica gaps
2. **Tiago**: Code review (clean code, best practices)
3. **Wilson**: Architecture review (escalabilidade, seguranÃ§a)
4. **Gate Decision**: Go/No-Go baseado em critÃ©rios

---

### 4. Sprint Party ðŸƒ
**Participantes**: Roberto (SM) + Paula (PO) + Tiago (Dev) + Carla (QA)  
**Foco**: Sprint planning, refinement, retrospectives  
**Formato**: Scrum ceremony simulation

**Comando**:
```
#party-mode â†’ sprint-party
```

**Fluxo (Planning)**:
1. **Paula**: Apresenta product backlog priorities
2. **Roberto**: Facilita capacity planning
3. **Tiago + Carla**: Estimam stories (planning poker style)
4. **Roberto**: Finaliza sprint backlog commitment

**Fluxo (Retrospective)**:
1. **Roberto**: Facilita discussÃ£o (Start/Stop/Continue)
2. **Todos**: Contribuem com insights especÃ­ficos de seu domÃ­nio
3. **Roberto**: Documenta action items

---

### 5. Full Party ðŸŽª
**Participantes**: Todos os 8 agentes  
**Foco**: DecisÃµes crÃ­ticas, kickoffs, post-mortems  
**Formato**: Facilitado pelo Supervisor

**Comando**:
```
#party-mode â†’ full-party
```

**Fluxo**:
1. **JoÃ£o (PM)**: Define objetivos da discussÃ£o
2. **Supervisor**: Orquestra ordem de participaÃ§Ã£o
3. **Cada agente**: Contribui com perspectiva especializada
4. **JoÃ£o**: Sintetiza decisÃµes, next steps

---

## ðŸŽ¬ Modos de OrquestraÃ§Ã£o

### Round-Robin Discussion
- Cada agente fala sequencialmente
- Ordem definida por relevÃ¢ncia ao tÃ³pico
- IteraÃ§Ãµes mÃºltiplas atÃ© consenso

**Exemplo**:
```yaml
round_1:
  - Wilson: "Proposta inicial de arquitetura"
round_2:
  - Tiago: "Feedback de implementaÃ§Ã£o"
  - Carla: "Riscos de qualidade"
round_3:
  - Wilson: "Arquitetura refinada"
```

### Simultaneous Discussion
- Todos os agentes contribuem em paralelo
- Ãštil para brainstorming, ideation
- Supervisor sintetiza ao final

### Sequential Review
- Cada agente revisa output do anterior
- Processo de refinamento em cadeia
- Garante mÃºltiplas camadas de validaÃ§Ã£o

---

## ðŸ“ Templates de AtivaÃ§Ã£o

### Template 1: Architecture Decision
```markdown
ðŸŽ­ Party Mode: Architecture Party

**Contexto**: [Descreva o problema arquitetural]

**Requisitos**:
- Performance: [target]
- Scalability: [target]
- Compliance: [requirements]

**Constraints**:
- Budget: [limite]
- Timeline: [prazo]
- Tech stack: [restriÃ§Ãµes]

**Agenda**:
1. Wilson: Proposta de arquitetura
2. Tiago: AvaliaÃ§Ã£o de implementabilidade
3. Carla: AnÃ¡lise de testabilidade
4. Wilson: ADR final

**Output esperado**: Architecture Decision Record (ADR)
```

### Template 2: Sprint Planning
```markdown
ðŸŽ­ Party Mode: Sprint Party

**Objetivo**: Planejar Sprint X

**Product Backlog Items**: [Lista de PBIs priorizados]

**Team Capacity**: [Story points disponÃ­veis]

**Agenda**:
1. Paula: Apresentar PBIs (5min each)
2. Roberto: Facilitar planning poker
3. Tiago + Carla: Estimativas e refinamento
4. Roberto: Commitment final

**Output esperado**: Sprint Backlog committed
```

### Template 3: Quality Gate
```markdown
ðŸŽ­ Party Mode: Quality Party

**Feature**: [Nome da feature]

**Checklist**:
- [ ] Code coverage > 80% (Carla)
- [ ] Clean code principles (Tiago)
- [ ] Security scan passed (Wilson)
- [ ] Performance benchmarks (Wilson)
- [ ] Accessibility compliance (Sofia - se aplicÃ¡vel)

**Agenda**:
1. Carla: Executar quality checks
2. Tiago: Code review
3. Wilson: Architecture & security review
4. Gate Decision: Go/No-Go

**Output esperado**: Quality Gate Report (Pass/Fail)
```

---

## ðŸŽ¯ Comandos de Controle

### AtivaÃ§Ã£o:
```bash
#party-mode â†’ [configuration]
#party-mode â†’ custom [agent1, agent2, agent3]
```

### Controle de DiscussÃ£o:
```bash
#party â†’ next speaker
#party â†’ pause
#party â†’ summarize
#party â†’ vote [topic]
#party â†’ end session
```

### ConfiguraÃ§Ã£o Customizada:
```yaml
custom_party:
  participants:
    - wilson  # Architect
    - tiago   # Developer
    - sofia   # UX Designer
  format: "round-robin"
  rounds: 3
  time_per_agent: "5min"
  output_format: "consensus-document"
```

---

## ðŸ“Š Outputs de Party Mode

### 1. Consensus Document
- DecisÃ£o final acordada por todos
- Rationale de cada perspectiva
- Action items com owners

### 2. Multi-Perspective Report
- SeÃ§Ãµes separadas por agente
- VisÃ£o consolidada ao final
- Matriz de trade-offs

### 3. Decision Matrix
```yaml
criteria:
  - name: "Performance"
    weight: 30%
    scores:
      option_a: 8
      option_b: 6
  - name: "Maintainability"
    weight: 25%
    scores:
      option_a: 7
      option_b: 9
  - name: "Time to Market"
    weight: 20%
    scores:
      option_a: 5
      option_b: 9

recommendation: "Option B (weighted score: 8.05 vs 7.15)"
```

---

## ðŸ§  Memory Integration

Cada agente acessa sua prÃ³pria memÃ³ria durante Party Mode:

```yaml
maria_memory: ${AVANADE_MEMORY_ANALYST_MARIA}
wilson_memory: ${AVANADE_MEMORY_ARCHITECT_WILSON}
paula_memory: ${AVANADE_MEMORY_PO_PAULA}
roberto_memory: ${AVANADE_MEMORY_SM_ROBERTO}
carla_memory: ${AVANADE_MEMORY_QA_CARLA}
tiago_memory: ${AVANADE_MEMORY_DEV_TIAGO}
sofia_memory: ${AVANADE_MEMORY_UX_SOFIA}
joao_memory: ${AVANADE_MEMORY_PM_JOAO}
supervisor_memory: ${AVANADE_MEMORY_SUPERVISOR}
```

MemÃ³rias informam cada agente sobre:
- PadrÃµes recorrentes em seu domÃ­nio
- LiÃ§Ãµes aprendidas de discussÃµes anteriores
- PreferÃªncias de stakeholders
- DecisÃµes histÃ³ricas

---

## âœ… Best Practices

### DO:
- âœ… Definir objetivos claros antes de ativar Party Mode
- âœ… Escolher configuraÃ§Ã£o adequada ao problema
- âœ… Documentar decisÃµes tomadas (ADRs, meeting notes)
- âœ… Atualizar memÃ³rias dos agentes apÃ³s sessÃµes
- âœ… Limitar participantes ao necessÃ¡rio (nÃ£o convocar todos sempre)

### DON'T:
- âŒ Usar Party Mode para tarefas triviais (overhead desnecessÃ¡rio)
- âŒ Convocar agentes irrelevantes ao contexto
- âŒ Pular documentaÃ§Ã£o de decisÃµes
- âŒ Ignorar dissenting opinions (explorar divergÃªncias)
- âŒ Executar Party Mode sem agenda definida

---

## ðŸ”— IntegraÃ§Ãµes

### Com Workflows Avanade Method:
- **Create Architecture** â†’ Architecture Party
- **Sprint Planning** â†’ Sprint Party
- **Code Review** â†’ Quality Party
- **UX Design** â†’ Design Party

### Com Tasks:
- `${AVANADE_TASK_ADVANCED_ELICITATION}` â†’ Design Party
- `${AVANADE_TASK_ARCHITECTURE_QUALITY}` â†’ Architecture Party
- `${AVANADE_TASK_RETROSPECTIVE_FACILITATION}` â†’ Sprint Party

### Com Templates:
- `${AVANADE_ARCHITECTURE_TEMPLATE}` â†’ Output de Architecture Party
- `${AVANADE_PRD_TEMPLATE_YAML}` â†’ Output de Design Party
- `${AVANADE_STORY_TEMPLATE_YAML}` â†’ Output de Sprint Party

---

## ðŸ“š ReferÃªncias

- MemÃ³ria do Supervisor: `${AVANADE_MEMORY_SUPERVISOR}`
- Compliance Methodology: `${AVANADE_TASK_METHODOLOGY_COMPLIANCE}`
- Retrospective Guide: `${AVANADE_TASK_RETROSPECTIVE_FACILITATION}`

---
