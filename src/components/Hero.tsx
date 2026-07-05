import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Image as ImageIcon } from 'lucide-react';
import { SiteConfig } from '../types';

interface HeroProps {
  config: SiteConfig['hero'];
  onNavigate: (sectionId: string) => void;
  isAdminMode: boolean;
  onEditImage: (currentUrl?: string) => void;
}

export default function Hero({ config, onNavigate, isAdminMode, onEditImage }: HeroProps) {
  const titleLines = config.title.split('\n').map(l => l.trim()).filter(Boolean);
  const mainTitle = titleLines[0] || '';
  const subTitleLines = titleLines.slice(1);

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-32" id="hero">
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-slate-50/70 blur-3xl" />
      <div className="absolute bottom-10 left-10 -z-10 h-[300px] w-[300px] rounded-full bg-blue-50/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Badge/Slogan */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex items-center gap-2 rounded-full bg-slate-50 border border-slate-100 px-4 py-1.5 text-xs font-bold tracking-widest text-slate-800"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-blue" />
              <span>{config.slogan}</span>
            </motion.div>

            {/* Main Premium Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display tracking-tight text-brand-navy"
              id="hero-heading"
            >
              <span className="block text-3xl sm:text-4xl lg:text-5xl font-extrabold lg:leading-[1.2] mb-4">
                {mainTitle}
              </span>
              {subTitleLines.length > 0 && (
                <span className="block text-xl sm:text-2xl lg:text-3xl font-bold lg:leading-[1.3] text-brand-navy/90 mt-2">
                  {subTitleLines.map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < subTitleLines.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </span>
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 text-base sm:text-lg leading-relaxed text-slate-500 max-w-2xl font-sans break-keep"
              id="hero-subtitle"
            >
              {config.subtitle}
            </motion.p>

            {/* Dynamic B2B Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4 sm:gap-5"
            >
              <button
                onClick={() => onNavigate('inquiry')}
                className="group flex items-center gap-2 rounded-full bg-brand-navy px-8 py-4 font-display text-sm font-semibold text-white transition-all hover:bg-brand-blue hover:shadow-xl hover:shadow-brand-blue/10 cursor-pointer"
                id="hero-btn-inquiry"
              >
                <span>프로젝트 문의하기</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={() => onNavigate('services')}
                className="rounded-full border border-slate-200 bg-white px-8 py-4 font-display text-sm font-medium text-slate-700 transition-all hover:border-slate-800 hover:bg-slate-50 cursor-pointer"
                id="hero-btn-services"
              >
                협력 분야 보기
              </button>
            </motion.div>
          </div>

          {/* Right Card Image Area */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group/heroimg relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-slate-100 shadow-2xl shadow-brand-navy/5 border border-slate-100 cursor-pointer"
              onClick={() => onEditImage(config.imageUrl)}
            >
              {/* Primary Representative Photo */}
              <img 
                src={config.imageUrl} 
                alt="AIVEXA Representative Partnership" 
                className="h-full w-full object-cover transition-transform duration-700 group-hover/heroimg:scale-[1.03]"
                referrerPolicy="no-referrer"
                id="hero-representative-image"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.endsWith('/hero.jpg') || target.src.includes('/hero.jpg')) {
                    target.src = '/hero.png';
                  } else if (target.src.endsWith('/hero.png') || target.src.includes('/hero.png')) {
                    target.src = 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=600';
                  }
                }}
              />

              {/* Gradient Scrim for readable overlay text */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/95 via-brand-navy/40 to-transparent" />

              {/* Absolute Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 text-left">
                <p className="font-mono text-xs font-bold tracking-widest text-brand-blue/90 mb-1.5 uppercase">
                  {config.imageTagline}
                </p>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight leading-snug break-keep">
                  {config.imageSubTagline}
                </h3>
              </div>

              {/* Edit Hover Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover/heroimg:opacity-100 transition-all duration-300 backdrop-blur-xs">
                <div className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-slate-800 shadow-lg transform translate-y-2 group-hover/heroimg:translate-y-0 transition-all duration-300">
                  <ImageIcon className="h-4 w-4 text-brand-blue" />
                  <span>클릭하여 이미지 변경</span>
                </div>
              </div>
            </motion.div>

            {/* Design detail: Elegant floating label card behind it */}
            <div className="absolute -bottom-6 -right-6 -z-10 hidden h-32 w-32 rounded-full border border-slate-100 bg-slate-50/50 sm:block" />
          </div>

        </div>
      </div>
    </section>
  );
}
