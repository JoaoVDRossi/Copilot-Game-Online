---

## 📖 O Que é INVEST?

| Letra | Critério | Significado |
|-------|----------|-------------|
| **I** | Independent | Pode ser desenvolvida sem dependência de outras stories |
| **N** | Negotiable | Detalhes podem ser discutidos, não é contrato fixo |
| **V** | Valuable | Entrega valor para usuário ou negócio |
| **E** | Estimable | Time consegue estimar esforço |
| **S** | Small | Pequena o suficiente para completar em um sprint |
| **T** | Testable | Pode ser verificada com critérios claros |

---

## 🔍 Checklist INVEST Detalhado

### I - Independent (Independente)

- [ ] **Story pode ser desenvolvida isoladamente?**
  - Não precisa esperar outra story terminar
  - Sem bloqueio técnico de outra feature
  - Pode ser deployada separadamente

- [ ] **Dependências identificadas são gerenciáveis?**
  - Dependências são de infraestrutura (OK)
  - Não de outras stories do mesmo sprint (RUIM)
- [ ] **Pode ser re-priorizada livremente?**
  - Mudança de ordem no backlog não quebra nada
  - Standalone testable

**⚠️ Red Flags**:

- "Precisa da Story X pronta primeiro"
- "Depende do design da Story Y"
- "Só faz sentido junto com Z"

**✅ Solução**: Dividir em stories menores ou agrupar em Epic

---

### N - Negotiable (Negociável)

- [ ] **Story não é especificação detalhada?**
  - Expressa necessidade, não solução
  - Deixa espaço para discussão
  - Time pode propor alternativas

- [ ] **Detalhes podem ser refinados durante sprint?**
  - Acceptance criteria são guias, não leis
  - PO acessível para esclarecimentos
  - Flexibilidade no "como"

- [ ] **Conversa é o mecanismo principal?**
  - Story é lembrete para conversa
  - Não substitui discussão

**⚠️ Red Flags**:

- Especificação técnica disfarçada de story
- "Implementar exatamente como descrito"
- Nenhum espaço para criatividade

**✅ Solução**: Reescrever focando no problema, não solução

---

### V - Valuable (Valiosa)

- [ ] **Entrega valor claro para usuário final?**
  - Usuário consegue fazer algo novo
  - Experiência melhorada
  - Problema resolvido

- [ ] **Ou entrega valor de negócio mensurável?**
  - Reduz custo operacional
  - Aumenta conversão
  - Melhora compliance

- [ ] **Valor é articulável em uma frase?**
  - "Permite que [usuário] [faça X] para [benefício]"
  - Stakeholder entende e concorda

**⚠️ Red Flags**:

- "Technical debt cleanup" sem impacto visível
- "Refactoring para melhorar código"
- Valor só aparente para developers

**✅ Solução**: Conectar a benefício de usuário/negócio ou transformar em technical task

---

### E - Estimable (Estimável)

- [ ] **Time entende o que precisa ser feito?**
  - Scope claro
  - Tecnologia conhecida
  - Sem unknowns bloqueantes

- [ ] **Time consegue dar estimate com confiança?**
  - Consenso em planning poker
  - Variação aceitável (não 1 vs 13)
  - Histórico similar existe

- [ ] **Se não estimável, o que falta?**
  - Spike necessário?
  - Clarificação com PO?
  - PoC técnico?

**⚠️ Red Flags**:

- "Precisamos pesquisar mais"
- Estimativas muito divergentes
- "Nunca fizemos algo assim"

**✅ Solução**: Criar Spike story primeiro para reduzir incerteza

---

### S - Small (Pequena)

- [ ] **Cabe confortavelmente em um sprint?**
  - Estimativa ≤ 50% da capacidade do sprint
  - Permite trabalho paralelo
  - Buffer para imprevistos

- [ ] **Pode ser completada por 1-2 pessoas?**
  - Não requer time inteiro
  - Ownership claro
  - Handoffs mínimos

- [ ] **Tem acceptance criteria limitados?**
  - 3-5 critérios típico
  - > 8 critérios = muito grande

**⚠️ Red Flags**:

- Story de 13+ pontos
- "Mini-epic" disfarçada
- 10+ acceptance criteria

**✅ Solução**: Dividir horizontalmente (by workflow) ou verticalmente (by layer)

---

### T - Testable (Testável)

- [ ] **Acceptance criteria são verificáveis?**
  - Condições claras de pass/fail
  - Sem subjetividade
  - Automação possível

- [ ] **QA consegue criar test cases?**
  - Happy path definido
  - Edge cases identificáveis
  - Expected results claros

- [ ] **"Definition of Done" aplicável?**
  - Todos critérios podem ser verificados
  - Evidence de completude possível

**⚠️ Red Flags**:

- "Melhorar a experiência" (subjetivo)
- "Sistema mais rápido" (sem métrica)
- Critérios vagos ou ausentes

**✅ Solução**: Adicionar métricas específicas e critérios objetivos

---

## 📊 Scoring de Story

| Critério    | Score (1-5) | Notas |
| ----------- | ----------- | ----- |
| Independent |             |       |
| Negotiable  |             |       |
| Valuable    |             |       |
| Estimable   |             |       |
| Small       |             |       |
| Testable    |             |       |
| **Total**   | /30         |       |

**Thresholds**:

- ≥ 25: Ready for sprint
- 20-24: Minor refinement needed
- < 20: Needs significant rework

---

## 📝 Template de User Story INVEST-Ready

```markdown
## [ID] - [Título Conciso]

**Como** [tipo de usuário]
**Quero** [funcionalidade/ação]
**Para que** [benefício/valor]

### Acceptance Criteria

- [ ] Dado [contexto], quando [ação], então [resultado]
- [ ] Dado [contexto], quando [ação], então [resultado]
- [ ] [Edge case]: [comportamento esperado]

### Notes

- Dependências: Nenhuma / [Lista se houver]
- Spike necessário: Não / [Descrição se sim]

### INVEST Score: [X/30]
```

---

## 🔗 Relacionamentos

- **Usado por**: ${AVANADE_MEMORY_PO_PAULA}, ${AVANADE_MEMORY_SM_ROBERTO}
- **Complementa**: ${AVANADE_TASK_STORY_READINESS}, ${AVANADE_TASK_RICE_PRIORITIZATION}
- **Workflow**: Backlog Refinement, Sprint Planning
