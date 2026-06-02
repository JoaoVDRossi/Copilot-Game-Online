## ðŸ“‹ O que Ã© este Workflow?

O **create-architecture** Ã© um workflow Avanade Method v6 conversacional que substitui templates por **facilitaÃ§Ã£o inteligente**. Produz decisÃµes arquiteturais focadas em **prevenir conflitos entre agentes AI** durante implementaÃ§Ã£o.

**Filosofia**: Architecture-as-Conversation, nÃ£o Architecture-as-Template

**Workflow Path**: `_avanade-method/bmm/workflows/3-solutioning/create-architecture/workflow.md`

---

## ðŸŽ¯ Quando Usar

### âœ… USE create-architecture para:
- **ApÃ³s PRD validado**: Architecture traduz WHAT (PRD) em HOW (technical decisions)
- **Complex systems**: Microservices, distributed systems, integrations
- **Technology choices**: Database, framework, cloud provider decisions
- **Agent-driven projects**: Decisions must be explicit (AI agents need clarity)

### âŒ NÃƒO USE para:
- **Before PRD**: Can't architect without requirements
- **Simple scripts**: Overkill para utilities, one-off tasks (use `quick-dev`)
- **Pure UI design**: Use `create-ux-design` workflow

---

## ðŸ”„ WORKFLOW STEPS (8 total)

```yaml
step-01-init: Initialize workflow, detect continuation
step-02-context: Gather context (PRD, UX, project type, constraints)
step-03-starter: Architecture starter kit (cloud/on-prem, monolith/microservices, tech stack)
step-04-decisions: Core architectural decisions (data, API, security, deployment)
step-05-patterns: Design patterns (state management, error handling, caching)
step-06-structure: Project structure (folder layout, module organization)
step-07-validation: Validate architecture (completeness, consistency, feasibility)
step-08-complete: Finalize and suggest next workflows
```

**Duration**: 60-120 minutes (depends on complexity)

---

## ðŸ“Š ARCHITECTURE OUTPUT FORMAT

### Avanade Architecture Document Structure:

```markdown
# Architecture: {Project Name}

## 1. Context
**Problem**: From PRD - what we're solving
**Constraints**: Budget, timeline, team skills, existing systems
**Goals**: Performance, scalability, maintainability targets

## 2. Starter Decisions
**Deployment**: Cloud (AWS/Azure/GCP) vs On-Prem vs Hybrid
**Architecture Style**: Monolith vs Microservices vs Serverless
**Primary Tech Stack**: Language, framework, database

## 3. Core Architectural Decisions

### Decision 1: Data Storage
**Question**: How do we store user data, transactions, analytics?
**Options Considered**: PostgreSQL, MongoDB, DynamoDB, Hybrid
**Decision**: PostgreSQL for transactional, S3+Athena for analytics
**Rationale**: ACID for user data, cost-effective analytics at scale
**Tradeoffs**: Analytics queries slower than dedicated warehouse (acceptable for MVP)

### Decision 2: API Design
**Question**: How do clients communicate with backend?
**Options Considered**: REST, GraphQL, gRPC, WebSockets
**Decision**: REST for CRUD, WebSockets for real-time exports
**Rationale**: REST simplicity for most ops, WebSockets for progress updates
**Tradeoffs**: No GraphQL flexibility (not needed for current use cases)

(Repeat for all major decisions: Security, Deployment, Scaling, Error Handling, Testing, Monitoring)

## 4. Design Patterns

**Pattern 1: Repository Pattern**
- **Where**: Data access layer
- **Why**: Decouple business logic from database
- **Example**: `UserRepository` abstracts PostgreSQL queries

**Pattern 2: Circuit Breaker**
- **Where**: External API calls (CRM, Billing, Analytics)
- **Why**: Prevent cascading failures
- **Implementation**: Retry 3x with exponential backoff, fallback to cached data

## 5. Project Structure

```
/
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ api/          # REST endpoints
â”‚   â”œâ”€â”€ services/     # Business logic
â”‚   â”œâ”€â”€ repositories/ # Data access
â”‚   â”œâ”€â”€ models/       # Data models
â”‚   â””â”€â”€ utils/        # Helpers
â”œâ”€â”€ tests/
â”‚   â”œâ”€â”€ unit/
â”‚   â”œâ”€â”€ integration/
â”‚   â””â”€â”€ e2e/
â”œâ”€â”€ infrastructure/   # IaC (Terraform/CloudFormation)
â””â”€â”€ docs/
```

## 6. Non-Functional Requirements Mapping

**Performance** (from PRD NFR):
- Target: <1s page load â†’ CDN + Edge caching
- Database queries <100ms â†’ Indexed queries, connection pooling

**Security** (from PRD NFR):
- JWT authentication â†’ OAuth 2.0 with refresh tokens
- Data encryption â†’ TLS 1.3 in transit, AES-256 at rest

**Scalability** (from PRD NFR):
- 10x growth in 12 months â†’ Horizontal scaling (K8s), stateless services

## 7. Open Questions & Decisions Deferred
- **Q1**: Caching strategy for export templates? (Redis vs in-memory)
  - **Status**: Deferred to Sprint 1 (test performance first)
- **Q2**: Real-time collaboration features?
  - **Status**: Out of scope for MVP (Phase 2)
```

---

## ðŸŽ“ Best Practices

### DO:
- âœ… Start from PRD (requirements drive architecture)
- âœ… Explicit tradeoffs (every decision has costs)
- âœ… Agent-friendly (clear decisions, no ambiguity)
- âœ… Defer non-critical decisions (avoid over-engineering)
- âœ… Map NFRs to architecture (performance â†’ caching, security â†’ OAuth)

### DON'T:
- âŒ Architecture before PRD (no requirements = guesswork)
- âŒ Technology resume-driven design ("let's use Kubernetes because cool")
- âŒ Implicit decisions (agents will make conflicting assumptions)
- âŒ Over-specification (don't design every microservice upfront)

---

## ðŸ”— Integration Points

### Prerequisites (Before Architecture):
- âœ… **PRD Validated** (required): `create-prd` workflow â†’ VALIDATE mode passed
- âœ… **UX Design** (recommended if UI): `create-ux-design` workflow
- âš ï¸ **Implementation Readiness Check** (optional): `check-implementation-readiness` workflow

### Next Steps (After Architecture):
1. **Epics & Stories** (required): `create-epics-and-stories` workflow
2. **Implementation Readiness** (recommended): Validates PRD + Architecture + Stories alignment
3. **Sprint Planning** (required): `sprint-planning` workflow

---

## ðŸš¨ Common Pitfalls

### Pitfall 1: Architecture Without PRD
**Problem**: Designing solution without understanding requirements  
**Result**: Architecture doesn't solve actual problems  
**Fix**: ALWAYS create + validate PRD first

### Pitfall 2: Technology-First Thinking
**Problem**: "Let's use microservices" (without justification)  
**Result**: Over-complexity for simple problems  
**Fix**: Choose tech based on constraints, not hype

### Pitfall 3: Vague Decisions
**Problem**: "We'll use a database" (which one? why?)  
**Result**: Agents make conflicting assumptions (one uses Postgres, one uses Mongo)  
**Fix**: Explicit decisions with rationale

### Pitfall 4: Missing Tradeoffs
**Problem**: Only listing benefits of chosen approach  
**Result**: Surprises during implementation (didn't anticipate costs)  
**Fix**: Every decision must state tradeoffs

---

## ðŸ“– Example Decision (Good vs Bad)

### âŒ BAD Decision:
```markdown
### Decision: Database
We will use PostgreSQL.
```
(No context, no rationale, no alternatives, no tradeoffs)

### âœ… GOOD Decision:
```markdown
### Decision 1: Primary Database

**Question**: How do we store user profiles, export history, and templates?

**Options Considered**:
1. **PostgreSQL**: ACID, mature, strong consistency
2. **MongoDB**: Flexible schema, horizontal scaling
3. **DynamoDB**: Serverless, auto-scaling, AWS-native

**Decision**: PostgreSQL 14 on AWS RDS

**Rationale**:
- ACID transactions critical for export history (exactly-once semantics)
- Schema stability (user profiles, templates are well-defined)
- Team expertise (3/5 devs have Postgres experience)
- Cost predictable (RDS pricing vs DynamoDB write-heavy costs)

**Tradeoffs**:
- âŒ Scaling: Vertical scaling limits (acceptable for <1M users in MVP)
- âŒ Schema changes: Migrations required (acceptable - schema stable)
- âœ… Consistency: Strong ACID (critical for financial exports)
- âœ… Tooling: Rich ecosystem (ORMs, admin tools, backups)

**Implementation Notes**:
- Use connection pooling (PgBouncer) for concurrency
- Index on user_id, export_date for query performance
- Enable WAL archiving for point-in-time recovery
```

---

## ðŸ”— Related Artifacts

- **${AVANADE_ARCHITECTURE_TEMPLATE}**: Architecture template structure
- **${AVANADE_MEMORY_ARCHITECT_WILSON}**: Historical architecture patterns
- **${AVANADE_WORKFLOW_GUIDE_CREATE_PRD}**: PRD workflow (prerequisite)
- **${AVANADE_WORKFLOW_GUIDE_CREATE_EPICS_STORIES}**: Next step after architecture

---

## ðŸ“– References

- **Avanade Method Workflow Path**: `_avanade-method/bmm/workflows/3-solutioning/create-architecture/`
- **Workflow Manifest Entry**: `workflow-manifest.csv` line 12
- **Command**: `avanade-method-bmm-create-architecture` (CREATE), `avanade-method-bmm-validate-architecture` (VALIDATE)
- **Owner Agent**: Wilson Architect

---
