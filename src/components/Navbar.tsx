import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { PageView } from '../types';
import { COMPANY_CONFIG } from '../data/company';
import { useTheme } from '../context/ThemeContext';
import { 
  Menu, 
  X, 
  Send, 
  Mail, 
  ChevronRight, 
  Package, 
  Layers, 
  Info,
  MessageSquare,
  Home as HomeIcon,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onEnquireClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onEnquireClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks: { 
    label: string; 
    page: PageView; 
    icon: React.ComponentType<{ className?: string }>;
    description?: string;
  }[] = [
    { label: 'Home', page: 'home', icon: HomeIcon, description: 'Overview & Highlights' },
    { label: 'Products', page: 'products', icon: Package, description: 'Explore Complete Range' },
    { label: 'Categories', page: 'categories', icon: Layers, description: 'Therapeutic Segments' },
    { label: 'About Us', page: 'about', icon: Info, description: 'Our Mission & Quality' },
    { label: 'Contact', page: 'contact', icon: MessageSquare, description: 'Inquiry & Support' },
  ];

  const handleNav = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT / FAST CONTACT STRIP */}
      <div className="bg-[#002060] dark:bg-slate-950 text-white text-xs py-1.5 px-4 hidden sm:block border-b border-blue-950/80 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-200 text-xs">
            <span className="font-semibold tracking-wide flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              WHO-GMP &amp; ISO 9001:2015 Assured Formulations
            </span>
            <span className="text-blue-300/40 hidden md:inline">|</span>
            <span className="text-slate-300 hidden md:inline">Patna (A.O.) &amp; Baddi (H.O.)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-200 font-medium">
            <a
              href={`mailto:${COMPANY_CONFIG.email}`}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              title="Official Trade Email"
            >
              <Mail className="w-3.5 h-3.5 text-blue-300" />
              <span className="hidden lg:inline">{COMPANY_CONFIG.email}</span>
              <span className="lg:hidden">Email Us</span>
            </a>
            <span className="text-blue-300/40">|</span>
            <button
              onClick={onEnquireClick}
              className="inline-flex items-center gap-1 hover:text-white transition-colors text-amber-300 dark:text-amber-400 font-semibold cursor-pointer"
            >
              <span>Quick Enquiry</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md border-b border-slate-200/90 dark:border-slate-800/90 py-2 sm:py-2.5'
            : 'bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-2.5 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            
            {/* Zone 1: Brand Zone */}
            <button
              onClick={() => handleNav('home')}
              className="flex items-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#002060] dark:focus-visible:ring-blue-400 focus-visible:ring-offset-2 rounded-lg cursor-pointer text-left shrink-0 py-0.5"
              aria-label="Mars Remedies Home"
            >
              <Logo size="md" variant="auto" showTagline={false} className="max-w-none" />
            </button>

            {/* Zone 2: Navigation Links (Tablet Landscape & Desktop) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNav(link.page)}
                    className={`relative px-3 py-2 text-xs xl:text-sm font-bold tracking-wide rounded-xl transition-all duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#002060] dark:focus-visible:ring-blue-400 ${
                      isActive
                        ? 'text-[#002060] dark:text-blue-400 bg-blue-50/90 dark:bg-blue-950/80 shadow-2xs font-extrabold ring-1 ring-blue-200/80 dark:ring-blue-800/80'
                        : 'text-slate-700 dark:text-slate-300 hover:text-[#002060] dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80 font-semibold'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#002060] dark:bg-blue-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Primary Actions (Dark Mode Toggle, Enquiry, Mobile/Tablet Menu) */}
            <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 xs:justify-center sm:justify-center justify-start shrink-0">
              
              {/* Dark Mode Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 sm:p-2.5 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-slate-200/80 dark:border-slate-700/80 shrink-0"
                title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                aria-label="Toggle theme mode"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400 animate-spin-once" />
                ) : (
                  <Moon className="w-4 h-4 text-blue-900" />
                )}
              </button>

              {/* Desktop / Large Tablet Trade Enquiry Button */}
              <button
                onClick={onEnquireClick}
                className="hidden md:inline-flex items-center justify-center gap-1.5 lg:gap-2 px-3.5 lg:px-5 py-2 lg:py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#002060] hover:bg-[#002d8a] active:bg-[#001744] dark:bg-blue-600 dark:hover:bg-blue-500 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#002060] shrink-0"
              >
                <Send className="w-3.5 h-3.5 text-blue-200" />
                <span>Trade Enquiry</span>
              </button>

              {/* Hamburger Button for Mobile & Tablet Portrait */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#002060] cursor-pointer shrink-0"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#002060] dark:text-blue-400" />
                ) : (
                  <Menu className="w-6 h-6 text-slate-800 dark:text-slate-200" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 3. MOBILE & TABLET SLIDE-DOWN DRAWER & BACKDROP */}
        {mobileMenuOpen && (
          <>
            <div 
              className="lg:hidden fixed inset-0 top-[52px] sm:top-[60px] bg-slate-950/60 backdrop-blur-xs z-40 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />

            <div className="lg:hidden fixed inset-x-0 top-[52px] sm:top-[60px] bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-70px)] overflow-y-auto overscroll-contain">
              <div className="p-4 sm:p-6 space-y-2 max-w-lg mx-auto">
                <div className="px-2 py-1 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  <span>Menu Navigation</span>
                  <span className="text-blue-600 dark:text-blue-400">WHO-GMP Assured</span>
                </div>

                {navLinks.map((link) => {
                  const IconComponent = link.icon;
                  const isActive = currentPage === link.page;
                  return (
                    <button
                      key={link.page}
                      onClick={() => handleNav(link.page)}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm transition-all text-left cursor-pointer ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-950/80 text-[#002060] dark:text-blue-400 font-bold border border-blue-200/80 dark:border-blue-800/80 shadow-xs'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#002060] dark:hover:text-white font-semibold'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isActive ? 'bg-[#002060] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm">{link.label}</div>
                          {link.description && (
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                              {link.description}
                            </div>
                          )}
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#002060] dark:text-blue-400' : 'text-slate-400'}`} />
                    </button>
                  );
                })}

                {/* Mobile Drawer Actions & Contacts */}
                <div className="pt-4 mt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onEnquireClick();
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white bg-[#002060] hover:bg-[#002d8a] dark:bg-blue-600 dark:hover:bg-blue-500 shadow-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-blue-200" />
                    <span>Send Product Inquiry</span>
                  </button>

                  <a
                    href={`mailto:${COMPANY_CONFIG.email}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                    <span>{COMPANY_CONFIG.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </header>

      {/* 4. BOTTOM MOBILE APP BAR (Safe for Phones) */}
      <nav 
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-1 px-1 pb-[max(0.35rem,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] flex items-center justify-around transition-colors"
        aria-label="Mobile Bottom Navigation"
      >
        {navLinks.map((link) => {
          const IconComponent = link.icon;
          const isActive = currentPage === link.page;
          return (
            <button
              key={`bottom-${link.page}`}
              onClick={() => handleNav(link.page)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors cursor-pointer min-w-[54px] min-h-[44px] touch-manipulation ${
                isActive
                  ? 'text-[#002060] dark:text-blue-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-medium'
              }`}
            >
              <div className={`p-1 rounded-md transition-all ${isActive ? 'bg-blue-50 dark:bg-blue-950 text-[#002060] dark:text-blue-400 scale-105' : ''}`}>
                <IconComponent className="w-4 h-4" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight leading-none whitespace-nowrap">
                {link.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 bg-[#002060] dark:bg-blue-400 rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default Navbar;
