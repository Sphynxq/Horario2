import React from 'react';
import SignOut from '@/components/signout';

const Tabla: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-500 relative">
      <h1 className="text-white text-3xl">Bienvenido a la Tabla</h1>
      {/* Aquí puedes agregar el contenido de la tabla */}

      {/* Componente de Cerrar Sesión en la parte superior derecha */}
      <div className="absolute top-4 right-4">
        <SignOut />
      </div>
    </div>
  );
};

export default Tabla;
