// Room Manager - Manages game rooms (salas) for simultaneous sessions
import { Room, RoomTeam } from '../types'
import { cards as defaultCards, matchRules as defaultMatchRules } from '../data/mockData'

const ROOMS_STORAGE_KEY = 'copilot-combate-rooms'
const CURRENT_ROOM_KEY = 'copilot-combate-current-room'
const CURRENT_PLAYER_KEY = 'copilot-combate-current-player'

// ========================
// Team Name Normalization
// ========================

/**
 * Normalizes a team name for comparison/dedup purposes.
 * Removes accents, converts to lowercase, strips all spaces and special chars.
 * Examples: "Time 1" -> "time1", "time1" -> "time1", "Equipe Alfa!" -> "equipealfa"
 */
export const normalizeTeamName = (name: string): string => {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // keep only alphanumeric
}

/**
 * Formats a team name for display (capitalize first letter of each word).
 * Used to pick the "canonical" display name from the first team that registered.
 */
export const formatTeamName = (name: string): string => {
  return name.trim().replace(/\s+/g, ' ')
}

// ========================
// Room Code Generation
// ========================

/**
 * Generates a random 6-digit numeric room code.
 * Checks for uniqueness against existing rooms.
 */
export const generateRoomCode = (): string => {
  const rooms = getAllRooms()
  const existingCodes = new Set(rooms.map(r => r.code))
  
  let code: string
  do {
    code = Math.floor(100000 + Math.random() * 900000).toString()
  } while (existingCodes.has(code))
  
  return code
}

// ========================
// Room CRUD
// ========================

export const getAllRooms = (): Room[] => {
  const stored = localStorage.getItem(ROOMS_STORAGE_KEY)
  if (!stored) return []
  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

const saveAllRooms = (rooms: Room[]): void => {
  localStorage.setItem(ROOMS_STORAGE_KEY, JSON.stringify(rooms))
}

export const getRoomByCode = (code: string): Room | null => {
  const rooms = getAllRooms()
  return rooms.find(r => r.code === code) || null
}

export const getRoomById = (id: string): Room | null => {
  const rooms = getAllRooms()
  return rooms.find(r => r.id === id) || null
}

export const getRoomsByCreator = (creatorId: string): Room[] => {
  const rooms = getAllRooms()
  return rooms.filter(r => r.createdBy === creatorId)
}

export const createRoom = (name: string, createdBy: string = 'admin'): Room => {
  const room: Room = {
    id: `room-${Date.now()}`,
    code: generateRoomCode(),
    name: name.trim(),
    status: 'waiting',
    createdBy,
    teams: [],
    createdAt: new Date().toISOString(),
  }
  
  const rooms = getAllRooms()
  rooms.push(room)
  saveAllRooms(rooms)
  
  // Initialize room-specific game data with defaults
  initializeRoomData(room.id)
  
  return room
}

export const updateRoom = (room: Room): void => {
  const rooms = getAllRooms()
  const index = rooms.findIndex(r => r.id === room.id)
  if (index !== -1) {
    rooms[index] = room
    saveAllRooms(rooms)
  }
}

export const deleteRoom = (roomId: string): void => {
  const rooms = getAllRooms()
  const filtered = rooms.filter(r => r.id !== roomId)
  saveAllRooms(filtered)
  
  // Clean up room-specific data
  localStorage.removeItem(`copilot-combate-cards-${roomId}`)
  localStorage.removeItem(`copilot-combate-match-rules-${roomId}`)
  localStorage.removeItem(`copilot-combate-sessions-${roomId}`)
  localStorage.removeItem(`copilot-combate-match-history-${roomId}`)
}

// ========================
// Room Status Management
// ========================

export const startRoom = (roomId: string): Room | null => {
  const room = getRoomById(roomId)
  if (!room || room.status !== 'waiting') return null
  
  room.status = 'playing'
  room.startedAt = new Date().toISOString()
  updateRoom(room)
  return room
}

export const finishRoom = (roomId: string): Room | null => {
  const room = getRoomById(roomId)
  if (!room) return null
  
  room.status = 'finished'
  room.finishedAt = new Date().toISOString()
  updateRoom(room)
  return room
}

export const reopenRoom = (roomId: string): Room | null => {
  const room = getRoomById(roomId)
  if (!room) return null
  
  room.status = 'waiting'
  room.finishedAt = undefined
  room.startedAt = undefined
  updateRoom(room)
  return room
}

// ========================
// Team Management within Rooms
// ========================

/**
 * Join a room as a player. Finds or creates a team using normalized name matching.
 * Returns the team and whether it was newly created.
 */
export const joinRoom = (
  roomCode: string,
  playerName: string,
  teamName: string
): { room: Room; team: RoomTeam; isNewTeam: boolean } | null => {
  const room = getRoomByCode(roomCode)
  if (!room || room.status === 'finished') return null
  
  const normalizedInput = normalizeTeamName(teamName)
  const displayName = formatTeamName(teamName)
  
  // Find existing team by normalized name
  let team = room.teams.find(t => t.normalizedName === normalizedInput)
  let isNewTeam = false
  
  if (team) {
    // Add player to existing team if not already a member
    if (!team.members.includes(playerName.trim())) {
      team.members.push(playerName.trim())
    }
  } else {
    // Create new team
    team = {
      id: `team-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: displayName,
      normalizedName: normalizedInput,
      members: [playerName.trim()],
      score: 0,
      completedRounds: [],
      joinedAt: new Date().toISOString(),
    }
    room.teams.push(team)
    isNewTeam = true
  }
  
  updateRoom(room)
  return { room, team, isNewTeam }
}

/**
 * Remove a team from a room (admin action).
 */
export const removeTeamFromRoom = (roomId: string, teamId: string): void => {
  const room = getRoomById(roomId)
  if (!room) return
  
  room.teams = room.teams.filter(t => t.id !== teamId)
  updateRoom(room)
}

/**
 * Update team score within a room.
 */
export const updateTeamScore = (roomId: string, teamId: string, points: number): void => {
  const room = getRoomById(roomId)
  if (!room) return
  
  const team = room.teams.find(t => t.id === teamId)
  if (team) {
    team.score += points
    updateRoom(room)
  }
}

/**
 * Mark a round as completed for a team in a room.
 */
export const markTeamRoundCompleted = (roomId: string, teamId: string, roundId: string): void => {
  const room = getRoomById(roomId)
  if (!room) return
  
  const team = room.teams.find(t => t.id === teamId)
  if (team && !team.completedRounds.includes(roundId)) {
    team.completedRounds.push(roundId)
    updateRoom(room)
  }
}

/**
 * Update the current round a team is playing.
 */
export const updateTeamCurrentRound = (roomId: string, teamId: string, roundId: string): void => {
  const room = getRoomById(roomId)
  if (!room) return
  
  const team = room.teams.find(t => t.id === teamId)
  if (team) {
    team.currentRound = roundId
    updateRoom(room)
  }
}

// ========================
// Room-Specific Game Data
// ========================

/**
 * Initialize room with default cards and match rules.
 * Each room gets its own copy so they can be customized independently.
 */
const initializeRoomData = (roomId: string): void => {
  localStorage.setItem(
    `copilot-combate-cards-${roomId}`,
    JSON.stringify(defaultCards)
  )
  localStorage.setItem(
    `copilot-combate-match-rules-${roomId}`,
    JSON.stringify(defaultMatchRules)
  )
}

/**
 * Get cards for a specific room (or defaults if no room context).
 */
export const getRoomCards = (roomId: string) => {
  const stored = localStorage.getItem(`copilot-combate-cards-${roomId}`)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return defaultCards
    }
  }
  return defaultCards
}

/**
 * Save cards for a specific room.
 */
export const saveRoomCards = (roomId: string, cards: any[]): void => {
  localStorage.setItem(`copilot-combate-cards-${roomId}`, JSON.stringify(cards))
}

/**
 * Get match rules for a specific room.
 */
export const getRoomMatchRules = (roomId: string) => {
  const stored = localStorage.getItem(`copilot-combate-match-rules-${roomId}`)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return defaultMatchRules
    }
  }
  return defaultMatchRules
}

/**
 * Save match rules for a specific room.
 */
export const saveRoomMatchRules = (roomId: string, rules: any[]): void => {
  localStorage.setItem(`copilot-combate-match-rules-${roomId}`, JSON.stringify(rules))
}

// ========================
// Current Room/Player Context
// ========================

export const setCurrentRoom = (room: Room): void => {
  localStorage.setItem(CURRENT_ROOM_KEY, JSON.stringify(room))
}

export const getCurrentRoom = (): Room | null => {
  const stored = localStorage.getItem(CURRENT_ROOM_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

export const clearCurrentRoom = (): void => {
  localStorage.removeItem(CURRENT_ROOM_KEY)
  localStorage.removeItem(CURRENT_PLAYER_KEY)
}

export const setCurrentPlayer = (player: { name: string; teamId: string; teamName: string; roomId: string; roomCode: string }): void => {
  localStorage.setItem(CURRENT_PLAYER_KEY, JSON.stringify(player))
}

export const getCurrentPlayer = (): { name: string; teamId: string; teamName: string; roomId: string; roomCode: string } | null => {
  const stored = localStorage.getItem(CURRENT_PLAYER_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

// ========================
// Room Leaderboard
// ========================

export const getRoomLeaderboard = (roomId: string): RoomTeam[] => {
  const room = getRoomById(roomId)
  if (!room) return []
  
  return [...room.teams].sort((a, b) => b.score - a.score)
}

// ========================
// Cleanup
// ========================

export const clearAllRooms = (): void => {
  const rooms = getAllRooms()
  rooms.forEach(room => {
    localStorage.removeItem(`copilot-combate-cards-${room.id}`)
    localStorage.removeItem(`copilot-combate-match-rules-${room.id}`)
    localStorage.removeItem(`copilot-combate-sessions-${room.id}`)
    localStorage.removeItem(`copilot-combate-match-history-${room.id}`)
  })
  localStorage.removeItem(ROOMS_STORAGE_KEY)
  clearCurrentRoom()
}
