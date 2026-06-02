import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Zap, Trophy, AlertCircle, Clock } from 'lucide-react'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { rounds, villains } from '../../data/mockData'
import { getCardsByRoundTypeAndArea, validateMatch, getAllMatchRules } from '../../utils/cardManager'
import PlayingCard from './PlayingCard'
import MatchResult from './MatchResult'
import { fetchActiveSession, getRemainingTime, formatTime } from '../../utils/sessionManager'
import { DifficultyLevel, Card } from '../../types'
import { addPointsToCurrentTeam, markRoundCompleted, getCurrentTeam } from '../../utils/teamsManager'
import { addPointsToRound, startRound, completeRound } from '../../utils/roundProgressManager'
import { addMatchToHistory, getTeamRoundMatches } from '../../utils/matchHistoryManager'
import { getCurrentPlayer, updateTeamScore, markTeamRoundCompleted, updateTeamCurrentRound, getCurrentRoom, getRoomById } from '../../utils/roomManager'

// Fisher-Yates shuffle (returns a new shuffled array)
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function GameBoard() {
  const { roundId } = useParams()
  const navigate = useNavigate()
  
  // Get current team
  const currentTeam = getCurrentTeam()

  const round = rounds.find(r => r.id === roundId)
  const villain = villains.find(v => v.id === round?.villain)

  const [selectedCards, setSelectedCards] = useState<{
    prompt: string | null
    useCase: string | null
    tool: string | null
  }>({
    prompt: null,
    useCase: null,
    tool: null,
  })

  const [matchResult, setMatchResult] = useState<{
    show: boolean
    correct: boolean
    explanation: string
    villainMessage: string
    roundCompleted?: boolean
  } | null>(null)

  const [score, setScore] = useState(0)
  const [matches, setMatches] = useState(0)
  const [shuffleSeed, setShuffleSeed] = useState(0) // increments after each match to trigger card re-shuffle
  const [completedMatchKeys, setCompletedMatchKeys] = useState<Set<string>>(() => {
    // Track which exact combos were already scored
    if (!currentTeam || !roundId) return new Set()
    const previousMatches = getTeamRoundMatches(currentTeam.id, roundId)
    return new Set(previousMatches.map(m => `${m.promptCardId}|${m.useCaseCardId}|${m.toolCardId}`))
  })
  const [visibleDifficulties] = useState<DifficultyLevel[]>(['easy', 'medium', 'hard'])
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null)
  const [timerVisible, setTimerVisible] = useState(false)

  // Session check + live timer for player
  useEffect(() => {
    console.log('🔵 [SESSION CHECK] Verifying round is active...')
    const room = getCurrentRoom()
    const roomGmId = room?.createdBy
    
    const checkSession = async () => {
      const session = await fetchActiveSession(roomGmId)
      
      if (!session || session.roundId !== roundId) {
        console.log('❌ [SESSION CHECK] Round not active')
        alert('Round não está ativo! Aguarde o Game Master iniciar.')
        navigate('/rounds')
        return
      }
      
      console.log('✅ [SESSION CHECK] Round is active, player can play')
      setTimerVisible(session.timerVisible !== false)
      setTimerSeconds(getRemainingTime(session))
      startRound(roundId!)
      
      // Track current round in room for GM dashboard
      const player = getCurrentPlayer()
      if (player) {
        updateTeamCurrentRound(player.roomId, player.teamId, roundId!)
      }
    }
    
    checkSession()
    
    // Update timer every second + check session every 10s
    let tick = 0
    const interval = setInterval(async () => {
      tick++
      // Full session check every 10 seconds
      if (tick % 10 === 0) {
        const session = await fetchActiveSession(roomGmId)
        if (!session || session.roundId !== roundId || !session.active) {
          console.log('🛑 [SESSION CHECK] Round stopped by admin')
          alert('Round finalizado pelo Admin!')
          navigate('/rounds')
          return
        }
        setTimerVisible(session.timerVisible !== false)
        setTimerSeconds(getRemainingTime(session))
      } else {
        // Simple decrement between full checks
        setTimerSeconds(prev => prev !== null && prev > 0 ? prev - 1 : prev)
      }
    }, 1000)
    
    return () => clearInterval(interval)
  }, [roundId, navigate])

  if (!round || !villain) {
    navigate('/rounds')
    return null
  }

  // Helper function to select cards ensuring at least one valid match is always available
  const selectCardsWithGuaranteedMatch = (
    availablePrompts: Card[],
    availableUseCases: Card[],
    availableTools: Card[]
  ): { prompts: Card[], useCases: Card[], tools: Card[] } => {
    // Get all active match rules for this round
    const allRules = getAllMatchRules()
    const roundRules = allRules.filter(rule => rule.roundId === roundId && rule.active)

    // Shuffle rules so we don't always pick the first one
    const shuffledRules = shuffle(roundRules)

    // Find a valid match rule that hasn't been completed yet
    let validRule = null
    for (const rule of shuffledRules) {
      const ruleKey = `${rule.promptCardId}|${rule.useCaseCardId}|${rule.toolCardId}`
      if (completedMatchKeys.has(ruleKey)) continue // Skip already-completed matches

      const promptAvailable = availablePrompts.find(c => c.id === rule.promptCardId)
      const useCaseAvailable = availableUseCases.find(c => c.id === rule.useCaseCardId)
      const toolAvailable = availableTools.find(c => c.id === rule.toolCardId)

      if (promptAvailable && useCaseAvailable && toolAvailable) {
        validRule = rule
        break
      }
    }

    // If we found a valid match, ensure those cards are included
    if (validRule) {
      const guaranteedPrompt = availablePrompts.find(c => c.id === validRule.promptCardId)!
      const guaranteedUseCase = availableUseCases.find(c => c.id === validRule.useCaseCardId)!
      const guaranteedTool = availableTools.find(c => c.id === validRule.toolCardId)!

      // Get other available cards (excluding the guaranteed ones) and shuffle them
      const otherPrompts = shuffle(availablePrompts.filter(c => c.id !== validRule.promptCardId))
      const otherUseCases = shuffle(availableUseCases.filter(c => c.id !== validRule.useCaseCardId))

      // Build final card lists: guaranteed card + ALL others, shuffled positions
      const finalPrompts = shuffle([guaranteedPrompt, ...otherPrompts])
      const finalUseCases = shuffle([guaranteedUseCase, ...otherUseCases])
      // Tools stay in their original order (not shuffled)
      const finalTools = [guaranteedTool, ...availableTools.filter(c => c.id !== validRule.toolCardId)]

      return {
        prompts: finalPrompts,
        useCases: finalUseCases,
        tools: finalTools,
      }
    }

    // If no valid match found (all matches completed), return shuffled cards
    return {
      prompts: shuffle(availablePrompts),
      useCases: shuffle(availableUseCases),
      tools: availableTools,
    }
  }

  // Build sets of card IDs that were already used in correct matches
  const completedCardIds = useMemo(() => {
    const prompts = new Set<string>()
    const useCases = new Set<string>()
    const tools = new Set<string>()
    for (const key of completedMatchKeys) {
      const [p, u, t] = key.split('|')
      prompts.add(p)
      useCases.add(u)
      tools.add(t)
    }
    return { prompts, useCases, tools }
  }, [completedMatchKeys])

  // Filter cards: show ALL cards minus the ones already matched correctly
  const allPromptCards = getCardsByRoundTypeAndArea(roundId!, 'prompt')
  const allUseCaseCards = getCardsByRoundTypeAndArea(roundId!, 'useCase')
  const allToolCards = getCardsByRoundTypeAndArea(roundId!, 'tool')

  const availablePromptCards = allPromptCards.filter(
    card => visibleDifficulties.includes(card.difficulty) && !completedCardIds.prompts.has(card.id)
  )
  const availableUseCaseCards = allUseCaseCards.filter(
    card => visibleDifficulties.includes(card.difficulty) && !completedCardIds.useCases.has(card.id)
  )
  const availableToolCards = allToolCards.filter(
    card => visibleDifficulties.includes(card.difficulty) && !completedCardIds.tools.has(card.id)
  )

  // Memoize displayed cards — only re-shuffle after a match (shuffleSeed changes)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selectCards = useCallback(() => selectCardsWithGuaranteedMatch(
    availablePromptCards,
    availableUseCaseCards,
    availableToolCards
  ), [shuffleSeed, roundId, completedMatchKeys])
  
  const [displayedCards, setDisplayedCards] = useState(() => selectCards())
  
  useEffect(() => {
    setDisplayedCards(selectCards())
  }, [selectCards])

  const promptCards = displayedCards.prompts
  const useCaseCards = displayedCards.useCases
  const toolCards = displayedCards.tools

  const handleSelectCard = (cardId: string, type: 'prompt' | 'useCase' | 'tool') => {
    setSelectedCards(prev => ({
      ...prev,
      [type]: prev[type] === cardId ? null : cardId,
    }))
  }

  const handleValidateMatch = () => {
    const { prompt, useCase, tool } = selectedCards

    if (!prompt || !useCase || !tool) {
      alert('Selecione as 3 cartas para validar!')
      return
    }

    // Check if this exact match was already completed (prevents duplicate scoring on re-entry)
    const matchKey = `${prompt}|${useCase}|${tool}`
    if (completedMatchKeys.has(matchKey)) {
      setMatchResult({
        show: true,
        correct: false,
        explanation: 'Você já completou este match! Tente uma combinação diferente.',
        villainMessage: `${villain!.name} diz: "Essa jogada já foi feita!" 😏`,
      })
      setSelectedCards({ prompt: null, useCase: null, tool: null })
      return
    }

    const rule = validateMatch(prompt, useCase, tool)

    if (rule) {
      // Correct match!
      const pointsEarned = 3
      setScore(prev => prev + pointsEarned)
      setMatches(prev => prev + 1)
      
      // Track this match as completed
      const newCompletedKeys = new Set(completedMatchKeys)
      newCompletedKeys.add(matchKey)
      setCompletedMatchKeys(newCompletedKeys)
      
      // Add points to team in global leaderboard
      addPointsToCurrentTeam(pointsEarned)
      
      // Sync score to room for GM dashboard
      const player = getCurrentPlayer()
      if (player) {
        updateTeamScore(player.roomId, player.teamId, pointsEarned)
      }
      
      // Add points to round progress
      addPointsToRound(roundId!, pointsEarned)
      
      // Save match to history
      if (currentTeam) {
        addMatchToHistory(
          currentTeam.id,
          currentTeam.name,
          roundId!,
          prompt,
          useCase,
          tool
        )
      }
      
      // Check round completion: use room's match limit if set, else require all rules
      const allRules = getAllMatchRules()
      const roundRules = allRules.filter(r => r.roundId === roundId && r.active)
      
      const room = getCurrentRoom()
      const freshRoom = room ? getRoomById(room.id) : null
      const roomMatchLimit = freshRoom?.matchesPerRound?.[roundId!]
      const targetMatches = (roomMatchLimit && roomMatchLimit > 0) ? roomMatchLimit : roundRules.length
      
      const isRoundCompleted = newCompletedKeys.size >= targetMatches
      
      console.log('Round completion check:', {
        totalRules: roundRules.length,
        roomMatchLimit,
        targetMatches,
        completedMatches: newCompletedKeys.size,
        isCompleted: isRoundCompleted
      })
      
      if (isRoundCompleted) {
        // Mark round as completed
        console.log('🎉 Round completed!')
        markRoundCompleted(roundId!)
        completeRound(roundId!)
        
        // Sync round completion to room for GM dashboard
        const player = getCurrentPlayer()
        if (player) {
          markTeamRoundCompleted(player.roomId, player.teamId, roundId!)
        }
      }
      
      setMatchResult({
        show: true,
        correct: true,
        explanation: rule.explanation,
        villainMessage: rule.villainMessage,
        roundCompleted: isRoundCompleted,
      })
    } else {
      // Incorrect match
      setMatchResult({
        show: true,
        correct: false,
        explanation:
          'Esta combinação não forma um match válido. Analise melhor as cartas e tente novamente!',
        villainMessage: `${villain.name} ri da sua tentativa! 😈`,
      })
    }

    // Reset selection
    setSelectedCards({ prompt: null, useCase: null, tool: null })
  }

  const canValidate = selectedCards.prompt && selectedCards.useCase && selectedCards.tool

  return (
    <div className="relative min-h-screen lightning-border">
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-energy-primary/20 via-transparent to-battle-purple/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/rounds')}
            className="flex items-center gap-2 text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>

          <div className="flex items-center gap-4">
            <img
              src={villain.avatar}
              alt={villain.name}
              className="w-16 h-16 rounded-full object-cover"
              style={{
                boxShadow: `0 0 30px ${villain.color}`,
              }}
            />
            <div className="text-right">
              <h2 className="font-display text-xl font-bold text-neutral-50">
                Round {round.number}
              </h2>
              <p className="text-xs text-neutral-400">{villain.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {timerVisible && timerSeconds !== null && (
              <div className="text-right">
                <div className="text-sm text-neutral-400 flex items-center gap-1 justify-end">
                  <Clock className="w-3.5 h-3.5" />
                  Tempo
                </div>
                <div className={`font-mono font-bold text-2xl ${timerSeconds <= 60 ? 'text-battle-red animate-pulse' : 'text-battle-green'}`}>
                  {formatTime(timerSeconds)}
                </div>
              </div>
            )}
            <div className="text-right">
              <div className="text-sm text-neutral-400">Matches</div>
              <div className="font-mono font-bold text-xl text-neutral-200">{matches}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-neutral-400">Pontos</div>
              <div className="font-mono font-bold text-2xl text-energy-primary">{score}</div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-bg-secondary/80 backdrop-blur-sm rounded-xl p-4 mb-6 border border-neutral-700">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-battle-blue flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-neutral-300">
                Selecione <strong>1 Prompt</strong>, <strong>1 Caso de Uso</strong> e <strong>1 Ferramenta</strong> para criar uma combinação que derrote o vilão!
              </p>
            </div>
          </div>
        </div>

        {/* Cards Board */}
        <div className="grid md:grid-cols-3 gap-4 mb-8 mx-auto">
          {/* Prompts Column */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-sm font-bold text-energy-primary flex items-center gap-1">
                <Zap className="w-4 h-4" />
                Prompts
              </h3>
              <span className="text-xs text-neutral-400 bg-bg-secondary px-2 py-1 rounded">
                {promptCards.length}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">{promptCards.map(card => (
                <PlayingCard
                  key={card.id}
                  card={card}
                  selected={selectedCards.prompt === card.id}
                  onSelect={() => handleSelectCard(card.id, 'prompt')}
                  villainColor={villain.color}
                />
              ))}
              {promptCards.length === 0 && (
                <div className="bg-bg-secondary/50 rounded-xl p-6 text-center text-neutral-500 border border-neutral-700">
                  Todas as cartas foram usadas!
                </div>
              )}
            </div>
          </div>

          {/* Use Cases Column */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm font-bold text-battle-green flex items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  Casos de Uso
                </h3>
              </div>
              <span className="text-xs text-neutral-400 bg-bg-secondary px-2 py-1 rounded">
                {useCaseCards.length}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {useCaseCards.map(card => (
                <PlayingCard
                  key={card.id}
                  card={card}
                  selected={selectedCards.useCase === card.id}
                  onSelect={() => handleSelectCard(card.id, 'useCase')}
                  villainColor={villain.color}
                />
              ))}
              {useCaseCards.length === 0 && (
                <div className="bg-bg-secondary/50 rounded-xl p-6 text-center text-neutral-500 border border-neutral-700">
                  Todas as cartas foram usadas!
                </div>
              )}
            </div>
          </div>

          {/* Tools Column */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-sm font-bold text-battle-purple flex items-center gap-1">
                <Zap className="w-4 h-4" />
                Ferramentas
              </h3>
              <span className="text-xs text-neutral-400 bg-bg-secondary px-2 py-1 rounded">
                {toolCards.length}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {toolCards.map(card => (
                <PlayingCard
                  key={card.id}
                  card={card}
                  selected={selectedCards.tool === card.id}
                  onSelect={() => handleSelectCard(card.id, 'tool')}
                  villainColor={villain.color}
                />
              ))}
              {toolCards.length === 0 && (
                <div className="bg-bg-secondary/50 rounded-xl p-6 text-center text-neutral-500 border border-neutral-700">
                  Todas as cartas foram usadas!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Validate Button */}
        <div className="flex justify-center">
          <button
            onClick={handleValidateMatch}
            disabled={!canValidate}
            className={`px-12 py-4 rounded-xl font-display text-xl font-bold uppercase transition-all ${
              canValidate
                ? 'bg-gradient-to-r from-energy-primary to-energy-secondary text-white shadow-lg hover:scale-105 hover:shadow-2xl'
                : 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
            }`}
            style={
              canValidate
                ? {
                    boxShadow: `0 0 40px ${villain.color}`,
                  }
                : {}
            }
          >
            {canValidate ? 'Validar Match ⚡' : 'Selecione 3 Cartas'}
          </button>
        </div>
      </div>

      {/* Match Result Modal */}
      {matchResult?.show && (
        <MatchResult
          correct={matchResult.correct}
          explanation={matchResult.explanation}
          villainMessage={matchResult.villainMessage}
          villainColor={villain.color}
          villainAvatar={villain.avatar}
          roundCompleted={matchResult.roundCompleted}
          onClose={() => {
            if (matchResult.roundCompleted) {
              // Small delay to ensure state is saved before navigation
              setTimeout(() => {
                navigate('/rounds')
              }, 100)
            } else {
              setMatchResult(null)
              setSelectedCards({ prompt: null, useCase: null, tool: null })
              // Trigger card re-shuffle for the next match
              setShuffleSeed(s => s + 1)
            }
          }}
        />
      )}
    </div>
  )
}
