## 📋 Objetivo

Checklist para avaliação heurística de usabilidade baseado nas 10 Heurísticas de Nielsen. Ferramenta para identificar problemas de UX sem necessidade de testes com usuários.

## 🔍 10 Heurísticas de Nielsen

### 1. Visibility of System Status

**O sistema mantém usuários informados sobre o que está acontecendo?**

- [ ] **Feedback imediato para ações?**
  - Loading indicators
  - Progress bars
  - Confirmações visuais

- [ ] **Estado atual claro?**
  - Qual página estou?
  - Qual step de um wizard?
  - Item selecionado destacado

- [ ] **Tempo de resposta adequado?**
  - < 100ms: instantâneo
  - < 1s: loader opcional
  - > 1s: loader obrigatório

**Severidade se violado**: 🟡 Medium

---

### 2. Match Between System and Real World

**O sistema fala a linguagem do usuário?**

- [ ] **Terminologia familiar?**
  - Termos do domínio do usuário
  - Sem jargão técnico desnecessário
  - Consistente com competidores

- [ ] **Metáforas reconhecíveis?**
  - Ícones intuitivos
  - Conceitos familiares (carrinho, pasta)
  - Fluxos naturais

- [ ] **Ordem lógica/natural?**
  - Informação organizada como usuário espera
  - Sequência familiar (nome antes de endereço)

**Severidade se violado**: 🟠 High

---

### 3. User Control and Freedom

**Usuário pode desfazer erros facilmente?**

- [ ] **Undo/Redo disponível?**
  - Ctrl+Z funciona
  - Botão de desfazer visível
  - Histórico de ações

- [ ] **Saída de emergência clara?**
  - Cancel em dialogs
  - X para fechar
  - Back button funciona

- [ ] **Não força caminhos?**
  - Pode sair de wizards
  - Pode editar entradas anteriores
  - Não obriga completar

**Severidade se violado**: 🟠 High

---

### 4. Consistency and Standards

**O sistema segue convenções?**

- [ ] **Consistência interna?**
  - Mesmos termos para mesmas coisas
  - Mesma posição para elementos similares
  - Mesmos gestos/interações

- [ ] **Consistência externa?**
  - Segue padrões da plataforma
  - Familiar para usuários de apps similares
  - Ícones universais

- [ ] **Design system aplicado?**
  - Componentes padronizados
  - Typography consistente
  - Spacing uniforme

**Severidade se violado**: 🟡 Medium

---

### 5. Error Prevention

**O sistema previne erros antes de acontecerem?**

- [ ] **Constraints apropriados?**
  - Input masks (telefone, CPF)
  - Disabled states para ações inválidas
  - Validação em tempo real

- [ ] **Confirmação para ações destrutivas?**
  - "Tem certeza?" para deletes
  - Recoverable trash
  - Undo period

- [ ] **Defaults inteligentes?**
  - Valores pré-preenchidos quando possível
  - Sugestões baseadas em contexto
  - Remember previous choices

**Severidade se violado**: 🔴 Critical

---

### 6. Recognition Rather Than Recall

**Usuário precisa lembrar informação?**

- [ ] **Opções visíveis?**
  - Menus ao invés de comandos
  - Autocomplete
  - Recent items

- [ ] **Contexto disponível?**
  - Instruções onde necessário
  - Tooltips explicativos
  - Examples inline

- [ ] **Não requer memorização?**
  - Não precisa lembrar códigos
  - Referências visuais
  - Busca robusta

**Severidade se violado**: 🟡 Medium

---

### 7. Flexibility and Efficiency of Use

**Atende novatos E experts?**

- [ ] **Atalhos disponíveis?**
  - Keyboard shortcuts
  - Quick actions
  - Power user features

- [ ] **Customização permitida?**
  - Reordenar elementos
  - Salvar preferências
  - Templates personalizados

- [ ] **Multiple paths to goal?**
  - Menu + shortcut + search
  - Drag-drop + buttons
  - Direct manipulation

**Severidade se violado**: 🟢 Low

---

### 8. Aesthetic and Minimalist Design

**Informação é necessária e suficiente?**

- [ ] **Sem clutter visual?**
  - Whitespace adequado
  - Hierarquia clara
  - Foco no essencial

- [ ] **Informação relevante priorizada?**
  - Most important first
  - Progressive disclosure
  - Details on demand

- [ ] **Visual design suporta função?**
  - Decoração não interfere
  - Estética serve propósito
  - Não distrai da tarefa

**Severidade se violado**: 🟡 Medium

---

### 9. Help Users Recognize, Diagnose, and Recover from Errors

**Mensagens de erro são úteis?**

- [ ] **Linguagem clara?**
  - Sem códigos técnicos
  - Explica o problema
  - Tom construtivo

- [ ] **Indica solução?**
  - O que fazer para corrigir
  - Link para ajuda se complexo
  - Ação sugerida

- [ ] **Precisão no diagnóstico?**
  - Aponta exatamente o problema
  - Não genérico "Erro ocorreu"
  - Contexto do erro

**Severidade se violado**: 🟠 High

---

### 10. Help and Documentation

**Ajuda está disponível quando necessário?**

- [ ] **Ajuda contextual?**
  - Tooltips
  - Inline help
  - ? icons

- [ ] **Documentação searchable?**
  - FAQs
  - Knowledge base
  - Search funciona

- [ ] **Task-oriented?**
  - Como fazer X
  - Passo a passo
  - Examples práticos

**Severidade se violado**: 🟢 Low

---

## 📊 Severity Rating Scale

| Nível           | Descrição    | Impacto                           |
| --------------- | ------------ | --------------------------------- |
| 🔴 Critical (4) | Catastrófico | Impede uso, causa erros graves    |
| 🟠 High (3)     | Major        | Dificulta significativamente      |
| 🟡 Medium (2)   | Minor        | Causa confusão, workaround existe |
| 🟢 Low (1)      | Cosmético    | Irritante mas não impede          |

---

## 📝 Heuristic Evaluation Report Template

```markdown
## Heuristic Evaluation Report

**Product**: [Nome]
**Evaluator**: [Nome]
**Date**: [YYYY-MM-DD]
**Scope**: [Telas/fluxos avaliados]

### Summary

| Heuristic           | Issues | Avg Severity |
| ------------------- | ------ | ------------ |
| 1. Visibility       | 2      | 2.5          |
| 2. Match Real World | 1      | 2.0          |
| ...                 | ...    | ...          |
| **Total**           | X      | Y            |

### Issues Detail

#### Issue #1

- **Heuristic**: [Número e nome]
- **Location**: [Onde ocorre]
- **Severity**: [1-4]
- **Description**: [O que está errado]
- **Screenshot**: [Se aplicável]
- **Recommendation**: [Como corrigir]

### Prioritized Fix List

1. [Critical] Issue X - H5 Error Prevention
2. [High] Issue Y - H9 Error Messages
3. ...
```

---

## 🔗 Relacionamentos

- **Usado por**: ${AVANADE_MEMORY_UX_SOFIA}
- **Complementa**: ${AVANADE_TASK_UX_CHECKLIST}, ${AVANADE_TASK_ACCESSIBILITY_WCAG}
- **Referência**: Nielsen Norman Group, ISO 9241-11
