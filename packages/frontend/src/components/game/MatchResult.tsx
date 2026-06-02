import { X, CheckCircle, XCircle } from 'lucide-react'

interface MatchResultProps {
  correct: boolean
  explanation: string
  villainMessage: string
  villainColor: string
  villainAvatar: string
  roundCompleted?: boolean
  onClose: () => void
}

export default function MatchResult({
  correct,
  explanation,
  villainMessage,
  villainColor,
  villainAvatar,
  roundCompleted = false,
  onClose,
}: MatchResultProps) {
  console.log('MatchResult rendered:', { correct, roundCompleted })
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-bg-primary/90 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative max-w-2xl w-full max-h-[calc(100vh-1rem)] sm:max-h-[calc(100vh-2rem)] overflow-y-auto bg-bg-secondary rounded-2xl p-4 sm:p-6 lg:p-8 border-2 shadow-2xl ${
          correct ? 'border-battle-green' : 'border-battle-red'
        }`}
        style={{
          boxShadow: correct
            ? '0 0 60px rgba(16, 185, 129, 0.3)'
            : '0 0 60px rgba(220, 38, 38, 0.3)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-neutral-400 hover:text-neutral-200 transition-colors z-10"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Result Icon */}
        <div className="flex justify-center mb-3 sm:mb-6">
          {correct ? (
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-battle-green/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 sm:w-16 sm:h-16 text-battle-green" />
            </div>
          ) : (
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-battle-red/20 flex items-center justify-center">
              <XCircle className="w-10 h-10 sm:w-16 sm:h-16 text-battle-red" />
            </div>
          )}
        </div>

        {/* Title */}
        <h2
          className={`font-display text-xl sm:text-3xl font-extrabold text-center mb-3 sm:mb-6 uppercase ${
            correct ? 'text-battle-green' : 'text-battle-red'
          }`}
        >
          {roundCompleted ? '🏆 Round Finalizado!' : correct ? '✓ Match Correto!' : '✗ Match Incorreto'}
        </h2>
        
        {/* Round Completed Message */}
        {roundCompleted && (
          <div className="bg-battle-green/20 border-2 border-battle-green/50 rounded-xl p-3 sm:p-6 mb-3 sm:mb-6">
            <p className="text-center text-sm sm:text-lg font-semibold text-battle-green mb-1 sm:mb-2">
              ✨ Parabéns! Você completou todos os matches deste round!
            </p>
            <p className="text-center text-xs sm:text-sm text-neutral-300">
              Todos os desafios foram superados. Continue assim para derrotar os próximos vilões!
            </p>
          </div>
        )}

        {/* Points */}
        {correct && (
          <div className="text-center mb-3 sm:mb-6">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-battle-green/20 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-battle-green/30">
              <span className="font-mono text-2xl sm:text-4xl font-bold text-battle-green">+3</span>
              <span className="text-xs sm:text-sm text-neutral-300">pontos</span>
            </div>
          </div>
        )}

        {/* Explanation */}
        <div className="bg-bg-tertiary/50 rounded-xl p-3 sm:p-6 mb-3 sm:mb-6 border border-neutral-700">
          <h3 className="font-display text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-2 sm:mb-3">
            {correct ? 'Explicação' : 'Por que não funcionou?'}
          </h3>
          <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">{explanation}</p>
        </div>

        {/* Villain Message */}
        <div
          className="bg-bg-primary/50 rounded-xl p-3 sm:p-6 border-l-4 flex items-center gap-3 sm:gap-4"
          style={{ borderColor: villainColor }}
        >
          <img
            src={villainAvatar}
            alt="Villain"
            className="w-10 h-10 sm:w-16 sm:h-16 rounded-full object-cover shrink-0"
            style={{ filter: `drop-shadow(0 0 10px ${villainColor}80)` }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-neutral-400 mb-1">Mensagem do vilão:</p>
            <p className="text-sm sm:text-base italic text-neutral-200">"{villainMessage}"</p>
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-4 sm:mt-6 text-center">
          <button
            onClick={onClose}
            className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-display text-sm sm:text-base font-semibold uppercase tracking-wide transition-all hover:scale-105 ${
              correct
                ? 'bg-battle-green text-white hover:bg-battle-green/90'
                : 'bg-battle-red text-white hover:bg-battle-red/90'
            }`}
          >
            {roundCompleted ? 'Ver Resultados' : correct ? 'Continuar Jogando' : 'Tentar Novamente'}
          </button>
        </div>
      </div>
    </div>
  )
}
