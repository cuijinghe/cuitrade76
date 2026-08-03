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
    deadline: '',
    referenceLink: '',
    description: '',
  });

  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedService, setSubmittedService] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setErrorMessage('');

    // Field Validation
    if (!formData.companyName.trim()) return setErrorMessage('기관/기업명을 입력해 주세요.');
    if (!formData.contactName.trim()) return setErrorMessage('담당자 성함을 입력해 주세요.');
    if (!formData.email.trim()) return setErrorMessage('연락 가능한 이메일을 입력해 주세요.');
    if (!formData.phone.trim()) return setErrorMessage('연락처를 입력해 주세요.');
    if (!formData.title.trim()) return setErrorMessage('필요한 서비스를 선택해 주세요.');
    if (!formData.deadline.trim()) return setErrorMessage('희망 납기를 입력해 주세요.');
    if (!formData.description.trim()) return setErrorMessage('작업 내용을 입력해 주세요.');
    if (!agreed) return setErrorMessage('개인정보 수집 및 이용에 동의해 주셔야 합니다.');

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xaqrrrrk', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          service: formData.title,
          volume: formData.targetAudience,
          budget: formData.projectBudget,
          _subject: `[AIVEXA 작업 문의] ${formData.title}`,
        }),
      });

      if (!response.ok) {
        throw new Error('문의 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.');
      }

      onSubmitInquiry(formData);
      setSubmittedService(formData.title);
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
      deadline: '',
      referenceLink: '',
      description: '',
      });
      setAgreed(false);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '문의 전송에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
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
            작업 문의
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto break-keep">
            필요한 업무와 납기를 알려주시면 자료 확인 후 작업 가능 여부, 범위와 비용을 안내합니다.<br />
            민감하거나 기밀인 자료는 1차 문의에 첨부하거나 입력하지 마세요.
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
                  <b>{submittedService}</b> 문의가 접수되었습니다. 내용을 확인한 뒤 기재해 주신 연락처로 회신드리겠습니다.
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
                    <span>의뢰자 및 담당자 정보</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* Organization / Company */}
                    <div className="text-left">
                      <label htmlFor="companyName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        회사명 또는 의뢰자명 <span className="text-brand-blue">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="예: 회사명 또는 의뢰자명"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-brand-blue focus:outline-hidden focus:ring-1 focus:ring-brand-blue"
                      />
                    </div>

                    {/* Department / Title */}
                    <div className="text-left">
                      <label htmlFor="department" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        부서 / 직함 (선택)
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
                        예산 범위 (선택)
                      </label>
                      <select
                        name="projectBudget"
                        id="projectBudget"
                        value={formData.projectBudget}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-brand-blue focus:outline-hidden focus:ring-1 focus:ring-brand-blue"
                      >
                        <option value="">선택해 주세요</option>
                        <option value="10만원 미만">10만원 미만</option>
                        <option value="10만원 ~ 30만원">10만원 ~ 30만원</option>
                        <option value="30만원 ~ 100만원">30만원 ~ 100만원</option>
                        <option value="100만원 이상">100만원 이상</option>
                        <option value="협의 가능 / 미정">협의 가능 / 미정</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section: Project Blueprint Details */}
                <div>
                  <h3 className="flex items-center gap-2 font-display text-base font-bold text-brand-navy border-b border-slate-100 pb-3 mb-6">
                    <Send className="h-4.5 w-4.5 text-brand-blue" />
                    <span>작업 요청 내용</span>
                  </h3>

                  <div className="space-y-6">
                    {/* Inquiry Title */}
                    <div className="text-left">
                      <label htmlFor="title" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        필요한 서비스 <span className="text-brand-blue">*</span>
                      </label>
                      <select
                        name="title"
                        id="title"
                        required
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-brand-blue focus:outline-hidden focus:ring-1 focus:ring-brand-blue"
                      >
                        <option value="">선택해 주세요</option>
                        <option value="기업문서 번역·검수">기업문서 번역·검수</option>
                        <option value="중국 비즈니스 문장">중국 비즈니스 문장</option>
                        <option value="중국 업체·시장 기초조사">중국 업체·시장 기초조사</option>
                        <option value="해외영업 문서 지원">해외영업 문서 지원</option>
                        <option value="기업 AI 활용·교육">기업 AI 활용·교육</option>
                        <option value="기타">기타</option>
                      </select>
                    </div>

                    {/* Target Audience */}
                    <div className="text-left">
                      <label htmlFor="targetAudience" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        예상 분량 (선택)
                      </label>
                      <input
                        type="text"
                        name="targetAudience"
                        id="targetAudience"
                        value={formData.targetAudience}
                        onChange={handleInputChange}
                        placeholder="예: A4 2쪽, 업체 10곳"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-brand-blue focus:outline-hidden focus:ring-1 focus:ring-brand-blue"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="text-left">
                        <label htmlFor="deadline" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          희망 납기 <span className="text-brand-blue">*</span>
                        </label>
                        <input type="text" name="deadline" id="deadline" required value={formData.deadline} onChange={handleInputChange} placeholder="예: 8월 15일까지" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-brand-blue focus:outline-hidden focus:ring-1 focus:ring-brand-blue" />
                      </div>
                      <div className="text-left">
                        <label htmlFor="referenceLink" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">참고 링크 (선택)</label>
                        <input type="url" name="referenceLink" id="referenceLink" value={formData.referenceLink} onChange={handleInputChange} placeholder="https://" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-brand-blue focus:outline-hidden focus:ring-1 focus:ring-brand-blue" />
                      </div>
                    </div>

                    {/* Detailed Content */}
                    <div className="text-left">
                      <label htmlFor="description" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        작업 내용 <span className="text-brand-blue">*</span>
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        required
                        rows={5}
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="원하는 결과물, 사용 목적, 원문 언어와 필요한 지원 내용을 알려주세요."
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
                      수집 및 이용 목적: 문의 내용 확인, 견적 및 작업 가능 여부 회신.<br />
                      보유 및 이용 기간: 목적 달성 후 1년 이내 파기 (또는 제안 계약 해지 시 즉시 파기).
                      <br />문의자료는 목적 외로 사용하지 않습니다. <a href="/privacy" className="font-bold text-brand-blue underline">개인정보처리방침</a>
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
                        <span>작업 문의하기</span>
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
