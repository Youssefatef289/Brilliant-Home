import { useMemo } from 'react';
import Seo from '@/components/seo/Seo';
import ProductFilters from '@/components/products/ProductFilters';
import ProductCard from '@/components/products/ProductCard';
import { useProductFilters } from '@/hooks/useProductFilters';
import { expandProductsForListing } from '@/utils/productGrid';
import { SITE } from '@/data/site';
import './Products.css';

export default function Products() {
  const {
    category,
    setCategory,
    query,
    setQuery,
    filtered,
    isStale,
  } = useProductFilters();

  const gridItems = useMemo(() => expandProductsForListing(filtered), [filtered]);

  return (
    <>
      <Seo
        title={`???????? ? ${SITE.nameEn} | ${SITE.nameAr}`}
        description={`???? ?????? ${SITE.activity}: ?????? ???? ????? ????? ????? ?????. ${SITE.tagline}`}
        path="/products"
      />

      <div className="page-products">
        <section className="bg-luxury-page py-10 md:py-14">
          <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
            <ProductFilters
              query={query}
              onQueryChange={setQuery}
              category={category}
              onCategoryChange={setCategory}
            />

            <div
              className={`transition-opacity duration-200 ${isStale ? 'opacity-60' : 'opacity-100'}`}
              aria-busy={isStale}
            >
              {filtered.length === 0 ? (
                <p className="rounded-sm border border-dashed border-luxury-border py-16 text-center text-sm font-semibold text-luxury-ink-muted">
                  ?? ???? ?????? ??????. ???? ????? ????? ?? ???????.
                </p>
              ) : (
                <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {gridItems.map((item, i) => (
                    <li key={item.key} className="list-none">
                      <ProductCard
                        product={item.product}
                        index={i}
                        coverSrc={item.coverSrc}
                        imageIndex={item.imageIndex}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
