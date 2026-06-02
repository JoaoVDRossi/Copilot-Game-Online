# ============================================================================
# SEÃ‡ÃƒO 1: INFORMAÃ‡Ã•ES GERAIS
# ============================================================================

test_plan:
  metadata:
    id: TP-[NÃšMERO]
    name: "[Nome Descritivo do Test Plan]"
    version: "1.0"
    status: "[Draft | In Review | Approved | In Execution | Completed]"
    created_date: "YYYY-MM-DD"
    last_updated: "YYYY-MM-DD"
    author: "[Nome do QA]"
    reviewers:
      - "[Nome do Reviewer 1]"
      - "[Nome do Reviewer 2]"
    
  scope:
    description: |
      [Descreva o que serÃ¡ testado neste plano. Seja especÃ­fico sobre features, 
      componentes, e funcionalidades incluÃ­das.]
    
    features_in_scope:
      - feature: "[Nome da Feature 1]"
        description: "[DescriÃ§Ã£o breve]"
        priority: "[High | Medium | Low]"
      
      - feature: "[Nome da Feature 2]"
        description: "[DescriÃ§Ã£o breve]"
        priority: "[High | Medium | Low]"
    
    features_out_of_scope:
      - "[Feature/componente explicitamente FORA do escopo]"
      - "[Outra funcionalidade nÃ£o testada neste ciclo]"
    
    environments:
      - name: "Development"
        url: "https://dev.example.com"
        database: "dev-db"
        
      - name: "Staging"
        url: "https://staging.example.com"
        database: "staging-db"
        
      - name: "Production"
        url: "https://prod.example.com"
        database: "prod-db"

# ============================================================================
# SEÃ‡ÃƒO 2: OBJETIVOS E CRITÃ‰RIOS
# ============================================================================

  objectives:
    primary:
      - "[Objetivo principal do teste - ex: Validar funcionalidade de checkout]"
      - "[Garantir performance aceitÃ¡vel sob carga]"
    
    secondary:
      - "[Objetivo secundÃ¡rio - ex: Validar acessibilidade WCAG AA]"
      - "[Verificar compatibilidade cross-browser]"
  
  success_criteria:
    - criterion: "Test Coverage"
      target: ">=80% code coverage"
      
    - criterion: "Pass Rate"
      target: ">=95% de testes passando"
      
    - criterion: "Critical Bugs"
      target: "Zero bugs crÃ­ticos em produÃ§Ã£o"
      
    - criterion: "Performance"
      target: "Tempo de resposta <2s para 95% das requisiÃ§Ãµes"

  exit_criteria:
    - "[Todos os test cases executados]"
    - "[95% dos testes passando]"
    - "[Zero bugs de severidade Critical ou High abertos]"
    - "[Performance benchmarks atingidos]"
    - "[Security scan completado sem vulnerabilidades High]"

# ============================================================================
# SEÃ‡ÃƒO 3: ESTRATÃ‰GIA DE TESTES
# ============================================================================

  test_strategy:
    test_levels:
      unit_testing:
        description: "Testes de unidade para lÃ³gica de negÃ³cio"
        coverage_target: "80%"
        responsibility: "Developers (Tiago)"
        tools:
          - "Jest"
          - "JUnit"
        execution_frequency: "A cada commit (CI/CD)"
      
      integration_testing:
        description: "Testes de integraÃ§Ã£o entre componentes/serviÃ§os"
        coverage_target: "70%"
        responsibility: "QA Team (Carla)"
        tools:
          - "Postman/Newman"
          - "Cypress (component testing)"
        execution_frequency: "A cada build"
      
      system_testing:
        description: "Testes end-to-end de fluxos completos"
        coverage_target: "Main user journeys (100%)"
        responsibility: "QA Team (Carla)"
        tools:
          - "Selenium/Playwright"
          - "Cypress"
        execution_frequency: "Daily automated + manual antes de release"
      
      acceptance_testing:
        description: "ValidaÃ§Ã£o de AC (Acceptance Criteria) com PO"
        coverage_target: "Todas as stories"
        responsibility: "PO (Paula) + QA (Carla)"
        tools:
          - "Manual testing"
          - "Behavior-driven tests (Cucumber)"
        execution_frequency: "Ao final de cada story"
    
    test_types:
      functional:
        description: "ValidaÃ§Ã£o de requisitos funcionais"
        priority: "High"
        automated: true
        
      regression:
        description: "Garantir que novas mudanÃ§as nÃ£o quebraram funcionalidades existentes"
        priority: "High"
        automated: true
        scope: "Full regression suite a cada release"
        
      performance:
        description: "Load testing, stress testing, spike testing"
        priority: "Medium"
        automated: true
        tools:
          - "JMeter"
          - "k6"
        metrics:
          - "Response time: <2s (p95)"
          - "Throughput: 1000 req/s"
          - "Error rate: <1%"
      
      security:
        description: "Vulnerability scanning, penetration testing"
        priority: "High"
        automated: true
        tools:
          - "OWASP ZAP"
          - "Snyk"
        scope:
          - "SQL injection"
          - "XSS"
          - "Authentication/Authorization"
          - "Sensitive data exposure"
      
      usability:
        description: "User experience validation"
        priority: "Medium"
        automated: false
        responsibility: "Sofia (UX) + Carla (QA)"
        
      accessibility:
        description: "WCAG 2.1 AA compliance"
        priority: "High"
        automated: true
        tools:
          - "axe DevTools"
          - "WAVE"
        standards: "WCAG 2.1 Level AA"
      
      compatibility:
        description: "Cross-browser and cross-device testing"
        priority: "Medium"
        automated: true
        browsers:
          - "Chrome (latest 2 versions)"
          - "Firefox (latest 2 versions)"
          - "Safari (latest version)"
          - "Edge (latest version)"
        devices:
          - "Desktop (1920x1080, 1366x768)"
          - "Tablet (iPad, Android tablet)"
          - "Mobile (iPhone, Android phone)"

# ============================================================================
# SEÃ‡ÃƒO 4: TEST CASES
# ============================================================================

  test_cases:
    - id: "TC-001"
      title: "[TÃ­tulo do Test Case - ex: Login com credenciais vÃ¡lidas]"
      priority: "[Critical | High | Medium | Low]"
      type: "[Functional | Regression | Performance | Security]"
      automated: true
      
      preconditions:
        - "[UsuÃ¡rio cadastrado no sistema]"
        - "[Banco de dados populado com dados de teste]"
      
      test_steps:
        - step: 1
          action: "Navegar para pÃ¡gina de login"
          expected_result: "PÃ¡gina de login Ã© exibida com campos email e senha"
        
        - step: 2
          action: "Inserir email vÃ¡lido: test@example.com"
          expected_result: "Email Ã© aceito no campo"
        
        - step: 3
          action: "Inserir senha vÃ¡lida: Password123!"
          expected_result: "Senha Ã© aceita (mascarada)"
        
        - step: 4
          action: "Clicar no botÃ£o 'Login'"
          expected_result: "UsuÃ¡rio Ã© redirecionado para dashboard"
      
      expected_outcome: "Login bem-sucedido e usuÃ¡rio autenticado"
      
      test_data:
        - email: "test@example.com"
          password: "Password123!"
          expected: "success"
      
      postconditions:
        - "[UsuÃ¡rio estÃ¡ logado]"
        - "[Session token Ã© criado]"
    
    # ---- Test Case 2 ----
    - id: "TC-002"
      title: "[Login com senha incorreta]"
      priority: "High"
      type: "Functional"
      automated: true
      
      test_steps:
        - step: 1
          action: "Navegar para login"
          expected_result: "PÃ¡gina de login exibida"
        
        - step: 2
          action: "Inserir email vÃ¡lido + senha incorreta"
          expected_result: "Erro: 'Credenciais invÃ¡lidas'"
      
      expected_outcome: "Login falha com mensagem de erro apropriada"
    
    # ---- Test Case 3 - Performance ----
    - id: "TC-003"
      title: "[Load test - 1000 usuÃ¡rios simultÃ¢neos]"
      priority: "High"
      type: "Performance"
      automated: true
      
      test_steps:
        - step: 1
          action: "Configurar JMeter com 1000 threads"
          expected_result: "ConfiguraÃ§Ã£o aplicada"
        
        - step: 2
          action: "Executar teste de carga por 5 minutos"
          expected_result: "Sistema responde a todas requisiÃ§Ãµes"
      
      expected_outcome: |
        - Response time p95 < 2s
        - Error rate < 1%
        - No server crashes
      
      performance_metrics:
        - metric: "Response Time (p95)"
          target: "<2s"
        - metric: "Error Rate"
          target: "<1%"
        - metric: "Throughput"
          target: ">1000 req/s"

# ============================================================================
# SEÃ‡ÃƒO 5: TEST DATA
# ============================================================================

  test_data:
    description: "Massa de dados necessÃ¡ria para execuÃ§Ã£o dos testes"
    
    users:
      - username: "admin@test.com"
        password: "Admin123!"
        role: "Administrator"
        status: "Active"
      
      - username: "user@test.com"
        password: "User123!"
        role: "Standard User"
        status: "Active"
      
      - username: "inactive@test.com"
        password: "Inactive123!"
        role: "Standard User"
        status: "Inactive"
    
    products:
      - id: "PROD-001"
        name: "Laptop Dell XPS 15"
        price: 1500.00
        stock: 50
      
      - id: "PROD-002"
        name: "Mouse Logitech MX Master"
        price: 99.99
        stock: 200
    
    data_sources:
      - type: "Database seed"
        location: "scripts/test-data-seed.sql"
        
      - type: "API mocks"
        location: "mocks/api-responses.json"

# ============================================================================
# SEÃ‡ÃƒO 6: CRONOGRAMA E RECURSOS
# ============================================================================

  schedule:
    milestones:
      - milestone: "Test Plan Approval"
        date: "YYYY-MM-DD"
        owner: "Carla (QA)"
      
      - milestone: "Test Environment Setup"
        date: "YYYY-MM-DD"
        owner: "DevOps"
      
      - milestone: "Test Execution Start"
        date: "YYYY-MM-DD"
        owner: "QA Team"
      
      - milestone: "Regression Testing"
        date: "YYYY-MM-DD"
        owner: "QA Team"
      
      - milestone: "UAT (User Acceptance Testing)"
        date: "YYYY-MM-DD"
        owner: "Paula (PO)"
      
      - milestone: "Go-Live Decision"
        date: "YYYY-MM-DD"
        owner: "Project Stakeholders"
  
  resources:
    team:
      - name: "Carla Santos"
        role: "QA Lead"
        allocation: "100%"
      
      - name: "Tiago Alves"
        role: "Developer (Unit Tests)"
        allocation: "30%"
      
      - name: "Paula Silva"
        role: "Product Owner (UAT)"
        allocation: "20%"
    
    tools:
      - name: "Jira"
        purpose: "Test case management"
        license: "Existing"
      
      - name: "Selenium Grid"
        purpose: "Automated UI testing"
        license: "Open-source"
      
      - name: "JMeter"
        purpose: "Performance testing"
        license: "Open-source"
    
    environments:
      - name: "Staging"
        availability: "24/7"
        url: "https://staging.example.com"

# ============================================================================
# SEÃ‡ÃƒO 7: RISCOS E MITIGAÃ‡ÃƒO
# ============================================================================

  risks:
    - risk: "Test environment instÃ¡vel"
      probability: "Medium"
      impact: "High"
      mitigation: |
        - Dedicar ambiente staging exclusivo para QA
        - Setup automÃ¡tico via Infrastructure-as-Code
        - Smoke tests antes de iniciar suite completa
      owner: "DevOps + Carla"
    
    - risk: "Dados de teste insuficientes"
      probability: "Low"
      impact: "Medium"
      mitigation: |
        - Data seeding scripts mantidos em repo
        - DocumentaÃ§Ã£o de test data requirements
      owner: "Carla + Tiago"
    
    - risk: "Flaky tests (testes intermitentes)"
      probability: "High"
      impact: "Medium"
      mitigation: |
        - Retry logic para testes UI (mÃ¡x 2 retries)
        - Timeouts adequados
        - InvestigaÃ§Ã£o e fix de testes flaky prioritariamente
      owner: "QA Team"
    
    - risk: "Atraso na entrega de features para teste"
      probability: "Medium"
      impact: "High"
      mitigation: |
        - Buffer de 2 dias no cronograma
        - PriorizaÃ§Ã£o de test cases crÃ­ticos primeiro
        - ComunicaÃ§Ã£o diÃ¡ria com Scrum Master (Roberto)
      owner: "Roberto + Carla"

# ============================================================================
# SEÃ‡ÃƒO 8: DEFEITOS E MÃ‰TRICAS
# ============================================================================

  defect_management:
    severity_levels:
      critical:
        description: "Sistema inoperante, perda de dados, security breach"
        sla_response: "2 hours"
        sla_resolution: "24 hours"
      
      high:
        description: "Funcionalidade principal quebrada, workaround difÃ­cil"
        sla_response: "4 hours"
        sla_resolution: "48 hours"
      
      medium:
        description: "Funcionalidade quebrada com workaround viÃ¡vel"
        sla_response: "1 day"
        sla_resolution: "1 week"
      
      low:
        description: "Defeitos cosmÃ©ticos, minor issues"
        sla_response: "3 days"
        sla_resolution: "Next sprint"
    
    defect_workflow:
      - status: "New"
        description: "Defeito reportado"
      - status: "Assigned"
        description: "Desenvolvedor atribuÃ­do"
      - status: "In Progress"
        description: "CorreÃ§Ã£o em andamento"
      - status: "Fixed"
        description: "CorreÃ§Ã£o implementada"
      - status: "Ready for Retest"
        description: "Deploy em ambiente de teste"
      - status: "Verified"
        description: "QA validou correÃ§Ã£o"
      - status: "Closed"
        description: "Defeito resolvido"
  
  metrics:
    tracked_metrics:
      - metric: "Test Coverage"
        formula: "(Lines executed / Total lines) * 100"
        target: ">=80%"
        tracking_frequency: "Daily"
      
      - metric: "Defect Density"
        formula: "Total defects / KLOC (thousands of lines of code)"
        target: "<5 defects/KLOC"
        tracking_frequency: "Weekly"
      
      - metric: "Test Pass Rate"
        formula: "(Passed tests / Total tests) * 100"
        target: ">=95%"
        tracking_frequency: "Per test run"
      
      - metric: "Defect Leakage to Production"
        formula: "Production bugs / Total bugs found"
        target: "<5%"
        tracking_frequency: "Per release"
      
      - metric: "Test Execution Progress"
        formula: "(Executed tests / Planned tests) * 100"
        target: "100% by deadline"
        tracking_frequency: "Daily"

# ============================================================================
# SEÃ‡ÃƒO 9: APROVAÃ‡Ã•ES E SIGN-OFF
# ============================================================================

  approvals:
    - approver: "Paula Silva (Product Owner)"
      role: "Business Acceptance"
      status: "[Pending | Approved | Rejected]"
      date: "YYYY-MM-DD"
      comments: "[ComentÃ¡rios do aprovador]"
    
    - approver: "Wilson Santos (Architect)"
      role: "Technical Review"
      status: "[Pending | Approved | Rejected]"
      date: "YYYY-MM-DD"
      comments: "[ComentÃ¡rios do aprovador]"
    
    - approver: "Roberto Costa (Scrum Master)"
      role: "Process Compliance"
      status: "[Pending | Approved | Rejected]"
      date: "YYYY-MM-DD"
      comments: "[ComentÃ¡rios do aprovador]"

# ============================================================================
# SEÃ‡ÃƒO 10: ANEXOS E REFERÃŠNCIAS
# ============================================================================

  references:
    - type: "Requirements"
      document: "PRD - Product Requirements Document"
      location: "${AVANADE_PRD_TEMPLATE_YAML}"
    
    - type: "Architecture"
      document: "Architecture Design Document"
      location: "${AVANADE_ARCHITECTURE_TEMPLATE_YAML}"
    
    - type: "User Stories"
      document: "Sprint Backlog"
      location: "Jira - Sprint XX"
    
    - type: "Test Cases"
      document: "Detailed Test Cases"
      location: "Jira Test Repository / TestRail"
    
    - type: "Quality Standards"
      document: "Avanade Quality Checklist"
      location: "${AVANADE_TASK_CODE_REVIEW}"

# ============================================================================
# METADADOS DO TEMPLATE
# ============================================================================

template_metadata:
  version: "1.0"
  created_by: "Avanade Method v6"
  last_updated: "2025-02-03"
  compatible_with:
    - "Agile/Scrum projects"
    - "Waterfall projects"
    - "DevOps/CI-CD environments"
  
  integration_artifacts:
    - "${AVANADE_MEMORY_QA_CARLA}"
    - "${AVANADE_TASK_CODE_REVIEW}"
    - "${AVANADE_TASK_TEST_COVERAGE}"
    - "${AVANADE_STORY_DOD_CHECKLIST_MD}"
  
  usage_instructions: |
    1. Copie este template para um novo arquivo
    2. Substitua todos os placeholders [ENTRE COLCHETES]
    3. Remova seÃ§Ãµes nÃ£o aplicÃ¡veis ao seu contexto
    4. Adicione test cases especÃ­ficos do seu projeto
    5. Valide com ${AVANADE_TASK_ADVERSARIAL_REVIEW}
    6. Obtenha aprovaÃ§Ã£o de stakeholders
    7. Execute e atualize status regularmente

