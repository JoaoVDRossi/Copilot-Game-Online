import { useState, useEffect, useRef } from 'react'
import { Gamepad2, Play, Pause, Plus, CheckCircle, Trophy, LogOut, Clock, Square, Check, X, Target, Flag, RotateCcw, Eye, EyeOff, UserPlus } from 'lucide-react'
import RoomManagement from './RoomManagement'
import { rounds } from '../../data/mockData'
import { fetchActiveSession, startRoundSession, stopRoundSession, formatTime, stopAllSessions, getRemainingTime, toggleTimerVisibility, pauseRoundSession, resumeRoundSession } from '../../utils/sessionManager'
import { useNavigate } from 'react-router-dom'
import { getAuthSession, clearAuthSession } from '../../utils/authManager'
// roomManager imports removed (no longer needed at top level)
import { roomsApi } from '../../utils/apiClient'
import { RoundSession, Card, ValidatorEntry } from '../../types'
import {
  getAllCards,
  getAllMatchRules,
  toggleToolAndCascade,
} from '../../utils/cardManager'
import { getPendingValidations, markValidationCompleted, rejectValidation, clearAllTestValidations, TestValidation } from '../../utils/testValidationManager'
import { clearAllTeams } from '../../utils/teamsManager'
import { resetAllRoundsProgress } from '../../utils/roundProgressManager'
import { finishGame, resetGameState } from '../../utils/gameStateManager'
import { clearAllMatchHistory } from '../../utils/matchHistoryManager'

export default function GameMasterDashboard() {
  const navigate = useNavigate()
  const session = getAuthSession()

  if (!session || session.role !== 'gamemaster') {
    navigate('/gamemaster', { replace: true })
    return null
  }

  const gmId = session.id
  const gmName = session.name

  const [selectedRoom, setSelectedRoom] = useState<any | null>(null)
  const [roomDetailTab, setRoomDetailTab] = useState<'session' | 'cards' | 'answers' | 'leaderboard' | 'validation' | 'validators'>('session')
  const [cards, setCards] = useState(getAllCards)
  const matchRules = getAllMatchRules()
  const [pendingValidations, setPendingValidations] = useState<TestValidation[]>([])
  const [imageModalUrl, setImageModalUrl] = useState<string | null>(null)
  const [leaderboardSubTab, setLeaderboardSubTab] = useState<string>('geral')
  const [isGameFinishedState, setIsGameFinishedState] = useState(false)

  // Session control
  const [activeSession, setActiveSession] = useState<RoundSession | null>(null)
  const [sessionTime, setSessionTime] = useState(0)
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Round duration input state (minutes per round, defaults to 15)
  const [roundDurations, setRoundDurations] = useState<Record<string, number>>({
    'round-1': 15, 'round-2': 15, 'round-3': 15, 'round-4': 15,
  })

  // Timer that computes remaining time from the persisted endsAt timestamp
  useEffect(() => {
    if (activeSession) {
      // Immediately compute remaining time
      setSessionTime(getRemainingTime(activeSession))

      // Update every second by recalculating from endsAt (survives F5)
      timerIntervalRef.current = setInterval(() => {
        // When paused, getRemainingTime returns the frozen value — no countdown
        const remaining = getRemainingTime(activeSession)
        setSessionTime(remaining)

        // Only auto-stop when NOT paused and time runs out
        if (remaining <= 0 && !activeSession.paused) {
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current)
            timerIntervalRef.current = null
          }
          stopRoundSession(activeSession.roundId, gmId, (activeSession as any).roomId ?? undefined).then(() => {
            setActiveSession(null)
            alert('Tempo esgotado! Round finalizado automaticamente.')
          })
        }
      }, 1000)
    }
    if (!activeSession && timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
      timerIntervalRef.current = null
      setSessionTime(0)
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
        timerIntervalRef.current = null
      }
    }
  }, [activeSession])

  useEffect(() => {
    if (!selectedRoom) {
      setActiveSession(null)
      setPendingValidations([])
      return
    }
    const roomId = selectedRoom.id
    const updateState = async () => {
      try {
        const allRooms: any[] = await roomsApi.getAll()
        const fresh = allRooms.find((r: any) => r.id === roomId)
        if (fresh) setSelectedRoom((prev: any) => ({
          ...fresh,
          // Preserve validatorToken locally if Azure hasn't persisted it yet (timing window)
          validatorToken: fresh.validatorToken || prev?.validatorToken || '',
          validators: fresh.validators?.length ? fresh.validators : (prev?.validators || []),
        }))
        setIsGameFinishedState(fresh?.status === 'finished')
      } catch (_) {}
      const s = await fetchActiveSession(gmId, roomId)
      setActiveSession(prev => (s?.id !== prev?.id ? s : prev))
      try {
        const validations = await getPendingValidations()
        // Filter by roomId when available (preferred); fall back to team name matching
        const roomTeamNames = new Set(
          (selectedRoom.teams || []).map((t: any) => String(t.name).toLowerCase())
        )
        setPendingValidations(validations.filter((v: any) => {
          if (v.roomId) return v.roomId === roomId
          return roomTeamNames.has(String(v.teamName || '').toLowerCase())
        }))
      } catch (_) {}
    }
    updateState()
    const interval = setInterval(updateState, 5000)
    return () => clearInterval(interval)
  }, [selectedRoom?.id])

  // Close image modal on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && imageModalUrl) {
        setImageModalUrl(null)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [imageModalUrl])

  const handleManageRoom = (room: any) => {
    setSelectedRoom(room)
    setRoomDetailTab('session')
    setActiveSession(null)
  }

  const handleStartRound = async (roundId: string) => {
    if (activeSession) {
      alert('Pare o round atual antes de iniciar outro!')
      return
    }
    if (!selectedRoom) return
    const duration = roundDurations[roundId] ?? 15
    await startRoundSession(roundId, duration, gmId, selectedRoom.id)
    const s = await fetchActiveSession(gmId, selectedRoom.id)
    setActiveSession(s)
  }

  const handlePauseResume = async () => {
    if (!activeSession) return
    if (activeSession.paused) {
      const updated = await resumeRoundSession(gmId, selectedRoom?.id)
      if (updated) setActiveSession(updated)
    } else {
      const updated = await pauseRoundSession(gmId, selectedRoom?.id)
      if (updated) setActiveSession(updated)
    }
  }

  const handleStopRound = async () => {
    if (!activeSession) return
    if (confirm('Tem certeza que deseja parar o round?')) {
      await stopRoundSession(activeSession.roundId, gmId, selectedRoom?.id)
      setActiveSession(null)
    }
  }

  const handleToggleTimerVisibility = async () => {
    const newVisible = await toggleTimerVisibility(gmId, selectedRoom?.id)
    if (activeSession) {
      setActiveSession({ ...activeSession, timerVisible: newVisible })
    }
  }

  const handleLogout = () => {
    if (confirm('Tem certeza que deseja sair?')) {
      clearAuthSession()
      navigate('/')
    }
  }

  const handleFinishGame = async () => {
    if (confirm(
      'ATENÇÃO: Finalizar o jogo?\n\n' +
      'Esta ação irá:\n' +
      '• Parar todos os rounds ativos\n' +
      '• Liberar visualização do gabarito para os participantes\n\n' +
      'Deseja continuar?'
    )) {
      await stopAllSessions(gmId, selectedRoom?.id)
      await finishGame(undefined, gmId)
      setIsGameFinishedState(true)
      setActiveSession(null)
      alert('🏁 Jogo finalizado! Os participantes agora podem visualizar o gabarito completo.')
    }
  }

  const handleResetGame = async () => {
    const confirmation = prompt(
      'ATENÇÃO: Esta ação irá resetar o progresso do jogo!\n\n' +
      '✅ O que será RESETADO:\n' +
      '• Parar todos os rounds ativos\n' +
      '• Limpar todas as sessões\n' +
      '• Resetar progresso de todos os times\n' +
      '• Limpar dados de jogadores\n' +
      '• Desmarcar "Jogo Finalizado"\n' +
      '• Apagar histórico de matches\n' +
      '• Remover validações e imagens de testes\n\n' +
      '🔒 O que será PRESERVADO:\n' +
      '• Cards criados/editados\n' +
      '• Gabaritos criados/editados\n\n' +
      'Digite "RESETAR" para confirmar:'
    )
    if (confirmation === 'RESETAR') {
      await stopAllSessions(gmId, selectedRoom?.id)
      clearAllTeams()
      resetAllRoundsProgress()
      await resetGameState(undefined, gmId)
      clearAllMatchHistory()
      clearAllTestValidations()
      setActiveSession(null)
      setSessionTime(0)
      setIsGameFinishedState(false)
      alert('✅ Jogo resetado com sucesso!')
    } else if (confirmation !== null) {
      alert('Reset cancelado. Digite exatamente "RESETAR" para confirmar.')
    }
  }

  const handleGenerateValidatorToken = async () => {
    if (!selectedRoom) return
    const token = crypto.randomUUID()
    await roomsApi.update({ ...selectedRoom, validatorToken: token })
    setSelectedRoom({ ...selectedRoom, validatorToken: token })
  }

  const handleRemoveValidator = async (sessionId: string) => {
    if (!selectedRoom) return
    const updated = {
      ...selectedRoom,
      validators: (selectedRoom.validators || []).filter((v: ValidatorEntry) => v.sessionId !== sessionId),
    }
    await roomsApi.update(updated)
    setSelectedRoom(updated)
  }

  // Get teams from GM's rooms for leaderboard (legacy - kept for future use)
  // const getMyTeams = () => []

  return (
    <div className="min-h-screen bg-bg-primary p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-10 h-10 text-energy-primary" />
            <div>
              <h1 className="font-display text-3xl font-extrabold text-neutral-50">
                GAME MASTER
              </h1>
              <p className="text-sm text-neutral-400">
                {gmName} — Gerenciar suas salas
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-neutral-300 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-semibold text-sm">Sair</span>
          </button>
        </div>

        {/* Room List or Room Detail */}
        {!selectedRoom ? (
          <RoomManagement creatorFilter={gmId} onManageRoom={handleManageRoom} />
        ) : (
          <>
            {/* Back button + Room Header */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => { setSelectedRoom(null); setActiveSession(null) }}
                className="flex items-center gap-2 bg-bg-secondary hover:bg-bg-tertiary text-neutral-400 hover:text-neutral-200 px-4 py-2 rounded-lg transition-colors font-semibold text-sm border border-neutral-700"
              >
                ← Minhas Salas
              </button>
              <div>
                <h2 className="font-display text-2xl font-bold text-neutral-50">{selectedRoom.name}</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-mono text-energy-primary font-bold">#{selectedRoom.code}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    selectedRoom.status === 'waiting' ? 'bg-yellow-400/20 text-yellow-400' :
                    selectedRoom.status === 'playing' ? 'bg-green-400/20 text-green-400' :
                    'bg-neutral-400/20 text-neutral-400'
                  }`}>
                    {selectedRoom.status === 'waiting' ? 'Aguardando' : selectedRoom.status === 'playing' ? 'Em Jogo' : 'Encerrada'}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {(selectedRoom.teams || []).length} {(selectedRoom.teams || []).length === 1 ? 'time' : 'times'}
                  </span>
                </div>
              </div>
            </div>

            {/* Room Detail Sub-tabs */}
            <div className="flex gap-3 mb-8 overflow-x-auto">
              {[
                { id: 'session', label: 'Sessão', icon: Play },
                { id: 'cards', label: 'Cards', icon: Plus },
                { id: 'answers', label: 'Gabaritos', icon: CheckCircle },
                { id: 'leaderboard', label: 'Classificação', icon: Trophy },
                { id: 'validation', label: 'Validar Testes', icon: Check },
                { id: 'validators', label: 'Validadores', icon: UserPlus },
              ].map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setRoomDetailTab(tab.id as any)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-display font-semibold transition-all whitespace-nowrap text-sm ${
                      roomDetailTab === tab.id
                        ? 'bg-energy-primary text-white shadow-lg'
                        : 'bg-bg-secondary text-neutral-400 hover:text-neutral-200 hover:bg-bg-tertiary'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Session Tab */}
            {roomDetailTab === 'session' && (
              <div>
                {activeSession ? (
                  <div className="bg-bg-secondary rounded-xl p-6 mb-6 border-2 border-battle-green">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-display text-2xl font-bold text-battle-green mb-2">Round Ativo</h3>
                        <p className="text-neutral-400">
                          {rounds.find(r => r.id === activeSession.roundId)?.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-neutral-400 mb-1 flex items-center gap-2 justify-end">
                      <Clock className="w-4 h-4" />
                      Tempo Restante
                      {activeSession.paused && (
                        <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 rounded px-2 py-0.5">⏸ PAUSADO</span>
                      )}
                    </div>
                    <div className={`font-mono text-4xl font-bold ${activeSession.paused ? 'text-yellow-400' : sessionTime <= 60 ? 'text-battle-red animate-pulse' : 'text-battle-green'}`}>
                      {formatTime(sessionTime)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleStopRound}
                    className="flex items-center gap-2 bg-battle-red hover:bg-battle-red/80 text-white px-6 py-3 rounded-lg font-display font-bold transition-all"
                  >
                    <Square className="w-5 h-5" />
                    Parar Round
                  </button>
                  <button
                    onClick={handlePauseResume}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg font-display font-semibold transition-all border ${
                      activeSession.paused
                        ? 'bg-battle-green/20 text-battle-green border-battle-green/50 hover:bg-battle-green/30'
                        : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/30'
                    }`}
                    title={activeSession.paused ? 'Retomar contagem do tempo' : 'Pausar contagem do tempo'}
                  >
                    {activeSession.paused ? (
                      <><Play className="w-5 h-5" />Retomar</>
                    ) : (
                      <><Pause className="w-5 h-5" />Pausar</>
                    )}
                  </button>
                  <button
                    onClick={handleToggleTimerVisibility}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg font-display font-semibold transition-all border ${
                      activeSession.timerVisible !== false
                        ? 'bg-battle-blue/20 text-battle-blue border-battle-blue/50 hover:bg-battle-blue/30'
                        : 'bg-neutral-700/50 text-neutral-400 border-neutral-600 hover:bg-neutral-700'
                    }`}
                    title={activeSession.timerVisible !== false ? 'Timer visível para jogadores' : 'Timer oculto dos jogadores'}
                  >
                    {activeSession.timerVisible !== false ? (
                      <>
                        <Eye className="w-5 h-5" />
                        Timer Público
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-5 h-5" />
                        Timer Oculto
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-bg-secondary rounded-xl p-6 mb-6 border border-neutral-700">
                <h3 className="font-display text-xl font-bold text-neutral-50 mb-2">Nenhum round ativo</h3>
                <p className="text-neutral-400 text-sm">Selecione um round abaixo para iniciar.</p>
              </div>
            )}
            <div className="grid md:grid-cols-2 gap-4">
              {rounds.map(round => (
                <div key={round.id} className="bg-bg-secondary rounded-xl p-4 border border-neutral-700 flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-bold text-neutral-50">{round.name}</h4>
                    <p className="text-xs text-neutral-500">{round.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-bg-tertiary rounded-lg border border-neutral-700 px-2 py-1">
                      <input
                        type="number"
                        min={1}
                        max={120}
                        value={roundDurations[round.id] ?? 15}
                        onChange={e => setRoundDurations(prev => ({ ...prev, [round.id]: Math.max(1, Math.min(120, parseInt(e.target.value) || 1)) }))}
                        disabled={!!activeSession}
                        className="w-12 bg-transparent text-neutral-200 text-center text-sm font-mono focus:outline-none disabled:opacity-50"
                      />
                      <span className="text-xs text-neutral-500">min</span>
                    </div>
                    <button
                      onClick={() => handleStartRound(round.id)}
                      disabled={!!activeSession}
                      className="flex items-center gap-2 bg-battle-green/20 text-battle-green hover:bg-battle-green/30 disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
                    >
                      <Play className="w-4 h-4" />
                      Iniciar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Finish Game Section */}
            <div className={`bg-bg-secondary rounded-xl p-6 border-2 mt-6 ${
              isGameFinishedState ? 'border-battle-green/50' : 'border-battle-blue/50'
            }`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isGameFinishedState ? 'bg-battle-green/20' : 'bg-battle-blue/20'
                }`}>
                  <Flag className={`w-6 h-6 ${
                    isGameFinishedState ? 'text-battle-green' : 'text-battle-blue'
                  }`} />
                </div>
                <div className="flex-1">
                  {isGameFinishedState ? (
                    <>
                      <h3 className="font-display text-xl font-bold text-battle-green mb-2">🏁 Jogo Finalizado</h3>
                      <p className="text-sm text-neutral-400">Os participantes já podem visualizar o gabarito completo.</p>
                    </>
                  ) : (
                    <>
                      <h3 className="font-display text-xl font-bold text-neutral-50 mb-2">Finalizar Jogo</h3>
                      <p className="text-sm text-neutral-400 mb-4">
                        Parar todos os rounds e liberar o gabarito para os participantes.
                      </p>
                      <button
                        onClick={handleFinishGame}
                        className="bg-battle-blue hover:bg-battle-blue/90 text-white px-6 py-3 rounded-lg font-display font-semibold flex items-center gap-2 transition-colors"
                      >
                        <Flag className="w-5 h-5" />
                        Finalizar Jogo e Liberar Gabarito
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Game Reset Section */}
            <div className="bg-bg-secondary rounded-xl p-6 border-2 border-battle-red/50 mt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-battle-red/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="w-6 h-6 text-battle-red" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-neutral-50 mb-2">Resetar Jogo Completo</h3>
                  <p className="text-sm text-neutral-400 mb-4">
                    Parar rounds, limpar sessões e resetar progresso de todos os times. <strong className="text-battle-red">Ação irreversível!</strong>
                  </p>
                  <button
                    onClick={handleResetGame}
                    className="bg-battle-red hover:bg-battle-red/90 text-white px-6 py-3 rounded-lg font-display font-semibold flex items-center gap-2 transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Resetar Todo o Jogo
                  </button>
                </div>
              </div>
            </div>
          </div>
            )}

            {/* Cards Tab */}
            {roomDetailTab === 'cards' && (
              <div className="bg-bg-secondary rounded-xl p-6 border border-neutral-700">
                <h3 className="font-display text-xl font-bold text-neutral-50 mb-2">Ferramentas do Jogo</h3>
                <p className="text-sm text-neutral-400 mb-6">
                  Desmarque uma ferramenta para removê-la do jogo. As cartas de Prompt e Caso de Uso vinculadas a ela serão desmarcadas automaticamente.
                </p>
                <div className="grid gap-4">
              {rounds.map(round => {
                const roundTools = cards.filter(c => c.roundId === round.id && c.type === 'tool')
                const roundPrompts = cards.filter(c => c.roundId === round.id && c.type === 'prompt')
                const roundUseCases = cards.filter(c => c.roundId === round.id && c.type === 'useCase')

                return (
                  <div key={round.id} className="bg-bg-tertiary rounded-lg p-4">
                    <h4 className="font-display font-bold mb-3" style={{ color: round.color }}>
                      {round.name}
                    </h4>

                    {/* Tools with toggles */}
                    <div className="mb-4">
                      <p className="text-neutral-500 text-xs font-semibold uppercase tracking-wider mb-2">Ferramentas</p>
                      <div className="flex flex-wrap gap-2">
                        {roundTools.map(tool => {
                          // Find linked cards for this tool
                          const linkedRules = matchRules.filter(r => r.toolCardId === tool.id)
                          const linkedPromptIds = new Set(linkedRules.map(r => r.promptCardId))
                          const linkedUseCaseIds = new Set(linkedRules.map(r => r.useCaseCardId))
                          const linkedCount = linkedPromptIds.size + linkedUseCaseIds.size

                          return (
                            <button
                              key={tool.id}
                              onClick={() => {
                                const result = toggleToolAndCascade(tool.id, selectedRoom?.id)
                                if (result.blocked) {
                                  alert('Não é possível desmarcar a última ferramenta disponível neste round.')
                                } else {
                                  setCards(result.cards)
                                }
                              }}
                              title={
                                tool.active
                                  ? `Desmarcar "${tool.title}" — ${linkedCount} cartas vinculadas serão desmarcadas`
                                  : `Marcar "${tool.title}"`
                              }
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold border transition-all ${
                                tool.active
                                  ? 'bg-battle-purple/20 text-battle-purple border-battle-purple/50 hover:bg-battle-purple/30'
                                  : 'bg-neutral-800 text-neutral-500 border-neutral-700 hover:border-neutral-500 line-through'
                              }`}
                            >
                              <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                                tool.active ? 'bg-battle-purple border-battle-purple' : 'border-neutral-600'
                              }`}>
                                {tool.active && <Check className="w-3 h-3 text-white" />}
                              </span>
                              {tool.title}
                              {tool.active && linkedCount > 0 && (
                                <span className="text-xs text-neutral-500 font-normal">({linkedCount} cartas)</span>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Prompt and UseCase cards — read-only status view */}
                    <div className="grid grid-cols-2 gap-4 text-xs border-t border-neutral-700/50 pt-3">
                      <div>
                        <p className="text-neutral-500 font-semibold uppercase tracking-wider mb-2">Prompts</p>
                        <div className="space-y-1">
                          {roundPrompts.map(c => (
                            <div key={c.id} className={`flex items-center gap-1.5 ${c.active ? 'text-neutral-300' : 'text-neutral-600 line-through'}`}>
                              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${c.active ? 'bg-energy-primary' : 'bg-neutral-700'}`} />
                              {c.title}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-neutral-500 font-semibold uppercase tracking-wider mb-2">Casos de Uso</p>
                        <div className="space-y-1">
                          {roundUseCases.map(c => (
                            <div key={c.id} className={`flex items-center gap-1.5 ${c.active ? 'text-neutral-300' : 'text-neutral-600 line-through'}`}>
                              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${c.active ? 'bg-battle-green' : 'bg-neutral-700'}`} />
                              {c.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
              </div>
            )}

            {/* Answers Tab */}
            {roomDetailTab === 'answers' && (
          <div className="bg-bg-secondary rounded-xl p-6 border border-neutral-700">
            <h3 className="font-display text-xl font-bold text-neutral-50 mb-4">Gabaritos</h3>
            <p className="text-sm text-neutral-400 mb-4">
              Combinações corretas: Prompt + Caso de Uso + Ferramenta.
            </p>
            <div className="space-y-3">
              {rounds.map(round => {
                const roundRules = matchRules.filter(r => r.roundId === round.id && r.active)
                return (
                  <div key={round.id} className="bg-bg-tertiary rounded-lg p-4">
                    <h4 className="font-display font-bold text-neutral-200 mb-3" style={{ color: round.color }}>
                      {round.name} ({roundRules.length} regras)
                    </h4>
                    {roundRules.map(rule => {
                      const prompt = cards.find(c => c.id === rule.promptCardId)
                      const useCase = cards.find(c => c.id === rule.useCaseCardId)
                      const tool = cards.find(c => c.id === rule.toolCardId)
                      return (
                        <div key={rule.id} className="flex items-center gap-2 text-sm mb-2 bg-bg-primary/50 rounded px-3 py-2">
                          <span className="text-energy-primary font-semibold">{prompt?.title || '?'}</span>
                          <span className="text-neutral-600">+</span>
                          <span className="text-battle-green font-semibold">{useCase?.title || '?'}</span>
                          <span className="text-neutral-600">+</span>
                          <span className="text-battle-purple font-semibold">{tool?.title || '?'}</span>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        )}

            {/* Leaderboard Tab - room specific */}
            {roomDetailTab === 'leaderboard' && (() => {
              const ROUND_IDS = ['round-1', 'round-2', 'round-3', 'round-4']
              const ROUND_LABELS: Record<string, string> = {
                'round-1': 'Round 1', 'round-2': 'Round 2', 'round-3': 'Round 3', 'round-4': 'Round 4',
              }
              const ROUND_COLORS: Record<string, string> = {
                'round-1': '#EF4444', 'round-2': '#F59E0B', 'round-3': '#FCD34D', 'round-4': '#EA580C',
              }
              const allTeams = selectedRoom.teams || []
              const totalTeams = allTeams.length

              // Total de matches possíveis por round (considerando apenas regras com ferramentas ativas)
              const totalPossibleMatches = (roundId: string): number => {
                return matchRules.filter(r => r.roundId === roundId && r.active).length
              }

              // Matches feitos pelo time no round (via matchCountPerRound sincronizado pelo GameBoard)
              const teamMatchCount = (team: any, roundId: string): number => {
                return team.matchCountPerRound?.[roundId] || 0
              }

              // Pontos de validação por time/round
              const roundValidatedPoints = (teamId: string, roundId: string): number => {
                return pendingValidations
                  .filter((v: any) => v.teamId === teamId && v.roundId === roundId && v.validated && !v.rejected)
                  .length * 10
              }

              // Pontos totais do round = matches × 3 + validações × 10
              const roundTotalPoints = (team: any, roundId: string): number => {
                return teamMatchCount(team, roundId) * 3 + roundValidatedPoints(team.id, roundId)
              }

              return (
                <div className="bg-bg-secondary rounded-xl p-6 border border-neutral-700">
                  <h3 className="font-display text-xl font-bold text-neutral-50 mb-5 flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                    Classificação — {selectedRoom.name}
                  </h3>

                  {/* Round completion summary */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {ROUND_IDS.map(rid => {
                      const completed = allTeams.filter((t: any) => (t.completedRounds || []).includes(rid)).length
                      return (
                        <div key={rid} className="bg-bg-tertiary rounded-lg p-3 border border-neutral-700">
                          <p className="text-xs text-neutral-500 font-semibold mb-1">{ROUND_LABELS[rid]}</p>
                          <p className="font-mono font-bold text-lg" style={{ color: ROUND_COLORS[rid] }}>
                            {completed}<span className="text-neutral-600 text-sm">/{totalTeams}</span>
                          </p>
                          <p className="text-xs text-neutral-500">finalizaram</p>
                        </div>
                      )
                    })}
                  </div>

                  {/* Sub-tabs: Geral + por Round */}
                  {(() => {
                    const [lbTab, setLbTab] = [leaderboardSubTab, setLeaderboardSubTab]
                    const tabs = [{ id: 'geral', label: 'Geral' }, ...ROUND_IDS.map(r => ({ id: r, label: ROUND_LABELS[r] }))]

                    return (
                      <>
                        <div className="flex gap-2 mb-4 flex-wrap">
                          {tabs.map(tab => (
                            <button
                              key={tab.id}
                              onClick={() => setLbTab(tab.id)}
                              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                                lbTab === tab.id
                                  ? 'bg-energy-primary text-white'
                                  : 'bg-bg-tertiary text-neutral-400 hover:text-neutral-200'
                              }`}
                            >
                              {tab.label}
                            </button>
                          ))}
                        </div>

                        {totalTeams === 0 ? (
                          <p className="text-neutral-500">Nenhum time nesta sala ainda.</p>
                        ) : lbTab === 'geral' ? (
                          <div className="space-y-2">
                            {[...allTeams].sort((a: any, b: any) => (b.score || 0) - (a.score || 0)).map((team: any, i: number) => (
                              <div key={team.id} className="flex items-center justify-between bg-bg-tertiary rounded-lg p-3">
                                <div className="flex items-center gap-3">
                                  <span className="text-lg font-bold text-neutral-500 w-8 text-center">
                                    {i === 0 ? '🏆' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                                  </span>
                                  <div>
                                    <p className="font-semibold text-neutral-200">{team.name}</p>
                                    <div className="flex gap-1 mt-1">
                                      {ROUND_IDS.map(rid => (
                                        <span key={rid} className={`w-2 h-2 rounded-full ${(team.completedRounds || []).includes(rid) ? 'bg-battle-green' : 'bg-neutral-700'}`} title={ROUND_LABELS[rid]} />
                                      ))}
                                      <span className="text-xs text-neutral-500 ml-1">{(team.completedRounds || []).length}/4 rounds</span>
                                    </div>
                                  </div>
                                </div>
                                <span className="font-mono font-bold text-energy-primary text-lg">{team.score || 0} pts</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          // Per-round view
                          <div className="space-y-2">
                            <p className="text-xs text-neutral-500 mb-3">
                              Times no {ROUND_LABELS[lbTab]} — matches feitos / possíveis e pontos totais do round
                            </p>
                            {[...allTeams]
                              .map((t: any) => ({
                                ...t,
                                roundCompleted: (t.completedRounds || []).includes(lbTab),
                                matchesDone: teamMatchCount(t, lbTab),
                                totalPts: roundTotalPoints(t, lbTab),
                              }))
                              .sort((a, b) => {
                                if (b.roundCompleted !== a.roundCompleted) return b.roundCompleted ? 1 : -1
                                return b.totalPts - a.totalPts
                              })
                              .map((team: any, i: number) => (
                                <div key={team.id} className={`flex items-center justify-between rounded-lg p-3 border ${team.roundCompleted ? 'bg-battle-green/10 border-battle-green/30' : 'bg-bg-tertiary border-neutral-700 opacity-60'}`}>
                                  <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-neutral-500 w-6 text-center">#{i + 1}</span>
                                    <div>
                                      <p className="font-semibold text-neutral-200">{team.name}</p>
                                      <p className="text-xs text-neutral-500">
                                        {team.roundCompleted ? '✅ Completou o round' : (
                                          <>⏳ Em andamento — <span className="text-neutral-300 font-semibold">{team.matchesDone}/{totalPossibleMatches(lbTab)}</span> matches</>
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-mono font-bold text-energy-primary text-sm">{team.totalPts} pts totais</p>
                                    <p className="text-xs text-neutral-500">
                                      {team.matchesDone * 3} match + {roundValidatedPoints(team.id, lbTab)} validação
                                    </p>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </>
                    )
                  })()}
                </div>
              )
            })()}

            {/* Validation Tab - room-specific (pendingValidations filtered by updateState) */}
            {roomDetailTab === 'validation' && (() => {
              const allCards = getAllCards()

              const getCardById = (cardId: string): Card | undefined => {
                return allCards.find(card => card.id === cardId)
              }

              const handleValidate = async (validationId: string) => {
                const validation = pendingValidations.find(v => v.id === validationId)
                if (!validation) return
                if (confirm(`Validar teste do time "${validation.teamName}"?\n\nO time receberá +10 pontos.`)) {
                  await markValidationCompleted(validationId, gmName)
                  alert(`✅ Teste validado!\n\n+10 pontos adicionados ao time "${validation.teamName}".`)
                  const updated = await getPendingValidations()
                  const roomTeamNames = new Set((selectedRoom.teams || []).map((t: any) => String(t.name).toLowerCase()))
                  const roomId2 = selectedRoom?.id
                  setPendingValidations(updated.filter((v: any) => {
                    if (v.roomId) return v.roomId === roomId2
                    return roomTeamNames.has(String(v.teamName || '').toLowerCase())
                  }))
                }
              }

              const handleReject = async (validationId: string) => {
                const validation = pendingValidations.find(v => v.id === validationId)
                if (!validation) return
                const reason = prompt(
                  `❌ Rejeitar teste do time "${validation.teamName}"\n\n` +
                  'Por favor, explique o motivo da rejeição.\n' +
                  'Esta mensagem será enviada ao participante:\n'
                )
                if (reason) {
                  await rejectValidation(validationId, reason)
                  alert(`❌ Teste rejeitado.\n\nFeedback enviado ao time "${validation.teamName}".`)
                  const updated = await getPendingValidations()
                  const roomTeamNames = new Set((selectedRoom.teams || []).map((t: any) => String(t.name).toLowerCase()))
                  const roomId2 = selectedRoom?.id
                  setPendingValidations(updated.filter((v: any) => {
                    if (v.roomId) return v.roomId === roomId2
                    return roomTeamNames.has(String(v.teamName || '').toLowerCase())
                  }))
                }
              }

              const roundNames: Record<string, string> = {
                'round-1': 'Round 1 - Mestre das Notificações',
                'round-2': 'Round 2 - Capitã Pesquisa Infinita',
                'round-3': 'Round 3 - Senhora Perfeccionista',
                'round-4': 'Round 4 - ControlC+V'
              }

              return (
                <div className="bg-bg-secondary rounded-xl p-6 border border-neutral-700">
                  {imageModalUrl && (
                    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setImageModalUrl(null)}>
                      <div className="relative max-w-7xl max-h-screen">
                        <button onClick={() => setImageModalUrl(null)} className="absolute -top-12 right-0 text-white hover:text-neutral-300 text-sm font-semibold flex items-center gap-2">
                          <X className="w-5 h-5" />
                          Fechar (ESC)
                        </button>
                        <img src={imageModalUrl} alt="Imagem ampliada" className="max-w-full max-h-[90vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-6">
                    <Check className="w-8 h-8 text-battle-blue" />
                    <div>
                      <h3 className="font-display text-2xl font-bold text-neutral-50">Fila de Validação de Testes</h3>
                      <p className="text-sm text-neutral-400 mt-1">Testes enviados pelos participantes desta sala</p>
                    </div>
                  </div>
                  {pendingValidations.length === 0 ? (
                    <div className="text-center py-12 text-neutral-400">
                      <Check className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="mb-2">Nenhum teste pendente de validação</p>
                      <p className="text-sm">Quando jogadores submeterem testes, eles aparecerão aqui</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingValidations.map((validation) => {
                        const useCaseCard = getCardById(validation.useCaseCardId)
                        const submittedDate = new Date(validation.submittedAt)
                        const diffMinutes = Math.floor((new Date().getTime() - submittedDate.getTime()) / 60000)
                        const timeAgo = diffMinutes < 1 ? 'Agora' : diffMinutes < 60 ? `${diffMinutes}m atrás` : diffMinutes < 1440 ? `${Math.floor(diffMinutes / 60)}h atrás` : `${Math.floor(diffMinutes / 1440)}d atrás`
                        return (
                          <div key={validation.id} className="bg-bg-tertiary/50 rounded-xl p-6 border border-neutral-700 hover:border-battle-blue/50 transition-colors">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-battle-purple/20 flex items-center justify-center">
                                  <Trophy className="w-5 h-5 text-battle-purple" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-neutral-200">{validation.teamName}</h4>
                                  <p className="text-xs text-neutral-500">{roundNames[validation.roundId]} • {timeAgo}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button onClick={() => handleValidate(validation.id)} className="px-4 py-2 bg-battle-green/20 hover:bg-battle-green/30 text-battle-green rounded-lg text-sm font-semibold border border-battle-green/50 transition-colors flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4" />Validar
                                </button>
                                <button onClick={() => handleReject(validation.id)} className="px-4 py-2 bg-battle-red/20 hover:bg-battle-red/30 text-battle-red rounded-lg text-sm font-semibold border border-battle-red/50 transition-colors flex items-center gap-2">
                                  <X className="w-4 h-4" />Teste não válido
                                </button>
                              </div>
                            </div>
                            <div className="bg-bg-primary rounded-lg p-4 border-l-4 border-battle-purple">
                              <div className="flex items-center gap-2 mb-2">
                                <Target className="w-4 h-4 text-battle-purple" />
                                <span className="text-xs font-bold text-battle-purple uppercase">Caso de Uso Testado</span>
                              </div>
                              <p className="text-sm text-neutral-200 font-medium">{useCaseCard?.title || validation.useCaseTitle}</p>
                              {useCaseCard?.description && <p className="text-xs text-neutral-500 mt-2">{useCaseCard.description}</p>}
                            </div>
                            {validation.imageUrl && (
                              <div className="bg-bg-primary rounded-lg p-4 border-l-4 border-battle-blue mt-3">
                                <div className="flex items-center gap-2 mb-3">
                                  <Target className="w-4 h-4 text-battle-blue" />
                                  <span className="text-xs font-bold text-battle-blue uppercase">Imagem do Teste</span>
                                </div>
                                <img src={validation.imageUrl} alt="Evidência do teste" className="w-full max-h-96 object-contain rounded-lg border border-neutral-700 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setImageModalUrl(validation.imageUrl!)} title="Clique para ampliar" />
                                <p className="text-xs text-neutral-400 mt-2 text-center">🔍 Clique na imagem para ampliar</p>
                              </div>
                            )}
                            <div className="mt-4 text-xs text-neutral-500 bg-bg-primary/50 rounded-lg p-3">
                              <p><strong className="text-neutral-400">📝 Instruções:</strong> Verifique se o participante implementou corretamente o caso de uso usando o Copilot. Valide para aprovar (+10 pontos) ou marque como não válido com feedback.</p>
                            </div>
                          </div>
                        )
                      })}
                      <div className="mt-6 p-4 bg-bg-tertiary/30 rounded-lg border border-neutral-700/50 text-center">
                        <div className="text-2xl font-bold text-battle-blue">{pendingValidations.length}</div>
                        <div className="text-xs text-neutral-400 mt-1">{pendingValidations.length === 1 ? 'Teste Pendente' : 'Testes Pendentes'}</div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })()}

            {/* Validators Tab */}
            {roomDetailTab === 'validators' && (
              <div className="bg-bg-secondary rounded-xl p-6 border border-neutral-700">
                <h3 className="font-display text-xl font-bold text-neutral-50 mb-2 flex items-center gap-2">
                  <UserPlus className="w-6 h-6 text-energy-primary" />
                  Validadores da Sala
                </h3>
                <p className="text-sm text-neutral-400 mb-6">
                  Compartilhe o link abaixo para que outros usuários possam se tornar validadores nesta sala. Validadores podem iniciar rounds e validar testes dos participantes.
                </p>
                {selectedRoom.validatorToken ? (
                  <div className="space-y-6">
                    <div className="bg-bg-tertiary rounded-xl p-4 border border-neutral-700">
                      <p className="text-xs text-neutral-500 mb-2 font-semibold uppercase tracking-wider">Link de Validador</p>
                      <div className="flex items-center gap-3">
                        <code className="flex-1 bg-bg-primary rounded-lg px-4 py-3 text-energy-primary font-mono text-sm break-all border border-neutral-800">
                          {window.location.origin}/validador/{selectedRoom.validatorToken}
                        </code>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/validador/${selectedRoom.validatorToken}`)
                            alert('Link copiado! Compartilhe com os validadores desta sala.')
                          }}
                          className="flex items-center gap-2 px-4 py-3 rounded-lg bg-energy-primary/20 hover:bg-energy-primary/30 text-energy-primary font-semibold transition-colors whitespace-nowrap border border-energy-primary/30"
                        >
                          Copiar Link
                        </button>
                      </div>
                      <p className="text-xs text-neutral-500 mt-3">
                        Ao abrir o link, o usuário poderá se cadastrar como validador desta sala e terá acesso ao painel de validação.
                      </p>
                    </div>

                    {/* Active validators list */}
                    <div>
                      <h4 className="font-semibold text-neutral-200 mb-3 flex items-center gap-2">
                        <UserPlus className="w-4 h-4 text-energy-primary" />
                        Validadores Ativos ({(selectedRoom.validators || []).length})
                      </h4>
                      {(selectedRoom.validators || []).length === 0 ? (
                        <p className="text-neutral-500 text-sm italic">Nenhum validador entrou ainda.</p>
                      ) : (
                        <div className="space-y-2">
                          {(selectedRoom.validators as ValidatorEntry[]).map((v, i) => (
                            <div key={v.sessionId} className="flex items-center justify-between bg-bg-tertiary rounded-lg px-4 py-3 border border-neutral-700">
                              <div className="flex items-center gap-3">
                                <span className="text-base font-bold text-neutral-500 w-6 text-center">
                                  #{i + 1}
                                </span>
                                <div>
                                  <p className="text-neutral-100 font-semibold">{v.name}</p>
                                  <p className="text-neutral-500 text-xs">
                                    Senha: <span className="font-mono text-neutral-400">{(v as any).password || '—'}</span>
                                    {' · '}Entrou em {new Date(v.joinedAt).toLocaleString('pt-BR')}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => handleRemoveValidator(v.sessionId)}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-battle-red/20 hover:bg-battle-red/30 text-battle-red font-semibold text-sm transition-colors border border-battle-red/30"
                              >
                                <X className="w-4 h-4" />
                                Remover
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleGenerateValidatorToken}
                    className="flex items-center gap-2 bg-energy-primary hover:bg-energy-primary/80 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <UserPlus className="w-5 h-5" />
                    Gerar Link de Validador
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
