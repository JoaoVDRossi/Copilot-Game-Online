// Card Manager - Manages game cards with localStorage persistence

import { Card, MatchRule } from '../types'
import { cards as defaultCards, matchRules as defaultMatchRules } from '../data/mockData'

const CARDS_STORAGE_KEY = 'copilot-combate-cards'
const MATCH_RULES_STORAGE_KEY = 'copilot-combate-match-rules'

// Get all cards (from localStorage or defaults)
export const getAllCards = (): Card[] => {
  const stored = localStorage.getItem(CARDS_STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (e) {
      console.error('Error parsing stored cards:', e)
      return defaultCards
    }
  }
  return defaultCards
}

// Save all cards to localStorage
export const saveAllCards = (cards: Card[]): void => {
  localStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(cards))
}

// Get cards by round and type
export const getCardsByRoundAndType = (roundId: string, type: string): Card[] => {
  const allCards = getAllCards()
  return allCards.filter(card => {
    return card.roundId === roundId && card.type === type && card.active
  })
}

// Add a new card
export const addCard = (card: Card): void => {
  const cards = getAllCards()
  cards.push(card)
  saveAllCards(cards)
}

// Update an existing card
export const updateCard = (cardId: string, updates: Partial<Card>): void => {
  const cards = getAllCards()
  const index = cards.findIndex(c => c.id === cardId)
  if (index !== -1) {
    cards[index] = { ...cards[index], ...updates }
    saveAllCards(cards)
  }
}

// Delete a card
export const deleteCard = (cardId: string): void => {
  const cards = getAllCards()
  const filtered = cards.filter(c => c.id !== cardId)
  saveAllCards(filtered)
}

// Toggle card active status
export const toggleCardActive = (cardId: string): void => {
  const cards = getAllCards()
  const index = cards.findIndex(c => c.id === cardId)
  if (index !== -1) {
    cards[index].active = !cards[index].active
    saveAllCards(cards)
  }
}

// Toggle a tool card with cascade logic:
// - Deactivating: cascades to linked prompt/useCase cards AND match rules; blocked if it is the last active tool in the round
// - Reactivating: cascades re-enable to linked prompt/useCase cards AND match rules
// Returns { cards, blocked } where `blocked` means the action was prevented
export const toggleToolAndCascade = (toolCardId: string): { cards: Card[]; blocked: boolean } => {
  const cards = getAllCards()
  const rules = getAllMatchRules()

  const toolIndex = cards.findIndex(c => c.id === toolCardId)
  if (toolIndex === -1) return { cards, blocked: false }

  const isCurrentlyActive = cards[toolIndex].active
  const linkedRules = rules.filter(r => r.toolCardId === toolCardId)
  const linkedPromptIds = new Set(linkedRules.map(r => r.promptCardId))
  const linkedUseCaseIds = new Set(linkedRules.map(r => r.useCaseCardId))

  if (isCurrentlyActive) {
    // Guard: prevent deactivating the last active tool in this round
    const roundId = cards[toolIndex].roundId
    const activeToolsInRound = cards.filter(c => c.roundId === roundId && c.type === 'tool' && c.active)
    if (activeToolsInRound.length <= 1) {
      return { cards, blocked: true }
    }

    // Deactivate tool + linked prompt/useCase cards
    cards[toolIndex].active = false
    cards.forEach(card => {
      if (linkedPromptIds.has(card.id) || linkedUseCaseIds.has(card.id)) {
        card.active = false
      }
    })

    // Deactivate linked match rules
    linkedRules.forEach(r => { r.active = false })
  } else {
    // Reactivate tool + linked prompt/useCase cards
    cards[toolIndex].active = true
    cards.forEach(card => {
      if (linkedPromptIds.has(card.id) || linkedUseCaseIds.has(card.id)) {
        card.active = true
      }
    })

    // Reactivate linked match rules
    linkedRules.forEach(r => { r.active = true })
  }

  saveAllCards(cards)
  saveAllMatchRules(rules)
  return { cards, blocked: false }
}

// Reset cards to defaults
export const resetCards = (): void => {
  saveAllCards(defaultCards)
}

// === Match Rules Management ===

// Get all match rules (from localStorage or defaults)
export const getAllMatchRules = (): MatchRule[] => {
  const stored = localStorage.getItem(MATCH_RULES_STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (e) {
      console.error('Error parsing stored match rules:', e)
      return defaultMatchRules
    }
  }
  return defaultMatchRules
}

// Save all match rules to localStorage
export const saveAllMatchRules = (rules: MatchRule[]): void => {
  localStorage.setItem(MATCH_RULES_STORAGE_KEY, JSON.stringify(rules))
}

// Validate a match
export const validateMatch = (promptId: string, useCaseId: string, toolId: string): MatchRule | null => {
  const rules = getAllMatchRules()
  return rules.find(
    rule =>
      rule.promptCardId === promptId &&
      rule.useCaseCardId === useCaseId &&
      rule.toolCardId === toolId &&
      rule.active
  ) || null
}

// Add a new match rule
export const addMatchRule = (rule: MatchRule): void => {
  const rules = getAllMatchRules()
  rules.push(rule)
  saveAllMatchRules(rules)
}

// Update an existing match rule
export const updateMatchRule = (ruleId: string, updates: Partial<MatchRule>): void => {
  const rules = getAllMatchRules()
  const index = rules.findIndex(r => r.id === ruleId)
  if (index !== -1) {
    rules[index] = { ...rules[index], ...updates }
    saveAllMatchRules(rules)
  }
}

// Delete a match rule
export const deleteMatchRule = (ruleId: string): void => {
  const rules = getAllMatchRules()
  const filtered = rules.filter(r => r.id !== ruleId)
  saveAllMatchRules(filtered)
}

// Toggle match rule active status
export const toggleMatchRuleActive = (ruleId: string): void => {
  const rules = getAllMatchRules()
  const index = rules.findIndex(r => r.id === ruleId)
  if (index !== -1) {
    rules[index].active = !rules[index].active
    saveAllMatchRules(rules)
  }
}

// Reset match rules to defaults
export const resetMatchRules = (): void => {
  saveAllMatchRules(defaultMatchRules)
}

// Reset both cards and match rules
export const resetAllCardsAndRules = (): void => {
  resetCards()
  resetMatchRules()
}

// Get cards by round and type (alias)
export const getCardsByRoundTypeAndArea = (roundId: string, type: string): Card[] => {
  const allCards = getAllCards()
  return allCards.filter(card => card.roundId === roundId && card.type === type && card.active)
}
