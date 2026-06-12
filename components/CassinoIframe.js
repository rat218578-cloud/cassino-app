import { useEffect, useRef, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function CassinoIframe({ game = 'football-studio', operadorId = 'sortenabet' }) {
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gameName, setGameName] = useState('');

  const r2BaseUrl = process.env.NEXT_PUBLIC_R2_BASE_URL;
  const iframeSrc = `${r2BaseUrl}?game=${game}&operator=${operadorId}&lang=pt`;

  useEffect(() => {
    const names = {
      'football-studio': 'Football Studio',
      'lightning-roulette': 'Lightning Roulette',
      'crazy-time': 'Crazy Time',
      'monopoly': 'Monopoly Live'
    };
    setGameName(names[game] || 'Cassino Ao Vivo');

    const handleIframeLoad = () => {
      console.log('Iframe carregado');
      setIsLoading(false);
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
      }
    };
  }, [game]);

  return (
    <div className="relative w-full h-[calc(100vh-200px)] bg-black rounded-xl overflow-hidden shadow-2xl">
      {/* Barra do jogo */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-black/90 to-transparent z-10 px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-white text-sm font-medium">AO VIVO</span>
          <span className="text-gray-500">|</span>
          <span className="text-yellow-500 text-sm font-semibold">{gameName}</span>
        </div>
      </div>

      {isLoading && <LoadingSpinner message="Carregando o jogo..." />}
      
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
