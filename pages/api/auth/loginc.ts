import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Document } from 'mongodb';
import bcrypt from 'bcrypt';

interface LoginResponse {
  success: boolean;
  mensaje?: string;
  usuario?: Document;
}

class LoginHandler {
  private client: MongoClient;
  private uri: string;

  constructor() {
    this.uri = process.env.MONGODB_URI || 'mongodb+srv://Mataviejas:rCDeH9gFN6iN6tp@cluster0.olr1x.mongodb.net/';
    this.client = new MongoClient(this.uri);
  }

  private async loginUser(email: string, password: string): Promise<Document> {
    await this.client.connect();
    const database = this.client.db('Usuarios');
    const collection = database.collection<Document>('Usuarios');

    const usuario = await collection.findOne({ email });
    if (usuario && await bcrypt.compare(password, usuario.password)) {
      return usuario;
    }
    throw new Error('Usuario no encontrado o contraseña incorrecta');
  }

  async handleRequest(req: NextApiRequest, res: NextApiResponse<LoginResponse>) {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({
        success: false,
        mensaje: `Método ${req.method} no permitido`
      });
    }

    const { email, password } = req.body;

    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({
        success: false,
        mensaje: 'Email o contraseña inválidos'
      });
    }

    try {
      const usuario = await this.loginUser(email, password);
      return res.status(200).json({
        success: true,
        usuario
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido'
      });
    } finally {
      await this.client.close();
    }
  }
}

const loginHandler = new LoginHandler();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return loginHandler.handleRequest(req, res);
}