---
## 📋 Objetivo

Definition of Done (DoD) checklist padrão para User Stories. Garante que todas as stories atendem critérios mínimos de qualidade antes de serem consideradas "Done".
---

## ✅ Definition of Done - Checklist Completo

### 1. Código & Implementação

- [ ] **Funcionalidade implementada conforme acceptance criteria**
  - Todos os critérios verificáveis
  - Edge cases tratados
  - Error handling adequado

- [ ] **Código segue padrões do projeto**
  - Naming conventions
  - Arquitetura estabelecida
  - Design patterns apropriados

- [ ] **Código limpo e manutenível**
  - Funções pequenas e focadas
  - Sem duplicação (DRY)
  - Comentários onde necessário

- [ ] **Sem débito técnico não-acordado**
  - TODOs documentados se deixados
  - Tech debt registrado no backlog
  - Workarounds justificados

### 2. Testes

- [ ] **Unit tests escritos**
  - Coverage mínimo: 80%
  - Happy path coberto
  - Edge cases testados

- [ ] **Integration tests se aplicável**
  - API endpoints testados
  - Database operations verificadas
  - External services mockados

- [ ] **Todos os testes passando**
  - CI/CD pipeline verde
  - Nenhum teste flaky
  - Performance aceitável

- [ ] **Testes manuais executados**
  - Smoke test em staging
  - Cross-browser se UI
  - Mobile responsive se aplicável

### 3. Code Review

- [ ] **Pull Request criado**
  - Descrição completa
  - Screenshots se UI
  - Breaking changes documentadas

- [ ] **Code review aprovado**
  - Pelo menos 1 aprovação
  - Todos comentários resolvidos
  - Conflicts resolvidos

- [ ] **Branch atualizado com main**
  - Merge de main recente
  - Sem conflitos pendentes

### 4. Documentação

- [ ] **README atualizado se necessário**
  - Novas features documentadas
  - Setup instructions atualizadas
  - API documentation atualizada

- [ ] **Inline comments onde necessário**
  - Lógica complexa explicada
  - Decisões não-óbvias documentadas

- [ ] **CHANGELOG atualizado**
  - Entry para a mudança
  - Versão apropriada
  - Breaking changes destacadas

### 5. Deploy & Ambiente

- [ ] **Deploy em staging bem-sucedido**
  - Build passou
  - Migrations rodaram
  - Health checks passando

- [ ] **Configurações de ambiente**
  - Environment variables documentadas
  - Secrets gerenciados adequadamente
  - Feature flags configurados

- [ ] **Rollback plan disponível**
  - Estratégia de rollback conhecida
  - Migrations reversíveis se aplicável

### 6. Validação de Negócio

- [ ] **PO validou acceptance criteria**
  - Demo realizado
  - Feedback incorporado
  - Sign-off obtido

- [ ] **Comportamento conforme esperado**
  - Fluxos principais funcionando
  - UX aprovada
  - Performance aceitável

### 7. Qualidade Extra (Se Aplicável)

- [ ] **Acessibilidade verificada**
  - WCAG AA compliance
  - Screen reader testado
  - Keyboard navigation ok

- [ ] **Security checklist**
  - Input validation
  - Auth/authz corretos
  - Sem dados sensíveis expostos

- [ ] **Performance aceitável**
  - Page load < 3s
  - API response < 500ms
  - Sem memory leaks

---

## 📊 Quick Reference Card

```
┌─────────────────────────────────────────────────┐
│              STORY DoD QUICK CHECK              │
├─────────────────────────────────────────────────┤
│ ☐ Acceptance Criteria atendidos                │
│ ☐ Unit tests (80%+ coverage)                   │
│ ☐ Integration tests (se aplicável)             │
│ ☐ Todos testes passando (CI verde)             │
│ ☐ Code review aprovado                         │
│ ☐ Documentação atualizada                      │
│ ☐ Deploy em staging OK                         │
│ ☐ PO validou                                   │
└─────────────────────────────────────────────────┘
```

---

## 🚦 DoD Status

| Status            | Significado                    | Ação                  |
| ----------------- | ------------------------------ | --------------------- |
| 🔴 Not Done       | DoD não atendido               | Continuar trabalhando |
| 🟡 Partially Done | Maioria atendido, gaps menores | Resolver gaps         |
| 🟢 Done           | 100% DoD atendido              | Move to Done          |

---

## 📝 Exceções ao DoD

Exceções devem ser:

1. **Aprovadas pelo time** em Daily/Review
2. **Documentadas** com razão
3. **Ter plano de resolução** (quando será resolvido)
4. **Registradas como tech debt** se aplicável

```markdown
## DoD Exception Log

| Story   | Item não atendido | Razão                    | Plano de resolução |
| ------- | ----------------- | ------------------------ | ------------------ |
| AUTH-01 | Integration tests | API externa indisponível | Sprint +1          |
```

---

## 🔄 Revisão do DoD

O DoD deve ser revisado:

- [ ] A cada Sprint Retrospective
- [ ] Quando novos padrões são introduzidos
- [ ] Quando tech stack muda significativamente
- [ ] Quando problemas de qualidade emergem

---

## 🔗 Relacionamentos

- **Usado por**: ${AVANADE_MEMORY_SM_ROBERTO}, ${AVANADE_MEMORY_DEV_TIAGO}
- **Complementa**: ${AVANADE_STORY_TEMPLATE}, ${AVANADE_TASK_INVEST_VALIDATION}
- **Validação**: ${AVANADE_TASK_CODE_REVIEW}, ${AVANADE_TASK_TEST_COVERAGE}
