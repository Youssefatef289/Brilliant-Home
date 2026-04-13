import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGE_ROOT = path.join(__dirname, '..', 'image');
const OUT = path.join(__dirname, '..', 'src', 'data', 'products.json');

/** @type {Record<string, { id: string; label: string }>} */
const MAIN_FOLDER = {
  bed: { id: 'bed', label: 'أسِرّة' },
  bedrooms: { id: 'bedrooms', label: 'غرف نوم' },
  chairs: { id: 'chairs', label: 'كراسي' },
  'dining table': { id: 'dining-table', label: 'طاولات سفرة' },
  'dressing room': { id: 'dressing-room', label: 'غرف لبس' },
  kitchen: { id: 'kitchen', label: 'مطابخ' },
  libraries: { id: 'libraries', label: 'مكتبات' },
  'living room': { id: 'living-room', label: 'معيشة' },
  table: { id: 'table', label: 'طاولات' },
  'tv libraries': { id: 'tv-libraries', label: 'مكتبات تلفزيون' },
  'youth rooms': { id: 'youth-rooms', label: 'غرف شباب' },
};

const EXCLUDE_ROOT_FILES = new Set(
  [
    'logo black.png',
    'logo_white.png',
    'logo footer.png',
    'facebook.png',
    'instgram.png',
    'twitter.png',
    'facebook.b4571c98.png',
    'instgram.c08b8290.png',
    'twitter.69161924.png',
  ].map((s) => s.toLowerCase())
);

/**
 * @param {string} relPosix
 */
function encodePublicImageUrl(relPosix) {
  const segs = relPosix.split('/');
  return `/image/${segs.map((s) => encodeURIComponent(s)).join('/')}`;
}

/**
 * @param {string} str
 */
function slugifySegment(str) {
  return str
    .normalize('NFKD')
    .replace(/\.[^.]+$/, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\u0600-\u06ff-]+/g, '')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}

/**
 * مجلد واحد = منتج واحد: كل الصور داخل نفس المجلد على صفحة التفاصيل، وصورة واحدة في القائمة.
 * @param {string} absDir
 * @param {string} relPosix '' للجذر
 * @returns {Map<string, string[]>}
 */
function collectFolderGroups(absDir, relPosix = '') {
  /** @type {Map<string, string[]>} */
  const groups = new Map();

  function visit(dir, rel) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    /** @type {string[]} */
    const filesHere = [];
    /** @type {string[]} */
    const subRel = [];

    for (const e of entries) {
      const full = path.join(dir, e.name);
      const piece = rel ? `${rel}/${e.name}` : e.name;
      const posix = piece.replace(/\\/g, '/');
      if (e.isDirectory()) {
        visit(full, posix);
      } else if (/\.(jpe?g|png|webp)$/i.test(e.name)) {
        if (!rel && EXCLUDE_ROOT_FILES.has(e.name.toLowerCase())) continue;
        filesHere.push(posix);
      }
    }

    if (filesHere.length > 0) {
      const key = rel || '__root__';
      groups.set(
        key,
        filesHere.sort((a, b) => a.localeCompare(b, 'ar', { numeric: true }))
      );
    }
  }

  visit(absDir, relPosix);
  groups.delete('__root__');
  return groups;
}

/**
 * @param {string} folderKey e.g. bed, kitchen/kitchen - 1
 */
function parseFolderMeta(folderKey) {
  const parts = folderKey.split('/').filter(Boolean);
  const mainRaw = parts[0] || 'other';
  const mainKey = mainRaw.trim().toLowerCase();
  const folderInfo = MAIN_FOLDER[mainKey] || {
    id: slugifySegment(mainRaw) || 'other',
    label: mainRaw,
  };
  const subParts = parts.slice(1);
  const subLabel = subParts.length ? subParts.join(' · ') : null;
  return { folderInfo, subParts, subLabel, parts };
}

/** عناوين ووصف قصير يدل على محتوى الألبوم — المفاتيح بأحرف صغيرة لمطابقة أي حالة من أسماء المجلدات */
const FOLDER_TITLE_OVERRIDES = {
  bed: {
    title: 'مجموعة أسِرّة وتصاميم غرف نوم مودرن',
    blurb:
      'تشكيلة صور لأسِرّة بتنجيد وخامات مختلفة؛ مناسبة لغرف نوم عصرية أو كلاسيك. تصفح كل اللقطات من شريط المعاينة أدناه.',
  },
  bedrooms: {
    title: 'غرف نوم — معرض عام',
    blurb: 'لقطات متنوعة من غرف النوم ضمن المعرض؛ للمزيد من التفصيل افتح الألبومات الفرعية إن وُجدت.',
  },
  'bedrooms/bedroom- 1': {
    title: 'غرفة نوم — مجموعة هورفور',
    blurb:
      'أفكار تصميم غرفة نوم بخط هورفور: ألوان، خزائن، وإضاءة متناسقة. الصور تعرض زوايا مختلفة لنفس المشروع لمساعدتك على اختيار التفاصيل.',
  },
  'bedrooms/bedroom - 2': {
    title: 'غرفة نوم — مجموعة جوفور',
    blurb:
      'تصميم غرفة نوم بروح جوفور: تنسيق الأثاث، مساحات التخزين، ولمسات ديكور. مرّ على كل الصور لرؤية التفاصيل عن قرب.',
  },
  'kitchen/kitchen - 1': {
    title: 'مطبخ حديث — التصميم الأول',
    blurb:
      'واجهات، مقاعد علوية وسفلية، وأسطح عمل بأسلوب معاصر. جولة بصرية كاملة عبر عدة لقطات لنفس المشروع.',
  },
  'kitchen/kitchen - 2': {
    title: 'مطبخ أنيق — التصميم الثاني',
    blurb:
      'تشطيبات مطبخ بخط مختلف: تباين الألوان، الإضاءة المخفية، وتوزيع الأجهزة. كل الصور خاصة بهذا العرض.',
  },
  'kitchen/kitchen - 3': {
    title: 'مطبخ عائلي — التصميم الثالث',
    blurb:
      'مساحة مطبخ عملية مع تخزين واسع وتفاصيل عملية للاستخدام اليومي. تصفح المعرض لرؤية كل الزوايا.',
  },
  kitchen: {
    title: 'مطابخ — لقطات عامة من المعرض',
    blurb:
      'صور متنوعة من أعمال المطابخ في هذا المجلد؛ للتصاميم المنظمة في سلاسل منفصلة راجع مجلدات «kitchen - 1» و«2» و«3».',
  },
  chairs: {
    title: 'كراسي طعام ومكتب وصالون — معرض',
    blurb:
      'تنويعات في شكل الكرسي، الظهر، والقماش أو الجلد. الصور تساعدك على مطابقة الكرسي مع طاولتك أو غرفتك.',
  },
  'dining table': {
    title: 'طاولات سفرة — أشكال وخامات',
    blurb: 'طاولات بأحجام وتشطيبات مختلفة؛ مناسبة لغرف الطعام المفتوحة أو الرسمية.',
  },
  'dressing room': {
    title: 'غرف لبس وخزائن — معرض كامل',
    blurb:
      'تنسيق تخزين الملابس، مرايا، وإضاءة عملية. الصور تعرض أفكارًا متعددة لغرف اللبس ضمن نفس المعرض.',
  },
  libraries: {
    title: 'مكتبات ورفوف كتب — معرض',
    blurb:
      'وحدات رفوف بارتفاعات مختلفة؛ مناسبة للحائط الكامل أو زوايا المكتب والمعيشة.',
  },
  'living room': {
    title: 'صالون ومعيشة — جولة بصرية',
    blurb:
      'كنب، طاولات وسط، ووحدات عرض بأسلوب معيشة عصري. تصفح كل اللقطات لرؤية التوزيع والألوان.',
  },
  table: {
    title: 'طاولات قهوة وجانبية ومكتب',
    blurb: 'طاولات بارتفاعات وسطوح مختلفة (خشب، رخام، زجاج) لمساحات المعيشة والممرات.',
  },
  'tv libraries': {
    title: 'وحدات تلفزيون ومكتبات عرض',
    blurb:
      'دمج الشاشة مع أدراج ورفوف؛ حلول تخزين أنيقة لغرف المعيشة.',
  },
  'youth rooms': {
    title: 'غرف شباب وأطفال',
    blurb: 'مساحات نوم ودراسة بروح شبابية؛ ألوان وخزائن تناسب الاستخدام اليومي.',
  },
};

/**
 * @param {string} folderKey
 */
function normKey(folderKey) {
  return folderKey.replace(/\\/g, '/').replace(/\s+/g, ' ').trim();
}

/**
 * @param {string} folderKey
 * @param {number} count
 */
function buildCopy(folderKey, count) {
  const nk = normKey(folderKey);
  const override = FOLDER_TITLE_OVERRIDES[nk.toLowerCase()];
  if (override) {
    const desc = `${override.blurb} تتضمن هذه المجموعة ${count} صورة. للمقاسات والسعر والخامات راسلنا على واتساب.`;
    return {
      name: override.title,
      shortDescription: `${override.blurb} (${count} صورة).`,
      description: desc,
    };
  }

  const { folderInfo, subLabel } = parseFolderMeta(nk);
  const sub = subLabel ? ` — ${subLabel}` : '';
  const name = subLabel
    ? `${folderInfo.label}${sub} — معرض صور`
    : `${folderInfo.label} — معرض صور`;

  const shortDescription = subLabel
    ? `مجموعة صور من ${folderInfo.label} (${subLabel}): عدة لقطات لنفس التصنيف لتوضيح التفاصيل والخامات. ${count} صورة.`
    : `مجموعة صور من ${folderInfo.label} تضم ${count} لقطة؛ تصفح التفاصيل لمعاينة الكل.`;

  const description = `${name}. ${shortDescription} تصميم وتصنيع حسب الطلب من Brilliant Home — يمكن تعديل المقاسات والألوان بعد المعاينة. للاستفسار وعرض السعر تواصل عبر واتساب.`;

  return { name, shortDescription, description };
}

/**
 * @param {string} folderKey
 */
function slugFromFolder(folderKey) {
  return folderKey
    .split('/')
    .map((p) => slugifySegment(p))
    .filter(Boolean)
    .join('-');
}

const usedSlugs = new Set();

/** @param {string} base */
function uniqueSlug(base) {
  let s = base || 'album';
  let n = 0;
  while (usedSlugs.has(s)) {
    n += 1;
    s = `${base}-${n}`;
  }
  usedSlugs.add(s);
  return s;
}

const groups = collectFolderGroups(IMAGE_ROOT);
const sortedKeys = [...groups.keys()].sort((a, b) => a.localeCompare(b, 'ar'));

let idx = 0;
const products = sortedKeys.map((folderKey) => {
  idx += 1;
  const rels = groups.get(folderKey) || [];
  const count = rels.length;
  const { folderInfo, subLabel } = parseFolderMeta(normKey(folderKey));
  const copy = buildCopy(folderKey, count);
  const slug = uniqueSlug(slugFromFolder(folderKey) || `album-${idx}`);

  const images = rels.map((r) => encodePublicImageUrl(r));

  return {
    id: `gal-${String(idx).padStart(4, '0')}`,
    slug,
    name: copy.name,
    shortDescription: copy.shortDescription,
    description: copy.description,
    price: null,
    currency: 'EGP',
    category: folderInfo.id,
    featured: false,
    images,
    folderPath: folderKey,
    imagePath: rels.join(' | '),
    collectionLabel: folderInfo.label,
    subfolderLabel: subLabel,
    photoCount: count,
  };
});

fs.writeFileSync(OUT, JSON.stringify(products, null, 2), 'utf8');
console.log(`Wrote ${products.length} folder-albums (${sortedKeys.length} groups) to ${path.relative(process.cwd(), OUT)}`);
