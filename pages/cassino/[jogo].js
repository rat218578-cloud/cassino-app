import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CassinoIframe from '../../components/CassinoIframe';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function CassinoPage() {
  const router = useRouter();
  const { jogo } = router.query;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xl">🎰</span>
              </div>
              <span className="text-white font-bold">Cassino Ao Vivo</span>
            </Link>
            <Link href="/" className="text-gray-400 hover:text-white transition">
              ← Voltar ao lobby
            </Link>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <div className="container mx-auto px-4 py-6">
        <CassinoIframe game={jogo || 'football-studio'} />
      </div>
    </div>
  );
}
