import styles from '../styles/Tabla.module.css';
import { useState, useEffect } from 'react';

interface Materia {
    clave: string;
    creditos: number;
    grupo: string;
    totalGps: string;
    materia: string;
    lunes: string;
    martes: string;
    miercoles: string;
    jueves: string;
    viernes: string;
    docente: string;
}

interface TablaDinamicaProps {
    datos: Materia[]; // Especificar un tipo más específico para los datos
}

const TablaDinamica: React.FC<TablaDinamicaProps> = ({ datos }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [semestreSeleccionado, setSemestreSeleccionado] = useState<string>("2");

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const semestres = [
        { valor: "2", texto: "Segundo Semestre" },
        { valor: "3", texto: "Tercer Semestre" },
        { valor: "4", texto: "Cuarto Semestre" },
        { valor: "5", texto: "Quinto Semestre" },
        { valor: "6", texto: "Sexto Semestre" },
        { valor: "7", texto: "Séptimo Semestre" },
        { valor: "8", texto: "Octavo Semestre"}
    ];

    const handleMostrarHorario = () => {
        // Lógica para mostrar el horario (actualmente vacía)
    };

    if (!isMounted) return null;

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Genera tu horario</h1>
            
            <div className={styles.selectorContainer}>
                <select 
                    value={semestreSeleccionado}
                    onChange={(e) => setSemestreSeleccionado(e.target.value)}
                    className={styles.selector}
                >
                    {semestres.map((semestre) => (
                        <option key={semestre.valor} value={semestre.valor}>
                            {semestre.texto}
                        </option>
                    ))}
                </select>
                <button 
                    onClick={handleMostrarHorario}
                    className={styles.botonGenerar}
                >
                    Mostrar Horario
                </button>
            </div>

            <div className={styles.tablaResponsive}>
                <table>
                    <thead>
                        <tr>
                            <th>Clave</th>
                            <th>Créditos</th>
                            <th>Grupo</th>
                            <th>Total Gps.</th>
                            <th>Materia</th>
                            <th>Lunes</th>
                            <th>Martes</th>
                            <th>Miércoles</th>
                            <th>Jueves</th>
                            <th>Viernes</th>
                            <th>Docente</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos.map((materia) => (
                            <tr key={materia.clave}>
                                <td>{materia.clave}</td>
                                <td>{materia.creditos}</td>
                                <td>{materia.grupo}</td>
                                <td>{materia.totalGps}</td>
                                <td>{materia.materia}</td>
                                <td>{materia.lunes}</td>
                                <td>{materia.martes}</td>
                                <td>{materia.miercoles}</td>
                                <td>{materia.jueves}</td>
                                <td>{materia.viernes}</td>
                                <td>{materia.docente}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaDinamica;