import React, { useState } from 'react';
import { BookOpen, LogIn, Menu, UserRound, X } from 'lucide-react';

interface HeaderProps {
  onAdminToggle: () => void;
  isAdminMode: boolean;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  currentPath?: string;
  onLogoClick?: () => void;
}

export default function Header({ onNavigate, activeSection, currentPath, onLogoClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { id: 'services', label: '서비스' },
    { id: 'projects', label: '작업 예시' },
    { id: 'director', label: 'AIVEXA 소개' },
    { id: 'faq', label: '진행 절차·FAQ' },
    { id: 'inquiry', label: '문의' },
  ];

  const pathToSection: Record<string, string> = {
    '/': activeSection,
    '/about': 'director',
    '/services': 'services',
    '/projects': 'projects',
    '/partners': 'partnership',
    '/faq': 'faq',
    '/contact': 'inquiry',
  };

  const currentActiveSection = currentPath ? (pathToSection[currentPath] || '') : activeSection;

  const navigateAndClose = (sectionId: string) => {
    setIsMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        {/* Brand Logo - Styled precisely according to the brand image */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onLogoClick || (() => window.scrollTo({ top: 0, behavior: 'smooth' }))}>
          <div className="relative flex items-center justify-center h-10">
            {/* Custom SVG Monogram AX matching the brand image */}
            <svg 
              className="h-9 w-auto" 
              viewBox="0 0 160 50" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-label="AIVEXA Logo"
            >
              {/* Monogram AX Logo Mark precisely styled matching the original brand logo */}
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

              {/* Text "AIVEXA" in deep navy with bold modern typography */}
              <text 
                x="44" 
                y="35" 
                fill="#0B132B" 
                fontSize="24" 
                fontWeight="800" 
                fontFamily="'Outfit', 'Inter', sans-serif" 
                letterSpacing="0.05em"
              >
                AIVEXA
              </text>
            </svg>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`font-display text-sm font-medium transition-colors duration-200 cursor-pointer ${
                currentActiveSection === item.id
                  ? 'text-brand-blue font-semibold'
                  : 'text-slate-600 hover:text-brand-navy'
              }`}
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://book.aivexa.co.kr"
            target="_blank"
            rel="noreferrer"
            className="font-display text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-brand-navy"
          >
            전자책
          </a>
        </nav>

        {/* Primary consultation action */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://book.aivexa.co.kr/login"
            className="hidden text-xs font-bold text-slate-600 transition-colors hover:text-brand-blue sm:block"
          >
            로그인
          </a>
          <button
            onClick={() => onNavigate('inquiry')}
            className="rounded-full bg-brand-navy px-4 py-2.5 font-display text-xs font-semibold text-white transition-all hover:bg-brand-blue hover:shadow-lg hover:shadow-brand-blue/15 cursor-pointer sm:px-5"
            id="cta-inquiry-nav"
          >
            상담 요청
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-brand-navy transition-colors hover:border-brand-blue hover:text-brand-blue"
            aria-label={isMenuOpen ? '메뉴 닫기' : '전체 메뉴 열기'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-full border-t border-slate-100 bg-white shadow-2xl shadow-slate-900/10">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 sm:px-8 md:grid-cols-3 lg:px-12">
            <div className="md:col-span-2">
              <p className="text-[10px] font-bold tracking-[0.22em] text-brand-blue">AIVEXA MENU</p>
              <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-3">
                {menuItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => navigateAndClose(item.id)}
                    className="bg-white px-5 py-5 text-left transition-colors hover:bg-slate-50"
                  >
                    <span className="font-mono text-[9px] text-slate-400">0{index + 1}</span>
                    <span className="mt-2 block text-sm font-bold text-brand-navy">{item.label}</span>
                  </button>
                ))}
                <a href="https://book.aivexa.co.kr" className="bg-white px-5 py-5 text-left transition-colors hover:bg-slate-50">
                  <span className="font-mono text-[9px] text-slate-400">06</span>
                  <span className="mt-2 flex items-center gap-2 text-sm font-bold text-brand-navy"><BookOpen className="h-4 w-4 text-brand-blue" />전자책</span>
                </a>
              </div>
            </div>
            <div className="rounded-2xl bg-[#081229] p-6 text-white">
              <p className="text-[10px] font-bold tracking-[0.2em] text-blue-300">MEMBER ACCESS</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">전자책 사이트의 기존 회원계정을 그대로 이용합니다.</p>
              <div className="mt-5 grid gap-2">
                <a href="https://book.aivexa.co.kr/login" className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-xs font-bold text-brand-navy">
                  <span className="flex items-center gap-2"><LogIn className="h-4 w-4" />로그인·회원가입</span><span>→</span>
                </a>
                <a href="https://book.aivexa.co.kr/account" className="flex items-center justify-between rounded-xl border border-white/15 px-4 py-3 text-xs font-bold text-white">
                  <span className="flex items-center gap-2"><UserRound className="h-4 w-4" />마이페이지</span><span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
