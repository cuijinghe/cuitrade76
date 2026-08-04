import React from 'react';
import { Link } from 'react-router-dom';

const SOCIAL_AUTH = '/api/auth';

export default function LoginPage() {
  return (
    <main className="min-h-[72vh] bg-slate-50 px-5 py-16">
      <section className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/5 sm:p-10">
        <p className="text-xs font-bold tracking-[0.2em] text-brand-blue">AIVEXA MEMBER</p>
        <h1 className="mt-3 text-3xl font-extrabold text-brand-navy">1분 간단 회원가입·로그인</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">AIVEXA 전용 계정으로 간편하게 시작하세요.</p>
        <div className="mt-7 grid gap-3">
          <a className="rounded-xl bg-[#FEE500] px-4 py-3 text-center text-sm font-bold text-[#191919]" href={`${SOCIAL_AUTH}/kakao`}>카카오로 계속하기</a>
          <a className="rounded-xl bg-[#03C75A] px-4 py-3 text-center text-sm font-bold text-white" href={`${SOCIAL_AUTH}/naver`}>네이버로 계속하기</a>
          <a className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-bold text-slate-700" href={`${SOCIAL_AUTH}/google`}>Google로 계속하기</a>
        </div>
        <p className="mt-6 text-center text-xs leading-5 text-slate-500">계속하면 <Link className="font-bold text-brand-blue" to="/privacy">개인정보처리방침</Link>에 동의하게 됩니다.</p>
        <Link to="/" className="mt-6 block text-center text-xs text-slate-500">홈페이지로 돌아가기</Link>
      </section>
    </main>
  );
}
