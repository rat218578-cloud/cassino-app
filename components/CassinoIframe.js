import { useEffect, useRef, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function CassinoIframe({ game = 'football-studio', operadorId = 'sortenabet' }) {
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginError, setShowLoginError] = useState(false);

  // URL que já inicia com a tela de login da Sortenabet
  const r2BaseUrl = process.env.NEXT_PUBLIC_R2_BASE_URL;
  const iframeSrc = `${r2BaseUrl}?game=${game}&operator=${operadorId}&lang=pt`;

  useEffect(() => {
    const handleIframeLoad = () => {
      console.log('✅ Iframe carregado');
      setIsLoading(false);
    };

    const handleMessage = (event) => {
      // Verificar origem
      if (!event.origin?.includes('evo-games.com')) return;
      
      console.log('📨 Mensagem do iframe:', event.data);
      
      // Detectar erro de autenticação
      if (event.data?.type === 'AUTH_ERROR' || event.data?.error?.includes('EV.5')) {
        setShowLoginError(true);
      }
      
      // Detectar login bem sucedido
      if (event.data?.type === 'GAME_LOADED' || event.data?.type === 'USER_AUTHENTICATED') {
        console.log('✅ Usuário autenticado!');
        setShowLoginError(false);
      }
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
      window.addEventListener('message', handleMessage);
    }

    return () => {
      if (iframe) iframe.removeEventListener('load', handleIframeLoad);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  if (showLoginError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center p-8 max-w-md">
          <div className="text-red-500 text-6xl mb-4">🔐</div>
          <h2 className="text-white text-2xl mb-2">Falha na Autenticação</h2>
          <p className="text-gray-400 mb-4">
            Suas credenciais não foram reconhecidas. Use o mesmo e-mail e senha da sua conta Sorte na Bet.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg transition"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {isLoading && <LoadingSpinner message="Carregando tela de login..." />}
      <iframe
        ref={iframeRef}
        src={iframeSrc}
        className="w-full h-full border-0"
        title="Sorte na Bet - Cassino Ao Vivo"
        allow="autoplay; fullscreen; camera; microphone; clipboard-read; clipboard-write; encrypted-media"
      />
    </div>
  );
}
