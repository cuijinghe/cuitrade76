import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Check, Image as ImageIcon, Link, ArrowRight, HelpCircle, Upload } from 'lucide-react';

interface PresetImage {
  name: string;
  url: string;
  tagline: string;
}

interface ImageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUrl: string;
  targetId: string; // 'hero' | 'director' | 'service-1' | 'service-2' | 'service-3' | 'service-4'
  targetTitle: string;
  onSelect: (url: string) => void;
}

// Curated high-resolution professional Unsplash presets for B2B/Social Impact
const CURATED_PRESETS: Record<string, PresetImage[]> = {
  hero: [
    {
      name: '협력 워크숍 (기본)',
      url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200',
      tagline: '글로벌 파트너십과 로컬 프로젝트 협업 회의'
    },
    {
      name: '스마트 테크 브레인스토밍',
      url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1200',
      tagline: '지역사회 문제를 함께 진단하고 기획하는 미래형 워크숍'
    },
    {
      name: '행정 및 공공기관 세미나',
      url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200',
      tagline: '지자체 및 기업 CSR 실무자를 위한 역량 혁신 세션'
    },
    {
      name: '비즈니스 전략 미팅',
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
      tagline: '지속 가능한 소셜 임팩트를 정의하는 마스터 플랜'
    },
    {
      name: '디지털 혁신 센터',
      url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
      tagline: '더 나은 지역 성장을 위한 신기술 AI 실증 연구'
    }
  ],
  'service-1': [
    {
      name: '공공기관 협력 회의 (기본)',
      url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600',
      tagline: '공공과 민간의 자원을 융합하여 상생 가치를 설계합니다'
    },
    {
      name: '정부/지자체 청사 프레젠테이션',
      url: 'https://images.unsplash.com/photo-1541829011-856ed61d7132?auto=format&fit=crop&q=80&w=600',
      tagline: '신뢰도 높은 행정 연계형 사업 모델 제안'
    },
    {
      name: '공공 서비스 정책 포럼',
      url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600',
      tagline: '지역사회 현안 중심의 정교한 매뉴얼 수립'
    }
  ],
  'service-2': [
    {
      name: '기업 ESG 기획 (기본)',
      url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600',
      tagline: '기업의 사회적 책임과 로컬 상생을 잇는 가치 창출'
    },
    {
      name: '환경 보호 브레인스토밍',
      url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600',
      tagline: '친환경 및 소상공인 ESG 프로젝트 기획 및 검증'
    },
    {
      name: '사회공헌 오피스 파트너십',
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600',
      tagline: '브랜드 가치 향상을 위한 정교한 CSR 브랜딩 실현'
    }
  ],
  'service-3': [
    {
      name: '소상공인 성장 대시보드 (기본)',
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
      tagline: 'AI 기반 디지털 홍보 및 해외시장 판로 개척 솔루션'
    },
    {
      name: '글로벌 비즈니스 워크숍',
      url: 'https://images.unsplash.com/photo-1542744173-8e0ee26cf15a?auto=format&fit=crop&q=80&w=600',
      tagline: '고객 확보와 온라인 마케팅 전략 트레이닝'
    },
    {
      name: '스마트 디지털 상점',
      url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=600',
      tagline: '글로벌 결제 및 고도화된 고객 데이터 분석 지원'
    }
  ],
  'service-4': [
    {
      name: '다문화 지원 멘토링 (기본)',
      url: 'https://images.unsplash.com/photo-1521791136368-1a46827d3ad4?auto=format&fit=crop&q=80&w=600',
      tagline: '다양한 구성원의 언어 및 직무 역량 강화 지원'
    },
    {
      name: '글로벌 협력 세미나',
      url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600',
      tagline: 'AI 자립 지원 프로그램과 지역 비즈니스 협업'
    },
    {
      name: '가족 지원 문화 교실',
      url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600',
      tagline: '안정적인 로컬 정착을 돕는 커뮤니티 교육 허브'
    }
  ],
  director: [
    {
      name: '프로페셔널 여성 리더 (기본)',
      url: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=600',
      tagline: '신뢰와 전문성을 겸비한 프로젝트 디렉터'
    },
    {
      name: '프로페셔널 비즈니스 디렉터',
      url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
      tagline: '20년 글로벌 비즈니스 프랙티셔너의 노하우'
    },
    {
      name: '스마트 소셜 혁신 파트너',
      url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600',
      tagline: '지역 상생과 소셜 혁신의 중심 기획가'
    },
    {
      name: '프로페셔널 비즈니스 리더',
      url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
      tagline: '글로벌 무역 및 해외영업 전략 파트너'
    }
  ]
};

export default function ImageSelectorModal({
  isOpen,
  onClose,
  currentUrl,
  targetId,
  targetTitle,
  onSelect
}: ImageSelectorModalProps) {
  const [customUrl, setCustomUrl] = useState(currentUrl);
  const [errorMsg, setErrorMsg] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  // Retrieve presets, fallback to hero if targetId doesn't match
  const presets = CURATED_PRESETS[targetId] || CURATED_PRESETS.hero;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    if (file.size > 2.5 * 1024 * 1024) {
      setErrorMsg('이미지 용량이 너무 큽니다. 2.5MB 이하의 이미지만 업로드 가능합니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        onSelect(result);
        onClose();
      }
    };
    reader.onerror = () => {
      setErrorMsg('파일을 읽는 중에 오류가 발생했습니다.');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) {
      setErrorMsg('올바른 이미지 URL 주소를 입력해 주세요.');
      return;
    }
    if (!customUrl.startsWith('http://') && !customUrl.startsWith('https://')) {
      setErrorMsg('URL 주소는 http:// 또는 https://로 시작해야 합니다.');
      return;
    }
    onSelect(customUrl);
    onClose();
  };

  const handlePresetSelect = (url: string) => {
    setCustomUrl(url);
    onSelect(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative flex h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-6 py-4.5 sm:px-8">
          <div className="text-left">
            <span className="font-mono text-[10px] font-bold tracking-widest text-brand-blue uppercase">
              IMAGE SELECTOR & PRESETS
            </span>
            <h3 className="font-display text-sm font-bold text-brand-navy mt-1">
              &apos;{targetTitle}&apos; 이미지 간편 변경
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Quick Curated Preset Grid */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-left">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-brand-blue font-bold text-[10px]">1</span>
              <p className="text-xs font-bold text-slate-700">추천 프리셋에서 즉시 선택 (마우스 클릭)</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {presets.map((preset) => {
                const isSelected = currentUrl === preset.url;
                return (
                  <button
                    key={preset.url}
                    onClick={() => handlePresetSelect(preset.url)}
                    className={`group relative flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer ${
                      isSelected
                        ? 'border-brand-blue ring-1 ring-brand-blue/30 bg-blue-50/10'
                        : 'border-slate-100 bg-white hover:border-slate-300'
                    }`}
                  >
                    {/* Visual aspect ratio crop */}
                    <div className="relative aspect-[16/10] w-full bg-slate-50 overflow-hidden">
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                        referrerPolicy="no-referrer"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center bg-brand-blue/20 backdrop-blur-xs">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue text-white shadow-md">
                            <Check className="h-5 w-5" />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h4 className="font-display text-xs font-bold text-brand-navy group-hover:text-brand-blue transition-colors duration-150">
                        {preset.name}
                      </h4>
                      <p className="mt-1 text-[11px] leading-normal text-slate-400 font-sans">
                        {preset.tagline}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Local File Upload Section */}
          <div className="space-y-4 pt-6 border-t border-slate-100 text-left">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-brand-blue font-bold text-[10px]">2</span>
              <p className="text-xs font-bold text-slate-700">내 컴퓨터에서 이미지 파일 업로드</p>
            </div>
            
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              JPEG, PNG, WEBP, GIF 형식의 이미지 파일을 직접 선택하거나 드래그하여 적용하실 수 있습니다. (최대 용량 2.5MB)
            </p>

            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-200 cursor-pointer ${
                isDragging 
                  ? 'border-brand-blue bg-blue-50/10 scale-[1.01]' 
                  : 'border-slate-200 bg-slate-50/30 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <input
                type="file"
                id="image-file-upload"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <Upload className="h-8 w-8 text-slate-400 mb-2 transition-transform duration-200" />
              <p className="text-xs font-semibold text-slate-600">클릭하거나 여기로 파일을 끌어다 놓으세요</p>
              <p className="mt-1 text-[10px] text-slate-400 font-sans">PNG, JPG, WEBP, GIF (최대 2.5MB)</p>
            </div>
          </div>

          {/* Custom Link Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-6 border-t border-slate-100 text-left">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-brand-blue font-bold text-[10px]">3</span>
              <label htmlFor="custom-url-input" className="text-xs font-bold text-slate-700">임의의 외부 이미지 링크 입력</label>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Unsplash (https://images.unsplash.com/...) 또는 소장하고 계신 웹 이미지 절대 주소 링크를 붙여넣으시면 즉시 반영됩니다.
            </p>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <Link className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  id="custom-url-input"
                  value={customUrl}
                  onChange={(e) => {
                    setCustomUrl(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-xs text-slate-700 font-mono placeholder-slate-400 focus:border-brand-blue focus:outline-hidden focus:ring-1 focus:ring-brand-blue"
                />
              </div>
              
              <button
                type="submit"
                className="rounded-xl bg-brand-navy px-5 text-xs font-bold text-white hover:bg-brand-blue transition-colors cursor-pointer shrink-0"
              >
                적용하기
              </button>
            </div>

            {errorMsg && (
              <p className="text-[11px] font-semibold text-rose-500 flex items-center gap-1">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>{errorMsg}</span>
              </p>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 bg-slate-50 p-4 text-center">
          <p className="text-[10px] text-slate-400 font-sans">
            AIVEXA Interactive Live Editor • 이미지 클릭으로 언제나 자유롭게 교체하실 수 있습니다.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
