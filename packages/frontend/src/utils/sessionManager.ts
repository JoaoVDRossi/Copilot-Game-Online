import { RoundSession } from '../types'
import { sessionsApi } from './apiClient'

// Session Storage Key
const SESSION_STORAGE_KEY = 'copilot-combate-sessions'
const API_BASE_URL = import.meta.env.VITE_API_URL || ''
const USE_API = API_BASE_URL !== ''

// Helper: filter sessions by gmId
const filterByGm = (sessions: RoundSession[], gmId?: string): RoundSession[] => {
  if (!gmId) return sessions
  return sessions.filter(s => s.gmId === gmId)
}

// Helper: filter sessions by roomId (if session has no roomId, it matches any room for backward compat)
const filterByRoom = (sessions: RoundSession[], roomId?: string): RoundSession[] => {
  if (!roomId) return sessions
  return sessions.filter(s => !s.roomId || s.roomId === roomId)
}

// Get current active session (sync - uses cached value when using API)
export const getActiveSession = (gmId?: string): RoundSession | null => {
  if (USE_API) {
    const cached = (window as any).__cachedActiveSession
    if (!cached) return null
    if (gmId && cached.gmId !== gmId) return null
    return cached
  }
  
  const stored = localStorage.getItem(SESSION_STORAGE_KEY)
  if (!stored) return null
  
  const sessions: RoundSession[] = JSON.parse(stored)
  const active = filterByGm(sessions, gmId).find(s => s.active)
  
  if (!active) return null
  
  return {
    ...active,
    startedAt: active.startedAt ? new Date(active.startedAt) : null,
    endsAt: active.endsAt ? new Date(active.endsAt) : null,
  }
}

// Fetch and cache active session from API (async)
export const fetchActiveSession = async (gmId?: string, roomId?: string): Promise<RoundSession | null> => {
  console.log('🔍 [SESSION] Fetching active session... useAPI:', USE_API, 'gmId:', gmId, 'roomId:', roomId)
  
  if (!USE_API) {
    return getActiveSession(gmId)
  }
  
  try {
    const sessions: RoundSession[] = await sessionsApi.getAll()
    console.log('📦 [SESSION] Received sessions from API:', sessions.length, sessions)
    
    const active = filterByGm(sessions, gmId).find((s: RoundSession) => s.active)
    
    if (!active) {
      console.log('⚠️ [SESSION] No active session found')
      ;(window as any).__cachedActiveSession = null
      return null
    }
    
    console.log('🎲 [SESSION] Active session found:', active)
    
    let startedAtDate: Date | null = null
    let endsAtDate: Date | null = null
    
    if (active.startedAt) {
      startedAtDate = active.startedAt instanceof Date ? active.startedAt : new Date(active.startedAt)
      if (isNaN(startedAtDate.getTime())) {
        console.error('[SESSION] Invalid startedAt date:', active.startedAt)
        startedAtDate = null
      }
    }
    
    if (active.endsAt) {
      endsAtDate = active.endsAt instanceof Date ? active.endsAt : new Date(active.endsAt)
      if (isNaN(endsAtDate.getTime())) {
        console.error('[SESSION] Invalid endsAt date:', active.endsAt)
        endsAtDate = null
      }
    }
    
    const sessionWithDates: RoundSession = {
      ...active,
      startedAt: startedAtDate,
      endsAt: endsAtDate,
    }
    
    console.log('✅ [SESSION] Fetched active session:', {
      id: sessionWithDates.id,
      roundId: sessionWithDates.roundId,
      gmId: sessionWithDates.gmId,
      active: sessionWithDates.active,
      endsAt: endsAtDate?.toISOString(),
      remainingSeconds: endsAtDate ? Math.floor((endsAtDate.getTime() - new Date().getTime()) / 1000) : 0
    })
    
    ;(window as any).__cachedActiveSession = sessionWithDates
    
    return sessionWithDates
  } catch (error) {
    console.error('❌ [SESSION] Error fetching active session:', error)
    return null
  }
}

// Start a new round session
export const startRoundSession = async (roundId: string, durationMinutes: number = 15, gmId?: string, roomId?: string): Promise<RoundSession> => {
  console.log('🚀 [SESSION] Starting round session:', { roundId, durationMinutes, gmId, roomId, useAPI: USE_API })
  
  const now = new Date()
  const endsAt = new Date(now.getTime() + durationMinutes * 60 * 1000)
  
  const session: RoundSession = {
    id: `session-${Date.now()}`,
    roundId,
    gmId,
    roomId,
    active: true,
    startedAt: now,
    endsAt,
    duration: durationMinutes * 60,
    timerVisible: true,
  }
  
  console.log('📝 [SESSION] Session object created:', session)
  
  if (USE_API) {
    try {
      console.log('🌐 [SESSION] Using API to create session...')
      await stopAllSessions(gmId, roomId)
      
      const created: RoundSession = await sessionsApi.create(session)
      
      console.log('✅ [SESSION] Session created via API:', created)
      ;(window as any).__cachedActiveSession = created
      
      return created
    } catch (error) {
      console.error('❌ [SESSION] Error creating session via API:', error)
    }
  }
  
  // Fallback to localStorage
  console.log('💾 [SESSION] Using localStorage to create session...')
  await stopAllSessions(gmId, roomId)
  
  const stored = localStorage.getItem(SESSION_STORAGE_KEY)
  const sessions: RoundSession[] = stored ? JSON.parse(stored) : []
  sessions.push(session)
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessions))
  
  console.log('✅ [SESSION] Session created via localStorage')
  
  return session
}

// Stop a round session
export const stopRoundSession = async (roundId: string, gmId?: string, roomId?: string) => {
  if (USE_API) {
    try {
      const sessions: RoundSession[] = await sessionsApi.getAll()
      const session = filterByRoom(filterByGm(sessions, gmId), roomId).find((s: RoundSession) => s.roundId === roundId && s.active)
      
      if (session) {
        const updated: RoundSession = { ...session, active: false }
        await sessionsApi.update(updated)
        ;(window as any).__cachedActiveSession = null
      }
      return
    } catch (error) {
      console.error('Error stopping session:', error)
    }
  }
  
  const stored = localStorage.getItem(SESSION_STORAGE_KEY)
  if (!stored) return
  
  const sessions: RoundSession[] = JSON.parse(stored)
  const updated = sessions.map(s =>
    s.roundId === roundId && s.active && (!gmId || s.gmId === gmId) && (!roomId || !s.roomId || s.roomId === roomId) ? { ...s, active: false } : s
  )
  
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updated))
}

// Stop all active sessions (scoped by gmId and optional roomId)
export const stopAllSessions = async (gmId?: string, roomId?: string) => {
  if (USE_API) {
    try {
      const sessions: RoundSession[] = await sessionsApi.getAll()
      
      for (const session of filterByRoom(filterByGm(sessions, gmId), roomId)) {
        if (session.active) {
          const updated: RoundSession = { ...session, active: false }
          await sessionsApi.update(updated)
        }
      }
      
      ;(window as any).__cachedActiveSession = null
      return
    } catch (error) {
      console.error('Error stopping all sessions:', error)
    }
  }
  
  const stored = localStorage.getItem(SESSION_STORAGE_KEY)
  if (!stored) return
  
  const sessions: RoundSession[] = JSON.parse(stored)
  const updated = sessions.map(s =>
    s.active && (!gmId || s.gmId === gmId) ? { ...s, active: false } : s
  )
  
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updated))
}

// Toggle timer visibility (scoped by gmId and optional roomId)
export const toggleTimerVisibility = async (gmId?: string, roomId?: string): Promise<boolean> => {
  if (USE_API) {
    try {
      const sessions: RoundSession[] = await sessionsApi.getAll()
      const active = filterByRoom(filterByGm(sessions, gmId), roomId).find((s: RoundSession) => s.active)
      if (active) {
        const newVisible = !(active.timerVisible ?? true)
        const updated: RoundSession = { ...active, timerVisible: newVisible }
        await sessionsApi.update(updated)
        ;(window as any).__cachedActiveSession = { ...updated, startedAt: active.startedAt ? new Date(active.startedAt as any) : null, endsAt: active.endsAt ? new Date(active.endsAt as any) : null }
        return newVisible
      }
      return true
    } catch (error) {
      console.error('Error toggling timer visibility:', error)
    }
  }

  const stored = localStorage.getItem(SESSION_STORAGE_KEY)
  if (!stored) return true

  const sessions: RoundSession[] = JSON.parse(stored)
  const active = filterByRoom(filterByGm(sessions, gmId), roomId).find(s => s.active)
  if (active) {
    const newVisible = !(active.timerVisible ?? true)
    active.timerVisible = newVisible
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessions))
    return newVisible
  }
  return true
}

// Get remaining time in seconds
export const getRemainingTime = (session: RoundSession): number => {
  if (!session.endsAt) return 0
  
  const now = new Date()
  const remaining = Math.floor((new Date(session.endsAt).getTime() - now.getTime()) / 1000)
  
  return Math.max(0, remaining)
}

// Format time for display (MM:SS)
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}
