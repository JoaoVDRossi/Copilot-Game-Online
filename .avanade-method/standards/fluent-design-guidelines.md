---

## ðŸ“‹ O que Ã© este Artefato?

Este guia documenta os princÃ­pios, componentes e prÃ¡ticas do **Microsoft Fluent Design System** adaptado para uso em projetos Avanade Method. Serve como referÃªncia central para designers e desenvolvedores garantirem consistÃªncia visual e experiÃªncia de usuÃ¡rio.

---

## ðŸŽ¯ Quando Usar

Use este guia quando:
- âœ… Iniciar design de uma nova interface
- âœ… Escolher componentes UI para implementaÃ§Ã£o
- âœ… Definir paleta de cores e design tokens
- âœ… Validar acessibilidade e responsividade
- âœ… Criar wireframes ou protÃ³tipos de alta fidelidade
- âœ… Fazer code review de componentes UI

---

## ðŸŒŸ PrincÃ­pios do Fluent Design

### 1. **Light** (IluminaÃ§Ã£o)
Criar foco e hierarquia atravÃ©s de luz e sombra.

**ImplementaÃ§Ã£o**:
- **Elevation (Profundidade)**: Usar sombras para indicar hierarquia
  - `depth_4`: Componentes no nÃ­vel da superfÃ­cie (cards)
  - `depth_8`: Componentes ligeiramente elevados (dropdowns, tooltips)
  - `depth_16`: Modais e overlays
  - `depth_64`: Elementos em primeiro plano (menus contextuais)

**Exemplo CSS**:
```css
/* Depth 8 - Dropdown menu */
.dropdown {
  box-shadow: 0 3.2px 7.2px rgba(0,0,0,0.13), 
              0 0.6px 1.8px rgba(0,0,0,0.11);
}
```

---

### 2. **Depth** (Profundidade)
Usar camadas e paralaxe para criar sensaÃ§Ã£o de espaÃ§o tridimensional.

**ImplementaÃ§Ã£o**:
- Z-index consistente
- Overlays semi-transparentes
- TransiÃ§Ãµes suaves entre camadas

**Hierarquia de Z-index**:
- Base content: `z-index: 0`
- Cards/Panels: `z-index: 1`
- Sticky headers: `z-index: 100`
- Dropdowns: `z-index: 1000`
- Tooltips: `z-index: 2000`
- Modals: `z-index: 10000`
- Toast notifications: `z-index: 20000`

---

### 3. **Motion** (Movimento)
AnimaÃ§Ãµes intencionais que guiam atenÃ§Ã£o e facilitam compreensÃ£o.

**PrincÃ­pios**:
- **PropÃ³sito**: Toda animaÃ§Ã£o deve ter uma razÃ£o (feedback, transiÃ§Ã£o, atenÃ§Ã£o)
- **DuraÃ§Ã£o**: RÃ¡pida mas perceptÃ­vel (150-300ms)
- **Easing**: Natural (ease-in-out)

**Timings PadrÃ£o**:
```css
/* Fast - Micro-interactions */
--duration-fast: 150ms;

/* Normal - TransiÃ§Ãµes padrÃ£o */
--duration-normal: 300ms;

/* Slow - TransiÃ§Ãµes complexas */
--duration-slow: 500ms;

/* Easing */
--easing-standard: cubic-bezier(0.4, 0.0, 0.2, 1);
--easing-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1);
--easing-accelerate: cubic-bezier(0.4, 0.0, 1, 1);
```

**Exemplos de Uso**:
- **Hover**: 150ms
- **Focus**: 150ms
- **Dropdown open**: 300ms
- **Modal fade-in**: 300ms
- **Page transition**: 500ms

---

### 4. **Material** (Material)
SuperfÃ­cies e texturas que conectam o digital ao fÃ­sico.

**ImplementaÃ§Ã£o**:
- **Acrylic**: Efeito de vidro translÃºcido (backgrounds)
- **Reveal**: Destacar elementos ao passar o mouse
- **Blur**: Fundos desfocados para modais

**Acrylic Background**:
```css
.acrylic-background {
  background: rgba(243, 242, 241, 0.7);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
}
```

---

### 5. **Scale** (Escala)
Design responsivo que se adapta a mÃºltiplos dispositivos e contextos.

**Breakpoints PadrÃ£o**:
- **Mobile**: 0 - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1365px
- **Large Desktop**: 1366px+

**Grid System**:
- **Colunas**: 12 (desktop), 8 (tablet), 4 (mobile)
- **Gutter**: 24px (desktop), 16px (mobile)
- **Margin**: 32px (desktop), 16px (mobile)

---

## ðŸŽ¨ Design Tokens

### Cores (Color Palette)

#### Primary Colors (Azure Theme)
```yaml
themePrimary: "#0078D4"           # AÃ§Ãµes primÃ¡rias, links, botÃµes
themeLighterAlt: "#EFF6FC"
themeLighter: "#DEECF9"
themeLight: "#C7E0F4"
themeTertiary: "#71AFE5"
themeSecondary: "#2B88D8"
themeDarkAlt: "#106EBE"
themeDark: "#005A9E"
themeDarker: "#004578"
```

#### Neutral Colors
```yaml
# Texto
neutralPrimary: "#323130"        # Texto principal
neutralSecondary: "#605E5C"      # Texto secundÃ¡rio
neutralTertiary: "#A19F9D"       # Texto desabilitado

# Backgrounds
white: "#FFFFFF"
neutralLighterAlt: "#FAF9F8"
neutralLighter: "#F3F2F1"
neutralLight: "#EDEBE9"
neutralQuaternaryAlt: "#E1DFDD"
neutralQuaternary: "#D2D0CE"
neutralTertiaryAlt: "#C8C6C4"

# Bordas
neutralTertiary: "#A19F9D"
neutralSecondary: "#605E5C"
neutralPrimaryAlt: "#3B3A39"
neutralPrimary: "#323130"
neutralDark: "#201F1E"
black: "#000000"
```

#### Semantic Colors
```yaml
# Success (verde)
successText: "#107C10"
successBackground: "#DFF6DD"
successIcon: "#107C10"

# Error (vermelho)
errorText: "#A4262C"
errorBackground: "#FDE7E9"
errorIcon: "#A80000"

# Warning (amarelo/laranja)
warningText: "#797673"
warningBackground: "#FFF4CE"
warningIcon: "#F7630C"

# Info (azul)
infoText: "#0078D4"
infoBackground: "#F3F2F1"
infoIcon: "#0078D4"
```

#### Uso de Cores

**Texto**:
- **PrimÃ¡rio**: `neutralPrimary` (#323130) - TÃ­tulos, corpo de texto
- **SecundÃ¡rio**: `neutralSecondary` (#605E5C) - SubtÃ­tulos, texto auxiliar
- **Desabilitado**: `neutralTertiary` (#A19F9D) - Campos desabilitados

**Backgrounds**:
- **PÃ¡gina**: `white` (#FFFFFF)
- **Card/Panel**: `white` com `depth_4` shadow
- **Hover**: `neutralLighter` (#F3F2F1)
- **Pressed**: `neutralLight` (#EDEBE9)

**Bordas**:
- **Default**: `neutralLight` (#EDEBE9)
- **Focus**: `themePrimary` (#0078D4), 2px
- **Error**: `errorText` (#A4262C), 2px

---

### Tipografia (Typography)

#### Font Family
```css
font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Oxygen', 
             'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 
             sans-serif;
```

#### Type Ramp (Escala TipogrÃ¡fica)

| Variant | Size | Weight | Line Height | Uso |
|---------|------|--------|-------------|-----|
| **mega** | 68px | 600 | 92px | Hero headlines (raro) |
| **xLargePlus** | 32px | 600 | 40px | Page titles |
| **xLarge** | 24px | 600 | 32px | Section headers |
| **large** | 20px | 600 | 28px | Sub-section headers |
| **mediumPlus** | 18px | 600 | 24px | Card titles |
| **medium** | 14px | 600 | 20px | Labels, small headings |
| **small** | 12px | 400 | 16px | Captions, metadata |
| **xSmall** | 10px | 400 | 14px | Micro text (timestamps) |

#### Body Text
```css
/* Body 1 - Texto padrÃ£o */
font-size: 14px;
font-weight: 400;
line-height: 20px;
color: var(--neutralPrimary);

/* Body 2 - Texto secundÃ¡rio */
font-size: 14px;
font-weight: 400;
line-height: 20px;
color: var(--neutralSecondary);
```

#### Font Weights
- **Regular**: 400 (body text)
- **Semibold**: 600 (headings, labels)
- **Bold**: 700 (raramente usado, apenas Ãªnfase)

---

### EspaÃ§amento (Spacing)

Sistema de espaÃ§amento baseado em mÃºltiplos de 4px:

```yaml
spacing-xs: 4px       # EspaÃ§amento mÃ­nimo
spacing-sm: 8px       # Pequeno (entre elementos relacionados)
spacing-md: 16px      # MÃ©dio (padrÃ£o entre componentes)
spacing-lg: 24px      # Grande (entre seÃ§Ãµes)
spacing-xl: 32px      # Extra grande (margens externas)
spacing-xxl: 48px     # EspaÃ§amento generoso (hero sections)
```

**AplicaÃ§Ã£o**:
- **Gap entre elementos inline**: 8px
- **Padding interno de botÃ£o**: 16px horizontal, 8px vertical
- **Margin entre parÃ¡grafos**: 16px
- **Padding de cards**: 24px
- **Margin entre seÃ§Ãµes**: 32px ou 48px

---

### Border Radius (Arredondamento)

```yaml
radius-none: 0px
radius-small: 2px      # BotÃµes, inputs
radius-medium: 4px     # Cards, panels (padrÃ£o)
radius-large: 8px      # Modais, grandes containers
radius-circular: 50%   # Avatares, badges circulares
```

---

## ðŸ§© Componentes Fluent UI

### Button (BotÃµes)

#### Variantes

**PrimaryButton** (AÃ§Ã£o principal):
```jsx
<PrimaryButton text="Salvar" onClick={handleSave} />
```
- Background: `themePrimary`
- Texto: `white`
- Hover: `themeDarkAlt`
- Uso: 1 por tela (aÃ§Ã£o mais importante)

**DefaultButton** (AÃ§Ã£o secundÃ¡ria):
```jsx
<DefaultButton text="Cancelar" onClick={handleCancel} />
```
- Background: `white`
- Borda: `neutralTertiary`
- Texto: `neutralPrimary`
- Hover: `neutralLighter`

**CompoundButton** (BotÃ£o com descriÃ§Ã£o):
```jsx
<CompoundButton 
  text="Upload Arquivo" 
  secondaryText="Selecione um arquivo do seu computador"
  icon={<UploadIcon />}
/>
```

**IconButton** (Apenas Ã­cone):
```jsx
<IconButton iconProps={{ iconName: 'Delete' }} title="Excluir" />
```
- Usar para aÃ§Ãµes secundÃ¡rias/toolbar
- Sempre fornecer `title` (tooltip)

#### Estados
- **Default**: Estado inicial
- **Hover**: Background mais escuro (themeDarkAlt para Primary)
- **Pressed**: Background ainda mais escuro (themeDark)
- **Disabled**: Opacidade 0.6, `cursor: not-allowed`
- **Focus**: Borda azul 2px (themePrimary), outline offset 2px

#### Tamanhos
- **Small**: height 24px, padding 0 8px
- **Medium** (default): height 32px, padding 0 16px
- **Large**: height 40px, padding 0 20px

---

### TextField (Campos de Texto)

```jsx
<TextField
  label="Email"
  placeholder="seu.email@exemplo.com"
  required
  errorMessage="Email invÃ¡lido"
  description="Usaremos para recuperaÃ§Ã£o de senha"
/>
```

#### Propriedades
- **label**: Texto acima do campo
- **placeholder**: Hint dentro do campo
- **required**: Marca campo como obrigatÃ³rio (asterisco)
- **errorMessage**: Exibe erro abaixo do campo
- **description**: Texto de ajuda (abaixo do campo)
- **multiline**: Transforma em textarea
- **disabled**: Desabilita campo

#### Estados
- **Default**: Borda `neutralLight`
- **Focus**: Borda `themePrimary` (2px), label anima para cima
- **Error**: Borda `errorText`, exibe errorMessage
- **Disabled**: Background `neutralLighter`, opacidade reduzida

#### Variantes
- **TextField**: Input padrÃ£o
- **MaskedTextField**: Com mÃ¡scara (CPF, telefone)
- **SearchBox**: Input de busca com Ã­cone

---

### Dropdown (SeleÃ§Ã£o)

```jsx
<Dropdown
  label="PaÃ­s"
  placeholder="Selecione um paÃ­s"
  options={[
    { key: 'br', text: 'Brasil' },
    { key: 'us', text: 'Estados Unidos' },
    { key: 'uk', text: 'Reino Unido' }
  ]}
  selectedKey={selectedCountry}
  onChange={handleCountryChange}
/>
```

#### Tipos
- **Dropdown**: SeleÃ§Ã£o Ãºnica
- **ComboBox**: SeleÃ§Ã£o com busca/autocomplete
- **DropdownMultiselect**: SeleÃ§Ã£o mÃºltipla

---

### Checkbox & Toggle

**Checkbox** (SeleÃ§Ãµes mÃºltiplas):
```jsx
<Checkbox 
  label="Aceito os termos de uso" 
  checked={agreed}
  onChange={handleAgree}
/>
```

**Toggle** (Estados binÃ¡rios on/off):
```jsx
<Toggle 
  label="NotificaÃ§Ãµes" 
  checked={notificationsEnabled}
  onText="Ativado"
  offText="Desativado"
  onChange={handleToggle}
/>
```

**Quando usar**:
- **Checkbox**: Aceitar termos, selecionar mÃºltiplos itens
- **Toggle**: Ativar/desativar features (configuraÃ§Ãµes)

---

### MessageBar (NotificaÃ§Ãµes)

```jsx
<MessageBar messageBarType={MessageBarType.success}>
  AlteraÃ§Ãµes salvas com sucesso!
</MessageBar>
```

#### Tipos
- **info** (azul): InformaÃ§Ãµes gerais
- **success** (verde): AÃ§Ã£o completada
- **warning** (amarelo): AtenÃ§Ã£o necessÃ¡ria
- **error** (vermelho): Erro crÃ­tico
- **severeWarning** (vermelho escuro): Erro muito crÃ­tico

#### Uso
- Exibir no topo do formulÃ¡rio/pÃ¡gina
- Auto-dismiss para success/info apÃ³s 5s
- Manter visÃ­vel para errors (requer aÃ§Ã£o do usuÃ¡rio)

---

### Modal (Modais/DiÃ¡logos)

```jsx
<Modal
  isOpen={isModalOpen}
  onDismiss={handleClose}
  isBlocking={false}
>
  <Stack tokens={{ childrenGap: 16 }} styles={{ root: { padding: 24 } }}>
    <Text variant="xLarge">Confirmar ExclusÃ£o</Text>
    <Text>Tem certeza que deseja excluir este item?</Text>
    <Stack horizontal tokens={{ childrenGap: 8 }}>
      <PrimaryButton text="Confirmar" onClick={handleConfirm} />
      <DefaultButton text="Cancelar" onClick={handleClose} />
    </Stack>
  </Stack>
</Modal>
```

#### Propriedades
- **isOpen**: Controla visibilidade
- **onDismiss**: Callback ao fechar (Esc ou click fora)
- **isBlocking**: Se true, nÃ£o fecha ao clicar fora
- **isModeless**: Modal nÃ£o-bloqueante (pode interagir com background)

#### Overlay
- Background: `rgba(0,0,0,0.4)` (semi-transparente)
- Blur no background (opcional, usa backdrop-filter)

---

### Panel (Painel Lateral)

```jsx
<Panel
  isOpen={isPanelOpen}
  onDismiss={handlePanelClose}
  type={PanelType.medium}
  headerText="Filtros"
>
  {/* ConteÃºdo do painel */}
</Panel>
```

#### Tamanhos
- **smallFixedFar**: 272px
- **medium**: 340px
- **large**: 592px
- **extraLarge**: 940px
- **custom**: Largura customizada

#### Uso
- Filtros avanÃ§ados
- FormulÃ¡rios de criaÃ§Ã£o/ediÃ§Ã£o
- Detalhes de item selecionado

---

### CommandBar (Barra de Comandos)

```jsx
<CommandBar
  items={[
    { key: 'new', text: 'Novo', iconProps: { iconName: 'Add' }, onClick: handleNew },
    { key: 'upload', text: 'Upload', iconProps: { iconName: 'Upload' } }
  ]}
  farItems={[
    { key: 'settings', iconProps: { iconName: 'Settings' }, onClick: handleSettings }
  ]}
/>
```

#### Uso
- AÃ§Ãµes principais de uma pÃ¡gina
- Toolbar de aplicaÃ§Ã£o
- AÃ§Ãµes de seleÃ§Ã£o (bulk actions)

---

### DetailsList (Tabela/Lista)

```jsx
<DetailsList
  items={items}
  columns={columns}
  selectionMode={SelectionMode.multiple}
  onItemInvoked={handleItemClick}
/>
```

#### Features
- OrdenaÃ§Ã£o por coluna (sortable)
- SeleÃ§Ã£o (single/multiple)
- PaginaÃ§Ã£o
- Filtros inline
- Grouping (agrupamento)

#### Colunas
```jsx
const columns = [
  { key: 'name', name: 'Nome', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'email', name: 'Email', fieldName: 'email', minWidth: 150, isResizable: true }
];
```

---

### Persona (Avatar + InformaÃ§Ãµes)

```jsx
<Persona
  text="Maria Silva"
  secondaryText="Analista de NegÃ³cios"
  imageUrl="/avatars/maria.jpg"
  size={PersonaSize.size48}
/>
```

#### Tamanhos
- **size24**: 24x24px (inline, listas)
- **size32**: 32x32px (padrÃ£o)
- **size48**: 48x48px (cards)
- **size72**: 72x72px (perfil)
- **size100**: 100x100px (hero/destaque)

#### Initiials
Se `imageUrl` nÃ£o fornecida, exibe iniciais do nome com background colorido.

---

### Spinner (Loading)

```jsx
<Spinner label="Carregando dados..." size={SpinnerSize.large} />
```

#### Tamanhos
- **xSmall**: 12px
- **small**: 16px
- **medium**: 20px
- **large**: 28px

#### Uso
- Carregamento de pÃ¡gina: Large, centralizado
- Carregamento de componente: Medium/Small, inline
- BotÃ£o em loading: Small, dentro do botÃ£o

---

### ProgressIndicator (Barra de Progresso)

```jsx
<ProgressIndicator 
  label="Upload em progresso" 
  description="45% concluÃ­do"
  percentComplete={0.45}
/>
```

**Uso**:
- Upload de arquivos
- Processamento em lote
- Wizards/formulÃ¡rios multi-step

---

### Dialog (DiÃ¡logo Simples)

```jsx
<Dialog
  hidden={!isDialogOpen}
  onDismiss={handleClose}
  dialogContentProps={{
    type: DialogType.normal,
    title: 'Confirmar AÃ§Ã£o',
    subText: 'Esta aÃ§Ã£o nÃ£o pode ser desfeita.'
  }}
>
  <DialogFooter>
    <PrimaryButton onClick={handleConfirm} text="Confirmar" />
    <DefaultButton onClick={handleClose} text="Cancelar" />
  </DialogFooter>
</Dialog>
```

#### Tipos
- **normal**: DiÃ¡logo padrÃ£o
- **largeHeader**: Com header visual destacado
- **close**: Com X para fechar

---

## â™¿ Acessibilidade (WCAG 2.1 AA)

### Contraste de Cores

**Requisitos WCAG 2.1 - 1.4.3**:
- **Texto normal**: MÃ­nimo 4.5:1
- **Texto grande** (18pt/24px+): MÃ­nimo 3:1
- **UI Components**: MÃ­nimo 3:1

**ValidaÃ§Ã£o**:
```
âœ… Texto preto (#323130) em branco (#FFFFFF): 12.63:1
âœ… themePrimary (#0078D4) em branco: 4.54:1
âŒ neutralTertiary (#A19F9D) em branco: 2.63:1 - NÃƒO usar para texto
```

**Ferramentas**:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- axe DevTools (extensÃ£o Chrome)
- WAVE (extensÃ£o Chrome)

---

### NavegaÃ§Ã£o por Teclado

**Requisitos WCAG 2.1 - 2.1.1**:

**Tab Order**:
- Seguir ordem visual (top-to-bottom, left-to-right)
- Elementos interativos acessÃ­veis via Tab
- Skip links para conteÃºdo principal

**Atalhos**:
- **Tab**: PrÃ³ximo elemento
- **Shift + Tab**: Elemento anterior
- **Enter/Space**: Ativar botÃ£o/link
- **Esc**: Fechar modal/dropdown
- **Arrow keys**: Navegar em listas/menus
- **/**: Focar campo de busca (comum em apps)

**Focus Indicators**:
```css
:focus-visible {
  outline: 2px solid var(--themePrimary);
  outline-offset: 2px;
  border-radius: 2px;
}
```

---

### Screen Readers

**ARIA Labels**:
```jsx
{/* BotÃ£o apenas com Ã­cone */}
<IconButton 
  iconProps={{ iconName: 'Delete' }} 
  ariaLabel="Excluir item"
  title="Excluir"
/>

{/* Input com descriÃ§Ã£o */}
<TextField
  label="Email"
  ariaDescribedBy="email-description"
/>
<Text id="email-description">Usaremos para recuperaÃ§Ã£o de senha</Text>

{/* NotificaÃ§Ã£o dinÃ¢mica */}
<div role="alert" aria-live="polite">
  Item adicionado ao carrinho
</div>
```

**Landmarks**:
```jsx
<header role="banner">...</header>
<nav role="navigation">...</nav>
<main role="main">...</main>
<aside role="complementary">...</aside>
<footer role="contentinfo">...</footer>
```

**Testes**:
- **NVDA** (Windows, grÃ¡tis)
- **JAWS** (Windows, pago)
- **VoiceOver** (macOS, built-in)
- **TalkBack** (Android)

---

### Forms AcessÃ­veis

```jsx
<Label htmlFor="email" required>Email</Label>
<TextField
  id="email"
  ariaRequired={true}
  ariaDescribedBy="email-error"
  errorMessage="Email invÃ¡lido"
/>
<Text id="email-error" role="alert">
  {errorMessage}
</Text>
```

**ValidaÃ§Ã£o**:
- Labels associados (htmlFor)
- Campos required marcados
- Erros anunciados (role="alert")
- InstruÃ§Ãµes antes do formulÃ¡rio

---

## ðŸ“± Responsividade

### Mobile-First Approach

**EstratÃ©gia**:
1. Design para mobile primeiro
2. Progressivamente adicionar features para telas maiores (progressive enhancement)

### AdaptaÃ§Ãµes por Breakpoint

**Mobile (<768px)**:
- Navigation: Hamburger menu
- Forms: Full-width inputs
- Buttons: Stack verticalmente
- Tables: Cards ou horizontal scroll
- Grid: 4 colunas
- Typography: Reduzir tamanhos (H1: 24px)

**Tablet (768px - 1023px)**:
- Navigation: Collapsed horizontal ou side nav
- Grid: 8 colunas
- Forms: Max-width 600px, centered

**Desktop (>=1024px)**:
- Full navigation
- Grid: 12 colunas
- Hover states ativos
- Tooltips (nÃ£o disponÃ­veis em touch)

### Touch Targets

**WCAG 2.1 - 2.5.5**:
- **MÃ­nimo**: 44x44px (iOS), 48x48dp (Android)
- **Recomendado**: 48x48px ou maior

```css
.touch-target {
  min-width: 48px;
  min-height: 48px;
  /* Se conteÃºdo menor, adicionar padding */
}
```

---

## ðŸŽ­ PadrÃµes de InteraÃ§Ã£o

### Empty States

```jsx
<Stack 
  horizontalAlign="center" 
  verticalAlign="center" 
  tokens={{ childrenGap: 16 }}
  styles={{ root: { minHeight: 400 } }}
>
  <Icon iconName="EmptyRecycleBin" style={{ fontSize: 64, color: '#A19F9D' }} />
  <Text variant="xLarge">Nenhum item encontrado</Text>
  <Text variant="medium" style={{ color: '#605E5C' }}>
    Comece adicionando seu primeiro item
  </Text>
  <PrimaryButton text="Adicionar Item" iconProps={{ iconName: 'Add' }} />
</Stack>
```

---

### Loading States

**Skeleton Screens** (preferido para listas/cards):
```jsx
<Shimmer />
<ShimmerElementsGroup
  shimmerElements={[
    { type: ShimmerElementType.circle, height: 40 },
    { type: ShimmerElementType.gap, width: 16 },
    { type: ShimmerElementType.line, height: 16, width: '40%' }
  ]}
/>
```

**Spinners** (para carregamento inicial):
```jsx
<Spinner label="Carregando dados..." size={SpinnerSize.large} />
```

---

### Error States

```jsx
<MessageBar messageBarType={MessageBarType.error} isMultiline>
  <Text><strong>Erro ao salvar</strong></Text>
  <Text>NÃ£o foi possÃ­vel conectar ao servidor. Tente novamente.</Text>
  <Link onClick={handleRetry}>Tentar novamente</Link>
</MessageBar>
```

---

### Success States

```jsx
<MessageBar 
  messageBarType={MessageBarType.success}
  onDismiss={handleDismiss}
  dismissButtonAriaLabel="Fechar"
>
  AlteraÃ§Ãµes salvas com sucesso!
</MessageBar>
```

---

## ðŸ“ Layout Patterns

### App Shell

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚          Header (64px)          â”‚ â† Fixed
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚         â”‚                       â”‚
â”‚   Nav   â”‚    Main Content      â”‚
â”‚  (240px)â”‚    (fluid)           â”‚
â”‚         â”‚                       â”‚
â”‚         â”‚                       â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

### Card Layout

```jsx
<Stack 
  horizontal 
  wrap 
  tokens={{ childrenGap: 16 }}
>
  <Card styles={{ root: { width: 300 } }}>
    <Card.Item>
      <Image src="/..." />
    </Card.Item>
    <Card.Section>
      <Text variant="large">Card Title</Text>
      <Text variant="small">Card description...</Text>
    </Card.Section>
    <Card.Item>
      <PrimaryButton text="AÃ§Ã£o" />
    </Card.Item>
  </Card>
</Stack>
```

---

### Master-Detail Pattern

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚              â”‚                    â”‚
â”‚   Master     â”‚      Detail        â”‚
â”‚   (List)     â”‚   (Selecionado)    â”‚
â”‚              â”‚                    â”‚
â”‚  - Item 1    â”‚  TÃ­tulo            â”‚
â”‚  â–¶ Item 2 â—€  â”‚  DescriÃ§Ã£o...      â”‚
â”‚  - Item 3    â”‚  [AÃ§Ãµes]           â”‚
â”‚              â”‚                    â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## ðŸ”— IntegraÃ§Ã£o com Outros Artefatos

- **${AVANADE_WIREFRAME_TEMPLATE}**: Usar este guia como referÃªncia ao criar wireframes
- **${AVANADE_MEMORY_UX_SOFIA}**: Documentar patterns validados baseados neste guia
- **${AVANADE_TASK_UX_CHECKLIST}**: Validar implementaÃ§Ã£o contra este guia
- **${AVANADE_TASK_ACCESSIBILITY_WCAG}**: Aplicar requisitos de acessibilidade deste guia

---

## ðŸ“š Recursos Adicionais

### DocumentaÃ§Ã£o Oficial
- [Fluent UI React Documentation](https://developer.microsoft.com/en-us/fluentui#/controls/web)
- [Fluent Design System](https://www.microsoft.com/design/fluent/)
- [Fluent UI Icons](https://uifabricicons.azurewebsites.net/)

### Ferramentas
- [Figma Fluent UI Kit](https://www.figma.com/@microsoft)
- [Theme Designer](https://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/heads/master/theming-designer/)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)

### Exemplos
- [Fluent UI React Northstar](https://fluentsite.z22.web.core.windows.net/)
- [Office UI Fabric Samples](https://github.com/OfficeDev/office-ui-fabric-react)

---
