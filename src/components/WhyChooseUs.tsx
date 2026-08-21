import React from 'react';
import { SectionHeading } from './SectionHeading';
import { 
  FlaskRound, 
  Truck, 
  Layers, 
  FileCheck2,
  ShieldCheck, 
  TrendingUp
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      icon: ShieldCheck,
      title: 'Certified Partner Infrastructure',
      desc: 'Our pharmaceutical formulations are manufactured in modern, compliant facilities observing WHO-GMP and ISO standards.',
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-100 dark:border-emerald-900/60',
    },
    {
      icon: FlaskRound,
      title: 'Analytical Quality Assurance',
      desc: 'Every single batch undergoes rigorous HPLC testing, microbiological assays, and dissolution profile verification before clearance.',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/60 border-blue-100 dark:border-blue-900/60',
    },
    {
      icon: Layers,
      title: 'Broad Multi-Therapeutic Spectrum',
      desc: 'Over 110+ products across analgesics, antibiotics, gastroenterology, pediatrics, dermatology, ophthalmology, and pain management.',
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-100 dark:border-indigo-900/60',
    },
    {
      icon: Truck,
      title: 'Fast & Secure Supply Chain',
      desc: 'Strategic despatch routes operating out of Baddi and Patna ensure quick transit times and minimal stock-outs.',
      color: 'text-cyan-600 dark:text-cyan-400',
      bg: 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-100 dark:border-cyan-900/60',
    },
    {
      icon: FileCheck2,
      title: 'Complete Promotional & Visual Aids',
      desc: 'We support our PCD and trade partners with MR bags, visual aids, catch covers, product glossaries, and doctor reminder cards.',
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-950/60 border-purple-100 dark:border-purple-900/60',
    },
    {
      icon: TrendingUp,
      title: 'Attractive Profit Margins & Monopoly',
      desc: 'Distributor-friendly pricing structures designed to foster long-term growth and exclusive regional marketing rights.',
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/60 border-amber-100 dark:border-amber-900/60',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Why Mars Remedies"
          title="The Mars Remedies Advantage"
          subtitle="We empower medical practitioners, healthcare institutions, and pharma entrepreneurs with quality, dependability, and commercial transparency."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900/90 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-xl dark:hover:shadow-blue-950/20 transition-all duration-200 flex flex-col group"
              >
                <div className={`w-12 h-12 rounded-xl ${pt.bg} border flex items-center justify-center mb-4 transition-transform group-hover:scale-105 duration-200`}>
                  <Icon className={`w-6 h-6 ${pt.color}`} />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-2">
                  {pt.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed grow">
                  {pt.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
