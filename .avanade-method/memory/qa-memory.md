### Test Automation Patterns
_EstratÃ©gias de automaÃ§Ã£o que funcionam_

**Exemplo**:
```yaml
- pattern: "Test Pyramid (70% unit, 20% integration, 10% E2E)"
  rationale:
    - "Unit tests: rÃ¡pidos (ms), feedback imediato"
    - "Integration: validam contratos entre componentes"
    - "E2E: user flows crÃ­ticos (happy paths)"
  implementation:
    unit: "Jest (JavaScript) ou xUnit (C#)"
    integration: "Testcontainers (DBs), WireMock (APIs)"
    e2e: "Playwright, Selenium, Cypress"
  metrics:
    - "Execution time: <5min (unit), <15min (integration), <30min (E2E)"
    - "Coverage: >80% unit, >60% integration"
  anti_pattern_avoided: "Inverted pyramid (muitos E2E â†’ lento, flaky)"
  
- pattern: "Shift-Left Testing (QA desde Sprint 1)"
  activities:
    - "Carla participa de Planning (valida testabilidade de stories)"
    - "Acceptance criteria co-criados (Carla + Paula + Roberto)"
    - "Test automation em paralelo com dev (nÃ£o apÃ³s)"
  benefits:
    - "Bugs descobertos early (custo 10x menor que em produÃ§Ã£o)"
    - "Definition of Done inclui testes (nÃ£o depois)"
  metrics: "Bugs em produÃ§Ã£o -60% (shift-left adotado)"
  
- pattern: "BDD (Behavior-Driven Development)"
  tool: "Cucumber, SpecFlow"
  example:
    feature: "User Login"
    scenario: |
      Given user is on login page
      When user enters valid credentials
      Then user is redirected to dashboard
  benefits:
    - "Testes legÃ­veis por stakeholders (nÃ£o apenas devs)"
    - "Living documentation (specs = tests)"
  cons: "Overhead de manutenÃ§Ã£o (Gherkin syntax)"
  best_for: "Projetos com stakeholders tÃ©cnicos envolvidos"
```

---

### Test Coverage Strategies
_Como garantir cobertura adequada_

**Exemplo**:
```yaml
- metric: "Code Coverage (by lines)"
  target: ">80%"
  measurement: "SonarQube, Coveralls"
  interpretation:
    - ">90%: Excelente (mas watch for false security)"
    - "70-80%: Adequado (foco em crÃ­ticos)"
    - "<70%: Insuficiente (riscos altos)"
  caveat: "Coverage NÃƒO garante qualidade (pode testar cÃ³digo mas nÃ£o casos edge)"
  
- metric: "Mutation Testing (quality of tests)"
  tool: "Stryker.NET, PIT (Java)"
  concept: "Introduz bugs propositais â†’ testes devem detectar"
  example:
    original_code: "if (age >= 18)"
    mutation: "if (age > 18)"
    expectation: "Testes devem FALHAR (detectar bug introduzido)"
  benefit: "Valida que testes sÃ£o eficazes (nÃ£o apenas executam cÃ³digo)"
  
- pattern: "Risk-Based Testing (priorizarabertura por risco)"
  high_priority:
    - "Payment processing (financial impact)"
    - "Authentication/Authorization (security)"
    - "Data migrations (irreversÃ­vel se erro)"
  medium_priority:
    - "Reporting features (UX impact, nÃ£o crÃ­tico)"
  low_priority:
    - "UI cosmetics (cor de botÃ£o, etc)"
  benefit: "ROI de testing otimizado (foco onde bugs custam mais)"
```

---

### Bug Triage & Management
_Processo de gestÃ£o de bugs_

**Exemplo**:
```yaml
- severity_classification:
  critical:
    definition: "Sistema inoperante, perda de dados, security breach"
    sla: "Fix em <4h (hotfix imediato)"
    example: "SQL injection vulnerability, payment processing down"
  high:
    definition: "Funcionalidade core quebrada, workaround difÃ­cil"
    sla: "Fix em <24h (prÃ³ximo deploy)"
    example: "Login nÃ£o funciona (50% dos usuÃ¡rios afetados)"
  medium:
    definition: "Funcionalidade secundÃ¡ria quebrada, workaround existe"
    sla: "Fix em prÃ³xima sprint"
    example: "Export to PDF falha (workaround: export to CSV)"
  low:
    definition: "CosmÃ©tico, edge case raro"
    sla: "Backlog (fix quando capacity)"
    example: "Tooltip truncado em resoluÃ§Ãµes < 1024px"
  
- priority_matrix: "Severity Ã— Frequency"
  high_priority: "Critical severity OU High severity + High frequency"
  medium_priority: "Medium severity + Medium frequency"
  low_priority: "Low severity OU Rare occurrence"
  
- bug_lifecycle:
  1. "New: Bug reportado (Carla ou user)"
  2. "Triaged: Severity/priority atribuÃ­dos (Carla + Paula)"
  3. "Assigned: Developer atribuÃ­do (Tiago)"
  4. "In Progress: Dev trabalhando"
  5. "Fixed: Code committed, deployed to staging"
  6. "Verified: Carla valida fix (regression test)"
  7. "Closed: Deploy to production, monitoring"
```

---

### Quality Gates Configuration
_Gates obrigatÃ³rios antes de releases_

**Exemplo**:
```yaml
- gate: "Pre-Merge (Pull Request)"
  automated_checks:
    - "Unit tests passed (>80% coverage)"
    - "Code quality (SonarQube: 0 critical issues)"
    - "Security scan (OWASP: 0 high/critical vulns)"
  manual_checks:
    - "Code review approved (Tiago ou senior dev)"
  sla: "Blocker - merge bloqueado atÃ© passar"
  
- gate: "Pre-Staging Deployment"
  automated_checks:
    - "Integration tests passed"
    - "API contract tests passed (Pact)"
    - "Performance benchmarks (P95 < 200ms)"
  manual_checks:
    - "Smoke tests (Carla): critical paths funcionam"
  sla: "Blocker - deploy bloqueado atÃ© passar"
  
- gate: "Pre-Production Release"
  automated_checks:
    - "E2E tests passed (critical user flows)"
    - "Load testing (50k concurrent users, no errors)"
    - "Accessibility scan (WCAG AA compliance - Sofia valida)"
  manual_checks:
    - "UAT sign-off (Paula + stakeholders)"
    - "Release notes reviewed (communications team)"
    - "Rollback plan documented"
  sla: "Blocker - deploy bloqueado atÃ© passar"
  approval: "Paula (PO) + JoÃ£o (PM) aprovam formalmente"
  
- gate: "Post-Production Monitoring (24h Hypercare)"
  checks:
    - "Error rate < 0.1% (Application Insights)"
    - "P95 latency < 300ms"
    - "No critical bugs reported (support tickets)"
  action_if_fail: "Rollback to previous version (automated)"
```

---

## ðŸ› Bug Patterns & Root Causes

### Recurring Bug Patterns
_Bugs que aparecem frequentemente e root causes_

**Exemplo**:
```yaml
- bug_pattern: "Null Reference Exceptions"
  frequency: "Alta (30% dos bugs)"
  root_cause: "ValidaÃ§Ã£o de input insuficiente, null checks faltando"
  prevention:
    - "Static analysis (null safety checks - C# nullable reference types)"
    - "Defensive programming (guard clauses)"
    - "Code review checklist item: 'Null checks in place?'"
  impact: "ReduÃ§Ã£o 30% â†’ 10% apÃ³s mitigations"
  
- bug_pattern: "Race Conditions (concurrency bugs)"
  frequency: "MÃ©dia (15% dos bugs em sistemas distribuÃ­dos)"
  root_cause: "Shared state, locks inadequados, async/await misuse"
  prevention:
    - "Immutable data structures (evitar shared mutable state)"
    - "Proper locking (ReaderWriterLock, semaphores)"
    - "Load testing early (expÃµe race conditions)"
  detection: "DifÃ­cil (flaky tests, intermittent failures)"
  impact: "ReduÃ§Ã£o via code reviews focadas + load testing"
  
- bug_pattern: "SQL Injection (security)"
  frequency: "Baixa (5% mas CRITICAL severity)"
  root_cause: "ConcatenaÃ§Ã£o de strings em queries (nÃ£o parameterizado)"
  prevention:
    - "ORMs (Entity Framework, Hibernate) â†’ parameterizaÃ§Ã£o automÃ¡tica"
    - "Code review checklist: 'SQL queries parameterizadas?'"
    - "SAST tools (Static Application Security Testing)"
  impact: "Zero SQL injections apÃ³s SAST enforcement"
  
- bug_pattern: "UI Rendering Issues (mobile/browser inconsistencies)"
  frequency: "MÃ©dia (20% dos bugs UX)"
  root_cause: "Browser compatibility, responsive design edge cases"
  prevention:
    - "Cross-browser testing (Playwright em Chrome/Firefox/Safari)"
    - "Responsive testing (Browserstack: mÃºltiplos devices)"
    - "Design system (Fluent UI) â†’ consistent components"
  impact: "ReduÃ§Ã£o 20% â†’ 8% apÃ³s design system adoption"
```

---

### Flaky Tests Management
_Como lidar com testes instÃ¡veis_

**Exemplo**:
```yaml
- cause: "Timing issues (async operations)"
  symptom: "Test passa 80% das vezes, falha 20% (intermittent)"
  fix:
    - "Explicit waits (waitForElement) em vez de sleep(5000)"
    - "Retry logic (Playwright: expect().toBeVisible({timeout: 10000}))"
  prevention: "Code review: evitar sleeps, usar waits explÃ­citos"
  
- cause: "Test order dependency (tests nÃ£o isolados)"
  symptom: "Test A passa sozinho, falha se executado apÃ³s Test B"
  fix:
    - "Setup/teardown adequados (limpar DB, reset state)"
    - "Testes independentes (cada test cria prÃ³prios dados)"
  prevention: "Run tests em ordem aleatÃ³ria (detecta dependencies)"
  
- cause: "External dependencies (APIs de terceiros)"
  symptom: "Test falha quando API externa estÃ¡ down"
  fix:
    - "Mocking/stubbing (WireMock, Mockito)"
    - "Contract testing (Pact) â†’ valida contratos, nÃ£o implementaÃ§Ã£o"
  prevention: "Testes nÃ£o devem depender de serviÃ§os externos (exceto E2E em staging)"
  
- policy: "Flaky Test Budget"
  rule: "Max 2% flaky tests tolerados (98% success rate em CI)"
  action_if_exceeded: "Quarantine flaky tests (disable) atÃ© fixados"
  owner: "Carla identifica, Tiago fixa"
```

---

## ðŸ“Š Test Metrics & KPIs

### Testing Effectiveness Metrics
_MÃ©tricas que Carla monitora_

**Exemplo**:
```yaml
- metric: "Defect Detection Rate (DDR)"
  formula: "Bugs found in QA / Total bugs (QA + Production)"
  target: ">90%"
  current: "87%"
  interpretation: "87% dos bugs encontrados antes de produÃ§Ã£o (bom, mas pode melhorar)"
  action: "Increase exploratory testing, improve test coverage"
  
- metric: "Defect Removal Efficiency (DRE)"
  formula: "Bugs fixed / Bugs reported"
  target: ">95%"
  current: "92%"
  interpretation: "8% dos bugs reportados nÃ£o sÃ£o fixados (backlog creep)"
  action: "Bug triage rigoroso (fechar won't-fix explicitamente)"
  
- metric: "Mean Time to Detect (MTTD)"
  measurement: "Tempo mÃ©dio entre bug introduzido (commit) e detectado"
  target: "<24h"
  current: "36h"
  interpretation: "Bugs demoram 1.5 dias para serem detectados"
  action: "CI/CD mais frequente, automated tests em cada PR"
  
- metric: "Mean Time to Resolve (MTTR)"
  measurement: "Tempo mÃ©dio entre bug detectado e fixado"
  target: "<48h (para high/critical)"
  current: "40h"
  interpretation: "Dentro do target (good)"
  
- metric: "Test Execution Time"
  measurement: "Tempo total de test suite (CI/CD pipeline)"
  target: "<15min (para feedback rÃ¡pido)"
  current: "22min"
  interpretation: "Pipeline lento â†’ devs nÃ£o rodam testes localmente"
  action: "Otimizar testes lentos, paralelizaÃ§Ã£o"
```

---

## ðŸ› ï¸ Testing Tools & Technologies

### Tool Stack Preferences
_Ferramentas validadas_

**Exemplo**:
```yaml
- category: "Unit Testing"
  tool: "Jest (JavaScript), xUnit (C#), JUnit (Java)"
  rationale: "PadrÃ£o da indÃºstria, bem suportado"
  
- category: "E2E Testing"
  tool: "Playwright (preferido), Cypress (alternativo)"
  rationale:
    - "Playwright: multi-browser, auto-wait, trace viewer"
    - "Cypress: developer-friendly, time-travel debugging"
  decision: "Playwright para novos projetos (melhor tooling)"
  
- category: "API Testing"
  tool: "Postman (manual), RestAssured (automation), Pact (contract)"
  rationale: "Postman para exploratory, RestAssured para CI/CD, Pact para microservices"
  
- category: "Performance Testing"
  tool: "k6, JMeter, Azure Load Testing"
  rationale: "k6 para scripting (JS), JMeter para GUI, Azure Load Testing para cloud-scale"
  
- category: "Security Testing"
  tool: "OWASP ZAP, SonarQube, Snyk"
  rationale: "ZAP para DAST, SonarQube para SAST, Snyk para dependencies"
  
- category: "Accessibility Testing"
  tool: "axe DevTools, Pa11y, Lighthouse"
  rationale: "axe para CI/CD, Pa11y para automation, Lighthouse para audits"
  collaboration: "Sofia (UX) valida WCAG compliance"
```

---

## ðŸ”„ Continuous Testing in CI/CD

### CI/CD Pipeline Integration
_Como testes integram no pipeline_

**Exemplo**:
```yaml
- stage: "Build"
  tests: "Unit tests (Jest, xUnit)"
  duration: "3min"
  failure_action: "Block PR merge (red status)"
  
- stage: "Integration"
  tests: "Integration tests (Testcontainers)"
  duration: "8min"
  failure_action: "Block deployment to staging"
  
- stage: "Staging Deployment"
  tests: "Smoke tests (critical paths)"
  duration: "5min"
  failure_action: "Auto-rollback staging deployment"
  
- stage: "E2E Testing (Staging)"
  tests: "Playwright E2E suite"
  duration: "15min"
  failure_action: "Block promotion to production"
  
- stage: "Production Deployment"
  tests: "Canary deployment (5% traffic) + monitoring"
  duration: "30min observation"
  failure_action: "Auto-rollback if error rate > 0.5%"
  
- stage: "Post-Deployment"
  tests: "Smoke tests (production), synthetic monitoring"
  duration: "Continuous"
  failure_action: "Alert on-call (PagerDuty)"
```

---

## ðŸŽ¯ Exploratory Testing Insights

### Exploratory Testing Charters
_SessÃµes de teste exploratÃ³rio estruturadas_

**Exemplo**:
```yaml
- charter: "Explore payment flow for edge cases"
  duration: "60 minutos (timeboxed)"
  focus_areas:
    - "MÃºltiplos cartÃµes (adicionar, remover, trocar default)"
    - "Pagamentos falhados (cartÃ£o recusado, timeout)"
    - "Concurrency (2 pagamentos simultÃ¢neos)"
  bugs_found: 3
  findings:
    - "Bug: Timeout de pagamento nÃ£o mostra mensagem clara ao usuÃ¡rio"
    - "UX issue: Remover cartÃ£o nÃ£o pede confirmaÃ§Ã£o (risky)"
    - "Bug: Concurrent payments causam race condition"
  
- charter: "Explore mobile responsiveness (iOS Safari)"
  duration: "45 minutos"
  focus_areas:
    - "FormulÃ¡rios (keyboard overlap, input focus)"
    - "Navigation (gestures, back button)"
    - "Performance (scroll lag, animations)"
  bugs_found: 2
  findings:
    - "Bug: Keyboard sobrepÃµe botÃ£o Submit (nÃ£o scrollable)"
    - "Performance: Scroll lag em listas longas (>100 items)"
```

---

## ðŸ”— Cross-References

### Artifacts Relacionados:
- Clean Code Task: `${AVANADE_TASK_CLEAN_CODE}`
- Architecture Quality: `${AVANADE_TASK_ARCHITECTURE_QUALITY}`
- Debugging Guide: `${AVANADE_TASK_DEBUGGING_GUIDE}`
- UX Checklist: `${AVANADE_TASK_UX_CHECKLIST}`

### Agent Collaboration:
```yaml
supervisor: ${AVANADE_MEMORY_SUPERVISOR}
dev: ${AVANADE_MEMORY_DEV_TIAGO}
architect: ${AVANADE_MEMORY_ARCHITECT_WILSON}
ux: ${AVANADE_MEMORY_UX_SOFIA}
po: ${AVANADE_MEMORY_PO_PAULA}
```

---

## ðŸ“Œ Como Usar Esta MemÃ³ria

### âœ… ANTES de Sprint Planning:
1. Consultar **Test Automation Patterns** â†’ estratÃ©gia de testes para sprint
2. Revisar **Quality Gates** â†’ garantir compliance
3. Consultar **Bug Patterns** â†’ prevenÃ§Ã£o proativa

### âœ… DURANTE Sprint:
1. Aplicar **Test Coverage Strategies** â†’ adequada cobertura
2. Usar **Flaky Tests Management** â†’ estabilizar testes
3. Executar **Exploratory Testing Charters** â†’ descobrir edge cases

### âœ… ANTES de Release:
1. Validar **Quality Gates** â†’ todos passaram
2. Revisar **Test Metrics** â†’ quality indicators saudÃ¡veis
3. Executar **Exploratory Testing** â†’ validaÃ§Ã£o final

### âœ… APÃ“S Bugs em ProduÃ§Ã£o:
1. **Root Cause Analysis** â†’ documentar em Bug Patterns
2. **Atualizar memÃ³ria** â†’ prevention strategies
3. **Refinar Quality Gates** â†’ prevenir recorrÃªncia

---
