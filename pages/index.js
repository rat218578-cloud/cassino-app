import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import GameCard from '../components/GameCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const games = [
    { id: 'football-studio', name: 'Football Studio', provider: 'Evolution Gaming', popular: true },
    { id: 'lightning-roulette', name: 'Lightning Roulette', provider: 'Evolution Gaming', popular: true },
    { id: 'crazy-time', name: 'Crazy Time', provider: 'Evolution Gaming', popular: true },
    { id: 'monopoly', name: 'Monopoly Live', provider: 'Evolution Gaming', popular: false },
    { id: 'blackjack', name: 'Blackjack', provider: 'Evolution Gaming', popular: false },
    { id: 'baccarat', name: 'Baccarat', provider: 'Evolution Gaming', popular: false },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return <LoadingSpinner message="Verificando autenticação..." />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      {/* Banner principal */}
      <div className="bg-gradient-to-r from-purple-800 to-pink-800 rounded-2xl p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Bem-vindo ao Cassino Ao Vivo!</h1>
        <p className="text-purple-200">Escolha seu jogo favorito e comece a jogar agora mesmo.</p>
      </div>

      {/* Jogos Populares */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">🔥 Jogos Populares</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.filter(g => g.popular).map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>

      {/* Todos os Jogos */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">🎮 Todos os Jogos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
