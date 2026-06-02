# ============================================================================
# SEÃ‡ÃƒO 1: INFORMAÃ‡Ã•ES GERAIS DO WIREFRAME
# ============================================================================

wireframe:
  metadata:
    id: "WF-[NÃšMERO]"
    name: "[Nome da Tela/Fluxo - ex: Login Screen, Dashboard]"
    version: "1.0"
    status: "[Draft | In Review | Approved | In Development]"
    created_date: "YYYY-MM-DD"
    last_updated: "YYYY-MM-DD"
    designer: "[Nome do UX Designer]"
    stakeholders:
      - "[Product Owner - Paula]"
      - "[Developer - Tiago]"
      - "[QA - Carla]"
    
    fidelity: "[Low-Fi | Mid-Fi | High-Fi]"
    tools_used:
      - "[Figma | Sketch | Adobe XD | Balsamiq]"
    
  context:
    user_story_reference: "[US-XXX: Como [persona], quero [aÃ§Ã£o] para [benefÃ­cio]]"
    epic_reference: "[EPIC-XXX: Nome do Epic]"
    user_persona: "[Nome da Persona Principal - ex: Ana, Gerente de Vendas]"
    use_case: |
      [DescriÃ§Ã£o do caso de uso:
      O usuÃ¡rio precisa fazer login no sistema para acessar funcionalidades
      protegidas. O fluxo deve ser simples e suportar autenticaÃ§Ã£o social.]

# ============================================================================
# SEÃ‡ÃƒO 2: USER FLOW
# ============================================================================

  user_flow:
    description: "Jornada do usuÃ¡rio atravÃ©s das telas"
    
    steps:
      - step: 1
        screen: "Landing Page"
        action: "UsuÃ¡rio clica em 'Login'"
        next_screen: "Login Screen (WF-001)"
      
      - step: 2
        screen: "Login Screen"
        action: "UsuÃ¡rio insere credenciais e clica 'Entrar'"
        next_screen: "Dashboard (WF-002)"
        alternative_flow:
          - condition: "Credenciais invÃ¡lidas"
            next_screen: "Login Screen (erro exibido)"
          - condition: "Primeiro acesso"
            next_screen: "Onboarding Wizard (WF-003)"
      
      - step: 3
        screen: "Dashboard"
        action: "UsuÃ¡rio visualiza overview de dados"
        next_screen: "[MÃºltiplas opÃ§Ãµes de navegaÃ§Ã£o]"
    
    flow_diagram_link: "[URL do Figma/Miro com diagrama visual do fluxo]"

# ============================================================================
# SEÃ‡ÃƒO 3: LAYOUT E ESTRUTURA
# ============================================================================

  layout:
    screen_type: "[Desktop | Mobile | Tablet | Responsive]"
    orientation: "[Portrait | Landscape | Adaptive]"
    
    dimensions:
      desktop:
        width: "1920px"
        height: "1080px"
        breakpoint: ">=1024px"
      
      tablet:
        width: "768px"
        height: "1024px"
        breakpoint: "768px - 1023px"
      
      mobile:
        width: "375px"
        height: "812px"
        breakpoint: "<768px"
    
    grid_system:
      columns: 12
      gutter: "24px"
      margin: "32px"
      max_width: "1440px"
      
    regions:
      - region: "Header"
        height: "64px"
        position: "fixed-top"
        components:
          - "Logo"
          - "Navigation Menu"
          - "User Avatar"
          - "Search Bar"
      
      - region: "Main Content Area"
        height: "calc(100vh - 64px - 48px)"
        position: "scrollable"
        components:
          - "[Componentes principais da tela]"
      
      - region: "Footer"
        height: "48px"
        position: "fixed-bottom"
        components:
          - "Copyright"
          - "Links de suporte"

# ============================================================================
# SEÃ‡ÃƒO 4: COMPONENTES E ELEMENTOS
# ============================================================================

  components:
    # ---- Componente 1: Form de Login ----
    - id: "COMP-001"
      name: "Login Form"
      type: "Form"
      fluent_component: "Stack (vertical)"
      
      position:
        x: "center"
        y: "center"
        width: "400px"
        padding: "32px"
      
      elements:
        - element: "TÃ­tulo"
          type: "Text (Heading 1)"
          fluent_component: "Text - variant='xLarge'"
          content: "Bem-vindo de volta"
          style:
            font_size: "32px"
            font_weight: "600"
            color: "neutralPrimary"
        
        - element: "SubtÃ­tulo"
          type: "Text (Body)"
          fluent_component: "Text - variant='medium'"
          content: "Entre com suas credenciais"
          style:
            font_size: "14px"
            color: "neutralSecondary"
            margin_bottom: "24px"
        
        - element: "Campo Email"
          type: "Input - Text"
          fluent_component: "TextField"
          properties:
            label: "Email"
            placeholder: "seu.email@exemplo.com"
            required: true
            type: "email"
            error_message: "Por favor, insira um email vÃ¡lido"
            validation: "email format"
            autocomplete: "email"
          
          states:
            default: "Borda neutral, sem foco"
            focused: "Borda azul (themePrimary), label animada para cima"
            error: "Borda vermelha, mensagem de erro exibida"
            disabled: "Opacidade 0.6, cursor not-allowed"
        
        - element: "Campo Senha"
          type: "Input - Password"
          fluent_component: "TextField (type=password)"
          properties:
            label: "Senha"
            placeholder: "Digite sua senha"
            required: true
            type: "password"
            show_password_toggle: true
            autocomplete: "current-password"
          
          interactions:
            - action: "Click no Ã­cone de olho"
              behavior: "Alternar visibilidade da senha (text/password)"
        
        - element: "Checkbox 'Lembrar-me'"
          type: "Checkbox"
          fluent_component: "Checkbox"
          properties:
            label: "Manter-me conectado"
            default_checked: false
        
        - element: "Link 'Esqueci a senha'"
          type: "Link"
          fluent_component: "Link"
          properties:
            text: "Esqueceu sua senha?"
            href: "/forgot-password"
            style: "underline on hover"
        
        - element: "BotÃ£o Login"
          type: "Button - Primary"
          fluent_component: "PrimaryButton"
          properties:
            text: "Entrar"
            icon: "SignIn (opcional)"
            full_width: true
            loading_state: "Spinner quando autenticando"
          
          states:
            default: "Background themePrimary, texto branco"
            hover: "Background themeDarkAlt"
            pressed: "Background themeDark"
            disabled: "Opacidade 0.6, cursor not-allowed"
            loading: "Spinner + texto 'Entrando...'"
          
          interactions:
            - action: "Click"
              behavior: "Validar form â†’ API call â†’ Loading state â†’ Redirect ou erro"
        
        - element: "Divider"
          type: "Separator"
          fluent_component: "Separator"
          properties:
            text: "ou"
            margin: "24px 0"
        
        - element: "BotÃ£o Login Social - Google"
          type: "Button - Default"
          fluent_component: "DefaultButton"
          properties:
            text: "Continuar com Google"
            icon: "Google logo"
            full_width: true
          
          interactions:
            - action: "Click"
              behavior: "OAuth flow do Google"
        
        - element: "Link 'Criar conta'"
          type: "Text + Link"
          content: "NÃ£o tem uma conta? <Link>Cadastre-se</Link>"
          fluent_component: "Text + Link"

    # ---- Componente 2: Header ----
    - id: "COMP-002"
      name: "Application Header"
      type: "Navigation"
      fluent_component: "CommandBar"
      
      elements:
        - element: "Logo"
          type: "Image + Link"
          position: "left"
          action: "Navegar para home"
        
        - element: "Navigation Menu"
          type: "Nav (horizontal)"
          fluent_component: "Nav - horizontal variant"
          items:
            - label: "Dashboard"
              href: "/dashboard"
              icon: "Home"
            - label: "Projetos"
              href: "/projects"
              icon: "FabricFolder"
            - label: "RelatÃ³rios"
              href: "/reports"
              icon: "BarChartVertical"
        
        - element: "Search Bar"
          type: "SearchBox"
          fluent_component: "SearchBox"
          position: "center"
          properties:
            placeholder: "Buscar..."
            width: "300px"
        
        - element: "User Avatar + Dropdown"
          type: "Persona + Callout"
          fluent_component: "Persona + ContextualMenu"
          position: "right"
          properties:
            show_name: true
            show_avatar: true
          
          dropdown_items:
            - label: "Meu Perfil"
              icon: "Contact"
              href: "/profile"
            - label: "ConfiguraÃ§Ãµes"
              icon: "Settings"
              href: "/settings"
            - label: "Sair"
              icon: "SignOut"
              action: "Logout"

# ============================================================================
# SEÃ‡ÃƒO 5: INTERAÃ‡Ã•ES E COMPORTAMENTOS
# ============================================================================

  interactions:
    - interaction: "Login Success"
      trigger: "FormulÃ¡rio vÃ¡lido + API retorna sucesso"
      behavior: |
        1. BotÃ£o entra em loading state (spinner)
        2. API call (POST /api/auth/login)
        3. Sucesso: Salvar token â†’ Redirect /dashboard
        4. AnimaÃ§Ã£o de transiÃ§Ã£o (fade out â†’ fade in)
      animation:
        type: "Fade transition"
        duration: "300ms"
        easing: "ease-in-out"
    
    - interaction: "Login Error"
      trigger: "API retorna erro (401, 400)"
      behavior: |
        1. Exibir MessageBar (tipo error) no topo do form
        2. Mensagem: "Email ou senha incorretos. Tente novamente."
        3. BotÃ£o volta ao estado normal
        4. Focar no campo de email
      animation:
        type: "Shake animation no form"
        duration: "500ms"
    
    - interaction: "Forgot Password"
      trigger: "Click em 'Esqueceu sua senha?'"
      behavior: "Navegar para /forgot-password (nova tela WF-004)"
    
    - interaction: "Social Login - Google"
      trigger: "Click em botÃ£o Google"
      behavior: |
        1. Abrir popup OAuth do Google
        2. UsuÃ¡rio autoriza
        3. Callback com token
        4. Redirect para dashboard
    
    - interaction: "Responsive Behavior - Mobile"
      trigger: "Viewport < 768px"
      behavior: |
        - Form ocupa 100% da largura (padding 16px)
        - BotÃµes sociais empilham verticalmente
        - Header colapsa em menu hamburger
        - Logo reduz tamanho

# ============================================================================
# SEÃ‡ÃƒO 6: ESTADOS E VARIAÃ‡Ã•ES
# ============================================================================

  states:
    - state: "Empty State"
      description: "Quando nÃ£o hÃ¡ dados para exibir"
      components:
        - "Ãcone ilustrativo (large)"
        - "TÃ­tulo: 'Nenhum item encontrado'"
        - "SubtÃ­tulo: 'Comece adicionando seu primeiro item'"
        - "CTA Button: 'Adicionar Item'"
    
    - state: "Loading State"
      description: "Enquanto dados sÃ£o carregados"
      components:
        - "Skeleton screens (shimmer effect)"
        - "Spinner central (para carregamento inicial)"
        - "ProgressIndicator (para uploads/downloads)"
    
    - state: "Error State"
      description: "Quando ocorre erro"
      components:
        - "MessageBar - tipo error"
        - "Mensagem descritiva do erro"
        - "BotÃ£o 'Tentar novamente'"
    
    - state: "Success State"
      description: "ApÃ³s aÃ§Ã£o bem-sucedida"
      components:
        - "MessageBar - tipo success"
        - "Mensagem: 'OperaÃ§Ã£o realizada com sucesso'"
        - "Auto-dismiss apÃ³s 5 segundos"

# ============================================================================
# SEÃ‡ÃƒO 7: DESIGN TOKENS (FLUENT DESIGN SYSTEM)
# ============================================================================

  design_tokens:
    colors:
      primary: 
        themePrimary: "#0078D4"          # Azure blue
        themeDarkAlt: "#106EBE"
        themeDark: "#005A9E"
        themeLighter: "#C7E0F4"
        themeLight: "#DEECF9"
      
      neutral:
        neutralPrimary: "#323130"        # Texto principal
        neutralSecondary: "#605E5C"      # Texto secundÃ¡rio
        neutralTertiary: "#A19F9D"       # Texto desabilitado
        neutralLight: "#EDEBE9"          # Bordas
        neutralLighter: "#F3F2F1"        # Backgrounds sutis
        white: "#FFFFFF"
      
      semantic:
        errorText: "#A4262C"
        errorBackground: "#FDE7E9"
        successText: "#107C10"
        successBackground: "#DFF6DD"
        warningText: "#797673"
        warningBackground: "#FFF4CE"
    
    typography:
      font_family: "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif"
      
      heading_1:
        font_size: "32px"
        font_weight: "600"
        line_height: "40px"
      
      heading_2:
        font_size: "24px"
        font_weight: "600"
        line_height: "32px"
      
      body_1:
        font_size: "14px"
        font_weight: "400"
        line_height: "20px"
      
      caption:
        font_size: "12px"
        font_weight: "400"
        line_height: "16px"
    
    spacing:
      xs: "4px"
      sm: "8px"
      md: "16px"
      lg: "24px"
      xl: "32px"
      xxl: "48px"
    
    elevation:
      depth_4: "box-shadow: 0 1.6px 3.6px rgba(0,0,0,0.13), 0 0.3px 0.9px rgba(0,0,0,0.11)"
      depth_8: "box-shadow: 0 3.2px 7.2px rgba(0,0,0,0.13), 0 0.6px 1.8px rgba(0,0,0,0.11)"
      depth_16: "box-shadow: 0 6.4px 14.4px rgba(0,0,0,0.13), 0 1.2px 3.6px rgba(0,0,0,0.11)"
    
    border_radius:
      small: "2px"
      medium: "4px"
      large: "8px"

# ============================================================================
# SEÃ‡ÃƒO 8: ACESSIBILIDADE (WCAG 2.1)
# ============================================================================

  accessibility:
    wcag_level: "AA"
    
    requirements:
      - requirement: "Contrast Ratio"
        standard: "WCAG 2.1 - 1.4.3"
        implementation: |
          - Texto normal: mÃ­nimo 4.5:1
          - Texto grande (18pt+): mÃ­nimo 3:1
          - Componentes UI: mÃ­nimo 3:1
        validation_tool: "axe DevTools, WAVE"
      
      - requirement: "Keyboard Navigation"
        standard: "WCAG 2.1 - 2.1.1"
        implementation: |
          - Tab order lÃ³gico (top-to-bottom, left-to-right)
          - Todos elementos interativos acessÃ­veis via teclado
          - Esc fecha modals/dropdowns
          - Enter/Space ativam botÃµes
          - Setas navegam em listas/menus
        focus_indicators: "Borda azul 2px, offset 2px"
      
      - requirement: "Screen Reader Support"
        standard: "WCAG 2.1 - 1.3.1, 4.1.2"
        implementation: |
          - ARIA labels em Ã­cones sem texto
          - role attributes apropriados
          - aria-live para notificaÃ§Ãµes dinÃ¢micas
          - alt text em imagens informativas
          - Landmarks (header, main, nav, footer)
        testing: "NVDA, JAWS, VoiceOver"
      
      - requirement: "Forms Accessibility"
        standard: "WCAG 2.1 - 3.3.2"
        implementation: |
          - Labels associados a inputs (htmlFor)
          - Error messages via aria-describedby
          - Required fields marcados (aria-required)
          - Field validation com feedback visual e textual
      
      - requirement: "Responsive Text"
        standard: "WCAG 2.1 - 1.4.4"
        implementation: "Texto escalÃ¡vel atÃ© 200% sem perda de funcionalidade"
    
    testing_checklist:
      - "[ ] Contrast checker passed"
      - "[ ] Keyboard navigation testado"
      - "[ ] Screen reader testado (NVDA/JAWS)"
      - "[ ] Focus indicators visÃ­veis"
      - "[ ] ARIA labels corretos"
      - "[ ] Forms acessÃ­veis"
      - "[ ] Zoom 200% funcional"

# ============================================================================
# SEÃ‡ÃƒO 9: RESPONSIVIDADE
# ============================================================================

  responsive_design:
    breakpoints:
      mobile: "<768px"
      tablet: "768px - 1023px"
      desktop: ">=1024px"
    
    adaptations:
      - breakpoint: "mobile"
        changes:
          - "Navigation: Hamburger menu"
          - "Form: Full width (padding 16px)"
          - "BotÃµes: Stack verticalmente"
          - "Typography: Reduzir H1 para 24px"
          - "Grid: 4 colunas"
          - "Header: Logo menor, search colapsado"
      
      - breakpoint: "tablet"
        changes:
          - "Navigation: Horizontal visÃ­vel (collapsed)"
          - "Form: Max-width 500px, centered"
          - "Grid: 8 colunas"
      
      - breakpoint: "desktop"
        changes:
          - "Full navigation visÃ­vel"
          - "Form: Max-width 400px"
          - "Grid: 12 colunas"
          - "Hover states ativos"

# ============================================================================
# SEÃ‡ÃƒO 10: ANOTAÃ‡Ã•ES E ESPECIFICAÃ‡Ã•ES
# ============================================================================

  annotations:
    - component: "Login Button"
      note: |
        IMPORTANTE: Desabilitar botÃ£o quando campos obrigatÃ³rios vazios.
        Loading state deve exibir spinner + texto 'Entrando...'
        Considerar throttling (debounce) para evitar mÃºltiplos cliques.
    
    - component: "Password Field"
      note: |
        Implementar validaÃ§Ã£o de forÃ§a de senha no cadastro (nÃ£o no login).
        Toggle de visibilidade deve ter aria-label 'Mostrar senha'/'Ocultar senha'.
    
    - component: "Social Login"
      note: |
        Popup OAuth - implementar verificaÃ§Ã£o se popup foi bloqueado.
        Fallback: redirecionar para pÃ¡gina OAuth em vez de popup.
    
    - component: "Error Messages"
      note: |
        Nunca expor se email existe ou nÃ£o (security).
        Mensagem genÃ©rica: 'Email ou senha incorretos'.

# ============================================================================
# SEÃ‡ÃƒO 11: ASSETS E RECURSOS
# ============================================================================

  assets:
    icons:
      - name: "SignIn"
        source: "Fluent UI Icons"
        usage: "BotÃ£o de login"
      
      - name: "Eye / EyeOff"
        source: "Fluent UI Icons"
        usage: "Toggle de visibilidade de senha"
    
    images:
      - name: "Logo"
        format: "SVG"
        path: "/assets/logo.svg"
        alt_text: "Logo da Empresa"
        responsive: "VersÃ£o mobile: logo icon apenas (sem texto)"
    
    illustrations:
      - name: "Empty State Illustration"
        format: "SVG"
        source: "unDraw / Custom"
        usage: "Empty states"

# ============================================================================
# SEÃ‡ÃƒO 12: DESENVOLVIMENTO E HANDOFF
# ============================================================================

  development_notes:
    figma_link: "[URL do arquivo Figma com protÃ³tipo interativo]"
    
    specifications_export:
      - "Design tokens â†’ JSON/CSS variables"
      - "Component specs â†’ Storybook documentation"
      - "Redlines/spacing â†’ Figma Inspect ou Zeplin"
    
    implementation_priority:
      - priority: "P0 - Must Have"
        components:
          - "Login form bÃ¡sico (email + senha)"
          - "ValidaÃ§Ã£o de campos"
          - "Error handling"
      
      - priority: "P1 - Should Have"
        components:
          - "Login social (Google)"
          - "Lembrar-me (checkbox)"
          - "AnimaÃ§Ãµes suaves"
      
      - priority: "P2 - Nice to Have"
        components:
          - "Outros provedores OAuth (Facebook, Microsoft)"
          - "Biometria (mobile)"
    
    testing_scenarios:
      - "[ ] Login com credenciais vÃ¡lidas â†’ Success"
      - "[ ] Login com senha incorreta â†’ Error message"
      - "[ ] Login com email invÃ¡lido â†’ Validation error"
      - "[ ] Campos vazios â†’ BotÃ£o desabilitado"
      - "[ ] Keyboard navigation â†’ Tab order correto"
      - "[ ] Screen reader â†’ AnÃºncios corretos"
      - "[ ] Mobile responsive â†’ Layout adaptado"
      - "[ ] Social login â†’ OAuth flow"

# ============================================================================
# SEÃ‡ÃƒO 13: VALIDAÃ‡ÃƒO E APROVAÃ‡ÃƒO
# ============================================================================

  validation:
    design_review:
      reviewer: "Sofia (UX Designer)"
      checklist:
        - "[ ] Fluent Design System aplicado corretamente"
        - "[ ] Accessibility WCAG AA compliance"
        - "[ ] Responsive design validado"
        - "[ ] Interactions especificadas"
        - "[ ] States documentados"
    
    stakeholder_approval:
      - approver: "Paula (Product Owner)"
        status: "[Pending | Approved | Changes Requested]"
        feedback: "[ComentÃ¡rios]"
      
      - approver: "Tiago (Developer)"
        status: "[Pending | Approved | Changes Requested]"
        feedback: "[Viabilidade tÃ©cnica validada]"
      
      - approver: "Carla (QA)"
        status: "[Pending | Approved | Changes Requested]"
        feedback: "[Testabilidade validada]"

# ============================================================================
# SEÃ‡ÃƒO 14: INTEGRAÃ‡ÃƒO COM ARTEFATOS
# ============================================================================

  related_artifacts:
    - artifact: "${AVANADE_MEMORY_UX_SOFIA}"
      usage: "Consultar design patterns validados antes de criar wireframe"
    
    - artifact: "${AVANADE_TASK_UX_CHECKLIST}"
      usage: "Validar wireframe contra checklist de qualidade UX"
    
    - artifact: "${AVANADE_TASK_ACCESSIBILITY_WCAG}"
      usage: "Garantir compliance com WCAG 2.1 AA"
    
    - artifact: "${AVANADE_FLUENT_DESIGN_GUIDELINES_MD}"
      usage: "ReferÃªncia para componentes e design tokens Fluent"
    
    - artifact: "${AVANADE_STORY_TEMPLATE_YAML}"
      usage: "User story que motivou este wireframe"

# ============================================================================
# METADADOS DO TEMPLATE
# ============================================================================

template_metadata:
  version: "1.0"
  created_by: "Avanade Method v6"
  last_updated: "2025-02-03"
  compatible_design_tools:
    - "Figma"
    - "Adobe XD"
    - "Sketch"
    - "Balsamiq"
  
  usage_instructions: |
    1. Copie este template para um novo arquivo
    2. Substitua todos os placeholders [ENTRE COLCHETES]
    3. Adicione componentes especÃ­ficos da sua tela
    4. Especifique todas as interaÃ§Ãµes e estados
    5. Documente design tokens (cores, tipografia, espaÃ§amento)
    6. Valide acessibilidade com ${AVANADE_TASK_ACCESSIBILITY_WCAG}
    7. Exporte para ferramenta visual (Figma) para prototipagem
    8. Obtenha aprovaÃ§Ã£o de stakeholders
    9. FaÃ§a handoff para desenvolvimento com specs completas

