import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Zap, Users, Play, KeyRound, UserPlus, X } from 'lucide-react'
import { setCurrentRoom, setCurrentPlayer } from '../../utils/roomManager'
import { roomsApi } from '../../utils/apiClient'
import { Room } from '../../types'

export default function DirectJoinRoom() {
  const { code } = useParams<{ code: string }>()
  const navigate = useNavigate()
  const [room, setRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const [playerName, setPlayerName] = useState('')
  const [teamName, setTeamName] = useState('')
  const [error, setError] = useState('')
  const [joinedInfo, setJoinedInfo] = useState<{ roomName: string; teamName: string; isNewTeam: boolean } | null>(null)

  // Load room data
  useEffect(() => {
    if (!code) {
      setNotFound(true)
      setLoading(false)
      return
    }

    roomsApi.getByCode(code)
      .then((foundRoom) => {
        if (!foundRoom || foundRoom.status === 'finished') {
          setNotFound(true)
        } else {
          setRoom(foundRoom)
        }
        setLoading(false)
      })
      .catch(() => {
        setNotFound(true)
        setLoading(false)
      })
  }, [code])

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!playerName.trim()) {
      setError('Digite seu nome!')
      return
    }
    if (!teamName.trim()) {
      setError('Digite o nome do time!')
      return
    }
    if (!code) return

    try {
      const result = await roomsApi.join({
        roomCode: code,
        playerName: playerName.trim(),
        teamName: teamName.trim(),
      })

      if (!result) {
        setError('Erro ao entrar na sala. Tente novamente.')
        return
      }

      setCurrentRoom(result.room)
      setCurrentPlayer({
        name: playerName.trim(),
        teamId: result.team.id,
        teamName: result.team.name,
        roomId: result.room.id,
        roomCode: result.room.code,
      })

      const teamData = {
        id: result.team.id,
        name: result.team.name,
        score: result.team.score,
        completedRounds: result.team.completedRounds,
        createdAt: result.team.joinedAt,
        lastActive: new Date().toISOString(),
        roomId: result.room.id,
      }
      localStorage.setItem('current-team', JSON.stringify(teamData))

      setJoinedInfo({
        roomName: result.room.name,
        teamName: result.team.name,
        isNewTeam: result.isNewTeam,
      })

      setTimeout(() => {
        navigate('/rounds')
      }, 1500)
    } catch (err: any) {
      if (err.message?.includes('404') || err.message?.includes('Not Found')) {
        setError('Sala não encontrada!')
      } else if (err.message?.includes('finished')) {
        setError('Esta sala já foi encerrada.')
      } else {
        setError('Erro ao entrar na sala. Tente novamente.')
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="text-neutral-400 text-lg">Carregando sala...</div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary lightning-border">
        <div className="max-w-md mx-auto text-center px-4">
          <X className="w-16 h-16 text-battle-red mx-auto mb-4" />
          <h1 className="font-display text-3xl font-bold text-neutral-50 mb-3">Sala não encontrada</h1>
          <p className="text-neutral-400 mb-6">
            O link pode estar expirado ou a sala já foi encerrada.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-energy-primary hover:bg-energy-primary/80 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Ir para a página inicial
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary lightning-border overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-energy-primary/10 via-bg-primary to-battle-purple/10 animate-gradient" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-energy-primary/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-battle-purple/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        {/* Success State */}
        {joinedInfo ? (
          <div className="bg-bg-secondary rounded-2xl p-8 border-2 border-battle-green shadow-2xl text-center">
            <UserPlus className="w-12 h-12 text-battle-green mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold text-battle-green mb-2">
              {joinedInfo.isNewTeam ? 'Time criado com sucesso!' : 'Entrou no time!'}
            </h2>
            <p className="text-neutral-300 mb-1">
              Sala: <span className="font-semibold">{joinedInfo.roomName}</span>
            </p>
            <p className="text-neutral-300">
              Time: <span className="font-semibold">{joinedInfo.teamName}</span>
            </p>
            <p className="text-sm text-neutral-400 mt-4">Redirecionando para o jogo...</p>
          </div>
        ) : (
          <div className="bg-bg-secondary rounded-2xl p-8 border-2 border-energy-primary shadow-2xl">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 mb-3">
                <Zap className="w-8 h-8 text-energy-primary animate-pulse-glow" />
                <h1 className="font-display text-2xl font-bold text-neutral-50">Copilot Combate</h1>
                <Zap className="w-8 h-8 text-energy-primary animate-pulse-glow" />
              </div>
              <div className="bg-bg-tertiary rounded-lg px-4 py-2 inline-flex items-center gap-2 border border-neutral-600">
                <KeyRound className="w-4 h-4 text-energy-primary" />
                <span className="text-sm text-neutral-400">Sala:</span>
                <span className="font-display font-bold text-energy-primary text-lg">{room?.name}</span>
              </div>
            </div>

            {error && (
              <div className="bg-battle-red/20 border border-battle-red rounded-lg p-3 mb-5">
                <p className="text-sm text-battle-red font-semibold text-center">{error}</p>
              </div>
            )}

            <form onSubmit={handleJoin} className="space-y-4">
              {/* Player Name */}
              <div>
                <label htmlFor="dj-playerName" className="flex items-center gap-2 text-sm font-semibold text-neutral-300 mb-2">
                  <Users className="w-4 h-4" />
                  Seu Nome
                </label>
                <input
                  type="text"
                  id="dj-playerName"
                  value={playerName}
                  onChange={(e) => { setPlayerName(e.target.value); setError('') }}
                  placeholder="Ex: Maria Silva"
                  className="w-full bg-bg-tertiary text-neutral-200 text-lg rounded-lg px-4 py-3 border-2 border-neutral-700 focus:border-energy-primary focus:outline-none transition-colors"
                  maxLength={40}
                  autoFocus
                />
              </div>

              {/* Team Name */}
              <div>
                <label htmlFor="dj-teamName" className="flex items-center gap-2 text-sm font-semibold text-neutral-300 mb-2">
                  <Users className="w-4 h-4" />
                  Nome do Time
                </label>
                <input
                  type="text"
                  id="dj-teamName"
                  value={teamName}
                  onChange={(e) => { setTeamName(e.target.value); setError('') }}
                  placeholder="Ex: Copilot Warriors"
                  className="w-full bg-bg-tertiary text-neutral-200 text-lg rounded-lg px-4 py-3 border-2 border-neutral-700 focus:border-energy-primary focus:outline-none transition-colors"
                  maxLength={30}
                />
                <p className="text-xs text-battle-green mt-2 flex items-center gap-1">
                  🤝 <span>Se outro jogador já criou esse time, você entra automaticamente!</span>
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-energy-primary to-energy-secondary text-white py-4 rounded-lg font-display text-xl font-bold uppercase tracking-wide flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-lg hover:shadow-2xl"
                style={{ boxShadow: '0 0 30px rgba(255, 107, 53, 0.5)' }}
              >
                <Play className="w-6 h-6" />
                Entrar na Sala
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
