"use client"
import { useState } from "react";
import axios from "axios";

function AuthRegister() {
  const [nombre, setNombre] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/auth/registro', {
        nombre,
        email,
        password,
      });

      console.log('Usuario registrado:', response.data);
      // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Registrar Usuario</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister} disabled={isLoading}>
        {isLoading ? 'Registrando...' : 'Registrar'}
      </button>
    </div>
  );
}

export default AuthRegister; 