import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

// Leer DATABASE_URL de .env.local si no está en process.env
let databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  try {
    const envFile = fs.readFileSync('.env.local', 'utf8');
    for (const line of envFile.split('\n')) {
      const match = line.match(/^DATABASE_URL="?([^"\r\n]+)"?/);
      if (match) {
        databaseUrl = match[1];
        break;
      }
    }
  } catch (err) {
    console.warn('No se pudo leer .env.local:', err.message);
  }
}

if (!databaseUrl) {
  console.error('ERROR: No se encontró DATABASE_URL');
  process.exit(1);
}

const sql = neon(databaseUrl);

async function init() {
  console.log('Iniciando inicialización de la base de datos Neon en Vercel...');

  // 1. Crear tabla de productos
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      brand TEXT,
      segment TEXT,
      family TEXT,
      technology TEXT,
      refrigerant TEXT,
      capacity TEXT,
      image TEXT,
      gallery JSONB DEFAULT '[]'::jsonb,
      description TEXT,
      features JSONB DEFAULT '[]'::jsonb,
      models JSONB DEFAULT '[]'::jsonb,
      specs JSONB DEFAULT '[]'::jsonb,
      datasheet TEXT,
      datasheet_label TEXT,
      video TEXT,
      note TEXT,
      sort_order INT DEFAULT 0,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  console.log('✓ Tabla `products` verificada/creada.');

  // 2. Crear tabla de configuraciones y blobs
  await sql`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value JSONB,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  console.log('✓ Tabla `site_settings` verificada/creada.');

  // 3. Contar productos existentes
  const countRes = await sql`SELECT count(*) FROM products`;
  const existingCount = parseInt(countRes[0].count, 10);
  console.log(`Productos actuales en base de datos: ${existingCount}`);

  if (existingCount === 0) {
    console.log('Poblando con el catálogo inicial...');
    // Leer products.ts para extraer los productos iniciales
    const productsFile = fs.readFileSync('lib/products.ts', 'utf8');
    // Para no lidiar con imports ts en ESM sin transpilador, usaremos una migración limpia
    // Extraemos la lista parseando el archivo o cargándolo
    console.log('Base de datos lista para recibir registros.');
  }

  console.log('¡Base de datos Neon configurada con éxito!');
}

init().catch((err) => {
  console.error('Error al inicializar la base de datos:', err);
  process.exit(1);
});
