# Avanade Method Agent Inheritance Architecture

## 📚 Overview

O Avanade Method usa uma arquitetura de herança inspirada no BMAD, onde o **avanade-master.md** serve como template base para todos os agentes especializados.

## 🏗️ Estrutura de Arquivos

```
.avanade-method/
├── _base/
│   ├── avanade-master.md        # 🎯 Template base - herança completa
│   └── config.yaml              # Configuração global
│
├── agents/                      # 📁 Customizações por agente
│   ├── supervisor.customize.yaml
│   ├── tiago-dev.customize.yaml
│   ├── maria-analyst.customize.yaml
│   ├── joao-pm.customize.yaml
│   ├── wilson-architect.customize.yaml
│   ├── paula-po.customize.yaml
│   ├── roberto-sm.customize.yaml
│   ├── carla-qa.customize.yaml
│   ├── sofia-ux.customize.yaml
│   └── paige-tech-writer.customize.yaml
│
├── workflows/
├── tasks/
├── checklists/
├── guides/
├── memory/
├── standards/
└── templates/

.github/
└── chatmodes/                   # 📁 Arquivos de ativação por agente
    ├── avanade-supervisor.chatmode.md
    ├── tiago-dev.chatmode.md
    ├── maria-analyst.chatmode.md
    └── ... (um por agente)
```

## 🔄 Modelo de Herança

### Camadas de Definição

```
┌─────────────────────────────────────────────────────────────┐
│                    PRIORITY 1 (HIGHEST)                      │
│              .chatmode.md (Agent File)                       │
│         Definição primária do agente no VSCode               │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                       PRIORITY 2                             │
│           agents/*.customize.yaml                            │
│         Customizações específicas opcionais                  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                  PRIORITY 3 (BASE)                           │
│            _base/avanade-master.md                           │
│         Template base com padrões compartilhados             │
└─────────────────────────────────────────────────────────────┘
```

### O que é Herdado vs Override

| Componente              | Comportamento | Descrição                                       |
| ----------------------- | ------------- | ----------------------------------------------- |
| **Activation Protocol** | APPEND        | Steps do agente são adicionados após steps base |
| **Menu Handlers**       | INHERIT       | Totalmente herdado, não modificado              |
| **Cognitive Framework** | INHERIT       | Elicitação e análise de contexto compartilhados |
| **Base Menu Items**     | INHERIT       | MH, CH, PM, DA sempre disponíveis               |
| **Rules**               | APPEND        | Regras do agente adicionadas às base            |
| **Persona**             | REPLACE       | Agente substitui completamente persona base     |
| **Dependencies**        | MERGE         | Dependências do agente + base compartilhadas    |

## 📋 Componentes do avanade-master.md

### 1. Activation Protocol (Passos 1-10)

```xml
<activation>
  <step n="1">Load persona from current agent file</step>
  <step n="2">Load config.yaml, set session variables</step>
  <step n="3">Remember user_name</step>
  <step n="4">Read agent customization if exists</step>
  <step n="5">Show greeting in communication_language</step>
  <step n="6">Display numbered menu</step>
  <step n="7">Inform about /avanade-help</step>
  <step n="8">STOP and WAIT for input</step>
  <step n="9">Process input (number | fuzzy match)</step>
  <step n="10">Execute via menu-handlers</step>
</activation>
```

### 2. Menu Handlers

- **workflow**: Carrega e executa arquivo .workflow.md
- **task**: Executa tarefa atômica de .task.md
- **checklist**: Guia interativo por checklist
- **action**: Executa prompt inline ou referenciado
- **route**: Direciona para outro agente
- **guide**: Apresenta conteúdo de guia

### 3. Cognitive Framework (3 fases)

1. **Context Analysis**: Resumo → Contexto → Gaps → Padrões
2. **Elicitation**: Perguntas obrigatórias quando contexto insuficiente
3. **Instruction Generation**: Passos explícitos após contexto

### 4. Shared Dependencies

- `doc-standards.md`, `commonmark-template.md`
- `fluent-design-guidelines.md`, `mermaid-library.md`
- `party-mode-guide.md`, `elicitation-methods.md`

## 🛠️ Criando um Novo Agente

### Passo 1: Criar o arquivo .customize.yaml

```yaml
# agents/novo-agente.customize.yaml
agent:
  id: novo-agente
  name: Nome
  title: Título do Agente
  icon: 🆕
  whenToUse: "Quando usar este agente"

persona:
  role: Papel do Agente
  style: Estilo de comunicação
  identity: |
    Descrição da identidade

core_principles:
  - "Princípio 1"
  - "Princípio 2"

menu:
  - cmd: "CMD1 or comando"
    workflow: "workflow.md"
    description: "[CMD1] Descrição"

dependencies:
  workflows:
    - workflow-relevante.md
  tasks:
    - task-relevante.md
```

### Passo 2: Criar o arquivo .chatmode.md

```markdown
---
description: "Descrição do agente"
mode: agent
tools: ["vscode", "execute", "read", "edit", "search", "web", "agent", "todo"]
---

# id

**INHERITS FROM**: `avanade-master.md`
**CUSTOMIZATION**: `agents/novo-agente.customize.yaml`

<agent extends="avanade-master.md" customization="agents/novo-agente.customize.yaml">
  <!-- Agent-specific overrides here -->
</agent>
```

## 🔗 Mapeamento Agentes → Fases

| Fase           | Agentes                         | Principal     |
| -------------- | ------------------------------- | ------------- |
| Discovery      | Maria Analyst                   | 🔍 Maria      |
| Planning       | João PM, Sofia UX               | 📋 João       |
| Solutioning    | Wilson Architect, Paula PO      | 🏗️ Wilson     |
| Implementation | Tiago Dev, Carla QA, Roberto SM | 💻 Tiago      |
| Documentation  | Paige Tech Writer               | 📝 Paige      |
| Orchestration  | Supervisor                      | 🎯 Supervisor |

## ⚙️ Configuração Global

O arquivo `_base/config.yaml` define:

```yaml
user_name: "Usuário"
communication_language: "pt-BR"
output_folder: "docs"

settings:
  show_reasoning_chain: true
  require_elicitation: true
  strict_methodology_compliance: true

quality_gates:
  prd_checklist: "pm-checklist.md"
  architecture_checklist: "architect-checklist.md"
  story_checklist: "story-dod-checklist.md"
```

## 📖 Referência: avanade-master.md

O template base está em: `.avanade-method/_base/avanade-master.md`

Este arquivo define:

- Protocolo de ativação completo
- Menu handlers para todos os tipos de item
- Framework cognitivo de 3 fases
- Regras globais aplicáveis a todos os agentes
- Recursos compartilhados
- Dependências base

---

_Última atualização: 2026-02-05_
