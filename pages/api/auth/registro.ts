import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Document } from 'mongodb';
import bcrypt from 'bcrypt';

const uri: string = process.env.MONGODB_URI || 'mongodb+srv://Mataviejas:rCDeH9gFN6iN6tp@cluster0.olr1x.mongodb.net/';
const client = new MongoClient(uri);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await client.connect();
    const database = client.db('Usuarios');
    const collection = database.collection<Document>('Usuarios');

    if (req.method === 'GET') {
        const usuarios = await collection.find({}).toArray();
        res.status(200).json(usuarios);
    } else if (req.method === 'POST') {
        const { nombre, email, password } = req.body;
        const usuarioExistente = await collection.findOne({ email });
        if (usuarioExistente) {
            return res.status(409).json({ mensaje: 'El usuario ya existe' });
        }
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        const nuevoUsuario: Document = { nombre, email, password: hash };
        const resultado = await collection.insertOne(nuevoUsuario);
        res.status(201).json({ mensaje: 'Usuario registrado con éxito', id: resultado.insertedId });
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}
