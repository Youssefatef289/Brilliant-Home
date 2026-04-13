import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '..', 'src', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function fixText(s) {
  if (typeof s !== 'string') return s;
  return s
    .replace(/يتضمن هذا الألبوم/g, 'تتضمن هذه المجموعة')
    .replace(/ألبوم أسِرّة/g, 'مجموعة أسِرّة')
    .replace(/— ألبوم التصميم/g, '— التصميم')
    .replace(/— ألبوم كامل/g, '— معرض كامل')
    .replace(/ألبوم صور من/g, 'مجموعة صور من');
}

function imagePathFromUrls(urls) {
  return urls
    .map((u) =>
      u
        .replace(/^\/image\//, '')
        .split('/')
        .map((seg) => decodeURIComponent(seg))
        .join('/')
    )
    .join(' | ');
}

for (const p of products) {
  p.name = fixText(p.name);
  p.shortDescription = fixText(p.shortDescription);
  p.description = fixText(p.description);

  if (p.slug === 'bedrooms-bedroom---2') {
    p.images = [
      '/image/bedrooms/bedroom%20-%202/jofur%20(4).jpg',
      '/image/bedrooms/bedroom%20-%202/jofur%20(6).jpg',
      '/image/bedrooms/bedroom%20-%202/jofur%20(7).jpg',
      '/image/bedrooms/bedroom%20-%202/jofur%20(8).jpg',
    ];
    p.photoCount = 4;
    p.imagePath = imagePathFromUrls(p.images);
    p.shortDescription = p.shortDescription.replace(/\(\d+ صورة\)/, '(4 صور)');
    p.description = p.description.replace(/تتضمن هذه المجموعة \d+ صورة/, 'تتضمن هذه المجموعة 4 صور');
  }
  if (p.slug === 'bedrooms-bedroom--1') {
    p.images = [
      '/image/bedrooms/bedroom-%201/hoarfur%20%20(1).jpg',
      '/image/bedrooms/bedroom-%201/hoarfur%20%20(2).jpg',
      '/image/bedrooms/bedroom-%201/hoarfur%20%20(3).jpg',
      '/image/bedrooms/bedroom-%201/hoarfur%20%20(4).jpg',
      '/image/bedrooms/bedroom-%201/hoarfur%20%20(5).jpg',
    ];
    p.photoCount = 5;
    p.imagePath = imagePathFromUrls(p.images);
    p.shortDescription = p.shortDescription.replace(/\(\d+ صورة\)/, '(5 صور)');
    p.description = p.description.replace(/تتضمن هذه المجموعة \d+ صورة/, 'تتضمن هذه المجموعة 5 صور');
  }
}

fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');
console.log('patched', products.length, 'products');
