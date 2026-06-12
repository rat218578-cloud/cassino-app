import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Verificar se está logado
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setBalance(parsed.balance || 0);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (!user) return children;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header profissional */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xl">🎰</span>
              </div>
              <span className="text-white font-bold text-xl hidden sm:block">Cassino Ao Vivo</span>
            </Link>

            {/* Saldo e usuário */}
            <div className="flex items-center space-x-4">
              <div className="bg-gray-700 rounded-lg px-4 py-2">
                <span className="text-gray-400 text-sm">Saldo</span>
                <span className="text-yellow-500 font-bold ml-2">R$ {balance.toFixed(2)}</span>
              </div>
              <div className="relative group">
                <button className="flex items-center space-x-2 bg-gray-700 rounded-lg px-4 py-2 hover:bg-gray-600 transition">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">{user?.username?.[0]?.toUpperCase() || 'U'}</span>
                  </div>
                  <span className="text-white">{user?.username || 'Usuário'}</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl hidden group-hover:block">
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg">
                    Sair
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">© 2024 Cassino Ao Vivo. Todos os direitos reservados.</p>
          <p className="text-gray-500 text-xs mt-2">Powered by Evolution Gaming</p>
        </div>
      </footer>
    </div>
  );
}
