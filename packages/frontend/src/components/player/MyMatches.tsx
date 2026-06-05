import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trophy, Zap, Target, Wrench, CheckCircle, Clock, Award, Upload, Image as ImageIcon, XCircle, AlertCircle } from 'lucide-react'
import { getCurrentTeam } from '../../utils/teamsManager'
import { getCurrentRoom } from '../../utils/roomManager'
import { getTeamMatchHistory, markMatchAsTested, resetMatchTestedStatus, type MatchHistory } from '../../utils/matchHistoryManager'
import { submitTestValidation, removeRejectedValidation } from '../../utils/testValidationManager'
import { getAllTestValidations } from '../../utils/testValidationManager'
import { getAllCards } from '../../utils/cardManager'
import type { Card } from '../../types'

export default function MyMatches() {
  const navigate = useNavigate()
  const [matches, setMatches] = useState<MatchHistory[]>([])
  const [cards, setCards] = useState<Card[]>([])
  const [teamName, setTeamName] = useState('')
  const [validations, setValidations] = useState<any[]>([])
  const [selectedMatchForTest, setSelectedMatchForTest] = useState<string | null>(null)
  const [testImage, setTestImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Compresses image to JPEG ≤ 45KB to fit Azure Table Storage 64KB property limit
  const compressImage = (dataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const MAX_WIDTH = 640
        let width = img.width
        let height = img.height
        if (width > MAX_WIDTH) {
          height = Math.round(height * MAX_WIDTH / width)
          width = MAX_WIDTH
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0, width, height)
        // Try reducing quality until base64 string fits under ~45KB
        let quality = 0.6
        let result = canvas.toDataURL('image/jpeg', quality)
        while (result.length > 45000 && quality > 0.1) {
          quality -= 0.1
          result = canvas.toDataURL('image/jpeg', quality)
        }
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

  const handleConfirmTest = () => {
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
    submitTestValidation(
      match.id,
      match.teamId,
      match.teamName,
      match.roundId,
      match.useCaseCardId,
      useCaseCard.title,
      testImage,
      getCurrentRoom()?.id  // pass roomId so GM can filter by room
    )

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
    getAllTestValidations().then(v => setValidations(v))

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

        {/* Matches List */}
        {matches.length === 0 ? (
          <div className="bg-bg-secondary rounded-xl p-12 border border-white/10 text-center">
            <Trophy className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-neutral-400 mb-2">
              Nenhum match registrado ainda
            </h3>
            <p className="text-sm text-neutral-500">
              Complete rounds para ver suas combinações corretas aqui!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {matches.map((match) => {
              const promptCard = getCardById(match.promptCardId)
              const useCaseCard = getCardById(match.useCaseCardId)
              const toolCard = getCardById(match.toolCardId)
              const matchDate = new Date(match.timestamp)

              return (
                <div
                  key={match.id}
                  className="bg-bg-secondary rounded-xl p-6 border border-white/10 hover:border-battle-green/50 transition-colors"
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
                            <span className="text-sm font-bold text-battle-red">Teste Rejeitado</span>
                          </div>
                        )
                      }
                      if (isMatchValidated(match.id)) {
                        return (
                          <div className="flex items-center gap-2 px-4 py-2 bg-battle-purple/20 border border-battle-purple/50 rounded-lg">
                            <Award className="w-5 h-5 text-battle-purple" />
                            <span className="text-sm font-bold text-battle-purple">Validado +10 pts</span>
                          </div>
                        )
                      }
                      if (match.tested) {
                        return (
                          <div className="flex items-center gap-2 text-battle-green">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm font-semibold">Enviado para Validação</span>
                          </div>
                        )
                      }
                      return null
                    })()}
                  </div>

                  {/* Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Prompt */}
                    <div className="bg-bg-primary rounded-lg p-4 border-l-4 border-battle-blue">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-battle-blue" />
                        <span className="text-xs font-bold text-battle-blue uppercase">Prompt</span>
                      </div>
                      <p className="text-sm text-neutral-200 font-medium">
                        {promptCard?.title || 'Card não encontrado'}
                      </p>
                      {promptCard?.description && (
                        <p className="text-xs text-neutral-500 mt-2">{promptCard.description}</p>
                      )}
                    </div>

                    {/* Use Case */}
                    <div className="bg-bg-primary rounded-lg p-4 border-l-4 border-battle-purple">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-battle-purple" />
                        <span className="text-xs font-bold text-battle-purple uppercase">Caso de Uso</span>
                      </div>
                      <p className="text-sm text-neutral-200 font-medium">
                        {useCaseCard?.title || 'Card não encontrado'}
                      </p>
                      {useCaseCard?.description && (
                        <p className="text-xs text-neutral-500 mt-2">{useCaseCard.description}</p>
                      )}

                    </div>

                    {/* Tool */}
                    <div className="bg-bg-primary rounded-lg p-4 border-l-4 border-battle-green">
                      <div className="flex items-center gap-2 mb-2">
                        <Wrench className="w-4 h-4 text-battle-green" />
                        <span className="text-xs font-bold text-battle-green uppercase">Ferramenta</span>
                      </div>
                      <p className="text-sm text-neutral-200 font-medium">
                        {toolCard?.title || 'Card não encontrado'}
                      </p>
                      {toolCard?.description && (
                        <p className="text-xs text-neutral-500 mt-2">{toolCard.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Rejection Feedback */}
                  {(() => {
                    const rejection = getMatchRejection(match.id)
                    if (rejection) {
                      return (
                        <div className="mb-4 bg-battle-red/10 border-l-4 border-battle-red rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-battle-red flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-bold text-battle-red mb-2">Feedback do Avaliador:</h4>
                              <p className="text-sm text-neutral-300">{rejection.rejectionReason}</p>
                              <p className="text-xs text-neutral-500 mt-2">
                                Rejeitado em: {new Date(rejection.rejectedAt!).toLocaleString('pt-BR')}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  })()}

                  {/* Action Button */}
                  <div className="flex justify-end">
                    {getMatchRejection(match.id) ? (
                      <button
                        onClick={() => handleTestSubmit(match)}
                        className="px-6 py-2 bg-battle-blue hover:bg-battle-blue/90 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Enviar Novo Teste
                      </button>
                    ) : isMatchValidated(match.id) ? (
                      <div className="px-6 py-2 bg-battle-purple/10 border border-battle-purple/30 text-battle-purple rounded-lg text-sm font-semibold cursor-not-allowed flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        ✓ Validado (+10 pontos)
                      </div>
                    ) : match.tested ? (
                      <div className="px-6 py-2 bg-battle-green/10 border border-battle-green/30 text-battle-green rounded-lg text-sm font-semibold cursor-not-allowed">
                        ✓ Teste Enviado
                      </div>
                    ) : selectedMatchForTest === match.id ? (
                      <div className="w-full space-y-4">
                        {/* Image Upload */}
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
                        
                        {/* Action Buttons */}
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
                    ) : (
                      <button
                        onClick={() => handleTestSubmit(match)}
                        className="px-6 py-2 bg-battle-blue hover:bg-battle-blue/90 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Testei o Caso de Uso
                      </button>
                    )}
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
