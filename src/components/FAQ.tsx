import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems: FAQItem[] = [
    {
      question: 'AIVEXA는 어떤 가치를 지향합니까?',
      answer: 'AI가 아니라 사람을 먼저 생각합니다. 20년 이상의 글로벌 무역·해외영업 경험과 중국어 전문성을 바탕으로 공공기관, 기업과 협력하여 소상공인과 외국인을 위한 실전 프로젝트를 기획하고 운영합니다. AI는 목적이 아니라 더 큰 사회적 가치를 만드는 도구입니다.'
    },
    {
      question: '어떤 서비스를 기획하고 운영하나요?',
      answer: '공공기관 협력, 기업 CSR / ESG, 소상공인 지원, 외국인 지원 프로젝트를 기획하고 설계합니다. 단순한 학문 교육이나 기술 전달에 그치지 않고 실제 문제 해결과 직결되는 실전 프로젝트를 운영합니다.'
    },
    {
      question: '어떤 기관들과 협력 모델을 구축하고 있습니까?',
      answer: '공공기관, 지방자치단체, 기업 CSR팀, 사회공헌재단, 소상공인지원기관, 여성기업지원기관, 가족센터, 다문화가족지원센터, 대학교, 평생교육기관 등 지속 가능한 협력 모델을 함께 설계할 수 있는 다양한 기관들과 협력합니다.'
    },
    {
      question: '프로젝트 제안서 및 문의 프로세스는 어떻게 되나요?',
      answer: '홈페이지 하단의 제안서 및 프로젝트 문의 양식을 통해 기안해 주시면 공공사업 절차와 예산 집행, 성과 보고 양식까지 철저히 분석하고 최적화해 왔습니다. 행정 프로세스의 높은 이해도와 민간 최고 수준의 기획 역량을 결합하여 신뢰를 증명합니다.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 sm:py-28" id="faq-section">
      <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-bold tracking-widest text-brand-blue uppercase mb-4">
            Frequently Asked Questions
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            자주 묻는 질문 (FAQ)
          </h2>
          <p className="mt-4 text-sm text-slate-500 font-sans max-w-xl mx-auto break-keep">
            AIVEXA의 프로젝트 기획, 운영 철학 및 협력 모델에 대해 가장 자주 문의하시는 질문들을 정리하였습니다.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'border-brand-blue/30 bg-blue-50/10 shadow-md shadow-brand-blue/5' 
                    : 'border-slate-100 bg-slate-50/30 hover:bg-white hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left font-display text-sm sm:text-base font-bold text-brand-navy transition-colors duration-200 cursor-pointer focus:outline-hidden"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`h-5 w-5 shrink-0 ${isOpen ? 'text-brand-blue' : 'text-slate-400'}`} />
                    <span className="break-keep">{item.question}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-brand-blue shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400 shrink-0 ml-4" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-0 border-t border-slate-100/50">
                        <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600 font-sans whitespace-pre-line break-keep text-left">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Trust Statement */}
        <div className="mt-16 flex items-center gap-3 rounded-2xl bg-slate-50 border border-slate-100/80 p-5 w-full text-left">
          <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed break-keep">
            기타 공공기관 맞춤형 CSR/ESG 프로젝트 제안서 다운로드나 추가적인 행정 예산 연계 기획 문의는 아래의 <strong>프로젝트 문의</strong> 폼을 통해 편하게 남겨주시면 정성껏 답변해 드리겠습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
