import { Zap, LogOut, Users, BookOpen, Trophy, Clock, User, Pencil } from 'lucide-react'
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
          setAllRoomTeams(liveRoom.teams || [])
          if (liveRoom.status === 'finished') {
            alert('\u26a0\ufe0f A sala foi encerrada pelo Game Master!')
            navigate('/')
            return
          }
          setGameFinished(liveRoom.status === 'finished')
          // Sync score from Azure — only take Azure score if it's strictly greater
          // to avoid overwriting locally-earned points not yet synced to Azure
          const currentTeamLocal = getCurrentTeam()
          if (currentTeamLocal) {
            const teamInRoom = (liveRoom.teams || []).find((t: any) => t.id === currentTeamLocal.id)
            if (teamInRoom && typeof teamInRoom.score === 'number' && teamInRoom.score > (currentTeamLocal.score || 0)) {
              const synced = { ...currentTeamLocal, score: teamInRoom.score }
              localStorage.setItem('current-team', JSON.stringify(synced))
            }
          }
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

  const [editingName, setEditingName] = useState(false)
  const [newPlayerName, setNewPlayerName] = useState('')
  const [allRoomTeams, setAllRoomTeams] = useState<any[]>([])

  const handleEditName = () => {
    setNewPlayerName(playerName)
    setEditingName(true)
  }

  const handleSaveName = async () => {
    const trimmed = newPlayerName.trim()
    if (!trimmed || trimmed.split(' ').filter(Boolean).length < 2) {
      alert('Digite seu nome e sobrenome completo!')
      return
    }
    // Update localStorage
    const currentPlayerStr = localStorage.getItem('copilot-combate-current-player')
    if (currentPlayerStr) {
      const cp = JSON.parse(currentPlayerStr)
      cp.name = trimmed
      localStorage.setItem('copilot-combate-current-player', JSON.stringify(cp))
    }
    // Update Azure room members list
    try {
      const player = getCurrentPlayer()
      if (player) {
        const allRooms: any[] = await roomsApi.getAll()
        const azureRoom = allRooms.find((r: any) => r.id === player.roomId)
        if (azureRoom) {
          const updatedTeams = azureRoom.teams.map((t: any) => {
            if (t.id === player.teamId) {
              return {
                ...t,
                members: (t.members || []).map((m: string) => m === playerName ? trimmed : m)
              }
            }
            return t
          })
          await roomsApi.update({ ...azureRoom, teams: updatedTeams })
        }
      }
    } catch (e) {
      console.error('Error updating name in Azure:', e)
    }
    setPlayerName(trimmed)
    setEditingName(false)
  }

  const handleLogout = () => {
    if (confirm('Tem certeza que deseja sair?\n\n✅ Seu progresso está salvo automaticamente!\n\nPara continuar, basta fazer login com o mesmo nome de time.')) {
      navigate('/')
    }
  }
      {/* Edit Name Modal */}
      {editingName && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-bg-secondary rounded-xl p-6 border border-energy-primary w-full max-w-sm">
            <h3 className="font-display text-lg font-bold text-neutral-50 mb-4 flex items-center gap-2">
              <Pencil className="w-5 h-5 text-energy-primary" />
              Atualizar Nome
            </h3>
            <input
              type="text"
              value={newPlayerName}
              onChange={e => setNewPlayerName(e.target.value)}
              placeholder="Ex: Maria Silva"
              className="w-full bg-bg-tertiary text-neutral-200 rounded-lg px-4 py-3 border-2 border-neutral-700 focus:border-energy-primary focus:outline-none transition-colors mb-1"
              maxLength={60}
              autoFocus
              onKeyDown={e => { if (e.key === 'Enter') handleSaveName() }}
            />
            <p className="text-xs text-neutral-500 mb-4">Nome e sobrenome completo</p>
            <div className="flex gap-3">
              <button onClick={() => setEditingName(false)} className="flex-1 bg-neutral-700 hover:bg-neutral-600 text-neutral-300 py-2 rounded-lg font-semibold text-sm transition-colors">Cancelar</button>
              <button onClick={handleSaveName} className="flex-1 bg-energy-primary hover:bg-energy-primary/80 text-white py-2 rounded-lg font-semibold text-sm transition-colors">Salvar</button>
            </div>
          </div>
        </div>
      )}
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
                <button
                  onClick={handleEditName}
                  title="Editar nome"
                  className="ml-1 p-1 rounded hover:bg-neutral-700 text-neutral-500 hover:text-neutral-200 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
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

        {/* Ranking widgets (Top 3 + Player Position) */}
        {allRoomTeams.length > 0 && (() => {
          const sorted = [...allRoomTeams].sort((a, b) => (b.score || 0) - (a.score || 0))
          const currentTeamObj = getCurrentTeam()
          const myPos = sorted.findIndex(t => t.id === currentTeamObj?.id)
          const myScore = currentTeamObj?.score || 0
          const medals = ['🏆', '🥈', '🥉']

          return (
            <div className="max-w-4xl mx-auto mb-8 grid md:grid-cols-2 gap-4">
              {/* Top 3 */}
              <div className="bg-bg-secondary/80 backdrop-blur-sm rounded-xl p-5 border border-neutral-700">
                <h3 className="font-display text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-400" /> Top 3 Classificação Geral
                </h3>
                <div className="space-y-2">
                  {sorted.slice(0, 3).map((team, i) => (
                    <div key={team.id} className={`flex items-center justify-between rounded-lg px-3 py-2 ${team.id === currentTeamObj?.id ? 'bg-energy-primary/10 border border-energy-primary/30' : 'bg-bg-tertiary'}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-lg w-6">{medals[i]}</span>
                        <span className={`text-sm font-semibold ${team.id === currentTeamObj?.id ? 'text-energy-primary' : 'text-neutral-200'}`}>{team.name}</span>
                      </div>
                      <span className="font-mono font-bold text-energy-primary text-sm">{team.score || 0} pts</span>
                    </div>
                  ))}
                  {sorted.length === 0 && <p className="text-xs text-neutral-500">Nenhuma pontuação ainda.</p>}
                </div>
              </div>

              {/* Player Position */}
              <div className="bg-bg-secondary/80 backdrop-blur-sm rounded-xl p-5 border border-neutral-700">
                <h3 className="font-display text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-energy-primary" /> Sua Posição
                </h3>
                {myPos === -1 ? (
                  <p className="text-xs text-neutral-500">Faça o primeiro match para aparecer no ranking!</p>
                ) : myPos === 0 ? (
                  <div className="text-center py-2">
                    <p className="text-2xl mb-1">🏆</p>
                    <p className="font-bold text-battle-green text-lg">{teamName}</p>
                    <p className="text-sm text-neutral-400">Você está em 1º lugar!</p>
                    <p className="text-xs text-neutral-500 mt-1">Continue assim para manter a liderança!</p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-energy-primary/20 flex items-center justify-center">
                        <span className="font-display font-bold text-energy-primary">#{myPos + 1}</span>
                      </div>
                      <div>
                        <p className="font-bold text-neutral-50">{teamName}</p>
                        <p className="text-xs text-neutral-400">{myScore} pts</p>
                      </div>
                    </div>
                    {(() => {
                      const ahead = sorted[myPos - 1]
                      const diff = (ahead.score || 0) - myScore
                      return (
                        <div className="bg-battle-blue/10 border border-battle-blue/30 rounded-lg px-3 py-2 text-xs text-neutral-300">
                          <span className="text-battle-blue font-semibold">{ahead.name}</span> está {diff} ponto{diff !== 1 ? 's' : ''} à sua frente.
                          <span className="block text-neutral-500 mt-0.5">Faça mais matches para superar!</span>
                        </div>
                      )
                    })()}
                  </div>
                )}
              </div>
            </div>
          )
        })()}

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
