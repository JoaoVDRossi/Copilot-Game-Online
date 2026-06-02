## Objetivo
Processo estruturado para diagnosticar e corrigir bugs eficientemente.

---

## ðŸ› Debugging Workflow

### 1. Reproduce (Reproduzir)
**CritÃ©rio**: Confirmar bug Ã© real e reproduzÃ­vel

**Checklist**:
- [ ] **ConsistÃªncia**: Consegue reproduzir 100% das vezes?
- [ ] **Steps**: Documentar passos exatos (Given/When/Then)
- [ ] **Environment**: Dev, Staging, ProduÃ§Ã£o? VersÃ£o do app?
- [ ] **Data**: Massa de dados especÃ­fica causa o bug?
- [ ] **User/Permissions**: Bug ocorre para todos usuÃ¡rios ou role especÃ­fico?

**Template de ReproduÃ§Ã£o**:
```
BUG: Login falha com erro 500

ENVIRONMENT: Staging (v2.3.1)
USER: Role = "Admin"
BROWSER: Chrome 120

STEPS:
1. Navegar para /login
2. Preencher email: admin@test.com
3. Preencher senha: Admin@123
4. Clicar "Entrar"

EXPECTED: Redirecionar para /dashboard
ACTUAL: Erro 500 "Internal Server Error"

FREQUENCY: 10/10 tentativas
```

**Se nÃ£o consegue reproduzir**:
- âŒ **NÃ£o Ã© bug** â†’ pode ser ambiente especÃ­fico, cache, etc.
- ðŸ” **Coletar mais dados**: Logs, screenshot, video, network trace

---

### 2. Isolate (Isolar)
**CritÃ©rio**: Identificar componente/mÃ³dulo/funÃ§Ã£o com problema

**TÃ©cnicas**:

#### ðŸ”¬ Binary Search (Bisection)
Dividir e conquistar - desabilitar metade do cÃ³digo atÃ© isolar:
```
Sistema com 10 mÃ³dulos â†’ testar com 5 desabilitados
  â†’ Bug ainda ocorre â†’ problema estÃ¡ nos 5 ativos
    â†’ Desabilitar 2-3 desses â†’ repetir atÃ© isolar 1 mÃ³dulo
```

#### ðŸ“¦ Component Isolation
Testar componente isoladamente:
```
// Teste isolado do componente suspeito
const result = suspectFunction(testInput);
console.log(result); // Comportamento esperado?
```

#### ðŸ§ª Hypothesis Testing
Formular hipÃ³teses e testar:
```
HipÃ³tese 1: "Bug estÃ¡ no backend (API)"
  Teste: Chamar API diretamente via Postman
  Resultado: API retorna 500 â†’ âœ… Confirmada

HipÃ³tese 2: "Bug estÃ¡ no database query"
  Teste: Executar query diretamente no SQL
  Resultado: Query retorna dados corretos â†’ âŒ Refutada
```

**Output desta fase**: Arquivo/funÃ§Ã£o/linha suspeita

---

### 3. Analyze (Analisar)
**CritÃ©rio**: Entender **por que** bug estÃ¡ acontecendo

**Ferramentas**:

#### ðŸ“‹ Stack Trace
Ler erro de baixo para cima (call stack):
```
Error: Cannot read property 'name' of undefined
  at getUserName (user.service.ts:45)    â† origem do erro
  at processUser (user.controller.ts:23) â† chamou getUserName
  at handleRequest (app.ts:12)          â† chamou processUser
```

**Foco**: Primeira linha do **seu cÃ³digo** (nÃ£o de libs)

#### ðŸ” Debugger (Breakpoints)
Pausar execuÃ§Ã£o e inspecionar estado:
```typescript
function calculateDiscount(user: User, order: Order) {
  debugger; // â† cÃ³digo pausa aqui
  
  const discount = user.isPremium ? 0.2 : 0;
  const total = order.total * (1 - discount);
  
  return total;
}
```

**Inspecionar**:
- Valores de variÃ¡veis (`user`, `order`, `discount`)
- Call stack (quem chamou esta funÃ§Ã£o)
- Watch expressions (condiÃ§Ãµes customizadas)

#### ðŸ“Š Logging EstratÃ©gico
Adicionar logs temporÃ¡rios para rastrear fluxo:
```typescript
function processOrder(order: Order) {
  console.log('[DEBUG] processOrder START', { orderId: order.id });
  
  const validatedOrder = validateOrder(order);
  console.log('[DEBUG] After validation', { validatedOrder });
  
  const savedOrder = saveOrder(validatedOrder);
  console.log('[DEBUG] After save', { savedOrder });
  
  return savedOrder;
}
```

**Boas prÃ¡ticas**:
- Prefix: `[DEBUG]`, `[TRACE]` para fÃ¡cil remoÃ§Ã£o
- Dados relevantes: IDs, estados, valores crÃ­ticos
- Remover apÃ³s fix (nÃ£o commitar logs de debug)

#### ðŸ”¬ Network Inspector
Para bugs de API/integraÃ§Ã£o:
```
Request:
  POST /api/orders
  Headers: { Authorization: "Bearer abc123" }
  Body: { userId: 42, items: [...] }

Response:
  Status: 500
  Body: { error: "User not found" } â† aha! userId invÃ¡lido
```

---

### 4. Hypothesis (HipÃ³tese)
**CritÃ©rio**: Teorizar causa raiz baseado em anÃ¡lise

**Template de HipÃ³tese**:
```
HIPÃ“TESE: [DescriÃ§Ã£o concisa da causa raiz]
EVIDÃŠNCIA: [Dados que suportam hipÃ³tese]
TESTE: [Como validar hipÃ³tese]
```

**Exemplo**:
```
HIPÃ“TESE: User.isPremium estÃ¡ undefined causando cÃ¡lculo errado
EVIDÃŠNCIA: 
  - Stack trace aponta para user.isPremium
  - Logs mostram user = { id: 42, name: "John" } (sem isPremium)
  - Database schema mostra coluna "isPremium" foi adicionada recentemente
TESTE: 
  - Adicionar default value na migration
  - Ou adicionar fallback no cÃ³digo: user.isPremium ?? false
```

---

### 5. Fix (Corrigir)
**CritÃ©rio**: Implementar correÃ§Ã£o mÃ­nima e testÃ¡vel

**PrincÃ­pios**:
- [ ] **Minimal change**: Menor alteraÃ§Ã£o que resolve o problema
- [ ] **Root cause**: Corrige causa raiz, nÃ£o sintoma
- [ ] **Backward compatible**: NÃ£o quebra cÃ³digo existente
- [ ] **Tested**: Teste automatizado valida fix

**Exemplo de Fix**:
```typescript
// ANTES (bug):
function calculateDiscount(user: User) {
  return user.isPremium ? 0.2 : 0; // âŒ crash se isPremium undefined
}

// DEPOIS (fix):
function calculateDiscount(user: User) {
  return user.isPremium === true ? 0.2 : 0; // âœ… safe
}

// OU com fallback explÃ­cito:
function calculateDiscount(user: User) {
  const isPremium = user.isPremium ?? false; // âœ… default value
  return isPremium ? 0.2 : 0;
}
```

---

### 6. Test (Testar)
**CritÃ©rio**: Validar fix e prevenir regressÃ£o

**Checklist**:
- [ ] **Bug original**: ReproduÃ§Ã£o original agora funciona?
- [ ] **Edge cases**: Outros cenÃ¡rios relacionados ainda funcionam?
- [ ] **Regression test**: Teste automatizado adicionado
- [ ] **Code review**: Outra pessoa validou fix

**Regression Test**:
```typescript
describe('calculateDiscount', () => {
  it('should return 0 when user.isPremium is undefined', () => {
    const user = { id: 1, name: 'John' }; // sem isPremium
    
    const discount = calculateDiscount(user);
    
    expect(discount).toBe(0); // âœ… nÃ£o crashea
  });

  it('should return 0.2 when user.isPremium is true', () => {
    const user = { id: 1, name: 'Jane', isPremium: true };
    
    const discount = calculateDiscount(user);
    
    expect(discount).toBe(0.2);
  });
});
```

---

### 7. Document (Documentar)
**CritÃ©rio**: Registrar bug, causa raiz, e soluÃ§Ã£o para aprendizado

**Template de Bug Report**:
```markdown
## BUG-123: Login falha com erro 500 para novos usuÃ¡rios

### DescriÃ§Ã£o
UsuÃ¡rios criados apÃ³s 2024-01-15 nÃ£o conseguem fazer login.

### Root Cause
Migration adicionou coluna `isPremium` mas nÃ£o populou 
usuÃ¡rios existentes (NULL). CÃ³digo assumia boolean.

### Fix
- Adicionado default value `false` na migration
- CÃ³digo agora faz fallback: `user.isPremium ?? false`
- Regression test adicionado

### Prevention
- Code review checklist: validar nullable fields
- Database migrations: sempre incluir backfill para dados existentes

### Links
- PR: #456
- Commit: abc123
- Production Incident: INC-789
```

**Onde documentar**:
- **Commit message**: Detalhado (nÃ£o sÃ³ "fix bug")
- **PR description**: Root cause + fix + tests
- **Wiki/Knowledge Base**: Bugs complexos/recorrentes
- **Memory**: ${AVANADE_MEMORY_DEV_TIAGO} (padrÃµes de bugs)

---

## ðŸŽ¯ Debugging Anti-Patterns (Evitar)

### âŒ Random Changes ("Shotgun Debugging")
Mudar cÃ³digo aleatoriamente esperando que bug desapareÃ§a.

**Problema**: NÃ£o entende causa raiz, pode introduzir novos bugs.

**SoluÃ§Ã£o**: Seguir workflow sistemÃ¡tico (Reproduce â†’ Isolate â†’ Analyze)

---

### âŒ Console.log Everywhere
Poluir cÃ³digo com centenas de logs.

**Problema**: Dificulta leitura, pode gerar noise em produÃ§Ã£o.

**SoluÃ§Ã£o**: Usar debugger (breakpoints) ou logging estratÃ©gico temporÃ¡rio.

---

### âŒ Cargo Cult Fixes
Copiar soluÃ§Ã£o do StackOverflow sem entender.

**Problema**: Fix funciona mas vocÃª nÃ£o sabe por quÃª, pode quebrar depois.

**SoluÃ§Ã£o**: Entender **por que** soluÃ§Ã£o funciona antes de aplicar.

---

### âŒ Quick & Dirty Patch
Adicionar if/else para esconder sintoma ao invÃ©s de corrigir causa raiz.

**Problema**: Bug pode reaparecer em outro contexto.

**SoluÃ§Ã£o**: Identificar e corrigir causa raiz.

---

## ðŸ”§ Ferramentas por Categoria

### Frontend (Browser)
- **Chrome DevTools**: Breakpoints, network, console
- **React DevTools**: Component state/props
- **Vue DevTools**: Vuex state, component hierarchy

### Backend (Node.js/C#)
- **VS Code Debugger**: Breakpoints, watch, call stack
- **Postman**: API testing
- **SQL Client**: Database query testing

### Logging/Monitoring
- **Application Insights**: Distributed tracing, telemetria
- **Sentry**: Error tracking, stack traces
- **ELK Stack**: Log aggregation

### Performance
- **Chrome Lighthouse**: Performance profiling
- **k6**: Load testing
- **SQL Query Analyzer**: Database performance

---

## ðŸ“‹ Debugging Checklist (Quick Reference)

- [ ] **Reproduce**: Bug Ã© consistente? Steps documentados?
- [ ] **Isolate**: Qual componente/funÃ§Ã£o estÃ¡ quebrando?
- [ ] **Analyze**: Por que estÃ¡ quebrando? (stack trace, debugger, logs)
- [ ] **Hypothesis**: Qual Ã© a causa raiz?
- [ ] **Fix**: CorreÃ§Ã£o mÃ­nima que resolve root cause
- [ ] **Test**: Regression test adicionado, fix validado
- [ ] **Document**: Root cause e soluÃ§Ã£o documentados

---

## ðŸ”— IntegraÃ§Ã£o com Metodologia Avanade

- **Trigger**: Bug reportado (Jira, PagerDuty, user feedback)
- **Output**: Fix + Regression test + Documentation
- **Quality**: ${AVANADE_TASK_CODE_REVIEW}, ${AVANADE_TASK_TEST_COVERAGE}
- **MemÃ³ria**: ${AVANADE_MEMORY_DEV_TIAGO} (patterns de bugs, root causes)

