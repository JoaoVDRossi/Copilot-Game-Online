// Match History Manager - Tracks successful matches per team

export interface MatchHistory {
  id: string
  teamId: string
  teamName: string
  roundId: string
  promptCardId: string
  useCaseCardId: string
  toolCardId: string
  timestamp: string
  tested: boolean
  playerName?: string // nome do jogador que fez o match
}

const MATCH_HISTORY_KEY = 'copilot-combate-match-history'

// Get all match history
export const getAllMatchHistory = (): MatchHistory[] => {
  const stored = localStorage.getItem(MATCH_HISTORY_KEY)
  if (!stored) return []
  try {
    return JSON.parse(stored)
  } catch (e) {
    console.error('Error parsing match history:', e)
    return []
  }
}

// Save match history
const saveMatchHistory = (history: MatchHistory[]): void => {
  localStorage.setItem(MATCH_HISTORY_KEY, JSON.stringify(history))
}

// Add a successful match to history
export const addMatchToHistory = (
  teamId: string,
  teamName: string,
  roundId: string,
  promptCardId: string,
  useCaseCardId: string,
  toolCardId: string,
  playerName?: string
): void => {
  const history = getAllMatchHistory()
  
  // Check if this exact match already exists for this team in this round
  const exists = history.find(
    m => 
      m.teamId === teamId && 
      m.roundId === roundId &&
      m.promptCardId === promptCardId &&
      m.useCaseCardId === useCaseCardId &&
      m.toolCardId === toolCardId
  )
  
  if (!exists) {
    const newMatch: MatchHistory = {
      id: `match-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      teamId,
      teamName,
      roundId,
      promptCardId,
      useCaseCardId,
      toolCardId,
      timestamp: new Date().toISOString(),
      tested: false,
      playerName,
    }
    
    history.push(newMatch)
    saveMatchHistory(history)
  }
}

// Get match history for a specific team
export const getTeamMatchHistory = (teamId: string): MatchHistory[] => {
  const history = getAllMatchHistory()
  return history.filter(m => m.teamId === teamId).sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
}

// Get match history for a specific team and round
export const getTeamRoundMatches = (teamId: string, roundId: string): MatchHistory[] => {
  const history = getAllMatchHistory()
  return history.filter(m => m.teamId === teamId && m.roundId === roundId)
}

// Mark match as tested
export const markMatchAsTested = (matchId: string): void => {
  const history = getAllMatchHistory()
  const match = history.find(m => m.id === matchId)
  if (match) {
    match.tested = true
    saveMatchHistory(history)
  }
}

// Reset match tested status (for resubmission after rejection)
export const resetMatchTestedStatus = (matchId: string): void => {
  const history = getAllMatchHistory()
  const match = history.find(m => m.id === matchId)
  if (match) {
    match.tested = false
    saveMatchHistory(history)
    console.log('🔄 Reset tested status for match:', matchId)
  }
}

// Clear all match history (for game reset)
export const clearAllMatchHistory = (): void => {
  localStorage.removeItem(MATCH_HISTORY_KEY)
}
