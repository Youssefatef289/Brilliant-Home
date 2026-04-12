import { Helmet } from 'react-helmet-async';
import { SITE } from '@/data/site';

export default function LocalBusinessJsonLd() {
  const base =
    typeof window !== 'undefined' ? window.location.origin : 'https://brillianthome.eg';
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FurnitureStore',
    name: `${SITE.nameEn} | ${SITE.nameAr}`,
    description: `${SITE.activity}. ${SITE.tagline}`,
    url: base,
    telephone: `+${SITE.whatsappE164}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address,
      addressCountry: 'EG',
    },
    sameAs: [SITE.social.facebook, SITE.social.instagram, SITE.social.pinterest],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}
