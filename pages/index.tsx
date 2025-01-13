import { useEffect, useState } from 'react';
import RegisterComponent from './register';
import LoginComponent from './login';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false);

  const handleRegistrationSuccess = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleLoginSuccess = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleOpenRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleOpenLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  // Redirigir a la página de tabla si hay sesión activa
  useEffect(() => {
    if (session) {
      router.push('/tabla');
    }
  }, [session, router]);

  return (
    <div className="bg-[#99C7F0] min-h-screen flex items-center justify-center relative">
      {showLogin ? (
        <LoginComponent onSuccess={handleLoginSuccess} setShowLogin={setShowLogin} setShowRegister={setShowRegister} />
      ) : showRegister ? (
        <RegisterComponent onSuccess={handleRegistrationSuccess} />
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold">Este proyecto está diseñado para facilitar la elaboración de tu horario</h1>
          <br></br> 
          <h1 className="text-2xl ">(Es una beta puede contener errores)</h1>
        </div>
      )}

      {/* Botón de Cerrar Sesión */}
      {session && (
        <div className="absolute top-4 right-4">
          <button
            onClick={() => signOut()}
            className="bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition duration-300"
          >
            Cerrar sesión
          </button>
        </div>
      )}

      {/* Botón de Iniciar Sesión solo se muestra si no hay sesión activa */}
      {!session && (
        <button
          onClick={handleOpenLogin}
          className="absolute top-4 right-20 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Iniciar sesión
        </button>
      )}

      {/* Botón de Registrarse solo se muestra si no hay sesión activa */}
      {!session && (
        <button
          onClick={handleOpenRegister}
          className="absolute top-4 right-60 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Registrarse
        </button>
      )}
    </div>
  );
}



