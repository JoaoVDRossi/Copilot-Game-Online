## 📋 Objetivo

Checklist para revisão adversarial de artefatos, código e entregas. Identifica vulnerabilidades, edge cases não tratados, e pontos de falha potenciais antes que se tornem problemas em produção.

---

## 🔍 Checklist de Revisão Adversarial

### 1. Edge Cases & Boundary Conditions

- [ ] **Valores limite testados?**
  - Mínimos, máximos, zeros, negativos
  - Strings vazias, null, undefined
  - Arrays vazios, listas com 1 elemento, listas enormes

- [ ] **Condições de contorno verificadas?**
  - First/last element behavior
  - Off-by-one errors
  - Integer overflow/underflow

- [ ] **Inputs inesperados tratados?**
  - Tipos incorretos (string onde espera number)
  - Formato inválido (email sem @, data inválida)
  - Unicode/caracteres especiais

### 2. Error Handling & Recovery

- [ ] **Erros previstos têm tratamento adequado?**
  - Network failures
  - Timeouts
  - File not found
  - Permission denied

- [ ] **Erros inesperados são capturados?**
  - Try/catch apropriado
  - Error boundaries (React)
  - Global error handlers

- [ ] **Mensagens de erro são úteis?**
  - Sem exposição de dados sensíveis
  - Actionable para o usuário
  - Logáveis para debug

### 3. Security Vulnerabilities

- [ ] **Input Validation**
  - SQL Injection proteção
  - XSS prevention
  - Command injection blocking
  - Path traversal blocked

- [ ] **Authentication & Authorization**
  - Token validation em todas as rotas
  - Permission checks before actions
  - Session timeout handling

- [ ] **Data Protection**
  - Sensitive data encrypted
  - No secrets in code/logs
  - HTTPS enforcement
  - CORS configurado corretamente

### 4. Performance Issues

- [ ] **N+1 Queries identificadas?**
  - ORM queries otimizadas
  - Batch operations onde possível

- [ ] **Memory Leaks potenciais?**
  - Event listeners removidos
  - Subscriptions unsubscribed
  - References circulares

- [ ] **Resource Exhaustion possível?**
  - Rate limiting implementado
  - Pagination para listas grandes
  - File size limits

### 5. Concurrency & Race Conditions

- [ ] **State compartilhado protegido?**
  - Locks/mutexes onde necessário
  - Atomic operations

- [ ] **Race conditions identificadas?**
  - Double-click submit
  - Concurrent updates
  - Optimistic locking

### 6. Failure Modes

- [ ] **"What if X fails?" para cada dependência**
  - Database down
  - External API unavailable
  - Cache miss
  - Queue full

- [ ] **Graceful degradation planejado?**
  - Fallback behaviors
  - Circuit breakers
  - Retry strategies

### 7. Business Logic Gaps

- [ ] **Cenários de negócio edge testados?**
  - Usuário sem permissão tenta ação
  - Dados parcialmente preenchidos
  - Workflow interrompido no meio

- [ ] **Consistência de dados garantida?**
  - Transactions onde necessário
  - Idempotency para operações críticas
  - Rollback em caso de falha

---

## 🎯 Severity Classification

| Severity    | Critério                                 | Ação                  |
| ----------- | ---------------------------------------- | --------------------- |
| 🔴 Critical | Security breach, data loss, system crash | Bloqueia release      |
| 🟠 High     | Major functionality broken, bad UX       | Fix antes de release  |
| 🟡 Medium   | Edge case não tratado, minor bug         | Fix no próximo sprint |
| 🟢 Low      | Enhancement, nice-to-have                | Backlog               |

---

## 📝 Template de Report

```markdown
## Adversarial Review Report

**Reviewer**: [Nome]
**Date**: [YYYY-MM-DD]
**Artifact/Code**: [Identificador]

### Findings

#### Finding 1: [Título]

- **Severity**: [Critical/High/Medium/Low]
- **Category**: [Security/Performance/Edge Case/Error Handling]
- **Description**: [O que foi encontrado]
- **Impact**: [Consequência se não corrigido]
- **Recommendation**: [Como corrigir]

### Summary

- Critical: X
- High: Y
- Medium: Z
- Low: W

### Recommendation

[ ] Block release
[ ] Proceed with fixes tracked
[ ] Proceed as-is (low risk accepted)
```

---

## 🔗 Relacionamentos

- **Usado por**: ${AVANADE_MEMORY_DEV_TIAGO}, ${AVANADE_MEMORY_ARCHITECT_WILSON}, ${AVANADE_MEMORY_QA_CARLA}
- **Complementa**: ${AVANADE_TASK_CLEAN_CODE}, ${AVANADE_TASK_CODE_REVIEW}
- **Input para**: Sprint Review, Code Merge Decision
