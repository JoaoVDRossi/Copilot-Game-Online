### Design Patterns Validados
_PadrÃµes arquiteturais que funcionaram bem_

**Exemplo**:
```yaml
- pattern: "CQRS + Event Sourcing"
  context: "Sistema de auditoria financeira (compliance heavy)"
  pros:
    - Auditoria completa (event store)
    - Read/Write optimization separada
    - Escalabilidade independente
  cons:
    - Complexidade aumentada
    - Eventual consistency
  recommendation: "Usar apenas se auditoria/compliance Ã© requisito crÃ­tico"
  projects: ["FinanceHub", "ComplianceTracker"]
  
- pattern: "API Gateway + Microservices"
  context: "E-commerce com mÃºltiplos canais (web, mobile, partners)"
  pros:
    - Escalabilidade granular
    - Tecnologias heterogÃªneas
    - Deployment independente
  cons:
    - Overhead operacional (monitoring, orchestration)
    - Distributed transactions complexas
  recommendation: "Adequado para teams >15 devs, mÃºltiplos produtos"
  projects: ["ShopOnline", "MarketplaceX"]
```

---

### ADRs (Architecture Decision Records)
_DecisÃµes arquiteturais documentadas_

**Exemplo**:
```yaml
- adr_id: "ADR-001"
  title: "Escolha de Azure SQL Database vs Cosmos DB"
  date: "2024-01-15"
  status: "Aceito"
  context: "Sistema de pedidos com 10k RPM esperados"
  decision: "Azure SQL Database (Elastic Pool)"
  rationale:
    - Dados relacionais estruturados
    - ACID transactions necessÃ¡rias (pedidos)
    - Time tem expertise em SQL
    - Custo 40% menor que Cosmos DB para workload esperado
  consequences:
    - Single-region deployment inicialmente
    - Escalabilidade vertical atÃ© 80k RPM (Elastic Pool)
    - Fallback: Sharding se ultrapassar 80k RPM
  alternatives_considered:
    - Cosmos DB: Rejected (overkill para workload, custo alto)
    - PostgreSQL: Rejected (preferÃªncia Azure-native)
  
- adr_id: "ADR-002"
  title: "AutenticaÃ§Ã£o via Azure AD B2C"
  date: "2024-02-01"
  status: "Aceito"
  context: "Portal cliente com 50k usuÃ¡rios externos"
  decision: "Azure AD B2C com social login (Google, Facebook)"
  rationale:
    - Managed service (menos manutenÃ§Ã£o)
    - MFA nativo
    - Compliance (LGPD/GDPR built-in)
    - Social login reduz friction (signup)
  consequences:
    - Vendor lock-in moderado (Azure)
    - Custo: R$ 0,015/MAU (Monthly Active User)
  alternatives_considered:
    - Auth0: Rejected (custo 3x maior)
    - Custom solution: Rejected (security risk, manutenÃ§Ã£o alta)
```

---

### Tech Stack Preferences & Trade-offs
_Tecnologias avaliadas e escolhas_

**Exemplo**:
```yaml
- category: "Backend Framework"
  preferred: ".NET 8 (C#)"
  rationale:
    - Performance excelente (benchmarks)
    - Azure-native (PaaS otimizado)
    - Time tem expertise
    - Long-term support (LTS)
  alternatives:
    - Node.js: Considerado para APIs simples (lightweight)
    - Python (FastAPI): Usado para ML/AI workloads
  
- category: "Frontend Framework"
  preferred: "React + TypeScript"
  rationale:
    - Ecossistema maduro
    - Fluent UI React components
    - TypeScript previne bugs
  alternatives:
    - Vue.js: Usado em projetos menores (learning curve menor)
    - Blazor: Evitado (ainda imaturo para SPAs complexos)
  
- category: "Database"
  preferred: "Azure SQL Database"
  rationale: "Relational data, ACID, managed service"
  alternatives:
    - Cosmos DB: Para scenarios de global distribution
    - PostgreSQL: Quando open-source Ã© mandatÃ³rio
```

---

### Performance Benchmarks
_Benchmarks de arquiteturas testadas_

**Exemplo**:
```yaml
- scenario: "API Gateway Comparison"
  date: "2024-01-10"
  load: "10k requests/sec"
  results:
    - Azure API Management: "Latency P95 = 45ms, throughput = 9.8k RPS"
    - Nginx: "Latency P95 = 12ms, throughput = 10.2k RPS"
    - Envoy: "Latency P95 = 18ms, throughput = 10k RPS"
  decision: "Azure APIM escolhido (features > raw performance)"
  notes: "Nginx mais rÃ¡pido mas falta policy management, analytics built-in"
  
- scenario: "Caching Strategy"
  date: "2024-02-05"
  options_tested:
    - In-memory (no cache): "Response time 250ms"
    - Redis cache: "Response time 15ms (94% improvement)"
    - CDN (Azure Front Door): "Response time 8ms (97% improvement)"
  decision: "Redis para API data, CDN para assets estÃ¡ticos"
```

---

### Anti-Patterns Evitados
_DecisÃµes ruins evitadas (learnings)_

**Exemplo**:
```yaml
- anti_pattern: "Microservices Prematurely"
  context: "Projeto pequeno (3 devs, 1 produto)"
  problem: "Overhead de orchestration > benefÃ­cios"
  lesson: "ComeÃ§ar monolito modular, extrair microservices quando necessÃ¡rio"
  threshold: "Considerar microservices com time >10 devs ou mÃºltiplos produtos"
  
- anti_pattern: "Over-engineering Security"
  context: "Internal tool, zero external access"
  problem: "Investido 3 sprints em security desnecessÃ¡ria"
  lesson: "Security proporcional ao risco (threat modeling first)"
  
- anti_pattern: "NoSQL para Relational Data"
  context: "Escolhido Cosmos DB para dados estruturados/relacionais"
  problem: "Queries complexas = application logic, custo alto"
  lesson: "NoSQL excelente para semi-structured, mas SQL ainda rei para relational"
```

---

### Cloud Patterns (Azure-Specific)
_PadrÃµes testados na Azure_

**Exemplo**:
```yaml
- pattern: "Strangler Fig (Legacy Migration)"
  context: "MigraÃ§Ã£o gradual on-prem â†’ Azure"
  implementation:
    - Azure API Management como facade
    - Rotear requests para novo sistema gradualmente (feature flags)
    - Monolito on-prem deprecado incrementalmente
  success_rate: "Alta"
  projects: ["LegacyMigrationX"]
  
- pattern: "Circuit Breaker"
  context: "Microservices com dependÃªncias externas"
  implementation:
    - Polly library (.NET)
    - Fallback para cache ou response padrÃ£o
  success_rate: "Alta"
  notes: "PrevenÃ§Ã£o de cascading failures"
```

---

### Scalability Insights
_Aprendizados sobre escalabilidade_

**Exemplo**:
```yaml
- insight: "Database Ã© sempre o gargalo"
  evidence: "80% dos projetos com performance issues â†’ queries nÃ£o otimizadas"
  solutions:
    - IndexaÃ§Ã£o adequada (composite indexes)
    - Read replicas para queries pesadas
    - Caching agressivo (Redis)
  
- insight: "Stateless Ã© chave para horizontal scaling"
  evidence: "Projetos com session in-memory falharam ao escalar"
  solutions:
    - Externalizar state (Redis, database)
    - JWT tokens (stateless auth)
```

---

## ðŸ”’ Security Decisions
_DecisÃµes de seguranÃ§a documentadas_

**Exemplo**:
```yaml
- decision: "Azure Key Vault para secrets"
  date: "2024-01-20"
  rationale: "Centralizar secrets, rotation automÃ¡tica, audit logs"
  cost: "R$ 0,15/secret/month (baixo)"
  alternative_rejected: "Env vars hardcoded (risk de leak)"
  
- decision: "Managed Identity para Azure services"
  date: "2024-02-10"
  rationale: "Zero secrets no cÃ³digo, auth automÃ¡tica entre services"
  example: "App Service â†’ SQL Database (managed identity, sem connection string)"
```

---

## ðŸ“Š Cost Optimization Learnings
_OtimizaÃ§Ãµes de custo aplicadas_

**Exemplo**:
```yaml
- optimization: "Reserved Instances (VMs)"
  savings: "65% (1-year commitment)"
  context: "Production workloads estÃ¡veis"
  
- optimization: "Auto-shutdown Dev/Test environments"
  savings: "R$ 8k/month"
  implementation: "Azure Automation runbook (shutdown 19h-7h + weekends)"
  
- optimization: "Blob Storage Lifecycle Management"
  savings: "40% storage costs"
  implementation: "Hot â†’ Cool (30 days) â†’ Archive (90 days)"
```

---

## ðŸ”— Cross-References
_Links para artefatos relacionados_

- Architecture Template: `${AVANADE_ARCHITECTURE_TEMPLATE}`
- Architecture Quality Task: `${AVANADE_TASK_ARCHITECTURE_QUALITY}`
- Adversarial Review: `${AVANADE_TASK_ADVERSARIAL_REVIEW}`
- ADR Template: `${AVANADE_ADR_TEMPLATE}`

---

## ðŸ“Œ Como Usar Esta MemÃ³ria

### âœ… ANTES de criar arquitetura:
1. Consultar **Design Patterns** â†’ reutilizar patterns validados
2. Revisar **ADRs** â†’ evitar decisÃµes ruins passadas
3. Checar **Tech Stack Preferences** â†’ escolhas consistentes
4. Analisar **Anti-Patterns** â†’ nÃ£o repetir erros

### âœ… DURANTE design:
1. Documentar **decisÃµes crÃ­ticas** como ADRs
2. Validar contra **Performance Benchmarks**
3. Aplicar **Cloud Patterns** adequados
4. Considerar **Cost Optimization** upfront

### âœ… APÃ“S implementaÃ§Ã£o:
1. **Atualizar memÃ³ria** com novos patterns/decisions
2. Documentar **Benchmarks** reais (vs estimados)
3. Registrar **Lessons Learned**
4. Atualizar **Tech Stack Preferences** se tecnologia nova validada

---
