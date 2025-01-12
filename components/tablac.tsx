import styles from '../styles/Tabla.module.css';
import { useState, useEffect } from 'react';

const TablaDinamica: React.FC<{ datos: any[] }> = ({ datos }) => {
    const [semestreSeleccionado, setSemestreSeleccionado] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        setSemestreSeleccionado('');
    }, []);

    const semestres = [
        { valor: '2', texto: 'Segundo Semestre' },
        { valor: '3', texto: 'Tercer Semestre' },
        { valor: '4', texto: 'Cuarto Semestre' },
        { valor: '5', texto: 'Quinto Semestre' },
        { valor: '6', texto: 'Sexto Semestre' },
        { valor: '7', texto: 'Séptimo Semestre' },
        { valor: '8', texto: 'Octavo Semestre' },
    ];

    const handleGenerar = () => {
        console.log('Generando con semestre:', semestreSeleccionado);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Genera tu horario</h1>
            <div className={styles.headerContainer}>
                <div className={styles.selectorContainer}>
                    <select 
                        value={semestreSeleccionado || ''} 
                        onChange={(e) => setSemestreSeleccionado(e.target.value)}
                        className={styles.selector}
                    >
                        <option value="">Selecciona un semestre</option>
                        {semestres.map((semestre) => (
                            <option key={semestre.valor} value={semestre.valor}>
                                {semestre.texto}
                            </option>
                        ))}
                    </select>
                </div>
                <button 
                    className={styles.botonGenerar}
                    onClick={handleGenerar}
                >
                    Generar
                </button>
            </div>
            <div className={styles.tablaResponsive}>
                <table>
                    <thead>
                        <tr>
                            <th>Clave</th>
                            <th>Créditos</th>
                            <th>Grupo</th>
                            <th>Lunes</th>
                            <th>Martes</th>
                            <th>Miércoles</th>
                            <th>Jueves</th>
                            <th>Viernes</th>
                            <th>Docente</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos && datos.length > 0 ? (
                            datos.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.clave}</td>
                                    <td>{item.creditos}</td>
                                    <td>{item.grupo}</td>
                                    <td>{item.lunes}</td>
                                    <td>{item.martes}</td>
                                    <td>{item.miercoles}</td>
                                    <td>{item.jueves}</td>
                                    <td>{item.viernes}</td>
                                    <td>{item.docente}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={9}>No hay datos disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaDinamica;