import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Document } from 'mongodb';
import bcrypt from 'bcrypt';

const uri: string = process.env.MONGODB_URI || 'mongodb+srv://Mataviejas:rCDeH9gFN6iN6tp@cluster0.olr1x.mongodb.net/';
const client = new MongoClient(uri);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await client.connect();
    const database = client.db('Usuarios');
    const collection = database.collection<Document>('Usuarios');

    if (req.method === 'POST') {
        const { email, password } = req.body;
        if (typeof email === 'string' && typeof password === 'string') {
            const usuario = await collection.findOne({ email });
            if (usuario && await bcrypt.compare(password, usuario.password)) {
                res.status(200).json(usuario);
            } else {
                res.status(404).json({ mensaje: 'Usuario no encontrado o contraseña incorrecta' });
            }
        } else {
            res.status(400).json({ mensaje: 'Email o contraseña inválidos' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}