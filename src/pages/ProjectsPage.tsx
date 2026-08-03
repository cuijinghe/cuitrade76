import React from 'react';
import { SiteConfig } from '../types';

interface ProjectsPageProps {
  config: SiteConfig;
  isAdminMode: boolean;
  onOpenImageSelector: (targetId: string, currentUrl: string, targetTitle: string) => void;
  onNavigate: (sectionId: string) => void;
}

export default function ProjectsPage({
  config: _config,
  isAdminMode: _isAdminMode,
  onOpenImageSelector: _onOpenImageSelector,
  onNavigate,
}: ProjectsPageProps) {
  const samples = ['한→중 제품소개 문서 샘플', '중→한 기업자료 번역 샘플', '중국 업체 기초조사표 샘플', '중국 비즈니스 이메일 작성 샘플', 'AI 번역문 수정 전·후 샘플'];
  return (
    <main className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-xs font-bold tracking-widest text-brand-blue">WORK SAMPLES</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-brand-navy">작업 예시</h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500">현재 공개 가능한 샘플을 준비하고 있습니다. 실제 고객사 작업처럼 보이는 가짜 사례는 게시하지 않으며, 기업명·개인정보·영업비밀을 제거한 예시만 제공합니다.</p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {samples.map((sample) => <article key={sample} className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-left"><h2 className="font-display font-bold text-brand-navy">{sample}</h2><p className="mt-3 text-sm text-slate-500">작업 예시 준비 중</p></article>)}
        </div>
        <button onClick={() => onNavigate('inquiry')} className="mt-10 rounded-full bg-brand-navy px-7 py-3 text-sm font-bold text-white hover:bg-brand-blue">작업 문의하기</button>
      </div>
    </main>
  );
}
