import React from 'react';
import { motion } from 'motion/react';
import { Bot, Building2, FileText, Languages, Search, ArrowUpRight } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesProps {
  title: string;
  items: ServiceItem[];
  isAdminMode: boolean;
  onEditItem: (id: string, currentUrl: string, title: string) => void;
  onNavigate: (sectionId: string) => void;
}

// Icons mapping for visual diversity
const iconMap: Record<string, React.ReactNode> = {
  'service-1': <FileText className="h-5 w-5 text-white" />,
  'service-2': <Languages className="h-5 w-5 text-white" />,
  'service-3': <Search className="h-5 w-5 text-white" />,
  'service-4': <Building2 className="h-5 w-5 text-white" />,
  'service-5': <Bot className="h-5 w-5 text-white" />,
};

export default function Services({ title, items, onNavigate }: ServicesProps) {
  return (
    <section className="bg-slate-50/50 py-16 sm:py-24 lg:py-28" id="services">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-10 flex flex-col md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="text-left">
            <p className="font-mono text-xs font-bold tracking-widest text-brand-blue uppercase mb-2">
              AIVEXA SOLUTIONS & OPERATIONS
            </p>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl" id="services-title">
              {title}
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-sm text-slate-500 font-sans text-left md:text-right break-keep">
            필요한 업무만 선택해 의뢰할 수 있습니다. 요청 목적과 자료 상태를 확인한 뒤 적합한 작업 범위를 안내합니다.
          </p>
        </div>

        {/* 4 Cards Grid - Fully customizable & polished */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" id="projects">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/5"
              id={`service-card-${item.id}`}
            >
              {/* Image-free service identifier */}
              <div className="flex items-center justify-between bg-brand-navy px-6 py-6 sm:px-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  {iconMap[item.id] || <Building2 className="h-5 w-5 text-white" />}
                </div>
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-white/45">0{index + 1}</span>
              </div>

              {/* Text Card Body */}
              <div className="flex flex-1 flex-col p-6 sm:p-8 text-left">
                <h3 className="font-display text-xl font-bold tracking-tight text-brand-navy group-hover:text-brand-blue transition-colors duration-200">
                  {item.title}
                </h3>
                
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-500 font-sans break-keep">
                  {item.description}
                </p>

                {/* Bottom line CTA */}
                <div className="mt-8 flex items-center gap-2 border-t border-slate-50 pt-5 text-xs font-bold text-brand-navy transition-all group-hover:text-brand-blue">
                  <span onClick={() => onNavigate('inquiry')} className="cursor-pointer">프로젝트 문의하기</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
