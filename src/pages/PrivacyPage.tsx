import React from 'react';

export default function PrivacyPage() {
  return (
    <main className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-6 text-left">
        <h1 className="font-display text-3xl font-extrabold text-brand-navy">개인정보처리방침</h1>
        <div className="mt-8 space-y-5 text-sm leading-7 text-slate-600">
          <p>AIVEXA는 문의 답변과 견적 안내를 위해 회사명 또는 의뢰자명, 담당자명, 이메일, 연락처와 문의 내용을 수집합니다.</p>
          <p>수집한 정보는 문의 확인과 회신 목적 외로 사용하지 않으며, 목적 달성 후 1년 이내에 파기합니다.</p>
          <p>민감하거나 기밀인 자료는 1차 문의 단계에서 보내지 마세요. 필요한 경우 별도 전달 및 보안 방식을 협의합니다.</p>
          <p>개인정보 관련 문의: cuitrade76@gmail.com</p>
        </div>
      </div>
    </main>
  );
}
