// Round Progress Manager - Tracks progress and points for each round per team

import { getAllMatchRules } from './cardManager'
import { getCurrentRoom, getRoomById } from './roomManager'

const ROUND_PROGRESS_KEY = 'copilot-combate-round-progress'

export interface RoundProgress {
  roundId: string
  progress: number // 0-100
  points: number
  status: 'available' | 'in-progress' | 'completed'
  matchesCompleted: number
  totalMatches: number
  lastUpdated: string
}

export interface TeamRoundProgress {
  teamId: string
  rounds: RoundProgress[]
}

// Count matches for a round: uses room override if set, else counts active rules
const getMatchCountForRound = (roundId: string): number => {
  // Check room-specific override
  const room = getCurrentRoom()
  if (room) {
    // Re-fetch from storage for latest data
    const freshRoom = getRoomById(room.id)
    const override = freshRoom?.matchesPerRound?.[roundId]
    if (override && override > 0) return override
  }
  // Default: count active match rules
  const rules = getAllMatchRules()
  return rules.filter(r => r.roundId === roundId && r.active).length || 1
}

// Initialize default round progress
const createDefaultRoundProgress = (): RoundProgress[] => {
  const roundIds = ['round-1', 'round-2', 'round-3', 'round-4']
  return roundIds.map(roundId => ({
    roundId,
    progress: 0,
    points: 0,
    status: 'available' as const,
    matchesCompleted: 0,
    totalMatches: getMatchCountForRound(roundId),
    lastUpdated: new Date().toISOString(),
  }))
}

// Get all round progress data
const getAllRoundProgress = (): TeamRoundProgress[] => {
  const stored = localStorage.getItem(ROUND_PROGRESS_KEY)
  return stored ? JSON.parse(stored) : []
}

// Save all round progress data
const saveAllRoundProgress = (data: TeamRoundProgress[]) => {
  localStorage.setItem(ROUND_PROGRESS_KEY, JSON.stringify(data))
}

// Get current team's round progress
export const getCurrentTeamRoundProgress = (): RoundProgress[] => {
  const currentTeamStr = localStorage.getItem('current-team')
  if (!currentTeamStr) return createDefaultRoundProgress()
  
  const currentTeam = JSON.parse(currentTeamStr)
  const allProgress = getAllRoundProgress()
  
  const teamProgress = allProgress.find(tp => tp.teamId === currentTeam.id)
  
  if (!teamProgress) {
    // Create default progress for this team
    const newTeamProgress: TeamRoundProgress = {
      teamId: currentTeam.id,
      rounds: createDefaultRoundProgress(),
    }
    allProgress.push(newTeamProgress)
    saveAllRoundProgress(allProgress)
    return newTeamProgress.rounds
  }
  
  // Refresh totalMatches from current rules (in case admin added/removed rules)
  let changed = false
  for (const round of teamProgress.rounds) {
    const correctTotal = getMatchCountForRound(round.roundId)
    if (round.totalMatches !== correctTotal) {
      round.totalMatches = correctTotal
      round.progress = Math.min(100, Math.round((round.matchesCompleted / round.totalMatches) * 100))
      changed = true
    }
  }
  if (changed) {
    saveAllRoundProgress(allProgress)
  }
  
  return teamProgress.rounds
}

// Update progress for a specific round
export const updateRoundProgress = (
  roundId: string,
  updates: Partial<RoundProgress>
) => {
  const currentTeamStr = localStorage.getItem('current-team')
  if (!currentTeamStr) return
  
  const currentTeam = JSON.parse(currentTeamStr)
  const allProgress = getAllRoundProgress()
  
  let teamProgress = allProgress.find(tp => tp.teamId === currentTeam.id)
  
  if (!teamProgress) {
    teamProgress = {
      teamId: currentTeam.id,
      rounds: createDefaultRoundProgress(),
    }
    allProgress.push(teamProgress)
  }
  
  const roundIndex = teamProgress.rounds.findIndex(r => r.roundId === roundId)
  
  if (roundIndex !== -1) {
    teamProgress.rounds[roundIndex] = {
      ...teamProgress.rounds[roundIndex],
      ...updates,
      lastUpdated: new Date().toISOString(),
    }
    
    // Auto-calculate progress based on matches
    if (updates.matchesCompleted !== undefined) {
      const round = teamProgress.rounds[roundIndex]
      // Refresh totalMatches from current match rules
      round.totalMatches = getMatchCountForRound(roundId)
      round.progress = Math.min(100, Math.round((round.matchesCompleted / round.totalMatches) * 100))
      
      // Update status based on progress
      if (round.progress >= 100) {
        round.status = 'completed'
      } else if (round.progress > 0) {
        round.status = 'in-progress'
      }
    }
    
    saveAllRoundProgress(allProgress)
  }
}

// Mark round as started
export const startRound = (roundId: string) => {
  updateRoundProgress(roundId, {
    status: 'in-progress',
  })
}

// Add points to a round
export const addPointsToRound = (roundId: string, points: number) => {
  const currentProgress = getCurrentTeamRoundProgress()
  const round = currentProgress.find(r => r.roundId === roundId)
  
  if (round) {
    updateRoundProgress(roundId, {
      points: round.points + points,
      matchesCompleted: round.matchesCompleted + 1,
    })
  }
}

// Mark round as completed
export const completeRound = (roundId: string) => {
  updateRoundProgress(roundId, {
    status: 'completed',
    progress: 100,
  })
}

// Reset progress for current team
export const resetCurrentTeamProgress = () => {
  const currentTeamStr = localStorage.getItem('current-team')
  if (!currentTeamStr) return
  
  const currentTeam = JSON.parse(currentTeamStr)
  const allProgress = getAllRoundProgress()
  
  const teamProgress = allProgress.find(tp => tp.teamId === currentTeam.id)
  
  if (teamProgress) {
    teamProgress.rounds = createDefaultRoundProgress()
    saveAllRoundProgress(allProgress)
  }
}

// Reset ALL rounds progress (admin function)
export const resetAllRoundsProgress = () => {
  localStorage.removeItem(ROUND_PROGRESS_KEY)
}

// Get round progress by ID
export const getRoundProgress = (roundId: string): RoundProgress | null => {
  const progress = getCurrentTeamRoundProgress()
  return progress.find(r => r.roundId === roundId) || null
}
