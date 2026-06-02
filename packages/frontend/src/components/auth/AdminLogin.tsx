import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Lock, ArrowLeft } from 'lucide-react'
import { loginAsAdmin } from '../../utils/authManager'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (loginAsAdmin(password)) {
      navigate('/admin')
    } else {
      setError('Senha incorreta! Tente novamente.')
      setPassword('')
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center lightning-border">
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-battle-purple/30 via-transparent to-energy-primary/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-neutral-400 hover:text-neutral-200 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Voltar para Login</span>
        </button>

        {/* Login Card */}
        <div className="bg-bg-secondary rounded-xl p-8 border-2 border-battle-purple shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-battle-purple/20 rounded-full mb-4">
              <Shield className="w-10 h-10 text-battle-purple" />
            </div>
            <h1 className="font-display text-3xl font-bold text-neutral-50 mb-2">
              Acesso Admin
            </h1>
            <p className="text-sm text-neutral-400">
              Apenas para facilitadores do workshop
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-battle-red/20 border border-battle-red rounded-lg p-3 mb-6">
              <p className="text-sm text-battle-red font-semibold text-center">
                {error}
              </p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-neutral-300 mb-2 flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Senha de Acesso
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                placeholder="Digite a senha"
                className="w-full bg-bg-tertiary text-neutral-200 text-lg rounded-lg px-4 py-3 border-2 border-neutral-700 focus:border-battle-purple focus:outline-none transition-colors"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full bg-battle-purple hover:bg-battle-purple/90 text-white py-3 rounded-lg font-display text-lg font-bold uppercase tracking-wide transition-all hover:scale-105 shadow-lg"
              style={{
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
              }}
            >
              Entrar como Admin
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 pt-6 border-t border-neutral-700">
            <div className="bg-bg-tertiary/50 rounded-lg p-4">
              <p className="text-xs text-neutral-400 text-center leading-relaxed">
                <strong className="text-neutral-300">Facilitadores:</strong> Use esta área para controlar rounds, gerenciar cards e validar testes dos participantes.
              </p>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-neutral-500">
            Esqueceu a senha? Entre em contato com o organizador do workshop.
          </p>
        </div>
      </div>
    </div>
  )
}
