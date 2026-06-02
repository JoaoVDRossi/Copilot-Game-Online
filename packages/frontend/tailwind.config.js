/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores de Fundo (Arena Escura)
        'bg-primary': '#0A0A0A',
        'bg-secondary': '#1A1A1A',
        'bg-tertiary': '#2D2D2D',
        'bg-elevated': '#1F1F1F',
        
        // Energia Laranja (Raios de Combate)
        'energy-primary': '#FF6B35',
        'energy-secondary': '#F7931E',
        'energy-tertiary': '#FDB750',
        'energy-glow': '#FF8C42',
        
        // Acentos de Batalha
        'battle-red': '#DC2626',
        'battle-green': '#10B981',
        'battle-blue': '#3B82F6',
        'battle-yellow': '#FBBF24',
        'battle-purple': '#8B5CF6',
        
        // Vilões
        'villain-1': '#EF4444',  // Mestre das Notificações
        'villain-2': '#F59E0B',  // Capitã Pesquisa Infinita  
        'villain-3': '#FCD34D',  // Senhora Perfeccionista
        'villain-4': '#EA580C',  // ControlC+V
      },
      fontFamily: {
        'display': ['Rajdhani', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
