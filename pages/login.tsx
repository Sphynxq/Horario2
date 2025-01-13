import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { signIn, useSession, signOut } from 'next-auth/react'; // Importa signIn, useSession y signOut
import AuthGoogle from '@/components/authgoogle'; // Asegúrate de que la ruta sea correcta

const LoginComponent: React.FC<{ onSuccess: () => void; setShowLogin: (value: boolean) => void; setShowRegister: (value: boolean) => void; }> = ({ onSuccess, setShowLogin, setShowRegister }) => {
  const { data: session } = useSession(); // Obtiene la sesión actual
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/auth/loginc', {
        email,
        password,
      });

      console.log('Usuario autenticado:', response.data);
      onSuccess(); // Llama a la función onSuccess al iniciar sesión correctamente
      router.push('/tabla'); // Redirigir a tabla.tsx
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(); // Cierra la sesión
    setShowLogin(false); // Establece showLogin a false
    setShowRegister(false); // Establece showRegister a false
    router.push('/'); // Redirige a la página de inicio
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-500 p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
          Iniciar sesión
        </h2>
        {session?.user ? (
          <div className="flex flex-col items-center">
            <p className="text-lg">Bienvenido, {session.user.email}</p>
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition duration-300"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="tu@ejemplo.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isLoading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>
        )}
        
        {/* Botón de SignIn de Google */}
        <div className="mt-4">
          <AuthGoogle />
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;