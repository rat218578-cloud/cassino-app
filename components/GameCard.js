import Link from 'next/link';

export default function GameCard({ game }) {
  const icons = {
    'football-studio': '⚽',
    'lightning-roulette': '⚡',
    'crazy-time': '🎡',
    'monopoly': '🏠',
    'blackjack': '🃏',
    'baccarat': '🎯'
  };

  const colors = {
    'football-studio': 'from-green-600 to-green-800',
    'lightning-roulette': 'from-yellow-600 to-orange-800',
    'crazy-time': 'from-purple-600 to-pink-800',
    'monopoly': 'from-blue-600 to-cyan-800',
    'blackjack': 'from-red-600 to-maroon-800',
    'baccarat': 'from-indigo-600 to-purple-800'
  };

  return (
    <Link href={`/cassino/${game.id}`}>
      <div className={`bg-gradient-to-br ${colors[game.id] || 'from-gray-700 to-gray-900'} rounded-xl overflow-hidden shadow-lg hover:transform hover:scale-105 transition duration-300 cursor-pointer group`}>
        <div className="p-6 text-center">
          <div className="text-6xl mb-4 group-hover:animate-bounce">{icons[game.id] || '🎰'}</div>
          <h3 className="text-white font-bold text-lg">{game.name}</h3>
          <p className="text-gray-300 text-sm mt-1">{game.provider}</p>
          <div className="mt-4 flex justify-center">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white">
              Ao Vivo
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
