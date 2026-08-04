import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, FileText, Languages, Search, Workflow } from 'lucide-react';
import { SiteConfig } from '../types';

interface HeroProps {
  config: SiteConfig['hero'];
  onNavigate: (sectionId: string) => void;
  isAdminMode: boolean;
  onEditImage: (currentUrl?: string) => void;
}

const supportAreas = [
  { icon: FileText, label: '기업 문서·제안 자료' },
  { icon: Languages, label: '한중 비즈니스 번역' },
  { icon: Search, label: '중국 시장·업체 조사' },
  { icon: Workflow, label: 'AI 업무 활용 지원' },
];

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#081229] text-white" id="hero">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(46,92,255,0.22),transparent_34%),linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.025)_48%,transparent_100%)]" />
      <div className="absolute inset-y-0 right-[11%] hidden w-px bg-white/10 lg:block" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 sm:px-8 sm:py-28 lg:grid-cols-12 lg:items-center lg:gap-16 lg:px-12 lg:py-32">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 border-l-2 border-[#4263ff] pl-4 text-xs font-bold tracking-[0.22em] text-blue-200"
          >
            AIVEXA · AI BUSINESS & GLOBAL SUPPORT
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="mt-8 max-w-4xl font-display text-4xl font-extrabold leading-[1.18] tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.8rem]"
            id="hero-heading"
          >
            복잡한 글로벌 업무를
            <span className="mt-2 block text-blue-300">실행 가능한 문서와 결과로.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg"
            id="hero-subtitle"
          >
            기업 문서, 한중 번역, 중국 시장조사, 해외영업 자료와 AI 업무 활용까지.
            필요한 범위와 일정, 비용을 먼저 명확히 확인하고 책임 있게 진행합니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button
              onClick={() => onNavigate('inquiry')}
              className="group flex items-center gap-3 rounded-full bg-[#3155ff] px-7 py-4 text-sm font-bold text-white transition-all hover:bg-[#4263ff] hover:shadow-2xl hover:shadow-blue-950/40"
              id="hero-btn-inquiry"
            >
              프로젝트 상담 요청
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10"
              id="hero-btn-services"
            >
              지원 분야 확인
            </button>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs font-medium text-slate-400">
            {['비대면 진행', '업무 범위 사전 확인', '보안 자료 협의', '납품 후 검수'].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-blue-300" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="lg:col-span-5"
          aria-label="AIVEXA 지원 분야"
        >
          <div className="rounded-[2rem] border border-white/14 bg-white/[0.07] p-6 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-[11px] font-bold tracking-[0.2em] text-blue-300">PROJECT DESK</p>
                <h2 className="mt-2 text-xl font-bold text-white">기업 실무 통합 지원</h2>
              </div>
              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[10px] font-bold text-emerald-200">상담 가능</span>
            </div>

            <div className="mt-2 divide-y divide-white/10">
              {supportAreas.map(({ icon: Icon, label }, index) => (
                <div key={label} className="flex items-center gap-4 py-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-200">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="flex-1 text-sm font-semibold text-slate-100">{label}</span>
                  <span className="font-mono text-[10px] text-slate-500">0{index + 1}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-white/[0.06] px-5 py-4">
              <p className="text-xs leading-6 text-slate-300">
                요청 내용을 확인한 뒤 <strong className="font-semibold text-white">가능 범위·일정·견적</strong>을 안내합니다.
              </p>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
