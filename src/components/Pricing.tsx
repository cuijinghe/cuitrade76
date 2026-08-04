import React from 'react';
import { Link } from 'react-router-dom';
import { additionalFees, priceGroups, priceNotice, startingPrices } from '../data/pricing';

export default function Pricing({ onNavigate, detailed = false }: { onNavigate: (sectionId: string) => void; detailed?: boolean }) {
  return (
    <section className="border-y border-slate-200 bg-[#f6f3ec] py-16 sm:py-24" id="pricing">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-5 text-left lg:grid-cols-2 lg:items-end">
          <div><p className="text-xs font-bold tracking-[0.22em] text-brand-blue">SERVICE PRICING</p><h2 className="mt-4 font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">서비스 시작가격</h2></div>
          <p className="max-w-xl text-sm leading-7 text-slate-600 lg:justify-self-end">{priceNotice}</p>
        </div>
        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-300 bg-white">
          {startingPrices.map(([name, price]) => <div key={name} className="grid gap-2 border-b border-slate-200 px-5 py-4 last:border-0 sm:grid-cols-[1fr_auto] sm:items-center sm:px-7"><span className="text-sm font-semibold text-brand-navy">{name}</span><strong className="text-sm text-brand-blue sm:text-right">{price}</strong></div>)}
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row"><button onClick={() => onNavigate('inquiry')} className="rounded-full bg-brand-navy px-7 py-3 text-sm font-bold text-white hover:bg-brand-blue">견적 문의하기</button>{!detailed && <Link to="/pricing" className="rounded-full border border-brand-navy px-7 py-3 text-center text-sm font-bold text-brand-navy hover:bg-white">서비스 범위 확인</Link>}</div>

        {detailed && <>
          <div className="mt-16 space-y-8">{priceGroups.map((group) => <article key={group.title} className="overflow-hidden rounded-3xl border border-slate-200 bg-white"><div className="border-b border-slate-200 px-5 py-5 sm:px-7"><h3 className="font-display text-xl font-extrabold text-brand-navy">{group.title}</h3></div><div>{group.items.map(([name, scope, price]) => <div key={name} className="grid gap-2 border-b border-slate-100 px-5 py-4 last:border-0 sm:grid-cols-[1fr_1.4fr_auto] sm:items-center sm:px-7"><strong className="text-sm text-slate-800">{name}</strong><span className="text-sm leading-6 text-slate-500">{scope}</span><span className="text-sm font-bold text-brand-blue sm:text-right">{price}</span></div>)}</div><p className="border-t border-slate-200 bg-slate-50 px-5 py-4 text-xs leading-6 text-slate-600 sm:px-7">{group.note}</p></article>)}</div>
          <div className="mt-10 grid gap-8 lg:grid-cols-2"><article className="rounded-3xl bg-brand-navy p-6 text-white sm:p-8"><h3 className="font-display text-xl font-bold">추가요금 기준</h3><div className="mt-5 divide-y divide-white/10">{additionalFees.map(([name, price]) => <div key={name} className="flex justify-between gap-4 py-3 text-sm"><span className="text-slate-300">{name}</span><strong className="text-right">{price}</strong></div>)}</div><p className="mt-5 text-xs leading-6 text-slate-400">추가비용은 작업 시작 전에 안내하고 동의를 받은 후 적용합니다.</p></article><article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8"><h3 className="font-display text-xl font-bold text-brand-navy">기본 거래조건</h3><ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600"><li>• 소규모 작업은 전액 선결제</li><li>• 300,000원 이상은 착수금 50%, 납품 전 잔금 50%</li><li>• 최초 합의한 작업범위 내 기본 수정 1회</li><li>• 결제와 최종 자료 수령 후 납기 확정</li><li>• 확정 범위 외 추가요청은 별도 견적</li><li>• 거래 성사·매출·바이어 확보·수출성과 보장 없음</li></ul></article></div>
        </>}
      </div>
    </section>
  );
}
