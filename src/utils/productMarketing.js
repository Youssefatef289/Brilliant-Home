/**
 * نصوص تسويقية موحّدة للبطاقات وصفحة التفاصيل حسب نوع المجموعة.
 */

/** نقاط تظهر تحت وصف المنتج في صفحة التفاصيل */
export const PRODUCT_HIGHLIGHTS = [
  'خامات خشبية عالية الجودة',
  'تصميمات عصرية ومخصصة',
  'تشطيب احترافي يدوم طويلًا',
  'تنفيذ حسب المقاسات المطلوبة',
  'ألوان وتشطيبات متنوعة',
];

const GALLERY_FOOTER =
  ' تصفّح الصور في المعرض أدناه؛ للمقاسات والخامات والسعر النهائي راسلنا على واتساب.';

/** @type {Record<string, { headline: string; card: string; detail: string }>} */
const BY_KEY = {
  'dining-table': {
    headline: 'طاولة طعام',
    card: 'طاولة طعام خشبية أنيقة تجمع العملية والفخامة، بخامات عالية الجودة لمظهر راقٍ في مساحة الطعام.',
    detail:
      'طاولة طعام خشبية بتصميم أنيق تجمع بين العملية والفخامة، مصنوعة من خامات عالية الجودة لتمنحك تجربة استخدام مريحة ومظهرًا راقيًا يليق بمساحة الطعام الخاصة بك.',
  },
  'living-room': {
    headline: 'ركنة',
    card: 'ركنة عصرية مريحة بخامات فاخرة تضيف الأناقة والدفء لغرفة المعيشة، بتشطيب يدوم.',
    detail:
      'ركنة عصرية بتصميم مريح وخامات فاخرة تضيف لمسة من الأناقة والدفء إلى غرفة المعيشة، مع تشطيب متقن يضمن المتانة والراحة اليومية.',
  },
  'tv-libraries': {
    headline: 'مكتبة تلفزيون',
    card: 'مكتبة تلفزيون خشبية عملية وأنيقة لتنظيم الأجهزة والديكور بلمسة عصرية في المعيشة.',
    detail:
      'مكتبة تلفزيون خشبية بتصميم عملي وأنيق توفر مساحة مثالية لتنظيم الأجهزة والديكور، مع لمسة عصرية تعزز جمال غرفة المعيشة.',
  },
  kitchen: {
    headline: 'مطبخ',
    card: 'مطبخ خشبي عملي ومنظّم بخامات متينة وتشطيبات راقية لمظهر عصري يدوم.',
    detail:
      'مطبخ خشبي مصمم بعناية ليوفر أعلى درجات العملية والتنظيم، مع خامات متينة وتشطيبات راقية تمنح مطبخك مظهرًا عصريًا يدوم لسنوات.',
  },
  'dressing-room': {
    headline: 'دريسنج روم',
    card: 'دريسنج روم فاخر بتصميم ذكي ينظّم الملابس والإكسسوارات بلمسة خشبية أنيقة.',
    detail:
      'دريسنج روم فاخر بتصميم ذكي يساعدك على تنظيم الملابس والإكسسوارات بكفاءة، مع تفاصيل خشبية أنيقة تضيف إحساسًا بالفخامة والترتيب.',
  },
  'youth-rooms': {
    headline: 'غرفة نوم شبابي',
    card: 'غرفة نوم شبابي عصرية تجمع الأناقة والراحة بتوزيع عملي وخامات خشبية عالية الجودة.',
    detail:
      'غرفة نوم شبابي بتصميم عصري يجمع بين الأناقة والراحة، مع توزيع عملي للمساحات وخامات خشبية عالية الجودة تناسب الذوق الحديث.',
  },
  bedroom: {
    headline: 'غرفة نوم / سراير',
    card: 'غرفة نوم متكاملة راقية تجمع الراحة والفخامة مع سرير وخزائن وتشطيبات خشبية متناسقة.',
    detail:
      'غرفة نوم متكاملة بتصميم راقٍ يمنحك الراحة والفخامة، مع سرير وخزائن وتشطيبات خشبية متناسقة تضيف لمسة من الهدوء والأناقة لغرفتك.',
  },
  chairs: {
    headline: 'كراسي',
    card: 'كراسي خشبية وتنجيد متنوع لتناسب طاولات السفرة والمعيشة — راحة وتفاصيل دقيقة.',
    detail:
      'تشكيلة كراسي بأشكال وخامات مختلفة تناسب طاولات الطعام والمعيشة؛ تصاميم تراعي الراحة اليومية مع لمسة أنيقة تكمل ديكور منزلك.',
  },
  libraries: {
    headline: 'مكتبة',
    card: 'مكتبات خشبية أنيقة لتنظيم الكتب والقطع الديكورية بلمسة عصرية وهادئة.',
    detail:
      'مكتبات خشبية بتصاميم عملية وأنيقة تمنحك مساحة منظمة للكتب والتحف، مع تشطيب احترافي يبرز جودة الخشب وينسجم مع أسلوب منزلك.',
  },
  table: {
    headline: 'طاولة',
    card: 'طاولات خشبية بأشكال عملية وأنيقة تكمل غرف المعيشة والجلوس بلمسة راقية.',
    detail:
      'طاولات خشبية بتصاميم عصرية وعملية، مناسبة للمعيشة والاستخدام اليومي؛ خامات متينة وتشطيب دقيق يمنح مساحتك مظهرًا متناسقًا وأنيقًا.',
  },
};

/**
 * مفتاح التسويق: مطابقة مجلدات المطبخ وغرف النوم/الأسِرّة.
 * @param {{ category: string; slug: string }} product
 * @returns {string}
 */
function marketingKey(product) {
  const { category, slug } = product;
  if (category === 'kitchen' || slug.startsWith('kitchen-')) return 'kitchen';
  if (category === 'bed' || category === 'bedrooms' || slug.startsWith('bedrooms')) return 'bedroom';
  return category;
}

/**
 * @param {{ category: string; slug: string; photoCount?: number | null }} product
 */
export function getProductMarketing(product) {
  const key = marketingKey(product);
  const block = BY_KEY[key] ?? {
    headline: null,
    card: null,
    detail: null,
  };

  const hasCustom = Boolean(block.headline && block.card && block.detail);

  return {
    /** عنوان قصير للعرض */
    headline: block.headline,
    /** نص البطاقة والقوائم */
    cardText: block.card,
    /** وصف كامل لصفحة التفاصيل */
    detailText: hasCustom ? `${block.detail}${GALLERY_FOOTER}` : null,
    highlights: PRODUCT_HIGHLIGHTS,
    hasCustom,
  };
}

/**
 * عنوان العرض: تسويقي إن وُجد، وإلا الاسم من البيانات.
 * @param {{ name: string; category: string; slug: string }} product
 * @param {(name: string) => string} formatTitle
 */
export function getProductDisplayHeadline(product, formatTitle) {
  const { headline } = getProductMarketing(product);
  return headline || formatTitle(product.name);
}
