## Objetivo

Validar se feature/epic entrega valor de negócio real e justifica investimento.

---

## 🎯 Value Assessment Framework

### 1. Business Value Quantificado

**Critério**: Valor mensurável em termos de negócio

**Perguntas**:

- [ ] Qual **receita incremental** essa feature gera?
- [ ] Qual **economia de custo** (tempo, recursos, licenças)?
- [ ] Quantos **usuários** serão impactados?
- [ ] Qual **aumento de conversão/retenção** esperado?

**Exemplo Quantificado**:

```
❌ Ruim: "Melhora experiência do usuário"
✅ Bom: "Reduz churn em 5% (R$ 200k/ano) + aumenta NPS de 7 para 8"
```

**Scoring**:

- 5 = ROI >300% em 12 meses
- 4 = ROI 150-300%
- 3 = ROI 50-150%
- 2 = ROI 0-50%
- 1 = ROI negativo (mas estratégico)
- 0 = Sem valor mensurável

---

### 2. Strategic Alignment

**Critério**: Alinhamento com objetivos estratégicos da empresa

**Perguntas**:

- [ ] Alinhada com **OKRs** do trimestre/ano?
- [ ] Suporta **diferenciação competitiva**?
- [ ] Atende **regulatório/compliance** obrigatório?
- [ ] Habilita **plataforma futura** (roadmap)?

**Categorias**:

- **Must-Have**: Regulatório, bloqueador crítico
- **Strategic**: OKRs, diferenciação, vantagem competitiva
- **High-Value**: ROI claro, impacto mensurável
- **Nice-to-Have**: Benefício marginal

**Scoring**:

- 5 = Must-Have (regulatório ou bloqueador)
- 4 = Strategic + High-Value
- 3 = Strategic OU High-Value
- 2 = Nice-to-Have com benefício comprovado
- 1 = Nice-to-Have sem dados
- 0 = Não alinhado

---

### 3. Trade-offs & Opportunity Cost

**Critério**: Entendimento dos trade-offs e custo de oportunidade

**Análise**:

- [ ] Que **features alternativas** não faremos se escolhermos esta?
- [ ] **Effort vs Value**: Esforço justifica benefício?
- [ ] **Dependencies**: Bloqueia ou habilita outras features?
- [ ] **Risk**: Que riscos (técnico, negócio) estamos assumindo?

**Framework de Decisão**:

```
         | Alto Valor | Baixo Valor |
---------|------------|-------------|
Alto     | ✅ DO NOW  | 🟡 CONSIDER |
Esforço  |            |             |
---------|------------|-------------|
Baixo    | 🟢 QUICK   | ❌ SKIP     |
Esforço  |   WIN      |             |
```

**Scoring**:

- 5 = High Value + Low Effort (Quick Win)
- 4 = High Value + High Effort (Do Now)
- 3 = Medium Value + Low Effort
- 2 = Low Value + Low Effort (Consider)
- 1 = Medium Value + High Effort
- 0 = Low Value + High Effort (Skip)

---

### 4. Success Metrics Definidas

**Critério**: Métricas claras para validar sucesso pós-lançamento

**Perguntas**:

- [ ] Quais **KPIs** medem sucesso?
- [ ] Qual **baseline atual** (antes da feature)?
- [ ] Qual **target** (meta após lançamento)?
- [ ] Como vamos **medir** (ferramenta, frequência)?

**Exemplo**:
| Métrica | Baseline | Target | Ferramenta |
|---------|----------|--------|------------|
| Conversion Rate | 2.5% | 3.5% | Google Analytics |
| NPS | 45 | 55 | Typeform Survey |
| Support Tickets | 200/mês | <100/mês | Zendesk |

**Scoring**:

- 5 = Métricas quantificadas + baseline + target + ferramenta
- 4 = Métricas + target + ferramenta
- 3 = Métricas + target
- 2 = Métricas vagas
- 1 = Sem métricas claras
- 0 = Sem métricas

---

### 5. Stakeholder Buy-in

**Critério**: Consenso e suporte dos stakeholders

**Perguntas**:

- [ ] **Sponsor executivo** apoia?
- [ ] **Time técnico** concorda com viabilidade?
- [ ] **Usuários finais** validaram necessidade?
- [ ] **Compliance/Legal** aprovou (se aplicável)?

**Níveis de Buy-in**:

- **Strong**: Sponsor + Usuários + Tech = todos alinhados
- **Moderate**: 2 de 3 grupos alinhados
- **Weak**: Apenas 1 grupo ou consenso forçado
- **None**: Resistência ou falta de clareza

**Scoring**:

- 5 = Strong buy-in (todos stakeholders)
- 4 = Moderate buy-in (maioria)
- 3 = Weak buy-in (alguns)
- 2 = Nenhum buy-in formal
- 1 = Resistência ativa
- 0 = Bloqueio de stakeholder crítico

---

## 📊 Scoring Total

**Fórmula**:

```
Score = (Business Value × 2) + Strategic Alignment + Trade-offs + Success Metrics + Stakeholder Buy-in

Máximo = 25 pontos
```

**Interpretação**:

- **20-25**: ✅ **PRIORIDADE ALTA** - Implementar ASAP
- **15-19**: 🟢 **BOA FEATURE** - Backlog top 10
- **10-14**: 🟡 **CONSIDERAR** - Refinar ou reavaliar
- **5-9**: 🟠 **BAIXA PRIORIDADE** - Adicionar ao backlog futuro
- **0-4**: 🔴 **NÃO FAZER** - Descartar ou transformar

---

## 🎯 Exemplo de Uso

### Feature: "Checkout em 1 Clique"

| Critério                | Score | Justificativa                                                                              |
| ----------------------- | ----- | ------------------------------------------------------------------------------------------ |
| **Business Value**      | 5/5   | ROI 400% em 12 meses (reduz abandono de carrinho 15% → R$ 1.2M/ano)                        |
| **Strategic Alignment** | 4/5   | OKR Q2 "Aumentar conversão mobile" + diferenciação vs concorrentes                         |
| **Trade-offs**          | 4/5   | Alto Valor + Médio Esforço (3 sprints) - bloqueia feature de multi-payment temporariamente |
| **Success Metrics**     | 5/5   | Conversion Rate: 3% → 5% (Google Analytics) + Cart Abandonment: 70% → 55%                  |
| **Stakeholder Buy-in**  | 5/5   | CEO (sponsor) + UX (validou com usuários) + Tech (arquitetura Ok)                          |

**Score Final**: `(5×2) + 4 + 4 + 5 + 5 = 28/25` → ✅ **PRIORIDADE MÁXIMA**

---

## 📋 Outputs Esperados

Após validação de valor, gerar:

1. **Value Scorecard** (tabela acima)
2. **Business Case** (se score >15)
3. **Success Metrics Dashboard** (template)
4. **Stakeholder Alignment Matrix**
5. **Go/No-Go Decision** documentada

---

## 🔗 Integração com Metodologia Avanade

- **Pré-requisito**: Feature/Epic descrita
- **Complementa**: ${AVANADE_TASK_RICE_PRIORITIZATION} (foco em reach/effort)
- **Validação**: ${AVANADE_TASK_ADVERSARIAL_REVIEW} (questionar assumptions)
- **Memória**: Atualizar ${AVANADE_MEMORY_PO_PAULA}
