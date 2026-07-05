import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, FileText, Lock } from 'lucide-react';
import { Inquiry } from '../types';

interface InquiryFormProps {
  onSubmitInquiry: (inquiry: Omit<Inquiry, 'id' | 'submittedAt' | 'status'>) => void;
}

export default function InquiryForm({ onSubmitInquiry }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    department: '',
    contactName: '',
    email: '',
    phone: '',
    title: '',
    projectBudget: '',
    targetAudience: '',
    description: '',
  });

  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Field Validation
    if (!formData.companyName.trim()) return setErrorMessage('기관/기업명을 입력해 주세요.');
    if (!formData.contactName.trim()) return setErrorMessage('담당자 성함을 입력해 주세요.');
    if (!formData.email.trim()) return setErrorMessage('연락 가능한 이메일을 입력해 주세요.');
    if (!formData.phone.trim()) return setErrorMessage('연락처를 입력해 주세요.');
    if (!formData.title.trim()) return setErrorMessage('문의 제목을 입력해 주세요.');
    if (!formData.description.trim()) return setErrorMessage('상세 기획 및 협력 내용을 입력해 주세요.');
    if (!agreed) return setErrorMessage('개인정보 수집 및 이용에 동의해 주셔야 합니다.');

    setIsSubmitting(true);

    // Simulate database insertion lag
    setTimeout(() => {
      onSubmitInquiry(formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        companyName: '',
        department: '',
        contactName: '',
        email: '',
        phone: '',
        title: '',
        projectBudget: '',
        targetAudience: '',
        description: '',
      });
      setAgreed(false);
    }, 1000);
  };

  return (
    <section className="bg-white py-20 sm:py-28 border-t border-slate-100" id="inquiry">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-100 px-4 py-1.5 text-xs font-bold tracking-widest text-slate-800 uppercase mb-4">
            PROJECT INQUIRY
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            프로젝트 및 파트너십 문의
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto break-keep">
            공공기관 협력, CSR/ESG 프로그램 제안, 소상공인 및 다문화 지원 기획 등<br />
            AIVEXA의 기획 전문가들이 가장 정교하고 실용적인 사회 소셜 임팩트 프로젝트 모델을 제안합니다.
          </p>
        </div>

        {/* Form Area */}
        <div className="rounded-3xl border border-slate-100 bg-slate-50/20 p-8 sm:p-12 shadow-sm relative">
          
          <AnimatePresence mode="wait">
            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-12 text-center"
                id="inquiry-success-message"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100">
                  <CheckCircle2 className="h-10 w-10 animate-bounce" />
                </div>
                <h3 className="font-display text-2xl font-bold text-brand-navy">
                  문의가 성공적으로 접수되었습니다
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-500 max-w-md">
                  전송해 주신 기획 및 협업 제안은 AIVEXA 프로젝트 디렉터가 세밀히 검토한 뒤 <b>영업일 기준 2일 이내</b>에 기재해 주신 연락처로 피드백을 전달해 드리겠습니다.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-8 rounded-full bg-brand-navy px-6 py-2.5 font-display text-xs font-semibold text-white transition-all hover:bg-brand-blue cursor-pointer"
                >
                  추가 문의 작성하기
                </button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* Section: Client Details */}
                <div>
                  <h3 className="flex items-center gap-2 font-display text-base font-bold text-brand-navy border-b border-slate-100 pb-3 mb-6">
                    <FileText className="h-4.5 w-4.5 text-brand-blue" />
                    <span>기관 및 담당자 정보</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* Organization / Company */}
                    <div className="text-left">
                      <label htmlFor="companyName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        기관 / 기업명 <span className="text-brand-blue">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="예: OO지방자치단체, (주)에이벡사"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-brand-blue focus:outline-hidden focus:ring-1 focus:ring-brand-blue"
                      />
                    </div>

                    {/* Department / Title */}
                    <div className="text-left">
                      <label htmlFor="department" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        부서 / 직함
                      </label>
                      <input
                        type="text"
                        name="department"
                        id="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        placeholder="예: 일자리경제과 CSR사업부 팀장"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-brand-blue focus:outline-hidden focus:ring-1 focus:ring-brand-blue"
                      />
                    </div>

                    {/* Contact Person */}
                    <div className="text-left">
                      <label htmlFor="contactName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        담당자 성함 <span className="text-brand-blue">*</span>
                      </label>
                      <input
                        type="text"
                        name="contactName"
                        id="contactName"
                        required
                        value={formData.contactName}
                        onChange={handleInputChange}
                        placeholder="예: 홍길동"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-brand-blue focus:outline-hidden focus:ring-1 focus:ring-brand-blue"
                      />
                    </div>

                    {/* Contact Email */}
                    <div className="text-left">
                      <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        연락처 (이메일) <span className="text-brand-blue">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="example@organization.or.kr"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-brand-blue focus:outline-hidden focus:ring-1 focus:ring-brand-blue"
                      />
                    </div>

                    {/* Contact Phone */}
                    <div className="text-left">
                      <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        연락처 (휴대전화 / 직통번호) <span className="text-brand-blue">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="010-0000-0000 또는 02-000-0000"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-brand-blue focus:outline-hidden focus:ring-1 focus:ring-brand-blue"
                      />
                    </div>

                    {/* Project Budget */}
                    <div className="text-left">
                      <label htmlFor="projectBudget" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        희망 예산 범위
                      </label>
                      <select
                        name="projectBudget"
                        id="projectBudget"
                        value={formData.projectBudget}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-brand-blue focus:outline-hidden focus:ring-1 focus:ring-brand-blue"
                      >
                        <option value="">선택해 주세요</option>
                        <option value="500만원 미만">500만원 미만</option>
                        <option value="500만원 ~ 1,000만원">500만원 ~ 1,000만원</option>
                        <option value="1,000만원 ~ 3,000만원">1,000만원 ~ 3,000만원</option>
                        <option value="3,000만원 ~ 5,000만원">3,000만원 ~ 5,000만원</option>
                        <option value="5,000만원 이상">5,000만원 이상</option>
                        <option value="협의 가능 / 미정">협의 가능 / 미정</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section: Project Blueprint Details */}
                <div>
                  <h3 className="flex items-center gap-2 font-display text-base font-bold text-brand-navy border-b border-slate-100 pb-3 mb-6">
                    <Send className="h-4.5 w-4.5 text-brand-blue" />
                    <span>협력 프로젝트 내용</span>
                  </h3>

                  <div className="space-y-6">
                    {/* Inquiry Title */}
                    <div className="text-left">
                      <label htmlFor="title" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        문의 프로젝트 제목 <span className="text-brand-blue">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="예: 2026 소상공인 AI 마케팅 실무 활용 지원 프로젝트 기획"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-brand-blue focus:outline-hidden focus:ring-1 focus:ring-brand-blue"
                      />
                    </div>

                    {/* Target Audience */}
                    <div className="text-left">
                      <label htmlFor="targetAudience" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        수혜 대상자 정의
                      </label>
                      <input
                        type="text"
                        name="targetAudience"
                        id="targetAudience"
                        value={formData.targetAudience}
                        onChange={handleInputChange}
                        placeholder="예: 관내 전통시장 소상공인 약 50개사, 다문화가족 및 결혼이민자 여성"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-brand-blue focus:outline-hidden focus:ring-1 focus:ring-brand-blue"
                      />
                    </div>

                    {/* Detailed Content */}
                    <div className="text-left">
                      <label htmlFor="description" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        상세 기획 및 파트너십 요구사항 <span className="text-brand-blue">*</span>
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        required
                        rows={5}
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="구상하고 계신 소셜 임팩트 프로젝트의 개요, 필요한 협력 스펙, 해결하고자 하는 지역사회의 문제 상황 등을 자유롭게 기재해 주세요."
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-brand-blue focus:outline-hidden focus:ring-1 focus:ring-brand-blue"
                      />
                    </div>
                  </div>
                </div>

                {/* Privacy agreement & error feedback */}
                <div className="border-t border-slate-100 pt-6">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 mb-6 text-left">
                    <p className="font-sans text-[11px] text-slate-500 leading-relaxed">
                      <b>개인정보 수집 및 이용 동의 안내:</b><br />
                      수집하는 개인정보 항목: 기관/기업명, 부서, 직함, 이름, 이메일, 전화번호.<br />
                      수집 및 이용 목적: 소셜 혁신 AI 프로젝트 제안 피드백 및 파트너십 컨설팅 연락.<br />
                      보유 및 이용 기간: 목적 달성 후 1년 이내 파기 (또는 제안 계약 해지 시 즉시 파기).
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-left select-none">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="h-4.5 w-4.5 rounded-sm border-slate-300 text-brand-blue focus:ring-brand-blue"
                        id="privacy-agreement-checkbox"
                      />
                      <span className="text-xs font-bold text-slate-700">개인정보 수집 및 이용에 동의합니다.</span>
                    </label>

                    {errorMessage && (
                      <div className="flex items-center gap-1.5 text-xs font-medium text-rose-500 text-left">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-brand-navy px-10 py-4 font-display text-sm font-semibold text-white transition-all hover:bg-brand-blue disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer"
                    id="inquiry-submit-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>전송 중...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 text-slate-400" />
                        <span>프로젝트 제안 문의 신청</span>
                      </>
                    )}
                  </button>
                </div>

              </motion.form>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
