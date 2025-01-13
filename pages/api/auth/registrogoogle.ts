import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Document } from 'mongodb';

const uri: string = process.env.MONGODB_URI || 'mongodb+srv://Mataviejas:rCDeH9gFN6iN6tp@cluster0.olr1x.mongodb.net/';
const client = new MongoClient(uri);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    await client.connect();
    const database = client.db('Usuarios');
    const collection = database.collection<Document>('usuariogoogle');

    const { email, name, image, accessToken } = req.body;

    // Verifica si el usuario ya existe
    const usuarioExistente = await collection.findOne({ email });
    
    if (usuarioExistente) {
      // Actualiza la información del usuario existente
      const actualizacion = await collection.updateOne(
        { email },
        {
          $set: {
            nombre: name,
            imagen: image,
            ultimoAcceso: new Date(),
            accessToken: accessToken,
            actualizadoEn: new Date()
          }
        }
      );

      console.log('Usuario actualizado en la base de datos:', {
        email,
        nombre: name,
        actualizado: actualizacion.modifiedCount > 0
      });

      return res.status(200).json({
        mensaje: 'Usuario actualizado con éxito',
        actualizado: true
      });
    }

    // Si no existe, crea un nuevo usuario
    const nuevoUsuario: Document = {
      email,
      nombre: name,
      imagen: image,
      accessToken: accessToken,
      creadoEn: new Date(),
      actualizadoEn: new Date(),
      ultimoAcceso: new Date(),
      provider: 'google'
    };

    const resultado = await collection.insertOne(nuevoUsuario);

    console.log('Nuevo usuario registrado en la base de datos:', {
      email,
      nombre: name,
      id: resultado.insertedId
    });

    return res.status(201).json({
      mensaje: 'Usuario registrado con éxito',
      id: resultado.insertedId
    });

  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return res.status(500).json({
      mensaje: 'Error al procesar la solicitud',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  } finally {
    await client.close();
  }
}