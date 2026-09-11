import { neon } from '@neondatabase/serverless';

export default async function handler(req: any, res: any) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!databaseUrl) {
    return res.status(500).json({ error: 'DATABASE_URL no configurada en las variables de entorno' });
  }

  const sql = neon(databaseUrl);

  try {
    if (req.method === 'GET') {
      const rows = await sql`SELECT * FROM products ORDER BY sort_order ASC, updated_at DESC`;
      const products = rows.map((r: any) => ({
        slug: r.slug,
        title: r.title,
        brand: r.brand || '',
        segment: r.segment || 'Residencial',
        family: r.family || '',
        technology: r.technology || '',
        refrigerant: r.refrigerant || '',
        capacity: r.capacity || '',
        image: r.image || '',
        gallery: r.gallery || [],
        description: r.description || '',
        features: r.features || [],
        models: r.models || [],
        specs: r.specs || [],
        datasheet: r.datasheet || undefined,
        datasheetLabel: r.datasheet_label || undefined,
        video: r.video || undefined,
        note: r.note || undefined,
      }));

      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
      return res.status(200).json(products);
    }

    if (req.method === 'POST') {
      const authHeader = req.headers['authorization'];
      const adminSecret = process.env.ADMIN_SECRET || 'CEROCLIMA_ADMIN';
      const providedSecret = req.body?.secret;

      if (authHeader !== `Bearer ${adminSecret}` && providedSecret !== adminSecret) {
        return res.status(401).json({ error: 'No autorizado para modificar el catálogo' });
      }

      const { products } = req.body;
      if (!Array.isArray(products)) {
        return res.status(400).json({ error: 'Formato inválido: se esperaba un array en el campo products' });
      }

      for (let i = 0; i < products.length; i++) {
        const p = products[i];
        await sql`
          INSERT INTO products (
            id, slug, title, brand, segment, family, technology, refrigerant,
            capacity, image, gallery, description, features, models, specs,
            datasheet, datasheet_label, video, note, sort_order
          ) VALUES (
            ${p.slug},
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
      }

      return res.status(200).json({ success: true, count: products.length });
    }

    return res.status(405).json({ error: 'Método no permitido' });
  } catch (err: any) {
    console.error('Error en /api/products:', err);
    return res.status(500).json({ error: err.message || 'Error interno del servidor' });
  }
}
