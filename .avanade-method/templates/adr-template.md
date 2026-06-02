---

## ðŸ“‹ O que Ã© este Artefato?

Este template fornece uma estrutura padronizada para documentar decisÃµes arquiteturais importantes. ADRs sÃ£o documentos imutÃ¡veis que registram:
- **O que** foi decidido
- **Por que** essa decisÃ£o foi tomada
- **Quando** a decisÃ£o foi feita
- **Quais alternativas** foram consideradas
- **Quais trade-offs** foram aceitos

---

## ðŸŽ¯ Quando Usar

Use este template quando:
- âœ… Tomar uma decisÃ£o arquitetural significativa (tecnologia, padrÃ£o, infraestrutura)
- âœ… Escolher entre mÃºltiplas opÃ§Ãµes tÃ©cnicas com trade-offs claros
- âœ… Definir padrÃµes que impactam mÃºltiplos componentes/times
- âœ… Documentar escolhas que afetam NFRs (performance, seguranÃ§a, escalabilidade)
- âœ… Reverter ou substituir uma decisÃ£o arquitetural anterior

**NÃ£o use** para decisÃµes triviais ou de implementaÃ§Ã£o de baixo nÃ­vel.

---

## ðŸ“– Estrutura do Template

### ADR-[NÃšMERO]: [TÃTULO DA DECISÃƒO]

```markdown
# ADR-[NÃšMERO]: [TÃ­tulo Conciso da DecisÃ£o]

**Status**: [Proposto | Aceito | Rejeitado | Depreciado | SubstituÃ­do por ADR-XXX]  
**Data**: YYYY-MM-DD  
**Autor(es)**: [Nome(s) do(s) Arquiteto(s)]  
**Stakeholders**: [Times/pessoas impactados]  
**Decisor**: [Quem aprovou]

---

## ðŸ“Œ Contexto

[Descreva o contexto que motivou esta decisÃ£o. O que estÃ¡ acontecendo? Por que precisamos decidir agora?]

**Fatores contextuais**:
- Requisitos de negÃ³cio relevantes
- Constraints tÃ©cnicos existentes
- Deadlines ou dependÃªncias
- Estado atual da arquitetura

---

## ðŸŽ¯ DecisÃ£o

**DecisÃ£o**: [Uma frase clara do que foi decidido]

[Descreva a decisÃ£o em detalhes: o que serÃ¡ implementado, como funcionarÃ¡, quais tecnologias/padrÃµes serÃ£o usados]

---

## ðŸ” Alternativas Consideradas

### OpÃ§Ã£o 1: [Nome da OpÃ§Ã£o]
**DescriÃ§Ã£o**: [Como funcionaria]
**PrÃ³s**:
- âœ… [Vantagem 1]
- âœ… [Vantagem 2]

**Contras**:
- âŒ [Desvantagem 1]
- âŒ [Desvantagem 2]

---

### OpÃ§Ã£o 2: [Nome da OpÃ§Ã£o]
**DescriÃ§Ã£o**: [Como funcionaria]
**PrÃ³s**:
- âœ… [Vantagem 1]
- âœ… [Vantagem 2]

**Contras**:
- âŒ [Desvantagem 1]
- âŒ [Desvantagem 2]

---

### OpÃ§Ã£o 3: [Nome da OpÃ§Ã£o] (Escolhida)
**DescriÃ§Ã£o**: [Como funcionaria]
**PrÃ³s**:
- âœ… [Vantagem 1]
- âœ… [Vantagem 2]

**Contras**:
- âŒ [Desvantagem 1]
- âŒ [Desvantagem 2]

---

## âš–ï¸ AnÃ¡lise de Trade-offs

| CritÃ©rio | OpÃ§Ã£o 1 | OpÃ§Ã£o 2 | OpÃ§Ã£o 3 (Escolhida) |
|----------|---------|---------|---------------------|
| Performance | â­â­â­ | â­â­ | â­â­â­â­ |
| Scalability | â­â­ | â­â­â­â­ | â­â­â­ |
| Cost | ðŸ’°ðŸ’°ðŸ’° | ðŸ’° | ðŸ’°ðŸ’° |
| Complexity | ðŸ”§ðŸ”§ | ðŸ”§ðŸ”§ðŸ”§ðŸ”§ | ðŸ”§ðŸ”§ðŸ”§ |
| Time to Market | ðŸš€ðŸš€ | ðŸš€ðŸš€ðŸš€ðŸš€ | ðŸš€ðŸš€ðŸš€ |
| Maintainability | â­â­â­ | â­â­ | â­â­â­â­ |

---

## ðŸ’¡ Justificativa

[Explique POR QUE a opÃ§Ã£o escolhida Ã© a melhor dado o contexto. Quais fatores foram mais importantes?]

**Fatores decisivos**:
1. [RazÃ£o principal #1]
2. [RazÃ£o principal #2]
3. [RazÃ£o principal #3]

---

## ðŸ“Š ConsequÃªncias

### Positivas
- âœ… [BenefÃ­cio esperado 1]
- âœ… [BenefÃ­cio esperado 2]
- âœ… [BenefÃ­cio esperado 3]

### Negativas (Trade-offs Aceitos)
- âš ï¸ [Trade-off 1 - como mitigar]
- âš ï¸ [Trade-off 2 - como mitigar]

### Riscos
- ðŸš¨ **[Risco 1]**: [Como mitigar]
- ðŸš¨ **[Risco 2]**: [Como mitigar]

---

## ðŸ—ï¸ ImplementaÃ§Ã£o

### Componentes Impactados
- [Componente/serviÃ§o 1]
- [Componente/serviÃ§o 2]

### MudanÃ§as NecessÃ¡rias
1. [MudanÃ§a tÃ©cnica 1]
2. [MudanÃ§a tÃ©cnica 2]
3. [MudanÃ§a de processo/documentaÃ§Ã£o]

### EsforÃ§o Estimado
- **Desenvolvimento**: [X days/sprints]
- **Testing**: [X days]
- **Deployment**: [X days]

---

## ðŸ“‹ Checklist de ValidaÃ§Ã£o

Antes de aprovar este ADR, verificar:
- [ ] Contexto claramente explicado
- [ ] Pelo menos 2-3 alternativas consideradas
- [ ] Trade-offs documentados e aceitos
- [ ] ConsequÃªncias (positivas e negativas) identificadas
- [ ] Riscos mapeados com planos de mitigaÃ§Ã£o
- [ ] Stakeholders consultados
- [ ] Alinhamento com NFRs do projeto
- [ ] Impacto em custo avaliado
- [ ] Compatibilidade com arquitetura existente verificada

---

## ðŸ”— ReferÃªncias

- [Link para requisitos relevantes]
- [Link para diagramas de arquitetura]
- [DocumentaÃ§Ã£o tÃ©cnica de tecnologias escolhidas]
- [Benchmarks ou proofs-of-concept]
- [ADRs relacionados]

---

## ðŸ“ Notas Adicionais

[Qualquer informaÃ§Ã£o adicional relevante, como limitaÃ§Ãµes conhecidas, planos futuros de revisÃ£o, etc.]
```

---

## ðŸ’¡ Exemplos de ADRs

### Exemplo 1: ADR-001 - Escolha de Database

```markdown
# ADR-001: Uso de PostgreSQL como Database Principal

**Status**: Aceito  
**Data**: 2025-01-15  
**Autor(es)**: Wilson Santos (Arquiteto)  
**Stakeholders**: Time de Backend, Time de DevOps  
**Decisor**: Wilson Santos

---

## ðŸ“Œ Contexto

O sistema de gerenciamento de pedidos precisa de um banco de dados relacional para armazenar:
- Cadastro de clientes e produtos
- HistÃ³rico de pedidos e transaÃ§Ãµes
- Relacionamentos complexos entre entidades

**Fatores contextuais**:
- Volume esperado: 1M de transaÃ§Ãµes/mÃªs
- Necessidade de ACID compliance
- Time jÃ¡ tem experiÃªncia com SQL
- Budget limitado (preferÃªncia por open-source)

---

## ðŸŽ¯ DecisÃ£o

**DecisÃ£o**: Utilizaremos PostgreSQL 15+ como database principal do sistema.

Implementaremos PostgreSQL com:
- Connection pooling (PgBouncer)
- Read replicas para queries de leitura intensiva
- Backup automatizado diÃ¡rio
- Partitioning para tabelas de histÃ³rico

---

## ðŸ” Alternativas Consideradas

### OpÃ§Ã£o 1: MySQL 8.0
**PrÃ³s**:
- âœ… Time tem mais experiÃªncia
- âœ… Comunidade maior

**Contras**:
- âŒ JSON support inferior ao PostgreSQL
- âŒ Window functions menos robustas

---

### OpÃ§Ã£o 2: SQL Server
**PrÃ³s**:
- âœ… IntegraÃ§Ã£o nativa com stack Microsoft
- âœ… Ferramentas empresariais robustas

**Contras**:
- âŒ Custo de licenciamento alto
- âŒ Lock-in com Microsoft

---

### OpÃ§Ã£o 3: PostgreSQL (Escolhida)
**PrÃ³s**:
- âœ… Open-source (zero custo de licenÃ§a)
- âœ… JSON/JSONB support excelente
- âœ… Window functions completas
- âœ… ExtensÃµes (PostGIS, pg_stat_statements)

**Contras**:
- âŒ Curva de aprendizado para alguns membros do time
- âŒ Menos ferramentas GUI comparado a MySQL

---

## ðŸ’¡ Justificativa

PostgreSQL foi escolhido por:
1. **Custo**: Open-source elimina licenciamento
2. **Features**: JSON support serÃ¡ crÃ­tico para integraÃ§Ã£o com APIs externas
3. **Performance**: Benchmarks mostraram 20% melhor performance em queries complexas
4. **Comunidade**: Ativa e em crescimento, com bom suporte

---

## ðŸ“Š ConsequÃªncias

### Positivas
- âœ… Economia de $15k/ano em licenÃ§as
- âœ… Flexibilidade com JSON data
- âœ… Performance otimizada para analytics

### Negativas (Trade-offs Aceitos)
- âš ï¸ 2 membros do time precisarÃ£o de 1 semana de treinamento

### Riscos
- ðŸš¨ **Expertise inicial limitada**: Mitigado com treinamento e documentaÃ§Ã£o interna
```

---

### Exemplo 2: ADR-002 - Microservices vs Monolith

```markdown
# ADR-002: Arquitetura MonolÃ­tica Modular para MVP

**Status**: Aceito  
**Data**: 2025-02-01  
**DecisÃ£o**: Iniciaremos com monolito modular, com plano de evoluÃ§Ã£o para microservices.

**Justificativa**:
- Time pequeno (5 devs)
- Time-to-market crÃ­tico (4 meses)
- DomÃ­nio ainda sendo descoberto
- Infraestrutura de microservices adiciona complexidade desnecessÃ¡ria no MVP

**Plano de EvoluÃ§Ã£o**:
ApÃ³s 6 meses de produÃ§Ã£o, reavaliaremos para potencial migraÃ§Ã£o de mÃ³dulos especÃ­ficos (pagamentos, notificaÃ§Ãµes) para microservices baseado em:
- Volume de trÃ¡fego por mÃ³dulo
- Necessidade de escala independente
- Maturidade do domÃ­nio
```

---

## âœ… Boas PrÃ¡ticas

### NumeraÃ§Ã£o
- Use numeraÃ§Ã£o sequencial: ADR-001, ADR-002, etc.
- Mantenha registro em `docs/adr/` no repositÃ³rio
- Crie Ã­ndice em `docs/adr/README.md`

### Escrita
- âœ… Seja conciso mas completo
- âœ… Use linguagem objetiva (evite jargÃ£o excessivo)
- âœ… Documente o CONTEXTO (nÃ£o sÃ³ a decisÃ£o)
- âœ… Sempre liste alternativas consideradas
- âœ… Seja honesto sobre trade-offs

### Processo
- âœ… ADRs sÃ£o **imutÃ¡veis** - nÃ£o delete ou edite apÃ³s aprovaÃ§Ã£o
- âœ… Se decisÃ£o mudar, crie novo ADR e marque o antigo como "SubstituÃ­do por ADR-XXX"
- âœ… Revise ADRs em arquiteture review meetings
- âœ… Use pull requests para revisar ADRs antes de aprovar

---

## ðŸ”— IntegraÃ§Ã£o com Outros Artefatos

- **${AVANADE_ARCHITECTURE_TEMPLATE}**: ADRs detalham decisÃµes mencionadas na arquitetura
- **${AVANADE_MEMORY_ARCHITECT_WILSON}**: ADRs alimentam a memÃ³ria com decisÃµes histÃ³ricas
- **${AVANADE_TASK_ARCHITECTURE_QUALITY}**: ADRs sÃ£o validados com este checklist

---

## ðŸ“š ReferÃªncias

- [Documenting Architecture Decisions - Michael Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [ADR GitHub Organization](https://adr.github.io/)
- [When to Use ADRs](https://www.thoughtworks.com/radar/techniques/lightweight-architecture-decision-records)

---
