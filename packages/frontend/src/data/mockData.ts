import { Round, Villain, Card, MatchRule } from '../types'

// Rounds Data
export const rounds: Round[] = [
  {
    id: 'round-1',
    number: 1,
    name: 'Mestre das Notificações - Round 1',
    villain: 'mestre-notificacoes',
    color: '#EF4444',
    description: 'Especialista em interromper a produtividade',
    learningObjectives: [
      'Gerenciar notificações eficientemente',
      'Usar Copilot para priorizar comunicações',
      'Automatizar respostas com contexto',
    ],
    active: true,
  },
  {
    id: 'round-2',
    number: 2,
    name: 'Capitã Pesquisa Infinita - Round 2',
    villain: 'capita-pesquisa',
    color: '#F59E0B',
    description: 'Busca em fontes desconectadas',
    learningObjectives: [
      'Consolidar informações de múltiplas fontes',
      'Usar Copilot para síntese de dados',
      'Pesquisa inteligente e contextual',
    ],
    active: true,
  },
  {
    id: 'round-3',
    number: 3,
    name: 'Senhora Perfeccionista - Round 3',
    villain: 'senhora-perfeccionista',
    color: '#FCD34D',
    description: 'Ciclo infinito de revisões',
    learningObjectives: [
      'Aceitar "good enough" com qualidade',
      'Usar Copilot para revisão rápida',
      'Definir critérios de conclusão claros',
    ],
    active: true,
  },
  {
    id: 'round-4',
    number: 4,
    name: 'ControlC+V - Round 4',
    villain: 'ctrlcv',
    color: '#EA580C',
    description: 'Análise manual de dados',
    learningObjectives: [
      'Automatizar análise de dados',
      'Usar Copilot para validação',
      'Integrar fontes de dados com segurança',
    ],
    active: true,
  },
]

// Villains Data
export const villains: Villain[] = [
  {
    id: 'mestre-notificacoes',
    name: 'Mestre das Notificações',
    description: 'Especialista em interromper a produtividade, desviando a atenção e dificultando a gestão das tarefas diárias',
    productivityProblem: 'Notificações constantes quebram o foco e destroem o deep work. Cada interrupção custa 23 minutos de produtividade recuperada.',
    color: '#EF4444',
    avatar: '/villain-avatars/mestre-notificacoes.png',
    voiceLines: {
      intro: [
        'Você tem 47 notificações não lidas! 🔔',
        'URGENTE! (ou não... mas olhe mesmo assim!)',
        'Ping! Ping! Ping! Sua atenção, por favor!',
      ],
      onError: [
        'Ops! Você estava distraído? Minha culpa! 😈',
        'Mais um email chegando... melhor verificar!',
      ],
      onDefeat: [
        'Ok, ok... modo foco ativado... 😵',
        'Todas as notificações silenciadas... por enquanto...',
      ],
    },
  },
  {
    id: 'capita-pesquisa',
    name: 'Capitã Pesquisa Infinita',
    description: 'Especialista em garantir que busquemos informações em várias fontes desconectadas, resultando em ciclos de baixa produtividade',
    productivityProblem: 'Buscar informação em múltiplas fontes desconectadas gera paralisia por análise. 68% do tempo é gasto procurando, não usando informação.',
    color: '#F59E0B',
    avatar: '/villain-avatars/capita-pesquisa.png',
    voiceLines: {
      intro: [
        'Espere! Preciso verificar mais 15 sites antes de decidir!',
        'Encontrei 487 resultados... vamos ler todos!',
        'Talvez a resposta esteja neste outro documento...',
      ],
      onError: [
        'Viu? Você não pesquisou o suficiente!',
        'Mais informação! SEMPRE mais informação!',
      ],
      onDefeat: [
        'Ok... Copilot organizou tudo em uma resposta... 😮',
        'Tudo que eu precisava estava aqui o tempo todo?',
      ],
    },
  },
  {
    id: 'senhora-perfeccionista',
    name: 'Senhora Perfeccionista',
    description: 'Especialista em garantir que fiquemos presos em um ciclo sem fim de revisões e ajustes',
    productivityProblem: 'Perfeccionismo gera ciclos infinitos de revisão. Projetos nunca são finalizados porque "podem ser melhorados".',
    color: '#FCD34D',
    avatar: '/villain-avatars/senhora-perfeccionista.png',
    voiceLines: {
      intro: [
        'Hmm... isso poderia estar... MELHOR! ✨',
        'Quase perfeito! Só falta ajustar... tudo novamente!',
        'Espere! Vi uma vírgula fora do lugar!',
      ],
      onError: [
        'Viu? Sabia que não estava bom o suficiente!',
        'Volta! Revise! Corrija! Melhore!',
      ],
      onDefeat: [
        'Tá... "good enough" pode ser suficiente... 😔',
        'Copilot me ensinou que feito é melhor que perfeito...',
      ],
    },
  },
  {
    id: 'ctrlcv',
    name: 'ControlC+V',
    description: 'Costuma causar interrupções e gerar travas na análise de dados, resultando em inconsistências, insegurança e vulnerabilidade nas informações',
    productivityProblem: 'Análise manual de dados causa erros e vulnerabilidades. 40% dos dados em planilhas contêm erros.',
    color: '#EA580C',
    avatar: '/villain-avatars/ctrlcv.png',
    voiceLines: {
      intro: [
        'Planilha manual funcionou por 20 anos! Por que mudar? 📋',
        'Ctrl+C... Ctrl+V... assim que se trabalha!',
        'Não confio em automação. Prefiro meu Excel!',
      ],
      onError: [
        '#REF! Erro na célula C4! Você viu?!',
        'Mais uma inconsistência! Típico de quem não confere!',
      ],
      onDefeat: [
        'Copilot... automatizou tudo... em segundos... 😳',
        'Dados validados, integrados e seguros... automaticamente?!',
      ],
    },
  },
]

// ============================
// CARDS DATA - Real card images
// ============================
// Cards are shuffled within each round so matching positions don't align.
// Each round's tools are fixed; UCs and Prompts are distributed by their match's tool.

// Use Case Cards (20 cards, distributed and shuffled per round)
const useCaseCards: Card[] = [
  // Round 1 (7 UCs) - matches: UC1+Chat, UC2+Chat, UC5+Chat, UC10+Chat, UC19+Teams, UC20+Teams, UC9+Outlook
  { id: 'uc-09', type: 'useCase', title: 'Caso de Uso 9', description: '', image: '/cards/use-case/use-case-09.png', roundId: 'round-1', villainTheme: 'mestre-notificacoes', active: true, difficulty: 'easy' },
  { id: 'uc-20', type: 'useCase', title: 'Caso de Uso 20', description: '', image: '/cards/use-case/use-case-20.png', roundId: 'round-1', villainTheme: 'mestre-notificacoes', active: true, difficulty: 'easy' },
  { id: 'uc-01', type: 'useCase', title: 'Caso de Uso 1', description: '', image: '/cards/use-case/use-case-01.png', roundId: 'round-1', villainTheme: 'mestre-notificacoes', active: true, difficulty: 'easy' },
  { id: 'uc-10', type: 'useCase', title: 'Caso de Uso 10', description: '', image: '/cards/use-case/use-case-10.png', roundId: 'round-1', villainTheme: 'mestre-notificacoes', active: true, difficulty: 'easy' },
  { id: 'uc-05', type: 'useCase', title: 'Caso de Uso 5', description: '', image: '/cards/use-case/use-case-05.png', roundId: 'round-1', villainTheme: 'mestre-notificacoes', active: true, difficulty: 'easy' },
  { id: 'uc-19', type: 'useCase', title: 'Caso de Uso 19', description: '', image: '/cards/use-case/use-case-19.png', roundId: 'round-1', villainTheme: 'mestre-notificacoes', active: true, difficulty: 'easy' },
  { id: 'uc-02', type: 'useCase', title: 'Caso de Uso 2', description: '', image: '/cards/use-case/use-case-02.png', roundId: 'round-1', villainTheme: 'mestre-notificacoes', active: true, difficulty: 'easy' },
  // Round 2 (6 UCs) - matches: UC4+Word, UC8+Word, UC15+Researcher, UC16+Researcher, UC17+Notebook, UC18+Notebook
  { id: 'uc-17', type: 'useCase', title: 'Caso de Uso 17', description: '', image: '/cards/use-case/use-case-17.png', roundId: 'round-2', villainTheme: 'capita-pesquisa', active: true, difficulty: 'easy' },
  { id: 'uc-04', type: 'useCase', title: 'Caso de Uso 4', description: '', image: '/cards/use-case/use-case-04.png', roundId: 'round-2', villainTheme: 'capita-pesquisa', active: true, difficulty: 'easy' },
  { id: 'uc-16', type: 'useCase', title: 'Caso de Uso 16', description: '', image: '/cards/use-case/use-case-16.png', roundId: 'round-2', villainTheme: 'capita-pesquisa', active: true, difficulty: 'easy' },
  { id: 'uc-08', type: 'useCase', title: 'Caso de Uso 8', description: '', image: '/cards/use-case/use-case-08.png', roundId: 'round-2', villainTheme: 'capita-pesquisa', active: true, difficulty: 'easy' },
  { id: 'uc-15', type: 'useCase', title: 'Caso de Uso 15', description: '', image: '/cards/use-case/use-case-15.png', roundId: 'round-2', villainTheme: 'capita-pesquisa', active: true, difficulty: 'easy' },
  { id: 'uc-18', type: 'useCase', title: 'Caso de Uso 18', description: '', image: '/cards/use-case/use-case-18.png', roundId: 'round-2', villainTheme: 'capita-pesquisa', active: true, difficulty: 'easy' },
  // Round 3 (3 UCs) - matches: UC3+PowerPoint, UC11+Create, UC12+Create
  { id: 'uc-11', type: 'useCase', title: 'Caso de Uso 11', description: '', image: '/cards/use-case/use-case-11.png', roundId: 'round-3', villainTheme: 'senhora-perfeccionista', active: true, difficulty: 'easy' },
  { id: 'uc-03', type: 'useCase', title: 'Caso de Uso 3', description: '', image: '/cards/use-case/use-case-03.png', roundId: 'round-3', villainTheme: 'senhora-perfeccionista', active: true, difficulty: 'easy' },
  { id: 'uc-12', type: 'useCase', title: 'Caso de Uso 12', description: '', image: '/cards/use-case/use-case-12.png', roundId: 'round-3', villainTheme: 'senhora-perfeccionista', active: true, difficulty: 'easy' },
  // Round 4 (4 UCs) - matches: UC6+Excel, UC7+Excel, UC13+Analyst, UC14+Analyst
  { id: 'uc-14', type: 'useCase', title: 'Caso de Uso 14', description: '', image: '/cards/use-case/use-case-14.png', roundId: 'round-4', villainTheme: 'ctrlcv', active: true, difficulty: 'easy' },
  { id: 'uc-06', type: 'useCase', title: 'Caso de Uso 6', description: '', image: '/cards/use-case/use-case-06.png', roundId: 'round-4', villainTheme: 'ctrlcv', active: true, difficulty: 'easy' },
  { id: 'uc-07', type: 'useCase', title: 'Caso de Uso 7', description: '', image: '/cards/use-case/use-case-07.png', roundId: 'round-4', villainTheme: 'ctrlcv', active: true, difficulty: 'easy' },
  { id: 'uc-13', type: 'useCase', title: 'Caso de Uso 13', description: '', image: '/cards/use-case/use-case-13.png', roundId: 'round-4', villainTheme: 'ctrlcv', active: true, difficulty: 'easy' },
]

// Prompt Cards (20 cards, distributed and shuffled per round)
const promptCards: Card[] = [
  // Round 1 (7 Prompts) - shuffled: N, G, D, A, P, C, J
  { id: 'prompt-n', type: 'prompt', title: 'Prompt N', description: '', image: '/cards/prompt/prompt-n.png', roundId: 'round-1', villainTheme: 'mestre-notificacoes', active: true, difficulty: 'easy' },
  { id: 'prompt-g', type: 'prompt', title: 'Prompt G', description: '', image: '/cards/prompt/prompt-g.png', roundId: 'round-1', villainTheme: 'mestre-notificacoes', active: true, difficulty: 'easy' },
  { id: 'prompt-d', type: 'prompt', title: 'Prompt D', description: '', image: '/cards/prompt/prompt-d.png', roundId: 'round-1', villainTheme: 'mestre-notificacoes', active: true, difficulty: 'easy' },
  { id: 'prompt-a', type: 'prompt', title: 'Prompt A', description: '', image: '/cards/prompt/prompt-a.png', roundId: 'round-1', villainTheme: 'mestre-notificacoes', active: true, difficulty: 'easy' },
  { id: 'prompt-p', type: 'prompt', title: 'Prompt P', description: '', image: '/cards/prompt/prompt-p.png', roundId: 'round-1', villainTheme: 'mestre-notificacoes', active: true, difficulty: 'easy' },
  { id: 'prompt-c', type: 'prompt', title: 'Prompt C', description: '', image: '/cards/prompt/prompt-c.png', roundId: 'round-1', villainTheme: 'mestre-notificacoes', active: true, difficulty: 'easy' },
  { id: 'prompt-j', type: 'prompt', title: 'Prompt J', description: '', image: '/cards/prompt/prompt-j.png', roundId: 'round-1', villainTheme: 'mestre-notificacoes', active: true, difficulty: 'easy' },
  // Round 2 (6 Prompts) - shuffled: T, O, H, R, E, L
  { id: 'prompt-t', type: 'prompt', title: 'Prompt T', description: '', image: '/cards/prompt/prompt-t.png', roundId: 'round-2', villainTheme: 'capita-pesquisa', active: true, difficulty: 'easy' },
  { id: 'prompt-o', type: 'prompt', title: 'Prompt O', description: '', image: '/cards/prompt/prompt-o.png', roundId: 'round-2', villainTheme: 'capita-pesquisa', active: true, difficulty: 'easy' },
  { id: 'prompt-h', type: 'prompt', title: 'Prompt H', description: '', image: '/cards/prompt/prompt-h.png', roundId: 'round-2', villainTheme: 'capita-pesquisa', active: true, difficulty: 'easy' },
  { id: 'prompt-r', type: 'prompt', title: 'Prompt R', description: '', image: '/cards/prompt/prompt-r.png', roundId: 'round-2', villainTheme: 'capita-pesquisa', active: true, difficulty: 'easy' },
  { id: 'prompt-e', type: 'prompt', title: 'Prompt E', description: '', image: '/cards/prompt/prompt-e.png', roundId: 'round-2', villainTheme: 'capita-pesquisa', active: true, difficulty: 'easy' },
  { id: 'prompt-l', type: 'prompt', title: 'Prompt L', description: '', image: '/cards/prompt/prompt-l.png', roundId: 'round-2', villainTheme: 'capita-pesquisa', active: true, difficulty: 'easy' },
  // Round 3 (3 Prompts) - shuffled: Q, M, B
  { id: 'prompt-q', type: 'prompt', title: 'Prompt Q', description: '', image: '/cards/prompt/prompt-q.png', roundId: 'round-3', villainTheme: 'senhora-perfeccionista', active: true, difficulty: 'easy' },
  { id: 'prompt-m', type: 'prompt', title: 'Prompt M', description: '', image: '/cards/prompt/prompt-m.png', roundId: 'round-3', villainTheme: 'senhora-perfeccionista', active: true, difficulty: 'easy' },
  { id: 'prompt-b', type: 'prompt', title: 'Prompt B', description: '', image: '/cards/prompt/prompt-b.png', roundId: 'round-3', villainTheme: 'senhora-perfeccionista', active: true, difficulty: 'easy' },
  // Round 4 (4 Prompts) - shuffled: F, K, S, I
  { id: 'prompt-f', type: 'prompt', title: 'Prompt F', description: '', image: '/cards/prompt/prompt-f.png', roundId: 'round-4', villainTheme: 'ctrlcv', active: true, difficulty: 'easy' },
  { id: 'prompt-k', type: 'prompt', title: 'Prompt K', description: '', image: '/cards/prompt/prompt-k.png', roundId: 'round-4', villainTheme: 'ctrlcv', active: true, difficulty: 'easy' },
  { id: 'prompt-s', type: 'prompt', title: 'Prompt S', description: '', image: '/cards/prompt/prompt-s.png', roundId: 'round-4', villainTheme: 'ctrlcv', active: true, difficulty: 'easy' },
  { id: 'prompt-i', type: 'prompt', title: 'Prompt I', description: '', image: '/cards/prompt/prompt-i.png', roundId: 'round-4', villainTheme: 'ctrlcv', active: true, difficulty: 'easy' },
]

// Tool Cards (10 unique tools, assigned per round)
const toolCards: Card[] = [
  // Round 1: Copilot Chat, Copilot Light, Outlook
  { id: 't1-chat', type: 'tool', title: 'Copilot Chat', description: '', image: '/cards/tool/tool-chat.png', roundId: 'round-1', villainTheme: 'mestre-notificacoes', active: true, difficulty: 'easy' },
  { id: 't1-copilot-light', type: 'tool', title: 'Copilot Light', description: '', image: '/cards/tool/tool-copilot-light.png', roundId: 'round-1', villainTheme: 'mestre-notificacoes', active: true, difficulty: 'easy' },
  { id: 't1-outlook', type: 'tool', title: 'Copilot Outlook', description: '', image: '/cards/tool/tool-outlook.png', roundId: 'round-1', villainTheme: 'mestre-notificacoes', active: true, difficulty: 'easy' },
  // Round 2: Word, Researcher, Notebook
  { id: 't2-word', type: 'tool', title: 'Copilot Word', description: '', image: '/cards/tool/tool-word.png', roundId: 'round-2', villainTheme: 'capita-pesquisa', active: true, difficulty: 'easy' },
  { id: 't2-researcher', type: 'tool', title: 'Researcher Agent', description: '', image: '/cards/tool/tool-researcher.png', roundId: 'round-2', villainTheme: 'capita-pesquisa', active: true, difficulty: 'easy' },
  { id: 't2-notebook', type: 'tool', title: 'Notebook', description: '', image: '/cards/tool/tool-notebook.png', roundId: 'round-2', villainTheme: 'capita-pesquisa', active: true, difficulty: 'easy' },
  // Round 3: PowerPoint, Create
  { id: 't3-powerpoint', type: 'tool', title: 'Copilot PowerPoint', description: '', image: '/cards/tool/tool-powerpoint.png', roundId: 'round-3', villainTheme: 'senhora-perfeccionista', active: true, difficulty: 'easy' },
  { id: 't3-create', type: 'tool', title: 'Create', description: '', image: '/cards/tool/tool-create.png', roundId: 'round-3', villainTheme: 'senhora-perfeccionista', active: true, difficulty: 'easy' },
  // Round 4: Excel, Analyst
  { id: 't4-excel', type: 'tool', title: 'Copilot Excel', description: '', image: '/cards/tool/tool-excel.png', roundId: 'round-4', villainTheme: 'ctrlcv', active: true, difficulty: 'easy' },
  { id: 't4-analyst', type: 'tool', title: 'Analyst Agent', description: '', image: '/cards/tool/tool-analyst.png', roundId: 'round-4', villainTheme: 'ctrlcv', active: true, difficulty: 'easy' },
]

// All cards combined
export const cards: Card[] = [...useCaseCards, ...promptCards, ...toolCards]

// ============================
// MATCH RULES (20 valid combinations)
// ============================
export const matchRules: MatchRule[] = [
  // Round 1 - Copilot Chat, Microsoft Teams, Outlook (7 matches)
  { id: 'rule-1', roundId: 'round-1', promptCardId: 'prompt-g', useCaseCardId: 'uc-01', toolCardId: 't1-chat', explanation: 'Caso de Uso 1 + Prompt G + Copilot Chat é a combinação correta!', villainMessage: 'Você me derrotou desta vez... modo foco ativado! 😵', active: true },
  { id: 'rule-2', roundId: 'round-1', promptCardId: 'prompt-c', useCaseCardId: 'uc-02', toolCardId: 't1-chat', explanation: 'Caso de Uso 2 + Prompt C + Copilot Chat é a combinação correta!', villainMessage: 'Ok, ok... suas notificações estão sob controle agora... 😣', active: true },
  { id: 'rule-5', roundId: 'round-1', promptCardId: 'prompt-a', useCaseCardId: 'uc-05', toolCardId: 't1-chat', explanation: 'Caso de Uso 5 + Prompt A + Copilot Chat é a combinação correta!', villainMessage: 'Todas as notificações silenciadas... por enquanto... 😵', active: true },
  { id: 'rule-10', roundId: 'round-1', promptCardId: 'prompt-j', useCaseCardId: 'uc-10', toolCardId: 't1-chat', explanation: 'Caso de Uso 10 + Prompt J + Copilot Chat é a combinação correta!', villainMessage: 'Chat consolidou todas as fontes... perdi! 😵', active: true },
  { id: 'rule-19', roundId: 'round-1', promptCardId: 'prompt-p', useCaseCardId: 'uc-19', toolCardId: 't1-copilot-light', explanation: 'Caso de Uso 19 + Prompt P + Copilot Light é a combinação correta!', villainMessage: 'Copilot Light fez em segundos o que eu levo horas! 😳', active: true },
  { id: 'rule-20', roundId: 'round-1', promptCardId: 'prompt-n', useCaseCardId: 'uc-20', toolCardId: 't1-copilot-light', explanation: 'Caso de Uso 20 + Prompt N + Copilot Light é a combinação correta!', villainMessage: 'Copilot Light resolveu tudo... impossível competir! 😵', active: true },
  { id: 'rule-9', roundId: 'round-1', promptCardId: 'prompt-d', useCaseCardId: 'uc-09', toolCardId: 't1-outlook', explanation: 'Caso de Uso 9 + Prompt D + Copilot Outlook é a combinação correta!', villainMessage: 'Emails inteligentes sem minha interferência?! 😤', active: true },

  // Round 2 - Word, Researcher, Notebook (6 matches)
  { id: 'rule-4', roundId: 'round-2', promptCardId: 'prompt-e', useCaseCardId: 'uc-04', toolCardId: 't2-word', explanation: 'Caso de Uso 4 + Prompt E + Copilot Word é a combinação correta!', villainMessage: 'Documentos criados em segundos... impossível! 😵', active: true },
  { id: 'rule-8', roundId: 'round-2', promptCardId: 'prompt-h', useCaseCardId: 'uc-08', toolCardId: 't2-word', explanation: 'Caso de Uso 8 + Prompt H + Copilot Word é a combinação correta!', villainMessage: 'Ok... Copilot organizou tudo em uma resposta... 😮', active: true },
  { id: 'rule-15', roundId: 'round-2', promptCardId: 'prompt-r', useCaseCardId: 'uc-15', toolCardId: 't2-researcher', explanation: 'Caso de Uso 15 + Prompt R + Researcher Agent é a combinação correta!', villainMessage: 'Pesquisa completa sem ciclo infinito... impossível! 😔', active: true },
  { id: 'rule-16', roundId: 'round-2', promptCardId: 'prompt-t', useCaseCardId: 'uc-16', toolCardId: 't2-researcher', explanation: 'Caso de Uso 16 + Prompt T + Researcher Agent é a combinação correta!', villainMessage: 'Researcher substituiu minha pesquisa infinita?! 😳', active: true },
  { id: 'rule-17', roundId: 'round-2', promptCardId: 'prompt-l', useCaseCardId: 'uc-17', toolCardId: 't2-notebook', explanation: 'Caso de Uso 17 + Prompt L + Notebook é a combinação correta!', villainMessage: 'Notebook organizou tudo automaticamente... 😵', active: true },
  { id: 'rule-18', roundId: 'round-2', promptCardId: 'prompt-o', useCaseCardId: 'uc-18', toolCardId: 't2-notebook', explanation: 'Caso de Uso 18 + Prompt O + Notebook é a combinação correta!', villainMessage: 'Dados integrados sem pesquisa manual! 😤', active: true },

  // Round 3 - PowerPoint, Create (3 matches)
  { id: 'rule-3', roundId: 'round-3', promptCardId: 'prompt-b', useCaseCardId: 'uc-03', toolCardId: 't3-powerpoint', explanation: 'Caso de Uso 3 + Prompt B + Copilot PowerPoint é a combinação correta!', villainMessage: 'Apresentações perfeitas sem minha interferência?! 😤', active: true },
  { id: 'rule-11', roundId: 'round-3', promptCardId: 'prompt-m', useCaseCardId: 'uc-11', toolCardId: 't3-create', explanation: 'Caso de Uso 11 + Prompt M + Create é a combinação correta!', villainMessage: 'Criação rápida sem ciclo de revisões?! 😔', active: true },
  { id: 'rule-12', roundId: 'round-3', promptCardId: 'prompt-q', useCaseCardId: 'uc-12', toolCardId: 't3-create', explanation: 'Caso de Uso 12 + Prompt Q + Create é a combinação correta!', villainMessage: 'Feito é melhor que perfeito... admito... 😣', active: true },

  // Round 4 - Excel, Analyst (4 matches)
  { id: 'rule-6', roundId: 'round-4', promptCardId: 'prompt-i', useCaseCardId: 'uc-06', toolCardId: 't4-excel', explanation: 'Caso de Uso 6 + Prompt I + Copilot Excel é a combinação correta!', villainMessage: 'Tudo que eu precisava estava aqui o tempo todo? 😮', active: true },
  { id: 'rule-7', roundId: 'round-4', promptCardId: 'prompt-f', useCaseCardId: 'uc-07', toolCardId: 't4-excel', explanation: 'Caso de Uso 7 + Prompt F + Copilot Excel é a combinação correta!', villainMessage: 'Dados organizados automaticamente?! Não pode ser! 😳', active: true },
  { id: 'rule-13', roundId: 'round-4', promptCardId: 'prompt-k', useCaseCardId: 'uc-13', toolCardId: 't4-analyst', explanation: 'Caso de Uso 13 + Prompt K + Analyst Agent é a combinação correta!', villainMessage: 'Análise instantânea?! Sem revisões infinitas?! 😤', active: true },
  { id: 'rule-14', roundId: 'round-4', promptCardId: 'prompt-s', useCaseCardId: 'uc-14', toolCardId: 't4-analyst', explanation: 'Caso de Uso 14 + Prompt S + Analyst Agent é a combinação correta!', villainMessage: 'O Analyst fez tudo perfeitamente de primeira... 😵', active: true },
]

// Helper function to get cards by round and type
export const getCardsByRoundAndType = (roundId: string, type: string) => {
  return cards.filter(card => card.roundId === roundId && card.type === type && card.active)
}
