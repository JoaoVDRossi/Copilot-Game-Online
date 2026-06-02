### Code Quality Patterns
_PadrÃµes de cÃ³digo que funcionam bem_

**Exemplo**:
```yaml
- pattern: "SOLID Principles"
  S_single_responsibility:
    example: "UserService â†’ UserAuthService + UserProfileService (separados)"
    benefit: "Classes focadas, fÃ¡ceis de testar"
  O_open_closed:
    example: "Strategy pattern para payment methods (extensÃ­vel sem modificar existente)"
    benefit: "Adicionar PayPal sem modificar CreditCardPayment"
  L_liskov_substitution:
    example: "Bird â†’ FlyingBird, Penguin (Penguin nÃ£o herda fly())"
    benefit: "Hierarquias corretas, sem mÃ©todos vazios"
  I_interface_segregation:
    example: "IReadable, IWritable separados (nÃ£o IRepository gigante)"
    benefit: "Clients dependem apenas do que usam"
  D_dependency_inversion:
    example: "Controller â†’ IUserService (interface), nÃ£o UserService (concreto)"
    benefit: "Testability (mock IUserService), loose coupling"
  
- pattern: "DRY (Don't Repeat Yourself)"
  anti_pattern: "Copy-paste code (duplicaÃ§Ã£o)"
  refactoring: "Extract method, extract class, inheritance/composition"
  caveat: "NÃ£o over-DRY (abstraÃ§Ãµes prematuras â†’ complexidade)"
  rule_of_thumb: "3 duplicaÃ§Ãµes â†’ refactor (rule of three)"
  
- pattern: "YAGNI (You Aren't Gonna Need It)"
  principle: "NÃ£o implementar features 'por acaso' (apenas quando needed)"
  example: "NÃ£o criar abstraÃ§Ã£o genÃ©rica antes de ter 2+ casos de uso"
  benefit: "CÃ³digo mais simples, menos over-engineering"
  balance: "YAGNI para features, mas plan for extensibility (SOLID-O)"
```

---

### Design Patterns Aplicados
_PadrÃµes GoF e outros_

**Exemplo**:
```yaml
- pattern: "Repository Pattern"
  use_case: "Data access layer (abstraÃ§Ã£o de DB)"
  implementation:
    interface: "IUserRepository { GetById(), Save(), Delete() }"
    concrete: "SqlUserRepository, MongoUserRepository"
  benefit: "Troca de DB transparente, testability (mock repository)"
  projects_used: 15
  
- pattern: "Factory Pattern"
  use_case: "CriaÃ§Ã£o de objetos complexos (payment processors)"
  implementation: "PaymentFactory.Create('creditcard') â†’ CreditCardProcessor"
  benefit: "Centraliza lÃ³gica de criaÃ§Ã£o, extensÃ­vel (adicionar novos tipos)"
  projects_used: 8
  
- pattern: "Observer Pattern (Event-driven)"
  use_case: "NotificaÃ§Ãµes (order placed â†’ send email, update inventory)"
  implementation:
    - "Event: OrderPlacedEvent"
    - "Handlers: EmailNotificationHandler, InventoryUpdateHandler"
  benefit: "Decoupling (order service nÃ£o conhece email/inventory)"
  projects_used: 12
  
- pattern: "Strategy Pattern"
  use_case: "Algoritmos intercambiÃ¡veis (sorting, pricing)"
  implementation:
    - "ISortStrategy { Sort(List<T>) }"
    - "Concrete: BubbleSort, QuickSort, MergeSort"
  benefit: "Swap algorithms runtime, testability"
  projects_used: 6
  
- pattern: "Decorator Pattern"
  use_case: "Add responsibilities dynamically (logging, caching)"
  implementation: "CachedRepository wraps UserRepository"
  benefit: "Composable behaviors, SRP (cada decorator 1 responsabilidade)"
  projects_used: 10
```

---

### Refactoring Techniques Validadas
_TÃ©cnicas de refactoring eficazes_

**Exemplo**:
```yaml
- technique: "Extract Method"
  before: "MÃ©todo de 100 linhas (faz muitas coisas)"
  after: "5 mÃ©todos de 20 linhas cada (nomes descritivos)"
  benefit: "Readability +80%, testability (unit test por mÃ©todo)"
  ide_support: "Visual Studio, VS Code (Extract Method refactoring)"
  
- technique: "Replace Conditional with Polymorphism"
  before: |
    if (type == "credit") { ... }
    else if (type == "debit") { ... }
    else if (type == "paypal") { ... }
  after: |
    IPaymentProcessor processor = PaymentFactory.Create(type);
    processor.Process();
  benefit: "ExtensÃ­vel (adicionar tipo sem modificar if/else), SOLID-O"
  
- technique: "Introduce Parameter Object"
  before: "CreateUser(string name, string email, int age, string address, ...)" # 8 params
  after: "CreateUser(UserDto userDto)" # 1 objeto
  benefit: "Readability, evita parameter explosion"
  
- technique: "Replace Magic Numbers with Constants"
  before: "if (status == 3) { ... }"
  after: "if (status == OrderStatus.Shipped) { ... }"
  benefit: "Self-documenting code, typo-safe (enum)"
```

---

### Performance Optimization Patterns
_OtimizaÃ§Ãµes validadas_

**Exemplo**:
```yaml
- optimization: "Caching (Redis)"
  scenario: "User profile lido 1000x/min, muda 1x/dia"
  implementation:
    - "Cache.Get('user:123') â†’ hit 99%, miss 1%"
    - "TTL: 24h (expira e re-fetch de DB)"
  impact: "DB load -99%, API response time 200ms â†’ 15ms"
  caveat: "Cache invalidation complexo (clear on update)"
  
- optimization: "Database Indexing"
  scenario: "Query lenta: SELECT * FROM Orders WHERE UserId = X"
  implementation: "CREATE INDEX idx_orders_userid ON Orders(UserId)"
  impact: "Query time 2s â†’ 50ms (40x faster)"
  caveat: "Ãndices custam espaÃ§o e lentidÃ£o em writes (tradeoff)"
  
- optimization: "Async/Await (non-blocking I/O)"
  scenario: "API call externa bloqueia thread (sÃ­ncrono)"
  implementation: "await httpClient.GetAsync(url) # non-blocking"
  impact: "Throughput +300% (threads liberadas para outros requests)"
  caveat: "NÃ£o usar async para CPU-bound (apenas I/O-bound)"
  
- optimization: "Lazy Loading (defer work atÃ© necessÃ¡rio)"
  scenario: "Carregar relacionamentos de entidade apenas se usado"
  implementation: "User.Orders (lazy) â†’ load apenas se .Orders acessado"
  impact: "Initial load time -60%"
  caveat: "N+1 query problem (cuidado em loops)"
  
- optimization: "Pagination (limit data transfer)"
  scenario: "Endpoint retorna 10k records â†’ slow, high bandwidth"
  implementation: "GET /users?page=1&pageSize=50"
  impact: "Response time 5s â†’ 200ms, bandwidth -99%"
```

---

## ðŸ› Debugging Strategies

### Debugging Techniques Eficazes
_Abordagens sistemÃ¡ticas de debugging_

**Exemplo**:
```yaml
- technique: "Binary Search Debugging (git bisect)"
  scenario: "Bug introduzido em algum commit dos Ãºltimos 50"
  process:
    1. "git bisect start"
    2. "git bisect bad (current commit com bug)"
    3. "git bisect good (commit antigo sem bug)"
    4. "Test commit do meio â†’ mark good/bad"
    5. "Repeat atÃ© encontrar commit culpado"
  benefit: "Find bug-introducing commit em log(N) steps (nÃ£o N)"
  
- technique: "Rubber Duck Debugging"
  process: "Explicar cÃ³digo/problema em voz alta (ou para pato de borracha)"
  benefit: "70% das vezes, soluÃ§Ã£o aparece ao explicar (forÃ§a raciocÃ­nio estruturado)"
  effectiveness: "Alta (baixo custo, alta taxa de sucesso)"
  
- technique: "Breakpoint + Watch Variables"
  tool: "Visual Studio Debugger, Chrome DevTools"
  process:
    1. "Set breakpoint na linha suspeita"
    2. "Run em debug mode"
    3. "Watch variables (inspecionar estado)"
    4. "Step over/into para seguir fluxo"
  benefit: "Visualizar estado runtime (nÃ£o apenas logs)"
  
- technique: "Logging EstratÃ©gico"
  anti_pattern: "Console.WriteLine() em todo lugar"
  pattern: "Structured logging (Serilog, log levels)"
  example: |
    _logger.LogInformation("User {UserId} logged in", userId);
    _logger.LogWarning("API timeout after {Elapsed}ms", elapsed);
  benefit: "Logs agregÃ¡veis (Application Insights), filtrÃ¡veis por level"
  
- technique: "Divide and Conquer (isolar problema)"
  process:
    1. "Reproduzir bug minimalmente (smallest failing test case)"
    2. "Comment out metade do cÃ³digo â†’ still fails?"
    3. "Narrow down atÃ© isolar linha problemÃ¡tica"
  benefit: "Reduz search space exponencialmente"
```

---

### Common Error Patterns & Fixes
_Erros recorrentes e soluÃ§Ãµes_

**Exemplo**:
```yaml
- error: "NullReferenceException (C#) / TypeError (JS)"
  root_cause: "VariÃ¡vel null/undefined nÃ£o validada"
  fix:
    - "Guard clause: if (user == null) throw ArgumentNullException"
    - "Null-conditional operator: user?.Name (retorna null se user null)"
    - "Nullable reference types (C# 8+): string? (explicit nullable)"
  prevention: "Static analysis (Roslyn analyzers), code review"
  
- error: "Memory Leak (aplicaÃ§Ã£o consume RAM crescentemente)"
  root_cause: "Event handlers nÃ£o desregistrados, referÃªncias circulares"
  fix:
    - "Dispose pattern (IDisposable, using statements)"
    - "Weak references para event listeners (se aplicÃ¡vel)"
    - "Memory profiler (dotMemory, Chrome DevTools) â†’ identify leak"
  prevention: "Code review (check Dispose calls), automated memory tests"
  
- error: "Deadlock (threads bloqueadas mutuamente)"
  root_cause: "Lock ordering inconsistente (Thread A: lock(A) then lock(B), Thread B: lock(B) then lock(A))"
  fix:
    - "Lock ordering global (sempre lock A antes B)"
    - "Evitar locks aninhados (refactor)"
    - "Timeout em locks (Monitor.TryEnter(lock, timeout))"
  detection: "Thread dump analysis (deadlock detector)"
  
- error: "SQL N+1 Problem (performance)"
  root_cause: "Lazy loading em loop (1 query inicial + N queries para relations)"
  fix:
    - "Eager loading: Include(u => u.Orders) em LINQ"
    - "Batch loading (DataLoader pattern em GraphQL)"
  detection: "DB profiler (Entity Framework query logging)"
```

---

## ðŸ—ï¸ Architecture & Tech Stack Decisions

### Tech Stack Preferences
_Tecnologias validadas em projetos_

**Exemplo**:
```yaml
- category: "Backend Framework"
  preferred: ".NET 8 (C# ASP.NET Core)"
  rationale:
    - "Performance (benchmarks top 3)"
    - "Async/await nativo (I/O efficiency)"
    - "Azure-native (PaaS otimizado)"
    - "Type safety (C# vs JavaScript)"
  alternatives:
    - "Node.js (Express): Usado para APIs simples (CRUD lightweight)"
    - "Python (FastAPI): Usado para ML/data science workloads"
  
- category: "Frontend Framework"
  preferred: "React + TypeScript"
  rationale:
    - "Component-based (reusability)"
    - "TypeScript previne 60% dos bugs (type safety)"
    - "Ecossistema maduro (libraries, tooling)"
  alternatives:
    - "Vue.js: Considerado para projetos menores (learning curve menor)"
  
- category: "ORM (Object-Relational Mapping)"
  preferred: "Entity Framework Core"
  rationale:
    - "LINQ (type-safe queries)"
    - "Migrations (schema versioning)"
    - "Performance adequada (lazy/eager loading control)"
  alternatives:
    - "Dapper: Usado para performance crÃ­tica (micro-ORM, mais controle)"
  
- category: "Testing"
  preferred: "xUnit (unit), Playwright (E2E)"
  rationale: "PadrÃ£o .NET (xUnit), Playwright multi-browser + auto-wait"
  
- category: "API Design"
  preferred: "REST (OpenAPI/Swagger)"
  rationale: "Simplicidade, tooling (Swagger UI, codegen)"
  alternatives:
    - "GraphQL: Usado quando clients precisam flexibilidade (mobile + web diferentes needs)"
```

---

### Code Review Checklist
_Itens que Tiago valida em PRs_

**Exemplo**:
```yaml
- category: "Functional Correctness"
  checks:
    - "Feature funciona conforme acceptance criteria"
    - "Edge cases cobertos (nulls, empty lists, etc)"
    - "Error handling adequado (try/catch, user-friendly messages)"
  
- category: "Code Quality"
  checks:
    - "SOLID principles respeitados"
    - "Nomes descritivos (sem variÃ¡veis x, y, temp)"
    - "MÃ©todos < 20 linhas (exceto casos justificados)"
    - "DRY (sem duplicaÃ§Ã£o excessiva)"
  
- category: "Testing"
  checks:
    - "Unit tests escritos (coverage >80%)"
    - "Tests passando (CI green)"
    - "Integration tests se aplicÃ¡vel (API endpoints)"
  
- category: "Performance"
  checks:
    - "Queries otimizadas (sem N+1)"
    - "Caching considerado (se aplicÃ¡vel)"
    - "Async/await para I/O-bound operations"
  
- category: "Security"
  checks:
    - "Input validation (nÃ£o confiar em user input)"
    - "SQL injection prevented (parameterized queries)"
    - "Secrets nÃ£o hardcoded (use environment variables)"
    - "Authentication/authorization corretos"
  
- category: "Documentation"
  checks:
    - "XML comments para public APIs (C#)"
    - "README updated (se mudanÃ§as em setup)"
    - "ADR criado (se decisÃ£o arquitetural - Wilson)"
```

---

## ðŸ”„ CI/CD & DevOps Practices

### CI/CD Pipeline Configuration
_Setup de pipelines que funciona_

**Exemplo**:
```yaml
- pipeline_stage: "Build"
  tasks:
    - "Restore dependencies (NuGet, npm)"
    - "Compile code (dotnet build)"
    - "Run linters (ESLint, StyleCop)"
  duration: "2-3 minutos"
  failure_action: "Block PR merge"
  
- pipeline_stage: "Test"
  tasks:
    - "Run unit tests (dotnet test)"
    - "Generate coverage report (Coverlet)"
    - "Upload to SonarQube (quality gate)"
  duration: "5-8 minutos"
  failure_action: "Block PR merge (coverage < 80% OR quality gate failed)"
  
- pipeline_stage: "Publish Artifacts"
  tasks:
    - "Build Docker image"
    - "Push to Azure Container Registry"
    - "Tag with git commit SHA"
  duration: "3-5 minutos"
  
- pipeline_stage: "Deploy to Staging"
  tasks:
    - "Deploy container to Azure App Service (Staging slot)"
    - "Run smoke tests"
    - "Run integration tests"
  duration: "10-15 minutos"
  failure_action: "Rollback deployment"
  
- pipeline_stage: "Deploy to Production"
  trigger: "Manual approval (Paula PO + JoÃ£o PM)"
  tasks:
    - "Blue/green deployment (zero-downtime)"
    - "Swap slots (Staging â†’ Production)"
    - "Monitor for 30min (error rate, latency)"
  failure_action: "Auto-rollback if errors > 0.5%"
```

---

### Infrastructure as Code (IaC)
_Gerenciamento de infra_

**Exemplo**:
```yaml
- tool: "Terraform (Azure provider)"
  use_case: "Provisionar Azure resources (App Service, SQL Database, Redis)"
  benefits:
    - "Versionado (git) â†’ auditÃ¡vel"
    - "ReproduzÃ­vel (mesma infra em dev/staging/prod)"
    - "Declarativo (define estado desejado, nÃ£o steps)"
  example:
    resource: "azurerm_app_service"
    config: |
      resource "azurerm_app_service" "app" {
        name = "my-app-${var.environment}"
        location = "East US"
        resource_group_name = azurerm_resource_group.rg.name
        app_service_plan_id = azurerm_app_service_plan.plan.id
      }
  
- practice: "Environment Parity (dev/staging/prod similares)"
  implementation: "Terraform workspaces (dev, staging, prod)"
  benefit: "Bugs de infra detectados early (nÃ£o apenas em prod)"
  caveat: "Custo (3 ambientes), mas ROI positivo (menos outages)"
```

---

## ðŸ§  Learning & Skill Development

### Technologies to Learn (Roadmap)
_Skills prioritizadas_

**Exemplo**:
```yaml
- skill: "Kubernetes (container orchestration)"
  priority: "Alta"
  rationale: "Projetos grandes migrando para K8s (escalabilidade)"
  learning_path: "Kubernetes in Action (livro) + hands-on (AKS)"
  timeline: "Q1 2024"
  
- skill: "Domain-Driven Design (DDD)"
  priority: "MÃ©dia-Alta"
  rationale: "Projetos complexos (bounded contexts, ubiquitous language)"
  learning_path: "DDD Eric Evans (livro) + workshop Wilson (Architect)"
  timeline: "Q2 2024"
  
- skill: "Rust (systems programming)"
  priority: "Baixa-MÃ©dia"
  rationale: "Performance crÃ­tica (nÃ£o mainstream ainda em Avanade)"
  learning_path: "The Rust Book + side project"
  timeline: "Q3-Q4 2024 (se tempo)"
```

---

## ðŸ”— Cross-References

### Artifacts Relacionados:
- Clean Code Task: `${AVANADE_TASK_CLEAN_CODE}`
- Debugging Guide: `${AVANADE_TASK_DEBUGGING_GUIDE}`
- Architecture Quality: `${AVANADE_TASK_ARCHITECTURE_QUALITY}`
- Story Template: `${AVANADE_STORY_TEMPLATE_YAML}`

### Agent Collaboration:
```yaml
supervisor: ${AVANADE_MEMORY_SUPERVISOR}
architect: ${AVANADE_MEMORY_ARCHITECT_WILSON}
qa: ${AVANADE_MEMORY_QA_CARLA}
sm: ${AVANADE_MEMORY_SM_ROBERTO}
po: ${AVANADE_MEMORY_PO_PAULA}
```

---

## ðŸ“Œ Como Usar Esta MemÃ³ria

### âœ… ANTES de implementar feature:
1. Consultar **Design Patterns** â†’ escolher pattern adequado
2. Revisar **Tech Stack Preferences** â†’ tecnologias validadas
3. Consultar **Code Quality Patterns** â†’ SOLID, DRY, YAGNI

### âœ… DURANTE desenvolvimento:
1. Aplicar **Refactoring Techniques** â†’ melhorar cÃ³digo continuamente
2. Considerar **Performance Optimization** â†’ se aplicÃ¡vel
3. Seguir **Code Review Checklist** â†’ auto-review antes de PR

### âœ… QUANDO debugar:
1. Usar **Debugging Techniques** â†’ abordagem sistemÃ¡tica
2. Consultar **Common Error Patterns** â†’ soluÃ§Ãµes conhecidas
3. Documentar novos bugs â†’ atualizar memÃ³ria

### âœ… APÃ“S code review:
1. **Atualizar memÃ³ria** com novos patterns aprendidos
2. Documentar **Lessons Learned** â†’ erros evitados
3. Compartilhar conhecimento â†’ pair programming, tech talks

---
