## Objetivo
Facilitar retrospectiva de sprint estruturada para identificar melhorias contÃ­nuas.


## ðŸ”„ Formato: 5 Fases (Agile Retrospectives)

### Fase 1: Set the Stage (5-10 min)
**Objetivo**: Criar ambiente seguro e engajado

**Atividades**:
- [ ] **Check-in**: Roda de sentimentos (1 palavra por pessoa)
- [ ] **Normas**: Relembrar Prime Directive
- [ ] **Foco**: Definir objetivo da retro (ex: "melhorar qualidade")

**Prime Directive**:
> "Independente do que descobrirmos, entendemos e acreditamos que todos fizeram o melhor trabalho possÃ­vel, dado o que sabiam no momento, suas habilidades, recursos disponÃ­veis e a situaÃ§Ã£o."

**Icebreaker RÃ¡pido** (opcional):
- Emoji do sprint ðŸ˜ŠðŸ˜ðŸ˜ž
- Nota 1-5 para sprint
- Palavra-chave do sprint

---

### Fase 2: Gather Data (10-15 min)
**Objetivo**: Coletar fatos e percepÃ§Ãµes

**TÃ©cnicas**:

#### ðŸŒŸ Timeline
Criar linha do tempo visual do sprint:
```
Segunda | TerÃ§a | Quarta | Quinta | Sexta
   ðŸ˜Š       ðŸ˜      ðŸ˜ž       ðŸ˜Š      ðŸ˜Š
   â†“        â†“       â†“        â†“       â†“
Deploy  Planning Bug CrÃ­tico Fix   Review
```

**Como fazer**:
1. Desenhar linha temporal (lousa ou Miro)
2. Cada pessoa adiciona eventos significativos
3. Marcar com emoji (positivo/negativo/neutro)
4. Agrupar eventos similares

#### ðŸ“Š MÃ©tricas do Sprint
Apresentar dados objetivos:
- **Velocity**: Pontos planejados vs entregues
- **Quality**: Bugs encontrados, code review time
- **Process**: Tempo de bloqueios, daily duration
- **Happiness**: Mood tracking, team satisfaction

**Template**:
| MÃ©trica | Planejado | Realizado | âˆ† |
|---------|-----------|-----------|---|
| Story Points | 40 | 35 | -12% |
| Bugs ProduÃ§Ã£o | <5 | 8 | +60% âš ï¸ |
| Code Review Time | <24h | 18h | âœ… |

---

### Fase 3: Generate Insights (15-20 min)
**Objetivo**: Identificar padrÃµes e causas raiz

**TÃ©cnicas**:

#### ðŸ” 5 Whys
Para problemas recorrentes:
```
Problema: Bugs em produÃ§Ã£o aumentaram
1. Por quÃª? â†’ Testes insuficientes
2. Por quÃª? â†’ PressÃ£o de tempo na sprint
3. Por quÃª? â†’ Overcommitment no planning
4. Por quÃª? â†’ NÃ£o consideramos tempo de teste
5. Por quÃª? â†’ Definition of Done nÃ£o inclui teste manual
âœ“ Causa raiz: DoD incompleta
```

#### ðŸ“‹ CategorizaÃ§Ã£o (What Went Well / What to Improve)
Quadrante simples:
```
âœ… O QUE FOI BEM           | ðŸ”§ O QUE MELHORAR
---------------------------+---------------------------
- Deploy sem downtime      | - Bugs em produÃ§Ã£o (+60%)
- Code review rÃ¡pido       | - Overcommitment no planning
- ComunicaÃ§Ã£o melhorou     | - DocumentaÃ§Ã£o atrasada
```

#### ðŸŽ¯ Starfish (Keep/More/Less/Start/Stop)
Mais granular que WWW/WTI:
```
â­ KEEP (continuar)       | ðŸ†• START (comeÃ§ar)
- Daily stand-ups          | - Test automation
- Pair programming         | - Refinement mid-sprint
                           |
âž• MORE (fazer mais)       | âž– LESS (fazer menos)
- Code reviews             | - Multitasking
- Documentation            | - ReuniÃµes longas
                           |
ðŸ›‘ STOP (parar)
- Deploy sexta-feira
- Aceitar stories sem AC
```

---

### Fase 4: Decide What to Do (10-15 min)
**Objetivo**: Definir aÃ§Ãµes concretas e acionÃ¡veis

**CritÃ©rios para AÃ§Ãµes**:
- [ ] **SMART**: EspecÃ­fica, MensurÃ¡vel, AcionÃ¡vel, Relevante, Temporal
- [ ] **Owner**: Pessoa responsÃ¡vel por executar
- [ ] **Deadline**: Quando serÃ¡ implementada
- [ ] **Success Criteria**: Como saberemos que funcionou

**Template de AÃ§Ã£o**:
```
âŒ Ruim: "Melhorar qualidade"
âœ… Bom:
  AÃ§Ã£o: Adicionar step de teste manual no DoD
  Owner: Roberto (SM)
  Deadline: PrÃ³ximo sprint planning
  Success: 100% stories testadas antes de demo
```

**PriorizaÃ§Ã£o** (votar em top 2-3 aÃ§Ãµes):
- Cada pessoa vota (dots) nas aÃ§Ãµes mais impactantes
- Focar em **2-3 aÃ§Ãµes mÃ¡ximo** por sprint (evita sobrecarga)
- Ignorar aÃ§Ãµes com 0 votos

**Exemplos de AÃ§Ãµes**:
| AÃ§Ã£o | Owner | Deadline | Success Criteria |
|------|-------|----------|------------------|
| Adicionar teste manual no DoD | Roberto | Sprint 11 Planning | 100% stories testadas antes demo |
| Criar template de PR com checklist | Tiago | Semana 1 Sprint 11 | PRs usam template |
| Refinement mid-sprint (Quarta 2pm) | Paula | Sprint 11 | Stories refinadas antes planning |

---

### Fase 5: Close the Retrospective (5 min)
**Objetivo**: Encerrar com energia positiva

**Atividades**:
- [ ] **Recap**: Revisar aÃ§Ãµes decididas (ler em voz alta)
- [ ] **Appreciations**: Agradecer contribuiÃ§Ãµes especÃ­ficas
- [ ] **Check-out**: Roda final (1 palavra: como se sentem agora?)

**Appreciations** (opcional mas poderoso):
```
"Quero agradecer [pessoa] por [aÃ§Ã£o especÃ­fica]"

Exemplos:
- "Maria, obrigado por pair programming ontem quando eu travei no bug"
- "Tiago, cÃ³digo review detalhado me ajudou a aprender muito"
```

---

## ðŸ“Š MÃ©tricas de Sucesso da Retro

### Quantitativas
- **AÃ§Ãµes completadas**: % de aÃ§Ãµes da retro anterior concluÃ­das
- **RecorrÃªncia de problemas**: Mesmo problema aparece >2 sprints?
- **Participation rate**: % do time que participou ativamente

### Qualitativas
- **Psychological safety**: Time se sente seguro para falar?
- **Actionability**: AÃ§Ãµes sÃ£o concretas ou vagas?
- **Follow-through**: AÃ§Ãµes sÃ£o revisadas na prÃ³xima retro?

---

## ðŸŽ¯ VariaÃ§Ãµes de Formato

### ðŸš€ Speed Retro (30 min)
Para sprints curtos ou times experientes:
1. Set Stage (5 min)
2. WWW + WTI (10 min)
3. Dot voting + aÃ§Ãµes (10 min)
4. Close (5 min)

### ðŸŒŸ Celebration Retro
ApÃ³s release grande ou milestone:
- Foco 80% em WWW (celebrar)
- 20% em learnings
- Sem pressÃ£o por aÃ§Ãµes

### ðŸ”§ Problem-Solving Retro
Para problema especÃ­fico recorrente:
- Fishbone diagram (Ishikawa)
- Root cause analysis profundo
- AÃ§Ãµes corretivas priorizadas

---

## ðŸ§  Dicas de FacilitaÃ§Ã£o

### DO âœ…
- **Timeboxing rigoroso**: Respeite os tempos
- **Vozes equilibradas**: Todos participam (usar tÃ©cnicas silenciosas tipo post-its)
- **Foco em aprendizado**: NÃ£o buscar culpados
- **AÃ§Ãµes concretas**: SMART, nÃ£o vagas
- **Tracking**: Revisar aÃ§Ãµes da retro anterior

### DON'T âŒ
- **NÃ£o deixar pessoas dominarem**: Equilibrar participaÃ§Ã£o
- **NÃ£o buscar culpados**: "Quem causou o bug?" â†’ âŒ
- **NÃ£o ignorar elefante na sala**: Se problema Ã© Ã³bvio, endereÃ§ar
- **NÃ£o sobrecarregar com aÃ§Ãµes**: Max 2-3 aÃ§Ãµes
- **NÃ£o esquecer de revisar**: AÃ§Ãµes nÃ£o revisadas = desperdÃ­cio

---

## ðŸ“‹ Checklist de PreparaÃ§Ã£o (SM)

**Antes da Retro**:
- [ ] Agendar retro (timebox 60-90 min)
- [ ] Preparar mÃ©tricas do sprint (velocity, bugs, etc.)
- [ ] Revisar aÃ§Ãµes da retro anterior
- [ ] Escolher formato/tÃ©cnica (Timeline, Starfish, etc.)
- [ ] Preparar ferramenta (Miro, Mural, lousa fÃ­sica)

**Durante a Retro**:
- [ ] ComeÃ§ar pontualmente
- [ ] Timebox cada fase
- [ ] Facilitar (nÃ£o dominar)
- [ ] Garantir participaÃ§Ã£o balanceada
- [ ] Documentar aÃ§Ãµes

**Depois da Retro**:
- [ ] Compartilhar aÃ§Ãµes com time (Slack, email)
- [ ] Adicionar aÃ§Ãµes no board (Jira, Azure Boards)
- [ ] Acompanhar progresso durante sprint
- [ ] Revisar na prÃ³xima retro

---

## ðŸ”— IntegraÃ§Ã£o com Metodologia Avanade

- **FrequÃªncia**: Final de cada sprint (obrigatÃ³rio)
- **Participants**: Todo time Scrum (Dev, PO, SM)
- **Output**: 2-3 aÃ§Ãµes SMART
- **Tracking**: ${AVANADE_MEMORY_SM_ROBERTO} (aÃ§Ãµes e learnings)
- **Complementa**: Sprint Review (foco em produto) vs Retro (foco em processo)
