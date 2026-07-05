import React from 'react';
import { Settings, Shield } from 'lucide-react';

interface HeaderProps {
  onAdminToggle: () => void;
  isAdminMode: boolean;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onAdminToggle, isAdminMode, onNavigate, activeSection }: HeaderProps) {
  const menuItems = [
    { id: 'services', label: '서비스' },
    { id: 'projects', label: '프로젝트 영역' },
    { id: 'partnership', label: '협력 모델' },
    { id: 'director', label: '소개' },
    { id: 'inquiry', label: '프로젝트 문의' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        {/* Brand Logo - Styled precisely according to the brand image */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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
                activeSection === item.id
                  ? 'text-brand-blue font-semibold'
                  : 'text-slate-600 hover:text-brand-navy'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right CTA and Admin Mode toggler */}
        <div className="flex items-center gap-4">
          <button
            onClick={onAdminToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
              isAdminMode 
                ? 'bg-brand-blue/10 border-brand-blue/30 text-brand-blue' 
                : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
            }`}
            title="관리자 설정 모드"
            id="admin-mode-toggle"
          >
            {isAdminMode ? <Shield className="h-3.5 w-3.5" /> : <Settings className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{isAdminMode ? '관리자 모드 On' : '관리자 모드'}</span>
          </button>
          
          <button
            onClick={() => onNavigate('inquiry')}
            className="hidden sm:block rounded-full bg-brand-navy px-5 py-2.5 font-display text-xs font-semibold text-white transition-all hover:bg-brand-blue hover:shadow-lg hover:shadow-brand-blue/15 cursor-pointer"
            id="cta-inquiry-nav"
          >
            프로젝트 문의
          </button>
        </div>
      </div>
    </header>
  );
}
