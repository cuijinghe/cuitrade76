import React from 'react';
import { motion } from 'motion/react';
import { Building2, Heart, Store, Globe, Image as ImageIcon, ArrowUpRight } from 'lucide-react';
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
  'service-1': <Building2 className="h-5 w-5 text-brand-navy" />,
  'service-2': <Heart className="h-5 w-5 text-brand-navy" />,
  'service-3': <Store className="h-5 w-5 text-brand-navy" />,
  'service-4': <Globe className="h-5 w-5 text-brand-navy" />,
};

export default function Services({ title, items, isAdminMode, onEditItem, onNavigate }: ServicesProps) {
  return (
    <section className="bg-slate-50/50 py-20 sm:py-28" id="services">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="text-left">
            <p className="font-mono text-xs font-bold tracking-widest text-brand-blue uppercase mb-2">
              AIVEXA SOLUTIONS & OPERATIONS
            </p>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl" id="services-title">
              {title}
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-sm text-slate-500 font-sans text-left md:text-right break-keep">
            단순 AI 강의와 강사 연계를 넘어, 공공과 민간의 자원을 융합하여 실질적인 사회공헌 임팩트를 창출합니다.
          </p>
        </div>

        {/* 4 Cards Grid - Fully customizable & polished */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2" id="projects">
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
              {/* Image Header Area */}
              <div 
                className="group/serviceimg relative aspect-[16/9] w-full overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => onEditItem(item.id, item.imageUrl, item.title)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover/serviceimg:scale-105"
                  referrerPolicy="no-referrer"
                  id={`service-img-${item.id}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                
                {/* Custom icon badge top-left */}
                <div className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
                  {iconMap[item.id] || <Building2 className="h-5 w-5 text-brand-navy" />}
                </div>

                {/* Edit Hover Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 opacity-0 group-hover/serviceimg:opacity-100 transition-all duration-300 backdrop-blur-xs">
                  <div className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-800 shadow-md transform translate-y-2 group-hover/serviceimg:translate-y-0 transition-all duration-300">
                    <ImageIcon className="h-3.5 w-3.5 text-brand-blue" />
                    <span>클릭하여 이미지 변경</span>
                  </div>
                </div>
              </div>

              {/* Text Card Body */}
              <div className="flex flex-1 flex-col p-8 sm:p-10 text-left">
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
