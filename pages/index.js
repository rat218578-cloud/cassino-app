import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona direto para o jogo
    // O iframe vai mostrar a tela de login da Sortenabet
    router.push('/cassino/football-studio');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 border-t-4 border-yellow-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg">Carregando cassino...</p>
      </div>
    </div>
  );
}
