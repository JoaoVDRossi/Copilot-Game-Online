import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Users, Play, KeyRound, UserPlus, PlusCircle } from 'lucide-react'
import { setCurrentRoom, setCurrentPlayer } from '../../utils/roomManager'
import { roomsApi } from '../../utils/apiClient'

export default function TeamLogin() {
  const navigate = useNavigate()
  const [roomCode, setRoomCode] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [teamName, setTeamName] = useState('')
  const [error, setError] = useState('')
  const [joinedInfo, setJoinedInfo] = useState<{ roomName: string; teamName: string; isNewTeam: boolean } | null>(null)

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!roomCode.trim()) {
      setError('Digite o código da sala!')
      return
    }

    if (!playerName.trim()) {
      setError('Digite seu nome!')
      return
    }

    if (!teamName.trim()) {
      setError('Digite o nome do time!')
      return
    }

    try {
      const result = await roomsApi.join({
        roomCode: roomCode.trim(),
        playerName: playerName.trim(),
        teamName: teamName.trim(),
      })

      if (!result) {
        setError('Sala não encontrada! Verifique o código.')
        return
      }

      // Save context
      setCurrentRoom(result.room)
      setCurrentPlayer({
        name: playerName.trim(),
        teamId: result.team.id,
        teamName: result.team.name,
        roomId: result.room.id,
        roomCode: result.room.code,
      })

      // Also save as current-team for compatibility with existing game components
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

      // Navigate after brief delay
      setTimeout(() => {
        navigate('/rounds')
      }, 1500)
    } catch (err: any) {
      if (err.message?.includes('404') || err.message?.includes('not found') || err.message?.includes('Not Found')) {
        setError('Sala não encontrada! Verifique o código.')
      } else if (err.message?.includes('finished')) {
        setError('Esta sala já foi encerrada.')
      } else {
        setError('Erro ao entrar na sala. Tente novamente.')
      }
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center lightning-border overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-energy-primary/10 via-bg-primary to-battle-purple/10 animate-gradient" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-energy-primary/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-battle-purple/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <Zap className="w-12 h-12 text-energy-primary animate-pulse-glow" />
              <h1 className="text-hero">Copilot Combate</h1>
              <Zap className="w-12 h-12 text-energy-primary animate-pulse-glow" />
            </div>
            <p className="text-2xl text-neutral-300 font-body mb-2">
              Derrote os Vilões da Produtividade
            </p>
            <p className="text-lg text-neutral-400">
              Aprenda a usar Microsoft 365 Copilot jogando!
            </p>
          </div>

          {/* Villains Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { name: 'Mestre das Notificações', avatar: 'mestre-notificacoes', color: '#EF4444' },
              { name: 'Capitã Pesquisa Infinita', avatar: 'capita-pesquisa', color: '#F59E0B' },
              { name: 'Senhora Perfeccionista', avatar: 'senhora-perfeccionista', color: '#FCD34D' },
              { name: 'ControlC+V', avatar: 'ctrlcv', color: '#EA580C' },
            ].map((villain, index) => (
              <div
                key={villain.avatar}
                className="relative group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-bg-secondary/80 backdrop-blur-sm rounded-xl p-4 border border-neutral-700 hover:border-energy-primary/50 transition-all duration-300 hover:-translate-y-2">
                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity"
                      style={{ background: villain.color }}
                    />
                    <img
                      src={`/villain-avatars/${villain.avatar}.png`}
                      alt={villain.name}
                      className="relative w-full h-32 object-contain drop-shadow-2xl"
                      style={{
                        filter: `drop-shadow(0 0 20px ${villain.color}80)`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-center text-neutral-400 mt-3 font-semibold">
                    {villain.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Success Message */}
          {joinedInfo && (
            <div className="max-w-md mx-auto">
              <div className="bg-battle-green/20 border border-battle-green rounded-xl p-6 mb-6 text-center">
                <UserPlus className="w-10 h-10 text-battle-green mx-auto mb-3" />
                <p className="text-lg font-bold text-battle-green mb-1">
                  {joinedInfo.isNewTeam ? 'Time criado com sucesso!' : 'Entrou no time!'}
                </p>
                <p className="text-neutral-300">
                  Sala: <span className="font-semibold">{joinedInfo.roomName}</span>
                </p>
                <p className="text-neutral-300">
                  Time: <span className="font-semibold">{joinedInfo.teamName}</span>
                </p>
                <p className="text-sm text-neutral-400 mt-2">Redirecionando...</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          {!joinedInfo && (
            <div className="max-w-md mx-auto">
              <div className="bg-bg-secondary/90 backdrop-blur-sm rounded-xl p-8 border-2 border-energy-primary shadow-2xl">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <KeyRound className="w-8 h-8 text-energy-primary" />
                  <h2 className="font-display text-2xl font-bold text-neutral-50">
                    Entrar na Sala
                  </h2>
                </div>

                {error && (
                  <div className="bg-battle-red/20 border border-battle-red rounded-lg p-3 mb-6">
                    <p className="text-sm text-battle-red font-semibold text-center">{error}</p>
                  </div>
                )}

                <form onSubmit={handleJoinRoom} className="space-y-5">
                  {/* Room Code */}
                  <div>
                    <label htmlFor="roomCode" className="flex items-center gap-2 text-sm font-semibold text-neutral-300 mb-2">
                      <KeyRound className="w-4 h-4" />
                      Código da Sala
                    </label>
                    <input
                      type="text"
                      id="roomCode"
                      value={roomCode}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 6)
                        setRoomCode(val)
                        setError('')
                      }}
                      placeholder="Ex: 123456"
                      className="w-full bg-bg-tertiary text-neutral-200 text-2xl tracking-[0.5em] text-center rounded-lg px-4 py-4 border-2 border-neutral-700 focus:border-energy-primary focus:outline-none transition-colors font-mono"
                      maxLength={6}
                      inputMode="numeric"
                      autoFocus
                    />
                    <p className="text-xs text-neutral-500 mt-2">
                      Peça o código de 6 dígitos ao facilitador
                    </p>
                  </div>

                  {/* Player Name */}
                  <div>
                    <label htmlFor="playerName" className="flex items-center gap-2 text-sm font-semibold text-neutral-300 mb-2">
                      <Users className="w-4 h-4" />
                      Seu Nome
                    </label>
                    <input
                      type="text"
                      id="playerName"
                      value={playerName}
                      onChange={(e) => {
                        setPlayerName(e.target.value)
                        setError('')
                      }}
                      placeholder="Ex: Maria Silva"
                      className="w-full bg-bg-tertiary text-neutral-200 text-lg rounded-lg px-4 py-3 border-2 border-neutral-700 focus:border-energy-primary focus:outline-none transition-colors"
                      maxLength={40}
                    />
                  </div>

                  {/* Team Name */}
                  <div>
                    <label htmlFor="teamName" className="flex items-center gap-2 text-sm font-semibold text-neutral-300 mb-2">
                      <Users className="w-4 h-4" />
                      Nome do Time
                    </label>
                    <input
                      type="text"
                      id="teamName"
                      value={teamName}
                      onChange={(e) => {
                        setTeamName(e.target.value)
                        setError('')
                      }}
                      placeholder="Ex: Copilot Warriors"
                      className="w-full bg-bg-tertiary text-neutral-200 text-lg rounded-lg px-4 py-3 border-2 border-neutral-700 focus:border-energy-primary focus:outline-none transition-colors"
                      maxLength={30}
                    />
                    <p className="text-xs text-battle-green mt-2 flex items-center gap-1">
                      🤝 <span>Se outro jogador já criou esse time na sala, você será adicionado automaticamente!</span>
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-energy-primary to-energy-secondary text-white py-4 rounded-lg font-display text-xl font-bold uppercase tracking-wide flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-lg hover:shadow-2xl"
                    style={{
                      boxShadow: '0 0 30px rgba(255, 107, 53, 0.5)',
                    }}
                  >
                    <Play className="w-6 h-6" />
                    Entrar na Sala
                  </button>
                </form>

                {/* Admin & Game Master Links */}
                <div className="mt-6 pt-6 border-t border-neutral-700 space-y-3">
                  <button
                    onClick={() => navigate('/gamemaster')}
                    className="w-full flex items-center justify-center gap-2 text-sm text-energy-primary hover:text-energy-secondary transition-colors font-semibold py-2 rounded-lg border border-energy-primary/30 hover:border-energy-primary/60"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Criar Sala (Game Master)
                  </button>
                  <button
                    onClick={() => navigate('/admin/login')}
                    className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors block mx-auto"
                  >
                    Acesso Administrador →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="max-w-2xl mx-auto mt-8 bg-bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700">
            <h3 className="font-display font-bold text-neutral-50 mb-3 text-center">
              Como Jogar?
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl mb-2">🔑</div>
                <p className="text-sm text-neutral-300 font-semibold mb-1">
                  Entre na Sala
                </p>
                <p className="text-xs text-neutral-500">
                  Peça o código ao facilitador
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">🎯</div>
                <p className="text-sm text-neutral-300 font-semibold mb-1">
                  Monte Combinações
                </p>
                <p className="text-xs text-neutral-500">
                  Junte Prompt + Caso de Uso + Ferramenta
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">🏆</div>
                <p className="text-sm text-neutral-300 font-semibold mb-1">
                  Acumule Pontos
                </p>
                <p className="text-xs text-neutral-500">
                  Derrote todos e seja o campeão!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
