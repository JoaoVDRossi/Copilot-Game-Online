import { useState, useRef } from 'react'
import { Shield, Plus, Trash2, Check, X, LogOut, Edit, CheckCircle, Target, Upload, DoorOpen } from 'lucide-react'
import RoomManagement from './RoomManagement'
import { Card, CardType, DifficultyLevel, MatchRule } from '../../types'
import { useNavigate } from 'react-router-dom'
import {
  getAllCards,
  getAllMatchRules,
  saveAllCards,
  saveAllMatchRules,
} from '../../utils/cardManager'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'rooms' | 'cards' | 'answers'>('cards')
  const [cards, setCards] = useState<Card[]>(getAllCards())
  const [matchRules, setMatchRules] = useState<MatchRule[]>(getAllMatchRules())
  const [isCreating, setIsCreating] = useState(false)
  const [editingCardId, setEditingCardId] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<'all' | CardType>('all')
  const [filterRound, setFilterRound] = useState<string>('all')

  const [newCard, setNewCard] = useState<Partial<Card>>({
    type: 'prompt',
    title: '',
    description: '',
    image: '',
    roundId: 'round-1',
    villainTheme: 'mestre-notificacoes',
    active: true,
    difficulty: 'easy',
  })
  const [cardImagePreview, setCardImagePreview] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  // Match Rules states
  const [isCreatingRule, setIsCreatingRule] = useState(false)
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null)
  const [filterRuleRound, setFilterRuleRound] = useState<string>('all')
  const [newRule, setNewRule] = useState<Partial<MatchRule>>({
    roundId: 'round-1',
    promptCardId: '',
    useCaseCardId: '',
    toolCardId: '',
    explanation: '',
    villainMessage: '',
    active: true,
  })


  const tabs = [
    { id: 'rooms', label: 'Salas', icon: DoorOpen },
    { id: 'cards', label: 'Gerenciar Cards', icon: Plus },
    { id: 'answers', label: 'Gabaritos', icon: CheckCircle },
  ]

  const handleSaveCard = () => {
    if (!newCard.title || !newCard.description) {
      alert('Preencha todos os campos!')
      return
    }

    if (editingCardId) {
      // Update existing card
      const updatedCards = cards.map(c =>
        c.id === editingCardId
          ? {
              ...c,
              type: newCard.type as CardType,
              title: newCard.title!,
              description: newCard.description!,
              image: cardImagePreview || c.image,
              roundId: newCard.roundId!,
              villainTheme: newCard.villainTheme!,
              difficulty: newCard.difficulty as DifficultyLevel,
            }
          : c
      )
      setCards(updatedCards)
      saveAllCards(updatedCards) // Persist to localStorage
      setEditingCardId(null)
    } else {
      // Create new card
      const card: Card = {
        id: `custom-${Date.now()}`,
        type: newCard.type as CardType,
        title: newCard.title!,
        description: newCard.description!,
        image: newCard.image || cardImagePreview || '',
        roundId: newCard.roundId!,
        villainTheme: newCard.villainTheme!,
        active: newCard.active!,
        difficulty: newCard.difficulty as DifficultyLevel,
      }
      const updatedCards = [...cards, card]
      setCards(updatedCards)
      saveAllCards(updatedCards) // Persist to localStorage
    }

    setIsCreating(false)
    setCardImagePreview('')
    setNewCard({
      type: 'prompt',
      title: '',
      description: '',
      image: '',
      roundId: 'round-1',
      villainTheme: 'mestre-notificacoes',
      difficulty: 'easy',
      active: true,
    })
  }

  const handleEditCard = (card: Card) => {
    setNewCard({
      type: card.type,
      title: card.title,
      description: card.description,
      roundId: card.roundId,
      villainTheme: card.villainTheme,
      active: card.active,
      difficulty: card.difficulty,
    })
    setCardImagePreview(card.image || '')
    setEditingCardId(card.id)
    setIsCreating(true)
  }

  const handleCancelEdit = () => {
    setIsCreating(false)
    setEditingCardId(null)
    setCardImagePreview('')
    setNewCard({
      type: 'prompt',
      title: '',
      description: '',
      image: '',
      roundId: 'round-1',
      villainTheme: 'mestre-notificacoes',
      difficulty: 'easy',
      active: true,
    })
  }

  const handleDeleteCard = (cardId: string) => {
    if (confirm('Tem certeza que deseja excluir este card?')) {
      const updatedCards = cards.filter(c => c.id !== cardId)
      setCards(updatedCards)
      saveAllCards(updatedCards) // Persist to localStorage
    }
  }

  const handleToggleActive = (cardId: string) => {
    const updatedCards = cards.map(c => (c.id === cardId ? { ...c, active: !c.active } : c))
    setCards(updatedCards)
    saveAllCards(updatedCards) // Persist to localStorage
  }

  const handleAdminLogout = () => {
    if (confirm('Tem certeza que deseja sair do painel admin?')) {
      localStorage.removeItem('admin-session')
      navigate('/admin/login')
    }
  }

  // Match Rules handlers
  const handleSaveRule = () => {
    if (!newRule.promptCardId || !newRule.useCaseCardId || !newRule.toolCardId || !newRule.explanation || !newRule.villainMessage) {
      alert('Preencha todos os campos!')
      return
    }

    if (editingRuleId) {
      // Update existing rule
      const updatedRules = matchRules.map(r =>
        r.id === editingRuleId
          ? {
              ...r,
              roundId: newRule.roundId!,
              promptCardId: newRule.promptCardId!,
              useCaseCardId: newRule.useCaseCardId!,
              toolCardId: newRule.toolCardId!,
              explanation: newRule.explanation!,
              villainMessage: newRule.villainMessage!,
              active: newRule.active!,
            }
          : r
      )
      setMatchRules(updatedRules)
      saveAllMatchRules(updatedRules) // Persist to localStorage
      setEditingRuleId(null)
    } else {
      // Create new rule
      const rule: MatchRule = {
        id: `custom-rule-${Date.now()}`,
        roundId: newRule.roundId!,
        promptCardId: newRule.promptCardId!,
        useCaseCardId: newRule.useCaseCardId!,
        toolCardId: newRule.toolCardId!,
        explanation: newRule.explanation!,
        villainMessage: newRule.villainMessage!,
        active: newRule.active!,
      }
      const updatedRules = [...matchRules, rule]
      setMatchRules(updatedRules)
      saveAllMatchRules(updatedRules) // Persist to localStorage
    }

    setIsCreatingRule(false)
    setNewRule({
      roundId: 'round-1',
      promptCardId: '',
      useCaseCardId: '',
      toolCardId: '',
      explanation: '',
      villainMessage: '',
      active: true,
    })
  }

  const handleEditRule = (rule: MatchRule) => {
    setNewRule({
      roundId: rule.roundId,
      promptCardId: rule.promptCardId,
      useCaseCardId: rule.useCaseCardId,
      toolCardId: rule.toolCardId,
      explanation: rule.explanation,
      villainMessage: rule.villainMessage,
      active: rule.active,
    })
    setEditingRuleId(rule.id)
    setIsCreatingRule(true)
  }

  const handleCancelRuleEdit = () => {
    setIsCreatingRule(false)
    setEditingRuleId(null)
    setNewRule({
      roundId: 'round-1',
      promptCardId: '',
      useCaseCardId: '',
      toolCardId: '',
      explanation: '',
      villainMessage: '',
      active: true,
    })
  }

  const handleDeleteRule = (ruleId: string) => {
    if (confirm('Tem certeza que deseja excluir este gabarito?')) {
      const updatedRules = matchRules.filter(r => r.id !== ruleId)
      setMatchRules(updatedRules)
      saveAllMatchRules(updatedRules) // Persist to localStorage
    }
  }

  const handleToggleRuleActive = (ruleId: string) => {
    const updatedRules = matchRules.map(r => (r.id === ruleId ? { ...r, active: !r.active } : r))
    setMatchRules(updatedRules)
    saveAllMatchRules(updatedRules) // Persist to localStorage
  }

  return (
    <div className="relative min-h-screen lightning-border">
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-energy-primary/20 via-transparent to-battle-purple/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Shield className="w-10 h-10 text-energy-primary" />
            <div>
              <h1 className="font-display text-3xl font-extrabold text-neutral-50">
                ADMIN DASHBOARD
              </h1>
              <p className="text-sm text-neutral-400">
                Gerenciar conteúdo do jogo
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/debug')}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              title="Abrir Debug Dashboard"
            >
              <Target className="w-4 h-4" />
              <span className="font-semibold text-sm">Debug</span>
            </button>
            <button
              onClick={handleAdminLogout}
              className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-neutral-300 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-semibold text-sm">Sair</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-display font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-energy-primary text-white shadow-lg'
                    : 'bg-bg-secondary text-neutral-400 hover:bg-bg-tertiary'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Rooms Tab */}
        {/* Rooms Tab (read-only monitoring) */}
        {activeTab === 'rooms' && (
          <div className="space-y-6">
            <RoomManagement readOnly />
          </div>
        )}

        {/* Cards Management Tab */}
        {activeTab === 'cards' && (
          <div>
            {/* Create New Card Button */}
            <div className="mb-6">
              <button
                onClick={() => setIsCreating(!isCreating)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Criar Novo Card
              </button>
            </div>

            {/* Create Card Form */}
            {isCreating && (
              <div className="bg-bg-secondary rounded-xl p-6 mb-6 border border-energy-primary">
                <h3 className="font-display text-xl font-bold text-neutral-50 mb-4">
                  {editingCardId ? 'Editar Card' : 'Novo Card'}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-400 mb-2">
                      Tipo
                    </label>
                    <select
                      value={newCard.type}
                      onChange={e =>
                        setNewCard({ ...newCard, type: e.target.value as CardType })
                      }
                      className="w-full bg-bg-tertiary text-neutral-200 rounded-lg px-4 py-2 border border-neutral-700 focus:border-energy-primary focus:outline-none"
                    >
                      <option value="prompt">Prompt</option>
                      <option value="useCase">Caso de Uso</option>
                      <option value="tool">Ferramenta</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-400 mb-2">
                      Round
                    </label>
                    <select
                      value={newCard.roundId}
                      onChange={e => setNewCard({ ...newCard, roundId: e.target.value })}
                      className="w-full bg-bg-tertiary text-neutral-200 rounded-lg px-4 py-2 border border-neutral-700 focus:border-energy-primary focus:outline-none"
                    >
                      <option value="round-1">Round 1</option>
                      <option value="round-2">Round 2</option>
                      <option value="round-3">Round 3</option>
                      <option value="round-4">Round 4</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-400 mb-2">
                      Dificuldade
                    </label>
                    <select
                      value={newCard.difficulty}
                      onChange={e => setNewCard({ ...newCard, difficulty: e.target.value as DifficultyLevel })}
                      className="w-full bg-bg-tertiary text-neutral-200 rounded-lg px-4 py-2 border border-neutral-700 focus:border-energy-primary focus:outline-none"
                    >
                      <option value="easy">Fácil (0-40% do tempo)</option>
                      <option value="medium">Médio (40-70% do tempo)</option>
                      <option value="hard">Difícil (70-100% do tempo)</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-neutral-400 mb-2">
                      Título
                    </label>
                    <input
                      type="text"
                      value={newCard.title}
                      onChange={e => setNewCard({ ...newCard, title: e.target.value })}
                      placeholder="Ex: Resumir notificações"
                      className="w-full bg-bg-tertiary text-neutral-200 rounded-lg px-4 py-2 border border-neutral-700 focus:border-energy-primary focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-neutral-400 mb-2">
                      Descrição
                    </label>
                    <textarea
                      value={newCard.description}
                      onChange={e =>
                        setNewCard({ ...newCard, description: e.target.value })
                      }
                      placeholder="Descreva o card..."
                      rows={3}
                      className="w-full bg-bg-tertiary text-neutral-200 rounded-lg px-4 py-2 border border-neutral-700 focus:border-energy-primary focus:outline-none"
                    />
                  </div>
                  {/* Area field removed */}
                  
                  {/* Card Image Upload */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-neutral-400 mb-2">
                      Imagem do Card (PNG)
                    </label>
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (!file) return
                            if (file.size > 2 * 1024 * 1024) {
                              alert('Imagem muito grande! Máximo 2MB.')
                              return
                            }
                            const reader = new FileReader()
                            reader.onload = (ev) => {
                              const dataUrl = ev.target?.result as string
                              setCardImagePreview(dataUrl)
                              setNewCard(prev => ({ ...prev, image: dataUrl }))
                            }
                            reader.readAsDataURL(file)
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-2 bg-bg-tertiary hover:bg-neutral-700 text-neutral-300 px-4 py-2 rounded-lg border border-neutral-600 transition-colors text-sm"
                        >
                          <Upload className="w-4 h-4" />
                          {cardImagePreview ? 'Trocar Imagem' : 'Carregar PNG'}
                        </button>
                        <p className="text-xs text-neutral-500 mt-1">PNG, JPG ou WebP • Máximo 2MB</p>
                      </div>
                      {cardImagePreview && (
                        <div className="relative w-20 flex-shrink-0">
                          <img
                            src={cardImagePreview}
                            alt="Preview"
                            className="w-20 aspect-[5/7] object-contain rounded-lg border border-neutral-600 bg-bg-tertiary"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setCardImagePreview('')
                              setNewCard(prev => ({ ...prev, image: '' }))
                              if (fileInputRef.current) fileInputRef.current.value = ''
                            }}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-battle-red rounded-full flex items-center justify-center text-white text-xs"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleSaveCard}
                    className="bg-battle-green text-white px-6 py-2 rounded-lg font-semibold hover:bg-battle-green/90 transition-colors"
                  >
                    {editingCardId ? 'Atualizar Card' : 'Salvar Card'}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-neutral-700 text-neutral-200 px-6 py-2 rounded-lg font-semibold hover:bg-neutral-600 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Cards List */}
            <div className="bg-bg-secondary rounded-xl p-6 border border-neutral-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl font-bold text-neutral-50">
                  Cards Existentes ({cards.filter(c => 
                    (filterType === 'all' || c.type === filterType) &&
                    (filterRound === 'all' || c.roundId === filterRound)
                  ).length})
                </h3>
                
                {/* Filters */}
                <div className="flex items-center gap-3">
                  <select
                    value={filterType}
                    onChange={e => setFilterType(e.target.value as any)}
                    className="bg-bg-tertiary text-neutral-200 text-sm rounded-lg px-3 py-2 border border-neutral-700 focus:border-energy-primary focus:outline-none"
                  >
                    <option value="all">Todos os Tipos</option>
                    <option value="prompt">Prompts</option>
                    <option value="useCase">Casos de Uso</option>
                    <option value="tool">Ferramentas</option>
                  </select>
                  
                  <select
                    value={filterRound}
                    onChange={e => setFilterRound(e.target.value)}
                    className="bg-bg-tertiary text-neutral-200 text-sm rounded-lg px-3 py-2 border border-neutral-700 focus:border-energy-primary focus:outline-none"
                  >
                    <option value="all">Todos os Rounds</option>
                    <option value="round-1">Round 1</option>
                    <option value="round-2">Round 2</option>
                    <option value="round-3">Round 3</option>
                    <option value="round-4">Round 4</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {cards
                  .filter(c => 
                    (filterType === 'all' || c.type === filterType) &&
                    (filterRound === 'all' || c.roundId === filterRound)
                  )
                  .length === 0 ? (
                    <div className="text-center py-8 text-neutral-500">
                      <p className="mb-2">Nenhum card encontrado com os filtros aplicados.</p>
                      <button
                        onClick={() => {
                          setFilterType('all')
                          setFilterRound('all')
                        }}
                        className="text-sm text-energy-primary hover:underline"
                      >
                        Limpar filtros
                      </button>
                    </div>
                  ) : (
                    cards
                      .filter(c => 
                        (filterType === 'all' || c.type === filterType) &&
                        (filterRound === 'all' || c.roundId === filterRound)
                      )
                      .map(card => (
                  <div
                    key={card.id}
                    className={`bg-bg-tertiary/50 rounded-lg p-4 border transition-colors ${
                      card.active
                        ? 'border-neutral-700'
                        : 'border-neutral-800 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              card.type === 'prompt'
                                ? 'bg-energy-primary/20 text-energy-primary'
                                : card.type === 'useCase'
                                ? 'bg-battle-green/20 text-battle-green'
                                : 'bg-battle-purple/20 text-battle-purple'
                            }`}
                          >
                            {card.type === 'prompt'
                              ? 'Prompt'
                              : card.type === 'useCase'
                              ? 'Caso de Uso'
                              : 'Ferramenta'}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              card.difficulty === 'easy'
                                ? 'bg-battle-green/20 text-battle-green'
                                : card.difficulty === 'medium'
                                ? 'bg-battle-yellow/20 text-battle-yellow'
                                : 'bg-battle-red/20 text-battle-red'
                            }`}
                          >
                            {card.difficulty === 'easy' ? 'Fácil' : card.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                          </span>
                          <span className="text-xs text-neutral-500">
                            {card.roundId}
                          </span>
                        </div>
                        <h4 className="font-semibold text-neutral-100 mb-1">
                          {card.title}
                        </h4>
                        <p className="text-sm text-neutral-400">{card.description}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleEditCard(card)}
                          className="p-2 bg-battle-blue/20 text-battle-blue rounded-lg hover:bg-battle-blue/30 transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleActive(card.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            card.active
                              ? 'bg-battle-green/20 text-battle-green hover:bg-battle-green/30'
                              : 'bg-neutral-700 text-neutral-400 hover:bg-neutral-600'
                          }`}
                          title={card.active ? 'Desativar' : 'Ativar'}
                        >
                          {card.active ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleDeleteCard(card.id)}
                          className="p-2 bg-battle-red/20 text-battle-red rounded-lg hover:bg-battle-red/30 transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
                  )}
              </div>
            </div>
          </div>
        )}

        {/* Answers/Gabaritos Tab */}
        {activeTab === 'answers' && (
          <div className="bg-bg-secondary rounded-xl p-6 border border-neutral-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display text-xl font-bold text-neutral-50">
                  Gabaritos (Match Rules)
                </h3>
                <p className="text-sm text-neutral-400 mt-1">
                  Configure os matches corretos entre Prompt + Caso de Uso + Ferramenta
                </p>
              </div>
              <button
                onClick={() => setIsCreatingRule(true)}
                className="flex items-center gap-2 bg-energy-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-energy-primary/90 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Novo Gabarito
              </button>
            </div>

            {/* Create/Edit Form */}
            {isCreatingRule && (
              <div className="bg-bg-tertiary rounded-xl p-6 border border-neutral-700 mb-6">
                <h4 className="font-semibold text-neutral-100 mb-4">
                  {editingRuleId ? 'Editar Gabarito' : 'Novo Gabarito'}
                </h4>
                
                <div className="grid grid-cols-1 gap-4">
                  {/* Round Selection */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Round
                    </label>
                    <select
                      value={newRule.roundId}
                      onChange={e => setNewRule({ ...newRule, roundId: e.target.value, promptCardId: '', useCaseCardId: '', toolCardId: '' })}
                      className="w-full bg-bg-secondary text-neutral-200 rounded-lg px-4 py-2 border border-neutral-700 focus:border-energy-primary focus:outline-none"
                    >
                      <option value="round-1">Round 1 - Mestre das Notificações</option>
                      <option value="round-2">Round 2 - Capitã Pesquisa Infinita</option>
                      <option value="round-3">Round 3 - Senhora Perfeccionista</option>
                      <option value="round-4">Round 4 - ControlC+V</option>
                    </select>
                  </div>

                  {/* Prompt Card Selection */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Card de Prompt
                    </label>
                    <select
                      value={newRule.promptCardId}
                      onChange={e => setNewRule({ ...newRule, promptCardId: e.target.value })}
                      className="w-full bg-bg-secondary text-neutral-200 rounded-lg px-4 py-2 border border-neutral-700 focus:border-energy-primary focus:outline-none"
                    >
                      <option value="">Selecione um prompt...</option>
                      {cards
                        .filter(c => c.type === 'prompt' && c.roundId === newRule.roundId)
                        .map(card => (
                          <option key={card.id} value={card.id}>
                            {card.title}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Use Case Card Selection */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Card de Caso de Uso
                    </label>
                    <select
                      value={newRule.useCaseCardId}
                      onChange={e => setNewRule({ ...newRule, useCaseCardId: e.target.value })}
                      className="w-full bg-bg-secondary text-neutral-200 rounded-lg px-4 py-2 border border-neutral-700 focus:border-energy-primary focus:outline-none"
                    >
                      <option value="">Selecione um caso de uso...</option>
                      {cards
                        .filter(c => c.type === 'useCase' && c.roundId === newRule.roundId)
                        .map(card => (
                          <option key={card.id} value={card.id}>
                            {card.title}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Tool Card Selection */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Card de Ferramenta
                    </label>
                    <select
                      value={newRule.toolCardId}
                      onChange={e => setNewRule({ ...newRule, toolCardId: e.target.value })}
                      className="w-full bg-bg-secondary text-neutral-200 rounded-lg px-4 py-2 border border-neutral-700 focus:border-energy-primary focus:outline-none"
                    >
                      <option value="">Selecione uma ferramenta...</option>
                      {cards
                        .filter(c => c.type === 'tool' && c.roundId === newRule.roundId)
                        .map(card => (
                          <option key={card.id} value={card.id}>
                            {card.title}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Explanation */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Explicação do Match
                    </label>
                    <textarea
                      value={newRule.explanation}
                      onChange={e => setNewRule({ ...newRule, explanation: e.target.value })}
                      placeholder="Explique por que este match é correto..."
                      rows={3}
                      className="w-full bg-bg-secondary text-neutral-200 rounded-lg px-4 py-2 border border-neutral-700 focus:border-energy-primary focus:outline-none"
                    />
                  </div>

                  {/* Villain Message */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Mensagem do Vilão (derrota)
                    </label>
                    <textarea
                      value={newRule.villainMessage}
                      onChange={e => setNewRule({ ...newRule, villainMessage: e.target.value })}
                      placeholder="Mensagem que o vilão fala quando é derrotado..."
                      rows={2}
                      className="w-full bg-bg-secondary text-neutral-200 rounded-lg px-4 py-2 border border-neutral-700 focus:border-energy-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleSaveRule}
                    className="bg-battle-green text-white px-6 py-2 rounded-lg font-semibold hover:bg-battle-green/90 transition-colors"
                  >
                    {editingRuleId ? 'Atualizar Gabarito' : 'Salvar Gabarito'}
                  </button>
                  <button
                    onClick={handleCancelRuleEdit}
                    className="bg-neutral-700 text-neutral-300 px-6 py-2 rounded-lg font-semibold hover:bg-neutral-600 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Rules List */}
            <div className="bg-bg-tertiary/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-neutral-200">
                  Gabaritos Cadastrados ({matchRules.filter(r => filterRuleRound === 'all' || r.roundId === filterRuleRound).length})
                </h3>
                
                {/* Filter */}
                <select
                  value={filterRuleRound}
                  onChange={e => setFilterRuleRound(e.target.value)}
                  className="bg-bg-tertiary text-neutral-200 text-sm rounded-lg px-3 py-2 border border-neutral-700 focus:border-energy-primary focus:outline-none"
                >
                  <option value="all">Todos os Rounds</option>
                  <option value="round-1">Round 1</option>
                  <option value="round-2">Round 2</option>
                  <option value="round-3">Round 3</option>
                  <option value="round-4">Round 4</option>
                </select>
              </div>
              
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {matchRules
                  .filter(r => filterRuleRound === 'all' || r.roundId === filterRuleRound)
                  .length === 0 ? (
                    <div className="text-center py-8 text-neutral-500">
                      <p className="mb-2">Nenhum gabarito encontrado.</p>
                      <button
                        onClick={() => setFilterRuleRound('all')}
                        className="text-sm text-energy-primary hover:underline"
                      >
                        Limpar filtro
                      </button>
                    </div>
                  ) : (
                    matchRules
                      .filter(r => filterRuleRound === 'all' || r.roundId === filterRuleRound)
                      .map(rule => {
                        const promptCard = cards.find(c => c.id === rule.promptCardId)
                        const useCaseCard = cards.find(c => c.id === rule.useCaseCardId)
                        const toolCard = cards.find(c => c.id === rule.toolCardId)
                        
                        return (
                          <div
                            key={rule.id}
                            className={`bg-bg-tertiary/50 rounded-lg p-4 border transition-colors ${
                              rule.active ? 'border-neutral-700' : 'border-neutral-800 opacity-60'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-xs text-neutral-500 font-mono">
                                    {rule.roundId}
                                  </span>
                                </div>
                                
                                {/* Cards in the match */}
                                <div className="grid grid-cols-3 gap-2 mb-3">
                                  <div className="bg-energy-primary/10 border border-energy-primary/30 rounded p-2">
                                    <div className="text-xs text-energy-primary font-semibold mb-1">PROMPT</div>
                                    <div className="text-xs text-neutral-300 line-clamp-2">
                                      {promptCard?.title || 'Card não encontrado'}
                                    </div>
                                  </div>
                                  <div className="bg-battle-green/10 border border-battle-green/30 rounded p-2">
                                    <div className="text-xs text-battle-green font-semibold mb-1">CASO DE USO</div>
                                    <div className="text-xs text-neutral-300 line-clamp-2">
                                      {useCaseCard?.title || 'Card não encontrado'}
                                    </div>
                                  </div>
                                  <div className="bg-battle-purple/10 border border-battle-purple/30 rounded p-2">
                                    <div className="text-xs text-battle-purple font-semibold mb-1">FERRAMENTA</div>
                                    <div className="text-xs text-neutral-300 line-clamp-2">
                                      {toolCard?.title || 'Card não encontrado'}
                                    </div>
                                  </div>
                                </div>

                                {/* Explanation */}
                                <div className="mb-2">
                                  <div className="text-xs text-neutral-400 font-semibold mb-1">Explicação:</div>
                                  <p className="text-sm text-neutral-300">{rule.explanation}</p>
                                </div>

                                {/* Villain Message */}
                                <div>
                                  <div className="text-xs text-neutral-400 font-semibold mb-1">Mensagem do Vilão:</div>
                                  <p className="text-sm text-neutral-300 italic">"{rule.villainMessage}"</p>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center gap-2 ml-4">
                                <button
                                  onClick={() => handleEditRule(rule)}
                                  className="p-2 bg-battle-blue/20 text-battle-blue rounded-lg hover:bg-battle-blue/30 transition-colors"
                                  title="Editar"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleToggleRuleActive(rule.id)}
                                  className={`p-2 rounded-lg transition-colors ${
                                    rule.active
                                      ? 'bg-battle-green/20 text-battle-green hover:bg-battle-green/30'
                                      : 'bg-neutral-700 text-neutral-400 hover:bg-neutral-600'
                                  }`}
                                  title={rule.active ? 'Desativar' : 'Ativar'}
                                >
                                  {rule.active ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                                </button>
                                <button
                                  onClick={() => handleDeleteRule(rule.id)}
                                  className="p-2 bg-battle-red/20 text-battle-red rounded-lg hover:bg-battle-red/30 transition-colors"
                                  title="Excluir"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      })
                  )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
