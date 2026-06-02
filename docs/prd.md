# Copilot Combate Game - Product Requirements Document (PRD)

**Document Version:** 2.0  
**Created:** March 17, 2026  
**Last Updated:** June 1, 2026  
**Status:** Production-Ready  
**Project:** Copilot Combate Game - M365 Copilot Training Platform

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-03-17 | 1.0 | Initial PRD draft based on approved Project Brief | Avanade Master |
| 2026-06-01 | 2.0 | Updated to reflect implemented architecture (localStorage + Azure), room system, GM roles, card reuse, randomization, configurable matches per round, removal of "Área de Atuação" | Avanade Master |

---

## Implementation Status (v2.0)

> **This section documents all business rule changes and architectural decisions made during implementation that differ from the original v1.0 PRD.**

### Architecture Pivot

The original PRD specified Firebase (Firestore + Auth + Cloud Functions) + Vercel. The implemented architecture uses:

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS (hosted on **Azure Static Web Apps**)
- **Backend:** Azure Functions (Node.js) with Azure Table Storage
- **Local State:** localStorage as primary data store (with optional API sync via `VITE_API_URL`)
- **Authentication:** Simplified — no Firebase Auth. Uses admin PIN (`1234`) and Game Master login with unique GM IDs
- **Deployment:** Azure Static Web Apps + Azure Function App (not Vercel/Firebase)

### Room System (New — replaces global game state)

The v1.0 PRD assumed a single global game session. The implementation introduces a **Room System**:

- **Rooms** are created by Game Masters (GMs) with auto-generated 6-digit codes
- Players join rooms by entering the room code or scanning a direct link
- Each room has independent state: `waiting` → `playing` → `finished`
- Teams are scoped to rooms — a team exists within a specific room
- Game state (start, finish, reset) is **room-scoped**, not global
- Multiple GMs can run simultaneous workshops without interference

**Room Interface:**
```typescript
interface Room {
  id: string
  code: string                          // 6-digit join code
  name: string
  status: 'waiting' | 'playing' | 'finished'
  createdBy: string                     // GM identifier
  teams: RoomTeam[]
  matchesPerRound?: Record<string, number>  // GM-configurable match limits
  createdAt: string
  startedAt?: string
  finishedAt?: string
}
```

### Role System (Simplified from v1.0)

| Role | Access | Authentication |
|------|--------|----------------|
| **Player** | Join room, play rounds, view scores | Room code + team name + player name |
| **Game Master (GM)** | Create/manage rooms, start/stop rounds, control timers | GM login with unique ID |
| **Admin** | Full card/rule management, debug dashboard | PIN code (`1234`) |

### Card System Changes

- **"Área de Atuação" (Area) field removed** — Cards no longer have an `area` property. Cards are filtered only by `roundId` and `type` (prompt, useCase, tool)
- **Card reuse across matches** — Cards are NOT removed from the board after a successful match. Players can reuse the same card in different combinations
- **Three card types maintained:** Prompt, Use Case, Tool (each with difficulty: easy, medium, hard)

### Match & Scoring System (Updated)

- **Match Rules** define valid combinations: `promptCardId + useCaseCardId + toolCardId`
- **Duplicate prevention** — A team cannot score the same exact combination twice in the same round
- **Points:** 3 points per correct match (unchanged from v1.0)
- **Progress capped at 100%** — Even if more rules exist, progress bar never exceeds 100%
- **Dynamic total matches** — Progress percentage is calculated from active match rules count, not a fixed number

### Randomization (New)

- **Prompts and Use Cases are randomized** each time the board refreshes (after each match)
- The system guarantees at least one valid (uncompleted) match is always present on the board
- The guaranteed match card positions are shuffled so the answer isn't always in the same slot
- **Tools remain in fixed order** (not shuffled)
- Cards re-shuffle only after closing a match result, not on every render

### Configurable Matches per Round (New)

- Game Masters can configure **how many matches are required per round per room**
- Example: Room A → Round 1 requires 3 matches; Room B → Round 1 requires 7 matches
- If not configured, defaults to total active match rules for that round
- This affects both the progress bar calculation and the round completion condition
- Configuration UI available in the Room Management panel (expanded room view)

### Round Session & Timer System

- **GM-scoped sessions** — Each GM's timer only affects their own rooms
- Timer visibility is toggleable: GM can show/hide the countdown for players
- Default round duration: 15 minutes
- Sessions stored in localStorage with optional API sync

### Game State Scoping

- **Finishing a game** only affects the specific GM's rooms (not all rooms globally)
- **Resetting a game** only resets rooms belonging to that GM
- Room status transitions: `waiting` → `playing` → `finished` → `waiting` (reopen)

### Test Submission Feature

The v1.0 PRD included a "Test This Use Case" submission workflow with facilitator validation queue. **This feature was not implemented in v2.0 MVP.** It remains a future enhancement.

### Features NOT Implemented (Deferred from v1.0)

- Firebase Authentication (replaced by simplified PIN/code system)
- Google Sign-In
- Firestore real-time listeners (replaced by localStorage + polling)
- Test submission & validation workflow
- Individual leaderboard (team leaderboard exists)
- Push notifications
- PWA manifest / offline support
- Content analytics dashboard
- Bulk card import via CSV/JSON
- Audit logging for admin actions
- Round locking/progressive unlock (all rounds are open)
- Facilitator role (merged into GM role)

- Deliver an engaging, narrative-driven gamified M365 Copilot training experience that increases workshop participant engagement by 80%+ compared to traditional training methods through 4 thematic challenge rounds
- Enable business professionals to learn M365 Copilot concepts by "defeating" productivity villains through interactive card-matching gameplay with immediate feedback
- Provide facilitators with a scalable digital tool that works seamlessly across mobile and web platforms during corporate workshops
- Empower administrators with a comprehensive content management system to create custom cards, manage rounds, and validate tests without developer support
- Create a team-based competitive environment that encourages collaborative learning and knowledge sharing across multiple themed rounds
- Bridge learning to real-world application through validated test submissions, demonstrating practical M365 Copilot usage
- Launch a production-ready MVP by end of Q2 2026 (June 2026) with all 4 challenge rounds and full administrator capabilities
- Establish a foundation for potential commercialization and expansion to other Copilot training domains with additional challenge villains

### Background Context

Organizations adopting Microsoft 365 Copilot face a critical challenge: business users struggle to understand when and how to effectively leverage Copilot tools in their daily workflows. Traditional presentation-based training results in low engagement, poor retention, and limited practical application. The Copilot Combate Game addresses this gap by transforming passive learning into an active, narrative-driven competitive team experience where players confront and defeat common productivity villains.

The game introduces four unique challenge characters representing real productivity problems that M365 Copilot solves: **Mestre das Notificações** (interruptions), **Capitã Pesquisa Infinita** (disorganized research), **Senhora Perfeccionista** (perfectionism paralysis), and **ControlC+V** (data inconsistencies). This storytelling approach creates memorable, relatable learning moments that resonate with business professionals' daily frustrations.

Drawing from successful gamification patterns in corporate training (Kahoot, Quizizz) and engaging narrative-based games, this solution creates a safe practice environment where professionals can experiment with Copilot concepts before real-world usage through progressive round-based challenges. Each round features dedicated card sets specific to that productivity villain's domain, ensuring focused, contextual learning.

The dual-scoring system (immediate match feedback + validated real-world tests) ensures both conceptual understanding and practical application. A comprehensive **administrator control panel** empowers workshop facilitators to dynamically create cards, manage rounds, customize content, and validate participant tests in real-time without requiring developer support.

Designed specifically for non-technical business audiences in workshop settings, the game leverages mobile-first responsive design to meet participants where they are—on their phones or tablets during training sessions—while administrators use desktop-optimized tools for content management.

With M365 Copilot rapidly expanding across enterprises, this solution targets the immediate need for effective, measurable, and customizable training tools that drive adoption ROI through engaging storytelling and facilitator autonomy.

---

## Requirements

### Functional Requirements

**FR1: User Registration & Authentication**  
The system shall provide a registration flow where users can sign up using email/password authentication via Firebase Auth, with optional Google Sign-In for faster onboarding.

**FR2: Team Creation & Management**  
Users shall be able to create new teams (by providing a team name) or join existing teams (by entering a team code or selecting from a list) during the onboarding process.

**FR3: Round System Management**  
The system shall provide a round-based progression system with 4 pre-defined themed rounds, each representing a productivity villain challenge that M365 Copilot helps overcome.

**FR4: Round Data Structure**  
Each round shall store: Round ID, Name, Villain Character Name, Villain Description (productivity problem), Order/Sequence, Active Status, Learning Objectives, and Associated Card IDs.

**FR5: Round Selection Interface**  
Users shall see a round selection screen displaying all 4 rounds with visual indicators for: Current Round, Completed Rounds, Locked Rounds, and Villain Character Artwork/Description.

**FR6: Round Progression Tracking**  
The system shall track user progress per round including: Matches Attempted, Matches Completed Correctly, Round Completion Status, and Round Score.

**FR7: Card Content System with Round Assignment**  
The system shall store and display three types of cards (Prompts, Use Cases, Tools) with each card assigned to a specific round, ensuring contextual learning per villain challenge.

**FR8: Card Matching Gameplay**  
Users shall be able to match cards using touch-optimized drag-and-drop or tap-to-select mechanics, forming combinations of Prompt + Use Case + Tool within the active round's card set.

**FR9: Match Validation Logic**  
The system shall validate card matches against pre-defined correct combinations stored in the database (filtered by active round) and provide immediate visual feedback (green for correct, neutral/error state for incorrect).

**FR10: Educational Feedback on Incorrect Matches**  
When a user submits an incorrect match, the system shall display a villain-themed contextual explanation modal describing WHY the match is incorrect and how M365 Copilot defeats that specific productivity villain.

**FR11: Scoring System - Match Points**  
The system shall award 3 points to the user and their team for each correct card match, with scores persisted in real-time to Firestore and tracked per round and overall.

**FR12: Real-World Test Submission**  
After completing a correct match, users shall have the option to click "Test This Use Case" and submit a description of how they would apply this scenario in their real work (text input form with round context).

**FR13: Administrator Validation Queue**  
Test submissions shall appear in an administrator dashboard queue with user/team information, round context, submission timestamp, and the ability to approve or reject with optional feedback.

**FR14: Scoring System - Test Validation Points**  
When an administrator approves a test submission, the system shall award 10 points to the submitting user's team and notify the team of the validation.

**FR15: Individual Leaderboard**  
The system shall display a real-time individual leaderboard showing all players sorted by personal points earned (total and per-round breakdown), with visual indicators for the user's current rank.

**FR16: Team Leaderboard**  
The system shall display a real-time team leaderboard showing all teams sorted by total aggregated points from all team members, with optional round-specific filtering.

**FR17: Session Persistence with Round State**  
The system shall save the user's active game state (current round, cards, score, round progress) and allow resumption if the user disconnects and reconnects within the same workshop session.

**FR18: Responsive Layout**  
The user interface shall adapt seamlessly across mobile devices (iOS/Android browsers) for players and tablets/desktop browsers for players and administrators with touch and mouse input support.

**FR19: Administrator Dashboard - Session Monitoring**  
Administrators shall be able to view a dashboard showing active players count, team standings, pending test validations, round progression analytics, and high-level session activity metrics.

**FR20: Notification System**  
Users shall receive in-app notifications when their submitted tests are validated (approved/rejected) by administrators.

**FR21: Administrator - Card Creation**  
Administrators shall be able to create new cards through a form interface with fields: Card Type (Prompt/Use Case/Tool), Title, Description, Round Assignment, and optional Category/Tags.

**FR22: Administrator - Card Editing**  
Administrators shall be able to edit existing cards including changing title, description, round assignment, and active status (archive/delete functionality).

**FR23: Administrator - Card Bulk Import**  
Administrators shall be able to upload cards in bulk via CSV or JSON file format with validation and error reporting for malformed data.

**FR24: Administrator - Match Rule Definition**  
Administrators shall be able to define valid card combinations (match rules) by selecting which Prompt + Use Case + Tool combinations are correct for each round, with explanation text for educational feedback.

**FR25: Administrator - Round Management**  
Administrators shall be able to create, edit, and delete rounds with fields: Round Name, Villain Name, Villain Description (productivity problem), Learning Objectives, Order, and Active Status.

**FR26: Administrator - Round Activation Control**  
Administrators shall be able to activate/deactivate rounds for specific workshop sessions, controlling which rounds are available to players.

**FR27: Administrator - Content Analytics**  
Administrators shall be able to view analytics showing: Most difficult matches (highest error rates), Round completion rates, Average time per round, and Card usage statistics.

**FR28: Administrator - Bulk Test Approval**  
Administrators shall be able to select multiple test submissions and approve/reject them in bulk with a single feedback message applied to all selected submissions.

**FR29: Administrator Authentication & Role Management**  
The system shall support role-based access control with three roles: Player (default), Facilitator (read-only dashboard), and Administrator (full content management and validation), managed through Firebase custom claims.

**FR30: Administrator Action Audit Log**  
All administrator actions (card creation/editing, round changes, test validations, bulk operations) shall be logged to Firestore with timestamp, admin user ID, and action description for accountability.

### Non-Functional Requirements

**NFR1: Performance - Page Load Time**  
The application shall load the main game interface within 3 seconds on a 4G mobile connection (target 1.5s on WiFi).

**NFR2: Performance - Match Validation Response**  
Match validation (correct/incorrect determination) shall complete within 500ms to provide immediate feedback.

**NFR3: Performance - Concurrent Users**  
The system shall support 50+ concurrent users per workshop session without performance degradation or increased response times.

**NFR4: Performance - Animation Smoothness**  
All UI animations (card movements, transitions, feedback effects) shall maintain 60fps on modern mobile devices (iPhone 12+, Android equivalent).

**NFR5: Scalability - Firebase Limits**  
The architecture shall be designed to operate within Firebase Spark (free) tier limits during development and efficiently scale to Blaze plan for production usage.

**NFR6: Availability**  
The application shall maintain 99% uptime during scheduled workshop hours (business hours in target markets).

**NFR7: Security - Authentication**  
All user authentication must use Firebase Auth with secure token management, HTTPS-only connections, and no plaintext password storage.

**NFR8: Security - Data Access**  
Firestore security rules shall enforce that users can only read/write their own data, team members can view team data, and facilitators have elevated read access to validation queues.

**NFR9: Security - Input Validation**  
All user inputs (team names, test submissions, profile data) shall be validated and sanitized to prevent XSS, SQL injection, and other security vulnerabilities.

**NFR10: Usability - Mobile First**  
The interface shall be designed with mobile devices as the primary platform, with touch targets minimum 44x44px and optimized for one-handed use where possible.

**NFR11: Usability - Accessibility**  
The application shall meet basic accessibility standards including WCAG 2.1 Level A minimum (color contrast, keyboard navigation, alt text for images).

**NFR12: Reliability - Error Handling**  
The system shall handle network errors gracefully with user-friendly error messages and automatic retry mechanisms where appropriate.

**NFR13: Reliability - Data Consistency**  
Leaderboard scores shall reflect real-time updates with eventual consistency, with critical score updates confirmed through Firestore transactions.

**NFR14: Maintainability - Code Quality**  
Codebase shall follow React best practices, component modularity, and include TypeScript for type safety to reduce bugs and improve maintainability.

**NFR15: Deployment - CI/CD**  
The project shall use automated deployment via Vercel with preview deployments for pull requests and production deployment on main branch merges.

**NFR16: Monitoring - Analytics**  
The system shall integrate Firebase Analytics or Google Analytics to track user engagement, completion rates, and key user flows for iterative improvement.

**NFR17: Cost Efficiency**  
Firebase usage patterns shall be optimized to minimize read/write operations, with efficient queries and appropriate use of caching to control costs.

**NFR18: Browser Compatibility**  
The application shall function correctly on the latest 2 versions of Chrome, Safari, Firefox, and Edge browsers on both mobile and desktop platforms.

---

## User Interface Design Goals

### Overall UX Vision

The Copilot Combate Game shall deliver a **playful, intuitive, and low-pressure** learning environment that feels more like a game than a training tool. The visual design should balance professionalism (appropriate for corporate settings) with engaging game aesthetics (colorful cards, smooth animations, celebratory feedback). The interaction model prioritizes **quick understanding**—new users should grasp the core mechanic (match cards) within 30 seconds without explicit instructions.

Key UX principles:
- **Instant clarity:** Clear visual hierarchy with prominent CTAs ("Match Cards," "Submit Test")
- **Joyful interactions:** Delightful micro-animations for correct matches (celebration effects), warm error states for incorrect attempts
- **Social presence:** Team indicators visible throughout experience (team badge, live team score)
- **Progress visibility:** Clear indication of points earned, cards remaining, leaderboard position
- **Forgiving design:** Easy undo/reset for accidental matches, no punitive mechanics

### Key Interaction Paradigms

**Card Selection & Matching:**
- **Mobile:** Tap-to-select paradigm - user taps one card from each category (Prompt, Use Case, Tool) to form a match, then taps "Submit Match" button
- **Desktop:** Drag-and-drop option available, or click-to-select with visual indicators of selected cards
- **Feedback:** Selected cards highlight with colored border, unselected cards slightly dimmed for focus

**Match Result Feedback:**
- **Correct Match:** Green flash animation, cards fly to a "completed" pile, confetti effect, "+3 points" badge appears
- **Incorrect Match:** Cards gently shake, display "Not quite!" message, "Learn Why" button appears to show explanation modal

**Test Submission Flow:**
- After correct match, "Test This in Your Work" button slides in
- Tapping opens modal with text area: "How would you use this in your real work?"
- Submit button sends to facilitator queue, shows "Submitted! Waiting for validation" confirmation

**Leaderboard Interaction:**
- Swipe or tab toggle between "Individual" and "Team" leaderboards
- User's own position highlighted with distinct color
- Live updates with subtle pulse animation when scores change

### Core Screens and Views

**1. Welcome/Onboarding Screen**
- App logo and tagline: "Derrote os Vilões da Produtividade com M365 Copilot"
- "Sign Up" and "Log In" buttons
- Quick description: "Enfrente 4 desafios, combine prompts com casos de uso e ganhe pontos para seu time"

**2. Team Selection Screen**
- "Create New Team" option (prompt for team name)
- "Join Existing Team" (display list of available teams or enter team code)
- Visual team badges/avatars to make selection engaging

**3. Round Selection Screen (NEW)**
- Visual grid or list showing 4 rounds with progress indicators
- Each round card displays:
  - Round number and villain name
  - Villain avatar/illustration
  - Short villain description (productivity problem)
  - Lock/unlock status
  - Completion percentage (e.g., "8/15 matches completed")
  - "Start Round" or "Continue" button
- Overall progress indicator: "2/4 Rounds Completed"

**4. Villain Introduction Screen (NEW)**
- Full-screen villain character artwork
- Villain name and personality description
- Productivity problem explanation (e.g., "Mestre das Notificações interrompe seu foco constantemente...")
- Learning objectives for the round: "Aprenda a usar Copilot para gerenciar notificações e manter o foco"
- "Accept Challenge" button to start the round

**5. Main Game Board (Round-Specific)**
- Round indicator at top: "Round 1: Mestre das Notificações" with villain icon
- Three card zones: Prompts (left), Use Cases (center), Tools (right column)
- Cards visually themed to villain/round (color accents, icons)
- Selected cards area (shows currently selected cards for matching)
- Score display: Individual points, Team points (prominent)
- "Submit Match" button (disabled until valid selection)
- Navigation: Leaderboard icon, Profile icon, Round Select icon, Help icon

**6. Match Explanation Modal (Villain-Themed)**
- Appears after incorrect match
- Villain icon/avatar at top
- Title: "O [Villain Name] venceu desta vez! Aqui está o porquê..."
- Clear explanation text (2-3 sentences) in villain's "voice" or perspective
- Shows correct match suggestion
- "Tentar Novamente!" button to dismiss and continue

**7. Test Submission Modal**
- Title: "Teste Este Caso de Uso no Seu Trabalho!"  
- Reference to matched cards with round context
- Text area: "Descreva como você aplicaria isso contra [Villain Name]..."
- Character counter (min 50 characters suggested)
- "Submit for Validation" button
- "Skip for Now" option

**8. Leaderboard Screen (Enhanced)**
- Toggle: [Individual] / [Team] / [By Round]
- Ranked list with position, name/team, points
- Round filter dropdown: "All Rounds" / "Round 1" / "Round 2" / etc.
- User's position highlighted and always visible
- "Back to Game" button

**9. Profile Screen**
- User name, email, team badge
- Round progress wheel/chart showing completion status
- Stats: Total points, Points per round, Matches completed per round, Tests submitted (pending/approved)
- Recent activity feed
- "Leave Team" option  
- "Log Out" button

**10. Administrator Dashboard (NEW - Desktop Optimized)**
- **Navigation Tabs**: "Session Monitor" / "Validation Queue" / "Card Management" / "Round Management" / "Analytics"
  
- **Session Monitor Tab**:
  - Live player count, active by round
  - Team standings with drill-down per round
  - Activity feed (recent matches, submissions)
  - Round progression heatmap

- **Validation Queue Tab**:
  - List of pending test submissions with filters (by round, by team)
  - Each submission shows: User, Team, Round, Matched cards, User description, Timestamp
  - Action buttons: Individual "Approve"/"Reject" or Bulk select + "Approve Selected"
  - Feedback text field per submission

- **Card Management Tab**:
  - Search/filter cards by type, round, status
  - Card list with quick edit inline
  - "Create New Card" button → Form modal (Type, Title, Description, Round, Active status)
  - "Bulk Import" button → CSV/JSON upload interface
  - Delete/Archive actions with confirmation

- **Round Management Tab**:
  - List of 4 rounds with drag-to-reorder capability
  - Each round shows: Name, Villain, Card count, Active status, Completion stats
  - "Edit Round" → Modal with: Name, Villain Name, Description, Learning Objectives, Active toggle
  - "Create New Round" button (for future expansion)
  - Match rule editor: Visual interface to define Prompt + Use Case + Tool valid combinations per round

- **Analytics Tab**:
  - Round completion rates (bar chart)
  - Most difficult matches (error rate leaderboard)
  - Average time per round
  - Test submission and approval rates
  - Player engagement metrics

**11. Administrator - Match Rule Editor (NEW)**
- Visual card combination builder
- Three columns showing available cards per type (filtered by round)
- Drag-and-drop or click to build combinations
- Text field for explanation (shown to players on correct match)
- Save/Cancel buttons
- List of existing rules with edit/delete options

### Accessibility

**WCAG 2.1 Level AA Compliance** (targeting AA for broader accessibility):
- Color contrast ratio minimum 4.5:1 for text, 3:1 for UI components
- Color is not the only indicator (use icons + text for match results)
- Keyboard navigation support for all interactive elements
- Screen reader compatibility with semantic HTML and ARIA labels
- Focus indicators visible for keyboard users
- Touch targets minimum 44x44px for mobile accessibility

### Branding

**Visual Identity:**
- **Color Palette:** Vibrant but professional with villain-specific accents
  - Primary: Microsoft Blue (#0078D4) for trust and brand alignment
  - Success: Bright Green (#10B981) for correct matches and "defeating" villains
  - Warning/Error: Warm Orange (#F59E0B) for incorrect attempts (not red, to reduce anxiety)
  - Neutral: Light gray backgrounds (#F3F4F6), Dark text (#1F2937)
  - Villain Theme Colors (Round-Specific Accents):
    - **Round 1 (Mestre das Notificações)**: Energetic Red (#EF4444) - interruptions/alerts
    - **Round 2 (Capitã Pesquisa Infinita)**: Deep Purple (#8B5CF6) - endless searching
    - **Round 3 (Senhora Perfeccionista)**: Perfectionist Gold (#F59E0B) - never-ending refinement
    - **Round 4 (ControlC+V)**: Data Blue (#3B82F6) - copy/paste/data issues

- **Typography:** 
  - Sans-serif, legible on mobile: Inter or Open Sans
  - Headings: Bold, 20-24px on mobile
  - Body: Regular, 16-18px for readability
  - Villain names: Custom display font (more personality, still professional)

- **Card Design:**
  - Rounded corners (16px border-radius) for friendly feel
  - Subtle shadows and elevation for depth
  - Color-coded by type with round theme overlay:
    - Prompts: Blue base with round accent border
    - Use Cases: Green base with round accent border
    - Tools: Purple base with round accent border
  - Icons on each card to aid quick scanning
  - Subtle villain watermark/icon on round-specific cards

- **Animation Style:**
  - Smooth, bouncy easing (cubic-bezier) for playfulness
  - Celebration effects when defeating villains: Confetti, sparkles, scale-up animations, villain "retreat" animation
  - Villain "taunt" animations on incorrect matches (subtle, not discouraging)
  - Transitions: 200-300ms for responsive feel, not sluggish
  - Round transition animations: Villain intro with dramatic entrance

### Target Device and Platforms

**Primary: Mobile Web (Progressive Web App)**
- iOS Safari (14+)
- Android Chrome (90+)
- Responsive design optimized for screen sizes: 375px (iPhone SE) to 428px (iPhone 14 Pro Max) width

**Secondary: Web Desktop/Tablet**
- Chrome, Edge, Firefox, Safari (latest 2 versions)
- Optimized for 1024px+ screen widths
- Tablet (iPad) landscape and portrait modes

**Deployment:**
- PWA with manifest for "Add to Home Screen" capability
- No native app required for MVP
- Installable icon and splash screen for app-like experience

---

## Technical Assumptions

### Repository Structure: Monorepo

**Decision:** Use a **monorepo** structure with npm workspaces or Turborepo to manage frontend and backend (Firebase Functions) code in a single repository.

**Rationale:**
- Simplifies deployment coordination between frontend and Firebase Functions
- Enables shared TypeScript types between client and server
- Single source of truth for version control and CI/CD
- Faster development iteration with atomic commits

**Structure:**
```
/copilot-combate-game
  /packages
    /frontend      (React + Vite)
    /functions     (Firebase Cloud Functions)
    /shared        (TypeScript types, utilities)
  /docs
  /firebase.json
  /package.json (workspace root)
```

### Service Architecture

**Decision:** **Serverless architecture** using Firebase services as the primary backend, with Vercel serverless functions as optional supplement for non-Firebase-specific logic.

**Components:**
- **Frontend:** React SPA hosted on Vercel
- **Authentication:** Firebase Authentication (email/password, Google Sign-In)
- **Database:** Firestore (NoSQL document database) for all data storage
- **Real-time Updates:** Firestore real-time listeners for leaderboards and live scoring
- **Backend Logic:** Firebase Cloud Functions (Node.js) for:
  - Match validation logic (triggered by Firestore writes)
  - Test submission processing
  - Facilitator action handlers (approve/reject tests)
  - Scheduled cleanup tasks (session expiration)
- **Hosting:** Vercel for frontend, Firebase Hosting as fallback option
- **File Storage:** Firebase Storage (if needed for future features like team avatars)

**Rationale:**
- **Fully managed:** No server infrastructure to maintain
- **Auto-scaling:** Firebase handles concurrency automatically
- **Real-time capabilities:** Built-in for live leaderboards without WebSocket complexity
- **Cost-efficient:** Pay-per-use model suitable for workshop-based usage patterns
- **Fast development:** Integrated SDK and tooling accelerate build velocity

### Testing Requirements

**Decision:** **Unit + Integration testing** approach with manual testing for facilitator workflows.

**Testing Strategy:**

**Unit Testing:**
- **Frontend:** Jest + React Testing Library for component tests
- **Business Logic:** Pure function tests for match validation, scoring algorithms
- **Coverage Target:** 70%+ for critical paths (authentication, scoring, match validation)

**Integration Testing:**
- Firebase Emulator Suite for local end-to-end testing (Firestore, Auth, Functions)
- Test full user flows: Registration → Team Join → Match Submission → Score Update
- Cypress or Playwright for critical user journeys on deployed preview environments

**Manual Testing:**
- Facilitator dashboard workflows (test approval/rejection)
- Mobile device testing on physical devices (iOS, Android)
- Accessibility audits using Lighthouse and manual screen reader testing
- Workshop simulation with 10-20 concurrent testers before production launch

**Rationale:**
- Unit + Integration balance coverage with development speed
- Firebase Emulator enables fast, offline testing without affecting production data
- Manual testing essential for UX validation with target audience (non-technical users)

### Additional Technical Assumptions and Requests

**1. TypeScript for Type Safety:**
- Entire codebase (frontend and backend) written in TypeScript
- Shared types package for consistency between client and server
- Strict mode enabled to catch errors early

**2. State Management:**
- React Context API for global state (user, team, scores)
- Optional: Zustand or Jotai for complex client-side state if Context becomes unwieldy
- Firestore real-time listeners handle server state synchronization

**3. Styling Approach:**
- **Tailwind CSS** for rapid UI development and consistent design tokens
- Optional: shadcn/ui or Radix UI for accessible headless components
- Custom component library for card designs and game-specific UI elements

**4. Environment Configuration:**
- Environment variables for Firebase config (separate Dev/Staging/Prod projects)
- Vercel environment variables for deployment secrets
- Local .env files for development (git-ignored)

**5. CI/CD Pipeline:**
- GitHub Actions or Vercel CI for automated testing and deployment
- Deployment flow:
  - PR opened → Preview deployment on Vercel + Firebase Emulator tests
  - Merge to `develop` → Staging deployment (separate Firebase project)
  - Merge to `main` → Production deployment (prod Firebase project)

**6. Monitoring & Logging:**
- Firebase Analytics for user behavior tracking
- Sentry or Firebase Crashlytics for error reporting
- Cloud Functions logging via Firebase Console
- Custom instrumentation for key metrics (match success rate, test submission rate)

**7. Database Security:**
- Firestore Security Rules implemented before production
- Rules enforce:
  - Users can only read/write their own user document
  - Users can read all teams, leaderboards, rounds, and villain profiles
  - Users can write to matches/testSubmissions collections (validated by Functions)
  - Administrators have elevated access to cards, rounds, villains, matchRules collections (identified by custom claims: role === 'admin')
  - Facilitators have elevated read access to validation queues (role === 'facilitator' or 'admin')
  - Admin actions logged to adminLogs collection (write-only for admins, readable by super-admins)

**8. Performance Optimization:**
- Firestore query pagination for large leaderboards (limit 50 results per page)
- Optimistic UI updates for immediate feedback (update local state, then sync with Firestore)
- Code splitting and lazy loading for non-critical routes (Profile, Admin Dashboard tabs)
- Image optimization for villain avatars and card icons using Vercel Image Optimization
- Indexed queries for rounds, cards by round, and user progress tracking

**9. Content Management:**
- Initial card content (180+ cards across 4 rounds) stored as JSON files in repository
- Seeded to Firestore via migration script or Firebase Functions on deploy
- Villain profiles and round definitions pre-loaded during initial setup
- Administrator panel provides full CRUD operations on cards, rounds, and match rules without developer intervention
- Card templates and bulk import formats documented for administrators

**10. Mobile-First Development:**
- Player interface designed and built for mobile viewports first (375px base)
- Administrator dashboard optimized for desktop/tablet (1024px+ base)
- Progressive enhancement for tablet and desktop sizes on player side
- Touch event handling with touch-action CSS and pointer events API
- Testing on real devices prioritized over emulators for player experience
- Admin panel tested on desktop Chrome/Edge and iPad Safari

---

## Epic List

The Copilot Combate Game MVP is structured into **6 sequential epics** that incrementally deliver a fully functional, narrative-driven, round-based game with comprehensive administrator controls. Each epic delivers significant end-to-end value and builds upon the foundation of previous epics.

### Epic 1: Foundation & Core Authentication
**Goal:** Establish project infrastructure, deploy a functional app skeleton, and implement user authentication with team assignment and role-based access control. By the end of this epic, users can register, log in, join a team, and administrators can access protected routes.

### Epic 2: Round System & Villain Framework
**Goal:** Build the round-based progression system with 4 villain characters, round selection interface, and villain introduction screens. By the end of this epic, the narrative structure is in place and users can navigate between rounds (even if gameplay content is not yet complete).

### Epic 3: Card System & Match Gameplay (Round-Aware)
**Goal:** Implement the core game mechanics including round-specific card display, match selection, validation logic, and immediate scoring. By the end of this epic, users can play matches within each round, receive feedback, and earn points.

### Epic 4: Leaderboards & Real-Time Scoring (Multi-Round)
**Goal:** Implement live individual and team leaderboards with real-time score updates and round-specific filtering, enabling competitive gameplay across multiple rounds. By the end of this epic, users can track progress per round and overall.

### Epic 5: Administrator Content Management Panel
**Goal:** Build a comprehensive administrator dashboard for creating cards, managing rounds, defining match rules, and controlling workshop sessions. By the end of this epic, administrators can fully customize game content without developer support.

### Epic 6: Test Submission, Validation & Production Polish
**Goal:** Deliver the test submission workflow with administrator validation, complete all production-ready polish including notifications, error handling, and performance optimization. By the end of this epic, the MVP is ready for pilot workshop deployment.

---

## Epic 1: Foundation & Core Authentication

**Epic Goal:** Establish the technical foundation, project structure, CI/CD pipeline, user authentication system, and role-based access control. Deliver a deployed application where users can register, authenticate with different roles (Player, Facilitator, Administrator), create or join teams, and see a basic game interface placeholder. This epic ensures the infrastructure is solid before building round systems and game mechanics.

### Story 1.1: Project Setup & Infrastructure

**As a developer,**  
I want a well-structured monorepo with React frontend and Firebase backend initialized,  
so that the team has a solid foundation for rapid development.

**Acceptance Criteria:**
1. Monorepo created with npm workspaces or Turborepo containing `packages/frontend`, `packages/functions`, and `packages/shared`
2. Frontend initialized with Vite + React 18 + TypeScript
3. Tailwind CSS configured with theme colors from design specs (including villain-specific colors)
4. Firebase project created (Dev environment) with Firestore, Authentication, and Functions enabled
5. Environment variables configured for Firebase config in frontend and functions packages
6. Basic folder structure established: `/components`, `/hooks`, `/services`, `/types`, `/utils`, `/contexts` in frontend
7. README with setup instructions and development commands
8. Git repository initialized with `.gitignore` configured (node_modules, .env, build artifacts)
9. Application successfully runs locally on `localhost:5173` with "Copilot Combate Game" placeholder

### Story 1.2: Firebase Authentication Integration

**As a business professional,**  
I want to sign up for a new account using my email and password,  
so that I can access the game and start learning M365 Copilot.

**Acceptance Criteria:**
1. Firebase Authentication SDK integrated in frontend with proper initialization
2. Registration form component created with fields: Name, Email, Password, Confirm Password
3. Form validation implemented: email format, password minimum 8 characters, passwords match
4. Firebase `createUserWithEmailAndPassword` API called on form submission
5. User profile document created in Firestore `users` collection with fields: `{uid, displayName, email, role: 'player', createdAt, teamId: null, totalPoints: 0, roundProgress: {}}`
6. Error handling for existing email, weak password, network errors with user-friendly messages
7. Success state redirects user to Team Selection screen
8. Loading states displayed during API calls

### Story 1.3: Role-Based Access Control Setup

**As a system administrator,**  
I want to assign roles to users (Player, Facilitator, Administrator),  
so that I can control access to different parts of the application.

**Acceptance Criteria:**
1. Firebase Custom Claims configured for role management (roles: 'player', 'facilitator', 'admin')
2. Cloud Function created: `setUserRole(uid, role)` callable by super-admin only
3. Default role 'player' assigned automatically on user registration
4. Role stored in both Firestore user document and Firebase Auth custom claims for security rules
5. Protected route wrapper component created: `<AdminRoute>`, `<FacilitatorRoute>`
6. Route guards check user role before rendering protected components
7. Unauthorized users redirected to appropriate screen with message
8. Admin seed script created to manually promote first administrator account
9. User role displayed in profile screen

### Story 1.4: User Login Flow

**As a registered user,**  
I want to log in with my email and password,  
so that I can continue playing the game with my existing profile and team.

**Acceptance Criteria:**
1. Login form component created with Email and Password fields
2. Firebase `signInWithEmailAndPassword` API called on form submission
3. Authentication state managed via Firebase `onAuthStateChanged` listener
4. User role fetched from Auth custom claims after successful login
5. Authenticated users redirected based on role:
   - Players → Team Selection (if no team) or Round Selection (if has team)
   - Administrators → Admin Dashboard or Round Selection (with admin access)
6. Error handling for incorrect credentials, disabled accounts, network errors
7. "Forgot Password" link displayed (triggers Firebase password reset email)
8. Loading spinner displayed during authentication
9. Authenticated state persisted across browser refreshes (Firebase handles this automatically)
10. "Log Out" functionality available in Profile screen (calls Firebase `signOut`)

### Story 1.5: Team Creation

**As a logged-in user,**  
I want to create a new team by providing a team name,  
so that my colleagues and I can compete together in the workshop.

**Acceptance Criteria:**
1. Team Selection screen displays "Create New Team" option
2. Clicking "Create New Team" opens modal with Team Name input field
3. Input validation: Team Name required, 3-30 characters, alphanumeric + spaces allowed
4. "Create Team" button triggers Firebase Function `createTeam` or direct Firestore write
5. New team document created in Firestore `teams` collection with fields: `{teamId, name, createdBy: userId, members: [userId], totalPoints: 0, roundScores: {}, createdAt}`
6. User's `teamId` field updated in `users` collection
7. Success message displayed: "Team '[TeamName]' created! Start playing to earn points."
8. User automatically redirected to Round Selection screen
9. Error handling for duplicate team names or validation failures

### Story 1.6: Team Joining

**As a logged-in user,**  
I want to browse available teams and join one,  
so that I can be part of a team without creating a new one.

**Acceptance Criteria:**
1. Team Selection screen displays "Join Existing Team" section
2. List of available teams fetched from Firestore `teams` collection and displayed with Team Name and Member Count
3. Each team in list has a "Join" button
4. Clicking "Join" updates the user's `teamId` field in `users` collection
5. User's `uid` added to the team's `members` array in `teams` collection (using Firestore `arrayUnion`)
6. Success message displayed: "You joined [TeamName]! Start playing to earn points for your team."
7. User redirected to Round Selection screen
8. Real-time updates: If team list changes while user is on screen, list refreshes automatically
9. Error handling for team already full (if future max member constraint exists) or Firestore write failures

### Story 1.7: Basic Game Board Shell & Navigation

**As a user who has joined a team,**  
I want to see a round selection interface with navigation elements,  
so that I understand the game structure and can navigate to different sections.

**Acceptance Criteria:**
1. Round Selection screen component created with placeholder content: "Rounds Coming Soon"
2. Top navigation bar displays:
   - App logo (left)
   - User's current score and team name (center or right)
   - Profile icon button (right)
   - Admin icon button (if user role is 'admin')
3. Bottom navigation bar with icons: "Rounds" (home), "Leaderboard", "Profile"
4. Clicking "Leaderboard" navigates to placeholder Leaderboard screen (empty state: "Play matches to see leaderboards")
5. Clicking "Profile" navigates to Profile screen showing:
   - Display Name, Email, Role, Team Name
   - Total Points: 0
   - "Log Out" button (functional, redirects to Login screen)
6. Navigation state managed with React Router or similar routing library
7. Protected routes: Round Selection, Leaderboard, Profile require authentication (redirect to Login if not authenticated)
8. Protected routes: Admin Dashboard requires 'admin' or 'facilitator' role (redirect to Rounds if unauthorized)
9. Mobile-responsive layout: Navigation bar stacks appropriately on small screens

### Story 1.8: Deployment & CI/CD Setup

**As a developer,**  
I want an automated CI/CD pipeline that deploys the app to Vercel on every commit,  
so that we can continuously test and iterate quickly.

**Acceptance Criteria:**
1. Vercel project created and linked to GitHub repository
2. Vercel deployment configured:
   - Main branch deploys to Production URL
   - Pull requests generate Preview URLs
3. Firebase project environment variables configured in Vercel dashboard (API keys, project ID)
4. Successful deployment to Vercel with accessible public URL
5. Firebase Cloud Functions deployed to Firebase (Dev project) using `firebase deploy --only functions`
6. Optional: GitHub Actions workflow configured to run linting and type-checking before deployment
7. Deployment status checked: App loads successfully on deployed URL with authentication working
8. README updated with production URL and deployment instructions
9. Deployment succeeds without errors and app is accessible on mobile browsers

---

## Epic 2: Round System & Villain Framework

**Epic Goal:** Build the round-based progression system with 4 themed rounds, each representing a productivity villain challenge. Implement round data structures, villain profiles, round selection interface, and villain introduction screens. By the end of this epic, the narrative framework is in place, users can navigate between rounds, and the game has a story-driven structure (even if card gameplay is not yet implemented).

### Story 2.1: Rounds & Villains Data Schema

**As a developer,**  
I want well-defined Firestore schemas for rounds and villains with initial data seeded,  
so that the game has a complete narrative structure to display.

**Acceptance Criteria:**
1. Firestore collections created: `rounds`, `villains`
2. `villains` collection schema defined:
   - `{villainId, name, description, productivityProblem, avatarUrl, themeColor, order, createdAt}`
   - Example: `{id: 'mestre-notificacoes', name: 'Mestre das Notificações', description: 'Especialista em interromper...', themeColor: '#EF4444'}`
3. `rounds` collection schema defined:
   - `{roundId, roundNumber, name, villainId, learningObjectives, active, cardCount, createdAt}`
4. Seed data script creates 4 villain documents:
   - **Villain 1**: Mestre das Notificações (Red theme, interruption villain)
   - **Villain 2**: Capitã Pesquisa Infinita (Purple theme, disorganized research villain)
   - **Villain 3**: Senhora Perfeccionista (Gold theme, perfectionism villain)
   - **Villain 4**: ControlC+V (Blue theme, data inconsistency villain)
5. Seed data script creates 4 round documents linking to villains
6. Shared TypeScript types created: `Villain`, `Round`, `RoundProgress`
7. Data successfully visible in Firebase Console with correct structure

### Story 2.2: Round Selection Screen UI

**As a user who has joined a team,**  
I want to see a round selection screen showing all 4 rounds with progress indicators,  
so that I can choose which challenge to tackle and track my progress.

**Acceptance Criteria:**
1. Round Selection screen component created replacing "Rounds Coming Soon" placeholder
2. Screen fetches all rounds from Firestore `rounds` collection ordered by `roundNumber`
3. For each round, fetch associated villain data from `villains` collection
4. Display 4 round cards in grid (2x2 on mobile, 4 columns on desktop)
5. Each round card displays:
   - Round number (e.g., "Round 1")
   - Villain name and avatar/icon placeholder
   - Short productivity problem description (1-2 lines)
   - Progress indicator: "0/15 matches" or "Completed" badge
   - Lock icon if round is locked (sequential unlock logic TBD, all unlocked for now)
   - "Start Round" or "Continue" button
6. Overall progress shown at top: "Progress: 2/4 Rounds Completed" with progress bar
7. Round cards styled with villain theme colors (border accent)
8. Clicking "Start Round" / "Continue" navigates to Villain Introduction screen for that round
9. Mobile responsive: Cards stack vertically on small screens
10. Loading state while fetching rounds/villains data

### Story 2.3: Villain Introduction Screen

**As a user starting a round,**  
I want to see a dramatic villain introduction explaining the productivity challenge,  
so that I understand what I'm about to face and feel engaged in the narrative.

**Acceptance Criteria:**
1. Villain Introduction screen component created with route `/round/:roundId/intro`
2. Screen fetches round and villain data based on roundId parameter
3. Full-screen (or near-full-screen) layout with villain theme background gradient
4. Display elements:
   - Large villain avatar/illustration (placeholder image for MVP, styled box if no image)
   - Villain name in display font (larger, bold)
   - Productivity problem description (2-3 sentences): "Mestre das Notificações interrompe seu foco..."
   - "Learning Objectives" section: Bullet list of what user will learn (e.g., "Aprenda a gerenciar notificações com M365 Copilot")
   - Villain personality/taunt (optional flavor text): "Você acha que consegue me vencer?"
5. "Accept Challenge" primary CTA button at bottom
6. "Back to Rounds" link for navigation
7. Clicking "Accept Challenge" navigates to Game Board for that round (`/round/:roundId/play`)
8. Smooth entrance animation (villain slides in or fades in dramatically)
9. Confetti or particle effects themed to villain (optional polish)
10. Screen accessible and readable on mobile devices

### Story 2.4: Round Progress Tracking

**As a user playing rounds,**  
I want my progress per round to be tracked and persisted,  
so that I can resume rounds and see my completion status.

**Acceptance Criteria:**
1. User document in Firestore updated with `roundProgress` field:
   - Structure: `{roundId: {matchesAttempted: number, matchesCorrect: number, completed: boolean, lastPlayed: timestamp}}`
2. When user starts a round (clicks "Accept Challenge"), create or update roundProgress entry
3. After each match in a round, update `matchesAttempted` and `matchesCorrect` counters
4. Round marked as `completed: true` when all available matches for that round are finished
5. Round Selection screen reads `roundProgress` to display completion status
6. Profile screen displays round progress visualization (e.g., 4 round icons with checkmarks)
7. If user navigates away and returns, progress is preserved
8. Firestore transactions used to prevent race conditions on progress updates
9. Team document also tracks aggregate round completion: `roundScores: {roundId: totalPoints}`

### Story 2.5: Round-Specific Navigation & Context

**As a user playing a specific round,**  
I want the game board to clearly show which round I'm in with villain branding,  
so that I maintain narrative context throughout gameplay.

**Acceptance Criteria:**
1. Game Board route updated to `/round/:roundId/play` (round-aware)
2. Top navigation bar enhanced to show:
   - Round indicator: "Round 1: Mestre das Notificações" with villain icon
   - Villain theme color accent (border or background)
3. Round context loaded from Firestore and stored in React context/state
4. Navigation includes "Back to Round Selection" option
5. If user tries to access `/round/:roundId/play` directly (deep link), system:
   - Checks if user has team assigned (redirect to Team Selection if not)
   - Loads round data
   - Shows Villain Introduction if first time in this round
6. Round context available to all child components for filtering cards
7. Error handling: If roundId invalid, show error and redirect to Round Selection
8. Mobile breadcrumb: "Rounds > Round 1 > Playing"

### Story 2.6: Round Unlock Logic (Optional Enhancement)

**As a facilitator or administrator,**  
I want to configure whether rounds unlock sequentially or are all available,  
so that I can control workshop progression.

**Acceptance Criteria:**
1. Round document has field: `unlockRequirement: 'none' | 'sequential' | 'admin'`
2. If `sequential`: User must complete previous round before accessing next round
3. If `none`: All rounds available immediately (default for MVP)
4. If `admin`: Administrators manually activate rounds per session
5. Round Selection screen displays lock icon on inaccessible rounds
6. Clicking locked round shows modal: "Complete Round [X] first to unlock this challenge"
7. Logic implemented in Round Selection component to determine lock status
8. Simple configuration in Firestore seed data (can be changed by admin later in Epic 5)

### Story 2.7: Round Completion Celebration

**As a user completing all matches in a round,**  
I want a satisfying completion screen celebrating my victory over the villain,  
so that I feel accomplished and motivated to continue.

**Acceptance Criteria:**
1. When user completes final match in a round, trigger completion modal/screen
2. Completion screen displays:
   - "Round Completed!" or "Villain Defeated!" title
   - Villain avatar with "defeated" visual effect (dimmed, X over it, etc.)
   - Round summary stats:
     - Total matches: X
     - Accuracy: Y%
     - Points earned: Z
     - Time taken (optional)
   - Confetti or celebration animation
3. CTA buttons:
   - "Next Round" (if available, navigates to next round's Villain Intro)
   - "Back to Rounds" (returns to Round Selection)
   - "View Leaderboard" (optional)
4. User's round progress updated: `completed: true`
5. Team round score finalized
6. Achievement badge visual (optional): "Defeated Mestre das Notificações!"
7. Screen dismissible with backdrop click or close button
8. Mobile responsive layout

---

## Epic 3: Card System & Match Gameplay (Round-Aware)

**Epic Goal:** Build the core game mechanics with round-aware card system, implementing card display filtered by round, match selection interactions, validation logic specific to rounds, and immediate scoring. By the end of this epic, users can play matches within each round, receive villain-themed feedback, and earn points that contribute to both individual and team scores per round.

### Story 3.1: Round-Specific Card Content Schema & Seed Data

**As a developer,**  
I want cards organized by round with round-specific match rules,  
so that each round has its own focused content set aligned with the villain theme.

**Acceptance Criteria:**
1. Firestore collections created: `cards`, `matchRules`
2. `cards` collection schema defined:
   - `{cardId, type: 'prompt'|'useCase'|'tool', title, description, roundId, villainTheme, active, createdAt}`
   - `roundId` field links card to specific round
3. `matchRules` collection schema defined:
   - `{ruleId, roundId, promptCardId, useCaseCardId, toolCardId, explanation, villainMessage, createdAt}`
   - `explanation`: Educational text for WHY this combination is correct
   - `villainMessage`: Optional flavor text from villain's perspective (e.g., "Você me derrotou desta vez!")
4. Seed data script populates 180+ cards distributed across 4 rounds:
   - **Round 1 (Mestre das Notificações)**: 45 cards (15 Prompts, 15 Use Cases, 15 Tools) about notification/communication management
   - **Round 2 (Capitã Pesquisa Infinita)**: 45 cards about research/information discovery
   - **Round 3 (Senhora Perfeccionista)**: 45 cards about document creation/refinement
   - **Round 4 (ControlC+V)**: 45 cards about data management/automation
5. Seed data script populates 60+ match rules (15 per round) covering M365 Copilot scenarios
6. Each round's cards have relevant M365 tools: Teams, Outlook, Word, Excel, PowerPoint, OneNote
7. Shared TypeScript types created: `Card`, `MatchRule`
8. Data visible in Firebase Console with proper round associations

### Story 3.2: Round-Aware Card Loading on Game Board

**As a user playing a specific round,**  
I want to see only cards relevant to that round's villain theme,  
so that my learning is focused and contextual.

**Acceptance Criteria:**
1. Game Board component receives `roundId` from route parameter (`/round/:roundId/play`)
2. On Game Board load, query Firestore `cards` collection:
   - `WHERE roundId == currentRoundId AND active == true`
   - Order by random or predefined sequence
3. Fetch 15-18 cards initially (5-6 per type: Prompt, Use Case, Tool)
4. Cards displayed in three columns/sections:
   - "Prompts" (left column)
   - "Use Cases" (center column)
   - "Tools" (right column)
5. Each section scrollable if more than 6 cards visible
6. Loading state shown while fetching cards
7. Error handling: If no cards found for round, display message and "Back to Rounds" button
8. Cards filtered strictly by round—no mixing of cards from different rounds
9. Performance: Query uses Firestore index on (`roundId`, `active`, `type`)

### Story 3.3: Card Display UI Component with Villain Theming

**As a user viewing cards in a round,**  
I want cards visually themed to the villain's color scheme,  
so that I remain immersed in the narrative context.

**Acceptance Criteria:**
1. Card component created with props: `{card: Card, villain: Villain, selected: boolean, onClick}`
2. Card displays:
   - Type indicator icon (prompt icon, use case icon, tool icon)
   - Card title (bold, 16-18px font, ellipsis if too long)
   - Short description (12-14px font, 2-line clamp with ellipsis)
3. Card styling with villain theme:
   - Base color-coded by type: Blue (Prompts), Green (Use Cases), Purple (Tools)
   - Accent border using villain's theme color (e.g., Red for M est re das Notificações)
   - Subtle villain watermark/icon in background (optional polish)
   - Rounded corners (16px border-radius)
   - Shadow for depth
4. Interactive states:
   - **Default**: Normal elevation, base colors
   - **Hover** (desktop): Slight elevation increase (shadow grows)
   - **Selected**: Thick border (4px) in villain color, scale-up (1.05x transform)
   - **Disabled**: Dimmed opacity (0.5) if card already matched
5. Mobile responsive: Cards adapt to narrow screens (single column or 2-column grid)
6. Accessibility: Touch targets minimum 44x44px, keyboard focusable

### Story 3.4: Card Selection & Match Submission Interaction

**As a user playing a round,**  
I want to tap cards to select them and submit my match combination,  
so that I can test my understanding of the round's Copilot concepts.

**Acceptance Criteria:**
1. User can tap/click one card from each type (Prompt, Use Case, Tool)
2. Selection logic enforced:
   - Only one card per type selected at a time
   - Tapping same card deselects it
   - Tapping different card of same type replaces previous selection
3. Selected cards area at bottom/top shows currently selected cards with labels
4. "Submit Match" button prominently displayed
5. Button states:
   - **Disabled** (gray): Until all 3 card types selected
   - **Enabled** (villain color): When ready to submit
   - **Loading**: Spinner during validation
6. Clicking "Submit Match" triggers validation
7. Form validation prevents double-submission (button disabled during request)
8. Clear visual feedback on what's selected and what's still needed
9. Mobile optimization: Selected cards area sticky/fixed for easy visibility

### Story 3.5: Round-Aware Match Validation Logic

**As a system,**  
I want to validate matches against round-specific rules,  
so that feedback is accurate and contextual to the villain challenge.

**Acceptance Criteria:**
1. Match validation function receives: `{roundId, promptCardId, useCaseCardId, toolCardId}`
2. Query Firestore `matchRules` collection:
   - `WHERE roundId == round AND promptCardId == selected AND useCaseCardId == selected AND toolCardId == selected`
3. If match found: Return `{correct: true, explanation: rule.explanation, villainMessage: rule.villainMessage}`
4. If no match: Return `{correct: false, explanation: "Esta combinação não resolve o desafio de [Villain Name]. Tente pensar em...  "}`
5. Generic incorrect explanation mentions villain by name for context
6. Validation completes within 500ms (NFR requirement)
7. Validation can be client-side (fast) or Cloud Function (secure), client-side recommended for MVP
8. Unit tests created covering: correct matches per round, incorrect matches, edge cases

### Story 3.6: Correct Match Feedback with Villain Defeat Animation

**As a user making a correct match,**  
I want celebratory feedback showing I'm defeating the villain,  
so that I feel rewarded and engaged in the narrative.

**Acceptance Criteria:**
1. When validation returns `{correct: true}`:
   - Green flash animation on selected cards
   - Confetti particles in villain theme color
   - "+3 Points" badge animates in
   - Villain avatar briefly shows "defeat" animation (shake, dim, retreat)
   - Optional villain message shown: "[VillainMessage from rule]" (e.g., "Você me venceu desta vez!")
   - Success sound effect (optional, muted by default)
2. Score updates:
   - User `totalPoints` +3 (Firestore transaction)
   - User `roundProgress[roundId].matchesCorrect` +1
   - Team `totalPoints` +3
   - Team `roundScores[roundId]` +3
3. Matched cards fade out or move to "Completed" pile
4. New cards load to maintain 5-6 cards per type in current round
5. User auto-deselected, ready for next match
6. Match recorded: `{matchId, userId, teamId, roundId, cardIds, correct: true, points: 3, timestamp}`
7. UI updates feel snappy (optimistic updates, sync to Firestore in background)

### Story 3.7: Incorrect Match with Villain-Themed Educational Feedback

**As a user making an incorrect match,**  
I want helpful feedback from the villain's perspective,  
so that I learn why I'm wrong while staying engaged in the story.

**Acceptance Criteria:**
1. When validation returns `{correct: false}`:
   - Selected cards shake animation (subtle, 2-3 shakes)
   - Villain-themed modal appears with villain avatar
   - Modal title: "O [Villain Name] venceu desta vez!"
   - Explanation text (2-4 sentences): From `validation.explanation`
   - Optional villain taunt: "Você precisa pensar melhor sobre gerenciar notificações!"
   - "Tentar Novamente!" button (primary CTA)
2. No points awarded, no penalties
3. User's selected cards remain visible or auto-deselect (UX test to decide)
4. Match recorded: `{matchId, userId, teamId, roundId, cardIds, correct: false, points: 0, timestamp}`
5. Modal dismissible with button click or backdrop click
6. User can immediately attempt another match
7. Feedback tone: educational and encouraging, not punitive
8. Mobile responsive modal layout

### Story 3.8: Session State & Card Flow Management

**As a user playing a round,**  
I want smooth card flow with automatic refreshing,  
so that gameplay feels continuous and engaging.

**Acceptance Criteria:**
1. Game Board fetches initial 15-18 cards from current round
2. After each successful match:
   - Remove matched cards from display
   - Fetch new random cards from same round to maintain 5-6 cards per type
   - Smooth transition animations (fade out matched, fade in new)
3. Card pool management:
   - Track which cards user has already seen/matched in this session
   - Avoid showing same cards repeatedly (unless all cards exhausted)
4. Round completion detection:
   - When all possible matches in round completed, trigger Story 2.7 (Round Completion Celebration)
   - Display "Round Complete!" modal
5. Session persistence:
   - If user leaves and returns, resume with appropriate card set
   - Don't reset round progress accidentally
6. Performance: Minimize Firestore reads by batching and caching
7. Error handling: If card fetch fails, show "Retry" button, don't break game flow

---

## Epic 4: Leaderboards & Real-Time Scoring (Multi-Round)

**Epic Goal:** Implement live individual and team leaderboards with real-time score updates and round-specific filtering, enabling competitive gameplay across multiple rounds. By the end of this epic, users can track their progress per round and overall, seeing themselves and their teams climb the ranks in real-time.

### Story 4.1: Individual Leaderboard with Round Filtering

**As a user,**  
I want to view a leaderboard showing all players ranked by points with round breakdowns,  
so that I can see how I compare overall and per round challenge.

**Acceptance Criteria:**
1. Leaderboard screen displays "Individual" tab (default view)
2. Firestore query fetches top 50 users sorted by `totalPoints` descending
3. Round filter dropdown at top: "All Rounds" (default) | "Round 1" | "Round 2" | "Round 3" | "Round 4"
4. When "All Rounds" selected:
   - Display total points for each user
5. When specific round selected:
   - Re-query or filter to show points earned in that round only
   - Use `user.roundProgress[roundId].points` or aggregate from matches collection
6. Each leaderboard entry displays:
   - Rank (1st, 2nd, 3rd, etc.)
   - Display Name
   - Team Name (color badge)
   - Points (total or round-specific based on filter)
   - Optional: Small icons showing which rounds completed
7. Top 3 users highlighted (gold, silver, bronze styling)
8. Current user's row highlighted regardless of position
9. If user not in top 50, pin their row at bottom with actual rank
10. Loading skeleton while fetching data

### Story 4.2: Team Leaderboard with Round Breakdown

**As a user,**  
I want to view team rankings overall and per-round,  
so that I can see my team's performance across all challenges.

**Acceptance Criteria:**
1. Leaderboard screen has tabs: [Individual] / [Team]
2. Team tab shows teams sorted by `totalPoints` descending
3. Same round filter dropdown: "All Rounds" | specific rounds
4. Team leaderboard displays:
   - Rank
   - Team Name with badge
   - Member Count
   - Total Points (or round-specific points)
   - Optional: Progress bar showing rounds completed (e.g., "3/4 rounds")
5. Top 3 teams highlighted
6. Current user's team highlighted
7. Empty state: "No teams have scored yet"
8. Mobile responsive: Condense information on small screens

### Story 4.3: Real-Time Leaderboard Updates

**As a user viewing the leaderboard,**  
I want scores to update instantly when matches are completed,  
so that I feel the live competition.

**Acceptance Criteria:**
1. Use Firestore real-time listeners (`onSnapshot`) on user/team collections
2. When scores change:
   - Leaderboard automatically re-renders
   - Updated rows pulse/highlight briefly (green glow)
   - Rank changes animate (smooth transitions)
3. If user's score increases while viewing leaderboard:
   - Confetti or subtle celebration effect
   - Notification: "You moved up to rank X!"
4. Performance: Efficiently handle 50+ concurrent users updates
5. Listeners re-attach if user navigates away and returns
6. Proper cleanup on unmount (prevent memory leaks)

### Story 4.4: Score Display in Game UI (Round-Aware)

**As a user playing any round,**  
I want to see my score prominently with round context,  
so that I know my progress without leaving the game.

**Acceptance Criteria:**
1. Top navbar on Game Board shows:
   - "Your Points: [total]" with hover/tooltip showing per-round breakdown
   - "Team: [Name] | [total] pts"
   - "Round Score: [roundPoints] pts" for current round
2. Scores use real-time listeners
3. When user earns points:
   - Numbers animate (count-up effect)
   - Pulse animation
4. Tapping team score opens Team Leaderboard
5. Tapping individual score opens Individual Leaderboard
6. Mobile responsive: Condense labels ("Pts:", team abbreviation)

### Story 4.5: Leaderboard Profile Drill-Down (Optional Enhancement)

**As a user,**  
I want to click on a player/team in the leaderboard to see detailed stats,  
so that I can learn more about top performers.

**Acceptance Criteria:**
1. Clicking on a leaderboard entry opens modal/drawer with details:
   - Player name, team, total points
   - Round-by-round breakdown (table or chart)
   - Matches completed per round
   - Tests submitted/approved
   - Join date
2. Close button returns to leaderboard
3. Mobile-friendly layout

---

### Story 4.1: Test Submission Button & Modal

**As a user who just completed a correct match,**  
I want to see an option to submit a real-world test for additional points,  
so that I can demonstrate practical application and earn bonus points for my team.

**Acceptance Criteria:**
1. After correct match feedback animation completes, a "Test This in Your Work" button slides in or appears prominently
2. Button is visually distinct (e.g., purple gradient, larger size, with icon)
3. Button includes text: "Test in Your Work – Earn 10 pts!"
4. Clicking button opens Test Submission Modal
5. Modal displays:
   - Title: "How would you use this in your real work?"
   - Reference to matched cards: Display the Prompt, Use Case, and Tool that were matched
   - Text area input (multiline, 5-6 rows)
   - Placeholder: "Describe a specific scenario from your work where you would apply this..."
   - Character counter (encourage minimum 50 characters, no hard limit)
   - "Submit for Validation" button (primary CTA)
   - "Skip for Now" button (secondary, closes modal)
6. Modal is mobile-responsive with full-screen or large overlay on small screens
7. User can close modal by clicking "Skip" or backdrop (non-disruptive)

### Story 4.2: Test Submission to Firestore

**As a user filling out the test submission form,**  
I want to submit my description for facilitator review,  
so that I can potentially earn 10 bonus points for my team.

**Acceptance Criteria:**
1. Validation on submit: Text area must contain at least 20 characters (prevent empty submissions)
2. "Submit for Validation" button disabled if validation fails
3. Clicking "Submit" creates a new document in Firestore `testSubmissions` collection:
   - `{submissionId, userId, teamId, matchRuleId, userDescription, status: 'pending', submittedAt, validatedAt: null, facilitatorFeedback: null}`
4. Success feedback: Modal closes and toast notification appears: "Test submitted! Waiting for facilitator validation."
5. Loading state during submission (spinner on button, prevent double-submit)
6. Error handling: If Firestore write fails, display error message and allow retry
7. After submission, matched cards are cleared and new cards load (no duplicate submissions for same match)
8. Test submission recorded in `matches` collection reference (user can track their submissions in profile)

### Story 4.3: User Submission Status Tracking

**As a user,**  
I want to view my submitted tests and their validation status,  
so that I know which submissions are pending, approved, or rejected.

**Acceptance Criteria:**
1. Profile screen displays "My Test Submissions" section
2. Query Firestore `testSubmissions` where `userId == currentUser.uid`
3. Display list of submissions with:
   - Submission date/time
   - Use Case matched (brief reference)
   - Status badge: "Pending" (yellow), "Approved" (green), "Rejected" (red)
   - Points earned (if approved): "+10 pts"
   - Facilitator feedback (if any)
4. Approved submissions display checkmark icon and green highlight
5. Rejected submissions display feedback modal link: "View Feedback"
6. Pending submissions display clock icon
7. List sorted by submission date descending (newest first)
8. Empty state: "No test submissions yet. Complete matches and submit tests to earn bonus points!"

### Story 4.4: Facilitator Dashboard - Validation Queue

**As a facilitator,**  
I want to view all pending test submissions from participants,  
so that I can review and validate them during the workshop.

**Acceptance Criteria:**
1. Facilitator Dashboard created as separate screen/route (e.g., `/facilitator`)
2. Authentication check: Only users with `role: 'facilitator'` (custom claim in Firebase Auth) can access
3. Dashboard displays "Validation Queue" tab (default view)
4. Query Firestore `testSubmissions` where `status == 'pending'` ordered by `submittedAt` ascending (oldest first)
5. Each submission card displays:
   - User name and team name
   - Matched cards (Prompt, Use Case, Tool) for context
   - User's description text (full text, scrollable if long)
   - Time submitted (e.g., "5 minutes ago")
   - Action buttons: "Approve" (green) and "Reject" (red)
6. Optional: "Add Feedback" text field (appears on Reject, optional on Approve)
7. Submissions displayed in scrollable list or card grid
8. Badge showing pending count: "12 Pending Validations"
9. Empty state: "No pending submissions. Great job keeping up!"

### Story 4.5: Facilitator Approve Test Submission

**As a facilitator,**  
I want to approve valid test submissions and award 10 points to the user's team,  
so that I can reward participants who demonstrate real-world application understanding.

**Acceptance Criteria:**
1. Clicking "Approve" button on a submission triggers Firebase Function or Firestore transaction:
   - Update submission document: `status: 'approved'`, `validatedAt: serverTimestamp()`
   - Increment user's `totalPoints` by 10
   - Increment team's `totalPoints` by 10
2. Optional facilitator feedback text saved in `facilitatorFeedback` field (if entered)
3. Submission card disappears from pending queue (moves to "Approved" list or hidden)
4. Success toast notification: "Test approved! 10 points awarded to [Team Name]."
5. Leaderboards automatically update in real-time (via Firestore listeners)
6. User receives in-app notification: "Your test was approved! +10 pts for [Team Name]."
7. Loading state on Approve button during processing (prevent double-click)
8. Error handling: If transaction fails, display error and allow retry

### Story 4.6: Facilitator Reject Test Submission

**As a facilitator,**  
I want to reject invalid or incomplete test submissions with feedback,  
so that users understand why their submission didn't meet criteria and can learn from it.

**Acceptance Criteria:**
1. Clicking "Reject" button opens feedback text field (required for rejection)
2. Facilitator enters rejection reason (minimum 10 characters): e.g., "This scenario doesn't align with the use case. Try thinking about a situation where..."
3. Submitting rejection triggers update to submission document:
   - `status: 'rejected'`, `validatedAt: serverTimestamp()`, `facilitatorFeedback: [feedback text]`
4. No points awarded (user and team scores unchanged)
5. Submission card disappears from pending queue
6. Success toast: "Test rejected with feedback sent to user."
7. User receives in-app notification: "Your test submission needs revision. Check feedback in your profile."
8. User can view feedback in Profile > Test Submissions section
9. Optional: Allow user to resubmit a revised test (future enhancement, note in Epic discussion, not acceptance criteria for MVP)

### Story 4.7: Facilitator Dashboard - Active Session Overview

**As a facilitator,**  
I want to see real-time statistics about the current workshop session,  
so that I can monitor engagement and session progress at a glance.

**Acceptance Criteria:**
1. Facilitator Dashboard displays "Active Session" tab
2. Overview panel shows:
   - Active players count (users with activity in last 30 minutes)
   - Total matches completed (across all users)
   - Total test submissions (pending + validated)
   - Average points per player
3. Live team standings widget: Top 5 teams with scores
4. Recent activity feed (last 10-15 actions):
   - "[User] completed a match (+3 pts)"
   - "[User] submitted a test for validation"
   - "[Team] received 10 pts for validated test"
5. All data updates in real-time via Firestore listeners
6. Optional: Export session report button (CSV download of all user/team scores) - future enhancement, not MVP critical
7. Dashboard responsive for tablet and laptop screens (facilitators likely on larger devices)

---

## Epic 5: Facilitator Dashboard & Production Polish

**Epic Goal:** Deliver a comprehensive facilitator dashboard, complete session management features, and production-ready polish including notifications, error handling, performance optimization, and accessibility improvements. By the end of this epic, the MVP is fully functional, stable, and ready for pilot workshop deployment.

### Story 5.1: User Notification System

**As a user,**  
I want to receive notifications when my test submissions are validated,  
so that I'm immediately aware of my points and can see facilitator feedback.

**Acceptance Criteria:**
1. In-app notification component created (toast or notification banner)
2. When user's test submission is approved/rejected (Firestore listener on `testSubmissions` where `userId == currentUser.uid` and `status` changes):
   - Notification appears on screen with message:
     - Approved: "✅ Test Approved! +10 pts for [Team Name]" (green)
     - Rejected: "❌ Test needs revision. View feedback in Profile." (orange/yellow)
3. Notification displays for 5-8 seconds then auto-dismisses (or user can dismiss manually)
4. Notification includes action link: "View Details" → navigates to Profile > Test Submissions
5. Notification system handles multiple simultaneous notifications (stack or queue)
6. Notifications accessible (screen reader announces notification content)
7. Optional: Sound notification on approval (toggleable in settings, default off)
8. Notification component reusable for future notification types (match achievements, system messages, etc.)

### Story 5.2: Comprehensive Error Handling & User Feedback

**As a user,**  
I want clear, helpful error messages when something goes wrong,  
so that I understand the issue and know how to proceed.

**Acceptance Criteria:**
1. Network error handling: If Firestore request fails (timeout, offline), display message: "Connection issue. Please check your internet and try again." with "Retry" button
2. Authentication errors: Failed login shows specific messages:
   - "Incorrect email or password. Please try again."
   - "Account not found. Sign up to get started."
   - "Too many failed attempts. Please try again later."
3. Form validation errors: Display inline error messages below fields (e.g., "Password must be at least 8 characters")
4. Firestore write failures: "Failed to save. Please try again." with retry mechanism
5. Empty states: All lists (leaderboards, test submissions, teams) have friendly empty state messages with suggested actions
6. 404 page: If user navigates to invalid route, display custom 404 with navigation back to Game Board
7. Error boundaries: React Error Boundary wraps app to catch render errors and display fallback UI instead of white screen
8. Error logging: Critical errors logged to Firebase Analytics or Sentry for monitoring

### Story 5.3: Session Timeout & Reconnection Handling

**As a user,**  
I want the app to handle disconnections gracefully and allow me to resume my game,  
so that temporary network issues don't disrupt my learning experience.

**Acceptance Criteria:**
1. Session persistence: User's authentication token and game state (via Firestore) persist across browser refreshes
2. Network disconnection detection: App detects when online/offline using browser `navigator.onLine` API
3. Offline indicator: Banner appears at top of screen when offline: "You're offline. Reconnecting..."
4. Automatic reconnection: When connection restored, banner changes to "Back online!" (green) and auto-dismisses after 3 seconds
5. Firestore listeners automatically reconnect when network restored (Firebase SDK handles this)
6. Pending actions during offline: Match submissions queued locally and retry when online (optimistic UI updates)
7. Session timeout: If user idle for 2+ hours, show modal: "Session expired. Please log in again." with "Log In" button
8. No data loss: User's scores and progress persisted in Firestore even if session expires

### Story 5.4: Performance Optimization & Lighthouse Audit

**As a user,**  
I want the app to load quickly and run smoothly even on slower mobile devices,  
so that I have a seamless gameplay experience.

**Acceptance Criteria:**
1. Code splitting: Non-critical routes (Profile, Facilitator Dashboard) lazy-loaded with React.lazy() and Suspense
2. Image optimization: All images compressed and served in modern formats (WebP with fallbacks)
3. Firestore query optimization:
   - Leaderboard queries limited to top 50 results (pagination if needed)
   - Card queries batch fetch in optimal sizes (12-18 cards)
   - Indexes created for frequently queried fields (totalPoints, status, userId)
4. Bundle size optimization: Analyze with `vite-bundle-visualizer`, remove unused dependencies, tree-shake
5. Caching: Service Worker configured for static asset caching (PWA manifest)
6. Lighthouse audit scores on mobile (deployed URL):
   - Performance: 80+
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 80+
7. Real-world testing: App tested on mid-range Android device (3-4 years old) for smooth performance

### Story 5.5: Accessibility Improvements (WCAG 2.1 AA)

**As a user with accessibility needs,**  
I want the app to be usable with keyboard navigation and screen readers,  
so that I can participate in the workshop regardless of my abilities.

**Acceptance Criteria:**
1. Keyboard navigation: All interactive elements (buttons, cards, links) focusable and operable with Tab, Enter, Space keys
2. Focus indicators: Visible focus outlines (2px solid) on all focusable elements (not removed by CSS)
3. Screen reader support:
   - Semantic HTML used (header, nav, main, section, button elements)
   - ARIA labels added to icon buttons (e.g., "Open Profile", "Submit Match")
   - ARIA live regions for dynamic content (leaderboard updates, notifications)
4. Color contrast: All text meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
5. Color is not sole indicator: Match feedback uses icons + text + color (not just green/red)
6. Touch targets: All buttons/cards minimum 44x44px for mobile accessibility
7. Form labels: All form inputs have associated labels (visible or aria-label)
8. Automated accessibility testing: Run aXe DevTools or Lighthouse accessibility audit, fix critical issues
9. Manual testing: Test navigation with keyboard only, test with screen reader (NVDA or VoiceOver)

### Story 5.6: Mobile UI Polish & Responsive Design Refinement

**As a mobile user,**  
I want the app to feel native and polished on my phone,  
so that I'm fully engaged in the gameplay experience.

**Acceptance Criteria:**
1. Mobile-first design review: All screens optimized for 375px-428px width (iPhone SE to iPhone 14 Pro Max)
2. Touch interactions refined:
   - Cards have adequate spacing (minimum 8px between cards)
   - Buttons large enough for thumb taps (minimum 48x48px)
   - Swipe gestures considered for tab switching (leaderboards)
3. Bottom navigation: Sticky bottom navbar (Game, Leaderboard, Profile) for easy thumb reach
4. Modal behavior: Full-screen or near-full-screen modals on mobile for focus
5. Orientation support: App works in both portrait (primary) and landscape orientations
6. Safe area: Respect device safe areas (notches, home indicators) using CSS environment variables
7. PWA features:
   - Manifest.json configured (app name, icons, theme color, display: standalone)
   - "Add to Home Screen" prompt on iOS/Android
   - App icon displays on home screen like native app
8. Physical device testing: Test on real iPhone and Android devices (not just emulators)

### Story 5.7: Facilitator Bulk Actions & Session Management

**As a facilitator managing a busy workshop,**  
I want to quickly validate multiple submissions and manage session state,  
so that I can keep up with participant activity without bottlenecks.

**Acceptance Criteria:**
1. Validation Queue supports selection: Checkboxes on each submission card
2. Bulk actions available when 2+ submissions selected:
   - "Approve All Selected" button
   - "Reject All Selected" button (requires single feedback message applied to all)
3. Bulk approval: Executes Firestore batch write to update all selected submissions to `approved` status and award points
4. Confirmation modal before bulk actions: "Approve 5 submissions? This will award 50 total points."
5. Session management panel:
   - "Reset Session" button (admin only): Clears all scores and matches (with strong confirmation, intended for testing)
   - "End Session" button: Marks session as complete, displays final leaderboard (can export or screenshot)
6. Optional: Facilitator notes field to add session comments (saved to Firestore `sessions` collection)
7. Performance: Bulk actions complete within 3 seconds for 10 submissions

### Story 5.8: Production Deployment & Final QA

**As a developer,**  
I want the app deployed to production with comprehensive testing completed,  
so that pilot workshops can run without critical issues.

**Acceptance Criteria:**
1. Production Firebase project created (separate from Dev) with Firestore, Auth, Functions configured
2. Production environment variables set in Vercel for production deployment
3. Firebase Security Rules deployed and tested:
   - Users can read/write own user document
   - Users can read all teams and leaderboards
   - Facilitators have elevated access to testSubmissions
4. Production deployment completed to Vercel (main branch) with custom domain (if available)
5. Smoke testing on production URL:
   - User registration/login works
   - Team creation/joining works
   - Card matching and scoring works
   - Leaderboards update in real-time
   - Test submission and facilitator validation works
6. Load testing: Simulate 50 concurrent users (using tool like Artillery or K6) to verify NFR3 (performance under load)
7. Cross-browser testing: Tested on Chrome, Safari, Firefox, Edge on both mobile and desktop
8. Final accessibility audit: WCAG AA compliance verified
9. Documentation updated: README includes production URL, user guide, facilitator guide
10. Rollback plan documented: Steps to revert deployment if critical bug discovered

---

## Checklist Results Report

**PM Checklist Status:** (To be executed before finalizing PRD)

_This section will contain the results of running the `pm-checklist` against this PRD to verify completeness, consistency, and readiness for architectural design._

**Placeholder for checklist execution:**
- [ ] All functional requirements have unique identifiers (FR#)
- [ ] All non-functional requirements have unique identifiers (NFR#)
- [ ] Epic goals clearly state value delivered
- [ ] Stories follow "As a [user], I want [action], so that [benefit]" format
- [ ] Acceptance criteria are specific, testable, and complete
- [ ] Stories are sequenced logically within epics
- [ ] No story depends on work from a later story
- [ ] UI/UX goals provide clear design direction
- [ ] Technical assumptions documented and rationale provided
- [ ] MVP scope clearly defined with out-of-scope items listed
- [ ] Success metrics measurable and achievable

**Action:** Execute `*execute-checklist pm-checklist` after PRD review to populate this section.

---

## Next Steps

### UX Expert Prompt

**Ready for UX/Design Phase:**

> "Please review the **Copilot Combate Game PRD** and begin creating detailed UI/UX specifications using the `frontend-spec-template`. Focus on:
> - Mobile-first wireframes for all core screens (Game Board, Leaderboards, Test Submission Modal)
> - Card component design system (visual styling, animations, states)
> - Interaction patterns for card selection and match submission
> - Responsive breakpoints and layout adaptations
> - Accessibility considerations (WCAG AA compliance)
> 
> Use the UI Design Goals section as your foundation and align with the project's playful yet professional aesthetic."

### Architect Prompt

**Ready for Architecture Phase:**

> "Please review the **Copilot Combate Game PRD** and create a comprehensive technical architecture document using the `fullstack-architecture-template`. Key areas to address:
> - Detailed Firestore database schema (collections, documents, indexes, security rules)
> - Frontend architecture (React component structure, state management, routing)
> - Firebase Cloud Functions (match validation, test approval, triggered functions)
> - Real-time data synchronization patterns for leaderboards and scoring
> - Authentication flow and role-based access control (users vs. facilitators)
> - Deployment architecture (Vercel + Firebase integration)
> - Performance optimization strategies (query efficiency, caching, code splitting)
> - Security implementation (Firestore rules, input validation, rate limiting)
> 
> Reference the Technical Assumptions section and ensure all NFRs (performance, scalability, security) are architecturally supported."

---

**End of PRD Document**

**Status:** Ready for Review  
**Next Actions:**
1. Stakeholder review and approval
2. Execute PM Checklist validation
3. Handoff to UX Expert for design specs
4. Handoff to Architect for technical architecture
5. Begin Epic 1 development sprint

