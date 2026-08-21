import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  FlaskConical, 
  HeartHandshake 
} from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: 'WHO-GMP Alignment',
      subtitle: 'Strict adherence to global good manufacturing practices',
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-100 dark:border-emerald-900/60',
    },
    {
      icon: FlaskConical,
      title: 'Stringent QC & Dissolution',
      subtitle: 'Comprehensive batch assays and stability chamber testing',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/60 border-blue-100 dark:border-blue-900/60',
    },
    {
      icon: Truck,
      title: 'Pan-India Distribution',
      subtitle: 'Reliable despatch pipelines from Baddi & Patna hubs',
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-100 dark:border-indigo-900/60',
    },
    {
      icon: HeartHandshake,
      title: 'Ethical PCD Franchise',
      subtitle: 'Monopoly marketing rights with promotional backup',
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/60 border-amber-100 dark:border-amber-900/60',
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800/80 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3.5 p-3.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-200/60 dark:hover:border-slate-700/60"
              >
                <div className={`p-2.5 rounded-xl ${item.bg} border shrink-0`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrustStrip;
