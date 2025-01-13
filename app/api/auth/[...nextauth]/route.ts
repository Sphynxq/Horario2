import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

// Definir las constantes para GOOGLE_ID y GOOGLE_SECRET
const GOOGLE_ID = process.env.GOOGLE_ID as string;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET as string;

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account) return false;
      
      try {
        // Envía los datos a tu API de registro
        await axios.post('/api/auth/registro', {
          email: user.email,
          name: user.name,
          image: user.image,
          accessToken: account.access_token
        });
        return true;
      } catch (error) {
        console.error("Error al guardar usuario:", error);
        return true; // Permite el inicio de sesión incluso si falla el guardado
      }
    },
    async session({ session, token }) {
      // Añade información adicional a la sesión si lo necesitas
      return session;
    },
  },
});