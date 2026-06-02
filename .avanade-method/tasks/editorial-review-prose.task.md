## 📋 Objetivo

Checklist para revisão editorial de prosa em documentação, comentários de código, mensagens de commit, e qualquer texto voltado para humanos. Garante clareza, consistência e profissionalismo na comunicação escrita.

---

## 🔍 Checklist de Revisão de Prosa

### 1. Clareza & Compreensão

- [ ] **Linguagem clara e direta?**
  - Frases curtas (idealmente < 25 palavras)
  - Uma ideia por frase
  - Voz ativa preferida

- [ ] **Jargão necessário explicado?**
  - Acrônimos expandidos no primeiro uso
  - Termos técnicos com definição
  - Glossário se muitos termos

- [ ] **Audiência considerada?**
  - Tom apropriado (técnico vs. executivo)
  - Nível de detalhe adequado
  - Contexto suficiente fornecido

### 2. Estrutura & Organização

- [ ] **Hierarquia lógica de informação?**
  - Mais importante primeiro
  - Agrupamento temático
  - Progressão natural

- [ ] **Formatação aid leitura?**
  - Headings descritivos
  - Bullets para listas
  - Parágrafos curtos (3-5 linhas)

- [ ] **Transições suaves?**
  - Conectivos entre seções
  - Referências cruzadas claras
  - Fluxo narrativo

### 3. Precisão & Consistência

- [ ] **Informações verificadas?**
  - Dados/números corretos
  - Links funcionando
  - Referências existem

- [ ] **Terminologia consistente?**
  - Mesmo termo para mesmo conceito
  - Capitalização uniforme
  - Formatação padrão (code, bold, etc.)

- [ ] **Versão/data atualizadas?**
  - Timestamps corretos
  - Versões refletem estado atual
  - "TODO" items resolvidos

### 4. Gramática & Estilo

- [ ] **Gramática correta?**
  - Concordância verbal/nominal
  - Pontuação adequada
  - Sem erros de digitação

- [ ] **Estilo consistente?**
  - Mesma pessoa verbal (nós vs. você)
  - Mesmo tempo verbal
  - Mesmo nível de formalidade

- [ ] **Linguagem inclusiva?**
  - Evita termos excludentes
  - Exemplos diversos
  - Acessível para todos

### 5. Comentários de Código

- [ ] **Comments explicam "porquê", não "o quê"?**
  - Código deve ser auto-explicativo
  - Comments para decisões não óbvias
  - TODOs com contexto

- [ ] **Naming conventions seguidas?**
  - Variables/functions descritivas
  - Consistente com codebase
  - CamelCase/snake_case apropriado

- [ ] **README atualizado?**
  - Setup instructions funcionam
  - Examples atualizados
  - Contributing guide presente

### 6. Commit Messages

- [ ] **Formato padrão seguido?**
  - Tipo: feat/fix/docs/refactor/test
  - Scope quando relevante
  - Descrição imperativa

- [ ] **Mensagem útil para histórico?**
  - Explica mudança, não código
  - Referencia issue/ticket
  - Menciona breaking changes

### 7. Documentação Técnica

- [ ] **Completude verificada?**
  - Todos os endpoints documentados
  - Parâmetros explicados
  - Return values descritos

- [ ] **Exemplos funcionais?**
  - Code snippets testados
  - Outputs reais mostrados
  - Error cases incluídos

---

## 🎯 Critérios de Aprovação

| Aspecto         | Mínimo Aceitável            |
| --------------- | --------------------------- |
| Typos/Gramática | Zero erros                  |
| Clareza         | Compreensível na 1ª leitura |
| Completude      | Todas seções preenchidas    |
| Atualização     | Informação corrente         |
| Consistência    | 100% uniforme               |

---

## 📝 Exemplos

### ❌ Antes (Ruim)

```
// loop through the array
for (let i = 0; i < users.length; i++) {
  // check if user is admin
  if (users[i].isAdmin) {
    // do something
    processAdmin(users[i]);
  }
}
```

### ✅ Depois (Bom)

```javascript
// Admin users require special handling for audit compliance (SEC-2024-001)
const adminUsers = users.filter((user) => user.isAdmin);
adminUsers.forEach(processAdmin);
```

---

## 🔗 Relacionamentos

- **Usado por**: ${AVANADE_MEMORY_DEV_TIAGO}, ${AVANADE_MEMORY_TECH_WRITER_PAIGE}
- **Complementa**: ${AVANADE_TASK_EDITORIAL_REVIEW_STRUCTURE}
- **Baseado em**: Technical Writing Best Practices, Microsoft Style Guide
