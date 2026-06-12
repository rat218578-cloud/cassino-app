export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          <div className="inline-block animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-yellow-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-yellow-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="text-white text-xl font-semibold mt-6">Carregando Cassino Ao Vivo...</p>
        <p className="text-gray-400 text-sm mt-2">Estamos preparando sua experiência</p>
      </div>
    </div>
  );
}
