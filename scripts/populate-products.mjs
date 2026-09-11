import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import { products } from './temp-products.mjs';

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

const sql = neon(databaseUrl);

async function seed() {
  console.log(`Insertando ${products.length} productos en la base de datos Neon...`);

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const id = p.slug;

    await sql`
      INSERT INTO products (
        id, slug, title, brand, segment, family, technology, refrigerant,
        capacity, image, gallery, description, features, models, specs,
        datasheet, datasheet_label, video, note, sort_order
      ) VALUES (
        ${id},
        ${p.slug},
        ${p.title},
        ${p.brand || null},
        ${p.segment || null},
        ${p.family || null},
        ${p.technology || null},
        ${p.refrigerant || null},
        ${p.capacity || null},
        ${p.image || null},
        ${JSON.stringify(p.gallery || [])}::jsonb,
        ${p.description || null},
        ${JSON.stringify(p.features || [])}::jsonb,
        ${JSON.stringify(p.models || [])}::jsonb,
        ${JSON.stringify(p.specs || [])}::jsonb,
        ${p.datasheet || null},
        ${p.datasheetLabel || null},
        ${p.video || null},
        ${p.note || null},
        ${i}
      )
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        brand = EXCLUDED.brand,
        segment = EXCLUDED.segment,
        family = EXCLUDED.family,
        technology = EXCLUDED.technology,
        refrigerant = EXCLUDED.refrigerant,
        capacity = EXCLUDED.capacity,
        image = EXCLUDED.image,
        gallery = EXCLUDED.gallery,
        description = EXCLUDED.description,
        features = EXCLUDED.features,
        models = EXCLUDED.models,
        specs = EXCLUDED.specs,
        datasheet = EXCLUDED.datasheet,
        datasheet_label = EXCLUDED.datasheet_label,
        video = EXCLUDED.video,
        note = EXCLUDED.note,
        sort_order = EXCLUDED.sort_order,
        updated_at = NOW();
    `;
    console.log(`✓ Insertado/Actualizado: ${p.title} (${p.slug})`);
  }

  const result = await sql`SELECT count(*) FROM products`;
  console.log(`\n¡Éxito total! Total de productos en Neon Postgres: ${result[0].count}`);
}

seed()
  .then(() => {
    // Eliminar archivo temporal
    try {
      fs.unlinkSync('scripts/temp-products.mjs');
    } catch {}
  })
  .catch((err) => {
    console.error('Error poblando productos:', err);
    process.exit(1);
  });
