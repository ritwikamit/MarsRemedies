import React from 'react';
import { PageView } from '../types';
import { Home, Package } from 'lucide-react';

interface NotFoundProps {
  onNavigate: (page: PageView) => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 dark:bg-[#050b18] px-4 py-16 transition-colors">
      <div className="max-w-md w-full text-center bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950 text-[#002060] dark:text-blue-400 border border-blue-100 dark:border-blue-900 flex items-center justify-center mx-auto text-2xl font-black">
          404
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Page Not Found</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
            The page or formulation you are looking for might have been relocated, renamed, or is currently unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => onNavigate('home')}
            className="grow inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#002060] hover:bg-[#002d8a] active:bg-[#001744] dark:bg-blue-600 dark:hover:bg-blue-500 cursor-pointer transition-colors shadow-2xs"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </button>

          <button
            onClick={() => onNavigate('products')}
            className="grow inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer transition-colors"
          >
            <Package className="w-4 h-4" />
            <span>Catalogue</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
