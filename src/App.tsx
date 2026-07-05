import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Partnership from './components/Partnership';
import Director from './components/Director';
import InquiryForm from './components/InquiryForm';
import AdminPanel from './components/AdminPanel';
import ImageSelectorModal from './components/ImageSelectorModal';
import { DEFAULT_SITE_CONFIG } from './data/defaultConfig';
import { SiteConfig, Inquiry } from './types';
import { Shield, Mail, Phone, ChevronRight, Edit3, CheckCircle2, AlertCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

// Pre-seeded authentic B2B inquiries for realistic live-preview experience
const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    companyName: '전남 여수시 사회복지과',
    department: '외국인지원팀',
    contactName: '이영희 주무관',
    email: 'yhlee@yeosu.go.kr',
    phone: '061-659-1234',
    title: '다문화가족 및 결혼이민자 여성을 위한 실무형 AI 마케팅 취창업 프로젝트',
    projectBudget: '1,000만원 ~ 3,000만원',
    targetAudience: '여수시 관내 결혼이민 여성 및 다문화가족 구성원 30명',
    description: '관내 정착한 다문화 여성들의 자립을 위해, 최신 이미지/텍스트 AI 생성 도구를 결합한 마케팅 실무 교육과 지역 공방/소상공인 매칭 마케팅 프로젝트 기획을 의뢰합니다. 단순 일회성 튜토리얼이 아니라 실질적인 지역 연계 취업 성과로 도출되는 임팩트 있는 프로젝트를 원합니다.',
    submittedAt: '2026-07-01 14:32:00',
    status: 'reviewing'
  },
  {
    id: 'inq-2',
    companyName: 'SK이노베이션 ESG추진그룹',
    department: '사회공헌기획팀',
    contactName: '김민준 책임',
    email: 'mj.kim@sk.com',
    phone: '02-2121-5678',
    title: '소상공인 친환경 점포 AI 효율화 및 마케팅 지원 프로젝트 공동 운영 제안',
    projectBudget: '5,000만원 이상',
    targetAudience: '친환경 실천 소상공인 및 소기업 50개소',
    description: 'SK이노베이션에서 추진하는 소셜 크리에이터 상생 사업의 일환으로, 친환경 실천 소상공인들을 위한 인프라 AI 진단 및 맞춤 홍보물 생성 지원 사업을 구상 중입니다. AIVEXA에서 기획 및 운영 실무를 전담하여 프로젝트 제안서를 준비해 주시면 좋겠습니다.',
    submittedAt: '2026-07-02 10:15:00',
    status: 'pending'
  }
];

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [panelTabHint, setPanelTabHint] = useState<'inquiries' | 'images' | 'text'>('inquiries');

  // Direct Image selector state
  const [imageSelector, setImageSelector] = useState<{
    isOpen: boolean;
    targetId: string;
    targetTitle: string;
    currentUrl: string;
  }>({
    isOpen: false,
    targetId: '',
    targetTitle: '',
    currentUrl: ''
  });

  // Load state from localStorage on init
  useEffect(() => {
    const savedConfig = localStorage.getItem('aivexa_site_config_v3');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        
        // Ensure they use our updated default local assets with intelligent CDN failover
        const isOldDefaultHero = parsed.hero?.imageUrl?.includes('photo-1557804506-669a67965ba0') || parsed.hero?.imageUrl?.includes('photo-1519085360753-af0119f7cbe7') || parsed.hero?.imageUrl?.includes('photo-1573496799652-408c2ac9fe98');
        const isOldDefaultDirector = parsed.director?.imageUrl?.includes('photo-1560250097-0b93528c311a') || parsed.director?.imageUrl?.includes('photo-1519085360753-af0119f7cbe7') || parsed.director?.imageUrl?.includes('photo-1573496799652-408c2ac9fe98');
        
        if (isOldDefaultDirector || !parsed.director?.imageUrl) {
          parsed.director.imageUrl = '/director.jpg';
        }
        if (isOldDefaultHero || !parsed.hero?.imageUrl) {
          parsed.hero.imageUrl = '/hero.jpg';
        }
        
        // Clean up any remaining default foreigner image in services (service-4)
        if (parsed.services?.items) {
          parsed.services.items = parsed.services.items.map((item: any) => {
            if (item.id === 'service-4' && (item.imageUrl?.includes('photo-1522071820081-009f0129c71c') || !item.imageUrl)) {
              return { ...item, imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600' };
            }
            return item;
          });
        }

        setConfig(parsed);
        localStorage.setItem('aivexa_site_config_v3', JSON.stringify(parsed));
      } catch (e) {
        console.error('Failed to parse saved config, using default', e);
        setConfig(DEFAULT_SITE_CONFIG);
      }
    } else {
      setConfig(DEFAULT_SITE_CONFIG);
      localStorage.setItem('aivexa_site_config_v3', JSON.stringify(DEFAULT_SITE_CONFIG));
    }

    const savedInquiries = localStorage.getItem('aivexa_inquiries');
    if (savedInquiries) {
      try {
        setInquiries(JSON.parse(savedInquiries));
      } catch (e) {
        console.error('Failed to parse saved inquiries, using seeded', e);
        setInquiries(INITIAL_INQUIRIES);
      }
    } else {
      setInquiries(INITIAL_INQUIRIES);
      localStorage.setItem('aivexa_inquiries', JSON.stringify(INITIAL_INQUIRIES));
    }
  }, []);

  // Sync scroll location with active menu item
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'partnership', 'director', 'inquiry'];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update configuration
  const handleUpdateConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    localStorage.setItem('aivexa_site_config_v3', JSON.stringify(newConfig));
  };

  // Submit Inquiry
  const handleAddInquiry = (newInq: Omit<Inquiry, 'id' | 'submittedAt' | 'status'>) => {
    const createdInq: Inquiry = {
      ...newInq,
      id: `inq-${Date.now()}`,
      submittedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      status: 'pending'
    };

    const updated = [createdInq, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('aivexa_inquiries', JSON.stringify(updated));
  };

  // Delete Inquiry
  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter((inq) => inq.id !== id);
    setInquiries(updated);
    localStorage.setItem('aivexa_inquiries', JSON.stringify(updated));
  };

  // Update Inquiry Status
  const handleUpdateInquiryStatus = (id: string, status: Inquiry['status']) => {
    const updated = inquiries.map((inq) => {
      if (inq.id === id) {
        return { ...inq, status };
      }
      return inq;
    });
    setInquiries(updated);
    localStorage.setItem('aivexa_inquiries', JSON.stringify(updated));
  };

  // Reset to default
  const handleResetToDefault = () => {
    if (confirm('홈페이지 설정과 텍스트, 이미지 경로를 최초 기본값으로 리셋하시겠습니까?')) {
      setConfig(DEFAULT_SITE_CONFIG);
      localStorage.setItem('aivexa_site_config_v3', JSON.stringify(DEFAULT_SITE_CONFIG));
      
      setInquiries(INITIAL_INQUIRIES);
      localStorage.setItem('aivexa_inquiries', JSON.stringify(INITIAL_INQUIRIES));
      alert('성공적으로 초기 리셋되었습니다.');
    }
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  // Open Admin Panel directly with visual asset editing tab
  const handleEditImageDirectly = () => {
    setPanelTabHint('images');
    setIsAdminPanelOpen(true);
  };

  const handleOpenImageSelector = (targetId: string, currentUrl: string, targetTitle: string) => {
    setImageSelector({
      isOpen: true,
      targetId,
      targetTitle,
      currentUrl
    });
  };

  const handleUpdateImageUrl = (targetId: string, newUrl: string) => {
    const updated = { ...config };
    if (targetId === 'hero') {
      updated.hero.imageUrl = newUrl;
    } else if (targetId === 'director') {
      updated.director.imageUrl = newUrl;
    } else if (targetId.startsWith('service-')) {
      updated.services.items = updated.services.items.map(item => {
        if (item.id === targetId) {
          return { ...item, imageUrl: newUrl };
        }
        return item;
      });
    }
    setConfig(updated);
    localStorage.setItem('aivexa_site_config_v3', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased" id="root-layout">
      {/* Premium Navigation Header */}
      <Header
        isAdminMode={isAdminMode}
        onAdminToggle={() => setIsAdminMode(!isAdminMode)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Hero section */}
      <Hero
        config={config.hero}
        onNavigate={handleNavigate}
        isAdminMode={isAdminMode}
        onEditImage={(currentUrl) => handleOpenImageSelector('hero', currentUrl || config.hero.imageUrl, '메인 히어로 이미지')}
      />

      {/* Services and Projects */}
      <Services
        title={config.services.title}
        items={config.services.items}
        isAdminMode={isAdminMode}
        onEditItem={(itemId, currentUrl, title) => handleOpenImageSelector(itemId, currentUrl, title)}
        onNavigate={handleNavigate}
      />

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
        onEditImage={(currentUrl) => handleOpenImageSelector('director', currentUrl || config.director.imageUrl, '디렉터 프로필 이미지')}
      />

      {/* Proposal Inquiry Form */}
      <InquiryForm
        onSubmitInquiry={handleAddInquiry}
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
          <button 
            onClick={() => handleNavigate('inquiry')}
            className="flex items-center gap-1.5 rounded-full border border-brand-navy px-5 py-2 text-xs font-bold text-brand-navy hover:bg-brand-navy hover:text-white transition-all cursor-pointer"
          >
            <span>제안서 및 프로젝트 문의하기</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Footer conforming to all rules and visual expectations */}
      <footer className="bg-brand-navy text-white py-16 border-t border-brand-navy/80">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            
            {/* Left Description Column */}
            <div className="lg:col-span-8 flex flex-col items-start text-left">
              <div className="flex items-center gap-2 mb-6">
                <span className="font-display text-2xl font-extrabold text-white tracking-widest uppercase">
                  AIVEXA
                </span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl font-sans whitespace-pre-line" id="footer-description">
                {config.footer.description}
              </p>
            </div>

            {/* Right Contact Details Column */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end text-left lg:text-right">
              <h4 className="font-display text-xs font-extrabold tracking-wider text-brand-blue uppercase mb-4">
                CONTACT INQUIRY
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-start lg:justify-end gap-2 text-slate-300 text-sm font-semibold font-mono">
                  <Phone className="h-4 w-4 text-brand-blue" />
                  <span>{config.footer.phone}</span>
                </div>

                <a 
                  href={`mailto:${config.footer.email}`}
                  className="flex items-center justify-start lg:justify-end gap-2 text-slate-300 hover:text-white text-sm font-semibold transition-colors font-mono"
                  id="footer-email-link"
                >
                  <Mail className="h-4 w-4 text-brand-blue" />
                  <span>{config.footer.email}</span>
                </a>
                
                <p className="text-xs text-slate-500 font-sans">
                  AIVEXA Project Division
                </p>
              </div>
            </div>

          </div>

          <div className="mt-12 border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
            <p className="font-sans">
              © 2026 AIVEXA
            </p>
            <div className="flex gap-6 font-display font-medium text-[11px]">
              <span className="hover:text-slate-300 cursor-pointer" onClick={() => handleNavigate('services')}>서비스</span>
              <span className="hover:text-slate-300 cursor-pointer" onClick={() => handleNavigate('partnership')}>협력 모델</span>
              <span className="hover:text-slate-300 cursor-pointer" onClick={() => handleNavigate('inquiry')}>프로젝트 문의</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Admin quick edit toggle */}
      {isAdminMode && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            onClick={() => {
              setPanelTabHint('inquiries');
              setIsAdminPanelOpen(true);
            }}
            className="flex items-center gap-2 rounded-full bg-brand-navy text-white px-5 py-3 shadow-2xl hover:bg-brand-blue cursor-pointer transition-transform hover:scale-105 border border-slate-800"
            id="floating-admin-console-btn"
          >
            <Shield className="h-4.5 w-4.5 text-brand-blue shrink-0 animate-pulse" />
            <span className="text-xs font-bold font-display">관리자 통합 대시보드</span>
          </button>
        </motion.div>
      )}

      {/* Admin Panel overlay modal */}
      <AnimatePresence>
        {isAdminPanelOpen && (
          <AdminPanel
            config={config}
            inquiries={inquiries}
            onClose={() => setIsAdminPanelOpen(false)}
            onUpdateConfig={handleUpdateConfig}
            onDeleteInquiry={handleDeleteInquiry}
            onUpdateInquiryStatus={handleUpdateInquiryStatus}
            onResetToDefault={handleResetToDefault}
          />
        )}
      </AnimatePresence>

      {/* Image Selector Overlay Modal */}
      <AnimatePresence>
        {imageSelector.isOpen && (
          <ImageSelectorModal
            isOpen={imageSelector.isOpen}
            onClose={() => setImageSelector(prev => ({ ...prev, isOpen: false }))}
            currentUrl={imageSelector.currentUrl}
            targetId={imageSelector.targetId}
            targetTitle={imageSelector.targetTitle}
            onSelect={(url) => handleUpdateImageUrl(imageSelector.targetId, url)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
