/** عنوان العرض — إزالة بادئة «ألبوم» إن وُجدت */
export function formatProductTitle(name) {
  if (!name) return '';
  return name.replace(/^\s*ألبوم\s+/u, '').trim() || name;
}

/** نصوص بدون ذكر «ألبوم» */
export function formatProductBody(text) {
  if (!text || typeof text !== 'string') return text;
  return text
    .replace(/يتضمن هذا الألبوم/g, 'تتضمن هذه المجموعة')
    .replace(/هذا الألبوم/g, 'هذه المجموعة')
    .replace(/ألبوم صور/g, 'معرض صور')
    .replace(/ألبوم/g, 'مجموعة');
}
