import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, ArrowLeft, CheckCircle, Zap, Target, Wrench } from 'lucide-react'
import { getAllMatchRules } from '../../utils/cardManager'
import { getAllCards } from '../../utils/cardManager'
import type { MatchRule, Card } from '../../types'

export default function AnswerKey() {
  const navigate = useNavigate()
  const [matchRules, setMatchRules] = useState<MatchRule[]>([])
  const [cards, setCards] = useState<Card[]>([])
  const [selectedRound, setSelectedRound] = useState<string | null>(null)

  useEffect(() => {
    const rules = getAllMatchRules().filter(rule => rule.active)
    const allCards = getAllCards()
    setMatchRules(rules)
    setCards(allCards)
  }, [])

  const getCardById = (cardId: string): Card | undefined => {
    return cards.find(card => card.id === cardId)
  }

  const groupedByRound = matchRules.reduce((acc, rule) => {
    if (!acc[rule.roundId]) {
      acc[rule.roundId] = []
    }
    acc[rule.roundId].push(rule)
    return acc
  }, {} as Record<string, MatchRule[]>)

  const roundNames: Record<string, string> = {
    'round-1': 'Round 1 - Mestre das Notificações',
    'round-2': 'Round 2 - Capitã Pesquisa Infinita',
    'round-3': 'Round 3 - Senhora Perfeccionista',
    'round-4': 'Round 4 - ControlC+V'
  }

  const filteredRules = selectedRound 
    ? matchRules.filter(rule => rule.roundId === selectedRound)
    : matchRules

  const filteredGrouped = selectedRound
    ? { [selectedRound]: groupedByRound[selectedRound] || [] }
    : groupedByRound

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
                  <BookOpen className="w-5 h-5 text-battle-green" />
                </div>
                <div>
                  <h1 className="font-display text-xl font-bold text-neutral-50">
                    Gabarito Completo
                  </h1>
                  <p className="text-sm text-neutral-400">
                    Todas as combinações corretas do jogo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Round Filter */}
        <div className="bg-bg-secondary rounded-xl p-6 border border-white/10 mb-6">
          <h3 className="font-display text-lg font-bold text-neutral-50 mb-4">Filtrar por Round</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedRound(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedRound === null
                  ? 'bg-battle-blue text-white'
                  : 'bg-bg-primary text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Todos os Rounds
            </button>
            {['round-1', 'round-2', 'round-3', 'round-4'].map(roundId => (
              <button
                key={roundId}
                onClick={() => setSelectedRound(roundId)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedRound === roundId
                    ? 'bg-battle-blue text-white'
                    : 'bg-bg-primary text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {roundNames[roundId]}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-bg-secondary rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-battle-green" />
              <div>
                <p className="text-sm text-neutral-400">Total de Combinações</p>
                <p className="text-2xl font-bold text-neutral-50">{filteredRules.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-bg-secondary rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-battle-purple" />
              <div>
                <p className="text-sm text-neutral-400">Rounds com Gabarito</p>
                <p className="text-2xl font-bold text-neutral-50">{Object.keys(filteredGrouped).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-bg-secondary rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-battle-blue" />
              <div>
                <p className="text-sm text-neutral-400">Visualizando</p>
                <p className="text-lg font-bold text-neutral-50">
                  {selectedRound ? roundNames[selectedRound] : 'Todos'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Answer Key by Round */}
        {Object.entries(filteredGrouped)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([roundId, rules]: [string, MatchRule[]]) => (
          <div key={roundId} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-battle-purple/20 flex items-center justify-center">
                <span className="text-battle-purple font-bold">{roundId}</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-neutral-50">
                {roundNames[roundId]}
              </h2>
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-sm text-neutral-400">
                {rules.length} {rules.length === 1 ? 'combinação' : 'combinações'}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {rules.map((rule, index) => {
                const promptCard = getCardById(rule.promptCardId)
                const useCaseCard = getCardById(rule.useCaseCardId)
                const toolCard = getCardById(rule.toolCardId)

                return (
                  <div
                    key={rule.id}
                    className="bg-bg-secondary rounded-xl p-6 border border-white/10 hover:border-battle-green/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-battle-green/20 flex items-center justify-center">
                        <span className="text-battle-green font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        {/* Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          {/* Prompt Card */}
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

                          {/* Use Case Card */}
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

                          {/* Tool Card */}
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

                        {/* Explanation */}
                        {rule.explanation && (
                          <div className="bg-battle-green/10 rounded-lg p-4 border border-battle-green/30">
                            <div className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-battle-green flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-xs font-bold text-battle-green uppercase mb-1">Por que essa combinação funciona?</p>
                                <p className="text-sm text-neutral-300">{rule.explanation}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Villain Message */}
                        {rule.villainMessage && (
                          <div className="bg-battle-purple/10 rounded-lg p-4 border border-battle-purple/30 mt-3">
                            <div className="flex items-start gap-2">
                              <div className="text-xl">🦹</div>
                              <div>
                                <p className="text-xs font-bold text-battle-purple uppercase mb-1">Mensagem do Vilão</p>
                                <p className="text-sm text-neutral-300 italic">&ldquo;{rule.villainMessage}&rdquo;</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {filteredRules.length === 0 && (
          <div className="bg-bg-secondary rounded-xl p-12 border border-white/10 text-center">
            <BookOpen className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-neutral-400 mb-2">
              Nenhum gabarito encontrado
            </h3>
            <p className="text-sm text-neutral-500">
              {selectedRound 
                ? 'Não há gabaritos cadastrados para este round.'
                : 'Não há gabaritos cadastrados no sistema.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
