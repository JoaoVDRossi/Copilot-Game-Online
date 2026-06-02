## 🔍 Checklist de Code Review

### 1. Funcionalidade

- [ ] **Código faz o que deveria fazer?**
  - Aceita inputs especificados
  - Produz outputs esperados
  - Edge cases tratados

- [ ] **Requisitos atendidos?**
  - Acceptance criteria satisfeitos
  - Story/issue completamente implementada
  - Nenhum requisito esquecido

- [ ] **Comportamento correto em erros?**
  - Exceções tratadas adequadamente
  - Mensagens de erro úteis
  - Fallbacks funcionais

### 2. Legibilidade & Manutenibilidade

- [ ] **Código fácil de entender?**
  - Nomes descritivos (variáveis, funções, classes)
  - Funções pequenas e focadas (< 20 linhas ideal)
  - Comentários explicam "porquê", não "o quê"

- [ ] **Princípios SOLID respeitados?**
  - Single Responsibility
  - Open/Closed
  - Liskov Substitution
  - Interface Segregation
  - Dependency Inversion

- [ ] **Código DRY?**
  - Sem duplicação desnecessária
  - Abstrações onde faz sentido
  - Utilities reutilizáveis extraídos

### 3. Arquitetura & Design

- [ ] **Padrões do projeto seguidos?**
  - Arquitetura estabelecida respeitada
  - Convenções de diretório/arquivo
  - Padrões de design apropriados

- [ ] **Separação de concerns?**
  - UI separada de lógica
  - Data access isolado
  - Business logic centralizada

- [ ] **Dependências adequadas?**
  - Não adiciona dependencies desnecessárias
  - Versões compatíveis
  - Licenças apropriadas

### 4. Segurança

- [ ] **Input validation presente?**
  - Sanitização de user input
  - Proteção contra injection
  - Validação de tipos

- [ ] **Dados sensíveis protegidos?**
  - Sem secrets hardcoded
  - Encryption onde necessário
  - PII tratada adequadamente

- [ ] **Auth/Authz verificados?**
  - Autenticação antes de ações
  - Permissões checadas
  - Session handling seguro

### 5. Performance

- [ ] **Algoritmos eficientes?**
  - Complexidade adequada (Big O)
  - Estruturas de dados apropriadas
  - Sem operações desnecessárias

- [ ] **Database queries otimizadas?**
  - Índices utilizados
  - N+1 evitado
  - Pagination implementada

- [ ] **Resources gerenciados?**
  - Connections fechadas
  - Memory não vazando
  - Cache usado adequadamente

### 6. Testes

- [ ] **Testes adequados incluídos?**
  - Unit tests para nova lógica
  - Integration tests se necessário
  - Edge cases cobertos

- [ ] **Testes existentes passando?**
  - CI/CD verde
  - Nenhum teste quebrado
  - Cobertura não diminuiu

- [ ] **Testes são bons?**
  - Testam comportamento, não implementação
  - Nomes descritivos
  - Independentes entre si

### 7. Documentação

- [ ] **Código auto-documentado?**
  - APIs bem nomeadas
  - Types/interfaces claros
  - JSDoc/docstrings onde útil

- [ ] **README atualizado?**
  - Novas features documentadas
  - Setup instructions corretas
  - Breaking changes notadas

- [ ] **CHANGELOG atualizado?**
  - Entry para mudança
  - Versão apropriada
  - Link para PR/issue

### 8. Estilo & Convenções

- [ ] **Linter/Formatter passando?**
  - Sem warnings ignorados
  - Estilo consistente
  - Config files respeitados

- [ ] **Commit messages bons?**
  - Conventional commits format
  - Mensagens descritivas
  - Issue referenciada

---

## 🎯 Níveis de Severidade de Feedback

| Nível   | Tag | Significado            | Ação                  |
| ------- | --- | ---------------------- | --------------------- |
| Blocker | 🛑  | Impede merge           | DEVE ser corrigido    |
| Major   | ⚠️  | Problema significativo | DEVERIA ser corrigido |
| Minor   | 💡  | Melhoria sugerida      | PODE ser corrigido    |
| Nitpick | 🔍  | Preferência/estilo     | OPCIONAL              |

---

## 📝 Template de Comentário

```markdown
**[🛑/⚠️/💡/🔍] [Categoria]**: [Descrição breve]

[Explicação do problema]

**Sugestão**:
\`\`\`[language]
// código sugerido
\`\`\`

**Referência**: [link ou doc se aplicável]
```

---

## ✅ Checklist Rápido para Autor (Self-Review)

Antes de solicitar review:

- [ ] CI/CD passando
- [ ] Testes adicionados/atualizados
- [ ] Self-review feito
- [ ] PR description completa
- [ ] Screenshots se UI mudou
- [ ] Breaking changes documentadas

---

## 🔗 Relacionamentos

- **Usado por**: ${AVANADE_MEMORY_DEV_TIAGO}, ${AVANADE_MEMORY_ARCHITECT_WILSON}
- **Complementa**: ${AVANADE_TASK_CLEAN_CODE}, ${AVANADE_TASK_ADVERSARIAL_REVIEW}
- **Workflow**: ${AVANADE_WORKFLOW_GUIDE_CODE_REVIEW}
