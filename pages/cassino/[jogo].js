import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function CassinoPage() {
  const router = useRouter();
  const { jogo } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const r2BaseUrl = process.env.NEXT_PUBLIC_R2_BASE_URL;
  const iframeSrc = `${r2BaseUrl}?game=${jogo || 'football-studio'}&operator=sortenabet&lang=pt`;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-red-500 text-xl mb-4">Erro ao carregar o cassino</p>
          <button onClick={() => window.location.reload()} className="bg-yellow-500 text-black px-4 py-2 rounded">
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {loading && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-t-4 border-yellow-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white">Carregando cassino ao vivo...</p>
          </div>
        </div>
      )}
      <iframe
        src={iframeSrc}
        className="w-full h-screen border-0"
        title="Cassino Ao Vivo"
        allow="autoplay; fullscreen; camera; microphone; clipboard-read; clipboard-write; encrypted-media"
      />
    </div>
  );
}
