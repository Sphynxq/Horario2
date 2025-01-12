import { useState } from 'react';
import Link from 'next/link';

interface Materia {
  clave: string;
  creditos: number;
  depto: string;
  grupo: string;
  semestre: number;
  lunes: string;
  martes: string;
  miercoles: string;
  jueves: string;
  viernes: string;
  docente: string;
}

export default function Home() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

}