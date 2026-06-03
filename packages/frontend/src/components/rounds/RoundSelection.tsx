import { Zap, LogOut, Users, BookOpen, Trophy, Clock, User } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import RoundCard from './RoundCard'
import { useState, useEffect } from 'react'
import { getCurrentTeamStats, saveTeam, getCurrentTeam } from '../../utils/teamsManager'
import { getCurrentTeamRoundProgress } from '../../utils/roundProgressManager'
import { getCurrentPlayer, getRoomById, getCurrentRoom } from '../../utils/roomManager'
import { roomsApi } from '../../utils/apiClient'

const roundsBase = [
  {
    id: 'round-1',
    number: 1,
    name: 'Mestre das Notificações',
    villain: 'mestre-notificacoes',
    color: '#EF4444',
    description: 'Especialista em interromper a produtividade',
  },
  {
    id: 'round-2',
    number: 2,
    name: 'Capitã Pesquisa Infinita',
    villain: 'capita-pesquisa',
    color: '#F59E0B',
    description: 'Busca em fontes desconectadas',
  },
  {
    id: 'round-3',
    number: 3,
    name: 'Senhora Perfeccionista',
    villain: 'senhora-perfeccionista',
    color: '#FCD34D',
    description: 'Ciclo infinito de revisões',
  },
  {
    id: 'round-4',
    number: 4,
    name: 'ControlC+V',
    villain: 'ctrlcv',
    color: '#EA580C',
    description: 'Análise manual de dados',
  },
]

export default function RoundSelection() {
  const navigate = useNavigate()
  const location = useLocation()
  const [teamName, setTeamName] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [activePlayers, setActivePlayers] = useState(0)
  const [teamStats, setTeamStats] = useState({ score: 0, completedRounds: 0, totalRounds: 4 })
  const [rounds, setRounds] = useState<any[]>([])
  const [gameFinished, setGameFinished] = useState(false)

  useEffect(() => {
    // Load current team info
    const currentTeam = getCurrentTeam()
    if (currentTeam) {
      setTeamName(currentTeam.name)
      // Update last active timestamp
      saveTeam(currentTeam)
    }
    
    // Load real-time stats
    loadStats()
    
    // Update stats every 3 seconds (poll backend)
    const interval = setInterval(loadStats, 3000)
    
    // Reload stats when window gains focus (user returns from game)
    const handleFocus = () => {
      console.log('Window focused - reloading stats')
      loadStats()
    }
    window.addEventListener('focus', handleFocus)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  // Reload stats whenever location changes (user navigates back to this page)
  useEffect(() => {
    console.log('Location changed, reloading stats')
    loadStats()
  }, [location])

  const loadStats = async () => {
    // Force reload current team from localStorage
    const currentTeam = getCurrentTeam()
    if (currentTeam) {
      setTeamName(currentTeam.name)
    }
    
    // Count teams in current room + check room status from Azure
    const player = getCurrentPlayer()
    if (player) {
      setPlayerName(player.name)
      try {
        const rooms: any[] = await roomsApi.getAll()
        const liveRoom = rooms.find((r: any) => r.id === player.roomId)
        if (liveRoom) {
          setActivePlayers(liveRoom.teams.length || 0)
          if (liveRoom.status === 'finished') {
            alert('\u26a0\ufe0f A sala foi encerrada pelo Game Master!')
            navigate('/')
            return
          }
          setGameFinished(liveRoom.status === 'finished')
        } else {
          setActivePlayers(0)
        }
      } catch (_) {
        // Fallback to localStorage
        const room = getRoomById(player.roomId)
        setActivePlayers(room?.teams.length || 0)
        const currentRoom = getCurrentRoom()
        if (currentRoom) {
          const freshRoom = getRoomById(currentRoom.id)
          setGameFinished(freshRoom?.status === 'finished' || false)
        }
      }
    } else {
      setActivePlayers(0)
    }
    setTeamStats(getCurrentTeamStats())
    
    // Load round progress
    const roundProgress = getCurrentTeamRoundProgress()
    const updatedRounds = roundsBase.map(round => {
      const progress = roundProgress.find(rp => rp.roundId === round.id)
      return {
        ...round,
        progress: progress?.progress || 0,
        points: progress?.points || 0,
        status: progress?.status || 'available',
      }
    })
    setRounds(updatedRounds)
    
    console.log('Stats reloaded:', {
      completedRounds: currentTeam?.completedRounds || [],
      teamStats: getCurrentTeamStats(),
      gameFinished
    })
  }

  const handleLogout = () => {
    if (confirm('Tem certeza que deseja sair?\n\n✅ Seu progresso está salvo automaticamente!\n\nPara continuar, basta fazer login com o mesmo nome de time.')) {
      navigate('/')
    }
  }

  return (
    <div className="relative min-h-screen lightning-border overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-energy-primary/20 via-transparent to-energy-secondary/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          {/* Team & Player Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-bg-secondary/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-neutral-700">
              <Users className="w-5 h-5 text-energy-primary" />
              <div>
                <p className="text-xs text-neutral-400">Time</p>
                <p className="font-semibold text-neutral-50">{teamName}</p>
              </div>
            </div>
            {playerName && (
              <div className="flex items-center gap-2 bg-bg-secondary/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-neutral-700">
                <User className="w-4 h-4 text-battle-blue" />
                <div>
                  <p className="text-xs text-neutral-400">Jogador</p>
                  <p className="font-semibold text-sm text-neutral-50">{playerName}</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/my-matches')}
              className="flex items-center gap-2 bg-battle-purple/20 hover:bg-battle-purple/30 text-battle-purple px-4 py-2 rounded-lg border border-battle-purple/50 transition-colors"
            >
              <Trophy className="w-4 h-4" />
              <span className="font-semibold text-sm">Meus Matchs</span>
            </button>
            {gameFinished && (
              <button
                onClick={() => navigate('/gabarito')}
                className="flex items-center gap-2 bg-battle-green/20 hover:bg-battle-green/30 text-battle-green px-4 py-2 rounded-lg border border-battle-green/50 transition-colors animate-pulse"
              >
                <BookOpen className="w-4 h-4" />
                <span className="font-semibold text-sm">Ver Gabarito</span>
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-neutral-300 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-semibold text-sm">Sair</span>
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Zap className="w-8 h-8 text-energy-primary animate-pulse-glow" />
            <h1 className="text-hero">Copilot Combate</h1>
            <Zap className="w-8 h-8 text-energy-primary animate-pulse-glow" />
          </div>
          <p className="text-xl text-neutral-400 font-body">
            Escolha seu desafio e derrote os vilões da produtividade
          </p>
        </div>

        {/* Stats Bar */}
        <div className="max-w-4xl mx-auto mb-12 bg-bg-secondary/80 backdrop-blur-sm rounded-xl p-6 border border-neutral-700">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-energy-primary font-mono mb-1">
                {activePlayers}
              </div>
              <div className="text-sm text-neutral-400">Times Ativos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-battle-green font-mono mb-1">
                {teamStats.score}
              </div>
              <div className="text-sm text-neutral-400">Pontos do Seu Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-battle-yellow font-mono mb-1">
                {teamStats.completedRounds}/{teamStats.totalRounds}
              </div>
              <div className="text-sm text-neutral-400">Rounds Completos</div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="max-w-4xl mx-auto mb-8 bg-battle-blue/10 backdrop-blur-sm rounded-xl p-4 border border-battle-blue/30">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-battle-blue flex-shrink-0 animate-pulse" />
            <div className="flex-1">
              <p className="text-sm text-neutral-300">
                <strong className="text-battle-blue">Atenção:</strong> Os rounds ficam disponíveis quando o <strong>Game Master inicia</strong> o jogo. 
                Aguarde o botão mudar de <span className="text-neutral-400">"Aguardando GM"</span> para <span className="text-battle-green">"Jogar"</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Rounds Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rounds.map((round) => (
            <RoundCard key={round.id} round={round} gameFinished={gameFinished} />
          ))}
        </div>
      </div>
    </div>
  )
}
