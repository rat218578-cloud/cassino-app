import { useEffect, useRef, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function CassinoIframe({ game = 'football-studio', operadorId = 'sortenabet' }) {
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const r2BaseUrl = process.env.NEXT_PUBLIC_R2_BASE_URL;
  const iframeSrc = `${r2BaseUrl}?game=${game}&operator=${operadorId}&lang=pt`;

  useEffect(() => {
    const handleIframeLoad = () => {
      console.log('✅ Iframe carregado com sucesso');
      setIsLoading(false);
    };

    const handleIframeError = () => {
      console.error('❌ Erro no iframe');
      setError('Falha ao carregar o cassino. Tente novamente.');
      setIsLoading(false);
    };

    const handleMessage = (event) => {
      // Verificar origem segura
      const allowedOrigins = ['evo-games.com', 'evolution.com', 'egcdn.com'];
      const isAllowed = allowedOrigins.some(origin => event.origin.includes(origin));
      
      if (!isAllowed) return;
      
      console.log('📨 Mensagem:', event.data);
      
      switch (event.data?.type) {
        case 'GAME_LOADED':
          setIsLoading(false);
          break;
        case 'GAME_CLOSED':
          // Opcional: redirecionar
          break;
        default:
          break;
      }
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
      iframe.addEventListener('error', handleIframeError);
      window.addEventListener('message', handleMessage);
    }

    // Timeout de segurança
    const timeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 15000);

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
        iframe.removeEventListener('error', handleIframeError);
      }
      window.removeEventListener('message', handleMessage);
      clearTimeout(timeout);
    };
  }, [isLoading]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-white text-2xl mb-2">Erro ao carregar</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg transition"
          >
            Recarregar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {isLoading && <LoadingSpinner />}
      <iframe
        ref={iframeRef}
        src={iframeSrc}
        className="w-full h-full border-0"
        title="Cassino Ao Vivo"
        allow="autoplay; fullscreen; camera; microphone; clipboard-read; clipboard-write; encrypted-media"
      />
    </div>
  );
}
