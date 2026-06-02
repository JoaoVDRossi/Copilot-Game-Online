## 📋 Objetivo

Checklist para avaliação e melhoria de cobertura de testes. Define estratégias, métricas alvo, e priorização para garantir qualidade do código através de testes adequados.

## 🎯 Métricas Alvo de Cobertura

| Tipo de Código      | Linha | Branch | Função |
| ------------------- | ----- | ------ | ------ |
| Business Logic      | 90%+  | 85%+   | 100%   |
| API Endpoints       | 85%+  | 80%+   | 100%   |
| UI Components       | 70%+  | 60%+   | 80%    |
| Utilities           | 95%+  | 90%+   | 100%   |
| Data Access         | 80%+  | 75%+   | 90%    |
| **Overall Project** | 80%+  | 70%+   | 85%    |

---

## 🔍 Checklist de Test Coverage

### 1. Unit Tests

- [ ] **Funções puras cobertas?**
  - Todas funções de transformação
  - Validators
  - Formatters
  - Calculators

- [ ] **Classes/modules testados?**
  - Public methods
  - Edge cases de cada method
  - State transitions

- [ ] **Mocking adequado?**
  - Dependencies injetadas
  - External services mockados
  - Time-dependent code controlável

### 2. Integration Tests

- [ ] **API endpoints testados?**
  - Happy path para cada endpoint
  - Error responses
  - Auth/authz scenarios

- [ ] **Database operations?**
  - CRUD completo
  - Transactions
  - Constraints enforcement

- [ ] **External services?**
  - Contract tests
  - Fallback behavior
  - Timeout handling

### 3. Edge Cases Priority

- [ ] **Boundary values?**
  - Empty inputs (null, "", [], {})
  - Maximum values
  - Off-by-one scenarios

- [ ] **Error conditions?**
  - Invalid input formats
  - Network failures
  - Permission denied

- [ ] **Concurrent access?**
  - Race conditions
  - Deadlocks potential
  - State corruption

### 4. Coverage Quality (não apenas quantidade)

- [ ] **Assertions meaningfully?**
  - Não apenas "runs without error"
  - Verificam outputs específicos
  - Checam side effects

- [ ] **Mutation testing considerado?**
  - Mutantes mortos
  - Gaps identificados
  - Tests reforçados

- [ ] **Tests são confiáveis?**
  - Não flaky
  - Independentes
  - Determinísticos

### 5. Test Organization

- [ ] **Estrutura clara?**
  - Test files próximos ao código
  - Naming convention seguida
  - Describe/it blocks organizados

- [ ] **Setup/teardown adequado?**
  - beforeEach/afterEach
  - Fixtures reutilizáveis
  - Database cleanup

- [ ] **Categorização por tipo?**
  - Unit vs Integration separados
  - Tags para smoke tests
  - Slow tests marcados

---

## 📊 Coverage Report Analysis

### Ferramentas Recomendadas

| Linguagem     | Ferramenta    | Comando                                       |
| ------------- | ------------- | --------------------------------------------- |
| JavaScript/TS | Jest/Istanbul | `jest --coverage`                             |
| Python        | pytest-cov    | `pytest --cov`                                |
| Java          | JaCoCo        | `mvn jacoco:report`                           |
| C#            | coverlet      | `dotnet test --collect:"XPlat Code Coverage"` |

### Interpretando Reports

```
File            | % Stmts | % Branch | % Funcs | % Lines |
----------------|---------|----------|---------| --------|
✅ UserService  |   95    |    90    |   100   |   95    |
⚠️ PaymentAPI   |   72    |    65    |    80   |   72    | ← Needs work
❌ LegacyModule |   45    |    30    |    50   |   45    | ← High risk
```

---

## 🎯 Priorização de Testes

### Alta Prioridade (DEVE ter testes)

1. **Business-critical paths**
   - Payment processing
   - User authentication
   - Data persistence

2. **Código complexo**
   - Cyclomatic complexity > 10
   - Múltiplas branches
   - State machines

3. **Bug-prone areas**
   - Código com histórico de bugs
   - Áreas frequentemente modificadas

### Média Prioridade (DEVERIA ter testes)

1. **Utilities comuns**
2. **Validations**
3. **Formatters/parsers**

### Pode Skip (testes opcionais)

1. **Generated code**
2. **Configuration files**
3. **Pure UI sem lógica**

---

## 📝 Test Coverage Improvement Plan

```markdown
## Coverage Improvement Sprint

**Current**: 65%
**Target**: 80%
**Gap**: 15%

### Priority Files

| File              | Current | Target | Tests Needed |
| ----------------- | ------- | ------ | ------------ |
| PaymentService.ts | 45%     | 90%    | ~20 tests    |
| UserValidator.ts  | 60%     | 95%    | ~10 tests    |
| OrderProcessor.ts | 55%     | 85%    | ~15 tests    |

### Action Items

1. [ ] Add tests for PaymentService happy path
2. [ ] Cover error scenarios in UserValidator
3. [ ] Test concurrent order processing
4. [ ] Add integration tests for checkout flow
```

---

## ⚠️ Coverage Anti-Patterns

### ❌ Evitar

- **Coverage-driven tests**: Testes só para aumentar número
- **Snapshot abuse**: Snapshots sem assertions úteis
- **Testing implementation**: Testes quebram com refactor

### ✅ Preferir

- **Behavior-driven tests**: Testam o "o quê", não "como"
- **Meaningful assertions**: Verificam outputs específicos
- **Resilient tests**: Sobrevivem refactoring

---

## 🔗 Relacionamentos

- **Usado por**: ${AVANADE_MEMORY_DEV_TIAGO}, ${AVANADE_MEMORY_QA_CARLA}
- **Complementa**: ${AVANADE_TASK_CODE_REVIEW}, ${AVANADE_TASK_CLEAN_CODE}
- **Workflow**: TDD Implementation workflow
