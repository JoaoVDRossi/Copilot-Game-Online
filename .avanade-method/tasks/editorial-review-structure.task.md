## 🔍 Checklist de Revisão Estrutural

### 1. Template Compliance

- [ ] **Template correto usado?**
  - Tipo de documento apropriado
  - Versão atual do template
  - Todas seções obrigatórias presentes

- [ ] **Metadados preenchidos?**
  - Título descriptivo
  - Autor identificado
  - Data de criação/atualização
  - Versão do documento

- [ ] **Naming convention seguida?**
  - Formato: AVANADE*[TYPE]*[NAME]
  - Underscores consistentes
  - Sem espaços ou caracteres especiais

### 2. Estrutura Hierárquica

- [ ] **Níveis de heading corretos?**
  - H1 apenas para título principal
  - Progressão lógica (H2 → H3 → H4)
  - Sem pulos de nível (H2 → H4)

- [ ] **Seções balanceadas?**
  - Tamanho similar entre seções
  - Profundidade consistente
  - Não mais que 4 níveis

- [ ] **TOC se documento longo?**
  - Links funcionais
  - Atualizado automaticamente
  - Todos headings representados

### 3. Completude

- [ ] **Todas seções required preenchidas?**
  - Sem "TBD" ou "TODO" pendentes
  - Placeholders substituídos
  - N/A explícito onde não aplicável

- [ ] **Referências completas?**
  - Links para artefatos relacionados
  - Dependências listadas
  - Versões especificadas

- [ ] **Anexos incluídos?**
  - Diagramas referenciados presentes
  - Código de exemplo funcional
  - Assets necessários

### 4. Navegabilidade

- [ ] **Cross-references funcionando?**
  - Links internos testados
  - Anchors existem
  - Nomes de seção consistentes

- [ ] **Busca facilitada?**
  - Keywords relevantes no texto
  - Headings descritivos (não genéricos)
  - Tags/labels se suportado

- [ ] **Scan-friendly?**
  - Informação crítica destacada
  - Bullets para listas
  - Tabelas para comparações

### 5. Formatação Visual

- [ ] **Markdown válido?**
  - Preview renderiza corretamente
  - Sem syntax errors
  - Escapes onde necessário

- [ ] **Code blocks apropriados?**
  - Language specified
  - Indentação correta
  - Syntax highlighting funciona

- [ ] **Tabelas formatadas?**
  - Headers presentes
  - Alinhamento consistente
  - Largura adequada

### 6. Consistência com Ecosystem

- [ ] **Terminologia alinhada?**
  - Glossário do projeto respeitado
  - Nomes de artefatos corretos
  - Referências com ${} format

- [ ] **Padrões visuais seguidos?**
  - Emojis consistentes (se usados)
  - Iconografia padrão
  - Color coding uniforme

- [ ] **Versionamento correto?**
  - Changelog se aplicável
  - Breaking changes highlighted
  - Migration guide se necessário

### 7. Acessibilidade

- [ ] **Alt text em imagens?**
  - Descrição significativa
  - Não redundante com caption

- [ ] **Contraste suficiente?**
  - Não depender só de cor
  - Texto legível

- [ ] **Estrutura semântica?**
  - Headings para navegação
  - Listas para enumerações
  - Tabelas para dados tabulares

---

## 📊 Scoring Matrix

| Categoria             | Peso | Score (1-5) |
| --------------------- | ---- | ----------- |
| Template Compliance   | 20%  |             |
| Estrutura Hierárquica | 20%  |             |
| Completude            | 25%  |             |
| Navegabilidade        | 15%  |             |
| Formatação            | 10%  |             |
| Acessibilidade        | 10%  |             |
| **Total**             | 100% |             |

**Aprovação**: Score ≥ 4.0 (80%)

---

## 📝 Estrutura Padrão de Documentos

```markdown
# [TÍTULO]

**Tipo**: [Categoria]
**Versão**: [X.Y]
**Atualizado**: [YYYY-MM-DD]

---

## 📋 Objetivo

[Propósito do documento em 2-3 linhas]

---

## [Seção Principal 1]

### [Subseção 1.1]

### [Subseção 1.2]

## [Seção Principal 2]

### [Subseção 2.1]

---

## 🔗 Relacionamentos

- **Depende de**: [Artefatos]
- **Usado por**: [Artefatos]
- **Relacionado**: [Artefatos]
```

---

## 🔗 Relacionamentos

- **Usado por**: ${AVANADE_MEMORY_TECH_WRITER_PAIGE}
- **Complementa**: ${AVANADE_TASK_EDITORIAL_REVIEW_PROSE}
- **Referência**: ${AVANADE_DOC_STANDARDS_MD}
