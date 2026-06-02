---

## ðŸ“‹ O que Ã© este Artefato?

Este Ã© o **guia de referÃªncia CommonMark** para criar Markdown vÃ¡lido e portÃ¡vel. CommonMark Ã© a especificaÃ§Ã£o padrÃ£o de Markdown, garantindo que documentos renderizem consistentemente em qualquer plataforma.

**Por que CommonMark?**
- âœ… **Portabilidade**: Funciona em GitHub, GitLab, VS Code, Docusaurus, etc.
- âœ… **ConsistÃªncia**: Sintaxe bem definida (nÃ£o "flavors" contraditÃ³rios)
- âœ… **ValidaÃ§Ã£o**: Linters podem verificar conformidade
- âœ… **Acessibilidade**: SemÃ¢ntica clara para screen readers

---

## ðŸŽ¯ Quando Usar

### âœ… USE para:
- Toda documentaÃ§Ã£o tÃ©cnica em Markdown
- README files, guides, tutorials, API docs
- GitHub/GitLab wikis e issues
- Validar Markdown com linters (markdownlint)

### âŒ NÃƒO USE para:
- Plataformas com Markdown customizado (se precisa features nÃ£o-CommonMark)
- Rich text editors (Google Docs, Word)

---

## ðŸ“„ COMMONMARK QUICK REFERENCE

### 1. Headings (ATX Style)

```markdown
# Heading 1 (H1)
## Heading 2 (H2)
### Heading 3 (H3)
#### Heading 4 (H4)
##### Heading 5 (H5)
###### Heading 6 (H6)

RULES:
- EspaÃ§o apÃ³s # Ã© obrigatÃ³rio: "# Title" (nÃ£o "#Title")
- Apenas 1 H1 por documento
- NÃ£o pular nÃ­veis (H1 â†’ H2 â†’ H3, nÃ£o H1 â†’ H3)
- Max depth: H4 (deeper = poor information architecture)
```

**Rendered:**
# Heading 1
## Heading 2
### Heading 3

---

### 2. Emphasis & Strong

```markdown
*Italic text* or _italic text_
**Bold text** or __bold text__
***Bold and italic*** or ___bold and italic___

BEST PRACTICE:
- Use * for italic (mais comum)
- Use ** for bold
- Avoid mixing * and _ no mesmo documento
```

**Rendered:**
- *Italic text*
- **Bold text**
- ***Bold and italic***

---

### 3. Lists

#### Unordered Lists
```markdown
- First item
- Second item
  - Nested item (2 spaces indent)
  - Another nested item
- Third item

RULES:
- Use - (hyphen) consistently (pode usar * ou +, mas seja consistente)
- 2 ou 4 spaces para nesting (seja consistente)
- Linha em branco antes/depois de lista para clareza
```

**Rendered:**
- First item
- Second item
  - Nested item
  - Another nested item
- Third item

#### Ordered Lists
```markdown
1. First item
2. Second item
   1. Nested item (3 spaces indent)
   2. Another nested item
3. Third item

RULES:
- NÃºmeros nÃ£o precisam ser sequenciais (1., 1., 1. funciona)
- Mas RECOMENDADO: use nÃºmeros corretos (1., 2., 3.)
- 3 spaces para nesting (alinha com texto do item pai)
```

**Rendered:**
1. First item
2. Second item
   1. Nested item
   2. Another nested item
3. Third item

#### Task Lists (GitHub Flavored)
```markdown
- [ ] Unchecked task
- [x] Checked task
- [ ] Another task

âš ï¸ NÃƒO Ã‰ CommonMark PURO (GitHub extension)
Mas amplamente suportado
```

**Rendered:**
- [ ] Unchecked task
- [x] Checked task
- [ ] Another task

---

### 4. Links

#### Inline Links
```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Hover title")

RULES:
- Texto descritivo (nÃ£o "click here")
- URLs devem ser absolute ou relative vÃ¡lidas
```

**Rendered:**
[Link text](https://example.com)

#### Reference Links
```markdown
[Link text][reference-id]
[Another link][reference-id]

[reference-id]: https://example.com "Optional title"

USEFUL FOR:
- MÃºltiplos links para mesma URL
- Manter texto limpo (referÃªncias no fim do documento)
```

**Rendered:**
[Link text][ref]

[ref]: https://example.com

#### Autolinks
```markdown
<https://example.com>
<email@example.com>

RULES:
- Wrap URL/email em < >
- Renderiza como clicÃ¡vel automaticamente
```

**Rendered:**
<https://example.com>

---

### 5. Images

```markdown
![Alt text](image.png)
![Alt text](image.png "Optional title")

RULES:
- Alt text Ã© OBRIGATÃ“RIO para acessibilidade
- Alt deve descrever imagem, nÃ£o apenas "image" ou "screenshot"
- Prefer relative paths para images no mesmo repo
```

**Rendered:**
![Example of a login form with username and password fields](https://via.placeholder.com/300x200)

#### Reference-Style Images
```markdown
![Alt text][image-ref]

[image-ref]: image.png "Optional title"
```

---

### 6. Code

#### Inline Code
```markdown
Use `backticks` para inline code.

Examples:
- Run `npm install` to install dependencies.
- The `getUserById()` function returns a user object.

RULES:
- Use para commands, function names, variables, file names
```

**Rendered:**
Run `npm install` to install dependencies.

#### Code Blocks (Fenced)
````markdown
```javascript
function hello(name) {
    return `Hello, ${name}!`;
}
```

RULES:
- Use ``` (3 backticks) antes e depois
- Especificar linguagem (javascript, python, bash, etc.)
- Linguagem deve ser lowercase
````

**Rendered:**
```javascript
function hello(name) {
    return `Hello, ${name}!`;
}
```

#### Code Blocks (Indented)
```markdown
    Indent 4 spaces para code block
    Sem syntax highlighting
    Menos preferido que fenced blocks

AVOID: Use fenced blocks (```) ao invÃ©s de indented
```

---

### 7. Blockquotes

```markdown
> This is a blockquote.
> It can span multiple lines.
>
> And include multiple paragraphs.

NESTING:
> Level 1
>> Level 2
>>> Level 3

RULES:
- Use > no inÃ­cio de cada linha
- Linha em branco (apenas >) para novo parÃ¡grafo dentro de quote
```

**Rendered:**
> This is a blockquote.
> It can span multiple lines.

---

### 8. Horizontal Rules

```markdown
---
(3 ou mais hyphens)

***
(3 ou mais asterisks)

___
(3 ou mais underscores)

BEST PRACTICE:
- Use --- (mais visÃ­vel)
- Linha em branco antes/depois
```

**Rendered:**

---

---

### 9. Tables (GitHub Flavored)

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1 Col 1 | Row 1 Col 2 | Row 1 Col 3 |
| Row 2 Col 1 | Row 2 Col 2 | Row 2 Col 3 |

ALIGNMENT:
| Left | Center | Right |
|:-----|:------:|------:|
| L1   | C1     | R1    |
| L2   | C2     | R2    |

RULES:
- Outer pipes (|) sÃ£o opcionais mas recomendados
- Alinhamento: :--- (left), :---: (center), ---: (right)
- Cells podem conter inline Markdown (bold, italic, code, links)
```

**Rendered:**

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1 Col 1 | Row 1 Col 2 | Row 1 Col 3 |
| Row 2 Col 1 | Row 2 Col 2 | Row 2 Col 3 |

âš ï¸ **NÃƒO Ã‰ CommonMark PURO** (GitHub/GitLab extension)
Mas amplamente suportado em platforms de documentaÃ§Ã£o

---

### 10. Line Breaks

```markdown
MÃ©todo 1: Duas ou mais spaces no fim da linha  
PrÃ³xima linha serÃ¡ nova linha (hard break).

MÃ©todo 2: Backslash no fim da linha\
PrÃ³xima linha serÃ¡ nova linha.

BEST PRACTICE:
- Use backslash \ (mais visÃ­vel)
- Ou simplesmente deixe linha em branco para novo parÃ¡grafo
```

**Rendered:**
Line 1 (two spaces after)  
Line 2

Line 1 (backslash after)\
Line 2

---

### 11. Escaping Characters

```markdown
Use backslash \ para escapar caracteres especiais:

\* Asterisk (sem italic)
\_ Underscore (sem italic)
\# Hash (sem heading)
\[ Square bracket (sem link)
\\ Backslash literal

SPECIAL CHARS QUE PRECISAM ESCAPE:
\ ` * _ { } [ ] ( ) # + - . ! | <
```

**Rendered:**
\* Not italic \*
\# Not a heading

---

## ðŸš€ TEMPLATE COMPLETO DE DOCUMENTO

```markdown
# Document Title

**Author**: [Nome]  
**Date**: YYYY-MM-DD  
**Status**: Draft | Review | Published

---

## Overview

Brief introduction explaining what this document covers and who it's for.

## Table of Contents

- [Section 1](#section-1)
- [Section 2](#section-2)
- [Section 3](#section-3)

---

## Section 1

### Subsection 1.1

Regular paragraph text with **bold** and *italic* emphasis.

#### Code Example

```python
def example_function(param):
    """Docstring explaining what this does."""
    return param * 2
```

#### Key Points

- Point 1 with inline `code`
- Point 2 with [link](https://example.com)
- Point 3 with **emphasis**

---

## Section 2

### Subsection 2.1

> **Note**: This is a blockquote for important information.

#### Process Steps

1. First step - describe action clearly
2. Second step - include expected result
3. Third step - provide troubleshooting if needed

#### Reference Table

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |

---

## Section 3

### Images

![Descriptive alt text for accessibility](./images/example.png)

### Links & Resources

- [External Resource 1](https://example.com/resource1)
- [Internal Link](./other-doc.md)
- [Reference with title][ref-1]

[ref-1]: https://example.com "Hover title"

---

## Troubleshooting

**Issue**: Common problem description  
**Solution**: How to fix it

**Issue**: Another problem  
**Solution**: Another fix

---

## Next Steps

- [ ] Task 1 to complete
- [ ] Task 2 to complete
- [ ] Task 3 to complete

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-02-03 | Initial release |

---

**Last Updated**: 2025-02-03  
**Maintained By**: [Team Name]
```

---

## âœ… VALIDATION CHECKLIST

### CommonMark Compliance

- [ ] **Headings**: ATX-style (#), espaÃ§o apÃ³s #, nÃ£o pular nÃ­veis
- [ ] **Lists**: Consistente (- ou *, nÃ£o mixed), indentaÃ§Ã£o correta
- [ ] **Links**: Formato [text](url) vÃ¡lido, URLs corretas
- [ ] **Images**: Alt text presente, formato ![alt](url)
- [ ] **Code blocks**: Fenced (```) com language tag
- [ ] **Emphasis**: Consistente (* ou _, nÃ£o mixed)
- [ ] **Escaping**: Caracteres especiais escapados quando necessÃ¡rio
- [ ] **Line breaks**: Duas spaces ou \ para hard breaks

### Rendering Test

- [ ] **Preview localmente**: VS Code, Markdown Preview
- [ ] **Test em target platform**: GitHub, GitLab, Docusaurus
- [ ] **Lint**: Run markdownlint ou similar
- [ ] **Links funcionam**: Todos absolute e relative links vÃ¡lidos
- [ ] **Images carregam**: Paths corretos, arquivos existem

---

## ðŸ”§ TOOLS & LINTERS

### VS Code Extensions

```json
{
  "recommendations": [
    "davidanson.vscode-markdownlint",  // Linter
    "yzhang.markdown-all-in-one",      // Productivity
    "bierner.markdown-preview-github-styles"  // GitHub preview
  ]
}
```

### Markdownlint Configuration

`.markdownlint.json`:
```json
{
  "default": true,
  "MD013": false,  // Line length (disabled - some code examples are long)
  "MD033": false,  // HTML (allow for complex tables)
  "MD041": false,  // First line heading (allow frontmatter)
  
  "heading-style": { "style": "atx" },
  "ul-style": { "style": "dash" },
  "code-fence-style": { "style": "fenced" }
}
```

### CLI Validation

```bash
# Install markdownlint-cli
npm install -g markdownlint-cli

# Lint single file
markdownlint document.md

# Lint all markdown files
markdownlint **/*.md

# Fix auto-fixable issues
markdownlint --fix **/*.md
```

---

## ðŸŽ¨ MARKDOWN FLAVORS COMPARISON

| Feature | CommonMark | GitHub | GitLab | Docusaurus |
|---------|-----------|--------|--------|------------|
| Tables | âŒ | âœ… | âœ… | âœ… |
| Task Lists | âŒ | âœ… | âœ… | âœ… |
| Strikethrough | âŒ | âœ… (~~text~~) | âœ… | âœ… |
| Autolinks | âœ… | âœ… | âœ… | âœ… |
| Emoji | âŒ | âœ… (:smile:) | âœ… | âœ… |
| Footnotes | âŒ | âœ… | âœ… | âœ… |
| Mermaid | âŒ | âœ… | âœ… | âœ… (plugin) |
| Admonitions | âŒ | âŒ | âŒ | âœ… (:::note) |

**Recommendation**: Stick to CommonMark + Tables (universally supported)

---

## ðŸ“š ADVANCED PATTERNS

### Multi-Paragraph List Items

```markdown
1. First item

   This is a continuation of the first item.
   Multiple paragraphs need to be indented.

   ```python
   # Code blocks inside list items
   print("Also indented")
   ```

2. Second item

   Another paragraph here.
```

**Rendered:**
1. First item

   This is a continuation of the first item.
   Multiple paragraphs need to be indented.

2. Second item

---

### Nested Lists (Complex)

```markdown
- Top level
  - Second level
    - Third level
      - Fourth level (avoid - too deep!)
  - Back to second level
- Back to top level
```

**Best Practice**: Max 3 levels deep

---

### Definition Lists (Not CommonMark)

```markdown
Term
: Definition

Another Term
: Another definition
: Multiple definitions for same term

âš ï¸ NÃƒO SUPORTADO em todos platforms
Use HTML <dl> se necessÃ¡rio
```

---

## ðŸ”— IntegraÃ§Ã£o com Outros Artefatos

- **${AVANADE_DOC_STANDARDS_MD}**: Usa CommonMark como base para formatting
- **${AVANADE_MEMORY_TECH_WRITER_PAIGE}**: Code examples seguem CommonMark
- **${AVANADE_TASK_EDITORIAL_REVIEW_STRUCTURE}**: Valida estrutura CommonMark
- **${AVANADE_MERMAID_LIBRARY_MD}**: Mermaid em code blocks (```)

---

## ðŸ“– REFERENCES

- **CommonMark Spec**: <https://commonmark.org/>
- **CommonMark Tutorial**: <https://commonmark.org/help/>
- **Markdown Guide**: <https://www.markdownguide.org/>
- **GitHub Flavored Markdown**: <https://github.github.com/gfm/>

---
