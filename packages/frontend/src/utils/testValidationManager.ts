// Test Validation Queue - Manages test validation requests from players

import { getAllTeams, saveTeam } from './teamsManager'
import { validationsApi } from './apiClient'
import { getAllRooms, updateRoom } from './roomManager'

const API_BASE_URL = import.meta.env.VITE_API_URL || ''
const USE_API = API_BASE_URL !== ''

export interface TestValidation {
  id: string
  matchId: string
  teamId: string
  teamName: string
  roundId: string
  useCaseCardId: string
  useCaseTitle: string
  imageUrl?: string
  submittedAt: string
  validated: boolean
  validatedAt?: string
  validatedBy?: string
  rejected?: boolean
  rejectedAt?: string
  rejectionReason?: string
}

const TEST_VALIDATION_KEY = 'copilot-combate-test-validations'

// Get all test validations
export const getAllTestValidations = async (): Promise<TestValidation[]> => {
  if (USE_API) {
    try {
      return await validationsApi.getAll()
    } catch (error) {
      console.error('Error fetching validations:', error)
      return []
    }
  }
  
  const stored = localStorage.getItem(TEST_VALIDATION_KEY)
  if (!stored) return []
  try {
    return JSON.parse(stored)
  } catch (e) {
    console.error('Error parsing test validations:', e)
    return []
  }
}

// Save test validations (localStorage only)
const saveTestValidations = (validations: TestValidation[]): void => {
  localStorage.setItem(TEST_VALIDATION_KEY, JSON.stringify(validations))
}

// Submit a test for validation
export const submitTestValidation = async (
  matchId: string,
  teamId: string,
  teamName: string,
  roundId: string,
  useCaseCardId: string,
  useCaseTitle: string,
  imageUrl?: string
): Promise<void> => {
  const newValidation: TestValidation = {
    id: `validation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    matchId,
    teamId,
    teamName,
    roundId,
    useCaseCardId,
    useCaseTitle,
    imageUrl,
    submittedAt: new Date().toISOString(),
    validated: false,
  }
  
  if (USE_API) {
    try {
      await validationsApi.create(newValidation)
      return
    } catch (error) {
      console.error('Error submitting validation:', error)
    }
  }
  
  // Fallback to localStorage
  const validations = await getAllTestValidations()
  
  // Check if this test is already submitted
  const exists = validations.find(
    v => v.matchId === matchId && !v.validated
  )
  
  if (!exists) {
    validations.push(newValidation)
    saveTestValidations(validations)
  }
}

// Get pending validations (not yet validated)
export const getPendingValidations = async (): Promise<TestValidation[]> => {
  const validations = await getAllTestValidations()
  return validations.filter(v => !v.validated).sort((a, b) => 
    new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
  )
}

// Mark validation as completed
export const markValidationCompleted = async (validationId: string, validatedBy: string = 'admin'): Promise<void> => {
  if (USE_API) {
    try {
      const validations = await getAllTestValidations()
      const validation = validations.find(v => v.id === validationId)
      if (validation) {
        await validationsApi.update({
          ...validation,
          validated: true,
          validatedAt: new Date().toISOString(),
          validatedBy,
        })
      }
      return
    } catch (error) {
      console.error('Error marking validation completed:', error)
    }
  }
  
  const validations = await getAllTestValidations()
  const validation = validations.find(v => v.id === validationId)
  if (validation) {
    validation.validated = true
    validation.validatedAt = new Date().toISOString()
    validation.validatedBy = validatedBy
    saveTestValidations(validations)
    
    // Add 10 points to the team (global teams store)
    const teams = getAllTeams()
    const team = teams.find(t => t.id === validation.teamId)
    if (team) {
      team.score += 10
      saveTeam(team)
    }

    // Also sync +10 points to the room team (for GM leaderboard)
    const rooms = getAllRooms()
    for (const room of rooms) {
      const roomTeam = room.teams.find(t => t.id === validation.teamId)
      if (roomTeam) {
        roomTeam.score += 10
        updateRoom(room)
        break
      }
    }
  }
}

// Reject a validation with feedback
export const rejectValidation = async (validationId: string, rejectionReason: string): Promise<void> => {
  if (USE_API) {
    try {
      const validations = await getAllTestValidations()
      const validation = validations.find(v => v.id === validationId)
      if (validation) {
        await validationsApi.update({
          ...validation,
          rejected: true,
          rejectedAt: new Date().toISOString(),
          rejectionReason,
          validated: true,
        })
      }
      return
    } catch (error) {
      console.error('Error rejecting validation:', error)
    }
  }
  
  const validations = await getAllTestValidations()
  const validation = validations.find(v => v.id === validationId)
  if (validation) {
    validation.rejected = true
    validation.rejectedAt = new Date().toISOString()
    validation.rejectionReason = rejectionReason
    validation.validated = true // Mark as processed so it doesn't appear in pending
    saveTestValidations(validations)
  }
}

// Remove a validation
export const removeValidation = async (validationId: string): Promise<void> => {
  const validations = await getAllTestValidations()
  const filtered = validations.filter((v: TestValidation) => v.id !== validationId)
  saveTestValidations(filtered)
}

// Remove rejected validation for a specific match (for resubmission)
export const removeRejectedValidation = async (matchId: string): Promise<void> => {
  const validations = await getAllTestValidations()
  const filtered = validations.filter((v: TestValidation) => !(v.matchId === matchId && v.rejected))
  saveTestValidations(filtered)
  console.log('🗑️ Removed rejected validation for match:', matchId)
}

// Clear all validations (for game reset)
export const clearAllTestValidations = (): void => {
  localStorage.removeItem(TEST_VALIDATION_KEY)
}
