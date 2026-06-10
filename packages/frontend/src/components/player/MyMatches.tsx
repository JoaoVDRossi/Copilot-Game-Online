import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trophy, Zap, Target, Wrench, CheckCircle, Clock, Award, Upload, Image as ImageIcon, XCircle, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react'
import { getCurrentTeam } from '../../utils/teamsManager'
import { getCurrentRoom } from '../../utils/roomManager'
import { getTeamMatchHistory, markMatchAsTested, resetMatchTestedStatus, type MatchHistory } from '../../utils/matchHistoryManager'
import { submitTestValidation, removeRejectedValidation } from '../../utils/testValidationManager'
import { getAllTestValidations } from '../../utils/testValidationManager'
import { getAllCards } from '../../utils/cardManager'
import type { Card } from '../../types'

const roundMeta: Record<string, { label: string; color: string }> = {
  'round-1': { label: 'Round 1 — Mestre das Notificações', color: '#EF4444' },
  'round-2': { label: 'Round 2 — Capitã Pesquisa Infinita', color: '#F59E0B' },
  'round-3': { label: 'Round 3 — Senhora Perfeccionista', color: '#FCD34D' },
  'round-4': { label: 'Round 4 — ControlC+V', color: '#EA580C' },
}
const ROUND_ORDER = ['round-1', 'round-2', 'round-3', 'round-4']

export default function MyMatches() {
  const navigate = useNavigate()
  const [matches, setMatches] = useState<MatchHistory[]>([])
  const [cards, setCards] = useState<Card[]>([])
  const [teamName, setTeamName] = useState('')
  const [validations, setValidations] = useState<any[]>([])
  const [selectedMatchForTest, setSelectedMatchForTest] = useState<string | null>(null)
  const [testImage, setTestImage] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [selectedRound, setSelectedRound] = useState<string>('round-1')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(key)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  // Compresses image to JPEG safely under Azure Table Storage 64KB string limit
  const compressImage = (dataUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onerror = () => reject(new Error('Falha ao carregar imagem'))
      img.onload = () => {
        // Helper: compress at given pixel dimensions, returns base64 string
        const tryCompress = (maxDim: number): string => {
          let width = img.width
          let height = img.height
          // Scale down proportionally so the longest side fits within maxDim
          if (width >= height) {
            if (width > maxDim) { height = Math.round(height * maxDim / width); width = maxDim }
          } else {
            if (height > maxDim) { width = Math.round(width * maxDim / height); height = maxDim }
          }
          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')!
          ctx.drawImage(img, 0, 0, width, height)
          // Iterate quality from 0.5 down to 0.05 until result fits
          const THRESHOLD = 38000 // ~28KB — safely under Azure's 64KB UTF-8 string limit
          let quality = 0.5
          let result = canvas.toDataURL('image/jpeg', quality)
          while (result.length > THRESHOLD && quality > 0.05) {
            quality = Math.round((quality - 0.05) * 100) / 100
            result = canvas.toDataURL('image/jpeg', quality)
          }
          return result
        }

        // Pass 1: scale longest side to 480px
        let result = tryCompress(480)
        // Pass 2: if still too large, halve to 240px
        if (result.length > 38000) result = tryCompress(240)
        // Pass 3: last resort 120px
        if (result.length > 38000) result = tryCompress(120)

        resolve(result)
      }
      img.src = dataUrl
    })
  }

  useEffect(() => {
    const currentTeam = getCurrentTeam()
    if (!currentTeam) {
      navigate('/')
      return
    }

    setTeamName(currentTeam.name)
    const history = getTeamMatchHistory(currentTeam.id)
    setMatches(history)
    setCards(getAllCards())
    getAllTestValidations().then(v => setValidations(v))

    // Poll validations every 5 seconds so player sees rejection/approval without refresh
    const pollInterval = setInterval(() => {
      getAllTestValidations().then(v => setValidations(v))
    }, 5000)

    return () => clearInterval(pollInterval)
  }, [navigate])

  const getCardById = (cardId: string): Card | undefined => {
    return cards.find(card => card.id === cardId)
  }

  const isMatchValidated = (matchId: string): boolean => {
    return validations.some(v => v.matchId === matchId && v.validated && !v.rejected)
  }

  const getMatchRejection = (matchId: string) => {
    return validations.find(v => v.matchId === matchId && v.rejected)
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('❌ Por favor, selecione uma imagem válida')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('❌ A imagem deve ter no máximo 5MB')
      return
    }

    // Convert to base64 and compress to fit Azure Table Storage limits
    const reader = new FileReader()
    reader.onloadend = async () => {
      const compressed = await compressImage(reader.result as string)
      setTestImage(compressed)
    }
    reader.readAsDataURL(file)
  }

  const handleTestSubmit = (match: MatchHistory) => {
    // If match was rejected, clear the rejected validation and reset tested status
    const rejection = getMatchRejection(match.id)
    if (rejection) {
      console.log('♻️ Preparing resubmission for rejected match:', match.id)
      removeRejectedValidation(match.id)
      resetMatchTestedStatus(match.id)
      
      // Update local state to reflect reset
      setMatches(prev => prev.map(m => 
        m.id === match.id ? { ...m, tested: false } : m
      ))
      
      // Reload validations to reflect removal
      getAllTestValidations().then(v => setValidations(v))
    }
    
    setSelectedMatchForTest(match.id)
    setTestImage(null)
  }

  const handleConfirmTest = async () => {
    if (!selectedMatchForTest) return
    
    if (!testImage) {
      alert('❌ Por favor, selecione uma imagem do teste antes de enviar')
      return
    }

    const match = matches.find(m => m.id === selectedMatchForTest)
    if (!match) return

    const useCaseCard = getCardById(match.useCaseCardId)
    if (!useCaseCard) return

    const currentTeam = getCurrentTeam()
    if (!currentTeam) return

    console.log('📤 Submitting test validation:', {
      matchId: match.id,
      teamId: match.teamId,
      useCaseTitle: useCaseCard.title,
      hasImage: !!testImage
    })

    // Submit to validation queue with image
    const success = await submitTestValidation(
      match.id,
      match.teamId,
      match.teamName,
      match.roundId,
      match.useCaseCardId,
      useCaseCard.title,
      testImage,
      getCurrentRoom()?.id  // pass roomId so GM can filter by room
    )

    if (!success) {
      alert('❌ Erro ao enviar o teste. Tente novamente.\n\nSe o problema persistir, tente usar uma imagem menor.')
      return
    }

    // Mark as tested in history
    markMatchAsTested(match.id)

    // Update local state
    setMatches(prev => prev.map(m => 
      m.id === match.id ? { ...m, tested: true } : m
    ))

    // Reset state
    setSelectedMatchForTest(null)
    setTestImage(null)

    // Reload validations to show the new pending test
    const updated = await getAllTestValidations()
    setValidations(updated)

    alert('✅ Teste enviado para validação!\n\nO facilitador verificará sua implementação.')
  }

  const handleCancelTest = () => {
    setSelectedMatchForTest(null)
    setTestImage(null)
  }

  const roundNames: Record<string, string> = {
    'round-1': 'Round 1 - Mestre das Notificações',
    'round-2': 'Round 2 - Capitã Pesquisa Infinita',
    'round-3': 'Round 3 - Senhora Perfeccionista',
    'round-4': 'Round 4 - ControlC+V'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#0a0a1a]">
      {/* Header */}
      <div className="bg-bg-secondary border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/rounds')}
                className="flex items-center gap-2 text-neutral-400 hover:text-neutral-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Voltar</span>
              </button>
              <div className="w-px h-6 bg-white/10" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-battle-green/20 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-battle-green" />
                </div>
                <div>
                  <h1 className="font-display text-xl font-bold text-neutral-50">
                    Meus Matchs
                  </h1>
                  <p className="text-sm text-neutral-400">
                    Combinações corretas do time {teamName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-bg-secondary rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-battle-green" />
              <div>
                <p className="text-sm text-neutral-400">Total de Matchs</p>
                <p className="text-2xl font-bold text-neutral-50">{matches.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-bg-secondary rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-battle-blue" />
              <div>
                <p className="text-sm text-neutral-400">Aguardando Teste</p>
                <p className="text-2xl font-bold text-neutral-50">
                  {matches.filter(m => !m.tested).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-bg-secondary rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-battle-yellow" />
              <div>
                <p className="text-sm text-neutral-400">Enviados</p>
                <p className="text-2xl font-bold text-neutral-50">
                  {matches.filter(m => m.tested).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-bg-secondary rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-battle-purple" />
              <div>
                <p className="text-sm text-neutral-400">Validados (+10pts)</p>
                <p className="text-2xl font-bold text-neutral-50">
                  {matches.filter(m => isMatchValidated(m.id)).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Round Sub-tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {ROUND_ORDER.map(roundId => {
            const count = matches.filter(m => m.roundId === roundId).length
            return (
              <button
                key={roundId}
                onClick={() => setSelectedRound(roundId)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors border ${
                  selectedRound === roundId
                    ? 'bg-battle-purple/20 border-battle-purple/60 text-battle-purple'
                    : 'bg-bg-secondary border-white/10 text-neutral-400 hover:text-neutral-200 hover:border-white/30'
                }`}
              >
                {roundMeta[roundId]?.label.split(' — ')[0] || roundId}
                {count > 0 && (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    selectedRound === roundId ? 'bg-battle-purple/30 text-battle-purple' : 'bg-neutral-700 text-neutral-400'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Matches List */}
        {matches.filter(m => m.roundId === selectedRound).length === 0 ? (
          <div className="bg-bg-secondary rounded-xl p-12 border border-white/10 text-center">
            <Trophy className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-neutral-400 mb-2">
              {matches.length === 0 ? 'Nenhum match registrado ainda' : 'Nenhum match neste round'}
            </h3>
            <p className="text-sm text-neutral-500">
              {matches.length === 0
                ? 'Complete rounds para ver suas combinações corretas aqui!'
                : 'Complete combinações no jogo para ver os matchs deste round aqui.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {matches.filter(m => m.roundId === selectedRound).map((match) => {
              const promptCard = getCardById(match.promptCardId)
              const useCaseCard = getCardById(match.useCaseCardId)
              const toolCard = getCardById(match.toolCardId)
              const matchDate = new Date(match.timestamp)

              return (
                <div
                  key={match.id}
                  className={`bg-bg-secondary rounded-xl p-6 border transition-colors ${
                    getMatchRejection(match.id)
                      ? 'border-battle-red/70 hover:border-battle-red'
                      : isMatchValidated(match.id)
                        ? 'border-battle-purple/50 hover:border-battle-purple'
                        : 'border-white/10 hover:border-battle-green/50'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-battle-purple/20 flex items-center justify-center">
                        <span className="text-battle-purple font-bold text-sm">
                          {match.roundId.split('-')[1]}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-neutral-200">
                          {roundNames[match.roundId]}
                        </h3>
                        <p className="text-xs text-neutral-500">
                          {matchDate.toLocaleDateString('pt-BR')} às {matchDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    
                    {(() => {
                      const rejection = getMatchRejection(match.id)
                      if (rejection) {
                        return (
                          <div className="flex items-center gap-2 px-4 py-2 bg-battle-red/20 border border-battle-red/50 rounded-lg">
                            <XCircle className="w-5 h-5 text-battle-red" />
                            <span className="text-sm font-bold text-battle-red">Match Invalidado</span>
                          </div>
                        )
                      }
                      if (isMatchValidated(match.id)) {
                        return (
                          <div className="flex items-center gap-2 px-4 py-2 bg-battle-green/20 border border-battle-green/50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-battle-green" />
                            <span className="text-sm font-bold text-battle-green">Match Validado ✓</span>
                          </div>
                        )
                      }
                      if (match.tested) {
                        return (
                          <div className="flex items-center gap-2 text-battle-blue">
                            <Clock className="w-5 h-5" />
                            <span className="text-sm font-semibold">Aguardando Validação</span>
                          </div>
                        )
                      }
                      return null
                    })()}
                  </div>

                  {/* Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Caso de Uso — verde */}
                    <div className="bg-bg-primary rounded-lg p-4 border-l-4 border-battle-green">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-battle-green" />
                        <span className="text-xs font-bold text-battle-green uppercase">Caso de Uso</span>
                      </div>
                      <p className="text-sm font-semibold text-neutral-200">{useCaseCard?.title || 'Card não encontrado'}</p>
                      {useCaseCard?.description && (
                        <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{useCaseCard.description}</p>
                      )}
                      <button
                        onClick={() => {
                          const text = [useCaseCard?.title, useCaseCard?.description].filter(Boolean).join('\n\n')
                          if (text) handleCopy(text, `uc-${match.id}`)
                        }}
                        className={`mt-3 w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
                          copiedId === `uc-${match.id}`
                            ? 'bg-battle-green/20 text-battle-green border-battle-green/50'
                            : 'bg-neutral-800 hover:bg-battle-green/10 text-neutral-400 hover:text-battle-green border-neutral-700 hover:border-battle-green/40'
                        }`}
                      >
                        {copiedId === `uc-${match.id}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedId === `uc-${match.id}` ? 'Copiado!' : 'Copiar Caso de Uso'}
                      </button>
                    </div>

                    {/* Prompt — laranja */}
                    <div className="bg-bg-primary rounded-lg p-4 border-l-4 border-orange-500">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-orange-400" />
                        <span className="text-xs font-bold text-orange-400 uppercase">Prompt</span>
                      </div>
                      <p className="text-sm font-semibold text-neutral-200">{promptCard?.title || 'Card não encontrado'}</p>
                      {promptCard?.description && (
                        <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{promptCard.description}</p>
                      )}
                      <button
                        onClick={() => {
                          const text = [promptCard?.title, promptCard?.description].filter(Boolean).join('\n\n')
                          if (text) handleCopy(text, `pr-${match.id}`)
                        }}
                        className={`mt-3 w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
                          copiedId === `pr-${match.id}`
                            ? 'bg-orange-500/20 text-orange-400 border-orange-500/50'
                            : 'bg-neutral-800 hover:bg-orange-500/10 text-neutral-400 hover:text-orange-400 border-neutral-700 hover:border-orange-500/40'
                        }`}
                      >
                        {copiedId === `pr-${match.id}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedId === `pr-${match.id}` ? 'Copiado!' : 'Copiar Prompt'}
                      </button>
                    </div>

                    {/* Ferramenta — lilás */}
                    <div className="bg-bg-primary rounded-lg p-4 border-l-4 border-battle-purple">
                      <div className="flex items-center gap-2 mb-2">
                        <Wrench className="w-4 h-4 text-battle-purple" />
                        <span className="text-xs font-bold text-battle-purple uppercase">Ferramenta</span>
                      </div>
                      <p className="text-sm font-semibold text-neutral-200">{toolCard?.title || 'Card não encontrado'}</p>
                      {toolCard?.description && (
                        <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{toolCard.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Status / Feedback / Action area */}
                  <div className="mt-2">
                    {(() => {
                      const rejection = getMatchRejection(match.id)

                      // ── REJECTED ─────────────────────────────────────────
                      if (rejection) {
                        return (
                          <div className="bg-battle-red/10 border border-battle-red/40 rounded-lg p-4 flex items-start gap-3">
                            <XCircle className="w-5 h-5 text-battle-red flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-bold text-battle-red mb-1">❌ Match Invalidado</p>
                              <p className="text-sm text-neutral-200">{rejection.rejectionReason}</p>
                              {rejection.rejectedAt && (
                                <p className="text-xs text-neutral-500 mt-1">
                                  Avaliado em {new Date(rejection.rejectedAt).toLocaleString('pt-BR')}
                                </p>
                              )}
                            </div>
                          </div>
                        )
                      }

                      // ── VALIDATED ────────────────────────────────────────
                      if (isMatchValidated(match.id)) {
                        return (
                          <div className="bg-battle-green/10 border border-battle-green/40 rounded-lg p-4 flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-battle-green flex-shrink-0" />
                            <div>
                              <p className="text-sm font-bold text-battle-green">🎉 Parabéns, seu match foi validado!</p>
                              <p className="text-xs text-neutral-400 mt-0.5">+10 pontos adicionados ao seu time</p>
                            </div>
                          </div>
                        )
                      }

                      // ── AWAITING VALIDATION ───────────────────────────────
                      if (match.tested) {
                        return (
                          <div className="flex justify-end">
                            <div className="px-6 py-2 bg-battle-blue/10 border border-battle-blue/30 text-battle-blue rounded-lg text-sm font-semibold flex items-center gap-2 cursor-not-allowed">
                              <Clock className="w-4 h-4" />
                              Aguardando Validação
                            </div>
                          </div>
                        )
                      }

                      // ── IMAGE UPLOAD (selecting test) ─────────────────────
                      if (selectedMatchForTest === match.id) {
                        return (
                          <div className="w-full space-y-4">
                            <div className="bg-bg-primary rounded-lg p-4 border-2 border-dashed border-battle-blue/50">
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageSelect}
                                className="hidden"
                              />
                              {testImage ? (
                                <div className="space-y-3">
                                  <img
                                    src={testImage}
                                    alt="Preview do teste"
                                    className="w-full max-h-64 object-contain rounded-lg"
                                  />
                                  <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                                  >
                                    <Upload className="w-4 h-4" />
                                    Trocar Imagem
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => fileInputRef.current?.click()}
                                  className="w-full py-8 text-neutral-400 hover:text-battle-blue transition-colors flex flex-col items-center gap-2"
                                >
                                  <ImageIcon className="w-12 h-12" />
                                  <span className="text-sm font-medium">Clique para selecionar a imagem do teste</span>
                                  <span className="text-xs text-neutral-500">PNG, JPG ou GIF (máx. 5MB)</span>
                                </button>
                              )}
                            </div>
                            <div className="flex gap-3">
                              <button
                                onClick={handleCancelTest}
                                className="flex-1 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg text-sm font-semibold transition-colors"
                              >
                                Cancelar
                              </button>
                              <button
                                onClick={handleConfirmTest}
                                disabled={!testImage}
                                className="flex-1 px-4 py-2 bg-battle-green hover:bg-battle-green/90 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Enviar Teste
                              </button>
                            </div>
                          </div>
                        )
                      }

                      // ── NOT YET SUBMITTED ─────────────────────────────────
                      return (
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleTestSubmit(match)}
                            className="px-6 py-2 bg-battle-blue hover:bg-battle-blue/90 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Testei o Caso de Uso
                          </button>
                        </div>
                      )
                    })()}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
