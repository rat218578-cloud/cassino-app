import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulação de login (substitua pela sua API real)
    setTimeout(() => {
      if (email === 'demo@teste.com' && password === '123456') {
        const user = { username: 'Demo', email, balance: 1000 };
        localStorage.setItem('token', 'fake-token-123');
        localStorage.setItem('user', JSON.stringify(user));
        router.push('/');
      } else {
        setError('E-mail ou senha inválidos');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-yellow-500/10 rounded-full mb-4">
            <svg className="w-16 h-16 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Cassino Ao Vivo</h1>
          <p className="text-gray-400">Entre com suas credenciais</p>
        </div>

        {/* Formulário */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition"
                placeholder="Digite seu e-mail"
                required
                disabled={isLoading}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition"
                placeholder="Digite sua senha"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Entrando...
                </span>
              ) : (
                'Entrar no Cassino'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Ainda não tem conta?{' '}
              <Link href="/cadastro" className="text-yellow-500 hover:text-yellow-400">
                Cadastre-se
              </Link>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-xs text-center">
              🔐 Credenciais de demonstração:<br />
              <span className="text-yellow-500">E-mail: demo@teste.com | Senha: 123456</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
