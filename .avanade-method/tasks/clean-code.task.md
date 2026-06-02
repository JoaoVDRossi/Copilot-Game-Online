## Objetivo
Validar cÃ³digo contra princÃ­pios de Clean Code, SOLID, e best practices.

---

## ðŸ’Ž Clean Code Principles

### 1. Meaningful Names (Nomes Significativos)
**CritÃ©rio**: Nomes revelam intenÃ§Ã£o, evitam desinformaÃ§Ã£o

**Checklist**:
- [ ] **Classes**: Substantivos (User, OrderService, ProductRepository)
- [ ] **Methods**: Verbos (calculateTotal, sendEmail, validateInput)
- [ ] **Booleans**: Predicados (isActive, hasPermission, canEdit)
- [ ] **Evita**:  - AbreviaÃ§Ãµes (`usr` â†’ `user`)
  - Nomes genÃ©ricos (`data`, `info`, `temp`)
  - NÃºmeros mÃ¡gicos (`status === 2` â†’ `status === OrderStatus.SHIPPED`)

**Exemplos**:
```typescript
âŒ Ruim:
function d(n: number): number { return n * 365; }

âœ… Bom:
function daysToYears(days: number): number { 
  return days / DAYS_PER_YEAR; 
}
```

---

### 2. Functions (FunÃ§Ãµes Pequenas e Focadas)
**CritÃ©rio**: Uma funÃ§Ã£o faz uma coisa e faz bem

**Checklist**:
- [ ] **Tamanho**: <20 linhas (ideal), mÃ¡x 50 linhas
- [ ] **Single Responsibility**: Faz apenas 1 coisa
- [ ] **NÃ­vel de abstraÃ§Ã£o**: Consistente (nÃ£o mistura alto e baixo nÃ­vel)
- [ ] **ParÃ¢metros**: â‰¤3 parÃ¢metros (ideal 0-2)
- [ ] **Side effects**: Evita efeitos colaterais escondidos
- [ ] **Command-Query Separation**: FunÃ§Ã£o faz OU retorna, nÃ£o ambos

**Exemplo**:
```typescript
âŒ Ruim (faz demais):
function processOrder(order: Order) {
  validateOrder(order);
  saveOrder(order);
  sendEmail(order.customer.email);
  updateInventory(order.items);
  logAnalytics(order);
}

âœ… Bom (orquestra funÃ§Ãµes menores):
function processOrder(order: Order) {
  const validatedOrder = validateOrder(order);
  const savedOrder = saveOrder(validatedOrder);
  notifyOrderPlaced(savedOrder);
  return savedOrder;
}
```

---

### 3. Comments (ComentÃ¡rios Ãšteis)
**CritÃ©rio**: CÃ³digo se explica, comentÃ¡rios explicam "por quÃª"

**Checklist**:
- [ ] **Evita comentÃ¡rios Ã³bvios**: CÃ³digo auto-explicativo
- [ ] **Explica "por quÃª"**: DecisÃµes, trade-offs, workarounds
- [ ] **TODOs**: RastreÃ¡veis (com ticket/issue)
- [ ] **Warnings**: ConsequÃªncias crÃ­ticas
- [ ] **JSDoc/Docstrings**: APIs pÃºblicas documentadas

**Exemplos**:
```typescript
âŒ Ruim (comentÃ¡rio Ã³bvio):
// Incrementa contador
counter++;

âœ… Bom (explica "por quÃª"):
// Workaround: API retorna null ao invÃ©s de array vazio
// Removendo apÃ³s migraÃ§Ã£o para v2 (ticket JIRA-123)
const items = response.items || [];

âœ… Bom (warning crÃ­tico):
// ATENÃ‡ÃƒO: Alterar ordem dessas operaÃ§Ãµes causa race condition
// Ver: https://github.com/org/repo/issues/456
await lockResource();
await updateDatabase();
await unlockResource();
```

---

### 4. Error Handling (Tratamento de Erros)
**CritÃ©rio**: Erros sÃ£o first-class citizens, nÃ£o afterthoughts

**Checklist**:
- [ ] **Try-catch**: Em operaÃ§Ãµes crÃ­ticas (DB, API, I/O)
- [ ] **Error boundaries**: UI nÃ£o quebra totalmente
- [ ] **Mensagens Ãºteis**: Contexto suficiente para debug
- [ ] **Logging**: Erros logados com severity adequada
- [ ] **Fail fast**: ValidaÃ§Ã£o early, falha rÃ¡pida
- [ ] **Evita silent failures**: Sempre handle ou propague

**Exemplos**:
```typescript
âŒ Ruim (ignora erro):
try {
  await updateUser(userId, data);
} catch (e) {
  // ignorado
}

âœ… Bom (trata adequadamente):
try {
  await updateUser(userId, data);
} catch (error) {
  logger.error('Failed to update user', { 
    userId, 
    error: error.message, 
    stack: error.stack 
  });
  throw new UserUpdateError('Could not update user profile', { cause: error });
}
```

---

## ðŸ—ï¸ SOLID Principles

### S - Single Responsibility Principle
**CritÃ©rio**: Classe tem uma Ãºnica razÃ£o para mudar

```typescript
âŒ Ruim (mÃºltiplas responsabilidades):
class User {
  saveToDatabase() { /* DB logic */ }
  sendWelcomeEmail() { /* Email logic */ }
  validateData() { /* Validation logic */ }
}

âœ… Bom (separado):
class User { /* apenas dados */ }
class UserRepository { saveToDatabase() {} }
class EmailService { sendWelcomeEmail() {} }
class UserValidator { validate() {} }
```

### O - Open/Closed Principle
**CritÃ©rio**: Aberto para extensÃ£o, fechado para modificaÃ§Ã£o

```typescript
âŒ Ruim (precisa modificar para adicionar tipo):
function calculateDiscount(user: User) {
  if (user.type === 'premium') return 0.2;
  if (user.type === 'vip') return 0.3;
}

âœ… Bom (extensÃ­vel via polimorfismo):
interface DiscountStrategy {
  calculate(amount: number): number;
}
class PremiumDiscount implements DiscountStrategy { /* ... */ }
class VIPDiscount implements DiscountStrategy { /* ... */ }
```

### L - Liskov Substitution Principle
**CritÃ©rio**: Subtipos devem ser substituÃ­veis por seus tipos base

```typescript
âŒ Ruim (quebra contrato):
class Bird { fly() { /* ... */ } }
class Penguin extends Bird { 
  fly() { throw new Error('Cannot fly'); } // âŒ
}

âœ… Bom (design correto):
interface Bird {}
interface FlyingBird extends Bird { fly(); }
class Sparrow implements FlyingBird { fly() { /* ... */ } }
class Penguin implements Bird { swim() { /* ... */ } }
```

### I - Interface Segregation Principle
**CritÃ©rio**: Interfaces especÃ­ficas melhor que genÃ©ricas

```typescript
âŒ Ruim (interface genÃ©rica):
interface Worker {
  work();
  eat();
  sleep();
}
class Robot implements Worker {
  work() { /* ok */ }
  eat() { throw new Error(); } // âŒ robÃ´ nÃ£o come
  sleep() { throw new Error(); } // âŒ robÃ´ nÃ£o dorme
}

âœ… Bom (interfaces especÃ­ficas):
interface Workable { work(); }
interface Eatable { eat(); }
interface Sleepable { sleep(); }
class Robot implements Workable { work() {} }
class Human implements Workable, Eatable, Sleepable { /* ... */ }
```

### D - Dependency Inversion Principle
**CritÃ©rio**: Dependa de abstraÃ§Ãµes, nÃ£o de implementaÃ§Ãµes concretas

```typescript
âŒ Ruim (dependÃªncia concreta):
class UserService {
  private db = new MySQLDatabase(); // âŒ acoplado ao MySQL
}

âœ… Bom (dependÃªncia abstrata):
interface Database { save(data: any): void; }
class UserService {
  constructor(private db: Database) {} // âœ… aceita qualquer DB
}
```

---

## ðŸ§ª Testing (Testabilidade)

### Checklist
- [ ] **Unit Tests**: Coverage â‰¥ 80%
- [ ] **Test Pyramid**: Maioria unit, alguns integration, poucos E2E
- [ ] **Fast tests**: Suite completa <10s (unit), <5min (integration)
- [ ] **Isolated**: Testes independentes (ordem nÃ£o importa)
- [ ] **DeterminÃ­sticos**: Sem flakiness, sempre mesmo resultado
- [ ] **Readable**: Testes sÃ£o documentaÃ§Ã£o viva

**Exemplo de Bom Teste**:
```typescript
describe('OrderService.calculateTotal', () => {
  it('should sum item prices when no discount', () => {
    // ARRANGE
    const items = [
      { price: 10, quantity: 2 }, // 20
      { price: 5, quantity: 3 },  // 15
    ];
    
    // ACT
    const total = OrderService.calculateTotal(items);
    
    // ASSERT
    expect(total).toBe(35);
  });

  it('should apply 10% discount for premium users', () => {
    const items = [{ price: 100, quantity: 1 }];
    const user = { type: 'premium' };
    
    const total = OrderService.calculateTotal(items, user);
    
    expect(total).toBe(90); // 100 - 10%
  });
});
```

---

## ðŸ”’ Security

### Checklist
- [ ] **Input validation**: Sanitize/validate todos inputs
- [ ] **SQL Injection**: Usar prepared statements/ORMs
- [ ] **XSS Prevention**: Escape output, CSP headers
- [ ] **Authentication**: Tokens seguros, sessions gerenciadas
- [ ] **Secrets**: Nunca hardcoded, usar env vars ou Key Vault
- [ ] **HTTPS**: Sempre TLS em produÃ§Ã£o
- [ ] **Dependencies**: Audit regular (npm audit, Snyk)

---

## âš¡ Performance

### Checklist
- [ ] **N+1 Queries**: Evitar loops com queries
- [ ] **Caching**: Dados caros/frequentes em cache
- [ ] **Lazy Loading**: Carregar apenas quando necessÃ¡rio
- [ ] **Pagination**: NÃ£o retornar datasets gigantes
- [ ] **Indexes**: Database queries otimizadas
- [ ] **Profiling**: Identificar bottlenecks (APM tools)

---

## ðŸ“Š Scoring System

**Pontos por categoria**:
- Meaningful Names: /10
- Functions: /10
- Comments: /10
- Error Handling: /10
- SOLID: /10
- Testing: /10
- Security: /10
- Performance: /10

**Total: /80**

**InterpretaÃ§Ã£o**:
- **70-80**: âœ… Production-Ready Code
- **50-69**: ðŸŸ¡ Bom, melhorias menores
- **30-49**: ðŸŸ  Precisa refactoring
- **0-29**: ðŸ”´ NÃ£o mergeÃ¡vel

---

## ðŸ”— IntegraÃ§Ã£o com Metodologia Avanade

- **PrÃ©-requisito**: CÃ³digo implementado
- **Uso**: Code review, DoD validation
- **Complementa**: ${AVANADE_TASK_CODE_REVIEW}, ${AVANADE_TASK_TEST_COVERAGE}
- **MemÃ³ria**: Atualizar ${AVANADE_MEMORY_DEV_TIAGO}
