import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CassinoIframe from '../../components/CassinoIframe';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function CassinoPage() {
  const router = useRouter();
  const { jogo } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pequeno delay para carregamento suave
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  // Mapeamento de jogos
  const gameMap = {
    'football-studio': 'Football Studio',
    'lightning-roulette': 'Lightning Roulette',
    'crazy-time': 'Crazy Time',
    'monopoly': 'Monopoly Live',
  };

  const gameName = gameMap[jogo] || 'Cassino Ao Vivo';

  return (
    <>
      {/* Barra superior minimalista */}
      <div className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm z-50 px-4 py-3 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-white text-sm font-medium">AO VIVO</span>
          <span className="text-gray-500 text-sm">|</span>
          <span className="text-yellow-500 text-sm font-semibold">{gameName}</span>
        </div>
        <div className="text-white text-xs">
          <span className="text-gray-500">Powered by </span>
          <span className="text-yellow-500">Evolution Gaming</span>
        </div>
      </div>
      
      <CassinoIframe game={jogo || 'football-studio'} />
    </>
  );
}
