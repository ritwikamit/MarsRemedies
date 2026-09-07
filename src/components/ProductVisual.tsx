import React, { useState, useEffect } from 'react';
import { ProductCategory } from '../types';

interface ProductVisualProps {
  category: ProductCategory;
  brandName?: string;
  dosageForm?: string;
  packSize?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  /** Product ID used to look up a realistic photo at /products/{productId}.webp|png|jpg.
   *  When no photo file exists, the illustrated pack art is shown instead. */
  productId?: string;
}

const CATEGORY_IMAGE_MAP: Record<ProductCategory, string> = {
  'Tablets': '/categories/tablets.png',
  'Capsules & Softgel': '/categories/capsules.png',
  'Syrups': '/categories/syrups.png',
  'Drops / Powder / Sachet': '/categories/drops.png',
  'Injections': '/categories/injections.png',
  'Cream / Lotion / Soap': '/categories/creams.png',
  'Eye & Ear Drops': '/categories/eye-drops.png',
  'Oil': '/categories/oil.png',
};

export const ProductVisual: React.FC<ProductVisualProps> = ({
  category,
  brandName = 'Mars Formulation',
  dosageForm = 'Tablet',
  packSize = '10x10',
  size = 'md',
  className = '',
  productId,
}) => {
  // Height classes per size with rich box-filling dimensions
  const heightClasses = {
    sm: 'h-32 sm:h-36',
    md: 'h-52 sm:h-56',
    lg: 'h-64 sm:h-72',
    hero: 'h-64 sm:h-72',
  }[size];

  // Streamlined photo resolution with smooth skeleton shimmer & instant loading
  const [imageFailed, setImageFailed] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    setImageFailed(false);
    setImageLoaded(false);
  }, [productId]);

  const candidateSrc = productId ? `/products/${productId}.png` : null;
  const showPhoto = candidateSrc && !imageFailed;
  const categoryFallbackSrc = CATEGORY_IMAGE_MAP[category] || '/categories/tablets.png';

  return (
    <div
      className={`relative w-full ${heightClasses} overflow-hidden bg-gradient-to-b from-slate-50/90 to-slate-100/50 dark:from-slate-900/90 dark:to-slate-950 flex items-center justify-center p-3 select-none ${className}`}
    >
      {/* Subtle radial studio backlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95)_0%,rgba(241,245,249,0.4)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(30,41,59,0.4)_0%,rgba(15,23,42,0.9)_100%)] pointer-events-none" />

      {/* Realistic product photo - fully shown, correctly proportioned, not zoomed in */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {showPhoto ? (
          <div className="relative w-full h-full flex items-center justify-center">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
              </div>
            )}
            <img
              src={candidateSrc}
              alt={`${brandName} - ${dosageForm} ${category} ${packSize}`}
              className={`max-h-full max-w-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.09)] dark:drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] transition-all duration-300 transform group-hover:scale-103 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              loading="lazy"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageFailed(true)}
            />
          </div>
        ) : (
          /* Realistic pharmaceutical category studio packaging (fallback) */
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={categoryFallbackSrc}
              alt={`${category} pharmaceutical packaging - ${brandName}`}
              className="max-h-full max-w-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.09)] dark:drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] transition-all duration-300 transform group-hover:scale-103 opacity-95"
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductVisual;
