import { Card } from '../../types'

interface PlayingCardProps {
  card: Card
  selected: boolean
  onSelect: () => void
  villainColor: string
  typeAccent?: string // tint color for card type (green=useCase, orange=prompt, purple=tool)
}

export default function PlayingCard({ card, selected, onSelect, villainColor, typeAccent }: PlayingCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`group relative rounded-lg cursor-pointer transition-all duration-200 border-2 overflow-hidden ${
        selected
          ? 'border-energy-primary scale-[1.03] shadow-lg ring-2 ring-energy-primary/50'
          : 'border-transparent hover:border-neutral-600 hover:-translate-y-0.5'
      }`}
      style={{
        boxShadow: selected ? `0 0 15px ${villainColor}40` : typeAccent ? `0 0 8px ${typeAccent}30` : 'none',
        borderColor: selected ? undefined : typeAccent ? `${typeAccent}40` : undefined,
      }}
    >
      {/* Selected Indicator */}
      {selected && (
        <div
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md z-20"
          style={{ backgroundColor: villainColor }}
        >
          ✓
        </div>
      )}

      {/* Card Image */}
      <img
        src={card.image}
        alt={card.title}
        className="w-full aspect-[5/7] object-contain block bg-bg-secondary"
        draggable={false}
      />

      {/* Type accent overlay (subtle bottom tint) */}
      {typeAccent && (
        <div
          className="absolute bottom-0 left-0 right-0 h-1 opacity-80"
          style={{ background: typeAccent }}
        />
      )}

      {/* Hover Effect */}
      <div 
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"
        style={{ background: typeAccent ? `linear-gradient(135deg, ${typeAccent}, transparent)` : `linear-gradient(135deg, ${villainColor}, transparent)` }}
      />
    </div>
  )
}
