---

## ðŸ“‹ Objetivo

Checklist mestre para Arquitetos de Software. Consolida todas as validaÃ§Ãµes, consideraÃ§Ãµes e melhores prÃ¡ticas para garantir decisÃµes arquiteturais sÃ³lidas e bem documentadas.

---

## ðŸ” Checklist de Arquitetura

### 1. Requirements Clarity

- [ ] **Requisitos funcionais compreendidos?**
  - User stories analisadas
  - Acceptance criteria claros
  - Edge cases identificados

- [ ] **Requisitos nÃ£o-funcionais definidos?**
  - Performance (latency, throughput)
  - Scalability (users, data volume)
  - Availability (uptime target)
  - Security (auth, data protection)

- [ ] **Constraints identificados?**
  - Budget limitations
  - Timeline constraints
  - Technology mandates
  - Regulatory requirements

---

### 2. System Design

- [ ] **Context diagram criado?** (C4 Level 1)
  - System boundaries clear
  - External actors identified
  - Integration points mapped

- [ ] **Container diagram criado?** (C4 Level 2)
  - Major containers defined
  - Responsibilities clear
  - Communication patterns documented

- [ ] **Component diagrams para containers crÃ­ticos?** (C4 Level 3)
  - Key components identified
  - Interfaces defined
  - Dependencies mapped

- [ ] **Data model definido?**
  - Entities identified
  - Relationships documented
  - Data ownership clear

---

### 3. Technology Selection

- [ ] **Tech stack justificado?**
  - Aligns with team skills
  - Fits problem domain
  - License compatible
  - Long-term viability

- [ ] **Alternatives considered?**
  - At least 2 alternatives evaluated
  - Pros/cons documented
  - Decision rationale clear

- [ ] **ADRs criados para decisÃµes importantes?**
  - Template: ${AVANADE_ADR_TEMPLATE}
  - Context documented
  - Consequences understood

- [ ] **Proof of Concept para riscos tÃ©cnicos?**
  - Unknown technologies validated
  - Integration feasibility confirmed
  - Performance assumptions tested

---

### 4. Security Architecture

- [ ] **Authentication strategy defined?**
  - Auth mechanism chosen (OAuth2, JWT, etc.)
  - Identity provider identified
  - Token management planned

- [ ] **Authorization model clear?**
  - RBAC/ABAC defined
  - Permission granularity appropriate
  - Least privilege principle applied

- [ ] **Data protection planned?**
  - Encryption at rest
  - Encryption in transit (TLS)
  - Sensitive data identified (PII, secrets)

- [ ] **Security controls documented?**
  - Input validation strategy
  - Output encoding
  - OWASP Top 10 addressed

---

### 5. Scalability & Performance

- [ ] **Load projections defined?**
  - Expected users
  - Request volume
  - Data growth rate

- [ ] **Scaling strategy determined?**
  - Horizontal vs vertical
  - Auto-scaling rules
  - Bottleneck analysis

- [ ] **Caching strategy defined?**
  - What to cache
  - Cache invalidation
  - Cache technology

- [ ] **Performance targets set?**
  - Response time SLAs
  - Throughput requirements
  - Latency budgets

---

### 6. Reliability & Resilience

- [ ] **Availability target defined?**
  - SLA percentage (99.9%, etc.)
  - Maintenance windows
  - Degradation acceptable

- [ ] **Failure modes identified?**
  - Single points of failure
  - Cascade failure risks
  - Recovery procedures

- [ ] **Resilience patterns applied?**
  - Circuit breakers
  - Retries with backoff
  - Fallback behaviors
  - Bulkheads

- [ ] **Disaster recovery planned?**
  - RTO defined
  - RPO defined
  - Backup strategy
  - Recovery testing

---

### 7. Integration Architecture

- [ ] **APIs bem definidas?**
  - Contract-first design
  - Versioning strategy
  - Error handling standards

- [ ] **Event-driven patterns se aplicÃ¡vel?**
  - Event schema defined
  - Eventual consistency handled
  - Ordering guarantees clear

- [ ] **Third-party integrations mapped?**
  - Contracts documented
  - SLAs understood
  - Fallback for failures

---

### 8. Observability

- [ ] **Logging strategy defined?**
  - Log levels appropriate
  - Structured logging
  - Correlation IDs
  - Retention policy

- [ ] **Monitoring configured?**
  - Key metrics identified
  - Dashboards designed
  - Health checks implemented

- [ ] **Alerting rules defined?**
  - Critical alerts identified
  - Escalation paths
  - On-call procedures

- [ ] **Distributed tracing se aplicÃ¡vel?**
  - Tracing technology chosen
  - Span propagation
  - Sampling strategy

---

### 9. DevOps & Deployment

- [ ] **CI/CD pipeline designed?**
  - Build automation
  - Test automation
  - Deployment automation

- [ ] **Environment strategy defined?**
  - Dev/Staging/Prod
  - Configuration management
  - Secrets management

- [ ] **Infrastructure as Code?**
  - IaC tool chosen
  - Modules organized
  - State management

- [ ] **Deployment strategy chosen?**
  - Blue/Green vs Canary vs Rolling
  - Rollback procedure
  - Feature flags

---

### 10. Documentation

- [ ] **Architecture document completo?**
  - Template: ${AVANADE_ARCHITECTURE_TEMPLATE}
  - All sections filled
  - Diagrams up to date

- [ ] **ADRs documentados?**
  - All significant decisions
  - Status current
  - Superseded marked

- [ ] **Runbooks criados?**
  - Operational procedures
  - Troubleshooting guides
  - Emergency procedures

---

## ðŸ“Š Architecture Review Checklist

| Aspecto | Score (1-5) | Notas |
|---------|-------------|-------|
| Requirements Coverage | | |
| Design Quality | | |
| Security | | |
| Scalability | | |
| Reliability | | |
| Observability | | |
| Documentation | | |
| **Average** | | |

**Threshold para aprovaÃ§Ã£o**: â‰¥ 4.0

---

## ðŸŽ¯ Architecture Decision Record (ADR) Quick Template

```markdown
# ADR-XXX: [TÃ­tulo]

## Status
[Proposed | Accepted | Deprecated | Superseded]

## Context
[Contexto que motivou a decisÃ£o]

## Decision
[A decisÃ£o tomada]

## Consequences
[ConsequÃªncias positivas e negativas]
```

**Full template**: ${AVANADE_ADR_TEMPLATE}

---

## ðŸ“… CadÃªncia de Atividades

### Por Sprint
- [ ] Review de decisÃµes arquiteturais
- [ ] AtualizaÃ§Ã£o de ADRs se necessÃ¡rio
- [ ] Tech debt assessment

### Por Release
- [ ] Architecture review formal
- [ ] Documentation update
- [ ] Capacity planning review

### Trimestral
- [ ] Technology radar review
- [ ] Security assessment
- [ ] Performance baseline update

---

## ðŸ”— Relacionamentos

- **Templates**:
  - ${AVANADE_ARCHITECTURE_TEMPLATE}
  - ${AVANADE_ADR_TEMPLATE}
- **Quality Tasks**:
  - ${AVANADE_TASK_ARCHITECTURE_QUALITY}
  - ${AVANADE_TASK_ADVERSARIAL_REVIEW}
- **Memory**: ${AVANADE_MEMORY_ARCHITECT_WILSON}
- **Workflow**: ${AVANADE_WORKFLOW_GUIDE_CREATE_ARCHITECTURE}
