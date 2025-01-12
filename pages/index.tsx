  //inicio del horario
  import { useState } from 'react';

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

    // Función para cargar materias de una API
    const cargarMaterias = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Aquí iría tu llamada a la API
        // const response = await fetch('tu-api/materias');
        // const data = await response.json();
        // setMaterias(data);
      } catch (err) {
        setError('Error al cargar las materias');
      } finally {
        setIsLoading(false);
      }
    };

    // Función para agregar una materia de ejemplo
    const agregarMateriaEjemplo = () => {
      const nuevaMateria: Materia = {
        clave: "MAT101",
        creditos: 8,
        depto: "Matemáticas",
        grupo: "A",
        semestre: 1,
        lunes: "7:00-9:00",
        martes: "7:00-9:00",
        miercoles: "7:00-9:00",
        jueves: "7:00-9:00",
        viernes: "7:00-9:00",
        docente: "Dr. Ejemplo"
      };
      setMaterias(prevMaterias => [...prevMaterias, nuevaMateria]);
    };

    const agregarMateriasPrueba = () => {
      const materiasPrueba: Materia[] = [
        {
          clave: "MAT101",
          creditos: 8,
          depto: "Matemáticas",
          grupo: "A",
          semestre: 1,
          lunes: "7:00-9:00",
          martes: "7:00-9:00",
          miercoles: "7:00-9:00",
          jueves: "7:00-9:00",
          viernes: "7:00-9:00",
          docente: "Dr. García"
        },
        {
          clave: "FIS202",
          creditos: 6,
          depto: "Física",
          grupo: "B",
          semestre: 2,
          lunes: "9:00-11:00",
          martes: "9:00-11:00",
          miercoles: "9:00-11:00",
          jueves: "9:00-11:00",
          viernes: "9:00-11:00",
          docente: "Dra. Rodríguez"
        },
        {
          clave: "QUI303",
          creditos: 7,
          depto: "Química",
          grupo: "C",
          semestre: 3,
          lunes: "11:00-13:00",
          martes: "11:00-13:00",
          miercoles: "11:00-13:00",
          jueves: "11:00-13:00",
          viernes: "11:00-13:00",
          docente: "Dr. Martínez"
        }
      ];

      setMaterias(materiasPrueba);
    };

    // Componente para mostrar el contenido de la tabla
    const TableContent = () => {
      if (materias.length === 0) {
        return (
          <tr>
            <td colSpan={2} className="text-center py-4 text-gray-500">
              No hay materias registradas
            </td>
          </tr>
        );
      }

      const headers = [
        { key: 'clave', label: 'Clave' },
        { key: 'creditos', label: 'Créditos' },
        { key: 'depto', label: 'DEPTO' },
        { key: 'grupo', label: 'Grupo' },
        { key: 'semestre', label: 'Semestre' },
        { key: 'lunes', label: 'Lunes' },
        { key: 'martes', label: 'Martes' },
        { key: 'miercoles', label: 'Miércoles' },
        { key: 'jueves', label: 'Jueves' },
        { key: 'viernes', label: 'Viernes' },
        { key: 'docente', label: 'Docente' },
      ];

      return (
        <>
          {headers.map(({ key, label }) => (
            <tr key={key} className="table-row">
              <th className="table-header bg-[#679FBF] text-white">{label}</th>
              {materias.map((materia, index) => (
                <td key={`${materia.clave}-${index}`} className="table-cell">
                  {materia[key as keyof Materia]}
                </td>
              ))}
            </tr>
          ))}
        </>
      );
    };

    return (
    <div className="bg-[#8E9AA1] min-h-screen p-8">
      <div className="container mx-auto">
        <div className="bg-[#CADBE5] rounded-xl shadow-lg p-6">
          <div className="mb-4">
            <button 
              onClick={agregarMateriasPrueba}
              className="bg-[#679FBF] hover:bg-[#4A7A9F] text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            >
              Cargar Materias de Prueba
            </button>
          </div>
          <div className="table-wrapper">
            <div className="table-container">
              <table className="w-full border-collapse">
                <tbody>
                  <TableContent />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }