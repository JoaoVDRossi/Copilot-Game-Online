## ðŸ“‹ O que Ã© este Workflow?

O **create-product-brief** Ã© um workflow Avanade Method v6 de discovery colaborativo que cria um product brief atravÃ©s de facilitaÃ§Ã£o passo-a-passo. Ã‰ o **kick-off opcional do Phase 1-Discovery** - uma alternativa mais leve que comeÃ§ar direto no PRD.

**Filosofia**: "Collaborative discovery antes de commitment - validar visÃ£o antes de PRD completo"

---

## ðŸŽ¯ Quando Usar?

### âœ… Use create-product-brief quando:
- **Greenfield project** com visÃ£o ainda nebulosa (precisa discovery antes de PRD)
- **Stakeholder alignment** necessÃ¡rio ANTES de PRD detalhado
- **Quick validation** de ideia (brief = 2-3 pÃ¡ginas, PRD = 10-20 pÃ¡ginas)
- **Kickoff meeting** estruturado com stakeholders
- **Budget approval** precisa de documento conciso de visÃ£o
- **Multiple options** sendo consideradas (brief compara alternativas)

### âŒ NÃƒO use quando:
- VisÃ£o jÃ¡ estÃ¡ clara e aprovada (vÃ¡ direto para PRD)
- Projeto urgente sem tempo para discovery (use quick-spec)
- Brief jÃ¡ existe e estÃ¡ validado (vÃ¡ para PRD ou research)
- Projeto muito simples (<1 semana, use quick-dev)

---

## ðŸ”„ Workflow Process (6 Steps)

### STEP 1: init
**Objetivo**: Detectar continuaÃ§Ã£o ou novo brief
**AÃ§Ãµes**:
- Perguntar: "Criar novo brief ou continuar existente?"
- Se existente: Carregar `{planning_artifacts}/product-brief.md`
- Se novo: Inicializar template vazio
- Configurar contexto de facilitaÃ§Ã£o

**Output**: Brief template ou brief existente carregado

---

### STEP 2: vision (Problem & Solution)
**Objetivo**: Articular problema e soluÃ§Ã£o de alto nÃ­vel
**Descoberta Guiada**:
```yaml
Perguntas Facilitadoras:
1. "Qual problema especÃ­fico este produto resolve?" 
   â†’ Dor real de usuÃ¡rios/negÃ³cio, nÃ£o feature list
2. "Para quem Ã© este problema?" 
   â†’ User personas primÃ¡rias (nÃ£o "todos")
3. "Qual a soluÃ§Ã£o proposta (1-2 frases)?"
   â†’ WHAT not HOW - "Automatizar exports" nÃ£o "Build API REST"
4. "Qual o diferencial desta soluÃ§Ã£o?"
   â†’ O que faz melhor que alternativas atuais
5. "Por que resolver AGORA?"
   â†’ Market timing, regulatory, competitive pressure
```

**DocumentaÃ§Ã£o**:
```markdown
## Problem Statement
[Problema especÃ­fico com contexto de negÃ³cio]

## Target Users
[Personas primÃ¡rias - nÃ£o mais que 2-3]

## Proposed Solution
[DescriÃ§Ã£o high-level da soluÃ§Ã£o - 2-3 parÃ¡grafos]

## Value Proposition
[Por que esta soluÃ§Ã£o? Diferencial competitivo?]

## Why Now?
[Urgency drivers - market, regulatory, competitive]
```

**ValidaÃ§Ã£o**: Problem Statement claro? Target Users especÃ­ficos? Solution WHAT not HOW?

---

### STEP 3: users (User Segments & Journeys)
**Objetivo**: Definir user segments e suas jornadas de alto nÃ­vel
**Descoberta Guiada**:
```yaml
Perguntas Facilitadoras:
1. "Quais sÃ£o os user segments principais?"
   â†’ Segmentar por comportamento/necessidades, nÃ£o demografia
2. "Para cada segment, qual o workflow atual (as-is)?"
   â†’ Pain points, manual steps, frustrations
3. "Qual a jornada ideal (to-be) com este produto?"
   â†’ High-level user journey, nÃ£o detailed UI flows
4. "Quais sÃ£o os key touchpoints?"
   â†’ Onde usuÃ¡rio interage com produto
```

**DocumentaÃ§Ã£o**:
```markdown
## User Segments

### Segment 1: [Nome]
- **Characteristics**: [Quem sÃ£o, role, context]
- **Current Pain Points**: [3-5 frustraÃ§Ãµes especÃ­ficas]
- **Goals with Product**: [O que querem alcanÃ§ar]

### Segment 2: [Nome]
...

## High-Level User Journeys

### Journey 1: [Nome - ex: "Export Monthly Report"]
**As-Is (Current State)**:
1. [Manual step 1]
2. [Manual step 2]
...
**Pain Points**: [Time, errors, complexity]

**To-Be (With Product)**:
1. [Automated/improved step 1]
2. [Automated/improved step 2]
...
**Benefits**: [Time saved, error reduction, ease]
```

**ValidaÃ§Ã£o**: User segments claros? Pain points especÃ­ficos? Journeys focam em outcomes nÃ£o features?

---

### STEP 4: metrics (Success Criteria)
**Objetivo**: Definir mÃ©tricas de sucesso mensurÃ¡veis
**Descoberta Guiada**:
```yaml
Perguntas Facilitadoras:
1. "Como saberemos que este produto teve sucesso?"
   â†’ MÃ©tricas de negÃ³cio, nÃ£o vanity metrics
2. "Quais KPIs existem hoje (baseline)?"
   â†’ Estabelecer linha de base para comparaÃ§Ã£o
3. "Qual a meta realista em 3-6 meses?"
   â†’ Targets especÃ­ficos e alcanÃ§Ã¡veis
4. "Quais mÃ©tricas de adoÃ§Ã£o rastreamos?"
   â†’ User engagement, retention, satisfaction
```

**DocumentaÃ§Ã£o**:
```markdown
## Success Metrics

### Business Impact
- **Metric 1**: [ex: "Reduzir tempo de export de 1.8h para 15min"]
  - Baseline: 1.8h/day per user
  - Target: <15min automated
  - Measurement: Time tracking logs
  
- **Metric 2**: [ex: "Reduzir error rate de 40% para <5%"]
  - Baseline: 40% de exports com erros
  - Target: <5% error rate
  - Measurement: Error logs analysis

### User Adoption
- **Active Users**: [Target apÃ³s 3 meses]
- **User Satisfaction**: [NPS ou CSAT target]
- **Feature Adoption**: [% de users usando feature core]

### Technical Metrics
- **Performance**: [Response time, uptime targets]
- **Reliability**: [Error rates, availability]
```

**ValidaÃ§Ã£o**: MÃ©tricas mensurÃ¡veis? Baselines definidos? Targets realistas?

---

### STEP 5: scope (High-Level Scope & Constraints)
**Objetivo**: Definir escopo inicial e constraints conhecidos
**Descoberta Guiada**:
```yaml
Perguntas Facilitadoras:
1. "Quais sÃ£o as capabilities core (MVP)?"
   â†’ 3-5 capabilities essenciais, nÃ£o feature list completa
2. "O que estÃ¡ OUT OF SCOPE explicitamente?"
   â†’ Evitar scope creep - ser claro sobre limites
3. "Quais constraints conhecidos?"
   â†’ Tech stack, budget, timeline, regulatory, integrations
4. "Quais dependencies de outros sistemas?"
   â†’ IntegraÃ§Ãµes requeridas, APIs externas
```

**DocumentaÃ§Ã£o**:
```markdown
## High-Level Scope

### In Scope (MVP)
1. **Capability 1**: [ex: "Multi-format export (Excel, PDF, CSV)"]
2. **Capability 2**: [ex: "Scheduled automated exports"]
3. **Capability 3**: [ex: "Email delivery of reports"]
...

### Explicitly Out of Scope
- [Feature/capability excluÃ­da - ex: "Real-time streaming exports"]
- [Feature/capability excluÃ­da - ex: "Custom report builder UI"]

## Constraints

### Technical Constraints
- Tech stack: [Known technologies - ex: "Must use existing .NET infrastructure"]
- Integrations: [Required systems - ex: "Integrate with SAP ERP"]
- Performance: [Non-negotiable limits - ex: "<2s export generation"]

### Business Constraints
- Budget: [If known - ex: "$50k development budget"]
- Timeline: [If known - ex: "Launch Q2 2026"]
- Regulatory: [Compliance requirements - ex: "GDPR compliant"]

### Resource Constraints
- Team size: [If known]
- Expertise gaps: [Skills needed but missing]
```

**ValidaÃ§Ã£o**: MVP capabilities claros? Out-of-scope explÃ­cito? Constraints documentados?

---

### STEP 6: complete (Finalize & Next Steps)
**Objetivo**: Finalizar brief e sugerir prÃ³ximos workflows
**AÃ§Ãµes**:
1. **Review Completeness**: Todas seÃ§Ãµes preenchidas?
2. **Executive Summary**: Gerar resumo de 1 parÃ¡grafo do brief
3. **Save Brief**: Salvar `{planning_artifacts}/product-brief.md`
4. **Suggest Next Steps**:
   ```yaml
   PrÃ³ximos Workflows Recomendados:
   - research (se domain/market/tech unknowns) â†’ avanade-method-bmm-research
   - create-prd (transformar brief em PRD detalhado) â†’ avanade-method-bmm-create-prd
   - brainstorming (se precisar explorar soluÃ§Ãµes alternativas) â†’ avanade-method-brainstorming
   ```

**Output Final**:
```markdown
# Product Brief: [Nome do Produto]

## Executive Summary
[1 parÃ¡grafo condensando problem, solution, value, metrics]

## Problem Statement
...

## Target Users
...

## Proposed Solution
...

## Success Metrics
...

## High-Level Scope
...

## Constraints
...

---
**Created**: [timestamp]
**Author**: Maria Analyst (Avanade Method)
**Next Steps**: [Workflows sugeridos]
```

**ValidaÃ§Ã£o Final**: Brief completo? Executive summary claro? Next steps sugeridos?

---

## ðŸ“Š OUTPUT FORMAT

### Product Brief Structure (Template)

```markdown
# Product Brief: [Nome do Produto]

**Created**: [Date]  
**Author**: Maria Analyst  
**Status**: Draft | In Review | Approved

---

## Executive Summary
[1-2 parÃ¡grafos: problema, soluÃ§Ã£o, valor, timeline]

---

## Problem Statement
### Context
[Business/market context]

### Problem
[Problema especÃ­fico que resolve]

### Impact
[Impacto atual do problema - costs, time, errors, frustration]

---

## Target Users
### Primary Segment: [Nome]
- Characteristics: [Who they are]
- Pain Points: [3-5 specific frustrations]
- Goals: [What they want to achieve]

### Secondary Segment: [Nome]
...

---

## Proposed Solution
### Overview
[High-level solution description - 2-3 parÃ¡grafos]

### Value Proposition
[Why this solution? Diferencial vs alternativas]

### Why Now?
[Timing drivers - market, competitive, regulatory]

---

## User Journeys (High-Level)

### Journey 1: [Nome]
**As-Is**: [Current manual process]  
**Pain Points**: [Specific issues]  
**To-Be**: [Improved process with product]  
**Benefits**: [Quantified improvements]

---

## Success Metrics

### Business Impact
- **Metric 1**: [Name] - Baseline: [X] â†’ Target: [Y]
- **Metric 2**: [Name] - Baseline: [X] â†’ Target: [Y]

### User Adoption
- Active Users: [Target]
- User Satisfaction: [NPS/CSAT target]

### Technical Metrics
- Performance: [Targets]
- Reliability: [Targets]

---

## High-Level Scope

### In Scope (MVP)
1. [Core capability 1]
2. [Core capability 2]
3. [Core capability 3]

### Out of Scope
- [Explicitly excluded feature 1]
- [Explicitly excluded feature 2]

---

## Constraints

### Technical
- Tech Stack: [Requirements]
- Integrations: [Required systems]
- Performance: [Non-negotiable limits]

### Business
- Budget: [If known]
- Timeline: [If known]
- Regulatory: [Compliance requirements]

---

## Next Steps
1. [Recommended workflow 1 - ex: research if unknowns]
2. [Recommended workflow 2 - ex: create-prd for detailed requirements]
```

---

## ðŸ”— Integration Points

### Prerequisites (Optional):
- **brainstorming** (se precisa explorar soluÃ§Ãµes) â†’ Pode alimentar "Proposed Solution"
- **Stakeholder interviews** (informal) â†’ Inputs para problem/users/metrics

### Next Steps (Recommended):
1. **research** (se existem unknowns) â†’ `avanade-method-bmm-research` (market/domain/technical)
   - Use quando: Market nÃ£o validado, domain novo, tech feasibility incerta
2. **create-prd** (transformar brief em PRD) â†’ `avanade-method-bmm-create-prd`
   - Use quando: Brief aprovado, ready para requirements detalhados
3. **brainstorming** (se soluÃ§Ãµes alternativas) â†’ `avanade-method-brainstorming`
   - Use quando: Proposed Solution precisa exploraÃ§Ã£o criativa

### Artifact Dependencies:
- **Input artifacts**: Nenhum (inÃ­cio do discovery)
- **Output artifacts**: `product-brief.md`
- **Used by**: create-prd (pode referenciar brief como contexto)

---

## âœ… Best Practices

### DO:
- âœ… **Focus em problema primeiro** - Entender dor ANTES de soluÃ§Ã£o
- âœ… **MÃ©tricas mensurÃ¡veis** - Baselines + targets especÃ­ficos
- âœ… **User segments especÃ­ficos** - "Financial Analysts em mid-size companies" nÃ£o "everyone"
- âœ… **Out-of-scope explÃ­cito** - Previne scope creep posteriormente
- âœ… **Constraints realistas** - Budget, timeline, tech stack desde inÃ­cio
- âœ… **Keep it concise** - Brief = 2-4 pÃ¡ginas, nÃ£o 20 pÃ¡ginas
- âœ… **Stakeholder validation** - Review brief com stakeholders antes de PRD

### DON'T:
- âŒ **NÃ£o liste features** - Brief Ã© sobre problema/valor, nÃ£o feature list
- âŒ **NÃ£o seja vago** - "Melhorar experiÃªncia" â†’ especÃ­fico "Reduzir tempo de export de 1.8h para 15min"
- âŒ **NÃ£o pule mÃ©tricas** - "Success" sem nÃºmeros = impossÃ­vel medir
- âŒ **NÃ£o ignore constraints** - Tech debt, budget, timeline sÃ£o realidades
- âŒ **NÃ£o faÃ§a brief virar PRD** - Se estÃ¡ >5 pÃ¡ginas, estÃ¡ detalhado demais
- âŒ **NÃ£o ignore out-of-scope** - Scope creep comeÃ§a aqui

---

## ðŸš¨ Common Pitfalls

### Pitfall 1: **Brief Turns Into PRD**
**Sintoma**: Brief com 15+ pÃ¡ginas, functional requirements detalhados  
**Problema**: Brief perdeu propÃ³sito - deve ser conciso para alignment  
**SoluÃ§Ã£o**: Limitar a 2-4 pÃ¡ginas. Detalhes vÃ£o no PRD posteriormente

### Pitfall 2: **Vague Success Metrics**
**Sintoma**: "Melhorar satisfaÃ§Ã£o", "Aumentar eficiÃªncia" sem nÃºmeros  
**Problema**: ImpossÃ­vel medir success sem baselines e targets  
**SoluÃ§Ã£o**: SEMPRE: Baseline atual + Target especÃ­fico + Como medir

### Pitfall 3: **Solution Without Problem**
**Sintoma**: Brief foca em features ("Queremos AI chatbot") sem articular problema  
**Problema**: SoluÃ§Ã£o pode nÃ£o resolver dor real  
**SoluÃ§Ã£o**: ComeÃ§ar SEMPRE com "Qual problema?" ANTES de "Qual soluÃ§Ã£o?"

### Pitfall 4: **No Out-of-Scope**
**Sintoma**: Brief sÃ³ lista o que estÃ¡ IN scope  
**Problema**: Scope creep inevitÃ¡vel - stakeholders assumem features nÃ£o documentadas  
**SoluÃ§Ã£o**: SeÃ§Ã£o OUT-OF-SCOPE explÃ­cita - "NÃ£o faremos X, Y, Z"

### Pitfall 5: **Ignoring Constraints**
**Sintoma**: Brief otimista sem mencionar budget, timeline, tech constraints  
**Problema**: PRD/Architecture depois descobrem impossibilidades  
**SoluÃ§Ã£o**: Constraints upfront - budget, tech stack, timeline, regulatory

---

## ðŸ’¡ Examples

### Example 1: Good Problem Statement

**GOOD** âœ…:
```markdown
## Problem Statement

### Context
Financial analysts em mid-size companies (50-500 employees) precisam gerar 
relatÃ³rios mensais consolidando dados de mÃºltiplas fontes (ERP, CRM, Excel).

### Problem
Processo atual Ã© 100% manual:
- 1.8 horas/dia por analista copiando dados entre sistemas
- 40% dos exports contÃªm erros (copy/paste mistakes, formulas quebradas)
- Reports atrasam 2-3 dias apÃ³s fim do mÃªs (impacta decisÃµes de negÃ³cio)

### Impact
- **Time Cost**: 1.8h Ã— 20 dias Ã— $45/hour = $1,620/mÃªs por analista
- **Error Cost**: DecisÃµes baseadas em dados errados, retrabalho, perda de credibilidade
- **Opportunity Cost**: Analistas gastam tempo em tarefa manual vs anÃ¡lise estratÃ©gica
```

**BAD** âŒ:
```markdown
## Problem Statement
Users want better reports. Current process is slow and error-prone.
```
**Por que BAD**: Vago ("better reports"), sem contexto de quem sÃ£o users, sem quantificaÃ§Ã£o de "slow" ou "error-prone", sem business impact.

---

### Example 2: Good Success Metrics

**GOOD** âœ…:
```markdown
## Success Metrics

### Business Impact
- **Time Savings**: 
  - Baseline: 1.8h/day manual export process
  - Target: <15min automated process
  - Measurement: Time tracking logs before/after
  - ROI: $1,620/month Ã— 12 months = $19,440/year per analyst

- **Error Reduction**:
  - Baseline: 40% de exports com erros
  - Target: <5% error rate
  - Measurement: Error logs + user reports
  - Impact: Decisions based on accurate data, reduced rework

### User Adoption
- **Active Users**: 80% dos financial analysts usando dentro de 3 meses
- **User Satisfaction**: NPS >40 (currently NPS -10 com processo manual)
- **Feature Adoption**: >90% usando scheduled exports (core feature)
```

**BAD** âŒ:
```markdown
## Success Metrics
- Improve user satisfaction
- Make process faster
- Reduce errors
```
**Por que BAD**: Sem baselines, sem targets numÃ©ricos, sem como medir. "Faster" Ã© 10% ou 90%? "Reduce errors" de quanto para quanto?

---

## ðŸ” Troubleshooting

### Issue: Brief ficou muito longo (>5 pÃ¡ginas)
**Sintoma**: Brief detalhando functional requirements, user stories, wireframes  
**SoluÃ§Ã£o**: Mover detalhes para PRD. Brief deve ter:
- Problem (1 pÃ¡gina)
- Solution high-level (1 pÃ¡gina)
- Metrics + Scope + Constraints (1-2 pÃ¡ginas)

### Issue: Stakeholders querem features especÃ­ficas no brief
**Sintoma**: "Adicionar chatbot, mobile app, analytics dashboard" no brief  
**SoluÃ§Ã£o**: Brief documenta CAPABILITIES, nÃ£o features:
- âŒ "Chatbot with NLP"
- âœ… "Self-service support capability"
Features especÃ­ficas vÃ£o no PRD

### Issue: MÃ©tricas de success nÃ£o estÃ£o disponÃ­veis
**Sintoma**: "NÃ£o temos baseline de quanto tempo leva hoje"  
**SoluÃ§Ã£o**: 
1. Estimar com SMEs ("Financial analysts estimam 1-2h/dia")
2. Documentar como estimativa: "Baseline (estimated): ~1.5h/day"
3. Adicionar em Constraints: "Need to establish proper metrics tracking"

### Issue: Brief aprovado mas visÃ£o mudou
**Sintoma**: Durante PRD, stakeholders mudaram direÃ§Ã£o  
**SoluÃ§Ã£o**: Re-run create-product-brief workflow em EDIT mode:
- Carregar brief existente
- Atualizar seÃ§Ãµes que mudaram
- Marcar como "v2" e documentar changes

---

## ðŸ“– References

- **Avanade Method Workflow Path**: `_avanade-method/bmm/workflows/1-analysis/create-product-brief/`
- **Workflow Manifest Entry**: `workflow-manifest.csv` line 3
- **Command**: `avanade-method-bmm-create-brief`
- **Owner Agent**: Maria Analyst

