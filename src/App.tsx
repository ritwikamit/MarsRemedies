import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Categories } from './pages/Categories';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { ProductDetail } from './pages/ProductDetail';
import { NotFound } from './pages/NotFound';
import { PRODUCTS, getProductBySlug } from './data/products';
import { PageView, Product, ProductCategory } from './types';
import { ThemeProvider } from './context/ThemeContext';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  const [enquiryProduct, setEnquiryProduct] = useState<string>('');

  // Handle URL hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const fullHash = window.location.hash.replace('#', '').trim();
      const parts = fullHash.split('/');
      const route = parts[0]?.toLowerCase() || 'home';

      if (['product', 'products'].includes(route) && parts[1]) {
        const slug = parts[1];
        const found = getProductBySlug(slug);
        if (found) {
          setActiveProductDetail(found);
          setCurrentPage('product-detail');
          return;
        }
      }

      if (['home', 'about', 'products', 'categories', 'contact', 'privacy', 'terms'].includes(route)) {
        setCurrentPage(route as PageView);
      } else if (route === '') {
        setCurrentPage('home');
      } else {
        setCurrentPage('not-found');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = useCallback((page: PageView) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectCategory = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    setSearchQuery('');
    navigateTo('products');
  };

  const handleViewProductDetails = (product: Product) => {
    setModalProduct(product);
  };

  const handleCloseModal = () => {
    setModalProduct(null);
  };

  const handleEnquireProduct = (product: Product) => {
    setModalProduct(null);
    setEnquiryProduct(`${product.brandName} (${product.dosageForm} - ${product.packSize})`);
    navigateTo('contact');
  };

  const handleEnquireClickNav = () => {
    navigateTo('contact');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#050b18] text-slate-900 dark:text-slate-100 font-sans antialiased transition-colors duration-300">
        {/* 1. Navbar */}
        <Navbar
          currentPage={currentPage}
          onNavigate={navigateTo}
          onEnquireClick={handleEnquireClickNav}
        />

        {/* 2. Main Page Content Routing */}
        <main className="grow pb-24 sm:pb-28 md:pb-0">
          {currentPage === 'home' && (
            <Home
              products={PRODUCTS}
              onSelectCategory={handleSelectCategory}
              onViewProductDetails={handleViewProductDetails}
              onNavigate={navigateTo}
              onEnquireProduct={handleEnquireProduct}
            />
          )}

          {currentPage === 'products' && (
            <Products
              products={PRODUCTS}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onViewProductDetails={handleViewProductDetails}
              onNavigate={navigateTo}
              onEnquireProduct={handleEnquireProduct}
            />
          )}

          {currentPage === 'categories' && (
            <Categories
              onSelectCategory={handleSelectCategory}
              onNavigate={navigateTo}
            />
          )}

          {currentPage === 'about' && (
            <About onNavigate={navigateTo} />
          )}

          {currentPage === 'contact' && (
            <Contact
              initialProduct={enquiryProduct}
              onClearInitialProduct={() => setEnquiryProduct('')}
              onNavigate={navigateTo}
            />
          )}

          {currentPage === 'product-detail' && activeProductDetail && (
            <ProductDetail
              product={activeProductDetail}
              onNavigate={navigateTo}
              onEnquire={handleEnquireProduct}
            />
          )}

          {currentPage === 'privacy' && (
            <PrivacyPolicy onNavigate={navigateTo} />
          )}

          {currentPage === 'terms' && (
            <TermsOfService onNavigate={navigateTo} />
          )}

          {currentPage === 'not-found' && (
            <NotFound onNavigate={navigateTo} />
          )}
        </main>

        {/* 3. Global Product Detail Modal */}
        <ProductModal
          product={modalProduct}
          isOpen={modalProduct !== null}
          onClose={handleCloseModal}
          onEnquire={handleEnquireProduct}
        />

        {/* 4. Corporate Footer */}
        <Footer 
          onNavigate={navigateTo} 
          onSelectCategory={handleSelectCategory} 
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
