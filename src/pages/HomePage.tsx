import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Partnership from '../components/Partnership';
import Director from '../components/Director';
import InquiryForm from '../components/InquiryForm';
import { SiteConfig, Inquiry } from '../types';
import { ChevronRight } from 'lucide-react';

interface HomePageProps {
  config: SiteConfig;
  isAdminMode: boolean;
  onOpenImageSelector: (targetId: string, currentUrl: string, targetTitle: string) => void;
  onNavigate: (sectionId: string) => void;
  onSubmitInquiry: (newInq: Omit<Inquiry, 'id' | 'submittedAt' | 'status'>) => void;
}

export default function HomePage({
  config,
  isAdminMode,
  onOpenImageSelector,
  onNavigate,
  onSubmitInquiry,
}: HomePageProps) {
  return (
    <>
      {/* Hero section */}
      <Hero
        config={config.hero}
        onNavigate={onNavigate}
        isAdminMode={isAdminMode}
        onEditImage={(currentUrl) => onOpenImageSelector('hero', currentUrl || config.hero.imageUrl, '메인 히어로 이미지')}
      />
      {/* Trust Bar */}
      <section className="border-y border-slate-100 bg-white py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 sm:px-8 lg:grid-cols-4 lg:px-12">
          {[
            ['20년+', '글로벌 비즈니스 경험'],
            ['여성기업', '공공기관 협력 가능'],
            ['AI', '실무 프로젝트 기획'],
            ['중국어', '전문 통번역·교육'],
          ].map(([label, desc]) => (
            <div key={label} className="rounded-2xl border border-slate-100 bg-slate-50/60 px-5 py-5 text-center">
              <p className="font-display text-xl font-extrabold text-brand-navy">{label}</p>
              <p className="mt-2 text-xs font-medium text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
       </section>


      {/* Services and Projects */}
      <Services
        title={config.services.title}
        items={config.services.items}
        isAdminMode={isAdminMode}
        onEditItem={(itemId, currentUrl, title) => onOpenImageSelector(itemId, currentUrl, title)}
        onNavigate={onNavigate}
      />

      {/* Partnership Model section */}
      <Partnership
        title={config.partnership.title}
        description={config.partnership.description}
        targets={config.partnership.targets}
      />

      {/* Director & Partnership Focus Section */}
      <Director
        config={config.director}
        isAdminMode={isAdminMode}
        onEditImage={(currentUrl) => onOpenImageSelector('director', currentUrl || config.director.imageUrl, '디렉터 프로필 이미지')}
      />

      {/* Proposal Inquiry Form */}
      <InquiryForm
        onSubmitInquiry={onSubmitInquiry}
      />

      {/* B2B Footprint Info banner */}
      <section className="bg-slate-50 py-12 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200/60 p-1.5 shadow-sm">
              <svg viewBox="9 10 29 32" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Navy Left Leg */}
                <polygon points="11,40 20.3,12 25.3,12 16,40" fill="#0B132B" />
                {/* Navy Middle Leg Top */}
                <polygon points="20.3,12 25.3,12 30.6,28 25.6,28" fill="#0B132B" />
                {/* Navy Crossbar */}
                <polygon points="20,28 25.6,28 26.8,31.5 18.8,31.5" fill="#0B132B" />
                {/* Blue Right Leg of X */}
                <polygon points="21.6,40 30.9,12 35.9,12 26.6,40" fill="#1C3FFD" />
                {/* Blue Bottom-Right Leg of X */}
                <polygon points="25.6,28 30.6,28 34.5,40 29.5,40" fill="#1C3FFD" />
              </svg>
            </div>
            <div>
              <p className="font-display text-sm font-bold text-brand-navy">AIVEXA B2B 제안서 다운로드</p>
              <p className="text-xs text-slate-400">공공기관 및 기업 CSR/ESG 부서 맞춤형 협력 기획서</p>
            </div>
          </div>
          <a
            href="/aivexa-b2b-proposal.pdf"
            download
            className="flex items-center gap-1.5 rounded-full border border-brand-navy px-5 py-2 text-xs font-bold text-brand-navy hover:bg-brand-navy hover:text-white transition-all"
          >
            <span>제안서 PDF 다운로드</span>
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  );
}
