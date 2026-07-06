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

function Breadcrumb({ currentPath }: { currentPath: string }) {
  const navigate = useNavigate();
  const pathNames: Record<string, string> = {
    '/about': '소개',
    '/services': '서비스',
    '/projects': '프로젝트 영역',
    '/partners': '협력 모델',
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
    let title = 'AIVEXA - AI FOR PEOPLE & COMMUNITIES';
    let description = '20년 이상의 글로벌 무역·해외영업 경험과 중국어 전문성을 바탕으로 공공기관, 기업과 협력하여 소상공인과 외국인을 위한 실전 프로젝트를 기획하고 운영합니다. AI는 목적이 아니라 더 큰 사회적 가치를 만드는 도구입니다.';

    switch (pathname) {
      case '/about':
        title = '소개 - AIVEXA';
        description = '20년 이상의 글로벌 비즈니스 실무 경험을 가진 전문가가 사람을 위한 도구로서의 AI 프로젝트를 기획합니다.';
        break;
      case '/services':
        title = '서비스 - AIVEXA';
        description = '공공기관 협력, 기업 CSR/ESG, 소상공인 및 외국인 지원을 아우르는 실행 중심의 비즈니스 솔루션을 설계합니다.';
        break;
      case '/projects':
        title = '프로젝트 영역 - AIVEXA';
        description = '공공과 민간의 소통과 협력을 이끄는 실제 프로젝트 포트폴리오 및 핵심 가치를 소개합니다.';
        break;
      case '/partners':
        title = '협력 모델 - AIVEXA';
        description = '지자체, 공공기관 및 기업 실무 담당자의 높은 행정 프로세스 이해도를 바탕으로 한 지속 가능한 협력 파트너십.';
        break;
      case '/faq':
        title = 'FAQ - AIVEXA';
        description = 'AIVEXA 서비스, 프로젝트 협력 모델 및 문의 진행 방식에 대한 자주 묻는 질문을 확인하세요.';
        break;
      case '/contact':
        title = '프로젝트 문의 - AIVEXA';
        description = '성공적인 공공 및 기업 CSR 프로젝트 기획을 위한 맞춤형 제안서와 제안 내용을 문의하세요.';
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
      'projects': '/projects',
      'partnership': '/partners',
      'director': '/about',
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

  const isHome = pathname === '/' || pathname === '/index.html' || !['/about', '/services', '/projects', '/partners', '/faq', '/contact'].includes(pathname);

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

