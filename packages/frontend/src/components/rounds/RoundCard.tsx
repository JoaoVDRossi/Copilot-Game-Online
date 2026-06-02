import { Lock, Play, Clock, XCircle, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchActiveSession, getRemainingTime } from '../../utils/sessionManager'
import { getCurrentRoom } from '../../utils/roomManager'

interface RoundCardProps {
  round: {
    id: string
    number: number
    name: string
    villain: string
    color: string
    description: string
    progress: number
    points: number
    status: 'locked' | 'available' | 'in-progress' | 'completed'
  }
  gameFinished?: boolean
}

export default function RoundCard({ round, gameFinished = false }: RoundCardProps) {
  const navigate = useNavigate()
  const isLocked = round.status === 'locked'
  const [sessionState, setSessionState] = useState<{
    isActive: boolean
    hasTime: boolean
  }>({ isActive: false, hasTime: false })

  useEffect(() => {
    const checkSession = async () => {
      try {
        const room = getCurrentRoom()
        const activeSession = await fetchActiveSession(room?.createdBy)
        console.log(`🎯 [PLAYER] Round ${round.id} checking session:`, {
          hasSession: !!activeSession,
          sessionRoundId: activeSession?.roundId,
          myRoundId: round.id,
          matches: activeSession?.roundId === round.id,
          active: activeSession?.active
        })
        
        if (activeSession && activeSession.roundId === round.id) {
          const remainingTime = getRemainingTime(activeSession)
          console.log(`✅ [PLAYER] Round ${round.id} - Session ACTIVE! Remaining: ${remainingTime}s`)
          setSessionState({
            isActive: true,
            hasTime: remainingTime > 0,
          })
        } else {
          setSessionState({
            isActive: false,
            hasTime: false,
          })
        }
      } catch (error) {
        console.error('Error checking session:', error)
      }
    }

    checkSession()
    // Faster polling (2 seconds) to quickly detect when admin starts round
    const interval = setInterval(checkSession, 2000)
    return () => clearInterval(interval)
  }, [round.id])

  const handleClick = () => {
    // Don't allow access if round is completed
    if (round.status === 'completed') {
      return
    }
    if (!isLocked && !gameFinished && sessionState.isActive && sessionState.hasTime) {
      navigate(`/round/${round.id}/intro`)
    }
  }

  // Determine button state
  const getButtonContent = () => {
    // Round completed - player finished all matches
    if (round.status === 'completed') {
      return {
        icon: <CheckCircle className="w-4 h-4" />,
        text: 'Round Finalizado',
        disabled: true,
      }
    }

    if (gameFinished) {
      return {
        icon: <Lock className="w-4 h-4" />,
        text: 'Round Encerrado',
        disabled: true,
      }
    }

    // Session active but time expired
    if (sessionState.isActive && !sessionState.hasTime) {
      return {
        icon: <XCircle className="w-4 h-4" />,
        text: 'Tempo Encerrado',
        disabled: true,
      }
    }

    // Session active with time remaining
    if (sessionState.isActive && sessionState.hasTime) {
      // If player has progress, show "Continuar", otherwise "Jogar"
      if (round.progress > 0) {
        return {
          icon: <Play className="w-4 h-4" />,
          text: 'Continuar',
          disabled: false,
        }
      } else {
        return {
          icon: <Play className="w-4 h-4" />,
          text: 'Jogar',
          disabled: false,
        }
      }
    }

    // No active session - not started by admin
    if (!sessionState.isActive) {
      return {
        icon: <Clock className="w-4 h-4 animate-pulse" />,
        text: 'Aguardando GM',
        disabled: true,
      }
    }

    // Fallback
    return {
      icon: <Play className="w-4 h-4" />,
      text: 'Iniciar',
      disabled: false,
    }
  }

  const buttonContent = getButtonContent()

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-300 ${
        isLocked ? 'opacity-60' : 'hover:-translate-y-2'
      }`}
    >
      <div
        className={`bg-bg-secondary rounded-xl p-6 border-2 transition-all duration-300 ${
          isLocked
            ? 'border-neutral-700'
            : 'border-transparent hover:border-energy-primary hover:shadow-2xl hover:shadow-energy-primary/20'
        }`}
        style={{
          background: isLocked
            ? undefined
            : `linear-gradient(135deg, #1A1A1A 0%, ${round.color}15 100%)`,
        }}
      >
        {/* Lock Overlay */}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg-primary/50 backdrop-blur-sm rounded-xl z-10">
            <Lock className="w-12 h-12 text-neutral-600" />
          </div>
        )}

        {/* Round Number Badge */}
        <div className="absolute -top-3 -right-3 w-10 h-10 bg-energy-primary rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
          {round.number}
        </div>

        {/* Avatar */}
        <div className="mb-4 text-center">
          <div
            className="relative inline-block w-28 h-28 mb-3 transition-transform duration-300 group-hover:scale-110"
            style={{
              filter: isLocked ? 'grayscale(80%) opacity(0.5)' : 'none',
            }}
          >
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-50"
              style={{
                background: isLocked ? 'transparent' : round.color,
              }}
            />
            <img
              src={`/villain-avatars/${round.villain}.png`}
              alt={round.name}
              className="relative w-full h-full object-contain drop-shadow-2xl"
              style={{
                filter: isLocked ? 'none' : `drop-shadow(0 0 20px ${round.color}80)`,
              }}
            />
          </div>
          <h3 className="font-display font-bold text-lg text-neutral-50 mb-1">
            Round {round.number}
          </h3>
          <h4
            className="font-display text-sm font-semibold mb-2"
            style={{ color: isLocked ? '#737373' : round.color }}
          >
            {round.name}
          </h4>
        </div>

        {/* Description */}
        <p className="text-xs text-neutral-400 text-center mb-4 min-h-[2.5rem]">
          {round.description}
        </p>

        {/* Progress Bar */}
        {!isLocked && (
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-neutral-400">Progresso</span>
              <span className="text-xs font-mono font-semibold text-neutral-300">
                {Math.min(100, round.progress)}%
              </span>
            </div>
            <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${round.progress}%`,
                  background: `linear-gradient(90deg, ${round.color}, ${round.color}CC)`,
                  boxShadow: `0 0 10px ${round.color}80`,
                }}
              />
            </div>
          </div>
        )}

        {/* Points */}
        {!isLocked && (
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-neutral-400">Pontos</span>
            <span
              className="font-mono font-bold text-lg"
              style={{ color: round.color }}
            >
              {round.points} pts
            </span>
          </div>
        )}

        {/* CTA Button */}
        {!isLocked && (
          <button
            onClick={handleClick}
            disabled={buttonContent.disabled}
            className={`w-full py-2.5 rounded-lg font-display font-semibold text-sm uppercase tracking-wide flex items-center justify-center gap-2 transition-all duration-300 ${
              buttonContent.disabled ? 'cursor-not-allowed opacity-75' : 'hover:scale-105'
            }`}
            style={{
              background: buttonContent.disabled
                ? '#6B7280' 
                : `linear-gradient(135deg, ${round.color}, ${round.color}DD)`,
              boxShadow: buttonContent.disabled
                ? 'none' 
                : `0 4px 12px ${round.color}40`,
              color: '#FAFAFA',
            }}
          >
            {buttonContent.icon}
            {buttonContent.text}
          </button>
        )}

        {/* Status Badge */}
        {round.status === 'completed' ? (
          <div className="absolute top-3 left-3 bg-battle-green px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg">
            ✓ Finalizado
          </div>
        ) : gameFinished ? (
          <div className="absolute top-3 left-3 bg-neutral-600 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg">
            🏁 Encerrado
          </div>
        ) : sessionState.isActive && !sessionState.hasTime ? (
          <div className="absolute top-3 left-3 bg-battle-red px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg">
            ⏱️ Tempo Esgotado
          </div>
        ) : sessionState.isActive && sessionState.hasTime ? (
          <div
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg animate-pulse"
            style={{ backgroundColor: round.color }}
          >
            🎮 Ativo
          </div>
        ) : !sessionState.isActive && round.progress > 0 ? (
          <div className="absolute top-3 left-3 bg-neutral-500 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg">
            ⏸️ Aguardando
          </div>
        ) : null}
      </div>
    </div>
  )
}
