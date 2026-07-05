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
    <section className="bg-white py-20 sm:py-28" id="partnership">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        
        {/* Core Partnership Statement */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-bold tracking-widest text-brand-blue uppercase mb-4">
            COOPERATION PARTNERS
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl" id="partnership-title">
            {title}
          </h2>
          <p className="mt-6 text-sm sm:text-base leading-relaxed text-slate-500 font-sans break-keep whitespace-pre-line" id="partnership-description">
            {description}
          </p>
        </div>

        {/* Elegant B2B Target Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {targets.map((target, index) => (
            <motion.div
              key={target}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/30 p-6 transition-all duration-200 hover:border-slate-300 hover:bg-white hover:shadow-lg hover:shadow-brand-navy/2"
              id={`partner-target-${index}`}
            >
              {/* Target Icon container */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-100 shadow-xs">
                {partnerIcons[target] || <Building className="h-5 w-5 text-brand-navy" />}
              </div>
              
              <div className="text-left">
                <h4 className="font-display text-sm font-bold text-brand-navy tracking-tight">
                  {target}
                </h4>
                <p className="mt-1 text-xs text-slate-400 font-sans">
                  지속 가능한 협력 모델
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
          className="mt-16 rounded-3xl bg-brand-navy p-8 sm:p-12 text-left relative overflow-hidden"
          id="partnership-banner"
        >
          {/* subtle decorative background mesh */}
          <div className="absolute top-0 right-0 -z-0 h-64 w-64 rounded-full bg-brand-blue/10 blur-3xl" />
          
          <div className="relative z-10 max-w-3xl">
            <p className="font-mono text-xs font-bold tracking-widest text-brand-blue/80 uppercase mb-3">
              ESTABLISHING CREDIBILITY
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              실무형 임팩트 프로젝트와 로컬 상생을 추구하는 비즈니스 파트너
            </h3>
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-400 font-sans break-keep">
              AIVEXA는 공공기관, 지자체 실무 담당자와 다년간 협업하며 공공사업 절차와 예산 집행, 성과 보고 양식까지 철저히 분석하고 최적화해 왔습니다. 행정 프로세스의 높은 이해도와 민간 최고 수준의 기획 역량을 결합하여 신뢰를 증명합니다.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
