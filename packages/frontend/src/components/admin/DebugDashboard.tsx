import { useState, useEffect } from 'react'
import { ArrowLeft, RefreshCw, CheckCircle, XCircle, Clock, Database } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface HealthStatus {
  endpoint: string
  status: 'ok' | 'error' | 'pending'
  responseTime?: number
  data?: any
  error?: string
}

export default function DebugDashboard() {
  const navigate = useNavigate()
  const [health, setHealth] = useState<HealthStatus[]>([])
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [serverTime, setServerTime] = useState<Date | null>(null)
  const [clientTime, setClientTime] = useState<Date>(new Date())
  const [isLoading, setIsLoading] = useState(true)

  const API_URL = import.meta.env.VITE_API_URL || 'https://copilot-combate-backend-djh5eqdvh7ddaabs.canadacentral-01.azurewebsites.net'

  const endpoints = [
    { name: 'Sessions', url: `${API_URL}/api/sessions-get`, method: 'GET' },
    { name: 'Game State', url: `${API_URL}/api/gamestate-get`, method: 'GET' },
    { name: 'Teams', url: `${API_URL}/api/teams-get`, method: 'GET' },
    { name: 'Matches', url: `${API_URL}/api/matches-get`, method: 'GET' },
    { name: 'Validations', url: `${API_URL}/api/validations-get`, method: 'GET' },
  ]

  const testEndpoint = async (endpoint: { name: string; url: string; method: string }): Promise<HealthStatus> => {
    const startTime = Date.now()
    
    try {
      const response = await fetch(endpoint.url, {
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const responseTime = Date.now() - startTime
      
      if (!response.ok) {
        return {
          endpoint: endpoint.name,
          status: 'error',
          responseTime,
          error: `HTTP ${response.status}: ${response.statusText}`,
        }
      }

      const data = await response.json()

      return {
        endpoint: endpoint.name,
        status: 'ok',
        responseTime,
        data,
      }
    } catch (error: any) {
      return {
        endpoint: endpoint.name,
        status: 'error',
        responseTime: Date.now() - startTime,
        error: error.message || 'Network error',
      }
    }
  }

  const runHealthChecks = async () => {
    console.log('[DEBUG] Starting health checks...')
    setHealth(endpoints.map(e => ({ endpoint: e.name, status: 'pending' })))
    
    const results = await Promise.all(
      endpoints.map(async (endpoint) => {
        try {
          return await testEndpoint(endpoint)
        } catch (error) {
          console.error('[DEBUG] Error testing endpoint:', endpoint.name, error)
          return {
            endpoint: endpoint.name,
            status: 'error' as const,
            error: 'Failed to test endpoint'
          }
        }
      })
    )
    
    console.log('[DEBUG] Health check results:', results)
    setHealth(results)
    setServerTime(new Date())
    setIsLoading(false)
  }

  useEffect(() => {
    console.log('[DEBUG] Component mounted')
    runHealthChecks()
    
    const timer = setInterval(() => {
      setClientTime(new Date())
    }, 1000)

    return () => {
      console.log('[DEBUG] Component unmounting')
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(runHealthChecks, 5000)
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  const getStatusIcon = (status: 'ok' | 'error' | 'pending') => {
    switch (status) {
      case 'ok':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'pending':
        return <RefreshCw className="w-5 h-5 text-yellow-500 animate-spin" />
    }
  }

  const getStatusColor = (status: 'ok' | 'error' | 'pending') => {
    switch (status) {
      case 'ok':
        return 'bg-green-500/10 border-green-500'
      case 'error':
        return 'bg-red-500/10 border-red-500'
      case 'pending':
        return 'bg-yellow-500/10 border-yellow-500'
    }
  }

  const activeSessions = health.find(h => h.endpoint === 'Sessions')?.data?.filter((s: any) => s.active) || []
  const timeDiff = serverTime ? Math.abs(clientTime.getTime() - serverTime.getTime()) : 0

  console.log('[DEBUG] Rendering with:', { health: health.length, activeSessions: activeSessions.length, isLoading })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-slate-800 rounded-xl p-8 text-center">
            <RefreshCw className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
            <p className="text-xl">Carregando Debug Dashboard...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <button
          onClick={() => navigate('/admin')}
          className="mb-6 flex items-center gap-2 text-purple-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para Admin
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">🔍 Debug Dashboard</h1>
            <p className="text-purple-300">Monitor de saúde e diagnóstico do sistema</p>
            <p className="text-xs text-slate-500 mt-1">API URL: {API_URL || 'Not configured'}</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={runHealthChecks}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              Atualizar
            </button>

            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              disabled={isLoading}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                autoRefresh ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-700 hover:bg-slate-600'
              } disabled:bg-slate-600 disabled:cursor-not-allowed`}
            >
              <RefreshCw className={`w-5 h-5 ${autoRefresh ? 'animate-spin' : ''}`} />
              Auto (5s)
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Database className="w-6 h-6 text-purple-400" />
            Status das APIs
          </h2>

          {health.length === 0 && !isLoading && (
            <div className="text-center py-8 text-slate-400">
              <p>Nenhum dado de saúde disponível.</p>
              <button
                onClick={runHealthChecks}
                className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
              >
                Executar Health Check
              </button>
            </div>
          )}

          <div className="space-y-3">
            {health.map((h) => (
              <div
                key={h.endpoint}
                className={`p-4 rounded-lg border ${getStatusColor(h.status)}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(h.status)}
                    <span className="font-semibold">{h.endpoint}</span>
                  </div>
                  {h.responseTime !== undefined && (
                    <span className="text-sm text-slate-400">{h.responseTime}ms</span>
                  )}
                </div>

                {h.error && (
                  <div className="text-sm text-red-400 mt-2">❌ {h.error}</div>
                )}

                {h.data && (
                  <div className="text-sm text-slate-400 mt-2">
                    📦 {Array.isArray(h.data) ? `${h.data.length} items` : 'Data loaded'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Time Sync */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Clock className="w-6 h-6 text-purple-400" />
            Sincronização de Tempo
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Client Time</div>
              <div className="text-2xl font-mono">{clientTime.toLocaleTimeString()}</div>
              <div className="text-xs text-slate-500">{clientTime.toISOString()}</div>
            </div>

            {serverTime && (
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <div className="text-sm text-slate-400 mb-1">Server Time (Last Check)</div>
                <div className="text-2xl font-mono">{serverTime.toLocaleTimeString()}</div>
                <div className="text-xs text-slate-500">{serverTime.toISOString()}</div>
              </div>
            )}

            <div className={`p-4 rounded-lg border ${timeDiff > 2000 ? 'bg-yellow-500/10 border-yellow-500' : 'bg-green-500/10 border-green-500'}`}>
              <div className="text-sm text-slate-400 mb-1">Time Difference</div>
              <div className="text-2xl font-mono">
                {timeDiff > 0 ? `${(timeDiff / 1000).toFixed(1)}s` : 'Calculating...'}
              </div>
              {timeDiff > 2000 && (
                <div className="text-xs text-yellow-400 mt-2">⚠️ Diferença maior que 2s pode causar problemas!</div>
              )}
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6 lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">📡 Sessões Ativas</h2>

          {activeSessions.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              Nenhuma sessão ativa no momento
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeSessions.map((session: any) => (
                <div key={session.id} className="p-4 bg-slate-700/50 rounded-lg border border-purple-500/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-lg">Session {session.id}</span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Active</span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Round ID:</span>
                      <span className="font-mono">{session.roundId}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">Started At:</span>
                      <span className="font-mono text-xs">{session.startedAt ? new Date(session.startedAt).toLocaleTimeString() : 'N/A'}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">Ends At:</span>
                      <span className="font-mono text-xs">{session.endsAt ? new Date(session.endsAt).toLocaleTimeString() : 'N/A'}</span>
                    </div>

                    {session.endsAt && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Time Remaining:</span>
                        <span className="font-mono font-bold text-green-400">
                          {(() => {
                            const endsAt = new Date(session.endsAt)
                            const now = new Date()
                            const remaining = Math.max(0, Math.floor((endsAt.getTime() - now.getTime()) / 1000))
                            const mins = Math.floor(remaining / 60)
                            const secs = remaining % 60
                            return `${mins}:${String(secs).padStart(2, '0')}`
                          })()}
                        </span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-600">
                      <span className="text-slate-400 text-xs">Raw Data:</span>
                      <pre className="mt-1 p-2 bg-slate-900/50 rounded text-xs overflow-x-auto">
                        {JSON.stringify(session, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Configuration */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6 lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">⚙️ Configuração</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">API URL</div>
              <div className="font-mono text-xs break-all">{API_URL || 'Not configured'}</div>
            </div>

            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Environment</div>
              <div className="font-mono">{import.meta.env.MODE}</div>
            </div>

            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Build Time</div>
              <div className="font-mono text-xs">{new Date().toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
