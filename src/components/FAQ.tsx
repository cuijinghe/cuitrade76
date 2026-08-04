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
      question: '어떤 업무를 의뢰할 수 있나요?',
      answer: '기업문서 한중·중한 번역과 검수, 중국 비즈니스 문장 작성, 중국 업체·시장 공개자료 기초조사, 해외영업 문서, 기업 AI 활용과 교육을 의뢰할 수 있습니다.'
    },
    {
      question: '소량 또는 단기 작업도 가능한가요?',
      answer: '가능합니다. 필요한 업무, 자료 상태와 희망 납기를 확인한 뒤 작업 가능 여부와 범위를 안내합니다.'
    },
    {
      question: '최소 작업비가 있나요?',
      answer: '최소 작업비는 50,000원입니다. 예산이 낮은 경우 가격을 낮추기보다 작업 범위를 조정하여 안내합니다.'
    },
    {
      question: '번역비는 어떻게 계산하나요?',
      answer: '일반 번역은 원문 글자 수를 기준으로 계산합니다. 언어 방향, 전문성, 문서 상태, 편집 난이도와 납기에 따라 달라질 수 있습니다.'
    },
    {
      question: '시장조사 비용은 어떻게 결정되나요?',
      answer: '조사 업체 수, 조사 항목, 출처 확인 수준, 비교분석 여부와 보고서 분량을 기준으로 산정합니다.'
    },
    {
      question: '긴급 작업도 가능한가요?',
      answer: '일정에 따라 가능하며, 24시간 이내 납품이나 주말·공휴일 작업에는 기본금액의 30%가 추가될 수 있습니다.'
    },
    {
      question: '작업기간은 얼마나 걸리나요?',
      answer: '자료와 작업 범위를 확인한 뒤 예상 일정을 안내합니다. 긴급 일정은 품질과 작업 가능 여부를 검토한 후 협의합니다.'
    },
    {
      question: '비대면으로 진행할 수 있나요?',
      answer: '네. 문의, 자료 확인, 견적, 작업과 납품을 비대면으로 진행할 수 있습니다.'
    },
    {
      question: '기밀자료는 어떻게 처리하나요?',
      answer: '필요한 경우 작업 전 보안자료 취급방식을 협의합니다. 민감하거나 기밀인 자료는 1차 문의폼에 입력하지 마세요.'
    },
    {
      question: '법률·의료·특허·전문기술 번역도 가능한가요?',
      answer: '전문분야 문서는 사전 협의가 필요하며, 내용에 따라 해당 분야 전문검수 또는 별도 전문가 확인이 필요할 수 있습니다.'
    },
    {
      question: 'AI 번역문 검수만 의뢰할 수 있나요?',
      answer: '가능합니다. 원문, AI 번역문, 사용 목적과 원하는 표현 수준을 확인한 뒤 검수 범위를 정합니다.'
    },
    {
      question: '중국 업체 조사로 거래 안전을 보장받을 수 있나요?',
      answer: '아닙니다. 업체·시장 조사는 공개정보 기반의 기초조사이며 기업 신용, 거래 안전, 제품 품질을 보증하지 않습니다.'
    },
    {
      question: '수정은 몇 회 포함되나요?',
      answer: '최초 합의한 작업범위 내 기본 수정 1회가 포함됩니다. 방향 변경이나 추가 작업은 별도 견적입니다.'
    },
    {
      question: '부가세가 포함된 가격인가요?',
      answer: '홈페이지에 표시된 금액은 부가세 별도 기준입니다.'
    },
    {
      question: '거래 성사나 매출을 보장하나요?',
      answer: '거래 성사, 매출, 검색 노출 또는 바이어 확보를 보장하지 않습니다. 합의된 범위의 문서와 실무 지원을 제공합니다.'
    },
    {
      question: '기업 AI 교육도 계속 진행하나요?',
      answer: '네. 기존 기업·공공기관 AI 교육은 서비스의 한 분야로 계속 운영합니다.'
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
            의뢰 범위, 진행 방식, 비용과 보안에 관한 주요 질문을 정리했습니다.
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
            구체적인 작업 범위와 납기는 <strong>작업 문의</strong> 폼을 통해 알려주시면 확인 후 안내합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
