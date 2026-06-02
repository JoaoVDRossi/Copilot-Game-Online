import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Gamepad2, ArrowLeft, User, Lock } from 'lucide-react'
import { loginAsGameMaster, getAuthSession } from '../../utils/authManager'

export default function GameMasterLogin() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // If already logged in as GM, redirect to dashboard
  useEffect(() => {
    const existingSession = getAuthSession()
    if (existingSession?.role === 'gamemaster') {
      navigate('/gamemaster/dashboard', { replace: true })
    }
  }, [navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError('Digite seu nome!')
      return
    }

    if (!password.trim()) {
      setError('Digite uma senha!')
      return
    }

    if (password.trim().length < 4) {
      setError('A senha deve ter no mínimo 4 caracteres.')
      return
    }

    setLoading(true)
    const result = await loginAsGameMaster(name.trim(), password.trim())
    setLoading(false)

    if (result.error) {
      setError(result.error)
      return
    }

    navigate('/gamemaster/dashboard')
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center lightning-border">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-energy-primary/30 via-transparent to-battle-purple/30" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-neutral-400 hover:text-neutral-200 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Voltar</span>
        </button>

        <div className="bg-bg-secondary rounded-xl p-8 border-2 border-energy-primary shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-energy-primary/20 rounded-full mb-4">
              <Gamepad2 className="w-10 h-10 text-energy-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-neutral-50 mb-2">
              Game Master
            </h1>
            <p className="text-sm text-neutral-400">
              Crie e gerencie salas de jogo
            </p>
          </div>

          {error && (
            <div className="bg-battle-red/20 border border-battle-red rounded-lg p-3 mb-6">
              <p className="text-sm text-battle-red font-semibold text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="gmName" className="flex items-center gap-2 text-sm font-semibold text-neutral-300 mb-2">
                <User className="w-4 h-4" />
                Seu Nome
              </label>
              <input
                type="text"
                id="gmName"
                value={name}
                onChange={(e) => { setName(e.target.value); setError('') }}
                placeholder="Ex: João Facilitador"
                className="w-full bg-bg-tertiary text-neutral-200 text-lg rounded-lg px-4 py-3 border-2 border-neutral-700 focus:border-energy-primary focus:outline-none transition-colors"
                maxLength={40}
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="gmPassword" className="flex items-center gap-2 text-sm font-semibold text-neutral-300 mb-2">
                <Lock className="w-4 h-4" />
                Senha
              </label>
              <input
                type="password"
                id="gmPassword"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                placeholder="Crie ou digite sua senha"
                className="w-full bg-bg-tertiary text-neutral-200 text-lg rounded-lg px-4 py-3 border-2 border-neutral-700 focus:border-energy-primary focus:outline-none transition-colors"
                maxLength={50}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-energy-primary to-energy-secondary text-white py-3 rounded-lg font-display text-lg font-bold uppercase tracking-wide transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:hover:scale-100"
              style={{ boxShadow: '0 0 20px rgba(255, 107, 53, 0.4)' }}
            >
              {loading ? 'Entrando...' : 'Entrar como Game Master'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-neutral-700">
            <div className="bg-bg-tertiary/50 rounded-lg p-4">
              <p className="text-xs text-neutral-400 text-center leading-relaxed">
                Primeiro acesso? Escolha um <strong className="text-neutral-300">nome</strong> e <strong className="text-neutral-300">senha</strong> — sua conta será criada automaticamente.
                Já tem conta? Use os mesmos dados para acessar suas salas de qualquer dispositivo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
