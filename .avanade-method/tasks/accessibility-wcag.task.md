---
## 📋 Objetivo

Checklist para validação de acessibilidade seguindo WCAG 2.1 (Web Content Accessibility Guidelines). Nível alvo: AA, com aspiração para AAA em componentes críticos.
---

## 🎯 Níveis de Conformidade WCAG

| Nível   | Descrição   | Requisito                        |
| ------- | ----------- | -------------------------------- |
| **A**   | Mínimo      | Básico, legal em muitos países   |
| **AA**  | Recomendado | Padrão industria, target típico  |
| **AAA** | Máximo      | Excepcional, nem sempre possível |

---

## 🔍 Checklist WCAG 2.1 - Nível AA

### 1. Perceivable (Perceptível)

#### 1.1 Text Alternatives

- [ ] **Imagens têm alt text?**
  - Decorativas: `alt=""`
  - Informativas: descrição significativa
  - Funcionais: ação do elemento

- [ ] **Vídeos têm captions?**
  - Captions sincronizados
  - Descrição de audio para cegos

- [ ] **Audio tem transcrição?**
  - Podcasts/locuções transcritos
  - Disponível em formato texto

#### 1.2 Adaptable

- [ ] **Estrutura semântica correta?**
  - Headings hierárquicos (H1→H2→H3)
  - Landmarks (header, nav, main, footer)
  - Lists para listas, tables para dados

- [ ] **Reading order lógico?**
  - DOM order = visual order
  - Tab sequence faz sentido

- [ ] **Não depende apenas de características sensoriais?**
  - "Clique no botão verde" ❌
  - "Clique em Enviar" ✅

#### 1.3 Distinguishable

- [ ] **Contraste de cor suficiente?**
  - Texto normal: 4.5:1 (AA)
  - Texto grande (18pt+): 3:1 (AA)
  - UI components: 3:1

- [ ] **Não apenas cor para transmitir info?**
  - Error: ícone + cor + texto
  - Required: asterisco + label

- [ ] **Resize até 200% sem perda?**
  - Sem scroll horizontal
  - Conteúdo não cortado
  - Funcionalidade mantida

---

### 2. Operable (Operável)

#### 2.1 Keyboard Accessible

- [ ] **Tudo funciona com teclado?**
  - Tab para navegar
  - Enter/Space para ativar
  - Escape para fechar modals

- [ ] **Sem keyboard traps?**
  - Sempre possível sair de qualquer elemento
  - Modals têm focus management

- [ ] **Shortcuts não conflitam?**
  - Pode desativar shortcuts
  - Não override shortcuts do browser

#### 2.2 Enough Time

- [ ] **Timeouts têm warning?**
  - Usuário avisado antes de timeout
  - Opção de estender tempo
  - Pelo menos 20 segundos de aviso

- [ ] **Conteúdo em movimento controlável?**
  - Pause para carousels
  - Stop para animações
  - Sem auto-play indefinido

#### 2.3 Seizures and Physical Reactions

- [ ] **Sem flashes > 3 por segundo?**
  - Evita epilepsia fotossensível
  - Animações suaves

#### 2.4 Navigable

- [ ] **Skip links presente?**
  - "Skip to main content"
  - Primeiro elemento focável

- [ ] **Títulos de página descritivos?**
  - Único para cada página
  - Descreve conteúdo/propósito

- [ ] **Focus visible sempre?**
  - Outline claro
  - Nunca `outline: none` sem alternativa

- [ ] **Links descrevem destino?**
  - "Leia mais sobre acessibilidade" ✅
  - "Clique aqui" ❌

---

### 3. Understandable (Compreensível)

#### 3.1 Readable

- [ ] **Idioma da página declarado?**
  - `<html lang="pt-BR">`
  - Mudanças de idioma marcadas

- [ ] **Abreviações explicadas?**
  - `<abbr title="World Wide Web">WWW</abbr>`

#### 3.2 Predictable

- [ ] **Navegação consistente?**
  - Mesma posição em todas páginas
  - Mesma ordem de items

- [ ] **Identificação consistente?**
  - Mesmos ícones para mesmas funções
  - Labels consistentes

- [ ] **Sem mudanças inesperadas de contexto?**
  - Não muda página on focus
  - Não submete form on change

#### 3.3 Input Assistance

- [ ] **Erros identificados claramente?**
  - Mensagem de erro específica
  - Campo com erro destacado
  - Sugestão de correção

- [ ] **Labels e instruções claras?**
  - Formato esperado indicado
  - Campos required marcados

- [ ] **Prevenção de erros?**
  - Confirmação para ações irreversíveis
  - Opção de revisar antes de submit

---

### 4. Robust (Robusto)

#### 4.1 Compatible

- [ ] **HTML válido?**
  - Sem erros de parsing
  - IDs únicos
  - Tags fechadas corretamente

- [ ] **ARIA usado corretamente?**
  - Roles apropriados
  - States atualizados
  - Não conflita com semântica nativa

---

## 🛠️ Ferramentas de Teste

| Ferramenta              | Tipo       | Uso                         |
| ----------------------- | ---------- | --------------------------- |
| axe DevTools            | Automático | Browser extension           |
| WAVE                    | Automático | Análise visual de problemas |
| Lighthouse              | Automático | Audit integrado Chrome      |
| NVDA                    | Manual     | Screen reader gratuito      |
| VoiceOver               | Manual     | Screen reader macOS/iOS     |
| Color Contrast Analyzer | Ferramenta | Verificar contraste         |

---

## 📊 Audit Template

```markdown
## Accessibility Audit Report

**Page**: [URL]
**Date**: [YYYY-MM-DD]
**Auditor**: [Nome]
**Tools Used**: [Lista]

### Automated Testing Results

- axe-core: X issues found
- Lighthouse: Y score

### Manual Testing

- [ ] Keyboard navigation
- [ ] Screen reader
- [ ] Zoom 200%
- [ ] High contrast mode

### Issues Found

| ID  | WCAG  | Severity | Element  | Issue  | Fix                 |
| --- | ----- | -------- | -------- | ------ | ------------------- |
| A1  | 1.1.1 | Critical | img#hero | No alt | Add descriptive alt |

### Summary

- Critical: X
- Major: Y
- Minor: Z

### Pass Rate: X%
```

---

## 🔗 Relacionamentos

- **Usado por**: ${AVANADE_MEMORY_UX_SOFIA}, ${AVANADE_MEMORY_DEV_TIAGO}
- **Complementa**: ${AVANADE_TASK_UX_CHECKLIST}, ${AVANADE_FLUENT_DESIGN_GUIDELINES}
- **Referência**: WCAG 2.1, Section 508, ADA
