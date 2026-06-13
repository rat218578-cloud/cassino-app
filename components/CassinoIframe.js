import { useEffect, useState } from 'react';

export default function CassinoIframe({ game = 'football-studio', operadorId = 'sortenabet' }) {
  const [loading, setLoading] = useState(true);

  const r2BaseUrl = process.env.NEXT_PUBLIC_R2_BASE_URL;
  const iframeSrc = `${r2BaseUrl}?game=${game}&operator=${operadorId}&lang=pt`;

  useEffect(() => {
    const handleLoad = () => setLoading(false);
    const iframe = document.getElementById('casino-iframe');
    if (iframe) {
      iframe.addEventListener('load', handleLoad);
    }
    return () => {
      if (iframe) iframe.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="text-center">
            <div className="w-16 h-16 border-t-4 border-yellow-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white">Carregando cassino ao vivo...</p>
            <p className="text-gray-400 text-sm mt-2">Faça login com sua conta Sorte na Bet</p>
          </div>
        </div>
      )}
      <iframe
        id="casino-iframe"
        src={iframeSrc}
        className="w-full h-full border-0"
        title="Cassino Ao Vivo"
        allow="autoplay; fullscreen; camera; microphone; clipboard-read; clipboard-write; encrypted-media"
      />
    </div>
  );
}
