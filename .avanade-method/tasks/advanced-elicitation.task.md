## Objetivo

Aplicar técnicas avançadas de elicitação para descobrir requisitos ocultos e entender profundamente problemas de negócio.

---

## 📋 Técnicas Disponíveis

### 1. Five Whys (5 Porquês)

**Quando usar**: Identificar causa raiz de problemas

**Como fazer**:

1. Identifique o problema inicial
2. Pergunte "Por quê?" 5 vezes consecutivamente
3. Cada resposta se torna a próxima pergunta
4. Chegue à causa raiz fundamental

**Exemplo**:

```
Problema: Sistema lento
1. Por quê? → Servidor sobrecarregado
2. Por quê? → Muitas requisições simultâneas
3. Por quê? → Usuários fazem polling a cada 1s
4. Por quê? → Não há notificação push
5. Por quê? → Arquitetura não foi desenhada para real-time
✓ Causa raiz: Arquitetura inadequada para requisito real-time
```

---

### 2. Jobs-to-be-Done (JTBD)

**Quando usar**: Entender motivação real do usuário

**Framework**:

```
Quando eu [situação],
quero [motivação],
para que eu [resultado esperado].
```

**Exemplo**:

```
Quando eu preciso analisar vendas do mês,
quero visualizar dashboard com KPIs principais,
para que eu possa tomar decisões estratégicas rapidamente.
```

**Validação**:

- [ ] Situação clara e específica
- [ ] Motivação expressa em termos de progresso/resultado
- [ ] Resultado mensurável

---

### 3. Pain/Gain Mapping

**Quando usar**: Priorizar features por valor

**Estrutura**:
| Categoria | Descrição | Impacto (1-5) |
|-----------|-----------|---------------|
| **Pains** | O que frustra usuário | |
| **Gains** | O que usuário ganharia | |

**Exemplo**:
| Pain | Descrição | Impacto |
|------|-----------| --------|
| ❌ Processo manual | Copiar dados entre sistemas | 5 |
| ❌ Erros frequentes | Falta de validação | 4 |

| Gain              | Descrição             | Impacto |
| ----------------- | --------------------- | ------- |
| ✅ Automação      | Integração automática | 5       |
| ✅ Confiabilidade | Validação robusta     | 4       |

---

### 4. Stakeholder Mapping

**Quando usar**: Identificar influenciadores e decisores

**Matriz Poder vs Interesse**:

```
       Alto Interesse
            |
            |  PARCEIROS           PLAYERS
  Baixo  ---|-----------------------------  Alto
   Poder   |                                Poder
            |  ESPECTADORES        CONTEXTO
            |
       Baixo Interesse
```

**Estratégias**:

- **Players**: Engajar proativamente (decisores)
- **Parceiros**: Manter informados (influenciadores)
- **Contexto**: Monitorar (pode bloquear)
- **Espectadores**: Informações mínimas

---

### 5. Assumption Testing

**Quando usar**: Validar premissas críticas

**Processo**:

1. Liste todas premissas/assumptions
2. Classifique risco: Alto/Médio/Baixo
3. Defina teste para validar (MVP, entrevista, dados)
4. Execute teste
5. Invalide ou confirme assumption

**Template**:
| Assumption | Risco | Teste | Resultado |
|------------|-------|-------|-----------|
| "Usuários querem notificações push" | Alto | Survey com 50 usuários | ✅ 85% querem |
| "Mobile representa 60% do tráfego" | Médio | Analytics últimos 3 meses | ❌ Apenas 40% |

---

## 🎯 Quando Usar Cada Técnica?

| Situação                              | Técnica Recomendada     |
| ------------------------------------- | ----------------------- |
| Problema recorrente sem solução clara | **Five Whys**           |
| Definir feature centrada no usuário   | **Jobs-to-be-Done**     |
| Priorizar backlog por valor           | **Pain/Gain Mapping**   |
| Projeto com muitos stakeholders       | **Stakeholder Mapping** |
| Validar viabilidade de solução        | **Assumption Testing**  |

---

## ✅ Checklist de Qualidade

- [ ] Técnica escolhida adequada ao problema
- [ ] Perguntas abertas (não enviesadas)
- [ ] Dados/insights documentados
- [ ] Padrões identificados
- [ ] Próximos passos claros
- [ ] Stakeholders validaram findings

---

## 📚 Outputs Esperados

Após aplicar elicitação avançada, você deve ter:

1. **Requisitos funcionais** priorizados
2. **Requisitos não-funcionais** identificados (NFRs)
3. **User personas** validadas
4. **Assumptions** testadas
5. **Stakeholder map** atualizado
6. **Pain/Gain analysis** documentado

---

## 🔗 Integração com Metodologia Avanade

- **Pré-requisito**: Discovery Protocol (6 perguntas)
- **Validação**: ${AVANADE_TASK_EDITORIAL_REVIEW_PROSE}
- **Memória**: Atualizar ${AVANADE_MEMORY_ANALYST_MARIA}
