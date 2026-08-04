import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Target, ShieldCheck, Check } from 'lucide-react';
import { SiteConfig } from '../types';

interface DirectorProps {
  config: SiteConfig['director'];
  isAdminMode: boolean;
  onEditImage: (currentUrl?: string) => void;
}

export default function Director({ config }: DirectorProps) {
  return (
    <section className="bg-slate-50/50 py-16 sm:py-24 lg:py-28" id="director">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          
          {/* Image-free professional credentials card */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl bg-brand-navy p-8 text-white shadow-xl sm:p-10"
            >
              <p className="text-xs font-bold tracking-[0.2em] text-blue-300">AIVEXA PROJECT LEAD</p>
              <h3 className="mt-5 font-display text-3xl font-extrabold leading-tight">실무를 이해하는<span className="sm:hidden"> </span><br className="hidden sm:block" />프로젝트 파트너</h3>
              <p className="mt-5 text-sm leading-7 text-slate-300">글로벌 무역·해외영업과 한중 비즈니스 커뮤니케이션 경험을 기반으로 필요한 결과물에 집중합니다.</p>
              <div className="mt-8 space-y-4 border-t border-white/10 pt-7">
                {['업무 목적과 납품 기준 확인', '책임 범위와 일정 사전 협의', '기업 자료의 보안 방식 협의'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm font-medium text-slate-100">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-400/15"><Check className="h-3.5 w-3.5 text-blue-200" /></span>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side Editorial Copy & Credentials */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="font-mono text-xs font-bold tracking-widest text-brand-blue uppercase mb-4">
              {config.title}
            </span>
            
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl leading-tight">
              실무 전문성에 기반한<span className="sm:hidden"> </span><br className="hidden sm:block" />
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
