import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { roomsApi } from '../../utils/apiClient'
import { setValidatorSession } from '../../utils/authManager'

export default function ValidatorAccess() {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()
  const [validatorName, setValidatorName] = useState('')
  const [room, setRoom] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const findRoom = async () => {
      try {
        const rooms = await roomsApi.getAll()
        const found = rooms.find((r: any) => r.validatorToken === token)
        if (found) {
          setRoom(found)
        } else {
          setError('Link inválido ou expirado.')
        }
      } catch {
        setError('Erro ao verificar o link.')
      } finally {
        setLoading(false)
      }
    }
    findRoom()
  }, [token])

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!room || !token) return
    setValidatorSession({
      roomId: room.id,
      roomName: room.name,
      gmId: room.createdBy,
      token,
      validatorName: validatorName.trim() || 'Validador',
    })
    navigate('/validador-dashboard')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <p className="text-neutral-400">Verificando link...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="bg-bg-secondary rounded-xl p-8 border border-neutral-700 max-w-md w-full text-center">
          <p className="text-battle-red text-lg font-semibold mb-2">{error}</p>
          <p className="text-neutral-400 text-sm">Solicite um novo link ao Game Master da sala.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6">
      <div className="bg-bg-secondary rounded-xl p-8 border border-neutral-700 max-w-md w-full">
        <h1 className="font-display text-2xl font-bold text-neutral-50 mb-2">Entrar como Validador</h1>
        <p className="text-neutral-400 mb-1 text-sm">
          Sala: <span className="text-energy-primary font-semibold">{room?.name}</span>
        </p>
        <p className="text-neutral-500 text-sm mb-6">
          Como validador, você poderá iniciar rounds e validar testes dos participantes desta sala.
        </p>
        <form onSubmit={handleJoin} className="space-y-4">
          <input
            type="text"
            value={validatorName}
            onChange={e => setValidatorName(e.target.value)}
            placeholder="Seu nome (opcional)"
            className="w-full bg-bg-tertiary text-neutral-200 rounded-lg px-4 py-3 border border-neutral-700 focus:border-energy-primary focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-energy-primary hover:bg-energy-primary/80 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Entrar como Validador
          </button>
        </form>
      </div>
    </div>
  )
}
