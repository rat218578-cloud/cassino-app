import { useEffect, useRef, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function CassinoIframe({ game = 'football-studio', operadorId = 'sortenabet' }) {
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const r2BaseUrl = process.env.NEXT_PUBLIC_R2_BASE_URL;
  const iframeSrc = `${r2BaseUrl}?game=${game}&operator=${operadorId}&lang=pt`;

  useEffect(() => {
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
  }, []);

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
