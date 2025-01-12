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
  return <div>Hello World</div>;
}