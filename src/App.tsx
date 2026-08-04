import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import AdminPanel from './components/AdminPanel';
import ImageSelectorModal from './components/ImageSelectorModal';
import { DEFAULT_SITE_CONFIG } from './data/defaultConfig';
import { SiteConfig, Inquiry } from './types';
import { Shield, Mail, Phone, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

// Import newly created pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import PartnersPage from './pages/PartnersPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import PricingPage from './pages/PricingPage';

const INITIAL_INQUIRIES: Inquiry[] = [];

function Breadcrumb({ currentPath }: { currentPath: string }) {
  const navigate = useNavigate();
  const pathNames: Record<string, string> = {
    '/about': '소개',
    '/services': '서비스',
    '/pricing': '서비스 가격·견적',
    '/projects': '작업 예시',
    '/partners': '외주 파트너십',
    '/faq': 'FAQ',
    '/contact': '프로젝트 문의',
  };

  const displayName = pathNames[currentPath] || '';

  if (!displayName) return null;

  return (
    <div className="bg-slate-50 border-b border-slate-100 py-4 text-left">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500">
        <span 
          onClick={() => {
            navigate('/');
          }} 
          className="hover:text-brand-blue font-semibold transition-colors cursor-pointer"
        >
          홈
        </span>
        <ChevronRight className="h-3 w-3 text-slate-300" />
        <span className="text-brand-navy font-bold">{displayName}</span>
      </div>
    </div>
  );
}

function AppContent() {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [panelTabHint, setPanelTabHint] = useState<'inquiries' | 'images' | 'text'>('inquiries');

  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  // Dynamically update document title and description based on pathname
  useEffect(() => {
    let title = 'AIVEXA | 중국어 문서·번역·시장조사·AI 비즈니스 지원';
    let description = 'AIVEXA는 기업의 한중·중한 문서 번역, 중국 비즈니스 문장, 중국 업체·시장 기초조사, 해외영업 자료 및 기업 AI 활용을 비대면으로 지원합니다.';

    switch (pathname) {
      case '/about':
        title = 'AIVEXA 소개 | 글로벌 비즈니스 실무 지원';
        description = '20년 이상의 글로벌 무역·해외영업 경험을 바탕으로 기업의 문서, 번역, 조사, 해외업무와 AI 활용을 지원합니다.';
        break;
      case '/services':
        title = '서비스 | 중국어 번역·시장조사·해외영업 문서';
        description = '기업문서 번역·검수, 중국 비즈니스 문장, 업체·시장 기초조사, 해외영업 문서와 기업 AI 활용을 지원합니다.';
        break;
      case '/projects':
        title = '작업 예시 | AIVEXA';
        description = '한중·중한 번역, 중국 업체 기초조사표, 비즈니스 이메일과 AI 번역문 검수 샘플 유형을 안내합니다.';
        break;
      case '/partners':
        title = '외주 파트너십 | AIVEXA';
        description = '명확한 범위와 일정, 비용을 기준으로 기업과 실무자를 비대면으로 지원하는 외주 협업 방식을 안내합니다.';
        break;
      case '/faq':
        title = '진행 절차·FAQ | AIVEXA';
        description = '의뢰 가능 업무, 비용, 기간, 보안, 수정 범위와 중국 업체 기초조사의 한계를 안내합니다.';
        break;
      case '/contact':
        title = '작업 문의 | AIVEXA';
        description = '필요한 업무와 납기를 알려주시면 작업 가능 여부, 범위, 예상 납기와 비용을 안내합니다.';
        break;
      case '/pricing':
        title = 'AIVEXA 서비스 가격 | 중국어 번역·중국 업체 조사·해외영업 문서·AI 교육';
        description = 'AIVEXA의 한중·중한 번역, AI 번역 검수, 중국 업체 조사, 해외영업 문서 지원과 기업 AI 교육의 시작가격 및 견적 기준을 확인하세요.';
        break;
      case '/privacy':
        title = '개인정보처리방침 | AIVEXA';
        description = 'AIVEXA 문의 과정에서 수집하는 개인정보의 항목, 이용 목적과 보유기간을 안내합니다.';
        break;
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }
  }, [pathname]);

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
    const savedConfig = localStorage.getItem('aivexa_site_config_v3') || localStorage.getItem('aivexa_site_config_v4');
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

        // Ensure "생각합니다." is added if missing
        if (parsed.hero && parsed.hero.title && parsed.hero.title.includes('AI가 아니라 사람을 먼저') && !parsed.hero.title.includes('생각합니다.')) {
          parsed.hero.title = parsed.hero.title.replace('AI가 아니라 사람을 먼저', 'AI가 아니라 사람을 먼저 생각합니다.');
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
        localStorage.setItem('aivexa_site_config_v4', JSON.stringify(parsed));
      } catch (e) {
        console.error('Failed to parse saved config, using default', e);
        setConfig(DEFAULT_SITE_CONFIG);
      }
    } else {
      setConfig(DEFAULT_SITE_CONFIG);
      localStorage.setItem('aivexa_site_config_v4', JSON.stringify(DEFAULT_SITE_CONFIG));
    }

    const savedInquiries = localStorage.getItem('aivexa_inquiries');
    if (savedInquiries) {
      try {
        setInquiries(JSON.parse(savedInquiries));
      } catch (e) {
        console.error('Failed to parse saved inquiries, using seeded', e);
        setInquiries([]);
      }
    } else {
      setInquiries([]);
      localStorage.setItem('aivexa_inquiries', '[]');
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
    localStorage.setItem('aivexa_site_config_v4', JSON.stringify(newConfig));
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
      localStorage.setItem('aivexa_site_config_v4', JSON.stringify(DEFAULT_SITE_CONFIG));
      
      setInquiries(INITIAL_INQUIRIES);
      localStorage.setItem('aivexa_inquiries', JSON.stringify(INITIAL_INQUIRIES));
      alert('성공적으로 초기 리셋되었습니다.');
    }
  };

  const handleNavigate = (sectionId: string) => {
    if (pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(sectionId);
        return;
      }
    }

    const sectionToPath: Record<string, string> = {
      'hero': '/',
      'services': '/services',
      'pricing': '/pricing',
      'projects': '/projects',
      'partnership': '/partners',
      'director': '/about',
      'faq': '/faq',
      'inquiry': '/contact',
    };

    const path = sectionToPath[sectionId] || '/';
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
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
    localStorage.setItem('aivexa_site_config_v4', JSON.stringify(updated));
  };

  const isHome = pathname === '/' || pathname === '/index.html' || !['/about', '/services', '/pricing', '/projects', '/partners', '/faq', '/contact', '/privacy'].includes(pathname);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased" id="root-layout">
      {/* Premium Navigation Header */}
      <Header
        isAdminMode={isAdminMode}
        onAdminToggle={() => setIsAdminMode(!isAdminMode)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
        currentPath={pathname}
        onLogoClick={() => {
          navigate('/');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Breadcrumb for subpages */}
      {!isHome && <Breadcrumb currentPath={pathname} />}

      {/* Routes configuration with React Router */}
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              config={config}
              isAdminMode={isAdminMode}
              onOpenImageSelector={handleOpenImageSelector}
              onNavigate={handleNavigate}
              onSubmitInquiry={handleAddInquiry}
            />
          } 
        />
        <Route 
          path="/about" 
          element={
            <AboutPage 
              config={config}
              isAdminMode={isAdminMode}
              onOpenImageSelector={handleOpenImageSelector}
            />
          } 
        />
        <Route 
          path="/services" 
          element={
            <ServicesPage 
              config={config}
              isAdminMode={isAdminMode}
              onOpenImageSelector={handleOpenImageSelector}
              onNavigate={handleNavigate}
            />
          } 
        />
        <Route 
          path="/projects" 
          element={
            <ProjectsPage 
              config={config}
              isAdminMode={isAdminMode}
              onOpenImageSelector={handleOpenImageSelector}
              onNavigate={handleNavigate}
            />
          } 
        />
        <Route 
          path="/partners" 
          element={
            <PartnersPage 
              config={config}
            />
          } 
        />
        <Route 
          path="/faq" 
          element={<FAQPage />} 
        />
        <Route 
          path="/contact" 
          element={
            <ContactPage 
              onSubmitInquiry={handleAddInquiry}
            />
          } 
        />
        <Route path="/pricing" element={<PricingPage onNavigate={handleNavigate} />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        {/* Fallback routing */}
        <Route 
          path="*" 
          element={
            <HomePage 
              config={config}
              isAdminMode={isAdminMode}
              onOpenImageSelector={handleOpenImageSelector}
              onNavigate={handleNavigate}
              onSubmitInquiry={handleAddInquiry}
            />
          } 
        />
      </Routes>

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

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

