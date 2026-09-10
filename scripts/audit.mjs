import fs from 'node:fs';
import path from 'node:path';

function checkFile(filepath) {
  const code = fs.readFileSync(filepath, 'utf8');
  const regex = /['"](\/(?:images|fichas|videos|captions)\/[^'"\s>]+)['"]/g;
  let match;
  const missing = [];
  const found = [];
  while ((match = regex.exec(code)) !== null) {
    const rawPath = match[1];
    const localPath = path.join('public', rawPath.replace(/^\//, ''));
    if (!fs.existsSync(localPath)) {
      missing.push({ file: filepath, asset: rawPath, localPath });
    } else {
      found.push(rawPath);
    }
  }
  return { missing, found };
}

const files = [
  'app/page.tsx',
  'app/layout.tsx',
  'app/productos/page.tsx',
  'app/productos/[slug]/page.tsx',
  'components/btu-selector.tsx',
  'components/catalog-explorer.tsx',
  'lib/products.ts',
];

let totalMissing = [];
for (const file of files) {
  if (fs.existsSync(file)) {
    const res = checkFile(file);
    totalMissing = totalMissing.concat(res.missing);
  }
}

console.log(JSON.stringify({
  missingCount: totalMissing.length,
  missing: totalMissing,
}, null, 2));
