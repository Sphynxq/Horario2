import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

const SignOut: React.FC = () => {
  const router = useRouter();

  const handleManualSignOut = async () => {
    await signOut({ redirect: false }); // Cierra la sesión sin redirigir automáticamente
    router.push('/'); // Redirige a la página de inicio después de cerrar sesión
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-500 relative">
      
      {/* Botón de Cerrar Sesión en la esquina superior derecha */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleManualSignOut}
          className="bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition duration-300"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default SignOut;