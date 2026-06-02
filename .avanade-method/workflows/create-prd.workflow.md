## 📋 O que é este Workflow?

O **create-prd** é um workflow Avanade Method v6 tri-modal para criar, validar ou editar Product Requirements Documents (PRDs). É o workflow central do Phase 2-Planning.

**Modos de Operação:**

- 🆕 **CREATE**: Criação guiada de novo PRD (12 steps)
- ✅ **VALIDATE**: Validação adversarial de PRD existente (13 checks)
- ✏️ **EDIT**: Edição inteligente de PRD (5 steps com detecção de formato)

**Workflow Path**: `_avanade-method/bmm/workflows/2-plan-workflows/create-prd/workflow.md`

---

## 🎯 Quando Usar

### ✅ USE create-prd para:

- **Greenfield projects**: Nova feature/produto sem documentação
- **PRD validation**: Verificar PRD existente antes de architecture
- **PRD updates**: Editar PRD após mudanças de escopo
- **Legacy conversion**: Converter PRDs não-Avanade para padrão Avanade Method

### ❌ NÃO USE para:

- Product Brief (use `create-product-brief` workflow)
- Technical specs (use Architecture depois do PRD)
- User stories (use `create-epics-and-stories` depois de PRD+Architecture)

---

## 🔄 WORKFLOW MODES

### MODE 1: CREATE (New PRD)

**Triggers:**

- User: "preciso criar um PRD"
- User: "documentar requisitos do produto"
- User selects "Create PRD" from menu

**Steps (12 total):**

```yaml
step-01-init: Initialize workflow, detect continuation
step-02-discovery: Discover project context (Problem, Vision, Goals)
step-03-success: Define success criteria (KPIs, metrics, acceptance)
step-04-journeys: Map user journeys (personas, workflows, pain points)
step-05-domain: Domain modeling (concepts, entities, business rules)
step-06-innovation: Innovation opportunities (differentiators, market gaps)
step-07-project-type: Classify project complexity (greenfield, brownfield, integration)
step-08-scoping: Define MVP vs future phases (in-scope, out-scope, dependencies)
step-09-functional: Functional requirements (features, user stories at high level)
step-10-nonfunctional: Non-functional requirements (performance, security, scalability)
step-11-polish: Polish PRD (consistency, completeness, clarity)
step-12-complete: Finalize and suggest next workflows
```

**Output:**

- `{planning_artifacts}/prd-{project_name}.md` (Avanade Standard format)
- 6 core sections: Executive Summary, Success Criteria, Product Scope, User Journeys, Functional Requirements, Non-Functional Requirements

**Duration**: 45-90 minutes (collaborative, conversational)

---

### MODE 2: VALIDATE (Existing PRD)

**Triggers:**

- User: "validar PRD"
- User: "verificar se PRD está completo"
- After CREATE mode completes (recommended)

**Validation Dimensions (13 checks):**

```yaml
step-v-02: Format Detection (Avanade Standard vs Variant vs Legacy)
step-v-03: Density Validation (substance vs fluff, concrete vs vague)
step-v-04: Brief Coverage (all product-brief insights incorporated?)
step-v-05: Measurability (KPIs quantified, success criteria testable)
step-v-06: Traceability (requirements linkable to stories)
step-v-07: Implementation Leakage (requirements pure, no HOW details)
step-v-08: Domain Compliance (terminology accurate, business rules correct)
step-v-09: Project Type Validation (complexity classification accurate)
step-v-10: SMART Validation (Specific, Measurable, Achievable, Relevant, Timebound)
step-v-11: Holistic Quality (readability, consistency, completeness)
step-v-12: Completeness (all sections present, no TBDs)
step-v-13: Report Generation (validation report with scores, issues, recommendations)
```

**Output:**

- `{planning_artifacts}/prd-validation-report-{date}.md`
- Scorecard: Overall score (0-100%), category scores, issue list with severity

**Pass Threshold**: >85% overall, no critical gaps

---

### MODE 3: EDIT (Update PRD)

**Triggers:**

- User: "editar PRD"
- User: "atualizar requisitos"
- User: "adicionar feature ao PRD"

**Intelligent Editing:**

```yaml
step-e-01-discovery:
  - Load PRD
  - Detect format (Avanade Standard/Variant/Legacy)
  - Check for validation report (use findings if available)
  - Discover edit requirements from user

step-e-02-review:
  - Deep analysis of PRD structure
  - Identify impact zones (which sections affected by edit)
  - Preserve Avanade Method compliance

step-e-03-edit:
  - Execute edits with intelligent merge
  - Maintain cross-references
  - Update modified dates

step-e-04-complete:
  - Validate edited PRD
  - Suggest re-validation if major changes
```

**Smart Features:**

- **Legacy PRD Detection**: Offers conversion to Avanade format
- **Validation-Guided Edits**: Uses validation report to prioritize fixes
- **Impact Analysis**: Shows which downstream docs (Architecture, Stories) need updates

---

## 📊 PRD FORMAT (Avanade Standard)

### Required Sections (6 core):

```markdown
# PRD: {Project Name}

## 1. Executive Summary

**Problem**: Clear problem statement
**Solution**: High-level solution approach
**Impact**: Business value, user benefit, metrics

## 2. Success Criteria

**Primary Goal**: Single measurable outcome
**KPIs**: 3-5 quantified metrics
**Acceptance Criteria**: Launch readiness checklist

## 3. Product Scope

**In Scope**: Features/capabilities included
**Out of Scope**: Explicitly excluded
**MVP Definition**: Minimum viable feature set
**Future Phases**: Roadmap beyond MVP

## 4. User Journeys

**Personas**: Who uses this (3-5 personas)
**Current State**: Pain points, workarounds
**Future State**: Improved workflows
**Critical Paths**: Core user flows (Mermaid diagrams)

## 5. Functional Requirements

**FR-001**: {Feature name}

- Description: What it does (WHAT, not HOW)
- User Value: Why it matters
- Priority: P0 (must-have) / P1 (should-have) / P2 (nice-to-have)
- Dependencies: Related FRs

(Repeat for each functional requirement)

## 6. Non-Functional Requirements

**Performance**: Response times, throughput, load
**Security**: Authentication, authorization, data protection
**Scalability**: Growth projections, capacity
**Reliability**: Uptime, error rates, recovery
**Usability**: Accessibility (WCAG 2.1 AA), localization
**Compliance**: GDPR, SOC2, industry standards
```

---

## 🔗 Integration Points

### Prerequisites (Before PRD):

- ✅ **Product Brief** (optional but recommended): `create-product-brief` workflow
- ✅ **Market Research** (if needed): `research` workflow with `research_type=market`
- ✅ **Domain Research** (if complex domain): `research` workflow with `research_type=domain`

### Next Steps (After PRD):

1. **PRD Validation** (recommended): Run VALIDATE mode
2. **UX Design** (if UI): `create-ux-design` workflow
3. **Architecture** (required): `create-architecture` workflow
4. **Epics & Stories** (required): `create-epics-and-stories` workflow (after Architecture)

---

## 🎓 Best Practices

### DO:

- ✅ Start with Product Brief if greenfield (provides foundation)
- ✅ Validate PRD before Architecture (catch gaps early)
- ✅ Use VALIDATE mode after major edits
- ✅ Keep requirements WHAT-focused (not HOW)
- ✅ Quantify success criteria (no vague "improve UX")
- ✅ Define MVP clearly (prevents scope creep)

### DON'T:

- ❌ Skip validation (invalid PRD → invalid Architecture → invalid Stories)
- ❌ Mix implementation details in requirements (that's Architecture's job)
- ❌ Create PRD without understanding problem (do Discovery first)
- ❌ Leave TBDs or placeholders (complete all sections)
- ❌ Ignore validation report findings (fix issues before proceeding)

---

## 🚨 Common Pitfalls

### Pitfall 1: Implementation Leakage

**Problem**: PRD includes HOW details (technologies, architecture)  
**Example**: "Use PostgreSQL for user data" (implementation) vs "Store user profiles persistently" (requirement)  
**Fix**: VALIDATE mode catches this (step-v-07)

### Pitfall 2: Vague Success Criteria

**Problem**: "Improve performance" (not measurable)  
**Example**: "Better user experience"  
**Fix**: "Reduce page load time from 3s to <1s (95th percentile)"

### Pitfall 3: Skipping Validation

**Problem**: Move to Architecture with incomplete PRD  
**Result**: Architecture gaps, Story gaps, implementation delays  
**Fix**: ALWAYS run VALIDATE mode before Architecture

### Pitfall 4: Over-Scoping MVP

**Problem**: MVP includes "nice-to-have" features  
**Example**: 20 features in MVP (should be 5-7 core features)  
**Fix**: Use RICE prioritization (see `${AVANADE_TASK_RICE_PRIORITIZATION}`)

---

## 📖 Example PRD Excerpts

### Good Executive Summary:

```markdown
## 1. Executive Summary

**Problem**: Customer support team spends 1.8 hours/day manually exporting reports from 3 systems (CRM, Billing, Analytics), resulting in 40% data error rate and $412k/year in labor costs.

**Solution**: Unified export automation platform that aggregates data from all systems, applies business rules, and generates formatted reports (PDF, Excel, CSV) on-demand or scheduled.

**Impact**:

- **Labor Savings**: $412k/year (1.8h/day → 0.2h/day per agent, 50 agents)
- **Error Reduction**: 40% → <5% (automated validation)
- **Time-to-Report**: 45 minutes → 2 minutes (95% faster)
- **User Satisfaction**: Enable self-service (reduce support tickets by 30%)
```

### Good Functional Requirement:

```markdown
## 5. Functional Requirements

**FR-001: Multi-Format Export**

- **Description**: Users can export aggregated data in PDF, Excel (.xlsx), or CSV formats
- **User Value**: Flexibility for different use cases (executives want PDF, analysts want Excel)
- **Acceptance Criteria**:
  - Export generates all 3 formats from single action
  - PDF includes company branding, headers, page numbers
  - Excel includes formulas, pivot tables, charts
  - CSV uses UTF-8 encoding, comma delimiters
- **Priority**: P0 (must-have for MVP)
- **Dependencies**: FR-002 (Data Aggregation), FR-005 (Template System)
```

### Bad Functional Requirement (Implementation Leakage):

```markdown
❌ BAD:
**FR-001: PostgreSQL Database**

- Use PostgreSQL 14 for data storage
- Redis for caching
- S3 for file storage

(This is ARCHITECTURE, not a requirement!)

✅ GOOD:
**FR-001: Persistent Data Storage**

- System stores user preferences, export history, and templates persistently
- Data survives system restarts
- User can access export history for 90 days
```

---

## 🔧 Troubleshooting

### Issue: Workflow won't start

**Symptom**: Error "workflow not found"  
**Solution**: Check workflow path: `_avanade-method/bmm/workflows/2-plan-workflows/create-prd/workflow.md`

### Issue: Validation fails with "format not detected"

**Symptom**: VALIDATE mode can't classify PRD  
**Solution**: PRD must have at least 3 core sections (Executive Summary, Success Criteria, Product Scope)

### Issue: Edit mode offers "convert to Avanade"

**Symptom**: PRD detected as Legacy format  
**Solution**: Accept conversion (improves validation scores, enables full Avanade Method toolchain)

### Issue: Validation score <85%

**Symptom**: PRD doesn't pass quality gate  
**Solution**: Review validation report, fix critical/high issues, re-validate

---

## 🔗 Related Artifacts

- **${AVANADE_PRD_TEMPLATE_YAML}**: PRD template structure (João PM artifact)
- **${AVANADE_PM_CHECKLIST_MD}**: Validation checklist (used by VALIDATE mode)
- **${AVANADE_TASK_RICE_PRIORITIZATION}**: Prioritize requirements (before PRD or during editing)
- **${AVANADE_MEMORY_PM_JOAO}**: Historical PRD patterns, learnings

---

## 📖 References

- **Avanade Method Workflow Path**: `_avanade-method/bmm/workflows/2-plan-workflows/create-prd/`
- **Workflow Manifest Entry**: `workflow-manifest.csv` line 9
- **Command**: `avanade-method-bmm-create-prd` (CREATE), `avanade-method-bmm-validate-prd` (VALIDATE), `avanade-method-bmm-edit-prd` (EDIT)
- **Owner Agent**: João PM (Product Manager)
