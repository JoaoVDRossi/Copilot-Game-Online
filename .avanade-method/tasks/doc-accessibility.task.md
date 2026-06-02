## ðŸ“‹ O que Ã© este Artefato?

Esta Ã© a **task de validaÃ§Ã£o de acessibilidade** para garantir que documentaÃ§Ã£o seja utilizÃ¡vel por todos, incluindo pessoas com deficiÃªncias visuais, auditivas, motoras ou cognitivas.

**Compliance target**: WCAG 2.1 Level AA

---

## ðŸŽ¯ Quando Usar

### âœ… USE para:
- Validar documentaÃ§Ã£o antes de publicaÃ§Ã£o
- Revisar documentaÃ§Ã£o existente (quarterly audit)
- Onboarding de novos technical writers
- Responder a compliance requirements (legal, enterprise contracts)

### âŒ NÃƒO Ã‰:
- Code accessibility (ARIA, semantic HTML em apps)
- PDF accessibility (diferentes padrÃµes)
- Video/multimedia accessibility (requires captions, transcripts)

---

## âœ… ACCESSIBILITY CHECKLIST

### 1. TEXT & READABILITY

#### 1.1 Language Clarity

- [ ] **Plain language used** - Avoid jargon when possible
- [ ] **Active voice preferred** - "Click the button" vs "Button can be clicked"
- [ ] **Short sentences** - <25 words per sentence ideally
- [ ] **Paragraphs concise** - 3-5 sentences max
- [ ] **Acronyms defined on first use** - "API (Application Programming Interface)"

**Why**: Screen readers perform better with simple, direct language. Cognitive disabilities benefit from clarity.

**Test**: Read aloud - does it sound natural?

---

#### 1.2 Text Formatting

- [ ] **No ALL CAPS for emphasis** - Use **bold** or *italic*
- [ ] **No underline except links** - Avoid confusion with hyperlinks
- [ ] **Sufficient line spacing** - At least 1.5x line height
- [ ] **Left-aligned text** - Avoid full justification (uneven spacing)
- [ ] **No text in images** - Use actual text with CSS styling

**Why**: ALL CAPS harder to read for dyslexic users. Justified text creates "rivers" that disrupt reading.

---

#### 1.3 Reading Level

- [ ] **Target 8th-9th grade reading level** - Use Hemingway Editor or similar
- [ ] **Technical terms necessary** - But always explained
- [ ] **Bulleted lists preferred** - Over long paragraphs

**Tools**:
- Hemingway Editor: <http://www.hemingwayapp.com/>
- Readable: <https://readable.com/>

**Example**:
```
âŒ BAD (Grade 14):
"The utilization of asynchronous methodologies facilitates non-blocking operations."

âœ… GOOD (Grade 9):
"Async methods let your code run without waiting for results."
```

---

### 2. HEADINGS & STRUCTURE

#### 2.1 Semantic Heading Hierarchy

- [ ] **Only ONE H1** per document
- [ ] **No skipped levels** - H1 â†’ H2 â†’ H3 (NOT H1 â†’ H3)
- [ ] **Headings describe content** - "How to Install" not "Section 3"
- [ ] **Consistent capitalization** - Sentence case or Title Case (pick one)

**Why**: Screen readers use headings for navigation. Skipping levels breaks this.

**Test**:
```markdown
âœ… GOOD:
# Main Title (H1)
## Section 1 (H2)
### Subsection 1.1 (H3)
## Section 2 (H2)

âŒ BAD:
# Main Title (H1)
#### Subsection (H4) - SKIPPED H2 and H3!
```

---

#### 2.2 Table of Contents

- [ ] **TOC present for docs >3 pages**
- [ ] **TOC uses anchor links** - [Section 1](#section-1)
- [ ] **TOC matches actual headings** - Exact text match

**Why**: Allows quick navigation, especially for screen reader users.

---

### 3. LINKS & NAVIGATION

#### 3.1 Link Text

- [ ] **Descriptive link text** - Explains destination
- [ ] **No "click here"** - Context-free for screen readers
- [ ] **No bare URLs** - Use descriptive text: [GitHub](https://github.com)
- [ ] **Link purpose clear from text alone** - "Download the installer" not "Download"

**Why**: Screen readers can list all links. "Click here" x10 is useless.

**Examples**:
```markdown
âŒ BAD:
Click [here](https://example.com) for more info.
Visit https://example.com for docs.

âœ… GOOD:
Read the [authentication guide](https://example.com/auth) for setup instructions.
See [API reference documentation](https://example.com/api) for endpoint details.
```

---

#### 3.2 Link Indicators

- [ ] **External links noted** - "(opens in new tab)" or icon
- [ ] **File format indicated** - "Download PDF (2MB)"
- [ ] **Link color contrast** - 4.5:1 minimum vs background

**Example**:
```markdown
âœ… GOOD:
- [User Guide (PDF, 2MB)](./guide.pdf)
- [GitHub Repository (external)](https://github.com/example) â†—
```

---

### 4. IMAGES & DIAGRAMS

#### 4.1 Alt Text (MANDATORY)

- [ ] **All images have alt text** - ![alt text](image.png)
- [ ] **Alt text descriptive** - Not "image" or "screenshot"
- [ ] **Alt text <150 characters** - Concise but complete
- [ ] **Complex diagrams have long description** - In surrounding text

**Why**: Screen readers read alt text. No alt = "image 1234.png" (useless).

**Examples**:
```markdown
âŒ BAD:
![](screenshot.png)
![image](dashboard.png)
![Login screen](login.png)

âœ… GOOD:
![Screenshot of the login form with username, password fields, and a blue "Sign In" button](login.png)
![Architecture diagram showing client connecting to API gateway, which routes to microservices](architecture.png)
```

---

#### 4.2 Complex Images (Diagrams, Charts)

- [ ] **Long description provided** - In text before/after image
- [ ] **Data tables for charts** - Text alternative for graphs
- [ ] **Mermaid diagrams preferred** - Text-based, inherently accessible

**Example**:
```markdown
The following diagram shows the authentication flow:

1. User submits credentials to frontend
2. Frontend sends POST request to API
3. API validates against database
4. API returns JWT token

![Authentication sequence diagram showing the 4-step flow described above](auth-flow.png)
```

**Why**: Long description gives context that alt text can't (150 char limit).

---

#### 4.3 Decorative Images

- [ ] **Decorative images have empty alt** - alt=""
- [ ] **Icons paired with text** - Don't rely on icon alone

**Example**:
```markdown
âœ… GOOD:
![](decorative-banner.png)  <!-- Empty alt for decorative -->

âš ï¸ WARNING (icon-only):
![Warning icon] This action is irreversible

âœ… BETTER:
âš ï¸ **Warning**: This action is irreversible
```

---

### 5. COLOR & CONTRAST

#### 5.1 Color Contrast Ratios

- [ ] **Normal text: 4.5:1 minimum** - Text vs background
- [ ] **Large text (18pt+): 3:1 minimum**
- [ ] **Non-text (icons, graphs): 3:1 minimum**
- [ ] **Test all color combinations** - Dark mode too if applicable

**Tools**:
- WebAIM Contrast Checker: <https://webaim.org/resources/contrastchecker/>
- Contrast Ratio: <https://contrast-ratio.com/>

**Examples**:
```
âœ… GOOD:
- Black text (#000) on white background (#FFF) = 21:1
- Dark gray (#333) on white (#FFF) = 12.6:1

âŒ BAD:
- Light gray (#AAA) on white (#FFF) = 2.3:1 (fails)
- Yellow (#FFFF00) on white (#FFF) = 1.1:1 (fails badly)
```

---

#### 5.2 Color Usage

- [ ] **Color not sole indicator** - Don't rely on color alone
- [ ] **Use text labels + color** - "Error (red)" not just red text
- [ ] **Patterns/icons supplement color** - In charts, graphs

**Why**: Colorblind users can't distinguish red/green.

**Examples**:
```markdown
âŒ BAD:
Red text indicates errors, green indicates success.

âœ… GOOD:
âŒ Error: Invalid input
âœ… Success: Saved successfully

(Uses emoji/symbols + color)
```

---

### 6. TABLES

#### 6.1 Table Structure

- [ ] **Header row defined** - First row is `| Header | Header |`
- [ ] **Simple tables only** - Avoid merged cells, nested tables
- [ ] **Max 5 columns** - More = hard to read on mobile
- [ ] **Caption/description above table** - Context before data

**Why**: Screen readers announce table structure. Complex tables break this.

**Example**:
```markdown
âœ… GOOD:
**Table 1: HTTP Status Codes**

| Code | Name | Description |
|------|------|-------------|
| 200 | OK | Request successful |
| 404 | Not Found | Resource doesn't exist |

âŒ BAD (too wide):
| Code | Name | Category | When Used | Example | Caching | Body | Notes |
```

---

#### 6.2 Table Alternatives

- [ ] **Consider description list** - For simple 2-column tables
- [ ] **Consider bullets** - For single-column data

**Example**:
```markdown
Instead of table:
| Parameter | Type |
|-----------|------|
| name | string |
| age | integer |

Use description list:
**Parameters:**
- `name` (string): User's full name
- `age` (integer): User's age in years
```

---

### 7. LISTS

#### 7.1 List Types

- [ ] **Ordered lists for sequences** - Steps 1, 2, 3
- [ ] **Unordered for non-sequential** - Features, bullet points
- [ ] **Nesting max 3 levels** - Deeper = confusing
- [ ] **Parallel structure** - All items same grammar

**Why**: Screen readers announce "list of 5 items" - helps navigation.

**Examples**:
```markdown
âœ… GOOD (parallel structure):
1. Download the installer
2. Run the setup wizard
3. Configure your settings

âŒ BAD (not parallel):
1. Download the installer
2. You should run the setup wizard
3. Configuration of settings
```

---

### 8. CODE BLOCKS

#### 8.1 Code Formatting

- [ ] **Language tag specified** - ```python not ```
- [ ] **Line length <80 characters** - Avoid horizontal scroll
- [ ] **Comments for complex code** - Explain non-obvious parts
- [ ] **Alternative text description** - For screen readers

**Why**: Screen readers read code character-by-character. Comments help.

**Example**:
```markdown
âœ… GOOD:
The following code authenticates a user:

```python
# Verify user credentials against database
def authenticate(username, password):
    user = db.query(User).filter_by(username=username).first()
    if user and user.check_password(password):
        return create_token(user.id)  # Generate JWT
    return None  # Invalid credentials
```

âŒ BAD (no context, no comments):
```python
def authenticate(username, password):
    user = db.query(User).filter_by(username=username).first()
    if user and user.check_password(password):
        return create_token(user.id)
    return None
```
```

---

#### 8.2 Inline Code

- [ ] **Use backticks** - `code` not **code**
- [ ] **Distinguish from regular text** - Clear visual difference
- [ ] **Screen reader friendly** - "code: npm install"

---

### 9. MULTIMEDIA (If Applicable)

#### 9.1 Videos

- [ ] **Captions provided** - For all spoken content
- [ ] **Transcript available** - Full text version
- [ ] **Audio description** - For visual-only content

#### 9.2 Audio

- [ ] **Transcript provided** - Full text of audio
- [ ] **Speaker identified** - In transcript

**Note**: Most technical docs are text-based. If you include video/audio, accessibility requirements expand significantly.

---

### 10. INCLUSIVE LANGUAGE

#### 10.1 Gender-Neutral Terms

- [ ] **Use "they" instead of "he/she"**
- [ ] **Avoid gendered terms** - "guys" â†’ "team", "folks"
- [ ] **Job titles neutral** - "chairman" â†’ "chairperson"

**Examples**:
```markdown
âŒ BAD:
When a user logs in, he sees his dashboard.

âœ… GOOD:
When users log in, they see their dashboard.
When a user logs in, they see their dashboard.
```

---

#### 10.2 Ableist Language

- [ ] **Avoid ableist metaphors** - "sanity check" â†’ "validation"
- [ ] **No "crippled", "dumb"** - Even for technical issues
- [ ] **Person-first language** - "users with disabilities" not "disabled users"

**Replacements**:
| Avoid | Use Instead |
|-------|-------------|
| sanity check | quick check, validation |
| dummy value | placeholder, sample |
| crippled system | limited, restricted |
| blind to | unaware of, doesn't recognize |

---

#### 10.3 Cultural Sensitivity

- [ ] **Avoid idioms** - May not translate (international audience)
- [ ] **Date format clear** - 2025-02-03 (ISO) or Feb 3, 2025
- [ ] **Time zones specified** - "9AM PST" not "9AM"

**Examples**:
```markdown
âŒ BAD (idiom):
"This feature is a slam dunk for productivity."

âœ… GOOD:
"This feature significantly improves productivity."
```

---

## ðŸ” TESTING PROCESS

### Automated Testing

#### Tool 1: markdownlint
```bash
npm install -g markdownlint-cli
markdownlint docs/**/*.md
```

Checks:
- Heading hierarchy
- List formatting
- Line length

---

#### Tool 2: axe DevTools (for web docs)
Browser extension that scans rendered HTML for WCAG violations.

Install: <https://www.deque.com/axe/devtools/>

---

#### Tool 3: WAVE (Web Accessibility Evaluation Tool)
<https://wave.webaim.org/>

Checks:
- Color contrast
- Alt text
- Heading structure

---

### Manual Testing

#### Test 1: Screen Reader
- **Windows**: NVDA (free) - <https://www.nvaccess.org/>
- **Mac**: VoiceOver (built-in) - Cmd+F5
- **Test**: Navigate doc with screen reader only (no mouse)

**Pass criteria**: Can understand content, navigate headings, access all information

---

#### Test 2: Keyboard Navigation
- **Method**: Unplug mouse, use Tab/Shift+Tab/Enter only
- **Test**: Can you access all links? Reach all content?

**Pass criteria**: All interactive elements reachable via keyboard

---

#### Test 3: Color Blindness Simulation
- **Tool**: ColorOracle (free) - <https://colororacle.org/>
- **Test**: View docs with simulated colorblindness

**Pass criteria**: All information still accessible without color

---

#### Test 4: Zoom to 200%
- **Method**: Browser zoom to 200%
- **Test**: Text still readable? Layout not broken?

**Pass criteria**: Content doesn't overflow, still usable

---

## ðŸ“Š ACCESSIBILITY SCORECARD

Use this to grade documentation:

```yaml
categories:
  text_readability:
    weight: 20%
    checks:
      - Plain language used: [pass/fail]
      - Reading level appropriate: [pass/fail]
      - Short sentences/paragraphs: [pass/fail]
    score: [0-10]
  
  structure:
    weight: 25%
    checks:
      - Heading hierarchy correct: [pass/fail]
      - TOC present: [pass/fail]
      - Lists properly formatted: [pass/fail]
    score: [0-10]
  
  images:
    weight: 20%
    checks:
      - All images have alt text: [pass/fail]
      - Alt text descriptive: [pass/fail]
      - Complex images have long description: [pass/fail]
    score: [0-10]
  
  color_contrast:
    weight: 15%
    checks:
      - Text contrast 4.5:1+: [pass/fail]
      - Color not sole indicator: [pass/fail]
    score: [0-10]
  
  links_navigation:
    weight: 10%
    checks:
      - Descriptive link text: [pass/fail]
      - No "click here": [pass/fail]
    score: [0-10]
  
  inclusive_language:
    weight: 10%
    checks:
      - Gender-neutral: [pass/fail]
      - No ableist language: [pass/fail]
    score: [0-10]

total_score:
  calculation: "sum(category.score Ã— category.weight)"
  threshold:
    wcag_aa_compliant: ">90%"
    needs_work: "70-90%"
    major_issues: "<70%"
```

---

## ðŸ”— IntegraÃ§Ã£o com Outros Artefatos

- **${AVANADE_DOC_STANDARDS_MD}**: Acessibilidade Ã© parte de doc standards
- **${AVANADE_TASK_EDITORIAL_REVIEW_STRUCTURE}**: Valida estrutura (headings, lists)
- **${AVANADE_COMMONMARK_TEMPLATE_MD}**: Markdown semÃ¢ntico = acessÃ­vel
- **${AVANADE_MEMORY_TECH_WRITER_PAIGE}**: Armazena accessibility learnings

---
