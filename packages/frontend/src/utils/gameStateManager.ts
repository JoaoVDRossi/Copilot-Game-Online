// Game State Manager - Manages game state per room using Room.status
import { getAllRooms, updateRoom, getRoomsByCreator, getCurrentRoom } from './roomManager'
import { Room } from '../types'

export interface GameState {
  isFinished: boolean
  finishedAt?: string
  finishedBy?: string
}

/**
 * Get game state for a specific room (sync).
 * If no roomId is provided, checks the player's current room.
 */
export const getGameState = (roomId?: string): GameState => {
  let room: Room | null = null
  if (roomId) {
    room = getAllRooms().find(r => r.id === roomId) || null
  } else {
    room = getCurrentRoom()
    // Re-fetch from storage to get latest status
    if (room) {
      room = getAllRooms().find(r => r.id === room!.id) || room
    }
  }
  if (!room) return { isFinished: false }
  return {
    isFinished: room.status === 'finished',
    finishedAt: room.finishedAt,
  }
}

/**
 * Fetch game state (async-compatible wrapper).
 * Accepts roomId or falls back to current room.
 */
export const fetchGameState = async (roomId?: string): Promise<GameState> => {
  return getGameState(roomId)
}

/**
 * Finish the game for specific rooms.
 * @param roomIds - Array of room IDs to mark as finished.
 *                  If omitted, finishes rooms created by the given gmId.
 * @param gmId - GM identifier; used to find rooms if roomIds not given.
 */
export const finishGame = async (roomIds?: string[], gmId?: string): Promise<void> => {
  const now = new Date().toISOString()
  let rooms: Room[] = []

  if (roomIds && roomIds.length > 0) {
    const allRooms = getAllRooms()
    rooms = allRooms.filter(r => roomIds.includes(r.id))
  } else if (gmId) {
    rooms = getRoomsByCreator(gmId)
  }

  for (const room of rooms) {
    updateRoom({
      ...room,
      status: 'finished',
      finishedAt: now,
    })
  }
}

/**
 * Check if the game is finished for a room (sync).
 */
export const isGameFinished = (roomId?: string): boolean => {
  return getGameState(roomId).isFinished
}

/**
 * Reset game state (un-finish) for specific rooms.
 */
export const resetGameState = async (roomIds?: string[], gmId?: string): Promise<void> => {
  let rooms: Room[] = []

  if (roomIds && roomIds.length > 0) {
    const allRooms = getAllRooms()
    rooms = allRooms.filter(r => roomIds.includes(r.id))
  } else if (gmId) {
    rooms = getRoomsByCreator(gmId)
  } else {
    // Fallback: reset ALL rooms (admin usage)
    rooms = getAllRooms()
  }

  for (const room of rooms) {
    updateRoom({
      ...room,
      status: 'waiting',
      finishedAt: undefined,
    })
  }
}
