export default function LoadingSpinner({ message = "Carregando..." }) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
        </div>
        <p className="text-white text-lg font-semibold mt-4">{message}</p>
        <p className="text-gray-400 text-sm mt-2">Aguardando autenticação...</p>
      </div>
    </div>
  );
}
