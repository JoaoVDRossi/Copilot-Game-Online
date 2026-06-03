// Round data type
export interface Round {
  id: string
  number: number
  name: string
  villain: string
  color: string
  description: string
  learningObjectives: string[]
  active: boolean
}

// Villain data type
export interface Villain {
  id: string
  name: string
  description: string
  productivityProblem: string
  color: string
  avatar: string
  voiceLines: {
    intro: string[]
    onError: string[]
    onDefeat: string[]
  }
}

// Card types
export type CardType = 'prompt' | 'useCase' | 'tool'
export type DifficultyLevel = 'easy' | 'medium' | 'hard'

export interface Card {
  id: string
  type: CardType
  title: string
  description: string
  image: string
  roundId: string
  villainTheme: string
  active: boolean
  difficulty: DifficultyLevel
}

// Round Session
export interface RoundSession {
  id: string
  roundId: string
  gmId?: string // scopes the session to a specific GM's rooms
  roomId?: string // scopes the session to a specific room
  active: boolean
  startedAt: Date | null
  endsAt: Date | null
  duration: number // in seconds (900 = 15 minutes)
  timerVisible: boolean // if true, players see the countdown; if false, only GM sees it
  paused?: boolean // if true, timer is frozen
  pausedAt?: string | null // ISO timestamp when timer was paused
}

// Match Rule
export interface MatchRule {
  id: string
  roundId: string
  promptCardId: string
  useCaseCardId: string
  toolCardId: string
  explanation: string
  villainMessage: string
  active: boolean
}

// User & Team
export interface User {
  id: string
  name: string
  email: string
  role: 'player' | 'facilitator' | 'admin'
  teamId: string | null
  totalPoints: number
}

export interface Team {
  id: string
  name: string
  members: string[]
  totalPoints: number
  roundScores: Record<string, number>
}

// Match
export interface Match {
  id: string
  userId: string
  teamId: string
  roundId: string
  cardIds: {
    promptCardId: string
    useCaseCardId: string
    toolCardId: string
  }
  correct: boolean
  points: number
  timestamp: Date
}

// Test Submission
export interface TestSubmission {
  id: string
  userId: string
  teamId: string
  roundId: string
  matchRuleId: string
  userDescription: string
  status: 'pending' | 'approved' | 'rejected'
  points: number
  submittedAt: Date
  validatedAt?: Date
  validatedBy?: string
  facilitatorFeedback?: string
}

// Room (Sala) - for simultaneous game sessions
export type RoomStatus = 'waiting' | 'playing' | 'finished'

export interface ValidatorEntry {
  sessionId: string
  name: string
  password: string
  joinedAt: string
}

export interface Room {
  id: string
  code: string // 6-digit numeric code for players to join
  name: string
  status: RoomStatus
  createdBy: string // admin identifier
  teams: RoomTeam[]
  matchesPerRound?: Record<string, number> // e.g. { 'round-1': 3, 'round-2': 5 }
  validatorToken?: string // UUID for validator invite links
  validators?: ValidatorEntry[] // active validators who joined via link
  createdAt: string
  startedAt?: string
  finishedAt?: string
}

export interface RoomTeam {
  id: string
  name: string
  normalizedName: string // for dedup: lowercase, no spaces, no accents
  members: string[] // player usernames
  score: number
  completedRounds: string[]
  currentRound?: string // e.g. 'round-1'
  joinedAt: string
}
