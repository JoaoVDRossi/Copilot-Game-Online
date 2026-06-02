## Objetivo

Validar se User Story está pronta para desenvolvimento (completa, clara, estimável, testável).

---

## ✅ Checklist de Prontidão (INVEST++)

### 1. Independent (Independente)

**Critério**: Story pode ser desenvolvida sem dependências bloqueantes

**Validações**:

- [ ] Não depende de outra story **não concluída**
- [ ] Pode ser priorizada independentemente
- [ ] Pode ser desenvolvida em qualquer ordem
- [ ] Se há dependência técnica, está documentada e resolvida

**Red Flags**:

- ❌ "Precisa aguardar story X ser concluída"
- ❌ "Depende de API que ainda não existe"
- ❌ Ordem de implementação rígida

**Ação se falhar**: Dividir story ou bloquear até dependência resolver

---

###2. Negotiable (Negociável)
**Critério**: Solução técnica não está prescrita - foca no "o quê" e "por quê"

**Validações**:

- [ ] Descreve **problema/necessidade**, não solução técnica
- [ ] Time pode escolher **como** implementar
- [ ] Permite diferentes abordagens
- [ ] PO e Dev podem discutir trade-offs

**Exemplos**:

```
❌ Ruim (prescreve solução):
"Criar botão vermelho no canto superior direito usando React + Redux"

✅ Bom (descreve necessidade):
"Como usuário, quero poder salvar meu progresso,
para que eu não perca dados ao fechar o navegador"
```

**Ação se falhar**: Reescrever story focando em necessidade

---

### 3. Valuable (Valor para usuário)

**Critério**: Benefício claro para usuário ou negócio

**Validações**:

- [ ] Seção **"So that..."** expressa benefício real
- [ ] Usuário **notaria** se feature não existisse
- [ ] PO consegue explicar valor de negócio
- [ ] Alinhada com objetivos do produto

**Exemplos**:

```
❌ Ruim (sem valor claro):
"Como dev, quero refatorar módulo X,
para que código fique mais limpo"

✅ Bom (valor explícito):
"Como usuário, quero filtrar lista por categoria,
para que eu encontre produtos mais rapidamente"
```

**Ação se falhar**: Redefinir benefício ou descartar story

---

### 4. Estimable (Estimável)

**Critério**: Time consegue estimar com confiança razoável

**Validações**:

- [ ] Escopo **claro** e **bem definido**
- [ ] Time **entende** requisitos técnicos
- [ ] **Acceptance Criteria** suficientes
- [ ] **Incertezas** identificadas e endereçadas

**Causas comuns de não-estimabilidade**:

- Requisitos vagos
- Dependência externa desconhecida
- Tecnologia nova sem experiência
- Falta de dados/contexto

**Ação se falhar**:

- Spike técnico (timebox 1-2 dias) OU
- Quebrar em partes menores OU
- Discovery adicional com PO

---

### 5. Small (Pequena)

**Critério**: Completável em 1 sprint (≤ 2 semanas)

**Validações**:

- [ ] Estimativa: **1-8 story points** (ou 1-3 dias)
- [ ] Pode ser **demonstrada** ao final da sprint
- [ ] Não requer múltiplos deploys
- [ ] Tamanho similar a outras stories do backlog

**Red Flags**:

- ❌ Estimativa >8 pontos = **EPIC**, não story
- ❌ "Vai levar o sprint inteiro"
- ❌ Múltiplas personas/fluxos complexos

**Ação se falhar**: Quebrar em stories menores (slicing vertical)

---

### 6. Testable (Testável)

**Critério**: Acceptance Criteria claros e binários (pass/fail)

**Validações**:

- [ ] **Acceptance Criteria** escritos (Given/When/Then ou checklist)
- [ ] Cada critério é **binário** (passou ou falhou)
- [ ] **Test scenarios** cobrem happy path + edge cases
- [ ] **Definition of Done** clara

**Template Given/When/Then**:

```
Scenario: Login com credenciais válidas
  GIVEN usuário está na tela de login
  WHEN preenche email e senha corretos
  AND clica em "Entrar"
  THEN é redirecionado para dashboard
  AND vê mensagem "Bem-vindo, {nome}"
```

**Ação se falhar**: Escrever Acceptance Criteria com PO

---

## 🎯 Checklist Adicional (Avanade Standard)

### 7. Definition of Done (DoD)

- [ ] **Code review** completo
- [ ] **Unit tests** escritos (coverage ≥ 80%)
- [ ] **Integration tests** (se aplicável)
- [ ] **Documentation** atualizada (README, API docs)
- [ ] **Deployed** em ambiente de staging
- [ ] **PO validou** funcionalidade (demo)

### 8. Acceptance Criteria (AC)

- [ ] Mínimo **3 critérios** (happy path + edge cases)
- [ ] Máximo **7 critérios** (se >7, considerar quebrar story)
- [ ] Formato consistente (Given/When/Then)
- [ ] **Non-functional requirements** documentados (performance, security)

### 9. Personas & Contexto

- [ ] **Persona** definida ("Como [persona]...")
- [ ] **Contexto** claro (quando/onde acontece)
- [ ] **Screenshots/mockups** anexados (se UI)
- [ ] **Fluxo** documentado (diagrama ou descrição)

### 10. Dependencies & Risks

- [ ] **Dependencies** técnicas mapeadas
- [ ] **Riscos** identificados (técnico, negócio)
- [ ] **Mitigations** documentadas
- [ ] **Spikes** técnicos realizados (se necessário)

---

## 📊 Story Readiness Score

**Pontuação**:

- INVEST (6 critérios) = 6 pontos
- DoD = 1 ponto
- AC = 1 ponto
- Personas = 1 ponto
- Dependencies = 1 ponto

**Total = 10 pontos**

**Interpretação**:

- **9-10**: ✅ **PRONTA** - Pode ir para sprint
- **7-8**: 🟡 **QUASE PRONTA** - Ajustes menores
- **5-6**: 🟠 **REFINAMENTO** - Precisa revisão
- **0-4**: 🔴 **BLOQUEADA** - Não aceitar em sprint

---

## 🎯 Exemplo de Uso

### Story: "Filtro de Produtos por Categoria"

| Critério         | ✅/❌ | Observação                                  |
| ---------------- | ----- | ------------------------------------------- |
| **Independent**  | ✅    | Não depende de outras stories               |
| **Negotiable**   | ✅    | Descreve necessidade, não prescreve solução |
| **Valuable**     | ✅    | "Encontrar produtos mais rapidamente"       |
| **Estimable**    | ✅    | Time estima 3 pontos                        |
| **Small**        | ✅    | 3 pontos = ~2 dias                          |
| **Testable**     | ✅    | 5 AC claros (Given/When/Then)               |
| **DoD**          | ✅    | Checklist completo                          |
| **AC**           | ✅    | 5 critérios bem escritos                    |
| **Personas**     | ✅    | "Como comprador..."                         |
| **Dependencies** | ✅    | Nenhuma bloqueante                          |

**Score**: 10/10 → ✅ **PRONTA**

---

## 📋 Outputs Esperados

Após validação de prontidão:

1. **Readiness Score** (10 pontos)
2. **Bloqueios identificados** (se houver)
3. **Ações corretivas** (refinamento, split, spike)
4. **Go/No-Go** para incluir em sprint

---

## 🔗 Integração com Metodologia Avanade

- **Pré-requisito**: Story criada
- **Complementa**: ${AVANADE_TASK_INVEST_VALIDATION}
- **Validação**: ${AVANADE_TASK_ADVERSARIAL_REVIEW} (questionar completude)
- **Memória**: Atualizar ${AVANADE_MEMORY_SM_ROBERTO}
