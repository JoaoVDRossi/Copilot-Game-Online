### Stakeholder Profiles Recorrentes
_SerÃ¡ preenchido durante descobertas_

**Exemplo**:
```yaml
- name: "CFO Type"
  characteristics:
    - Foco em ROI e mÃ©tricas financeiras
    - Prefere dados quantitativos
    - Disponibilidade limitada
  engagement_strategy: "Apresentar business case com ROI claro, reuniÃµes curtas (30min max)"
  
- name: "End User Type"
  characteristics:
    - Foco em usabilidade
    - Feedback qualitativo rico
    - Resistente a mudanÃ§as
  engagement_strategy: "Envolver cedo, protÃ³tipos clicÃ¡veis, comunicar benefÃ­cios"
```

---

### Requirements Patterns Identificados
_PadrÃµes de requisitos que aparecem frequentemente_

**Exemplo**:
```yaml
- pattern: "Export to Excel"
  frequency: "Alta (80% dos projetos)"
  notes: "Stakeholders sempre pedem export de dados para Excel/CSV"
  recommendation: "Incluir proativamente no discovery inicial"
  
- pattern: "Auditoria/Log de AÃ§Ãµes"
  frequency: "MÃ©dia (50% dos projetos enterprise)"
  notes: "Compliance/regulatÃ³rio exige rastreabilidade"
  recommendation: "Perguntar sobre requirements regulatÃ³rios no Discovery Protocol"
```

---

### Discovery Insights HistÃ³ricos
_Aprendizados de descobertas anteriores_

**Exemplo**:
```yaml
- project: "Portal Cliente v2"
  date: "2024-01-15"
  insight: "UsuÃ¡rios queriam notificaÃ§Ãµes push mas nÃ£o tinham habilitadas. Real need: dashboard com resumo."
  lesson: "Validar assumptions com protÃ³tipo, nÃ£o apenas entrevistas"
  
- project: "CRM Integration"
  date: "2024-02-01"
  insight: "5 stakeholders, 5 definiÃ§Ãµes diferentes de 'cliente'"
  lesson: "GlossÃ¡rio de termos crÃ­tico em discovery - criar upfront"
```

---

### Elicitation Techniques Validadas
_TÃ©cnicas que funcionaram bem_

**Exemplo**:
```yaml
- technique: "Jobs-to-be-Done"
  effectiveness: "Alta"
  best_for: "Features de produto (entender motivaÃ§Ã£o real)"
  notes: "Framework 'Quando [situaÃ§Ã£o], quero [aÃ§Ã£o], para que [benefÃ­cio]' revelou requisitos ocultos"
  
- technique: "Five Whys"
  effectiveness: "MÃ©dia-Alta"
  best_for: "Problemas recorrentes, root cause analysis"
  notes: "Funciona melhor com stakeholders tÃ©cnicos, evitar com executivos (impaciÃªncia)"
```

---

## ðŸŽ¯ User Personas Recorrentes
_Personas que aparecem em mÃºltiplos projetos_

**Exemplo**:
```yaml
- name: "Sarah, Gerente de Vendas"
  demographics: "35-50 anos, uso diÃ¡rio de CRM, mobile-first"
  goals:
    - Fechar vendas rapidamente
    - Acessar dados de clientes em movimento
  pain_points:
    - Sistema atual lento em mobile
    - Dados desatualizados
  tech_savviness: "MÃ©dia (usa smartphone mas resiste a novos sistemas)"
  reuse_count: 3
  notes: "Persona recorrente em projetos de CRM/Vendas"
```

---

## ðŸ§ª Assumption Testing Results
_Premissas testadas e seus resultados_

**Exemplo**:
```yaml
- assumption: "UsuÃ¡rios querem dashboard customizÃ¡vel"
  test_method: "Survey com 50 usuÃ¡rios"
  result: "âŒ REFUTADA - 70% preferem dashboard pre-configurado (menos trabalho)"
  impact: "Removido customizaÃ§Ã£o, foco em views prÃ©-definidas inteligentes"
  
- assumption: "Mobile Ã© prioridade (60% do trÃ¡fego)"
  test_method: "Analytics Ãºltimos 6 meses"
  result: "âœ… CONFIRMADA - 62% mobile, 38% desktop"
  impact: "Design mobile-first adotado"
```

---

## ðŸ“‹ Pain Points Recorrentes
_Problemas que aparecem frequentemente_

**Exemplo**:
```yaml
- pain: "Dados duplicados entre sistemas"
  frequency: "Alta"
  typical_cause: "Falta de integraÃ§Ã£o, entry manual em mÃºltiplos sistemas"
  solution_pattern: "API integration ou Master Data Management"
  
- pain: "RelatÃ³rios demoram muito"
  frequency: "MÃ©dia"
  typical_cause: "Queries nÃ£o otimizadas, dados nÃ£o agregados"
  solution_pattern: "Data warehouse, OLAP cubes, caching"
```

---

## ðŸ”„ Retrospective Learnings
_O que melhorar em prÃ³ximos discoveries_

**Exemplo**:
```yaml
- learning: "Envolver TI/Infra mais cedo"
  date: "2024-01-20"
  context: "Requisitos de integraÃ§Ã£o descobertos tarde â†’ delay de 2 sprints"
  action: "Adicionar pergunta sobre integraÃ§Ãµes no Discovery Protocol inicial"
  
- learning: "ProtÃ³tipos clicÃ¡veis > wireframes estÃ¡ticos"
  date: "2024-02-05"
  context: "Stakeholders nÃ£o entenderam fluxo atÃ© verem protÃ³tipo Figma interativo"
  action: "Investir tempo em protÃ³tipos clicÃ¡veis (Figma, InVision) para validaÃ§Ã£o"
```

---

## ðŸ“– Templates & Checklists Customizados
_VariaÃ§Ãµes do Discovery Protocol que funcionaram bem_

**Exemplo**:
```yaml
- template: "Discovery Protocol - E-commerce"
  customization: "Adicionadas perguntas sobre payment gateways, shipping, inventory"
  success_rate: "Alta"
  file: "discovery-ecommerce-template.yaml"
  
- template: "Discovery Protocol - Compliance/RegulatÃ³rio"
  customization: "Foco em LGPD, auditoria, data retention"
  success_rate: "MÃ©dia-Alta"
  file: "discovery-compliance-template.yaml"
```

---

## ðŸ”— Cross-References
_Links para artefatos relacionados_

- Discovery Template: `${AVANADE_DISCOVERY_TEMPLATE_YAML}`
- Advanced Elicitation Task: `${AVANADE_TASK_ADVANCED_ELICITATION}`
- Editorial Review: `${AVANADE_TASK_EDITORIAL_REVIEW_PROSE}`

---

## ðŸ“Œ Como Usar Esta MemÃ³ria

### âœ… ANTES de executar Discovery:
1. Consultar **Stakeholder Profiles** â†’ identificar tipos similares
2. Revisar **Requirements Patterns** â†’ antecipar needs comuns
3. Escolher **Elicitation Technique** adequada ao contexto
4. Revisar **Retrospective Learnings** â†’ evitar erros passados

### âœ… DURANTE Discovery:
1. Validar **Assumptions** early (nÃ£o assumir)
2. Mapear **Pain Points** recorrentes
3. Reutilizar **Personas** se aplicÃ¡vel

### âœ… APÃ“S Discovery:
1. **Atualizar memÃ³ria** com novos insights
2. Documentar **Lessons Learned**
3. Adicionar **Patterns** identificados
4. Atualizar **Elicitation Techniques** (o que funcionou/nÃ£o funcionou)

---
