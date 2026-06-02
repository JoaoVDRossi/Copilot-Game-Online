## Objetivo

Validar arquitetura de solução contra padrões Avanade e best practices de Cloud/Azure.

---

## ✅ Quality Attributes (Avanade Standard)

### 1. Scalability (Escalabilidade)

**Critério**: Sistema suporta crescimento sem redesign

**Checklist**:

- [ ] **Horizontal scaling** possível (adicionar instâncias)
- [ ] **Stateless services** (ou state externalizado)
- [ ] **Auto-scaling** configurado (Azure VMSS, AKS HPA)
- [ ] **Load balancer** distribuindo tráfego
- [ ] **Database sharding** planejado (se necessário)
- [ ] **CDN** para assets estáticos
- [ ] **Capacity planning** documentado (projeções 12 meses)

**Red Flags**:

- ❌ Single instance sem redundância
- ❌ Session state in-memory
- ❌ Hardcoded IPs/endpoints

---

### 2. Security (Segurança)

**Critério**: Defense in depth, Zero Trust, compliance

**Checklist**:

- [ ] **Authentication**: Azure AD, OAuth2/OIDC
- [ ] **Authorization**: RBAC, claims-based
- [ ] **Encryption in transit**: HTTPS/TLS 1.2+
- [ ] **Encryption at rest**: Azure Storage, SQL TDE
- [ ] **Secrets management**: Azure Key Vault (não hardcoded)
- [ ] **Network segmentation**: VNets, NSGs, private endpoints
- [ ] **API Gateway**: Rate limiting, throttling, IP whitelist
- [ ] **Logging**: Audit logs, SIEM integration
- [ ] **Compliance**: LGPD, GDPR, ISO 27001 se aplicável

**Red Flags**:

- ❌ Senhas/chaves em código-fonte
- ❌ HTTP (sem TLS)
- ❌ Public IPs desnecessários
- ❌ Admin access sem MFA

---

### 3. Performance (Desempenho)

**Critério**: Atende SLAs, experiência de usuário fluida

**Checklist**:

- [ ] **Response time**: API < 200ms (P95), UI < 3s (first contentful paint)
- [ ] **Throughput**: Requisições/segundo suportadas
- [ ] **Caching**: Redis, Azure Cache, CDN
- [ ] **Database indexing**: Queries otimizadas
- [ ] **Async processing**: Filas (Azure Service Bus, Storage Queue)
- [ ] **Connection pooling**: Database, APIs externas
- [ ] **APM**: Application Insights, telemetria
- [ ] **Load testing**: Resultados documentados (JMeter, k6)

**Red Flags**:

- ❌ N+1 queries
- ❌ Sem caching em queries repetitivas
- ❌ Processamento síncrono de tarefas longas

---

### 4. Maintainability (Manutenibilidade)

**Critério**: Código fácil de entender, modificar, testar

**Checklist**:

- [ ] **Separation of concerns**: Camadas lógicas (UI, BLL, DAL)
- [ ] **SOLID principles**: Classes coesas, baixo acoplamento
- [ ] **Design patterns**: Factory, Repository, Strategy documentados
- [ ] **Clean code**: Nomes descritivos, funções <50 linhas
- [ ] **Tests**: Unit (>80%), Integration, E2E
- [ ] **CI/CD**: Pipeline automatizado
- [ ] **Documentation**: README, ADRs, API specs (OpenAPI)
- [ ] **Monitoring**: Dashboards, alertas

**Red Flags**:

- ❌ God classes (>1000 linhas)
- ❌ Copy-paste code
- ❌ Sem testes

---

### 5. Observability (Observabilidade)

**Critério**: Visibilidade total de comportamento em produção

**Checklist**:

- [ ] **Logging**: Structured logs (JSON), níveis (Error, Warning, Info)
- [ ] **Tracing**: Distributed tracing (Azure Application Insights)
- [ ] **Metrics**: Custom metrics (counters, gauges, histograms)
- [ ] **Dashboards**: KPIs visíveis (Grafana, Azure Portal)
- [ ] **Alerts**: PagerDuty, Azure Monitor alerts
- [ ] **Health checks**: /health endpoint (liveness, readiness)
- [ ] **Log aggregation**: Log Analytics, ELK stack

**Red Flags**:

- ❌ Console.WriteLine em produção
- ❌ Sem correlation IDs
- ❌ Logs não estruturados

---

### 6. Cost Optimization (Otimização de Custo)

**Critério**: Arquitetura financeiramente sustentável

**Checklist**:

- [ ] **Right-sizing**: VMs/Containers dimensionados adequadamente
- [ ] **Reserved instances**: Azure Reservations (savings 30-70%)
- [ ] **Auto-shutdown**: Dev/Test environments fora horário
- [ ] **Storage tiering**: Hot/Cool/Archive adequados
- [ ] **Serverless**: Azure Functions onde aplicável (vs VMs)
- [ ] **Cost monitoring**: Azure Cost Management + Budgets
- [ ] **Data transfer**: Minimizar egress (CDN, peering)

**Red Flags**:

- ❌ Overprovisioned resources
- ❌ Dev/Test rodando 24/7
- ❌ Sem tagging para chargeback

---

## 🏗️ Azure-Specific Best Practices

### Compute

- [ ] Use **App Service** para web apps (PaaS > IaaS)
- [ ] Use **AKS** para microservices containerizados
- [ ] Use **Azure Functions** para event-driven workloads
- [ ] Evite VMs se PaaS/Serverless resolve

### Data

- [ ] **Azure SQL**: Managed instance ou Elastic Pool
- [ ] **Cosmos DB**: Para global distribution, multi-region
- [ ] **Blob Storage**: Para arquivos/logs
- [ ] **Azure Cache for Redis**: Para session/cache

### Integration

- [ ] **API Management**: Gateway centralizado
- [ ] **Service Bus**: Messaging assíncrono
- [ ] **Event Grid**: Event-driven architecture
- [ ] **Logic Apps**: Low-code integrations

### DevOps

- [ ] **Azure DevOps** ou **GitHub Actions**: CI/CD
- [ ] **Infrastructure as Code**: Bicep ou Terraform
- [ ] **Blue-Green deployment**: Zero downtime
- [ ] **Feature flags**: LaunchDarkly, Azure App Config

---

## 🎯 Scoring System

**Pontuação por categoria** (0-5):

- 5 = Excelente (best practices aplicadas)
- 4 = Bom (atende requisitos)
- 3 = Adequado (gaps menores)
- 2 = Precisa melhorias (gaps significativos)
- 1 = Inadequado (riscos altos)
- 0 = Não implementado

**Score Final**:

- **28-30**: ✅ Arquitetura Production-Ready
- **22-27**: 🟡 Bom, ajustes menores
- **15-21**: 🟠 Precisa revisão significativa
- **0-14**: 🔴 Não recomendado para produção

---

## 📋 Outputs Esperados

Após validação arquitetural, gerar:

1. **Architecture Review Report** (score + findings)
2. **Improvement Backlog** (priorizados por risco)
3. **ADR** para decisões críticas (se necessário)
4. **Cost Estimate** (Azure Pricing Calculator)
5. **Deployment Plan** (fases, rollback strategy)

---

## 🔗 Integração com Metodologia Avanade

- **Pré-requisito**: Arquitetura documentada
- **Validação adversarial**: ${AVANADE_TASK_ADVERSARIAL_REVIEW}
- **Memória**: Atualizar ${AVANADE_MEMORY_ARCHITECT_WILSON}
