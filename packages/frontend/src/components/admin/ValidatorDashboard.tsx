import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, X, Target, Trophy, LogOut, Clock, Shield } from 'lucide-react'
import { getValidatorSession, clearValidatorSession } from '../../utils/authManager'
import {
  fetchActiveSession,
  getRemainingTime,
  formatTime,
} from '../../utils/sessionManager'
import {
  getPendingValidations,
  markValidationCompleted,
  rejectValidation,
  type TestValidation,
} from '../../utils/testValidationManager'
import { roomsApi } from '../../utils/apiClient'
import { RoundSession } from '../../types'

const ROUNDS = [
  { id: 'round-1', name: 'Round 1 - Mestre das Notificações', durationMinutes: 15 },
  { id: 'round-2', name: 'Round 2 - Capitã Pesquisa Infinita', durationMinutes: 15 },
  { id: 'round-3', name: 'Round 3 - Senhora Perfeccionista', durationMinutes: 15 },
  { id: 'round-4', name: 'Round 4 - ControlC+V', durationMinutes: 15 },
]

type Tab = 'session' | 'validation'

export default function ValidatorDashboard() {
  const navigate = useNavigate()
  const validatorSession = getValidatorSession()

  const [activeTab, setActiveTab] = useState<Tab>('session')
  const [activeSession, setActiveSession] = useState<RoundSession | null>(null)
  const [timerSeconds, setTimerSeconds] = useState<number>(0)
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [pendingValidations, setPendingValidations] = useState<TestValidation[]>([])
  const [room, setRoom] = useState<any | null>(null)
  const [imageModalUrl, setImageModalUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!validatorSession) {
      navigate('/')
      return
    }
    loadData()
    const interval = setInterval(loadData, 5000)
    return () => clearInterval(interval)
  }, [])

  const loadData = async () => {
    if (!validatorSession) return
    try {
      const [session, validations, rooms] = await Promise.all([
        fetchActiveSession(validatorSession.gmId, validatorSession.roomId),
        getPendingValidations(),
        roomsApi.getAll(),
      ])
      setActiveSession(session)
      // Update timer from session
      if (session) {
        setTimerSeconds(getRemainingTime(session))
      } else {
        setTimerSeconds(0)
      }
      const currentRoom = rooms.find((r: any) => r.id === validatorSession.roomId)
      setRoom(currentRoom || null)

      // Check if this validator was removed by the GM
      if (currentRoom) {
        const stillActive = (currentRoom.validators || []).some(
          (v: any) => v.sessionId === validatorSession.sessionId
        )
        if (!stillActive) {
          clearValidatorSession()
          navigate('/')
          return
        }
      }

      const roomTeamNames = new Set(
        ((currentRoom?.teams) || []).map((t: any) => String(t.name).toLowerCase())
      )
      const roomId = validatorSession.roomId
      setPendingValidations(
        validations.filter((v) => {
          if (v.roomId) return v.roomId === roomId
          return roomTeamNames.has(String(v.teamName || '').toLowerCase())
        })
      )
    } catch (err) {
      console.error('ValidatorDashboard loadData error:', err)
    }
  }

  // Local timer countdown (purely visual, syncs from Azure every 5s)
  useEffect(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
    if (activeSession && !activeSession.paused) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds(prev => (prev > 0 ? prev - 1 : 0))
      }, 1000)
    }
    return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current) }
  }, [activeSession?.id, activeSession?.paused])

  const handleValidate = async (validationId: string) => {
    const validation = pendingValidations.find((v) => v.id === validationId)
    if (!validation) return
    if (confirm(`Validar teste do time "${validation.teamName}"?\n\nO time receberá +10 pontos.`)) {
      await markValidationCompleted(validationId, validatorSession?.validatorName || 'Validador')
      alert(`✅ Teste validado!\n\n+10 pontos adicionados ao time "${validation.teamName}".`)
      await loadData()
    }
  }

  const handleReject = async (validationId: string) => {
    const validation = pendingValidations.find((v) => v.id === validationId)
    if (!validation) return
    const reason = prompt(
      `❌ Rejeitar teste do time "${validation.teamName}"\n\nPor favor, explique o motivo da rejeição:`
    )
    if (reason) {
      await rejectValidation(validationId, reason)
      alert(`❌ Teste rejeitado.\n\nFeedback enviado ao time "${validation.teamName}".`)
      await loadData()
    }
  }

  const handleLogout = () => {
    clearValidatorSession()
    navigate('/')
  }

  if (!validatorSession) return null

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="bg-bg-secondary border-b border-neutral-700 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-energy-primary/20 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-energy-primary" />
            </div>
            <div>
              <h1 className="font-display font-bold text-neutral-50">Painel do Validador</h1>
              <p className="text-xs text-neutral-500">
                {validatorSession.validatorName} · Sala: <span className="text-energy-primary">{validatorSession.roomName}</span>
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-200 text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-bg-secondary rounded-xl p-1.5 border border-neutral-700 w-fit">
          {([
            { id: 'session', label: 'Sessão', icon: Play },
            { id: 'validation', label: `Validar Testes${pendingValidations.length > 0 ? ` (${pendingValidations.length})` : ''}`, icon: CheckCircle },
          ] as const).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                activeTab === id
                  ? 'bg-energy-primary text-white shadow'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Session Tab */}
        {activeTab === 'session' && (
          <div className="space-y-4">
            {/* Active Session Banner */}
            {activeSession ? (
              <div className="bg-battle-green/10 border border-battle-green/40 rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-battle-green font-semibold text-sm uppercase tracking-wider mb-1">Round Ativo</p>
                    <p className="font-display font-bold text-neutral-50 text-lg">
                      {ROUNDS.find((r) => r.id === activeSession.roundId)?.name || activeSession.roundId}
                    </p>
                    {activeSession.paused && (
                      <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 rounded px-2 py-0.5 mt-1 inline-block">⏸ PAUSADO</span>
                    )}
                  </div>
                  {/* Timer — read-only for validators */}
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm text-neutral-400 mb-1 justify-end">
                      <Clock className="w-4 h-4" />
                      Tempo Restante
                    </div>
                    <div className={`font-mono text-4xl font-bold ${
                      activeSession.paused ? 'text-yellow-400' : timerSeconds <= 60 ? 'text-battle-red animate-pulse' : 'text-battle-green'
                    }`}>
                      {formatTime(timerSeconds)}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-bg-secondary rounded-xl p-5 border border-neutral-700">
                <p className="text-neutral-400 text-sm">Nenhum round ativo no momento.</p>
              </div>
            )}

            {/* Round List — read-only, only Game Master can start/stop */}
            <div className="bg-bg-secondary rounded-xl p-6 border border-neutral-700">
              <h3 className="font-display font-bold text-neutral-50 mb-4">Rounds da Sala</h3>
              <div className="space-y-3">
                {ROUNDS.map((round) => {
                  const isActive = activeSession?.roundId === round.id
                  return (
                    <div
                      key={round.id}
                      className={`flex items-center justify-between rounded-lg p-4 border ${
                        isActive ? 'bg-battle-green/10 border-battle-green/40' : 'bg-bg-tertiary border-neutral-700'
                      }`}
                    >
                      <span className={`font-semibold text-sm ${isActive ? 'text-battle-green' : 'text-neutral-400'}`}>
                        {round.name}
                      </span>
                      {isActive && (
                        <span className="text-xs font-semibold text-battle-green bg-battle-green/20 px-3 py-1 rounded-full">
                          Ativo
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
              <p className="text-xs text-neutral-600 mt-3">Apenas o Game Master pode iniciar ou parar rounds.</p>
            </div>
          </div>
        )}
            </div>
          </div>
        )}

        {/* Validation Tab */}
        {activeTab === 'validation' && (
          <div className="bg-bg-secondary rounded-xl p-6 border border-neutral-700">
            {imageModalUrl && (
              <div
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                onClick={() => setImageModalUrl(null)}
              >
                <div className="relative max-w-7xl max-h-screen">
                  <button
                    onClick={() => setImageModalUrl(null)}
                    className="absolute -top-12 right-0 text-white hover:text-neutral-300 text-sm font-semibold flex items-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Fechar (ESC)
                  </button>
                  <img
                    src={imageModalUrl}
                    alt="Imagem ampliada"
                    className="max-w-full max-h-[90vh] object-contain rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            )}
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-battle-blue" />
              <div>
                <h3 className="font-display text-2xl font-bold text-neutral-50">Fila de Validação de Testes</h3>
                <p className="text-sm text-neutral-400 mt-1">Testes enviados pelos participantes desta sala</p>
              </div>
            </div>
            {pendingValidations.length === 0 ? (
              <div className="text-center py-12 text-neutral-400">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="mb-2">Nenhum teste pendente de validação</p>
                <p className="text-sm">Quando jogadores submeterem testes, eles aparecerão aqui</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingValidations.map((validation) => {
                  const submittedDate = new Date(validation.submittedAt)
                  const diffMinutes = Math.floor((new Date().getTime() - submittedDate.getTime()) / 60000)
                  const timeAgo =
                    diffMinutes < 1
                      ? 'Agora'
                      : diffMinutes < 60
                      ? `${diffMinutes}m atrás`
                      : diffMinutes < 1440
                      ? `${Math.floor(diffMinutes / 60)}h atrás`
                      : `${Math.floor(diffMinutes / 1440)}d atrás`
                  const roundName = ROUNDS.find((r) => r.id === validation.roundId)?.name || validation.roundId
                  return (
                    <div
                      key={validation.id}
                      className="bg-bg-tertiary/50 rounded-xl p-6 border border-neutral-700 hover:border-battle-blue/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-battle-purple/20 flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-battle-purple" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-neutral-200">{validation.teamName}</h4>
                            <p className="text-xs text-neutral-500">{roundName} · {timeAgo}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleValidate(validation.id)}
                            className="px-4 py-2 bg-battle-green/20 hover:bg-battle-green/30 text-battle-green rounded-lg text-sm font-semibold border border-battle-green/50 transition-colors flex items-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Validar
                          </button>
                          <button
                            onClick={() => handleReject(validation.id)}
                            className="px-4 py-2 bg-battle-red/20 hover:bg-battle-red/30 text-battle-red rounded-lg text-sm font-semibold border border-battle-red/50 transition-colors flex items-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            Não válido
                          </button>
                        </div>
                      </div>
                      <div className="bg-bg-primary rounded-lg p-4 border-l-4 border-battle-purple">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-battle-purple" />
                          <span className="text-xs font-bold text-battle-purple uppercase">Caso de Uso Testado</span>
                        </div>
                        <p className="text-sm text-neutral-200 font-medium">{validation.useCaseTitle}</p>
                      </div>
                      {validation.imageUrl && (
                        <div className="bg-bg-primary rounded-lg p-4 border-l-4 border-battle-blue mt-3">
                          <div className="flex items-center gap-2 mb-3">
                            <Target className="w-4 h-4 text-battle-blue" />
                            <span className="text-xs font-bold text-battle-blue uppercase">Imagem do Teste</span>
                          </div>
                          <img
                            src={validation.imageUrl}
                            alt="Evidência do teste"
                            className="w-full max-h-96 object-contain rounded-lg border border-neutral-700 cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setImageModalUrl(validation.imageUrl!)}
                            title="Clique para ampliar"
                          />
                          <p className="text-xs text-neutral-400 mt-2 text-center">🔍 Clique na imagem para ampliar</p>
                        </div>
                      )}
                    </div>
                  )
                })}
                <div className="mt-6 p-4 bg-bg-tertiary/30 rounded-lg border border-neutral-700/50 text-center">
                  <div className="text-2xl font-bold text-battle-blue">{pendingValidations.length}</div>
                  <div className="text-xs text-neutral-400 mt-1">
                    {pendingValidations.length === 1 ? 'Teste Pendente' : 'Testes Pendentes'}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
