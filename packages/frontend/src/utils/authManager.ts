// Auth Manager - Role-based authentication for the game
// Roles: admin (full access), gamemaster (own rooms only), player (play only)

export type UserRole = 'admin' | 'gamemaster' | 'player'

export interface AuthSession {
  role: UserRole
  id: string        // unique session id
  name: string      // display name (game master name or 'Admin')
  loginTime: string
}

export interface GameMasterAccount {
  id: string
  name: string
  passwordHash: string
  createdAt: string
}

const AUTH_SESSION_KEY = 'copilot-combate-auth'
const GM_ACCOUNTS_KEY = 'copilot-combate-gm-accounts'

// ========================
// Simple password hashing (deterministic, for local use)
// ========================

const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// ========================
// GM Account Registry
// ========================

const getGmAccounts = (): GameMasterAccount[] => {
  const stored = localStorage.getItem(GM_ACCOUNTS_KEY)
  if (!stored) return []
  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

const saveGmAccounts = (accounts: GameMasterAccount[]): void => {
  localStorage.setItem(GM_ACCOUNTS_KEY, JSON.stringify(accounts))
}

// ========================
// Session Management
// ========================

export const getAuthSession = (): AuthSession | null => {
  const stored = localStorage.getItem(AUTH_SESSION_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

export const setAuthSession = (session: AuthSession): void => {
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session))
  // Keep legacy key for backward compatibility with ProtectedAdminRoute
  if (session.role === 'admin' || session.role === 'gamemaster') {
    localStorage.setItem('admin-session', JSON.stringify({
      isAdmin: true,
      role: session.role,
      loginTime: session.loginTime,
    }))
  }
}

export const clearAuthSession = (): void => {
  localStorage.removeItem(AUTH_SESSION_KEY)
  localStorage.removeItem('admin-session')
}

// ========================
// Login Helpers
// ========================

const ADMIN_PASSWORD = 'copilot2024'

export const loginAsAdmin = (password: string): AuthSession | null => {
  if (password !== ADMIN_PASSWORD) return null

  const session: AuthSession = {
    role: 'admin',
    id: `admin-${Date.now()}`,
    name: 'Administrador',
    loginTime: new Date().toISOString(),
  }
  setAuthSession(session)
  return session
}

/**
 * Register or login a Game Master.
 * - If name+password match an existing account, reuse the same id (cross-device).
 * - If name exists but password differs, return error.
 * - If name is new, create a new account.
 */
export const loginAsGameMaster = async (name: string, password: string): Promise<{ session: AuthSession | null; error?: string }> => {
  const trimmedName = name.trim()
  const hash = await hashPassword(password)
  const accounts = getGmAccounts()
  
  const normalizedName = trimmedName.toLowerCase()
  const existing = accounts.find(a => a.name.toLowerCase() === normalizedName)

  if (existing) {
    // Name exists — verify password
    if (existing.passwordHash !== hash) {
      return { session: null, error: 'Senha incorreta para este Game Master.' }
    }
    // Correct password — reuse same persistent id
    const session: AuthSession = {
      role: 'gamemaster',
      id: existing.id,
      name: existing.name,
      loginTime: new Date().toISOString(),
    }
    setAuthSession(session)
    return { session }
  }

  // New account — register
  const newAccount: GameMasterAccount = {
    id: `gm-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    name: trimmedName,
    passwordHash: hash,
    createdAt: new Date().toISOString(),
  }
  accounts.push(newAccount)
  saveGmAccounts(accounts)

  const session: AuthSession = {
    role: 'gamemaster',
    id: newAccount.id,
    name: newAccount.name,
    loginTime: new Date().toISOString(),
  }
  setAuthSession(session)
  return { session }
}

// ========================
// Role Checks
// ========================

export const isAdmin = (): boolean => {
  const session = getAuthSession()
  return session?.role === 'admin'
}

export const isGameMaster = (): boolean => {
  const session = getAuthSession()
  return session?.role === 'gamemaster'
}

export const isAdminOrGameMaster = (): boolean => {
  const session = getAuthSession()
  return session?.role === 'admin' || session?.role === 'gamemaster'
}

export const getSessionId = (): string | null => {
  return getAuthSession()?.id ?? null
}

// ========================
// Validator Session
// ========================

const VALIDATOR_SESSION_KEY = 'copilot-combate-validator'

export interface ValidatorSession {
  roomId: string
  roomName: string
  gmId: string
  token: string
  validatorName: string
  sessionId: string
}

export const getValidatorSession = (): ValidatorSession | null => {
  const stored = localStorage.getItem(VALIDATOR_SESSION_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

export const setValidatorSession = (session: ValidatorSession): void => {
  localStorage.setItem(VALIDATOR_SESSION_KEY, JSON.stringify(session))
}

export const clearValidatorSession = (): void => {
  localStorage.removeItem(VALIDATOR_SESSION_KEY)
}

export const isValidator = (): boolean => {
  return !!getValidatorSession()
}
