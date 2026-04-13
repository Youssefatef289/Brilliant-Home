import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', 'public');
const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'products.json'), 'utf8'));
const bad = [];
for (const pr of products) {
  for (const u of pr.images) {
    const rel = u.replace(/^\/image\//, '').split('/').map(decodeURIComponent).join(path.sep);
    const full = path.join(root, 'image', rel);
    if (!fs.existsSync(full)) bad.push({ u, full });
  }
}
console.log('missing', bad.length);
bad.forEach((x) => console.log(x.u));
