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
      {/* Evidence-safe trust strip */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl divide-y divide-slate-200 px-6 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:px-8 lg:grid-cols-4 lg:px-12">
          {[
            ['20년+ 실무 경험', '글로벌 무역·해외영업 기반'],
            ['한중 업무 전문성', '문서·번역·거래 커뮤니케이션'],
            ['기업·기관 대응', '요청 목적과 납품 기준 중심'],
            ['명확한 진행 기준', '범위·일정·비용 사전 안내'],
          ].map(([label, desc]) => (
            <div key={label} className="px-5 py-7 text-left first:pl-0 last:pr-0 sm:px-6">
              <p className="font-display text-sm font-extrabold text-brand-navy">{label}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">{desc}</p>
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

      <section className="bg-slate-50 py-20" id="work-process">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="text-left">
              <p className="text-xs font-bold tracking-widest text-brand-blue">WORK PRINCIPLES</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-brand-navy">명확한 범위와 납기를 기준으로 진행합니다</h2>
              <ul className="mt-8 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                {['비대면 진행', '작업 전 범위·일정·비용 확인', '소량·단기 작업 가능', '보안자료 취급방식 협의', '납품 전 기본 검수', '추가 요청은 별도 협의'].map((item) => <li key={item} className="rounded-xl border border-slate-200 bg-white px-4 py-3">{item}</li>)}
              </ul>
            </div>
            <div className="text-left">
              <p className="text-xs font-bold tracking-widest text-brand-blue">PROCESS</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-brand-navy">진행 절차</h2>
              <ol className="mt-8 space-y-3 text-sm text-slate-600">
                {['문의 접수', '자료 및 작업범위 확인', '견적·납기 안내', '결제 또는 착수금 확인', '작업 및 검수', '온라인 납품', '사전 합의 범위 내 수정'].map((item, index) => <li key={item} className="flex items-center gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-navy text-xs font-bold text-white">{index + 1}</span>{item}</li>)}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20" id="work-samples">
        <div className="mx-auto max-w-7xl px-6 text-center sm:px-8 lg:px-12">
          <p className="text-xs font-bold tracking-widest text-brand-blue">WORK SAMPLES</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-brand-navy">작업 예시</h2>
          <p className="mt-4 text-sm text-slate-500">작업 예시 준비 중입니다. 실제 기업명, 개인정보와 영업비밀이 포함되지 않은 샘플부터 순차적으로 공개합니다.</p>
          <div className="mt-8 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-5">
            {['한→중 제품소개 문서', '중→한 기업자료 번역', '중국 업체 기초조사표', '중국 비즈니스 이메일', 'AI 번역문 수정 전·후'].map((item) => <div key={item} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-sm font-bold text-brand-navy">{item}</div>)}
          </div>
        </div>
      </section>

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

      <section className="border-y border-slate-100 bg-slate-50 py-12">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-5 px-6 text-left sm:flex-row sm:items-center">
          <div><h2 className="font-display text-xl font-extrabold text-brand-navy">AI 실전 중국어 콘텐츠</h2><p className="mt-2 text-sm text-slate-500">AI를 활용한 실전 중국어 전자책과 비즈니스 중국어 콘텐츠도 제작합니다.</p></div>
          <a href="https://book.aivexa.co.kr" target="_blank" rel="noreferrer" className="rounded-full border border-brand-navy px-5 py-2.5 text-xs font-bold text-brand-navy hover:bg-brand-navy hover:text-white">전자책 보기</a>
        </div>
      </section>

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
