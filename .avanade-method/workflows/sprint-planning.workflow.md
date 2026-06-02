## ðŸ“‹ O que Ã© este Workflow?

O **sprint-planning** gera e gerencia o arquivo `sprint-status.yaml` que rastreia todos epics e stories atravÃ©s do ciclo de desenvolvimento (Phase 4 Implementation).

**FunÃ§Ã£o**: Central tracking system para desenvolvimento iterativo

**Workflow Path**: `_avanade-method/bmm/workflows/4-implementation/sprint-planning/workflow.yaml`

---

## ðŸŽ¯ Quando Usar

### âœ… USE sprint-planning para:
- **InÃ­cio de Phase 4**: ApÃ³s PRD + Architecture + Epics/Stories completos
- **Sprint tracking**: Gerenciar progresso de epics e stories
- **Status updates**: Atualizar status conforme dev progride
- **Risk identification**: Surfacing blockers, dependencies

### âŒ NÃƒO USE para:
- **Before Epics/Stories**: Precisa de epics.md file primeiro
- **Ad-hoc tasks**: Use `quick-dev` para tarefas fora do plano
- **Planning refinement**: Use `create-story` para criar stories individuais

---

## ðŸ”„ WORKFLOW PROCESS

### Step 1: Extract Epics & Stories
- **Input**: `{planning_artifacts}/epics.md` (from `create-epics-and-stories`)
- **Process**: Parse all epics, extract all stories with metadata
- **Output**: Structured YAML with all epics/stories

### Step 2: Initialize Status
- **Default Status**: `not-started` for all stories
- **Epic Status**: Calculated from story statuses
- **Metadata**: Story IDs, titles, acceptance criteria count

### Step 3: Generate sprint-status.yaml
```yaml
# Sprint Status - {Project Name}
# Generated: {date}

project:
  name: "{project_name}"
  total_epics: 5
  total_stories: 23
  status: "in-progress"
  last_updated: "2025-02-03T14:30:00Z"

epics:
  - id: "EP001"
    title: "User Authentication"
    status: "in-progress"  # not-started | in-progress | completed | blocked
    stories:
      - id: "ST001"
        title: "User registration with email"
        status: "completed"
        acceptance_criteria_count: 5
        assigned_to: "Tiago Dev"
        story_file: "{planning_artifacts}/stories/ST001-user-registration.md"
      
      - id: "ST002"
        title: "JWT token generation"
        status: "in-progress"
        acceptance_criteria_count: 4
        assigned_to: "Tiago Dev"
        blocked_by: null
        story_file: "{planning_artifacts}/stories/ST002-jwt-generation.md"
      
      - id: "ST003"
        title: "Password reset flow"
        status: "not-started"
        acceptance_criteria_count: 6
        dependencies: ["ST001", "ST002"]
        story_file: "{planning_artifacts}/stories/ST003-password-reset.md"
  
  - id: "EP002"
    title: "Export Automation"
    status: "not-started"
    stories:
      - id: "ST004"
        title: "Multi-format export engine"
        status: "not-started"
        acceptance_criteria_count: 8
        story_file: "{planning_artifacts}/stories/ST004-export-engine.md"

risks:
  - epic: "EP001"
    story: "ST002"
    risk: "Dependency on external OAuth library (version compatibility)"
    severity: "medium"
    mitigation: "Pin library version, test integration early"
  
completed_stories: ["ST001"]
in_progress_stories: ["ST002"]
blocked_stories: []
not_started_stories: ["ST003", "ST004", ...]

sprint_summary:
  total_stories: 23
  completed: 1
  in_progress: 1
  blocked: 0
  not_started: 21
  completion_percentage: 4.3%
```

---

## ðŸ”„ Status Updates

### How to Update sprint-status.yaml:

**Manual Updates:**
1. Open `sprint-status.yaml`
2. Change story `status` field
3. Add `completed_date` when done
4. Update `risks` if new blockers emerge

**Workflow Updates:**
- `dev-story` workflow auto-updates status to "completed" when story finishes
- `code-review` workflow marks story as "in-review"
- `correct-course` workflow adds risks

**Status Values:**
```yaml
not-started: Story not yet begun
in-progress: Active development
in-review: Code review phase
completed: All acceptance criteria met, tests passed
blocked: Cannot proceed (dependency, blocker)
deferred: Moved to future sprint
```

---

## ðŸŽ“ Best Practices

### DO:
- âœ… Update sprint-status.yaml DAILY (accurate tracking)
- âœ… Add risks as soon as identified (don't wait)
- âœ… Review sprint-status before standup meetings
- âœ… Use `sprint-status` workflow to get summary
- âœ… Mark dependencies explicitly (prevents conflicts)

### DON'T:
- âŒ Manual edits without workflow (use `sprint-status` workflow for updates)
- âŒ Ignore blocked stories (address blockers immediately)
- âŒ Skip risk documentation (future you will thank you)
- âŒ Forget to update after completing story

---

## ðŸ”— Integration Points

### Prerequisites (Before sprint-planning):
- âœ… **Epics & Stories** (required): `create-epics-and-stories` workflow
- âœ… **Implementation Readiness** (recommended): `check-implementation-readiness` workflow

### Workflows that Update sprint-status.yaml:
- **dev-story**: Marks stories as in-progress â†’ completed
- **code-review**: Adds in-review status
- **correct-course**: Adds risks, may defer stories
- **retrospective**: Analyzes completion, adds learnings

### Workflows that Read sprint-status.yaml:
- **sprint-status**: Summarizes current state, routes to next workflow
- **create-story**: Checks dependencies before creating story
- **retrospective**: Analyzes sprint performance

---

## ðŸš¨ Common Pitfalls

### Pitfall 1: Stale Status
**Problem**: sprint-status.yaml not updated for days  
**Result**: Can't track actual progress, blockers go unnoticed  
**Fix**: Update status after EVERY story completion

### Pitfall 2: Missing Dependencies
**Problem**: Story started without prerequisite stories completed  
**Result**: Wasted work, conflicts, rework  
**Fix**: Check `dependencies` field before starting story

### Pitfall 3: Ignoring Risks
**Problem**: Blocker encountered but not documented  
**Result**: Other devs unaware, duplicate effort  
**Fix**: Add risks to sprint-status.yaml immediately

---

## ðŸ“Š Sprint Metrics

### Calculated Automatically:

```yaml
sprint_summary:
  velocity: {stories_completed / sprint_duration}
  completion_percentage: {completed / total * 100}
  blocked_percentage: {blocked / total * 100}
  average_story_duration: {days}
  risk_count: {count}
  high_risk_stories: [list]
```

### How to Use Metrics:
- **Velocity**: Track over sprints (improve estimation)
- **Completion %**: Progress indicator
- **Blocked %**: If >15%, sprint in trouble (address blockers)
- **Risk Count**: If increasing, escalate to PM/Architect

---

## ðŸ”— Related Artifacts

- **${AVANADE_WORKFLOW_GUIDE_CREATE_EPICS_STORIES}**: Prerequisite workflow
- **${AVANADE_WORKFLOW_GUIDE_DEV_STORY}**: Implements stories, updates status
- **${AVANADE_MEMORY_SM_ROBERTO}**: Historical sprint patterns
- **${AVANADE_STORY_TEMPLATE_YAML}**: Story file structure

---

## ðŸ“– References

- **Avanade Method Workflow Path**: `_avanade-method/bmm/workflows/4-implementation/sprint-planning/`
- **Workflow Manifest Entry**: `workflow-manifest.csv` line 19
- **Command**: `avanade-method-bmm-sprint-planning`
- **Owner Agent**: Roberto SM (Scrum Master)

