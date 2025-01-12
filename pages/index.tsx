import { useState } from 'react';
import RegisterComponent from './register';
import LoginComponent from './login';
import { useRouter } from 'next/router';

export default function Home() {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const router = useRouter();

  const handleRegistrationSuccess = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleLoginSuccess = () => {
    // Redirigir al usuario a la página de tabla
    router.push('/tabla');
  };

  const handleOpenRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleOpenLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  return (
    <div className="bg-[#99C7F0] min-h-screen flex items-center justify-center relative">
      <div className="absolute top-0 left-0 right-0 bg-[#B2D6E0] p-4 flex flex-col items-center">
        <h1 className="text-black text-3xl font-bold text-center">Generador de horario</h1>
        <div className="flex justify-end w-full">
          <button
            onClick={handleOpenRegister}
            className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 mr-2"
          >
            Registrarse
          </button>
          <button
            onClick={handleOpenLogin}
            className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Iniciar sesión
          </button>
        </div>
      </div>

      {showLogin ? (
        <LoginComponent onSuccess={handleLoginSuccess} />
      ) : showRegister ? (
        <RegisterComponent onSuccess={handleRegistrationSuccess} />
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold"></h1>
          <h1 className="text-2xl font-bold">Este es un generador de horario el cual tiene como objetivo apoyar a los alumnos, registrate o inicia sesión para continuar</h1>
        
        </div>
      )}
    </div>
  );
}


