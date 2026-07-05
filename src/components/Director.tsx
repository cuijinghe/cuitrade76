import React from 'react';
import { motion } from 'motion/react';
import { Award, Briefcase, Target, ShieldCheck, Image as ImageIcon } from 'lucide-react';
import { SiteConfig } from '../types';

interface DirectorProps {
  config: SiteConfig['director'];
  isAdminMode: boolean;
  onEditImage: (currentUrl?: string) => void;
}

export default function Director({ config, isAdminMode, onEditImage }: DirectorProps) {
  return (
    <section className="bg-slate-50/50 py-20 sm:py-28" id="director">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          
          {/* Left Side Portrait Card - Highly Professional Portrait */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group/dirimg relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-slate-100 shadow-xl border border-slate-100 cursor-pointer"
              onClick={() => onEditImage(config.imageUrl)}
            >
              <img
                src={config.imageUrl}
                alt="AIVEXA Project Director"
                className="h-full w-full object-cover transition-transform duration-700 group-hover/dirimg:scale-[1.02]"
                referrerPolicy="no-referrer"
                id="director-profile-image"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.endsWith('/director.jpg') || target.src.includes('/director.jpg')) {
                    target.src = '/director.png';
                  } else if (target.src.endsWith('/director.png') || target.src.includes('/director.png')) {
                    target.src = 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=600';
                  }
                }}
              />
              
              {/* Subtle visual gradient border at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-left">
                <span className="inline-block rounded-full bg-brand-blue px-3 py-1 text-[10px] font-extrabold tracking-widest text-white uppercase mb-2">
                  GLOBAL PRACTITIONER
                </span>
                <h4 className="font-display text-lg font-bold text-white tracking-tight">
                  AIVEXA Project Director
                </h4>
              </div>

              {/* Edit Hover Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover/dirimg:opacity-100 transition-all duration-300 backdrop-blur-xs">
                <div className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-slate-800 shadow-lg transform translate-y-2 group-hover/dirimg:translate-y-0 transition-all duration-300">
                  <ImageIcon className="h-4 w-4 text-brand-blue" />
                  <span>클릭하여 이미지 변경</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side Editorial Copy & Credentials */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="font-mono text-xs font-bold tracking-widest text-brand-blue uppercase mb-4">
              {config.title}
            </span>
            
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl leading-tight">
              실무 전문성에 기반한<br />
              지속 가능한 실전 프로젝트 파트너십.
            </h2>

            {/* Quote Block */}
            <blockquote className="mt-8 relative border-l-4 border-brand-blue pl-6">
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans font-medium break-keep whitespace-pre-line" id="director-experience">
                {config.experience}
              </p>
            </blockquote>

            <div className="mt-10 w-full border-t border-slate-200/60 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Card 1 - Expertise */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 shadow-xs">
                  <Briefcase className="h-4.5 w-4.5 text-brand-blue" />
                </div>
                <div className="text-left">
                  <h4 className="font-display text-xs font-extrabold tracking-wider text-slate-400 uppercase">
                    핵심 전문성 (Expertise)
                  </h4>
                  <p className="mt-1.5 font-display text-sm font-bold text-brand-navy" id="director-expertise">
                    {config.expertise}
                  </p>
                </div>
              </div>

              {/* Card 2 - Focus */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 shadow-xs">
                  <Target className="h-4.5 w-4.5 text-brand-blue" />
                </div>
                <div className="text-left">
                  <h4 className="font-display text-xs font-extrabold tracking-wider text-slate-400 uppercase">
                    집중 분야 (Focus Area)
                  </h4>
                  <p className="mt-1.5 font-display text-sm font-bold text-brand-navy" id="director-focus">
                    {config.focusArea}
                  </p>
                </div>
              </div>
            </div>

            {/* B2B Credibility Statement */}
            <div className="mt-8 flex items-center gap-3 rounded-2xl bg-white border border-slate-100/80 p-5 w-full">
              <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0" />
              <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed break-keep">
                AIVEXA는 단순한 학문 교육이나 기술 전달에 그치지 않습니다. 기업 비즈니스 현장과 로컬 현장을 모두 아우르는 20년의 경험으로, 실제 문제 해결과 직결되는 실전 프로젝트를 기획합니다.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
