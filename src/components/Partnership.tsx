import React from 'react';
import { motion } from 'motion/react';
import { Handshake, Building, Landmark, Layers, Users, HeartHandshake, Briefcase, BookOpen, GraduationCap, Globe } from 'lucide-react';

interface PartnershipProps {
  title: string;
  description: string;
  targets: string[];
}

// Maps partner targets to elegant icons
const partnerIcons: Record<string, React.ReactNode> = {
  '공공기관': <Building className="h-5 w-5 text-brand-navy" />,
  '지방자치단체': <Landmark className="h-5 w-5 text-brand-navy" />,
  '기업 CSR팀': <Briefcase className="h-5 w-5 text-brand-navy" />,
  '사회공헌재단': <Handshake className="h-5 w-5 text-brand-navy" />,
  '소상공인지원기관': <Layers className="h-5 w-5 text-brand-navy" />,
  '여성기업지원기관': <Users className="h-5 w-5 text-brand-navy" />,
  '가족센터': <HeartHandshake className="h-5 w-5 text-brand-navy" />,
  '다문화가족지원센터': <Globe className="h-5 w-5 text-brand-navy" />,
  '대학교': <GraduationCap className="h-5 w-5 text-brand-navy" />,
  '평생교육기관': <BookOpen className="h-5 w-5 text-brand-navy" />,
};

export default function Partnership({ title, description, targets }: PartnershipProps) {
  return (
    <section className="bg-white py-24 sm:py-32" id="partnership">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        
        {/* Core Partnership Statement */}
        <div className="mb-16 grid gap-8 border-b border-slate-200 pb-10 text-left lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-xs font-bold tracking-[0.22em] text-brand-blue">COOPERATION MODEL</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl" id="partnership-title">
            {title}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-500 lg:justify-self-end" id="partnership-description">
            {description}
          </p>
        </div>

        {/* Elegant B2B Target Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {targets.map((target, index) => (
            <motion.div
              key={target}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group flex min-h-32 items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-brand-navy/5"
              id={`partner-target-${index}`}
            >
              {/* Target Icon container */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 transition-colors group-hover:bg-blue-50">
                {partnerIcons[target] || <Building className="h-5 w-5 text-brand-navy" />}
              </div>
              
              <div className="text-left">
                <h4 className="font-display text-sm font-bold text-brand-navy tracking-tight">
                  {target}
                </h4>
                <p className="mt-2 text-xs text-slate-400 font-sans">
                  목적·역할·산출물 협의
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner Card - Deep Trust Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mt-16 overflow-hidden rounded-[2rem] bg-[#081229] p-8 text-left sm:p-12"
          id="partnership-banner"
        >
          {/* subtle decorative background mesh */}
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-brand-blue/15 blur-3xl" />
          
          <div className="relative z-10 max-w-3xl">
            <p className="font-mono text-xs font-bold tracking-[0.2em] text-blue-300 uppercase mb-3">
              CLEAR SCOPE, RESPONSIBLE DELIVERY
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              협력의 시작부터 결과물까지, 기준을 명확히 합니다.
            </h3>
            <p className="mt-4 max-w-2xl text-xs leading-7 text-slate-400 sm:text-sm">
              프로젝트 목적, 역할 분담, 납품 형태와 일정을 먼저 확인합니다. 확인되지 않은 성과를 약속하기보다 수행 가능한 범위와 필요한 조건을 투명하게 안내합니다.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
