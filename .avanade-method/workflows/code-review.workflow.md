## ðŸ“‹ O que Ã© este Workflow?

O **code-review** Ã© um workflow Avanade Method v6 que executa **adversarial code review** - uma review rigorosa que **SEMPRE encontra 3-10 issues** porque assume papel de Senior Developer crÃ­tico, nÃ£o colaborador gentil.

**Filosofia**: "Prefiro encontrar bugs em code review que em production. Review honesto > aprovaÃ§Ã£o rÃ¡pida."

---

## ðŸŽ¯ Quando Usar?

### âœ… Use code-review quando:
- **Story implementada** e developer pede review antes de merge
- **Pre-merge check** para garantir quality antes de integration
- **Quality gate enforcement** - nada merges sem review
- **Knowledge sharing** - junior devs aprendem com feedback
- **Technical debt prevention** - catch issues early

### âŒ NÃƒO use quando:
- **Work in progress** (WIP) - muito cedo para review formal
- **Spike/prototype** - exploratory code nÃ£o precisa production-quality review
- **Quick fix** urgente em production (review DEPOIS de deploy)
- **Generated code** boilerplate (migrations, scaffolding) que nÃ£o tem logic

---

## ðŸ”„ Workflow Process (Adversarial Review)

### Philosophy: "Adversarial Senior Developer"

**Persona**: VocÃª Ã© Senior Developer com 10+ anos experiÃªncia, **CÃ‰TICO** por natureza, que viu muitos bugs em production causados por code reviews apressados.

**Mindset**:
- âŒ **NÃƒO** seja colaborador gentil que busca aprovar
- âœ… **SEJA** crÃ­tico rigoroso que busca encontrar problemas
- âŒ **NÃƒO** assuma "provavelmente funciona"
- âœ… **ASSUMA** "se algo pode quebrar, vai quebrar em production"
- âŒ **NÃƒO** "Looks good to me!"
- âœ… **SEMPRE** encontre 3-10 issues reais (bugs, edge cases, technical debt, etc)

**Expectation**: Este workflow **NUNCA** aprova sem encontrar issues. Se vocÃª nÃ£o encontrou nada, **vocÃª nÃ£o procurou suficientemente**.

---

### Review Process (8 Dimensions)

### DIMENSION 1: Story & Acceptance Criteria Validation
**Objetivo**: CÃ³digo implementa o que a story pediu?

**Checklist**:
```yaml
1. Story Context:
   - [ ] Carregar story file (ST-XXX.md) para contexto
   - [ ] Ler user story (As a/I want/So that)
   - [ ] Ler acceptance criteria (Given/When/Then)

2. AC Coverage:
   - [ ] Para CADA acceptance criterion, cÃ³digo implementa?
   - [ ] Testes validam cada AC?
   - [ ] Edge cases dos ACs cobertos?

3. Out of Scope:
   - [ ] CÃ³digo adiciona features NÃƒO na story? (scope creep)
   - [ ] ImplementaÃ§Ã£o Ã© EXATAMENTE o que story pede (nÃ£o mais, nÃ£o menos)?
```

**Issues Comuns**:
- âœ‹ **AC nÃ£o implementado**: Story pede validation, cÃ³digo nÃ£o valida
- âœ‹ **Scope creep**: Developer adicionou features nÃ£o pedidas
- âœ‹ **Interpretation errors**: Developer interpretou AC incorretamente

---

### DIMENSION 2: Code Quality (Clean Code Principles)
**Objetivo**: CÃ³digo Ã© legÃ­vel, manutenÃ­vel, idiomÃ¡tico?

**Checklist** (referÃªncia: ${AVANADE_TASK_CLEAN_CODE}):
```yaml
1. Naming:
   - [ ] Variable names descritivos (nÃ£o x, temp, data)
   - [ ] Function names verbos (getUserData, calculateTotal)
   - [ ] Class names substantivos (UserService, OrderProcessor)
   - [ ] Consistent naming convention (camelCase, PascalCase, snake_case)

2. Function Size:
   - [ ] Functions <20 linhas (quebrar se maior)
   - [ ] Single Responsibility (funÃ§Ã£o faz 1 coisa)
   - [ ] Avoid deep nesting (>3 levels = refactor)

3. DRY (Don't Repeat Yourself):
   - [ ] CÃ³digo duplicado? Extrair para funÃ§Ã£o/class
   - [ ] Magic numbers? Usar constants
   - [ ] Copy/paste code? RED FLAG

4. Comments:
   - [ ] Code self-documenting? (nomes claros)
   - [ ] Comments explicam WHY nÃ£o WHAT
   - [ ] Commented-out code? DELETE (usar git history)

5. Complexity:
   - [ ] Cyclomatic complexity baixa (<10)
   - [ ] Avoid clever code (simple > clever)
```

**Issues Comuns**:
- âœ‹ **God functions**: FunÃ§Ã£o com 100+ linhas fazendo 5 coisas
- âœ‹ **Magic numbers**: `if (status == 3)` sem explicar o que Ã© "3"
- âœ‹ **Poor naming**: `data2`, `temp`, `x` - ninguÃ©m sabe o que Ã©
- âœ‹ **Copy/paste**: Same logic repetida 3x em arquivos diferentes

---

### DIMENSION 3: Error Handling & Edge Cases
**Objetivo**: CÃ³digo trata erros? Edge cases cobertos?

**Checklist**:
```yaml
1. Input Validation:
   - [ ] Null checks (se input pode ser null)?
   - [ ] Empty string/array checks?
   - [ ] Type validation (se dynamic language)?
   - [ ] Range validation (nÃºmeros, dates)?

2. Error Handling:
   - [ ] Try/catch em operaÃ§Ãµes que podem falhar (file I/O, network, DB)?
   - [ ] Error messages Ãºteis (nÃ£o "Error occurred")?
   - [ ] Errors logados com context?
   - [ ] Errors propagados corretamente (nÃ£o swallowed)?

3. Edge Cases:
   - [ ] Empty list - o que acontece se lista vazia?
   - [ ] Single item - lÃ³gica funciona com apenas 1 item?
   - [ ] Large datasets - performance com 100k+ items?
   - [ ] Concurrent access - race conditions?
   - [ ] Boundary values - 0, -1, MAX_INT, etc?

4. Defensive Programming:
   - [ ] Assume inputs sÃ£o invÃ¡lidos atÃ© provado contrÃ¡rio
   - [ ] Fail fast (detectar problemas cedo)
   - [ ] Graceful degradation (fallback se service down)
```

**Issues Comuns**:
- âœ‹ **NullReferenceException waiting to happen**: NÃ£o checa null antes de `.property`
- âœ‹ **Empty array crashes**: `array[0]` sem checar se array tem items
- âœ‹ **Swallowed exceptions**: `catch (Exception e) { }` - erro ignorado silenciosamente
- âœ‹ **No timeout**: Network call sem timeout = hang forever

**RED FLAGS**:
```csharp
// âŒ BAD - Null reference waiting to happen
var userName = user.Name.ToUpper();

// âœ… GOOD - Defensive
var userName = user?.Name?.ToUpper() ?? "Unknown";

// âŒ BAD - Swallowed exception
try { 
  ProcessOrder(order); 
} catch { }

// âœ… GOOD - Logged and propagated
try {
  ProcessOrder(order);
} catch (Exception ex) {
  _logger.LogError(ex, "Failed to process order {OrderId}", order.Id);
  throw;
}
```

---

### DIMENSION 4: Security Vulnerabilities
**Objetivo**: CÃ³digo tem security issues?

**Checklist**:
```yaml
1. Input Sanitization:
   - [ ] SQL Injection - Usa parameterized queries?
   - [ ] XSS - Output encoding em HTML?
   - [ ] Command Injection - Evita shell commands com user input?
   - [ ] Path Traversal - Valida file paths?

2. Authentication & Authorization:
   - [ ] Endpoint protegido? (authentication required)
   - [ ] User tem permissÃ£o? (authorization check)
   - [ ] Token validation correta?

3. Data Exposure:
   - [ ] Passwords/secrets em cÃ³digo? (usar secrets manager)
   - [ ] PII (Personal Identifiable Info) logado?
   - [ ] API keys hardcoded?

4. Crypto:
   - [ ] Usa crypto libraries standard (nÃ£o custom crypto)?
   - [ ] Strong algorithms (nÃ£o MD5, SHA1)?
   - [ ] Secrets encrypted at rest?
```

**Issues Comuns**:
- âœ‹ **SQL Injection**: `$"SELECT * FROM Users WHERE Id={userId}"` - user input nÃ£o sanitizado
- âœ‹ **Hardcoded secrets**: `var apiKey = "sk-prod-123abc"` em cÃ³digo
- âœ‹ **Missing authorization**: Endpoint checa authentication mas nÃ£o verifica se user tem permission
- âœ‹ **XSS**: Rendering user input sem encoding - `<div>{userComment}</div>`

**RED FLAGS**:
```csharp
// âŒ BAD - SQL Injection
var query = $"SELECT * FROM Users WHERE Username='{username}'";

// âœ… GOOD - Parameterized
var query = "SELECT * FROM Users WHERE Username=@username";
cmd.Parameters.AddWithValue("@username", username);

// âŒ BAD - Hardcoded secret
var apiKey = "sk-prod-abc123";

// âœ… GOOD - Secret manager
var apiKey = _config["ApiKey"]; // from Azure Key Vault
```

---

### DIMENSION 5: Performance & Scalability
**Objetivo**: CÃ³digo tem performance issues?

**Checklist**:
```yaml
1. Database:
   - [ ] N+1 queries? (loop com query dentro = RED FLAG)
   - [ ] Missing indexes? (query em colunas nÃ£o indexadas)
   - [ ] SELECT * ? (trazer sÃ³ colunas necessÃ¡rias)
   - [ ] Large result sets sem pagination?

2. Loops & Algorithms:
   - [ ] Nested loops O(nÂ²)? Pode otimizar para O(n)?
   - [ ] Unnecessary iterations? (pode usar .First() ao invÃ©s de .Where().ToList()?)
   - [ ] In-memory sorting de large datasets?

3. Memory:
   - [ ] Memory leaks? (objects nÃ£o disposed, event handlers nÃ£o removidos)
   - [ ] Large objects em memory? (load 1GB file em memory?)
   - [ ] Caching strategy? (recomputa mesma coisa 1000x?)

4. Async/Await:
   - [ ] I/O operations sÃ­ncronas? (devem ser async)
   - [ ] Blocking calls em async code? (.Result, .Wait())
   - [ ] Missing ConfigureAwait(false) em library code?
```

**Issues Comuns**:
- âœ‹ **N+1 queries**: Loop com DB query dentro = 1000 queries ao invÃ©s de 1
- âœ‹ **SELECT * from million-row table**: Sem LIMIT/TOP, traz tudo
- âœ‹ **Blocking async**: `var result = SomeAsyncMethod().Result` - deadlock risk
- âœ‹ **No caching**: Calling expensive operation 100x com mesmo input

**RED FLAGS**:
```csharp
// âŒ BAD - N+1 Query Problem
foreach (var order in orders) {
  var customer = _db.Customers.Find(order.CustomerId); // Query in loop!
}

// âœ… GOOD - Eager loading
var orders = _db.Orders.Include(o => o.Customer).ToList();

// âŒ BAD - Blocking async
var result = GetDataAsync().Result; // Deadlock risk

// âœ… GOOD - Proper async
var result = await GetDataAsync();
```

---

### DIMENSION 6: Test Coverage & Quality
**Objetivo**: Testes existem? SÃ£o bons?

**Checklist**:
```yaml
1. Coverage:
   - [ ] Unit tests >80% coverage?
   - [ ] Critical paths 100% covered?
   - [ ] Edge cases testados?

2. Test Quality:
   - [ ] Tests sÃ£o independentes? (nÃ£o dependem de ordem)
   - [ ] Tests sÃ£o determinÃ­sticos? (nÃ£o flaky)
   - [ ] Test names descritivos? (mÃ©todo_cenÃ¡rio_resultadoEsperado)
   - [ ] AAA pattern? (Arrange/Act/Assert)

3. Test Coverage Gaps:
   - [ ] Happy path testado?
   - [ ] Error paths testados?
   - [ ] Boundary values testados?
   - [ ] Null/empty inputs testados?

4. Integration Tests:
   - [ ] API endpoints tÃªm integration tests?
   - [ ] Database operations testadas?
   - [ ] External service mocks corretos?
```

**Issues Comuns**:
- âœ‹ **Low coverage**: <60% code coverage
- âœ‹ **Only happy path**: Testes sÃ³ testam caso feliz, nÃ£o errors
- âœ‹ **Flaky tests**: Tests falham randomicamente
- âœ‹ **No edge case tests**: NÃ£o testa null, empty, boundary values

---

### DIMENSION 7: Architecture & Design Patterns
**Objetivo**: CÃ³digo segue architecture? Patterns corretos?

**Checklist**:
```yaml
1. Architecture Compliance:
   - [ ] CÃ³digo segue architecture document decisions?
   - [ ] Tech stack correto? (nÃ£o introduz libs nÃ£o aprovadas)
   - [ ] Layer separation correta? (UI nÃ£o acessa DB direto)

2. SOLID Principles:
   - [ ] Single Responsibility (classe faz 1 coisa)?
   - [ ] Open/Closed (extensÃ­vel sem modificar)?
   - [ ] Liskov Substitution (subclasses substituÃ­veis)?
   - [ ] Interface Segregation (interfaces pequenas e focadas)?
   - [ ] Dependency Inversion (depende de abstraÃ§Ãµes)?

3. Design Patterns:
   - [ ] Pattern correto aplicado? (Repository, Factory, Strategy, etc)
   - [ ] Over-engineering? (pattern desnecessÃ¡rio para simplicidade atual)

4. Dependencies:
   - [ ] Dependency injection usado?
   - [ ] Circular dependencies? (A depende de B, B depende de A = BAD)
   - [ ] Tight coupling? (classe hardcoded depende de implementaÃ§Ã£o concreta)
```

**Issues Comuns**:
- âœ‹ **God class**: Classe com 1000+ linhas fazendo tudo
- âœ‹ **Tight coupling**: `var service = new UserService()` - hardcoded dependency
- âœ‹ **Wrong layer**: Controller acessa database direto (pula service layer)

---

### DIMENSION 8: Documentation & Maintainability
**Objetivo**: PrÃ³ximo developer vai entender?

**Checklist**:
```yaml
1. Code Documentation:
   - [ ] Public APIs tÃªm XML comments?
   - [ ] Complex logic tem comments explicando WHY?
   - [ ] TODOs documentados com context?

2. README/Docs:
   - [ ] README updated se mudou setup/config?
   - [ ] API docs atualizados se API mudou?
   - [ ] Breaking changes documentados?

3. Commit Messages:
   - [ ] Commit message claro? (nÃ£o "fix bug")
   - [ ] References story ID? (ex: "ST-042: Add export validation")
```

---

## ðŸ“Š OUTPUT FORMAT

### Code Review Report Structure

```markdown
# Code Review Report: ST-XXX

**Story**: ST-042 (Add Export Validation)  
**Reviewer**: Carla QA  
**Developer**: Tiago Dev  
**Date**: 2025-02-03  
**Verdict**: âŒ REQUEST CHANGES | âš ï¸ APPROVE WITH COMMENTS | âœ… APPROVE

---

## Summary

**Issues Found**: 7 (3 critical, 2 high, 2 medium)  
**Lines Reviewed**: 342 lines across 8 files  
**Files Changed**: src/services/ExportService.cs, src/controllers/ExportController.cs, tests/ExportServiceTests.cs

**Overall Assessment**:
[2-3 parÃ¡grafos sobre estado geral do cÃ³digo, principais concerns, e se estÃ¡ pronto para merge]

---

## Critical Issues (MUST FIX before merge)

### âŒ CRITICAL-1: SQL Injection Vulnerability
**Location**: `ExportService.cs:45`  
**Issue**: User input directly concatenated into SQL query
```csharp
// Current code (VULNERABLE)
var query = $"SELECT * FROM Exports WHERE UserId='{userId}'";
```
**Impact**: Attacker pode injetar SQL e acessar/deletar dados de outros users  
**Recommendation**:
```csharp
// Use parameterized query
var query = "SELECT * FROM Exports WHERE UserId=@userId";
cmd.Parameters.AddWithValue("@userId", userId);
```
**Severity**: ðŸ”´ Critical - Security vulnerability  
**Effort**: 5 min fix

---

### âŒ CRITICAL-2: Missing Null Check (NullReferenceException)
**Location**: `ExportController.cs:78`  
**Issue**: No null check before accessing `user.Email`
```csharp
// Current code (CRASH RISK)
var email = user.Email.ToLower();
```
**Impact**: Crash se user.Email for null  
**Recommendation**:
```csharp
var email = user?.Email?.ToLower() ?? "unknown";
```
**Severity**: ðŸ”´ Critical - Production crash risk  
**Effort**: 2 min fix

---

## High Priority Issues (Should fix)

### âš ï¸ HIGH-1: N+1 Query Problem
**Location**: `ExportService.cs:120-125`  
**Issue**: Loop com database query dentro
```csharp
foreach (var export in exports) {
  var user = _db.Users.Find(export.UserId); // 1000 queries if 1000 exports!
}
```
**Impact**: Performance - 1000x slower than necessary  
**Recommendation**:
```csharp
var exports = _db.Exports.Include(e => e.User).ToList(); // 1 query
```
**Severity**: ðŸŸ  High - Performance issue  
**Effort**: 10 min fix

---

### âš ï¸ HIGH-2: Missing Error Handling
**Location**: `ExportService.cs:89`  
**Issue**: File I/O sem try/catch
```csharp
File.WriteAllText(filePath, content); // Can throw IOException
```
**Impact**: Unhandled exception crashes process  
**Recommendation**:
```csharp
try {
  File.WriteAllText(filePath, content);
} catch (IOException ex) {
  _logger.LogError(ex, "Failed to write export file {Path}", filePath);
  throw new ExportException("Failed to save export file", ex);
}
```
**Severity**: ðŸŸ  High - Crash risk  
**Effort**: 5 min fix

---

## Medium Priority Issues (Nice to fix)

### ðŸŸ¡ MEDIUM-1: Magic Number
**Location**: `ExportService.cs:56`  
**Issue**: Hardcoded `3` sem explicaÃ§Ã£o
```csharp
if (retryCount > 3) { ... } // What is 3?
```
**Recommendation**:
```csharp
private const int MAX_RETRY_ATTEMPTS = 3;
if (retryCount > MAX_RETRY_ATTEMPTS) { ... }
```
**Severity**: ðŸŸ¡ Medium - Readability  
**Effort**: 2 min fix

---

### ðŸŸ¡ MEDIUM-2: Low Test Coverage
**Location**: `ExportServiceTests.cs`  
**Issue**: Only happy path tested, no error cases
**Coverage**: 65% (target >80%)  
**Missing Tests**:
- ExportService_WhenFileWriteFails_ThrowsException
- ExportService_WhenUserNotFound_ReturnsNull
- ExportService_WhenLargeDataset_Paginates  
**Severity**: ðŸŸ¡ Medium - Quality  
**Effort**: 20 min to add 3 tests

---

## Low Priority / Nits (Optional)

### ðŸ’¡ LOW-1: Variable Naming
**Location**: `ExportController.cs:23`  
**Issue**: Variable named `temp` - unclear purpose
```csharp
var temp = ProcessExport(data);
```
**Recommendation**: `var exportResult = ProcessExport(data);`  
**Effort**: 1 min

---

## Positive Observations âœ…

- âœ… **Good**: Dependency injection usado corretamente
- âœ… **Good**: API endpoint tem integration test
- âœ… **Good**: Logging em pontos chave
- âœ… **Good**: README updated com novas config options

---

## Acceptance Criteria Validation

### AC1: Validate export format
âœ… PASS - Code validates format against allowed list  
âŒ FAIL - Error message vago ("Invalid format" - should say which formats allowed)

### AC2: Validate file size
âœ… PASS - Checks file size < 10MB  
âœ… PASS - Returns clear error if too large

### AC3: Validate permissions
âŒ FAIL - Missing authorization check (only checks authentication)

**AC Coverage**: 2/3 passing (66%)

---

## Definition of Done Checklist

- [x] Code implemented
- [ ] Unit tests (>80% coverage) - Currently 65%
- [ ] Integration tests - âœ… Present
- [ ] Acceptance criteria validated - âŒ 1/3 failing
- [ ] Documentation updated - âœ… README updated
- [x] No critical bugs - âŒ 2 critical issues found
- [ ] Code merged to main - Blocked by issues

**DoD Status**: âŒ NOT READY - 3 critical + 2 high issues MUST be fixed

---

## Verdict: âŒ REQUEST CHANGES

**Reasoning**:
Code has 2 **CRITICAL** security/stability issues (SQL injection, null reference) que DEVEM ser resolvidos antes de merge. TambÃ©m tem 2 **HIGH** priority performance/error handling issues que significantly impactam production quality.

**Required Actions**:
1. Fix CRITICAL-1 (SQL injection) - 5 min
2. Fix CRITICAL-2 (null check) - 2 min
3. Fix HIGH-1 (N+1 query) - 10 min
4. Fix HIGH-2 (error handling) - 5 min
5. Add missing AC3 (authorization check) - 15 min
6. Increase test coverage to >80% - 20 min

**Estimated Fix Time**: ~1 hour total

**Next Steps**:
1. Developer fixes issues
2. Push updated code
3. Re-request review (Carla will re-review within 4 hours)

---

## Auto-Fix Option

**Offer**: "Eu posso fazer auto-fix dos 4 critical/high issues automaticamente. Quer que eu faÃ§a?"

Se developer aceitar:
- Create branch `fix/code-review-ST-042`
- Apply fixes para CRITICAL-1, CRITICAL-2, HIGH-1, HIGH-2
- Commit com message "fix: Code review auto-fixes for ST-042"
- Developer review auto-fixes e merge se correto

---

**Reviewer**: Carla QA  
**Review Time**: 25 minutes  
**Follow-up**: Re-review apÃ³s fixes (ETA: 4 hours)
```

---

## ðŸ”— Integration Points

### Prerequisites:
- **dev-story** completed â†’ Story implementation done, code pushed
- **Story file** (ST-XXX.md) â†’ For AC validation
- **Architecture doc** (optional) â†’ For architecture compliance check

### Triggers code-review:
- Developer completa story via `dev-story` workflow
- Developer manually requests review: `avanade-method-bmm-code-review ST-042`

### Next Steps After Review:
1. **If APPROVED** â†’ Merge to main, update story status to `completed`
2. **If REQUEST CHANGES** â†’ Developer fixes, re-requests review
3. **Auto-fix option** â†’ Reviewer pode fazer fixes automÃ¡ticos se developer aceitar

### Updates:
- **sprint-status.yaml** â†’ Story status updated to `in-review` during review, `completed` when approved
- **Story file** â†’ Status field updated

---

## âœ… Best Practices

### DO:
- âœ… **Be thorough** - SEMPRE encontrar 3-10 issues (se nÃ£o achou, procure mais)
- âœ… **Be specific** - Point to exact lines, show before/after code
- âœ… **Explain impact** - "Why this matters" (crash risk, security, performance)
- âœ… **Offer solutions** - NÃ£o sÃ³ criticar, mostrar como fix
- âœ… **Prioritize issues** - Critical vs High vs Medium
- âœ… **Test coverage** - Checar se testes sÃ£o bons, nÃ£o sÃ³ coverage %
- âœ… **Security mindset** - Assume inputs sÃ£o malicious

### DON'T:
- âŒ **NÃ£o aprove sem issues** - Se nÃ£o achou nada, vocÃª nÃ£o procurou suficiente
- âŒ **NÃ£o seja vago** - "This looks wrong" â†’ especÃ­fico "Null check missing line 45"
- âŒ **NÃ£o ignore tests** - "Code works" nÃ£o Ã© suficiente, precisa tests
- âŒ **NÃ£o skip security** - SQL injection, XSS sÃ£o CRITICAL
- âŒ **NÃ£o accept "works on my machine"** - Edge cases, errors, performance matters

---

## ðŸš¨ Common Pitfalls

### Pitfall 1: **Rubber Stamp Review ("LGTM")**
**Sintoma**: Review rÃ¡pido em 2 minutos, "Looks good to me!", approve  
**Problema**: Bugs vÃ£o para production nÃ£o detectados  
**SoluÃ§Ã£o**: **Adversarial mindset** - assume code tem bugs, procure atÃ© encontrar

### Pitfall 2: **Only Happy Path Review**
**Sintoma**: Checa se cÃ³digo funciona, nÃ£o checa error handling  
**Problema**: Production errors, crashes, data corruption  
**SoluÃ§Ã£o**: Perguntar "O que acontece se isso falhar?" para cada operaÃ§Ã£o

### Pitfall 3: **Ignoring Tests**
**Sintoma**: "Code coverage 65%, approve anyway"  
**Problema**: Bugs nÃ£o detectados por tests, regressions no futuro  
**SoluÃ§Ã£o**: Test coverage >80% Ã© REQUIREMENT, nÃ£o suggestion

### Pitfall 4: **Missing Security Review**
**Sintoma**: Review foca em code style, ignora SQL injection  
**Problema**: Security vulnerabilities em production  
**SoluÃ§Ã£o**: Security checklist Ã© OBRIGATÃ“RIO (SQL injection, XSS, auth, secrets)

---

## ðŸ’¡ Examples

### Example: Good Review Finding

**GOOD** âœ…:
```markdown
### âŒ CRITICAL-1: SQL Injection Vulnerability
**Location**: `UserService.cs:45`  
**Issue**: User input concatenated into SQL query without sanitization
```csharp
// VULNERABLE CODE
var query = $"SELECT * FROM Users WHERE Username='{username}'";
// If username = "admin' OR '1'='1", returns all users!
```
**Impact**: 
- Severity: ðŸ”´ CRITICAL
- Attacker pode bypass authentication, access all user data, delete records
- OWASP Top 10 #1 vulnerability

**Fix** (5 min):
```csharp
// Use parameterized query
var query = "SELECT * FROM Users WHERE Username=@username";
cmd.Parameters.AddWithValue("@username", username);
```

**Testing**: Add test `UserService_SqlInjectionAttempt_IsBlocked()`
```

**BAD** âŒ:
```markdown
### Issue: Database query looks wrong
Location: UserService.cs  
Fix: Maybe use better query
```
**Por que BAD**: Vago (qual linha?), nÃ£o explica problema (SQL injection?), nÃ£o mostra como fix, nÃ£o quantifica severity

---

## ðŸ“– References

- **Avanade Method Workflow Path**: `_avanade-method/bmm/workflows/4-implementation/code-review/`
- **Workflow Manifest Entry**: `workflow-manifest.csv` line 20
- **Command**: `avanade-method-bmm-code-review ST-042` (specify story ID)
- **Owner Agent**: Carla QA

**Related Artifacts**:
- ${AVANADE_TASK_CLEAN_CODE} - Clean code principles checklist
- ${AVANADE_TASK_DEBUGGING_GUIDE} - Debugging best practices
- ${AVANADE_TEST_PLAN_TEMPLATE} - Test planning reference

**Related Workflows**:
- `dev-story` â†’ Implements story (triggers code-review)
- `sprint-status` â†’ Tracks story status (in-review, completed)
- `correct-course` â†’ If major changes needed after review

---
