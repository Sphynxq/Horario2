"use client"
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import { useEffect } from "react";

function AuthGoogle() {
  const { data: session } = useSession();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn('google', { 
        redirect: false,
        callbackUrl: window.location.origin 
      });

      if (result?.error) {
        console.error("Error al iniciar sesión con Google:", result.error);
        return;
      }

      // Imprime toda la información de la respuesta
      console.log("Resultado completo de la autenticación:", result);
      
      if (session) {
        console.log("Información de la sesión:", {
          user: session.user,
          expires: session.expires
        });

        // Desglose detallado de la información del usuario
        console.log("Detalles del usuario:", {
          name: session.user?.name,
          email: session.user?.email,
          image: session.user?.image
        });

        try {
          await axios.post('/api/auth/registro', {
            email: session.user?.email,
          });
        } catch (error) {
          console.error("Error al registrar el usuario:", error);
        }
      }
    } catch (error) {
      console.error("Error durante la autenticación:", error);
    }
  };

  // Efecto para mostrar la información de la sesión cuando cambie
  useEffect(() => {
    if (session) {
      console.log("Sesión actualizada:", session);
    }
  }, [session]);

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
    >
      <img src="/google.svg" alt="Google logo" className="h-5 w-5 mr-2" />
      Continuar con Google
    </button>
  );
}

export default AuthGoogle;
