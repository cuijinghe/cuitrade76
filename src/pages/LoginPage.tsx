import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type Mode = 'login' | 'signup';
const AUTH_API = 'https://books.aivexa.co.kr/api/auth/local';

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>('login');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setNotice('');
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch(AUTH_API, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          action: mode,
          terms: data.terms === 'on',
          privacy: data.privacy === 'on',
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || '처리하지 못했습니다.');
      navigate('/account');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : '잠시 후 다시 시도해 주세요.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-[72vh] bg-slate-50 px-5 py-16">
      <section className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/5 sm:p-10">
        <p className="text-xs font-bold tracking-[0.2em] text-brand-blue">AIVEXA MEMBER</p>
        <h1 className="mt-3 text-3xl font-extrabold text-brand-navy">{mode === 'login' ? '로그인' : '회원가입'}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">AIVEXA 서비스와 전자책에서 동일한 회원계정을 이용합니다.</p>
        <div className="mt-7 grid grid-cols-2 border-b border-slate-200">
          <button className={`py-3 text-sm font-bold ${mode === 'login' ? 'border-b-2 border-brand-blue text-brand-blue' : 'text-slate-400'}`} onClick={() => setMode('login')}>로그인</button>
          <button className={`py-3 text-sm font-bold ${mode === 'signup' ? 'border-b-2 border-brand-blue text-brand-blue' : 'text-slate-400'}`} onClick={() => setMode('signup')}>회원가입</button>
        </div>
        <form className="mt-7 grid gap-4" onSubmit={submit}>
          {mode === 'signup' && <>
            <label className="grid gap-2 text-sm font-bold text-brand-navy">이름<input className="rounded-xl border border-slate-200 px-4 py-3 font-normal" required name="name" autoComplete="name" /></label>
            <label className="grid gap-2 text-sm font-bold text-brand-navy">휴대전화<input className="rounded-xl border border-slate-200 px-4 py-3 font-normal" required name="phone" inputMode="tel" autoComplete="tel" /></label>
          </>}
          <label className="grid gap-2 text-sm font-bold text-brand-navy">이메일<input className="rounded-xl border border-slate-200 px-4 py-3 font-normal" required type="email" name="email" autoComplete="email" /></label>
          <label className="grid gap-2 text-sm font-bold text-brand-navy">비밀번호<input className="rounded-xl border border-slate-200 px-4 py-3 font-normal" required type="password" name="password" minLength={10} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} /><small className="font-normal text-slate-400">10자 이상 입력해 주세요.</small></label>
          {mode === 'signup' && <div className="grid gap-2 rounded-xl bg-slate-50 p-4 text-xs text-slate-600">
            <label><input required type="checkbox" name="terms" /> 이용약관 동의</label>
            <label><input required type="checkbox" name="privacy" /> 개인정보처리방침 동의</label>
          </div>}
          <button disabled={busy} className="mt-2 rounded-full bg-brand-navy px-5 py-3.5 text-sm font-bold text-white disabled:opacity-60">{busy ? '처리 중…' : mode === 'login' ? '로그인' : '회원가입 완료'}</button>
        </form>
        {notice && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{notice}</p>}
        <Link to="/" className="mt-6 block text-center text-xs text-slate-500">홈페이지로 돌아가기</Link>
      </section>
    </main>
  );
}
