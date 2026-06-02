import { useParams, useNavigate } from 'react-router-dom'
import { ArrowRight, Zap } from 'lucide-react'
import { rounds, villains } from '../../data/mockData'

export default function VillainIntro() {
  const { roundId } = useParams()
  const navigate = useNavigate()

  const round = rounds.find(r => r.id === roundId)
  const villain = villains.find(v => v.id === round?.villain)

  if (!round || !villain) {
    navigate('/rounds')
    return null
  }

  const handleStartRound = () => {
    navigate(`/round/${roundId}/play`)
  }

  return (
    <div className="relative min-h-screen lightning-border flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0 animate-pulse-glow"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${villain.color}40, transparent 70%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/rounds')}
            className="mb-8 text-neutral-400 hover:text-energy-primary transition-colors flex items-center gap-2"
          >
            ← Voltar para rounds
          </button>

          {/* Villain Card */}
          <div className="bg-bg-secondary/90 backdrop-blur-sm rounded-2xl border-2 p-8 md:p-12 text-center"
            style={{ borderColor: villain.color }}
          >
            {/* Round Badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <Zap className="w-6 h-6" style={{ color: villain.color }} />
              <span className="font-display text-lg font-bold uppercase tracking-wider text-neutral-400">
                Round {round.number}: Desafio Aceito
              </span>
              <Zap className="w-6 h-6" style={{ color: villain.color }} />
            </div>

            {/* Villain Avatar */}
            <div className="mb-8 flex justify-center">
              <div className="relative w-72 h-72">
                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-40 animate-pulse-glow"
                  style={{ background: villain.color }}
                />
                <img
                  src={villain.avatar}
                  alt={villain.name}
                  className="relative w-full h-full object-contain drop-shadow-2xl"
                  style={{
                    filter: `drop-shadow(0 0 40px ${villain.color}80)`,
                  }}
                />
              </div>
            </div>

            {/* Villain Name */}
            <h1 
              className="font-display text-5xl md:text-6xl font-extrabold mb-4 uppercase tracking-tight"
              style={{ color: villain.color }}
            >
              {villain.name}
            </h1>

            {/* Description */}
            <p className="text-xl text-neutral-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              {villain.description}
            </p>

            {/* Productivity Problem */}
            <div className="bg-bg-tertiary/50 rounded-xl p-6 mb-8 border border-neutral-700">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                Desafio de Produtividade
              </h3>
              <p className="text-neutral-200 text-base leading-relaxed">
                {villain.productivityProblem}
              </p>
            </div>

            {/* Learning Objectives */}
            <div className="mb-8">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                Objetivos de Aprendizado
              </h3>
              <div className="grid md:grid-cols-3 gap-3">
                {round.learningObjectives.map((objective, index) => (
                  <div
                    key={index}
                    className="bg-bg-tertiary/30 rounded-lg p-4 border border-neutral-700/50"
                  >
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 mx-auto"
                      style={{ 
                        background: `${villain.color}30`,
                        color: villain.color,
                      }}
                    >
                      {index + 1}
                    </div>
                    <p className="text-sm text-neutral-300">{objective}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Villain Voice Line */}
            <div className="bg-bg-primary/50 rounded-xl p-6 mb-8 border-l-4" style={{ borderColor: villain.color }}>
              <p className="text-lg italic text-neutral-200">
                "{villain.voiceLines.intro[0]}"
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleStartRound}
              className="btn-primary text-xl px-12 py-5 inline-flex items-center gap-3 group"
            >
              <span>Enfrentar o Desafio</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
