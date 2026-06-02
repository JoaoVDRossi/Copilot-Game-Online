---

## ðŸ“‹ O que Ã© este Artefato?

Este Ã© o **sistema de memÃ³ria persistente** para Paige, Technical Writer da Avanade Method. Funciona como um repositÃ³rio vivo de:
- **Documentation Standards**: PadrÃµes customizados do projeto
- **Audience Personas**: Perfis de leitores e suas necessidades
- **Diagram Patterns**: Templates reutilizÃ¡veis de diagramas
- **Terminology Glossary**: Termos tÃ©cnicos aprovados
- **Code Example Library**: Exemplos validados e testados
- **Common Issues**: Problemas recorrentes e soluÃ§Ãµes

---

## ðŸŽ¯ Quando Usar

### ANTES de Criar DocumentaÃ§Ã£o:
âœ… Consultar padrÃµes de documentaÃ§Ã£o estabelecidos  
âœ… Verificar personas de audiÃªncia jÃ¡ definidas  
âœ… Reutilizar diagramas/templates existentes  
âœ… Usar terminologia consistente do glossÃ¡rio

### APÃ“S Criar DocumentaÃ§Ã£o:
âœ… Atualizar com novos patterns descobertos  
âœ… Adicionar feedback de usuÃ¡rios/leitores  
âœ… Arquivar code examples validados  
âœ… Documentar common issues e soluÃ§Ãµes

---

## ðŸ“ Estrutura da MemÃ³ria

### 1. Documentation Standards

```yaml
documentation_standards:
  project: "[Nome do Projeto]"
  last_updated: "YYYY-MM-DD"
  
  writing_style:
    voice: "Active voice preferred"
    tense: "Present tense for instructions"
    person: "Second person (you) for user-facing docs"
    tone: "Professional, friendly, inclusive"
    
  formatting:
    headings:
      h1: "# Document Title (only one per doc)"
      h2: "## Major Sections"
      h3: "### Subsections"
      max_depth: 3
    
    code_blocks:
      language_tag: "Always specify language (```python, ```javascript)"
      line_length: "Max 80 characters for readability"
      comments: "Explain non-obvious code"
    
    lists:
      bullets: "Use `-` for unordered lists"
      numbered: "Use `1.` for sequential steps"
      nesting: "Max 2 levels deep"
    
    links:
      format: "[Descriptive text](URL)"
      external: "Open in new tab when applicable"
      internal: "Use relative paths"
    
  accessibility:
    images: "Always include alt text"
    headings: "Semantic hierarchy (no skipping levels)"
    contrast: "WCAG AA minimum (4.5:1 for text)"
    language: "Inclusive, gender-neutral terms"
  
  file_naming:
    convention: "kebab-case"
    example: "user-authentication-guide.md"
    avoid: "Spaces, special characters, uppercase"
  
  version_control:
    changelog: "Maintain CHANGELOG.md"
    git_commits: "docs: [component] - brief description"
    branching: "docs/feature-name"
```

**HistÃ³rico de AtualizaÃ§Ãµes:**
```yaml
updates:
  - date: "2025-02-03"
    change: "Initial documentation standards defined"
    reason: "Establish baseline for consistency"
    effectiveness: "TBD - awaiting first reviews"
```

---

### 2. Audience Personas

```yaml
audience_personas:
  - name: "Backend Developer"
    id: "dev-backend"
    expertise: "Intermediate to Advanced"
    needs:
      - "API references with code examples"
      - "Architecture diagrams (sequence, component)"
      - "Performance optimization tips"
      - "Error handling patterns"
    preferences:
      - "Concise, technical language"
      - "Code-first examples"
      - "CLI commands over GUI"
    avoid:
      - "Over-explaining basic concepts"
      - "Marketing language"
    
  - name: "Frontend Developer"
    id: "dev-frontend"
    expertise: "Beginner to Intermediate"
    needs:
      - "UI component documentation"
      - "Design system guidelines"
      - "Accessibility requirements"
      - "Browser compatibility notes"
    preferences:
      - "Visual examples (screenshots, wireframes)"
      - "Step-by-step tutorials"
      - "Interactive demos"
    avoid:
      - "Backend implementation details"
    
  - name: "DevOps Engineer"
    id: "ops-devops"
    expertise: "Advanced"
    needs:
      - "Deployment guides"
      - "Infrastructure diagrams"
      - "Monitoring and logging setup"
      - "CI/CD pipeline configuration"
    preferences:
      - "YAML/JSON config examples"
      - "Shell scripts and automation"
      - "Troubleshooting guides"
    avoid:
      - "Application-level code details"
    
  - name: "Product Manager"
    id: "pm-product"
    expertise: "Non-technical"
    needs:
      - "Feature overviews (high-level)"
      - "User stories and use cases"
      - "Business value explanations"
      - "Roadmap documentation"
    preferences:
      - "Plain language (no jargon)"
      - "Diagrams over code"
      - "Bullet points and summaries"
    avoid:
      - "Technical implementation details"
      - "Code examples"
    
  - name: "End User"
    id: "user-end"
    expertise: "Beginner"
    needs:
      - "Getting started guides"
      - "How-to tutorials"
      - "FAQ and troubleshooting"
      - "Feature walkthroughs"
    preferences:
      - "Screenshots and videos"
      - "Step-by-step instructions"
      - "Simple, clear language"
    avoid:
      - "Technical jargon"
      - "Code or CLI commands"
```

**Effective Combinations:**
- **API Documentation**: dev-backend + dev-frontend (different sections)
- **User Guide**: user-end + pm-product (overlapping but different depth)
- **Deployment Guide**: ops-devops (primary) + dev-backend (secondary)

---

### 3. Diagram Patterns Library

```yaml
diagram_patterns:
  - type: "Architecture - Microservices"
    format: "Mermaid (C4 Model)"
    template: |
      ```mermaid
      graph TB
          subgraph "Frontend"
              UI[React App]
          end
          subgraph "API Gateway"
              GW[Kong/NGINX]
          end
          subgraph "Microservices"
              MS1[Auth Service]
              MS2[User Service]
              MS3[Order Service]
          end
          subgraph "Databases"
              DB1[(Auth DB)]
              DB2[(User DB)]
              DB3[(Order DB)]
          end
          UI --> GW
          GW --> MS1
          GW --> MS2
          GW --> MS3
          MS1 --> DB1
          MS2 --> DB2
          MS3 --> DB3
      ```
    usage: "System architecture overview for technical audience"
    last_used: "2025-02-03"
    effectiveness: "High - clear separation of concerns"
  
  - type: "Sequence Diagram - Authentication Flow"
    format: "Mermaid"
    template: |
      ```mermaid
      sequenceDiagram
          participant U as User
          participant FE as Frontend
          participant API as API Gateway
          participant Auth as Auth Service
          participant DB as Database
          
          U->>FE: Enter credentials
          FE->>API: POST /login
          API->>Auth: Validate credentials
          Auth->>DB: Query user
          DB-->>Auth: User data
          Auth-->>API: JWT token
          API-->>FE: Token + User info
          FE-->>U: Redirect to dashboard
      ```
    usage: "Explain authentication flows to developers"
    last_used: "2025-02-03"
    effectiveness: "High - sequential flow clear"
  
  - type: "Flowchart - Error Handling"
    format: "Mermaid"
    template: |
      ```mermaid
      flowchart TD
          Start([API Request]) --> Validate{Valid Input?}
          Validate -->|No| Error1[Return 400 Bad Request]
          Validate -->|Yes| Auth{Authenticated?}
          Auth -->|No| Error2[Return 401 Unauthorized]
          Auth -->|Yes| Process[Process Request]
          Process --> Success{Success?}
          Success -->|No| Error3[Return 500 Server Error]
          Success -->|Yes| Return[Return 200 OK]
          Error1 --> End([End])
          Error2 --> End
          Error3 --> End
          Return --> End
      ```
    usage: "Document error handling logic"
    last_used: "2025-02-03"
    effectiveness: "Medium - good for logic flow"
  
  - type: "Entity Relationship Diagram"
    format: "Mermaid"
    template: |
      ```mermaid
      erDiagram
          USER ||--o{ ORDER : places
          USER {
              int id PK
              string email
              string name
          }
          ORDER ||--|{ ORDER_ITEM : contains
          ORDER {
              int id PK
              int user_id FK
              date created_at
              string status
          }
          ORDER_ITEM {
              int id PK
              int order_id FK
              int product_id FK
              int quantity
          }
          PRODUCT ||--o{ ORDER_ITEM : "ordered in"
          PRODUCT {
              int id PK
              string name
              decimal price
          }
      ```
    usage: "Database schema documentation"
    last_used: "2025-02-03"
    effectiveness: "High - clear relationships"
```

---

### 4. Terminology Glossary

```yaml
terminology_glossary:
  project_specific:
    - term: "API Gateway"
      definition: "Central entry point for all client requests, handles routing, authentication, and rate limiting"
      approved_usage: "API Gateway"
      avoid: "Gateway API, API Proxy"
      context: "Architecture documentation"
    
    - term: "Microservice"
      definition: "Independent, deployable service responsible for a single business capability"
      approved_usage: "Microservice" (singular) or "Microservices" (plural)
      avoid: "Micro-service, micro service"
      context: "Architecture, deployment docs"
    
    - term: "Environment"
      definition: "Isolated deployment context (development, staging, production)"
      approved_usage: "Environment (capitalized in headings)"
      alternatives: "Dev, Staging, Prod (acceptable abbreviations)"
      context: "Deployment guides"
  
  technical_standards:
    - term: "Authentication"
      definition: "Verifying user identity"
      not_to_confuse_with: "Authorization (verifying permissions)"
      example: "Users authenticate with username/password"
    
    - term: "Authorization"
      definition: "Verifying user permissions to access resources"
      not_to_confuse_with: "Authentication (verifying identity)"
      example: "Admin role authorized to delete users"
    
    - term: "Idempotent"
      definition: "Operation that produces same result regardless of how many times executed"
      usage: "PUT and DELETE are idempotent HTTP methods"
      context: "API documentation"
  
  inclusive_language:
    avoid:
      - original: "whitelist/blacklist"
        replacement: "allowlist/denylist"
      - original: "master/slave"
        replacement: "primary/replica, leader/follower"
      - original: "guys"
        replacement: "team, folks, everyone"
      - original: "sanity check"
        replacement: "quick check, validation"
```

---

### 5. Code Example Library

```yaml
code_examples:
  - language: "Python"
    category: "API - Authentication"
    description: "Basic JWT authentication middleware"
    tested: true
    test_date: "2025-02-03"
    code: |
      ```python
      from functools import wraps
      from flask import request, jsonify
      import jwt
      
      def require_auth(f):
          @wraps(f)
          def decorated(*args, **kwargs):
              token = request.headers.get('Authorization')
              
              if not token:
                  return jsonify({'error': 'Missing token'}), 401
              
              try:
                  # Remove 'Bearer ' prefix
                  token = token.replace('Bearer ', '')
                  payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
                  request.user_id = payload['user_id']
              except jwt.ExpiredSignatureError:
                  return jsonify({'error': 'Token expired'}), 401
              except jwt.InvalidTokenError:
                  return jsonify({'error': 'Invalid token'}), 401
              
              return f(*args, **kwargs)
          return decorated
      
      # Usage
      @app.route('/protected')
      @require_auth
      def protected_route():
          return jsonify({'message': f'Hello user {request.user_id}'})
      ```
    dependencies:
      - "flask"
      - "PyJWT"
    usage_count: 5
    effectiveness: "High - clear and reusable"
  
  - language: "JavaScript"
    category: "Frontend - Form Validation"
    description: "React Hook Form with Zod validation"
    tested: true
    test_date: "2025-02-03"
    code: |
      ```javascript
      import { useForm } from 'react-hook-form';
      import { zodResolver } from '@hookform/resolvers/zod';
      import { z } from 'zod';
      
      const loginSchema = z.object({
        email: z.string().email('Invalid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
      });
      
      function LoginForm() {
        const { register, handleSubmit, formState: { errors } } = useForm({
          resolver: zodResolver(loginSchema),
        });
        
        const onSubmit = async (data) => {
          try {
            const response = await fetch('/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log('Login successful:', result);
          } catch (error) {
            console.error('Login failed:', error);
          }
        };
        
        return (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('email')} placeholder="Email" />
            {errors.email && <span>{errors.email.message}</span>}
            
            <input {...register('password')} type="password" placeholder="Password" />
            {errors.password && <span>{errors.password.message}</span>}
            
            <button type="submit">Login</button>
          </form>
        );
      }
      ```
    dependencies:
      - "react-hook-form"
      - "@hookform/resolvers"
      - "zod"
    usage_count: 3
    effectiveness: "High - type-safe validation"
```

---

### 6. Common Documentation Issues & Solutions

```yaml
common_issues:
  - issue: "Code examples fail when users copy-paste"
    root_cause: "Missing dependencies or environment setup instructions"
    solution:
      - "Always list prerequisites (dependencies, versions)"
      - "Provide complete setup steps BEFORE code example"
      - "Test code in clean environment before publishing"
    prevention: "Add 'Prerequisites' section to all code-heavy docs"
    occurrences: 3
    last_seen: "2025-02-01"
  
  - issue: "Diagrams become outdated quickly"
    root_cause: "System architecture changes but docs not updated"
    solution:
      - "Use Mermaid (text-based) instead of images for easier updates"
      - "Add 'Last Updated' date to diagrams"
      - "Link diagrams to code/config files for auto-validation"
    prevention: "Include diagram updates in Definition of Done"
    occurrences: 5
    last_seen: "2025-01-28"
  
  - issue: "Users struggle to find relevant documentation"
    root_cause: "Poor navigation structure and unclear titles"
    solution:
      - "Create clear TOC with descriptive headings"
      - "Use task-oriented titles (How to..., Guide to...)"
      - "Add search functionality (Algolia, DocSearch)"
      - "Cross-link related documents"
    prevention: "Test navigation with new team members"
    occurrences: 4
    last_seen: "2025-01-25"
  
  - issue: "Documentation tone inconsistent across docs"
    root_cause: "Multiple writers without shared style guide"
    solution:
      - "Create and enforce style guide (see Section 1)"
      - "Use linters (markdownlint, Vale)"
      - "Peer review all documentation"
    prevention: "Onboard new writers with style guide training"
    occurrences: 2
    last_seen: "2025-01-20"
```

---

## ðŸ”„ Automatic Metrics Tracking

```yaml
metrics:
  documentation_created:
    total_documents: 0
    by_type:
      guides: 0
      tutorials: 0
      references: 0
      api_docs: 0
  
  diagrams_created:
    total: 0
    by_type:
      mermaid: 0
      excalidraw: 0
      other: 0
  
  code_examples:
    total: 0
    tested: 0
    untested: 0
  
  reviews_completed:
    editorial_prose: 0
    editorial_structure: 0
    technical_accuracy: 0
    accessibility: 0
  
  effectiveness:
    avg_reader_satisfaction: "N/A (survey after 10 docs)"
    avg_time_to_completion: "N/A"
    most_viewed_docs: []
    most_helpful_diagrams: []
```

---

## ðŸ“– Como Usar Este Artefato

### Para Paige (Tech Writer):

**Antes de escrever**:
1. Consultar **Documentation Standards** (Section 1)
2. Identificar **Audience Persona** (Section 2)
3. Reutilizar **Diagram Patterns** se aplicÃ¡vel (Section 3)
4. Verificar **Terminology** aprovada (Section 4)

**Durante escrita**:
1. Usar **Code Examples** validados (Section 5)
2. Evitar **Common Issues** documentados (Section 6)

**ApÃ³s publicaÃ§Ã£o**:
1. Atualizar mÃ©tricas (Section 7)
2. Adicionar novos patterns descobertos
3. Documentar feedback de leitores

### Para Outros Agentes:

- **Developers**: Consultar code examples (Section 5)
- **Architects**: Reutilizar diagram patterns (Section 3)
- **PMs**: Verificar audience personas (Section 2)

---

## ðŸ”— IntegraÃ§Ã£o com Outros Artefatos

- **${AVANADE_DOC_STANDARDS_MD}**: ReferÃªncia completa de padrÃµes de documentaÃ§Ã£o
- **${AVANADE_TASK_EDITORIAL_REVIEW_PROSE}**: Usa standards da Section 1 para validaÃ§Ã£o
- **${AVANADE_TASK_EDITORIAL_REVIEW_STRUCTURE}**: Usa personas da Section 2 para contexto
- **${AVANADE_MERMAID_LIBRARY_MD}**: Biblioteca expandida de diagramas (complementa Section 3)

---
