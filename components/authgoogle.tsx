"use client"
import {signIn} from "next-auth/react";

function AuthGoogle() {
  return (
    <button
      onClick={() => signIn('google')}
      className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
    >
      <img src="/google.svg" alt="Google logo" className="h-5 w-5 mr-2" />
      Continuar con Google
    </button>
  );
}
export default AuthGoogle