import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona diretamente para o jogo
    // O iframe vai mostrar a tela de login da Sortenabet
    const timer = setTimeout(() => {
      router.push('/cassino/football-studio');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-6">
          <svg className="w-20 h-20 text-yellow-500 mx-auto animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Sorte na Bet</h1>
        <p className="text-gray-400 mb-8">Cassino Ao Vivo</p>
        <LoadingSpinner message="Redirecionando..." />
      </div>
    </div>
  );
}
