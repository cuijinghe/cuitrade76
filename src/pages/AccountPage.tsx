import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type User = { email: string; displayName?: string; fullName?: string; provider?: string };

export default function AccountPage() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  useEffect(() => {
    fetch('/api/auth/session', { credentials: 'include' })
      .then(async (response) => response.ok ? (await response.json()).user : null)
      .then(setUser)
      .catch(() => setUser(null));
  }, []);
  if (user === undefined) return <main className="min-h-[60vh] grid place-items-center text-slate-500">회원정보를 확인하고 있습니다…</main>;
  if (!user) return <main className="min-h-[60vh] grid place-items-center px-5"><div className="text-center"><h1 className="text-3xl font-extrabold text-brand-navy">로그인이 필요합니다</h1><Link className="mt-6 inline-flex rounded-full bg-brand-navy px-6 py-3 text-sm font-bold text-white" to="/login">로그인·회원가입</Link></div></main>;
  return <main className="min-h-[60vh] bg-slate-50 px-5 py-16"><section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8"><p className="text-xs font-bold tracking-[.2em] text-brand-blue">MY AIVEXA</p><h1 className="mt-3 text-3xl font-extrabold text-brand-navy">{user.fullName || user.displayName || '회원'}님, 반갑습니다.</h1><p className="mt-4 text-sm text-slate-500">{user.email}</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/contact" className="rounded-full bg-brand-navy px-5 py-3 text-sm font-bold text-white">문의하기</Link><a href="https://books.aivexa.co.kr/account" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-brand-navy">전자책 구매내역</a></div></section></main>;
}
