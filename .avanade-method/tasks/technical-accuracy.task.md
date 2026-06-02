## ðŸ“‹ O que Ã© este Artefato?

Esta Ã© a **task de validaÃ§Ã£o tÃ©cnica** para garantir que documentaÃ§Ã£o nÃ£o apenas estÃ¡ bem escrita, mas tambÃ©m Ã© **tecnicamente correta**. DocumentaÃ§Ã£o bonita mas errada Ã© pior que nÃ£o ter documentaÃ§Ã£o.

**Objetivo**: Zero bugs em documentaÃ§Ã£o publicada

---

## ðŸŽ¯ Quando Usar

### âœ… USE para:
- Validar documentaÃ§Ã£o antes de publicaÃ§Ã£o
- Revisar docs apÃ³s mudanÃ§as de cÃ³digo/arquitetura
- Onboarding review (novo tech writer testa docs)
- Quarterly audits de documentaÃ§Ã£o existente

### âŒ NÃƒO Ã‰:
- Code review (isso Ã© responsabilidade de engenheiros)
- QA testing (isso testa produto, nÃ£o docs)
- Marketing review (isso valida messaging, nÃ£o accuracy)

---

## âœ… TECHNICAL ACCURACY CHECKLIST

### 1. CODE EXAMPLES

#### 1.1 Code Syntax & Execution

- [ ] **All code examples are syntactically valid** - No typos, missing semicolons
- [ ] **Code runs without errors** - Tested in clean environment
- [ ] **Dependencies documented** - All imports, libraries listed
- [ ] **Version compatibility specified** - "Python 3.9+", "Node 16+"
- [ ] **Environment setup documented** - OS, tools, configurations needed

**Why**: Broken code examples destroy trust in documentation.

**Test Process**:
```bash
# Create clean environment
python -m venv clean_env
source clean_env/bin/activate  # or clean_env\Scripts\activate on Windows

# Install only documented dependencies
pip install -r requirements.txt

# Run code example from docs
python example.py

# Expected: Runs without errors, produces documented output
```

**Example**:
````markdown
âœ… GOOD:
**Prerequisites**: Python 3.9+, `requests` library

Install dependencies:
```bash
pip install requests==2.28.0
```

Example code:
```python
import requests

response = requests.get('https://api.example.com/users')
print(response.json())  # Output: [{'id': 1, 'name': 'Alice'}, ...]
```

âŒ BAD (dependencies missing, output not shown):
```python
response = requests.get('https://api.example.com/users')
print(response.json())
```
````

---

#### 1.2 Code Completeness

- [ ] **No placeholder code in examples** - No `// TODO`, `...`, `<your-key-here>`
- [ ] **Imports included** - All `import`, `require`, `using` statements
- [ ] **Error handling present** - Try/catch for real-world code
- [ ] **Full working example** - Not just snippets (unless clearly labeled)

**Example**:
````markdown
âœ… GOOD (complete, working):
```python
import os
from openai import OpenAI

# Initialize client with API key from environment
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

try:
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": "Hello!"}]
    )
    print(response.choices[0].message.content)
except Exception as e:
    print(f"Error: {e}")
```

âŒ BAD (incomplete, no error handling, placeholder):
```python
client = OpenAI(api_key="<your-key-here>")
response = client.chat.completions.create(...)
print(response)
```
````

---

#### 1.3 Output Validation

- [ ] **Expected output shown** - What user should see after running code
- [ ] **Output matches actual execution** - Run code, copy real output
- [ ] **Edge cases documented** - What if API is down? Empty response?

**Example**:
````markdown
âœ… GOOD:
```python
print(calculate_total(100, 0.08, 10))
```

**Expected output:**
```
98.0  # (100 - 10) * 1.08 = 97.20 rounded
```

**Note**: If discount > subtotal, raises `ValueError`.
````

---

### 2. API DOCUMENTATION

#### 2.1 Endpoint Accuracy

- [ ] **Endpoint paths correct** - Tested against real API
- [ ] **HTTP methods correct** - GET, POST, PUT, DELETE match implementation
- [ ] **Request parameters documented** - All query params, headers, body fields
- [ ] **Response format matches reality** - JSON structure matches actual API
- [ ] **Status codes accurate** - 200, 400, 401, 500 match what API returns

**Validation Process**:
```bash
# Test every documented endpoint
curl -X GET https://api.example.com/users \
  -H "Authorization: Bearer $TOKEN"

# Compare response to documented example
# Expected: Matches exactly (or document differences)
```

**Example**:
````markdown
âœ… GOOD (tested, accurate):
### GET /users/:id

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "id": 123,
  "email": "user@example.com",
  "created_at": "2025-02-03T10:30:00Z"
}
```

**Error (404 Not Found):**
```json
{
  "error": "User not found"
}
```

âŒ BAD (not tested, guessed):
### GET /users/:id

Returns user object.
````

---

#### 2.2 Parameter Validation

- [ ] **Required vs optional clear** - `(required)` or `(optional)` tags
- [ ] **Data types specified** - `string`, `integer`, `boolean`, `array`
- [ ] **Valid values documented** - Enums, ranges, formats
- [ ] **Default values shown** - What happens if param omitted

**Example**:
```markdown
âœ… GOOD:
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| page | integer | No | 1 | Page number (min: 1, max: 1000) |
| limit | integer | No | 20 | Items per page (min: 1, max: 100) |
| status | string | No | "active" | Filter by status. Values: "active", "inactive" |

âŒ BAD:
| Parameter | Description |
|-----------|-------------|
| page | Page number |
| limit | Items per page |
```

---

### 3. ARCHITECTURAL CONCEPTS

#### 3.1 System Diagrams

- [ ] **Diagrams match current architecture** - Not outdated
- [ ] **All components labeled** - No "Service A", "Database 1"
- [ ] **Data flows correct** - Arrows show actual direction
- [ ] **Technologies accurate** - PostgreSQL (not MySQL if it's Postgres)
- [ ] **Reviewed by architect** - Technical lead confirms accuracy

**Validation**:
```markdown
Before publishing architecture diagram:
1. Export diagram as Mermaid code
2. Send to tech lead for review
3. Incorporate feedback
4. Add "Last reviewed: YYYY-MM-DD" caption
```

**Example**:
````markdown
âœ… GOOD (reviewed, dated):
**Figure 1: Microservices Architecture (Last reviewed: 2025-02-03)**

```mermaid
flowchart LR
    Client[React App] --> Gateway[Kong API Gateway]
    Gateway --> Auth[Auth Service<br/>Node.js + PostgreSQL]
    Gateway --> User[User Service<br/>Python + PostgreSQL]
    Gateway --> Order[Order Service<br/>Go + MongoDB]
```

*Reviewed by: Wilson Souza (Tech Lead)*

âŒ BAD (no review, vague):
```mermaid
flowchart LR
    Frontend --> Backend
    Backend --> Database
```
````

---

#### 3.2 Conceptual Explanations

- [ ] **Technically accurate definitions** - No oversimplifications that mislead
- [ ] **Industry-standard terminology** - OAuth 2.0 (not "OAuth 2")
- [ ] **Analogies don't break down** - Test edge cases of analogy
- [ ] **References cited** - Link to RFC, spec, official docs

**Example**:
```markdown
âœ… GOOD (precise, cited):
**JWT (JSON Web Token)** is a compact, URL-safe token format defined in [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519). It consists of three Base64URL-encoded parts separated by dots: header, payload, and signature.

âŒ BAD (imprecise):
**JWT** is a secure token used for authentication. It's encrypted and contains user data.

(Wrong: JWTs are signed, not encrypted by default. "User data" is vague.)
```

---

### 4. VERSION COMPATIBILITY

#### 4.1 Software Versions

- [ ] **Library versions specified** - `requests==2.28.0` not "latest"
- [ ] **Breaking changes documented** - "v2.0 removes deprecated endpoints"
- [ ] **Migration guides linked** - How to upgrade from v1 to v2
- [ ] **EOL dates noted** - "Python 3.7 support ends June 2025"

**Why**: "Latest" changes daily. Today's working example breaks tomorrow.

**Example**:
````markdown
âœ… GOOD:
**Compatibility:**
- Python 3.9 - 3.11 (3.12 not yet tested)
- Django 4.2 LTS (support until April 2026)
- PostgreSQL 13+

**Breaking changes in v2.0:**
- `authenticate()` now returns `User` object (previously returned `dict`)
- `login_required` decorator removed (use `@login_required` from `django.contrib.auth`)

See [Migration Guide v1â†’v2](./migration-v1-v2.md) for details.

âŒ BAD:
Works with Python and Django. Use latest versions.
````

---

#### 4.2 API Versioning

- [ ] **API version in all examples** - `/v1/users` not `/users`
- [ ] **Deprecated endpoints marked** - "âš ï¸ Deprecated in v2, removed in v3"
- [ ] **Sunset dates provided** - "API v1 sunset: Dec 31, 2025"

---

### 5. CONFIGURATION & SETUP

#### 5.1 Environment Setup

- [ ] **OS requirements clear** - "Windows 10+, macOS 12+, Ubuntu 20.04+"
- [ ] **Prerequisites listed** - Git, Docker, Node.js versions
- [ ] **Installation tested** - Fresh install on clean machine
- [ ] **Troubleshooting common issues** - "If you see X error, do Y"

**Testing Process**:
```bash
# Use fresh VM/container
docker run -it ubuntu:22.04 /bin/bash

# Follow setup docs step-by-step
# Expected: Successful setup, no undocumented steps needed
```

**Example**:
````markdown
âœ… GOOD (tested, complete):
## Prerequisites

**Required:**
- Node.js 18 or higher ([download](https://nodejs.org/))
- Git 2.30+ ([download](https://git-scm.com/))
- Docker Desktop 4.0+ ([download](https://www.docker.com/products/docker-desktop/))

**Verify installation:**
```bash
node --version  # Expected: v18.x.x or higher
git --version   # Expected: git version 2.30+
docker --version # Expected: Docker version 20.10+
```

## Installation

1. Clone repository:
```bash
git clone https://github.com/example/repo.git
cd repo
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Expected output:
```
Server running at http://localhost:3000
```

**Troubleshooting:**
- **Error: "EACCES: permission denied"** â†’ Run `sudo npm install -g npm@latest`
- **Port 3000 already in use** â†’ Change port in `.env` file: `PORT=3001`

âŒ BAD (incomplete, not tested):
## Setup
Install Node and run `npm install`. Start with `npm start`.
````

---

#### 5.2 Configuration Files

- [ ] **Example configs provided** - `.env.example`, `config.yaml.example`
- [ ] **All options documented** - What each config value does
- [ ] **Required vs optional clear** - Mark required values
- [ ] **Valid values specified** - "Values: development, staging, production"

**Example**:
````markdown
âœ… GOOD:
**Configuration (.env file):**

```bash
# Database (REQUIRED)
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb

# JWT Secret (REQUIRED) - Generate with: openssl rand -base64 32
JWT_SECRET=your-secret-here

# Environment (OPTIONAL) - Values: development, staging, production
NODE_ENV=development

# Logging Level (OPTIONAL) - Values: debug, info, warn, error
LOG_LEVEL=info
```

âŒ BAD:
Create a `.env` file with your database URL and JWT secret.
````

---

### 6. TROUBLESHOOTING & ERROR MESSAGES

#### 6.1 Error Documentation

- [ ] **Common errors documented** - Top 5-10 errors users encounter
- [ ] **Exact error messages** - Copy-paste actual error text
- [ ] **Root causes explained** - Why error occurs
- [ ] **Solutions provided** - Step-by-step fix
- [ ] **Prevention tips** - How to avoid error

**Example**:
````markdown
âœ… GOOD:
## Common Errors

### Error: "ECONNREFUSED 127.0.0.1:5432"

**Full error:**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1144:16)
```

**Cause:** Database (PostgreSQL) is not running on port 5432.

**Solution:**
1. Check if PostgreSQL is running:
   ```bash
   sudo systemctl status postgresql  # Linux
   brew services list | grep postgresql  # macOS
   ```

2. If not running, start it:
   ```bash
   sudo systemctl start postgresql  # Linux
   brew services start postgresql@14  # macOS
   ```

3. Verify port in your `.env` matches PostgreSQL config:
   ```bash
   # Check PostgreSQL port
   psql -U postgres -c "SHOW port;"
   # Should match DATABASE_URL in .env
   ```

**Prevention:** Add PostgreSQL to system startup services.

âŒ BAD:
### Database Connection Error
Make sure your database is running.
````

---

### 7. LINKS & REFERENCES

#### 7.1 Link Validity

- [ ] **All links tested** - No 404s
- [ ] **Internal links use relative paths** - `./guide.md` not `https://example.com/guide.md`
- [ ] **External links to official sources** - RFCs, official docs, not random blogs
- [ ] **Archived links for critical refs** - Use Wayback Machine for unstable sources

**Automated Testing**:
```bash
# Install markdown-link-check
npm install -g markdown-link-check

# Check all links
markdown-link-check docs/**/*.md

# Expected: All links return 200 OK
```

**Example**:
```markdown
âœ… GOOD:
- [OAuth 2.0 Spec (RFC 6749)](https://datatracker.ietf.org/doc/html/rfc6749)
- [PostgreSQL Official Docs](https://www.postgresql.org/docs/14/)

âŒ BAD:
- [OAuth Tutorial](https://random-blog.com/oauth-tutorial-2018)
  (Unstable, may disappear)
```

---

#### 7.2 Version-Specific Links

- [ ] **Link to specific version** - `/docs/v2/` not `/docs/`
- [ ] **Note if link may change** - "Link to latest, may differ from v1.0"

---

### 8. DATA & STATISTICS

#### 8.1 Metrics Accuracy

- [ ] **Metrics cite sources** - "According to [source], 80% of users..."
- [ ] **Dates provided** - "As of February 2025, ..."
- [ ] **No unsupported claims** - "Fastest framework" needs benchmark proof

**Example**:
```markdown
âœ… GOOD:
According to the [Stack Overflow Developer Survey 2024](https://survey.stackoverflow.co/2024), Python is the 3rd most popular programming language, used by 48.2% of respondents.

âŒ BAD:
Python is the most popular language.
(Unsupported, vague)
```

---

### 9. SCREENSHOTS & UI REFERENCES

#### 9.1 UI Documentation

- [ ] **Screenshots match current UI** - Not outdated
- [ ] **UI element names correct** - Button says "Submit" not "Save"
- [ ] **Click paths tested** - "Settings > Security > API Keys" works
- [ ] **Version noted** - "Screenshot from v2.5.0"

**Review Process**:
```markdown
Every product release:
1. Compare screenshots to new UI
2. Update if changed
3. Note version in caption
```

**Example**:
```markdown
âœ… GOOD:
**Figure 2: API Keys Configuration (v2.5.0)**
![Screenshot showing the API Keys page with "Generate New Key" button highlighted](api-keys-v2.5.0.png)

To generate a new API key:
1. Navigate to **Settings** â†’ **Security** â†’ **API Keys**
2. Click **Generate New Key**

âŒ BAD:
![API Keys page](old-screenshot.png)
Click the button to create a key.
(Screenshot is outdated, button name unclear)
```

---

## ðŸ” REVIEW PROCESS

### Pre-Publication Review

**Step 1: Self-Review (Paige)**
- [ ] Run all code examples in clean environment
- [ ] Test all CLI commands
- [ ] Verify all links (automated + manual spot checks)
- [ ] Check screenshots match current UI

**Step 2: Peer Review (Another Tech Writer)**
- [ ] Read through as if following tutorial
- [ ] Flag unclear sections
- [ ] Test complex examples

**Step 3: Technical Review (SME - Subject Matter Expert)**
- [ ] Engineering lead reviews architecture diagrams
- [ ] Backend dev reviews API docs
- [ ] DevOps reviews setup/deployment docs

**Step 4: User Testing (Optional but Recommended)**
- [ ] New team member follows tutorial
- [ ] Tracks time, friction points
- [ ] Feedback incorporated

---

### Post-Publication Audit

**Quarterly Review:**
```markdown
Every 3 months:
1. Re-run all code examples (dependencies may have updated)
2. Check external links (sites may have moved)
3. Verify versions still supported (EOL check)
4. Update "Last reviewed" dates
```

---

## ðŸ“Š TECHNICAL ACCURACY SCORECARD

```yaml
categories:
  code_examples:
    weight: 30%
    checks:
      - All code runs: [pass/fail]
      - Dependencies documented: [pass/fail]
      - Output matches reality: [pass/fail]
    score: [0-10]
  
  api_documentation:
    weight: 25%
    checks:
      - Endpoints tested: [pass/fail]
      - Request/response accurate: [pass/fail]
      - Status codes correct: [pass/fail]
    score: [0-10]
  
  architecture:
    weight: 15%
    checks:
      - Diagrams reviewed by tech lead: [pass/fail]
      - Components accurately labeled: [pass/fail]
    score: [0-10]
  
  setup_instructions:
    weight: 15%
    checks:
      - Tested in clean environment: [pass/fail]
      - Prerequisites complete: [pass/fail]
      - Troubleshooting covers common issues: [pass/fail]
    score: [0-10]
  
  links_references:
    weight: 10%
    checks:
      - All links valid (no 404s): [pass/fail]
      - Official sources cited: [pass/fail]
    score: [0-10]
  
  version_compatibility:
    weight: 5%
    checks:
      - Versions specified: [pass/fail]
      - Breaking changes documented: [pass/fail]
    score: [0-10]

total_score:
  calculation: "sum(category.score Ã— category.weight)"
  threshold:
    production_ready: ">95%"
    needs_revision: "85-95%"
    major_issues: "<85%"
```

**Target**: >95% before publication (zero critical errors)

---

## ðŸ”— IntegraÃ§Ã£o com Outros Artefatos

- **${AVANADE_DOC_STANDARDS_MD}**: Technical accuracy Ã© parte de quality standards
- **${AVANADE_TASK_EDITORIAL_REVIEW_PROSE}**: Prose review complementa technical review
- **${AVANADE_TASK_DOC_ACCESSIBILITY}**: Accessibility + Technical Accuracy = Complete review
- **${AVANADE_MEMORY_TECH_WRITER_PAIGE}**: Armazena code examples testados (Section 5)
