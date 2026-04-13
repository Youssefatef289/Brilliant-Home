import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import HomeAboutSection from '@/components/home/HomeAboutSection';
import CommissionManufacturing from '@/components/home/CommissionManufacturing';
import HomeProductsShowcase from '@/components/home/HomeProductsShowcase';
import Testimonials from '@/components/home/Testimonials';
import Seo from '@/components/seo/Seo';
import LocalBusinessJsonLd from '@/components/seo/JsonLd';
import { SITE } from '@/data/site';
import './Home.css';

export default function Home() {
  return (
    <>
      <Seo
        title={`${SITE.nameEn} | ${SITE.nameAr} — أثاث وديكور فاخر`}
        description={`${SITE.tagline} تواصل واتساب ${SITE.phoneDisplay}. ${SITE.address}`}
        path="/"
      />
      <LocalBusinessJsonLd />
      <div className="page-home">
        <Hero />
        <Features />
        <HomeAboutSection />
        <CommissionManufacturing />
        <HomeProductsShowcase />
        <Testimonials />
      </div>
    </>
  );
}
