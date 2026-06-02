## 📋 Objetivo

Guia para aplicar Boundary Value Analysis (BVA) em testes. Técnica de design de casos de teste que foca nos limites de partições de equivalência, onde erros são mais prováveis.

---

## 🎯 Por que Boundary Values?

- **80% dos bugs** ocorrem em condições de limite
- **Off-by-one errors** são extremamente comuns
- **Operadores de comparação** (<, <=, >, >=) frequentemente errados
- Eficiência: **Menos testes, mais bugs encontrados**

---

## 📖 Conceitos Fundamentais

### Boundary Points

Para qualquer range [a, b]:

| Ponto          | Valor   | Descrição                |
| -------------- | ------- | ------------------------ |
| Minimum        | a       | Menor valor válido       |
| Just below min | a-1     | Primeiro inválido abaixo |
| Just above min | a+1     | Segundo válido           |
| Nominal        | (a+b)/2 | Valor típico do meio     |
| Just below max | b-1     | Penúltimo válido         |
| Maximum        | b       | Maior valor válido       |
| Just above max | b+1     | Primeiro inválido acima  |

---

## 🔍 Checklist de Boundary Value Analysis

### 1. Identificar Input Domains

- [ ] **Ranges numéricos identificados?**
  - Idade: 0-120
  - Quantidade: 1-100
  - Preço: 0.01-9999.99

- [ ] **String lengths identificados?**
  - Username: 3-20 chars
  - Password: 8-128 chars
  - Description: 0-5000 chars

- [ ] **Date ranges identificados?**
  - Data início: > hoje
  - Data fim: < 2099-12-31
  - Intervalo: 1-365 dias

- [ ] **Collection sizes identificados?**
  - Items no carrinho: 1-50
  - Arquivos upload: 1-10
  - Resultados por página: 10-100

### 2. Gerar Test Values

- [ ] **Para cada boundary, gerar valores?**
  - AT boundary (valor exato)
  - Just BELOW boundary
  - Just ABOVE boundary

- [ ] **Valores nominais incluídos?**
  - Valor típico no meio do range
  - Casos de uso mais comuns

- [ ] **Valores especiais considerados?**
  - Zero
  - Negative (se aplicável)
  - Empty/null
  - Maximum system value

### 3. Two-Value vs Three-Value BVA

**Two-Value BVA** (mínimo):

```
Para range [1, 100]:
Test: 1, 100
```

**Three-Value BVA** (recomendado):

```
Para range [1, 100]:
Test: 0, 1, 2, 99, 100, 101
```

- [ ] **Three-Value BVA aplicado para inputs críticos?**
- [ ] **Two-Value BVA aceitável para inputs menos críticos?**

### 4. Combinação com Equivalence Partitioning

- [ ] **Partições identificadas?**
  - Válidos: dentro do range
  - Inválidos below: abaixo do mínimo
  - Inválidos above: acima do máximo

- [ ] **Boundaries de cada partição testados?**

---

## 📊 Templates de Test Cases

### Numeric Range

**Exemplo: Idade (válido: 18-65)**

| ID   | Input | Expected | Boundary  |
| ---- | ----- | -------- | --------- |
| TC01 | 17    | Reject   | Below min |
| TC02 | 18    | Accept   | At min    |
| TC03 | 19    | Accept   | Above min |
| TC04 | 40    | Accept   | Nominal   |
| TC05 | 64    | Accept   | Below max |
| TC06 | 65    | Accept   | At max    |
| TC07 | 66    | Reject   | Above max |

### String Length

**Exemplo: Username (válido: 3-20 chars)**

| ID   | Input    | Length | Expected | Boundary  |
| ---- | -------- | ------ | -------- | --------- |
| TC01 | "ab"     | 2      | Reject   | Below min |
| TC02 | "abc"    | 3      | Accept   | At min    |
| TC03 | "abcd"   | 4      | Accept   | Above min |
| TC04 | 19 chars | 19     | Accept   | Below max |
| TC05 | 20 chars | 20     | Accept   | At max    |
| TC06 | 21 chars | 21     | Reject   | Above max |

### Date Range

**Exemplo: Booking (válido: tomorrow to 1 year)**

| ID   | Input              | Expected | Boundary  |
| ---- | ------------------ | -------- | --------- |
| TC01 | yesterday          | Reject   | Below min |
| TC02 | today              | Reject   | Below min |
| TC03 | tomorrow           | Accept   | At min    |
| TC04 | day after tomorrow | Accept   | Above min |
| TC05 | 364 days from now  | Accept   | Below max |
| TC06 | 365 days from now  | Accept   | At max    |
| TC07 | 366 days from now  | Reject   | Above max |

---

## ⚠️ Edge Cases Especiais

### Floating Point

```javascript
// Problema: imprecisão de float
0.1 + 0.2 !== 0.3; // true!

// Solução: usar tolerância
Math.abs(0.1 + 0.2 - 0.3) < 0.0001;
```

- [ ] **Tolerância definida para comparações float?**

### Date/Time

- [ ] **Timezone boundaries testados?**
  - UTC vs Local
  - DST transitions
  - Midnight edge cases

- [ ] **Leap year considerado?**
  - Feb 29
  - Year 2100 (not a leap year!)

### Unicode/Strings

- [ ] **Caracteres especiais nos boundaries?**
  - Emojis (multi-byte)
  - Acentos
  - RTL characters

---

## 📝 Automation Pattern

```javascript
describe("Age Validation", () => {
  const testCases = [
    { input: 17, expected: false, desc: "below minimum" },
    { input: 18, expected: true, desc: "at minimum" },
    { input: 19, expected: true, desc: "above minimum" },
    { input: 64, expected: true, desc: "below maximum" },
    { input: 65, expected: true, desc: "at maximum" },
    { input: 66, expected: false, desc: "above maximum" },
  ];

  testCases.forEach(({ input, expected, desc }) => {
    it(`should ${expected ? "accept" : "reject"} age ${input} (${desc})`, () => {
      expect(isValidAge(input)).toBe(expected);
    });
  });
});
```

---

## 🔗 Relacionamentos

- **Usado por**: ${AVANADE_MEMORY_QA_CARLA}, ${AVANADE_MEMORY_DEV_TIAGO}
- **Complementa**: ${AVANADE_TASK_TEST_COVERAGE}, Equivalence Partitioning
- **Referência**: ISTQB Foundation Level, IEEE 829
