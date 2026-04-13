import { Helmet } from 'react-helmet-async';
import { SITE } from '@/data/site';

/**
 * @param {{
 *   title: string;
 *   description?: string;
 *   path?: string;
 *   image?: string;
 *   noindex?: boolean;
 * }} props
 */
export default function Seo({
  title,
  description,
  path = '',
  image,
  noindex = false,
}) {
  const tabTitle = 'Brilliant Home - برلنت هوم';
  const baseUrl =
    typeof window !== 'undefined' ? window.location.origin : 'https://brillianthome.eg';
  const url = `${baseUrl}${path}`;
  const desc =
    description ??
    `${SITE.nameAr} — ${SITE.activity}. ${SITE.tagline} ${SITE.address}`;
  const ogImage = image?.startsWith('http')
    ? image
    : image
      ? `${baseUrl}${image}`
      : SITE.defaultOgImage;

  return (
    <Helmet>
      <title>{tabTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="ar_EG" />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  );
}
