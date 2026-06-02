import { normalizeTeamName } from './roomManager'

interface TeamData {
  id: string
  name: string
  score: number
  completedRounds: string[]
  createdAt: string
  lastActive: string
  area?: string
}

const TEAMS_STORAGE_KEY = 'copilot-combate-teams'

// Get all teams
export const getAllTeams = (): TeamData[] => {
  const stored = localStorage.getItem(TEAMS_STORAGE_KEY)
  if (!stored) return []
  return JSON.parse(stored)
}

// Get current team
export const getCurrentTeam = (): TeamData | null => {
  const stored = localStorage.getItem('current-team')
  if (!stored) return null
  return JSON.parse(stored)
}

// Save or update a team
export const saveTeam = (team: TeamData) => {
  const teams = getAllTeams()
  const existingIndex = teams.findIndex(t => t.id === team.id)
  
  if (existingIndex >= 0) {
    teams[existingIndex] = { ...team, lastActive: new Date().toISOString() }
  } else {
    teams.push({ ...team, lastActive: new Date().toISOString() })
  }
  
  localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(teams))
  
  // Also update current team if it's the active one
  const currentTeam = getCurrentTeam()
  if (currentTeam && currentTeam.id === team.id) {
    localStorage.setItem('current-team', JSON.stringify(team))
  }
}

// Add points to current team
export const addPointsToCurrentTeam = (points: number) => {
  const currentTeam = getCurrentTeam()
  if (!currentTeam) return
  
  const updatedTeam = {
    ...currentTeam,
    score: currentTeam.score + points,
  }
  
  saveTeam(updatedTeam)
  localStorage.setItem('current-team', JSON.stringify(updatedTeam))
}

// Mark round as completed for current team
export const markRoundCompleted = (roundId: string) => {
  const currentTeam = getCurrentTeam()
  if (!currentTeam) return
  
  if (!currentTeam.completedRounds.includes(roundId)) {
    const updatedTeam = {
      ...currentTeam,
      completedRounds: [...currentTeam.completedRounds, roundId],
    }
    
    saveTeam(updatedTeam)
    localStorage.setItem('current-team', JSON.stringify(updatedTeam))
    
    console.log('✅ Round marked as completed:', {
      roundId,
      teamId: updatedTeam.id,
      completedRounds: updatedTeam.completedRounds
    })
  } else {
    console.log('ℹ️ Round already marked as completed:', roundId)
  }
}

// Get top teams (leaderboard)
export const getTopTeams = (limit: number = 5): TeamData[] => {
  const teams = getAllTeams()
  return teams
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

// Get total active players (teams)
export const getActivePlayers = (): number => {
  const teams = getAllTeams()
  // Consider "active" if team was active in the last 2 hours
  const twoHoursAgo = Date.now() - (2 * 60 * 60 * 1000)
  
  return teams.filter(team => {
    const lastActive = new Date(team.lastActive).getTime()
    return lastActive > twoHoursAgo
  }).length
}

// Get total points across all teams
export const getTotalPoints = (): number => {
  const teams = getAllTeams()
  return teams.reduce((sum, team) => sum + team.score, 0)
}

// Get stats for current team
export const getCurrentTeamStats = () => {
  const currentTeam = getCurrentTeam()
  if (!currentTeam) {
    return {
      score: 0,
      completedRounds: 0,
      totalRounds: 4,
    }
  }
  
  const stats = {
    score: currentTeam.score,
    completedRounds: currentTeam.completedRounds.length,
    totalRounds: 4,
  }
  
  console.log('getCurrentTeamStats:', {
    teamId: currentTeam.id,
    teamName: currentTeam.name,
    completedRoundsArray: currentTeam.completedRounds,
    stats
  })
  
  return stats
}

// Initialize team on first login
export const initializeTeam = (teamName: string): TeamData => {
  const newTeam: TeamData = {
    id: `team-${Date.now()}`,
    name: teamName,
    score: 0,
    completedRounds: [],
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
  }
  
  saveTeam(newTeam)
  return newTeam
}

// Find or create team by name (preserves progress on re-login)
// Uses normalized name matching to prevent duplicates like "Time 1" vs "time1"
export const findOrCreateTeam = (teamName: string): TeamData => {
  const allTeams = getAllTeams()
  const normalizedInput = normalizeTeamName(teamName)
  
  // Search for existing team with normalized name matching
  const existingTeam = allTeams.find(
    t => normalizeTeamName(t.name) === normalizedInput
  )
  
  if (existingTeam) {
    const updatedTeam: TeamData = {
      ...existingTeam,
      lastActive: new Date().toISOString(),
    }
    saveTeam(updatedTeam)
    return updatedTeam
  }
  
  // Create new team if not found
  return initializeTeam(teamName)
}

// Clear all teams (for game reset)
export const clearAllTeams = () => {
  localStorage.removeItem(TEAMS_STORAGE_KEY)
  localStorage.removeItem('current-team')
}
