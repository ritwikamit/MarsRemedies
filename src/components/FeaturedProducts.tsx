import React from 'react';
import { Product, PageView } from '../types';
import { ProductCard } from './ProductCard';
import { SectionHeading } from './SectionHeading';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
  onViewProductDetails: (product: Product) => void;
  onNavigate: (page: PageView) => void;
  onEnquireProduct?: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onViewProductDetails,
  onNavigate,
  onEnquireProduct,
}) => {
  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <SectionHeading
            badge="Highlighted Formulations"
            title="Flagship Formulations"
            subtitle="Widely prescribed therapeutic formulations across analgesics, antibiotics, cardiovascular, dermatological, and ophthalmic segments."
            align="left"
            className="mb-0!"
          />

          <button
            onClick={() => onNavigate('products')}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-[#002060] dark:text-blue-400 hover:underline cursor-pointer self-start md:self-auto"
          >
            <span>View All 110+ Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProductDetails}
              onEnquire={onEnquireProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
