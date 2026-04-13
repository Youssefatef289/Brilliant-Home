/** @typedef {{ label: string; href: string }} NavLink */

export const SITE = {
  nameEn: 'Brilliant Home',
  nameAr: 'برلنت هوم',
  tagline: 'جودة عالية — تصميمات مودرن — أسعار عادلة',
  activity: 'أثاث وديكور',
  address: 'الحمرايا، شرق النيل، بني سويف، مصر',
  phoneDisplay: '01023308232',
  whatsappE164: '201023308232',
  whatsappUrl: 'https://wa.me/201023308232',
  email: 'info@brillianthome.eg',
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    pinterest: 'https://pinterest.com',
  },
  defaultOgImage:
    'https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&q=85',
};

/** @type {NavLink[]} */
export const NAV_LINKS = [
  { label: 'الرئيسية', href: '/' },
  { label: 'من نحن', href: '/about' },
  { label: 'المنتجات', href: '/products' },
];

/** يطابق مجلدات `public/image` — يُحدَّث مع `npm run generate:products` عند إضافة صور */
export const PRODUCT_CATEGORIES = [
  { id: 'all', label: 'الكل' },
  { id: 'bed', label: 'أسِرّة' },
  { id: 'bedrooms', label: 'غرف نوم' },
  { id: 'chairs', label: 'كراسي' },
  { id: 'dining-table', label: 'طاولات سفرة' },
  { id: 'dressing-room', label: 'غرف لبس' },
  { id: 'kitchen', label: 'مطابخ' },
  { id: 'libraries', label: 'مكتبات' },
  { id: 'living-room', label: 'معيشة' },
  { id: 'table', label: 'طاولات' },
  { id: 'tv-libraries', label: 'مكتبات تلفزيون' },
  { id: 'youth-rooms', label: 'غرف شباب' },
];
