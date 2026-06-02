---

## ðŸ“‹ O que Ã© este Artefato?

Esta Ã© a **biblioteca de patterns Mermaid** para criar diagramas text-based em documentaÃ§Ã£o. Mermaid permite diagramas versionÃ¡veis, editÃ¡veis e acessÃ­veis.

**Por que Mermaid?**
- âœ… **Text-based**: VersionÃ¡vel em Git (nÃ£o binÃ¡rio)
- âœ… **FÃ¡cil ediÃ§Ã£o**: Mude cÃ³digo, nÃ£o imagem
- âœ… **RenderizaÃ§Ã£o universal**: GitHub, GitLab, Docusaurus, VS Code
- âœ… **AcessÃ­vel**: Can be narrated by screen readers

---

## ðŸŽ¯ Quando Usar

### âœ… USE Mermaid para:
- Architecture diagrams (system, component)
- Sequence diagrams (API flows, authentication)
- Flowcharts (decision trees, processes)
- Entity-Relationship Diagrams (database schemas)
- State diagrams (workflows, state machines)
- Gantt charts (project timelines)

### âŒ NÃƒO USE Mermaid para:
- Wireframes/mockups (use Figma, Excalidraw)
- Detailed UI designs (use design tools)
- Complex diagrams com >20 nodes (too messy)

---

## ðŸŽ¨ DIAGRAM TYPE 1: FLOWCHARTS

### Basic Flowchart (Top to Bottom)

```mermaid
flowchart TB
    Start([Start]) --> Input[/User Input/]
    Input --> Process[Process Data]
    Process --> Decision{Valid?}
    Decision -->|Yes| Success[Save to Database]
    Decision -->|No| Error[Show Error]
    Success --> End([End])
    Error --> Input
```

**Code:**
````markdown
```mermaid
flowchart TB
    Start([Start]) --> Input[/User Input/]
    Input --> Process[Process Data]
    Process --> Decision{Valid?}
    Decision -->|Yes| Success[Save to Database]
    Decision -->|No| Error[Show Error]
    Success --> End([End])
    Error --> Input
```
````

**When to use**: Process flows, decision trees, algorithm visualization

---

### Flowchart (Left to Right) - Preferred for Wide Diagrams

```mermaid
flowchart LR
    A[Client] -->|HTTP Request| B[Load Balancer]
    B --> C[Server 1]
    B --> D[Server 2]
    B --> E[Server 3]
    C --> F[(Database)]
    D --> F
    E --> F
```

**Code:**
````markdown
```mermaid
flowchart LR
    A[Client] -->|HTTP Request| B[Load Balancer]
    B --> C[Server 1]
    B --> D[Server 2]
    B --> E[Server 3]
    C --> F[(Database)]
    D --> F
    E --> F
```
````

**When to use**: Architecture overviews, horizontal data flows

---

### Node Shapes Reference

```mermaid
flowchart LR
    A[Rectangle] --> B(Rounded)
    B --> C([Stadium])
    C --> D[[Subroutine]]
    D --> E[(Database)]
    E --> F((Circle))
    F --> G>Flag]
    G --> H{Diamond}
    H --> I{{Hexagon}}
    I --> J[/Parallelogram/]
    J --> K[\Trapezoid\]
```

**Code Syntax:**
```
[Text]       - Rectangle
(Text)       - Rounded rectangle
([Text])     - Stadium (pill shape)
[[Text]]     - Subroutine
[(Text)]     - Database (cylinder)
((Text))     - Circle
>Text]       - Flag
{Text}       - Diamond (decision)
{{Text}}     - Hexagon
[/Text/]     - Parallelogram (input/output)
[\Text\]     - Trapezoid
```

---

### Arrow Types

```mermaid
flowchart LR
    A --> B
    B -.-> C
    C ==> D
    D -.->|Label| E
    E -->|Label| F
    F ---|No Arrow| G
```

**Code:**
```
-->   Normal arrow
-.->  Dotted arrow
==>   Thick arrow
---   Line (no arrow)
```

---

### Flowchart with Subgraphs

```mermaid
flowchart TB
    subgraph Frontend
        UI[React App]
        Router[React Router]
    end
    
    subgraph Backend
        API[Express API]
        Auth[Auth Service]
        DB[(PostgreSQL)]
    end
    
    subgraph External
        S3[AWS S3]
        Email[SendGrid]
    end
    
    UI --> Router
    Router --> API
    API --> Auth
    Auth --> DB
    API --> S3
    API --> Email
```

**When to use**: System architecture, microservices, layered architectures

---

## ðŸ”„ DIAGRAM TYPE 2: SEQUENCE DIAGRAMS

### Basic Sequence (API Request Flow)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Database
    
    User->>Frontend: Click "Login"
    Frontend->>API: POST /auth/login
    API->>Database: Query user
    Database-->>API: User data
    API-->>Frontend: JWT token
    Frontend-->>User: Redirect to dashboard
```

**Code:**
````markdown
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Database
    
    User->>Frontend: Click "Login"
    Frontend->>API: POST /auth/login
    API->>Database: Query user
    Database-->>API: User data
    API-->>Frontend: JWT token
    Frontend-->>User: Redirect to dashboard
```
````

**When to use**: API documentation, authentication flows, user journeys

---

### Sequence with Activation Boxes

```mermaid
sequenceDiagram
    participant C as Client
    participant S as Server
    participant DB as Database
    
    C->>+S: Request data
    S->>+DB: SELECT query
    DB-->>-S: Result set
    S-->>-C: JSON response
```

**Syntax:**
```
->>+   Activate (start processing)
-->>-  Deactivate (end processing)
```

---

### Sequence with Alt/Opt/Loop

```mermaid
sequenceDiagram
    participant User
    participant API
    participant DB
    
    User->>API: Login request
    
    alt Valid credentials
        API->>DB: Store session
        API-->>User: 200 OK
    else Invalid credentials
        API-->>User: 401 Unauthorized
    end
    
    opt Remember me
        API->>DB: Store refresh token
    end
    
    loop Every 15 minutes
        API->>DB: Refresh session
    end
```

**When to use**: Complex flows with conditional logic, retry mechanisms

---

### Sequence with Notes

```mermaid
sequenceDiagram
    participant Client
    participant Server
    
    Note left of Client: User is on login page
    Client->>Server: POST /login
    Note right of Server: Validates credentials<br/>against database
    Server-->>Client: JWT token
    Note over Client,Server: Token valid for 1 hour
```

**Syntax:**
```
Note left of Actor: Text
Note right of Actor: Text
Note over Actor1,Actor2: Text
```

---

## ðŸ“Š DIAGRAM TYPE 3: CLASS/ER DIAGRAMS

### Entity Relationship Diagram (Database Schema)

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    USER {
        int id PK
        string email UK
        string name
        datetime created_at
    }
    
    ORDER ||--|{ ORDER_ITEM : contains
    ORDER {
        int id PK
        int user_id FK
        datetime created_at
        string status
        decimal total
    }
    
    ORDER_ITEM {
        int id PK
        int order_id FK
        int product_id FK
        int quantity
        decimal price
    }
    
    PRODUCT ||--o{ ORDER_ITEM : "ordered in"
    PRODUCT {
        int id PK
        string name
        string sku UK
        decimal price
        int stock
    }
```

**Relationship Types:**
```
||--||  One to one
||--o{  One to many
}o--o{  Many to many
||--|{  One to one or more
}o--||  Many to one
```

**When to use**: Database design docs, data modeling

---

### Class Diagram (OOP)

```mermaid
classDiagram
    class User {
        +int id
        +string email
        +string password_hash
        +login(email, password) bool
        +logout() void
        +resetPassword(email) void
    }
    
    class Order {
        +int id
        +int user_id
        +datetime created_at
        +decimal total
        +addItem(product, quantity) void
        +calculateTotal() decimal
        +checkout() bool
    }
    
    class Product {
        +int id
        +string name
        +decimal price
        +int stock
        +updateStock(quantity) void
        +isAvailable() bool
    }
    
    User "1" --> "0..*" Order : places
    Order "1" --> "1..*" Product : contains
```

**When to use**: Software architecture docs, OOP design

---

## ðŸŽ¯ DIAGRAM TYPE 4: STATE DIAGRAMS

### Order Status State Machine

```mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Processing : Payment confirmed
    Pending --> Cancelled : User cancelled
    
    Processing --> Shipped : Items packed
    Processing --> Cancelled : Out of stock
    
    Shipped --> Delivered : Tracking confirmed
    Shipped --> Returned : Customer return
    
    Delivered --> [*]
    Cancelled --> [*]
    Returned --> Refunded
    Refunded --> [*]
    
    note right of Processing
        Inventory reserved
        during processing
    end note
```

**When to use**: Workflow documentation, status transitions, FSMs

---

### State with Composite States

```mermaid
stateDiagram-v2
    [*] --> Active
    
    state Active {
        [*] --> Idle
        Idle --> Working : Start task
        Working --> Idle : Complete task
        Working --> Paused : Interrupt
        Paused --> Working : Resume
    }
    
    Active --> Inactive : Logout
    Inactive --> Active : Login
    Inactive --> [*]
```

---

## ðŸ“… DIAGRAM TYPE 5: GANTT CHARTS

### Project Timeline

```mermaid
gantt
    title Project Roadmap - Export Feature
    dateFormat YYYY-MM-DD
    
    section Phase 1 MVP
    Backend development    :2025-02-15, 3w
    Frontend development   :2025-02-22, 2w
    QA testing            :2025-03-08, 1w
    
    section Phase 2 Scale
    Format expansion      :2025-03-15, 2w
    Template library      :2025-03-22, 1w
    
    section Phase 3 Enterprise
    API development       :2025-04-01, 2w
    Documentation         :2025-04-08, 1w
```

**When to use**: Project planning docs, roadmap visualization

---

## ðŸ—ï¸ DIAGRAM TYPE 6: ARCHITECTURE DIAGRAMS

### Microservices Architecture

```mermaid
flowchart TB
    subgraph "Client Layer"
        Web[Web App]
        Mobile[Mobile App]
    end
    
    subgraph "API Gateway"
        Gateway[Kong Gateway]
    end
    
    subgraph "Services"
        Auth[Auth Service]
        User[User Service]
        Order[Order Service]
        Payment[Payment Service]
    end
    
    subgraph "Data Layer"
        AuthDB[(Auth DB)]
        UserDB[(User DB)]
        OrderDB[(Order DB)]
    end
    
    subgraph "External"
        Stripe[Stripe API]
        Email[SendGrid]
    end
    
    Web --> Gateway
    Mobile --> Gateway
    
    Gateway --> Auth
    Gateway --> User
    Gateway --> Order
    Gateway --> Payment
    
    Auth --> AuthDB
    User --> UserDB
    Order --> OrderDB
    
    Payment --> Stripe
    Order --> Email
```

---

### C4 Model - System Context

```mermaid
flowchart TB
    User([Customer])
    Admin([Administrator])
    
    System[E-commerce Platform]
    
    Payment[Payment Gateway<br/>Stripe]
    Email[Email Service<br/>SendGrid]
    Analytics[Analytics<br/>Google Analytics]
    
    User -->|Browse & Purchase| System
    Admin -->|Manage Products| System
    
    System -->|Process Payments| Payment
    System -->|Send Notifications| Email
    System -->|Track Events| Analytics
```

**When to use**: High-level system overviews, stakeholder communication

---

## ðŸŽ¨ STYLING & CUSTOMIZATION

### Basic Styling

```mermaid
flowchart LR
    A[Normal]
    B[Styled Node]
    C[Another Styled]
    
    A --> B --> C
    
    style B fill:#f9f,stroke:#333,stroke-width:4px
    style C fill:#bbf,stroke:#333,stroke-width:2px,stroke-dasharray: 5 5
```

**Code:**
```
style NodeID fill:#color,stroke:#color,stroke-width:4px
```

---

### Class-Based Styling

```mermaid
flowchart LR
    A[Success]:::successClass
    B[Error]:::errorClass
    C[Warning]:::warningClass
    
    classDef successClass fill:#90EE90,stroke:#006400
    classDef errorClass fill:#FFB6C1,stroke:#8B0000
    classDef warningClass fill:#FFD700,stroke:#FF8C00
```

---

## ðŸ”§ BEST PRACTICES

### 1. Keep Diagrams Simple
```
âœ… GOOD: 5-15 nodes, clear flow
âŒ BAD: 30+ nodes, spaghetti connections
```

### 2. Use Descriptive Labels
```
âœ… GOOD: "User Authentication Service"
âŒ BAD: "Service 1"
```

### 3. Direction Matters
```
TB (Top to Bottom) - Process flows, hierarchies
LR (Left to Right) - Data flows, timelines
```

### 4. Consistent Naming
```
Use quotes for labels with spaces:
A["User Service"] --> B["Order Service"]
```

### 5. Line Breaks in Text
```
Use <br/> for multi-line labels:
A["User Service<br/>(Authentication)"]
```

---

## ðŸ“š TEMPLATE LIBRARY

### Template 1: API Documentation Flow

````markdown
```mermaid
sequenceDiagram
    participant Client
    participant API
    participant DB
    
    Client->>API: POST /endpoint
    Note right of API: Validate request
    alt Valid
        API->>DB: Query/Insert
        DB-->>API: Success
        API-->>Client: 200 OK
    else Invalid
        API-->>Client: 400 Bad Request
    end
```
````

---

### Template 2: Deployment Architecture

````markdown
```mermaid
flowchart TB
    subgraph "Production Environment"
        LB[Load Balancer]
        subgraph "App Servers"
            App1[Server 1]
            App2[Server 2]
        end
        subgraph "Data Layer"
            Primary[(Primary DB)]
            Replica[(Read Replica)]
        end
    end
    
    Users[Users] --> LB
    LB --> App1
    LB --> App2
    App1 --> Primary
    App2 --> Primary
    Primary --> Replica
```
````

---

### Template 3: Error Handling Flow

````markdown
```mermaid
flowchart TD
    Start([API Request]) --> Validate{Valid?}
    Validate -->|No| Error400[Return 400]
    Validate -->|Yes| Auth{Authenticated?}
    Auth -->|No| Error401[Return 401]
    Auth -->|Yes| Process[Process Request]
    Process --> Success{Success?}
    Success -->|No| Error500[Return 500]
    Success -->|Yes| Return200[Return 200]
    
    Error400 --> Log[Log Error]
    Error401 --> Log
    Error500 --> Log
    Log --> End([End])
    Return200 --> End
```
````

---

## âœ… DIAGRAM CHECKLIST

### Before Publishing

- [ ] **Clarity**: Diagram Ã© self-explanatory?
- [ ] **Labels**: Todos nodes tÃªm labels descritivos?
- [ ] **Flow**: DireÃ§Ã£o do fluxo Ã© clara (arrows)?
- [ ] **Complexity**: <20 nodes (split se muito complexo)?
- [ ] **Legend**: Precisa de legend? (add como note)
- [ ] **Rendering**: Testa em target platform (GitHub, GitLab)?
- [ ] **Alt text**: Markdown tem descriÃ§Ã£o do diagram?

### Accessibility

```markdown
âœ… GOOD:
**Figure 1: User Authentication Flow**
```mermaid
sequenceDiagram
    ...
```
*This diagram shows the authentication process...*

âŒ BAD:
```mermaid
sequenceDiagram
    ...
```
(No context, no description)
```

---

## ðŸ”— IntegraÃ§Ã£o com Outros Artefatos

- **${AVANADE_DOC_STANDARDS_MD}**: Mermaid patterns seguem doc standards
- **${AVANADE_COMMONMARK_TEMPLATE_MD}**: Mermaid em fenced code blocks
- **${AVANADE_MEMORY_TECH_WRITER_PAIGE}**: Diagram patterns library (Section 3)
- **${AVANADE_EXPLANATION_TEMPLATE_MD}**: Use diagramas para explicar conceitos

---

## ðŸ“– REFERENCES

- **Mermaid Docs**: <https://mermaid.js.org/>
- **Mermaid Live Editor**: <https://mermaid.live/>
- **GitHub Mermaid Support**: <https://github.blog/2022-02-14-include-diagrams-markdown-files-mermaid/>

---
