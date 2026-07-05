import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, Check, Trash2, Download, RefreshCw, FileText, 
  Image as ImageIcon, Type, ExternalLink, Calendar, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { SiteConfig, Inquiry, ServiceItem } from '../types';

interface AdminPanelProps {
  config: SiteConfig;
  inquiries: Inquiry[];
  onClose: () => void;
  onUpdateConfig: (newConfig: SiteConfig) => void;
  onDeleteInquiry: (id: string) => void;
  onUpdateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  onResetToDefault: () => void;
}

export default function AdminPanel({ 
  config, 
  inquiries, 
  onClose, 
  onUpdateConfig, 
  onDeleteInquiry, 
  onUpdateInquiryStatus,
  onResetToDefault 
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'images' | 'text'>('inquiries');
  const [editConfig, setEditConfig] = useState<SiteConfig>({ ...config });
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Default Image Preset recommendations
  const imagePresets = {
    hero: [
      { name: 'Co-working Meeting (기본)', url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Corporate Workshop', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Modern Architecture Minimal', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200' },
    ],
    service1: [
      { name: 'Public Seminar (기본)', url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600' },
      { name: 'Administrative Hall', url: 'https://images.unsplash.com/photo-1541829011-856ed61d7132?auto=format&fit=crop&q=80&w=600' },
    ],
    service2: [
      { name: 'Desk and Plant (기본)', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600' },
      { name: 'Team ESG Brainstorm', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600' },
    ],
    service3: [
      { name: 'Shop Dashboard (기본)', url: 'https://images.unsplash.com/photo-1542744173-8e0ee26cf15a?auto=format&fit=crop&q=80&w=600' },
      { name: 'Local Store Owner', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600' },
    ],
    service4: [
      { name: 'Support Meeting (기본)', url: 'https://images.unsplash.com/photo-1521791136368-1a46827d3ad4?auto=format&fit=crop&q=80&w=600' },
      { name: 'Diverse Collaboration', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600' },
    ],
    director: [
      { name: 'Female Executive (기본)', url: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=600' },
      { name: 'Female Executive Alternate', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600' },
    ]
  };

  const handleConfigChange = (section: string, field: string, value: any) => {
    setEditConfig((prev) => {
      const updated = { ...prev };
      if (section === 'hero') {
        updated.hero = { ...updated.hero, [field]: value };
      } else if (section === 'director') {
        updated.director = { ...updated.director, [field]: value };
      } else if (section === 'footer') {
        updated.footer = { ...updated.footer, [field]: value };
      }
      return updated;
    });
  };

  const handleServiceChange = (id: string, field: keyof ServiceItem, value: string) => {
    setEditConfig((prev) => {
      const updated = { ...prev };
      updated.services.items = updated.services.items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      });
      return updated;
    });
  };

  const handleSave = () => {
    onUpdateConfig(editConfig);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const exportToCSV = () => {
    if (inquiries.length === 0) return alert('접수된 문의 내역이 없습니다.');
    
    const headers = ['ID', '기관/기업명', '부서', '담당자', '이메일', '연락처', '프로젝트 예산', '지원 대상', '제목', '내용', '신청일자', '진행상태'];
    const rows = inquiries.map(inq => [
      inq.id,
      `"${inq.companyName.replace(/"/g, '""')}"`,
      `"${inq.department.replace(/"/g, '""')}"`,
      `"${inq.contactName.replace(/"/g, '""')}"`,
      inq.email,
      inq.phone,
      inq.projectBudget,
      `"${inq.targetAudience.replace(/"/g, '""')}"`,
      `"${inq.title.replace(/"/g, '""')}"`,
      `"${inq.description.replace(/"/g, '""')}"`,
      inq.submittedAt,
      inq.status
    ]);

    const csvContent = "\uFEFF" + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `AIVEXA_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 backdrop-blur-xs">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100"
      >
        {/* Admin Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4.5 sm:px-8">
          <div className="flex items-center gap-2 text-left">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-navy text-white font-bold text-xs">A</span>
            <div>
              <h2 className="font-display text-base font-bold text-brand-navy">AIVEXA 관리자 패널</h2>
              <p className="text-[11px] font-medium text-slate-400">콘텐츠 관리 및 파트너십 문의 확인</p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-100 px-6 sm:px-8">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 border-b-2 py-4 px-3 text-xs sm:text-sm font-semibold cursor-pointer ${
              activeTab === 'inquiries' 
                ? 'border-brand-navy text-brand-navy' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>제안 및 프로젝트 문의 ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('images')}
            className={`flex items-center gap-2 border-b-2 py-4 px-3 text-xs sm:text-sm font-semibold cursor-pointer ${
              activeTab === 'images' 
                ? 'border-brand-navy text-brand-navy' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <ImageIcon className="h-4 w-4" />
            <span>이미지 URL 교체</span>
          </button>

          <button
            onClick={() => setActiveTab('text')}
            className={`flex items-center gap-2 border-b-2 py-4 px-3 text-xs sm:text-sm font-semibold cursor-pointer ${
              activeTab === 'text' 
                ? 'border-brand-navy text-brand-navy' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Type className="h-4 w-4" />
            <span>텍스트 및 문구 편집</span>
          </button>
        </div>

        {/* Dynamic Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          
          {/* TAB 1: INQUIRIES LIST */}
          {activeTab === 'inquiries' && (
            <div className="h-full flex flex-col">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <h3 className="font-display text-sm font-bold text-brand-navy text-left">
                  접수된 프로젝트 문의 리스트
                </h3>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={onResetToDefault}
                    className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                    title="콘텐츠 및 이미지 초기화"
                  >
                    <RefreshCw className="h-3.5 w-3.5 text-slate-400" />
                    <span>전체 초기값 리셋</span>
                  </button>

                  <button
                    onClick={exportToCSV}
                    className="flex items-center gap-1.5 rounded-full bg-brand-navy px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-brand-blue transition-all cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>CSV 내보내기</span>
                  </button>
                </div>
              </div>

              {inquiries.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center py-12 rounded-2xl border border-dashed border-slate-200">
                  <FileText className="h-10 w-10 text-slate-300 mb-3" />
                  <p className="text-sm font-medium text-slate-400">접수된 문의 내역이 존재하지 않습니다.</p>
                  <p className="text-xs text-slate-400 mt-1">하단 문의 신청 양식을 작성하면 이곳에서 확인 가능합니다.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 h-full">
                  {/* Table/List Area */}
                  <div className={`${selectedInquiry ? 'lg:col-span-6' : 'lg:col-span-12'} overflow-x-auto rounded-xl border border-slate-100 max-h-[50vh] lg:max-h-[60vh]`}>
                    <table className="w-full min-w-[500px] border-collapse text-left text-xs text-slate-500">
                      <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-100">
                        <tr>
                          <th className="p-4">기관 / 기업명</th>
                          <th className="p-4">담당자</th>
                          <th className="p-4">프로젝트 제목</th>
                          <th className="p-4 text-center">상태</th>
                          <th className="p-4">신청일</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {inquiries.map((inq) => (
                          <tr 
                            key={inq.id}
                            onClick={() => setSelectedInquiry(inq)}
                            className={`hover:bg-slate-50/50 cursor-pointer transition-colors ${selectedInquiry?.id === inq.id ? 'bg-blue-50/40 font-semibold text-brand-navy' : ''}`}
                          >
                            <td className="p-4 text-slate-900 font-medium">{inq.companyName}</td>
                            <td className="p-4">{inq.contactName}</td>
                            <td className="p-4 max-w-[150px] truncate">{inq.title}</td>
                            <td className="p-4 text-center">
                              <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                inq.status === 'completed' ? 'bg-emerald-50 text-emerald-600' :
                                inq.status === 'reviewing' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {inq.status === 'completed' ? '완료' : inq.status === 'reviewing' ? '검토중' : '접수'}
                              </span>
                            </td>
                            <td className="p-4 text-slate-400">{inq.submittedAt.slice(2, 10)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Detailed Drawer area */}
                  {selectedInquiry && (
                    <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-slate-50/30 p-6 text-left overflow-y-auto max-h-[50vh] lg:max-h-[60vh]">
                      <div className="flex justify-between items-start border-b border-slate-200/50 pb-4 mb-4">
                        <div>
                          <span className="font-mono text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                            DETAILED INQUIRY PROPOSAL
                          </span>
                          <h4 className="font-display text-sm font-bold text-brand-navy mt-1">
                            {selectedInquiry.title}
                          </h4>
                        </div>
                        <button 
                          onClick={() => setSelectedInquiry(null)}
                          className="text-xs font-semibold text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                        >
                          닫기
                        </button>
                      </div>

                      <div className="space-y-4 text-xs font-sans text-slate-600">
                        {/* Status Change row */}
                        <div className="flex flex-wrap items-center justify-between gap-2 bg-white rounded-xl border border-slate-200/50 p-3">
                          <span className="font-bold text-slate-700">진행 상태 변경</span>
                          <div className="flex gap-1.5">
                            {(['pending', 'reviewing', 'completed'] as const).map((st) => (
                              <button
                                key={st}
                                onClick={() => {
                                  onUpdateInquiryStatus(selectedInquiry.id, st);
                                  setSelectedInquiry(prev => prev ? { ...prev, status: st } : null);
                                }}
                                className={`rounded-full px-2.5 py-1 text-[10px] font-bold transition-all cursor-pointer ${
                                  selectedInquiry.status === st 
                                    ? 'bg-brand-navy text-white shadow-xs' 
                                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                }`}
                              >
                                {st === 'completed' ? '검토 완료' : st === 'reviewing' ? '검토중' : '대기'}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="font-bold text-slate-800">기본 정보</p>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 bg-white rounded-xl p-4 border border-slate-200/40">
                            <p><b className="text-slate-400">기관/기업:</b> {selectedInquiry.companyName}</p>
                            <p><b className="text-slate-400">부서/직함:</b> {selectedInquiry.department || '-'}</p>
                            <p><b className="text-slate-400">담당자:</b> {selectedInquiry.contactName}</p>
                            <p><b className="text-slate-400">이메일:</b> {selectedInquiry.email}</p>
                            <p className="col-span-2"><b className="text-slate-400">연락처:</b> {selectedInquiry.phone}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white rounded-xl p-4 border border-slate-200/40">
                            <p className="font-bold text-slate-800">희망 예산 범위</p>
                            <p className="mt-1.5 font-medium text-brand-blue">{selectedInquiry.projectBudget || '미지정'}</p>
                          </div>
                          <div className="bg-white rounded-xl p-4 border border-slate-200/40">
                            <p className="font-bold text-slate-800">수혜 대상</p>
                            <p className="mt-1.5 font-medium text-slate-700">{selectedInquiry.targetAudience || '미지정'}</p>
                          </div>
                        </div>

                        <div>
                          <p className="font-bold text-slate-800">문의 상세 기획서 내용</p>
                          <div className="bg-white rounded-xl p-4 border border-slate-200/40 mt-2 min-h-24 whitespace-pre-wrap leading-relaxed text-slate-700">
                            {selectedInquiry.description}
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            접수 시점: {selectedInquiry.submittedAt}
                          </span>
                          
                          <button
                            onClick={() => {
                              onDeleteInquiry(selectedInquiry.id);
                              setSelectedInquiry(null);
                            }}
                            className="flex items-center gap-1 rounded-full text-rose-500 hover:bg-rose-50 px-3 py-1.5 font-semibold transition-all cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>문의 내역 삭제</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: IMAGE URLS */}
          {activeTab === 'images' && (
            <div className="space-y-8 text-left max-w-4xl mx-auto">
              <div>
                <h3 className="font-display text-sm font-bold text-brand-navy mb-2">
                  홈페이지 대표 비주얼 이미지 URL 교체
                </h3>
                <p className="text-xs text-slate-400">
                  관리자 모드 활성화 시 각 섹션에서도 직관적으로 편집할 수 있습니다. 인터넷 Unsplash 또는 외부 이미지 소스 링크를 입력하고 저장을 누르면 즉시 렌더링됩니다.
                </p>
              </div>

              <div className="space-y-6">
                {/* 1. Hero Image */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    메인 히어로 대표 사진 URL
                  </label>
                  <input
                    type="text"
                    value={editConfig.hero.imageUrl}
                    onChange={(e) => handleConfigChange('hero', 'imageUrl', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-700 font-mono"
                  />
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400">추천 프리셋:</span>
                    {imagePresets.hero.map((ps) => (
                      <button
                        key={ps.name}
                        onClick={() => handleConfigChange('hero', 'imageUrl', ps.url)}
                        className="rounded-full bg-white border border-slate-200 px-2.5 py-1 text-[10px] text-slate-600 hover:border-brand-navy hover:text-brand-navy cursor-pointer"
                      >
                        {ps.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Director Profile Image */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    대표자 프로필 사진 URL
                  </label>
                  <input
                    type="text"
                    value={editConfig.director.imageUrl}
                    onChange={(e) => handleConfigChange('director', 'imageUrl', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-700 font-mono"
                  />
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400">추천 프리셋:</span>
                    {imagePresets.director.map((ps) => (
                      <button
                        key={ps.name}
                        onClick={() => handleConfigChange('director', 'imageUrl', ps.url)}
                        className="rounded-full bg-white border border-slate-200 px-2.5 py-1 text-[10px] text-slate-600 hover:border-brand-navy hover:text-brand-navy cursor-pointer"
                      >
                        {ps.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Service Card Images */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6 space-y-6">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    사회 혁신 프로젝트 4개 카드 이미지
                  </h4>
                  
                  {editConfig.services.items.map((item) => (
                    <div key={item.id} className="border-t border-slate-200/50 pt-4 first:border-0 first:pt-0">
                      <p className="text-xs font-bold text-slate-600 mb-2">{item.title}</p>
                      <input
                        type="text"
                        value={item.imageUrl}
                        onChange={(e) => handleServiceChange(item.id, 'imageUrl', e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-700 font-mono"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Trigger */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                {saveSuccess ? (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>이미지 URL 변경 사항이 정상 저장되었습니다.</span>
                  </div>
                ) : <span />}

                <button
                  onClick={handleSave}
                  className="rounded-full bg-brand-navy px-8 py-3 text-xs font-bold text-white hover:bg-brand-blue cursor-pointer"
                >
                  변경 이미지 영구 저장
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: TEXTS */}
          {activeTab === 'text' && (
            <div className="space-y-8 text-left max-w-4xl mx-auto">
              <div>
                <h3 className="font-display text-sm font-bold text-brand-navy mb-2">
                  공식 홈페이지 헤드 카피 및 설명 편집
                </h3>
                <p className="text-xs text-slate-400">
                  전체적인 브랜드 문구 및 상세 텍스트 설명을 기획 목적에 맞추어 맞춤 변경할 수 있습니다.
                </p>
              </div>

              <div className="space-y-6">
                {/* Hero Section Copy */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 space-y-4">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2">
                    메인 히어로 문구 기획
                  </h4>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1.5">상단 슬로건</label>
                    <input
                      type="text"
                      value={editConfig.hero.slogan}
                      onChange={(e) => handleConfigChange('hero', 'slogan', e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1.5">대표 헤드 카피 (줄바꿈은 \n 또는 Enter 가능)</label>
                    <textarea
                      rows={2}
                      value={editConfig.hero.title}
                      onChange={(e) => handleConfigChange('hero', 'title', e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1.5">히어로 서브 설명</label>
                    <textarea
                      rows={2}
                      value={editConfig.hero.subtitle}
                      onChange={(e) => handleConfigChange('hero', 'subtitle', e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-700"
                    />
                  </div>
                </div>

                {/* Director Section Copy */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 space-y-4">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2">
                    대표자 프로필 및 전문성 기획
                  </h4>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1.5">소개 섹션 타이틀</label>
                    <input
                      type="text"
                      value={editConfig.director.title}
                      onChange={(e) => handleConfigChange('director', 'title', e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1.5">소개 메인 서술</label>
                    <textarea
                      rows={3}
                      value={editConfig.director.experience}
                      onChange={(e) => handleConfigChange('director', 'experience', e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-700"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1.5">핵심 전문성 (Expertise)</label>
                      <input
                        type="text"
                        value={editConfig.director.expertise}
                        onChange={(e) => handleConfigChange('director', 'expertise', e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-700"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1.5">집중 분야 (Focus Area)</label>
                      <input
                        type="text"
                        value={editConfig.director.focusArea}
                        onChange={(e) => handleConfigChange('director', 'focusArea', e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Card Title & Content */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6 space-y-6">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    사회 혁신 프로젝트 4개 카드 텍스트 편집
                  </h4>
                  
                  {editConfig.services.items.map((item) => (
                    <div key={item.id} className="border-t border-slate-200/50 pt-4 first:border-0 first:pt-0 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-1">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">카드 제목</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleServiceChange(item.id, 'title', e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">카드 상세 설명</label>
                        <textarea
                          rows={2}
                          value={item.description}
                          onChange={(e) => handleServiceChange(item.id, 'description', e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Trigger */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                {saveSuccess ? (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>홈페이지 텍스트 변경 사항이 정상 저장되었습니다.</span>
                  </div>
                ) : <span />}

                <button
                  onClick={handleSave}
                  className="rounded-full bg-brand-navy px-8 py-3 text-xs font-bold text-white hover:bg-brand-blue cursor-pointer"
                >
                  변경 텍스트 영구 저장
                </button>
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
