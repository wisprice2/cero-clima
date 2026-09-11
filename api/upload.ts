import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req: any, res: any) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { filename, file, contentType } = req.body;
    if (!file || !filename) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: filename y file' });
    }

    // Convertir data URL base64 a Buffer
    const base64Data = file.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const cleanName = filename.replace(/[^a-zA-Z0-9._-]/g, '-');
    const blob = await put(`catalog/${Date.now()}-${cleanName}`, buffer, {
      access: 'public',
      contentType: contentType || 'image/webp',
    });

    return res.status(200).json({ url: blob.url });
  } catch (err: any) {
    console.error('Error al subir a Vercel Blob:', err);
    return res.status(500).json({ error: err.message || 'Error al procesar la subida a Vercel Blob' });
  }
}
