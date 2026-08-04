import React from 'react';
import Services from '../components/Services';
import { SiteConfig } from '../types';
import Pricing from '../components/Pricing';

interface ServicesPageProps {
  config: SiteConfig;
  isAdminMode: boolean;
  onOpenImageSelector: (targetId: string, currentUrl: string, targetTitle: string) => void;
  onNavigate: (sectionId: string) => void;
}

export default function ServicesPage({
  config,
  isAdminMode,
  onOpenImageSelector,
  onNavigate,
}: ServicesPageProps) {
  return (
    <main>
      <Services
        title={config.services.title}
        items={config.services.items}
        isAdminMode={isAdminMode}
        onEditItem={(itemId, currentUrl, title) => onOpenImageSelector(itemId, currentUrl, title)}
        onNavigate={onNavigate}
      />
      <Pricing onNavigate={onNavigate} detailed />
      <section className="border-t border-slate-100 bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-6 text-left">
          <h2 className="font-display text-2xl font-extrabold text-brand-navy">서비스 공통 안내</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['고객이 준비할 자료', '원문 또는 참고자료, 사용 목적, 원하는 납품 형식과 희망 납기'],
              ['납품 형식', '협의한 문서·표·프레젠테이션 또는 편집 가능한 파일'],
              ['진행 절차', '문의 → 자료 확인 → 견적·납기 → 작업·검수 → 온라인 납품'],
              ['작업 제외 범위', '법률·의료·특허 등 전문분야는 사전 협의 및 전문검수가 필요합니다.'],
              ['조사 범위', '중국 업체·시장 조사는 공개자료 기반 기초조사이며 신용과 거래 안전을 보증하지 않습니다.'],
              ['비용 안내', '실제 비용은 분량, 전문성, 자료 상태, 납기 및 작업 범위에 따라 달라질 수 있습니다.']
            ].map(([title, text]) => <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-bold text-brand-navy">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{text}</p></div>)}
          </div>
          <button onClick={() => onNavigate('inquiry')} className="mt-8 rounded-full bg-brand-navy px-7 py-3 text-sm font-bold text-white hover:bg-brand-blue">작업 문의하기</button>
        </div>
      </section>
    </main>
  );
}
