import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Partnership from '../components/Partnership';
import Director from '../components/Director';
import InquiryForm from '../components/InquiryForm';
import { SiteConfig, Inquiry } from '../types';

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
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-slate-200 sm:px-8 lg:grid-cols-4 lg:px-12">
          {[
            ['20년+ 실무 경험', '글로벌 무역·해외영업 기반'],
            ['한중 업무 전문성', '문서·번역·거래 커뮤니케이션'],
            ['기업·기관 대응', '요청 목적과 납품 기준 중심'],
            ['명확한 진행 기준', '범위·일정·비용 사전 안내'],
          ].map(([label, desc]) => (
            <div key={label} className="bg-white px-4 py-6 text-left sm:px-6 sm:py-7">
              <p className="font-display text-sm font-extrabold text-brand-navy">{label}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Services and Projects */}
      <Services
        title={config.services.title}
        items={config.services.items.filter((item) => item.id !== 'service-5')}
        isAdminMode={isAdminMode}
        onEditItem={(itemId, currentUrl, title) => onOpenImageSelector(itemId, currentUrl, title)}
        onNavigate={onNavigate}
      />

      <section className="relative overflow-hidden bg-[#081229] py-16 text-white sm:py-24 lg:py-28" id="work-process">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="text-left lg:col-span-5">
              <p className="text-xs font-bold tracking-[0.22em] text-blue-300">WORK STANDARD</p>
              <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight sm:text-4xl">좋은 결과는<span className="sm:hidden"> </span><br className="hidden sm:block" />명확한 기준에서 시작됩니다.</h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">요청을 바로 착수하지 않습니다. 목적과 자료 상태를 먼저 확인하고, 가능한 범위와 납품 기준을 문서로 맞춥니다.</p>
              <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
                {['비대면 진행', '범위·일정·비용 확인', '보안 방식 협의', '납품 전 기본 검수'].map((item, index) => (
                  <div key={item} className="bg-[#0d1932] px-5 py-5 text-sm font-semibold text-slate-200">
                    <span className="mr-3 font-mono text-[10px] text-blue-300">0{index + 1}</span>{item}
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm sm:p-9">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <p className="text-xs font-bold tracking-[0.2em] text-slate-400">PROJECT FLOW</p>
                  <span className="text-xs text-slate-500">01 — 07</span>
                </div>
                <ol className="mt-2 divide-y divide-white/10">
                  {['문의 접수', '자료 및 작업범위 확인', '견적·납기 안내', '결제 또는 착수금 확인', '작업 및 검수', '온라인 납품', '합의 범위 내 수정'].map((item, index) => (
                    <li key={item} className="group flex items-center gap-5 py-4 text-sm text-slate-300 transition-colors hover:text-white">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-300/25 bg-blue-300/10 font-mono text-[10px] font-bold text-blue-200">{index + 1}</span>
                      <span className="font-semibold">{item}</span>
                      <span className="ml-auto h-px w-8 bg-white/10 transition-all group-hover:w-12 group-hover:bg-blue-300/50" />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f3ec] py-16 sm:py-24 lg:py-28" id="work-samples">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-8 border-b border-slate-300/70 pb-10 lg:grid-cols-2 lg:items-end">
            <div className="text-left">
              <p className="text-xs font-bold tracking-[0.22em] text-brand-blue">DELIVERABLES</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">말보다 결과물로<span className="sm:hidden"> </span><br className="hidden sm:block" />업무 가치를 보여드립니다.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600 lg:justify-self-end">기업명, 개인정보, 영업비밀을 공개하지 않습니다. 공개 가능한 범위에서 문서 유형과 작업 방식을 확인할 수 있는 샘플을 순차적으로 제공합니다.</p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-slate-300/70 bg-slate-300/70 sm:mt-10 sm:rounded-[2rem] lg:grid-cols-5">
            {['한→중 제품소개 문서', '중→한 기업자료 번역', '중국 업체 기초조사표', '중국 비즈니스 이메일', 'AI 번역문 수정 전·후'].map((item, index) => (
              <div key={item} className="group min-h-40 bg-[#fbfaf7] p-6 text-left transition-colors hover:bg-white sm:min-h-48 sm:p-7">
                <span className="font-mono text-[10px] font-bold tracking-widest text-brand-blue">SAMPLE 0{index + 1}</span>
                <h3 className="mt-12 font-display text-base font-extrabold leading-6 text-brand-navy">{item}</h3>
                <div className="mt-6 h-0.5 w-8 bg-brand-blue transition-all group-hover:w-14" />
              </div>
            ))}
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

      <section className="bg-white py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 px-6 sm:px-8 md:flex-row md:items-center lg:px-12">
          <div className="flex items-start gap-5 text-left">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-brand-blue">AIVEXA BOOKS</span>
            <div className="hidden h-14 w-px bg-slate-200 sm:block" />
            <div><h2 className="font-display text-xl font-extrabold text-brand-navy">AI 실전 중국어 콘텐츠</h2><p className="mt-2 text-sm leading-6 text-slate-500">전자책과 비즈니스 중국어 콘텐츠는 별도 전문 사이트에서 확인할 수 있습니다.</p></div>
          </div>
          <a href="https://books.aivexa.co.kr" target="_blank" rel="noreferrer" className="rounded-full bg-brand-navy px-6 py-3 text-xs font-bold text-white transition-all hover:bg-brand-blue hover:shadow-lg">전자책 사이트 보기 →</a>
        </div>
      </section>

      {/* Proposal Inquiry Form */}
      <InquiryForm
        onSubmitInquiry={onSubmitInquiry}
      />

    </>
  );
}
