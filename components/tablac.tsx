import styles from '../styles/Tabla.module.css';
import { useState, useEffect } from 'react';

interface TablaDinamicaProps {
    datos: any[]; // Puedes especificar un tipo más específico según tus datos
}

const datosEjemplo = [
    // Grupo A
    {
        "clave": "2P2",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "A",
        "materia": "Programación Orientada a Objetos",
        "lunes": "12-13",
        "martes": "12-13",
        "miercoles": "12-13",
        "jueves": "12-13",
        "viernes": "12-13",
        "docente": "Adriana Guipón"
    },
    {
        "clave": "4P2",
        "creditos": 4,
        "grupo": "CB",
        "totalGps": "A",
        "materia": "Química",
        "lunes": "9-10",
        "martes": "9-10",
        "miercoles": "9-10",
        "jueves": "9-10",
        "viernes": "",
        "docente": "Raymundo Muñoz"
    },
    {
        "clave": "5P2",
        "creditos": 5,
        "grupo": "CB",
        "totalGps": "A",
        "materia": "Algebra Lineal",
        "lunes": "8-9",
        "martes": "8-9",
        "miercoles": "8-9",
        "jueves": "8-9",
        "viernes": "8-9",
        "docente": "Andres Quintana"
    },
    {
        "clave": "6P2",
        "creditos": 5,
        "grupo": "CB",
        "totalGps": "A",
        "materia": "Probabilidad y Estadística",
        "lunes": "13-14",
        "martes": "13-14",
        "miercoles": "13-14",
        "jueves": "13-14",
        "viernes": "13-14",
        "docente": "Humberto Cuevas"
    },
    {
        "clave": "1P2",
        "creditos": 5,
        "grupo": "CB",
        "totalGps": "A",
        "materia": "Calculo Integral",
        "lunes": "11-12",
        "martes": "11-12",
        "miercoles": "11-12",
        "jueves": "11-12",
        "viernes": "11-12",
        "docente": ""
    },
    {
        "clave": "3P2",
        "creditos": 4,
        "grupo": "EA",
        "totalGps": "A",
        "materia": "Contabilidad Financiera",
        "lunes": "10-11",
        "martes": "10-11",
        "miercoles": "10-11",
        "jueves": "10-11",
        "viernes": "",
        "docente": "Tomás Antonio Burciaga"
    },
    // Grupo B
    {
        "clave": "2P2",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "B",
        "materia": "Programación Orientada a Objetos",
        "lunes": "9-10",
        "martes": "9-10",
        "miercoles": "9-10",
        "jueves": "9-10",
        "viernes": "9-10",
        "docente": "Nora Cancela"
    },
    {
        "clave": "4P2",
        "creditos": 4,
        "grupo": "CB",
        "totalGps": "B",
        "materia": "Química",
        "lunes": "10-11",
        "martes": "10-11",
        "miercoles": "10-11",
        "jueves": "10-11",
        "viernes": "",
        "docente": "Raymundo Muñoz"
    },
    {
        "clave": "5P2",
        "creditos": 5,
        "grupo": "CB",
        "totalGps": "B",
        "materia": "Algebra Lineal",
        "lunes": "11-12",
        "martes": "11-12",
        "miercoles": "11-12",
        "jueves": "11-12",
        "viernes": "11-12",
        "docente": "Mónica Aguirre"
    },
    {
        "clave": "6P2",
        "creditos": 5,
        "grupo": "CB",
        "totalGps": "B",
        "materia": "Probabilidad y Estadística",
        "lunes": "12-13",
        "martes": "12-13",
        "miercoles": "12-13",
        "jueves": "12-13",
        "viernes": "12-13",
        "docente": "Humberto Cuevas"
    },
    {
        "clave": "1P2",
        "creditos": 5,
        "grupo": "CB",
        "totalGps": "B",
        "materia": "Calculo Integral",
        "lunes": "8-9",
        "martes": "8-9",
        "miercoles": "8-9",
        "jueves": "8-9",
        "viernes": "8-9",
        "docente": "Fernando de la Rosa"
    },
    {
        "clave": "3P2",
        "creditos": 4,
        "grupo": "EA",
        "totalGps": "B",
        "materia": "Contabilidad Financiera",
        "lunes": "13-14",
        "martes": "13-14",
        "miercoles": "13-14",
        "jueves": "13-14",
        "viernes": "",
        "docente": "Tomás Antonio Burciaga"
    },
    // Grupo C
    {
        "clave": "2P2",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "C",
        "materia": "Programación Orientada a Objetos",
        "lunes": "13-14",
        "martes": "13-14",
        "miercoles": "13-14",
        "jueves": "13-14",
        "viernes": "13-14",
        "docente": "Adriana Guipón"
    },
    {
        "clave": "4P2",
        "creditos": 4,
        "grupo": "CB",
        "totalGps": "C",
        "materia": "Química",
        "lunes": "8-9",
        "martes": "8-9",
        "miercoles": "8-9",
        "jueves": "8-9",
        "viernes": "",
        "docente": ""
    },
    {
        "clave": "5P2",
        "creditos": 5,
        "grupo": "CB",
        "totalGps": "C",
        "materia": "Algebra Lineal",
        "lunes": "9-10",
        "martes": "9-10",
        "miercoles": "9-10",
        "jueves": "9-10",
        "viernes": "9-10",
        "docente": ""
    },
    {
        "clave": "6P2",
        "creditos": 5,
        "grupo": "CB",
        "totalGps": "C",
        "materia": "Probabilidad y Estadística",
        "lunes": "10-11",
        "martes": "10-11",
        "miercoles": "10-11",
        "jueves": "10-11",
        "viernes": "10-11",
        "docente": ""
    },
    {
        "clave": "1P2",
        "creditos": 5,
        "grupo": "CB",
        "totalGps": "C",
        "materia": "Calculo Integral",
        "lunes": "11-12",
        "martes": "11-12",
        "miercoles": "11-12",
        "jueves": "11-12",
        "viernes": "11-12",
        "docente": ""
    },
    {
        "clave": "3P2",
        "creditos": 4,
        "grupo": "EA",
        "totalGps": "C",
        "materia": "Contabilidad Financiera",
        "lunes": "12-13",
        "martes": "12-13",
        "miercoles": "12-13",
        "jueves": "12-13",
        "viernes": "",
        "docente": "Tomás Antonio Burciaga"
    },
    // Grupo D
    {
        "clave": "2P2",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "D",
        "materia": "Programación Orientada a Objetos",
        "lunes": "18-19",
        "martes": "18-19",
        "miercoles": "18-19",
        "jueves": "18-19",
        "viernes": "18-19",
        "docente": "Rubén Hernández"
    },
    {
        "clave": "4P2",
        "creditos": 4,
        "grupo": "CB",
        "totalGps": "D",
        "materia": "Química",
        "lunes": "15-16",
        "martes": "15-16",
        "miercoles": "15-16",
        "jueves": "15-16",
        "viernes": "",
        "docente": ""
    },
    {
        "clave": "5P2",
        "creditos": 5,
        "grupo": "CB",
        "totalGps": "D",
        "materia": "Algebra Lineal",
        "lunes": "19-20",
        "martes": "19-20",
        "miercoles": "19-20",
        "jueves": "19-20",
        "viernes": "19-20",
        "docente": "Francia Karlos"
    },
    {
        "clave": "6P2",
        "creditos": 5,
        "grupo": "CB",
        "totalGps": "D",
        "materia": "Probabilidad y Estadística",
        "lunes": "16-17",
        "martes": "16-17",
        "miercoles": "16-17",
        "jueves": "16-17",
        "viernes": "16-17",
        "docente": "Gaudencio Jimenez"
    },
    {
        "clave": "1P2",
        "creditos": 5,
        "grupo": "CB",
        "totalGps": "D",
        "materia": "Calculo Integral",
        "lunes": "17-18",
        "martes": "17-18",
        "miercoles": "17-18",
        "jueves": "17-18",
        "viernes": "17-18",
        "docente": "Héctor García"
    },
    {
        "clave": "3P2",
        "creditos": 4,
        "grupo": "EA",
        "totalGps": "D",
        "materia": "Contabilidad Financiera",
        "lunes": "14-15",
        "martes": "14-15",
        "miercoles": "14-15",
        "jueves": "14-15",
        "viernes": "",
        "docente": "Tomás Antonio Burciaga"
    },
    // Grupo E
    {
        "clave": "2P2",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "E",
        "materia": "Programación Orientada a Objetos",
        "lunes": "19-20",
        "martes": "19-20",
        "miercoles": "19-20",
        "jueves": "19-20",
        "viernes": "19-20",
        "docente": "Rubén Hernández"
    },
    {
        "clave": "4P2",
        "creditos": 4,
        "grupo": "CB",
        "totalGps": "E",
        "materia": "Química",
        "lunes": "16-17",
        "martes": "16-17",
        "miercoles": "16-17",
        "jueves": "16-17",
        "viernes": "",
        "docente": ""
    },
    {
        "clave": "5P2",
        "creditos": 5,
        "grupo": "CB",
        "totalGps": "E",
        "materia": "Algebra Lineal",
        "lunes": "17-18",
        "martes": "17-18",
        "miercoles": "17-18",
        "jueves": "17-18",
        "viernes": "17-18",
        "docente": ""
    },
    {
        "clave": "6P2",
        "creditos": 5,
        "grupo": "CB",
        "totalGps": "E",
        "materia": "Probabilidad y Estadística",
        "lunes": "14-15",
        "martes": "14-15",
        "miercoles": "14-15",
        "jueves": "14-15",
        "viernes": "14-15",
        "docente": "Humberto Cuevas"
    },
    {
        "clave": "1P2",
        "creditos": 5,
        "grupo": "CB",
        "totalGps": "E",
        "materia": "Calculo Integral",
        "lunes": "18-19",
        "martes": "18-19",
        "miercoles": "18-19",
        "jueves": "18-19",
        "viernes": "18-19",
        "docente": "Francia Karlos"
    },
    {
        "clave": "3P2",
        "creditos": 4,
        "grupo": "EA",
        "totalGps": "E",
        "materia": "Contabilidad Financiera",
        "lunes": "15-16",
        "martes": "15-16",
        "miercoles": "15-16",
        "jueves": "15-16",
        "viernes": "",
        "docente": "Tomás Antonio Burciaga"
    },
    // Tercer Semestre - Grupo A (Matutino)
    {
        "clave": "2P3",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "A",
        "materia": "Estructura de Datos",
        "lunes": "8-9",
        "martes": "8-9",
        "miercoles": "8-9",
        "jueves": "8-9",
        "viernes": "8-9",
        "docente": "Nora Cancela"
    },
    {
        "clave": "1P3",
        "creditos": 5,
        "grupo": "CB",
        "totalGps": "A",
        "materia": "Calculo Vectorial",
        "lunes": "10-11",
        "martes": "10-11",
        "miercoles": "10-11",
        "jueves": "10-11",
        "viernes": "10-11",
        "docente": ""
    },
    {
        "clave": "5P3",
        "creditos": 5,
        "grupo": "CB",
        "totalGps": "A",
        "materia": "Desarrollo Sustentable",
        "lunes": "13-14",
        "martes": "13-14",
        "miercoles": "13-14",
        "jueves": "13-14",
        "viernes": "13-14",
        "docente": "Mario Silva"
    },
    {
        "clave": "6P3",
        "creditos": 5,
        "grupo": "CB",
        "totalGps": "A",
        "materia": "Fisica General",
        "lunes": "9-10",
        "martes": "9-10",
        "miercoles": "9-10",
        "jueves": "9-10",
        "viernes": "9-10",
        "docente": "Veronica Valenzuela"
    },
    {
        "clave": "4P3",
        "creditos": 4,
        "grupo": "II",
        "totalGps": "A",
        "materia": "Investigacion de Operaciones",
        "lunes": "12-13",
        "martes": "12-13",
        "miercoles": "12-13",
        "jueves": "12-13",
        "viernes": "",
        "docente": "Pavel Anaya"
    },
    {
        "clave": "3P3",
        "creditos": 4,
        "grupo": "EA",
        "totalGps": "A",
        "materia": "Cultura Empresarial",
        "lunes": "11-12",
        "martes": "11-12",
        "miercoles": "11-12",
        "jueves": "11-12",
        "viernes": "",
        "docente": "Olga Rebeca Castillo"
    },
    // Tercer Semestre - Grupo B (Vespertino)
    {
        "clave": "2P3",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "B",
        "materia": "Estructura de Datos",
        "lunes": "17-18",
        "martes": "17-18",
        "miercoles": "17-18",
        "jueves": "17-18",
        "viernes": "17-18",
        "docente": "Rubén Hernández"
    },
    {
        "clave": "1P3",
        "creditos": 5,
        "grupo": "CB",
        "totalGps": "B",
        "materia": "Calculo Vectorial",
        "lunes": "16-17",
        "martes": "16-17",
        "miercoles": "16-17",
        "jueves": "16-17",
        "viernes": "16-17",
        "docente": "Héctor García"
    },
    {
        "clave": "5P3",
        "creditos": 5,
        "grupo": "CB",
        "totalGps": "B",
        "materia": "Desarrollo Sustentable",
        "lunes": "18-19",
        "martes": "18-19",
        "miercoles": "18-19",
        "jueves": "18-19",
        "viernes": "18-19",
        "docente": ""
    },
    {
        "clave": "6P3",
        "creditos": 5,
        "grupo": "CB",
        "totalGps": "B",
        "materia": "Fisica General",
        "lunes": "14-15",
        "martes": "14-15",
        "miercoles": "14-15",
        "jueves": "14-15",
        "viernes": "14-15",
        "docente": ""
    },
    {
        "clave": "4P3",
        "creditos": 4,
        "grupo": "II",
        "totalGps": "B",
        "materia": "Investigacion de Operaciones",
        "lunes": "15-16",
        "martes": "15-16",
        "miercoles": "15-16",
        "jueves": "15-16",
        "viernes": "",
        "docente": ""
    },
    {
        "clave": "3P3",
        "creditos": 4,
        "grupo": "EA",
        "totalGps": "B",
        "materia": "Cultura Empresarial",
        "lunes": "19-20",
        "martes": "19-20",
        "miercoles": "19-20",
        "jueves": "19-20",
        "viernes": "",
        "docente": ""
    },
    // Cuarto Semestre - Grupo A (Matutino)
    {
        "clave": "3P4",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "A",
        "materia": "Topicos Avanzados de Programación",
        "lunes": "9-10",
        "martes": "9-10",
        "miercoles": "9-10",
        "jueves": "9-10",
        "viernes": "9-10",
        "docente": "Luis Acosta"
    },
    {
        "clave": "1P4",
        "creditos": 5,
        "grupo": "CB",
        "totalGps": "A",
        "materia": "Ecuaciones Diferenciales",
        "lunes": "10-11",
        "martes": "10-11",
        "miercoles": "10-11",
        "jueves": "10-11",
        "viernes": "10-11",
        "docente": ""
    },
    {
        "clave": "2P4",
        "creditos": 4,
        "grupo": "CB",
        "totalGps": "A",
        "materia": "Metodos Numericos",
        "lunes": "8-9",
        "martes": "8-9",
        "miercoles": "8-9",
        "jueves": "8-9",
        "viernes": "8-9",
        "docente": "Laura Ortega"
    },
    {
        "clave": "6P4",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "A",
        "materia": "Principios Electricos y Aplicaciones",
        "lunes": "13-14",
        "martes": "13-14",
        "miercoles": "13-14",
        "jueves": "13-14",
        "viernes": "13-14",
        "docente": "Luis Raúl Arzola"
    },
    {
        "clave": "3P5",
        "creditos": 5,
        "grupo": "II",
        "totalGps": "A",
        "materia": "Simulacion",
        "lunes": "12-13",
        "martes": "12-13",
        "miercoles": "12-13",
        "jueves": "12-13",
        "viernes": "12-13",
        "docente": "Miguel Angel Rodríguez"
    },
    {
        "clave": "4P4",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "A",
        "materia": "Fundamentos de Bases de Datos",
        "lunes": "11-12",
        "martes": "11-12",
        "miercoles": "11-12",
        "jueves": "11-12",
        "viernes": "11-12",
        "docente": "Héctor Flores"
    },
    // Cuarto Semestre - Grupo B (Matutino)
    {
        "clave": "3P4",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "B",
        "materia": "Topicos Avanzados de Programación",
        "lunes": "12-13",
        "martes": "12-13",
        "miercoles": "12-13",
        "jueves": "12-13",
        "viernes": "12-13",
        "docente": "Luis Acosta"
    },
    {
        "clave": "1P4",
        "creditos": 5,
        "grupo": "CB",
        "totalGps": "B",
        "materia": "Ecuaciones Diferenciales",
        "lunes": "13-14",
        "martes": "13-14",
        "miercoles": "13-14",
        "jueves": "13-14",
        "viernes": "13-14",
        "docente": "Monica Aguirre"
    },
    {
        "clave": "2P4",
        "creditos": 4,
        "grupo": "CB",
        "totalGps": "B",
        "materia": "Metodos Numericos",
        "lunes": "10-11",
        "martes": "10-11",
        "miercoles": "10-11",
        "jueves": "10-11",
        "viernes": "",
        "docente": ""
    },
    {
        "clave": "6P4",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "B",
        "materia": "Principios Electricos y Aplicaciones",
        "lunes": "8-9",
        "martes": "8-9",
        "miercoles": "8-9",
        "jueves": "8-9",
        "viernes": "8-9",
        "docente": "Royce Rodriguez"
    },
    {
        "clave": "3P5",
        "creditos": 5,
        "grupo": "II",
        "totalGps": "B",
        "materia": "Simulacion",
        "lunes": "11-12",
        "martes": "11-12",
        "miercoles": "11-12",
        "jueves": "11-12",
        "viernes": "11-12",
        "docente": ""
    },
    {
        "clave": "4P4",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "B",
        "materia": "Fundamentos de Bases de Datos",
        "lunes": "9-10",
        "martes": "9-10",
        "miercoles": "9-10",
        "jueves": "9-10",
        "viernes": "9-10",
        "docente": "Ignacio López"
    },
    // Cuarto Semestre - Grupo C (Vespertino)
    {
        "clave": "3P4",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "C",
        "materia": "Topicos Avanzados de Programación",
        "lunes": "18-19",
        "martes": "18-19",
        "miercoles": "18-19",
        "jueves": "18-19",
        "viernes": "18-19",
        "docente": "Joel Quintana"
    },
    {
        "clave": "1P4",
        "creditos": 5,
        "grupo": "CB",
        "totalGps": "C",
        "materia": "Ecuaciones Diferenciales",
        "lunes": "19-20",
        "martes": "19-20",
        "miercoles": "19-20",
        "jueves": "19-20",
        "viernes": "19-20",
        "docente": ""
    },
    {
        "clave": "2P4",
        "creditos": 4,
        "grupo": "CB",
        "totalGps": "C",
        "materia": "Metodos Numericos",
        "lunes": "16-17",
        "martes": "16-17",
        "miercoles": "16-17",
        "jueves": "16-17",
        "viernes": "",
        "docente": ""
    },
    {
        "clave": "6P4",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "C",
        "materia": "Principios Electricos y Aplicaciones",
        "lunes": "15-16",
        "martes": "15-16",
        "miercoles": "15-16",
        "jueves": "15-16",
        "viernes": "15-16",
        "docente": "Luis Raúl Arzola"
    },
    {
        "clave": "3P5",
        "creditos": 5,
        "grupo": "II",
        "totalGps": "C",
        "materia": "Simulacion",
        "lunes": "17-18",
        "martes": "17-18",
        "miercoles": "17-18",
        "jueves": "17-18",
        "viernes": "17-18",
        "docente": "Miguel Angel"
    },
    {
        "clave": "4P4",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "C",
        "materia": "Fundamentos de Bases de Datos",
        "lunes": "14-15",
        "martes": "14-15",
        "miercoles": "14-15",
        "jueves": "14-15",
        "viernes": "14-15",
        "docente": "Ignacio López"
    },
    // Cuarto Semestre - Grupo D (Vespertino)
    {
        "clave": "6P4",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "D",
        "materia": "Principios Electricos y Aplicaciones",
        "lunes": "16-17",
        "martes": "16-17",
        "miercoles": "16-17",
        "jueves": "16-17",
        "viernes": "16-17",
        "docente": "Ernesto Leal"
    },
    // Quinto Semestre - Grupo A (Matutino)
    {
        "clave": "1P5",
        "creditos": 4,
        "grupo": "SC",
        "totalGps": "A",
        "materia": "Fundamentos de Telecomunicaciones",
        "lunes": "7-8",
        "martes": "7-8",
        "miercoles": "7-8",
        "jueves": "7-8",
        "viernes": "",
        "docente": "Isela Mendoza"
    },
    {
        "clave": "5P4",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "A",
        "materia": "Lenguajes y Autómatas I",
        "lunes": "9-10",
        "martes": "9-10",
        "miercoles": "9-10",
        "jueves": "9-10",
        "viernes": "9-10",
        "docente": "Lorena Chavira"
    },
    {
        "clave": "1P6",
        "creditos": 4,
        "grupo": "SC",
        "totalGps": "A",
        "materia": "Sistemas Operativos",
        "lunes": "11-12",
        "martes": "11-12",
        "miercoles": "11-12",
        "jueves": "11-12",
        "viernes": "",
        "docente": "Isela Mendoza"
    },
    {
        "clave": "6P5",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "A",
        "materia": "Arquitectura de Computadoras",
        "lunes": "12-13",
        "martes": "12-13",
        "miercoles": "12-13",
        "jueves": "12-13",
        "viernes": "12-13",
        "docente": "Luis Raúl Arzola"
    },
    {
        "clave": "2P5",
        "creditos": 4,
        "grupo": "SC",
        "totalGps": "A",
        "materia": "Fundamentos de Ingeniería SW",
        "lunes": "13-14",
        "martes": "13-14",
        "miercoles": "13-14",
        "jueves": "13-14",
        "viernes": "",
        "docente": "María Eugenia Cardona"
    },
    {
        "clave": "4P5",
        "creditos": 4,
        "grupo": "SC",
        "totalGps": "A",
        "materia": "Taller de Bases de Datos",
        "lunes": "10-11",
        "martes": "10-11",
        "miercoles": "10-11",
        "jueves": "10-11",
        "viernes": "",
        "docente": "Teresa de la Rosa"
    },
    {
        "clave": "4P8",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "A",
        "materia": "Programación WEB",
        "lunes": "8-9",
        "martes": "8-9",
        "miercoles": "8-9",
        "jueves": "8-9",
        "viernes": "8-9",
        "docente": "Luis Acosta"
    },
    // Quinto Semestre - Grupo B (Vespertino)
    {
        "clave": "1P5",
        "creditos": 4,
        "grupo": "SC",
        "totalGps": "B",
        "materia": "Fundamentos de Telecomunicaciones",
        "lunes": "19-20",
        "martes": "19-20",
        "miercoles": "19-20",
        "jueves": "19-20",
        "viernes": "",
        "docente": ""
    },
    {
        "clave": "5P4",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "B",
        "materia": "Lenguajes y Autómatas I",
        "lunes": "18-19",
        "martes": "18-19",
        "miercoles": "18-19",
        "jueves": "18-19",
        "viernes": "18-19",
        "docente": "Lorena Chavira"
    },
    {
        "clave": "1P6",
        "creditos": 4,
        "grupo": "SC",
        "totalGps": "B",
        "materia": "Sistemas Operativos",
        "lunes": "14-15",
        "martes": "14-15",
        "miercoles": "14-15",
        "jueves": "14-15",
        "viernes": "",
        "docente": "Isela Mendoza"
    },
    {
        "clave": "6P5",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "B",
        "materia": "Arquitectura de Computadoras",
        "lunes": "17-18",
        "martes": "17-18",
        "miercoles": "17-18",
        "jueves": "17-18",
        "viernes": "17-18",
        "docente": "Luis Raúl Arzola"
    },
    {
        "clave": "2P5",
        "creditos": 4,
        "grupo": "SC",
        "totalGps": "B",
        "materia": "Fundamentos de Ingeniería SW",
        "lunes": "15-16",
        "martes": "15-16",
        "miercoles": "15-16",
        "jueves": "15-16",
        "viernes": "",
        "docente": "Ilya Sánchez"
    },
    {
        "clave": "4P5",
        "creditos": 4,
        "grupo": "SC",
        "totalGps": "B",
        "materia": "Taller de Bases de Datos",
        "lunes": "16-17",
        "martes": "16-17",
        "miercoles": "16-17",
        "jueves": "16-17",
        "viernes": "",
        "docente": "Rubén Hernández"
    },
    {
        "clave": "4P8",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "B",
        "materia": "Programación WEB",
        "lunes": "13-14",
        "martes": "13-14",
        "miercoles": "13-14",
        "jueves": "13-14",
        "viernes": "13-14",
        "docente": "Luis Acosta"
    },
    {
        "clave": "1P5",
        "creditos": 4,
        "grupo": "SC",
        "totalGps": "B",
        "materia": "Fundamentos de Telecomunicaciones",
        "lunes": "13-14",
        "martes": "13-14",
        "miercoles": "13-14",
        "jueves": "13-14",
        "viernes": "",
        "docente": "Isela Mendoza",
        "esExtra": true
    },
    {
        "clave": "5P4",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "B",
        "materia": "Lenguajes y Autómatas I",
        "lunes": "12-13",
        "martes": "12-13",
        "miercoles": "12-13",
        "jueves": "12-13",
        "viernes": "12-13",
        "docente": "Lorena Chavira",
        "esExtra": true
    },
    // Sexto Semestre - Grupo A (Matutino)
    {
        "clave": "2P6",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "A",
        "materia": "Redes de Computadoras",
        "lunes": "13-14",
        "martes": "13-14",
        "miercoles": "13-14",
        "jueves": "13-14",
        "viernes": "13-14",
        "docente": "Joel Quintana"
    },
    {
        "clave": "5P5",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "A",
        "materia": "Lenguajes y Autómatas II",
        "lunes": "10-11",
        "martes": "10-11",
        "miercoles": "10-11",
        "jueves": "10-11",
        "viernes": "10-11",
        "docente": "Lorena Chavira"
    },
    {
        "clave": "6P7",
        "creditos": 4,
        "grupo": "SC",
        "totalGps": "A",
        "materia": "Sistemas Programables",
        "lunes": "12-13",
        "martes": "12-13",
        "miercoles": "12-13",
        "jueves": "12-13",
        "viernes": "",
        "docente": "Arturo Legarda"
    },
    {
        "clave": "6P6",
        "creditos": 4,
        "grupo": "SC",
        "totalGps": "A",
        "materia": "Lenguajes de Interfaz",
        "lunes": "11-12",
        "martes": "11-12",
        "miercoles": "11-12",
        "jueves": "11-12",
        "viernes": "",
        "docente": "Arturo Legarda"
    },
    {
        "clave": "5P6",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "A",
        "materia": "Ingeniería de SW",
        "lunes": "9-10",
        "martes": "9-10",
        "miercoles": "9-10",
        "jueves": "9-10",
        "viernes": "9-10",
        "docente": "Miriam García"
    },
    {
        "clave": "4P6",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "A",
        "materia": "Administración de Bases de Datos",
        "lunes": "8-9",
        "martes": "8-9",
        "miercoles": "8-9",
        "jueves": "8-9",
        "viernes": "8-9",
        "docente": "Ignacio López"
    },
    // Sexto Semestre - Grupo B (Vespertino)
    {
        "clave": "2P6",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "B",
        "materia": "Redes de Computadoras",
        "lunes": "18-19",
        "martes": "18-19",
        "miercoles": "18-19",
        "jueves": "18-19",
        "viernes": "18-19",
        "docente": "Sergio Talavera"
    },
    {
        "clave": "5P5",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "B",
        "materia": "Lenguajes y Autómatas II",
        "lunes": "19-20",
        "martes": "19-20",
        "miercoles": "19-20",
        "jueves": "19-20",
        "viernes": "19-20",
        "docente": ""
    },
    {
        "clave": "6P7",
        "creditos": 4,
        "grupo": "SC",
        "totalGps": "B",
        "materia": "Sistemas Programables",
        "lunes": "17-18",
        "martes": "17-18",
        "miercoles": "17-18",
        "jueves": "17-18",
        "viernes": "",
        "docente": "Arturo Legarda"
    },
    {
        "clave": "6P6",
        "creditos": 4,
        "grupo": "SC",
        "totalGps": "B",
        "materia": "Lenguajes de Interfaz",
        "lunes": "16-17",
        "martes": "16-17",
        "miercoles": "16-17",
        "jueves": "16-17",
        "viernes": "",
        "docente": "Arturo Legarda"
    },
    {
        "clave": "5P6",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "B",
        "materia": "Ingeniería de SW",
        "lunes": "13-14",
        "martes": "13-14",
        "miercoles": "13-14",
        "jueves": "13-14",
        "viernes": "13-14",
        "docente": "Miriam García"
    },
    {
        "clave": "4P6",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "B",
        "materia": "Administración de Bases de Datos",
        "lunes": "15-16",
        "martes": "15-16",
        "miercoles": "15-16",
        "jueves": "15-16",
        "viernes": "15-16",
        "docente": "Ignacio López"
    },
    {
        "clave": "CI1",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "B",
        "materia": "Seguridad Redes Privadas",
        "lunes": "14-15",
        "martes": "14-15",
        "miercoles": "14-15",
        "jueves": "14-15",
        "viernes": "14-15",
        "docente": "Joel Quintana"
    },
    // Sexto Semestre - Grupo C (Vespertino)
    {
        "clave": "2P6",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "C",
        "materia": "Redes de Computadoras",
        "lunes": "19-20",
        "martes": "19-20",
        "miercoles": "19-20",
        "jueves": "19-20",
        "viernes": "19-20",
        "docente": "Sergio Talavera"
    },
    // Séptimo Semestre - Grupo A (Matutino)
    {
        "clave": "2P7",
        "creditos": 5,
        "grupo": "SC",
        "totalGps": "A",
        "materia": "Conmutación y enrutamientos redes",
        "lunes": "10-11",
        "martes": "10-11",
        "miercoles": "10-11",
        "jueves": "10-11",
        "viernes": "10-11",
        "docente": ""
    },
    {
        "clave": "1P7",
        "creditos": 4,
        "grupo": "SC",
        "totalGps": "A",
        "materia": "Taller de Sistemas Operativos",
        "lunes": "12-13",
        "martes": "12-13",
        "miercoles": "12-13",
        "jueves": "12-13",
        "viernes": "",
        "docente": ""
    },
    {
        "clave": "3P7",
        "creditos": 4,
        "grupo": "SC",
        "totalGps": "A",
        "materia": "Taller de Investigación I",
        "lunes": "9-10",
        "martes": "9-10",
        "miercoles": "9-10",
        "jueves": "9-10",
        "viernes": "",
        "docente": "Alonso Bassanetti"
    },
    {
        "clave": "1P8",
        "creditos": 4,
        "grupo": "SC",
        "totalGps": "A",
        "materia": "Programación lógica y funcional",
        "lunes": "11-12",
        "martes": "11-12",
        "miercoles": "11-12",
        "jueves": "11-12",
        "viernes": "",
        "docente": "Arturo Alvarado"
    },
    {
        "clave": "5P7",
        "creditos": 6,
        "grupo": "SC",
        "totalGps": "A",
        "materia": "Gestión de proyectos de software",
        "lunes": "8-9",
        "martes": "8-9",
        "miercoles": "8-9",
        "jueves": "8-9",
        "viernes": "8-10",
        "docente": "Martín González"
    },
    // Séptimo Semestre - Grupo B (Vespertino)
    {
        "clave": "1P7",
        "creditos": 4,
        "grupo": "SC",
        "totalGps": "B",
        "materia": "Taller de Sistemas Operativos",
        "lunes": "15-16",
        "martes": "15-16",
        "miercoles": "15-16",
        "jueves": "15-16",
        "viernes": "",
        "docente": "Mario Espadas"
    }
];

const TablaDinamica: React.FC<TablaDinamicaProps> = ({ datos }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [grupoSeleccionado, setGrupoSeleccionado] = useState<string>("A");
    const [mostrarHorario, setMostrarHorario] = useState(false);
    const [semestreSeleccionado, setSemestreSeleccionado] = useState<string>("2");
    const [error, setError] = useState<string | null>(null);

    const materiasFiltradas = datosEjemplo.filter(item => {
        const grupoCoincide = item.totalGps === grupoSeleccionado;
        
        if (semestreSeleccionado === "4") {
            return grupoCoincide && (
                item.clave.includes("P4") || 
                item.clave === "3P5"
            ) && item.clave !== "5P4";
        } else if (semestreSeleccionado === "5") {
            return grupoCoincide && (
                item.clave.includes("P5") || 
                item.clave === "5P4" || 
                item.clave === "1P6" ||
                item.clave === "4P8"
            ) && item.clave !== "3P5" && item.clave !== "5P5";
        } else if (semestreSeleccionado === "6") {
            return grupoCoincide && (
                item.clave.includes("P6") || 
                item.clave === "5P5" ||
                item.clave === "6P7" ||
                item.clave === "CI1"
            );
        } else if (semestreSeleccionado === "7") {
            return grupoCoincide && (
                item.clave.includes("P7") ||
                item.clave === "1P8"
            );
        }
        
        return grupoCoincide && item.clave.includes(`P${semestreSeleccionado}`);
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const grupos = [
        { valor: "A", texto: "Grupo A" },
        { valor: "B", texto: "Grupo B" },
        { valor: "C", texto: "Grupo C" },
        { valor: "D", texto: "Grupo D" },
        { valor: "E", texto: "Grupo E" }
    ];

    const semestres = [
        { valor: "2", texto: "Segundo Semestre" },
        { valor: "3", texto: "Tercer Semestre" },
        { valor: "4", texto: "Cuarto Semestre" },
        { valor: "5", texto: "Quinto Semestre" },
        { valor: "6", texto: "Sexto Semestre" },
        { valor: "7", texto: "Séptimo Semestre" }
    ];

    const existeGrupo = (semestre: string, grupo: string) => {
        // Validación específica para quinto semestre
        if (semestre === "5" && grupo !== "A" && grupo !== "B") {
            return false;
        }
        // Validación específica para sexto semestre
        if (semestre === "6" && !["A", "B", "C"].includes(grupo)) {
            return false;
        }
        // Validación específica para séptimo semestre
        if (semestre === "7" && !["A", "B"].includes(grupo)) {
            return false;
        }
        
        return datosEjemplo.some(item => 
            item.clave.includes(`P${semestre}`) && item.totalGps === grupo
        );
    };

    const handleMostrarHorario = () => {
        if (semestreSeleccionado === "5" && grupoSeleccionado !== "A" && grupoSeleccionado !== "B") {
            setError(`El grupo ${grupoSeleccionado} no existe para el quinto semestre. Solo están disponibles los grupos A y B.`);
            setMostrarHorario(false);
            return;
        }
        
        if (semestreSeleccionado === "6" && !["A", "B", "C"].includes(grupoSeleccionado)) {
            setError(`El grupo ${grupoSeleccionado} no existe para el sexto semestre. Solo están disponibles los grupos A, B y C.`);
            setMostrarHorario(false);
            return;
        }

        if (semestreSeleccionado === "7" && !["A", "B"].includes(grupoSeleccionado)) {
            setError(`El grupo ${grupoSeleccionado} no existe para el séptimo semestre. Solo están disponibles los grupos A y B.`);
            setMostrarHorario(false);
            return;
        }
        
        if (!existeGrupo(semestreSeleccionado, grupoSeleccionado)) {
            setError(`El grupo ${grupoSeleccionado} no existe para el ${semestres.find(s => s.valor === semestreSeleccionado)?.texto.toLowerCase()}`);
            setMostrarHorario(false);
            return;
        }
        
        setError(null);
        setMostrarHorario(true);
    };

    useEffect(() => {
        setError(null);
        setMostrarHorario(false);
    }, [semestreSeleccionado, grupoSeleccionado]);

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
                <select 
                    value={grupoSeleccionado}
                    onChange={(e) => setGrupoSeleccionado(e.target.value)}
                    className={styles.selector}
                >
                    {grupos.map((grupo) => (
                        <option key={grupo.valor} value={grupo.valor}>
                            {grupo.texto}
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

            {error && (
                <div className={styles.error}>
                    {error}
                </div>
            )}

            {mostrarHorario && !error && (
                <div className={styles.tablaResponsive}>
                    <table>
                        <thead>
                            <tr>
                                <th>Clave</th>
                                <th>Créditos</th>
                                <th>Depto</th>
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
                            {materiasFiltradas.map((item, index) => (
                                <tr key={index} className={item.esExtra ? styles.materiaExtra : ''}>
                                    <td>{item.clave}</td>
                                    <td>{item.creditos}</td>
                                    <td>{item.grupo}</td>
                                    <td>{item.totalGps}</td>
                                    <td>{item.materia} {item.esExtra && '(Extra)'}</td>
                                    <td>{item.lunes}</td>
                                    <td>{item.martes}</td>
                                    <td>{item.miercoles}</td>
                                    <td>{item.jueves}</td>
                                    <td>{item.viernes}</td>
                                    <td>{item.docente}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TablaDinamica;