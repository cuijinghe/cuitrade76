import { SiteConfig } from '../types';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  hero: {
    slogan: 'AI BUSINESS & GLOBAL SUPPORT',
    title: '20년 무역·해외영업 경험으로\n기업 문서·번역·중국 조사를 지원합니다',
    subtitle: '한중·중한 번역, 중국 업체·시장 기초조사, 해외영업 자료, 기업 AI 활용까지 비대면으로 지원합니다. 업무 범위를 먼저 확인한 뒤 일정과 비용을 안내하며, 소량·단기 프로젝트도 가능합니다.',
    imageUrl: '/hero.jpg',
    imageTagline: 'AIVEXA BUSINESS SUPPORT',
    imageSubTagline: '문서·번역·조사·해외업무·AI 활용 지원'
  },
  services: {
    title: '기업 실무를 위한 핵심 서비스',
    items: [
      {
        id: 'service-1',
        title: '기업문서 작성·교정',
        description: '비즈니스 이메일, 위챗 문장, 회사소개, 제품소개, 제안문과 일반 기업문서를 작성하거나 자연스럽게 교정합니다.',
        imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600'
      },
      {
        id: 'service-2',
        title: '한중·중한 번역 및 검수',
        description: '기업문서, 제품자료, 이메일, 마케팅 문안의 한중·중한 번역과 AI 번역 결과의 표현 검수를 지원합니다. 전문문서는 사전 검토 후 안내합니다.',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600'
      },
      {
        id: 'service-3',
        title: '중국 업체·시장 기초조사',
        description: '공개적으로 확인 가능한 자료를 바탕으로 중국 업체, 제품, 경쟁사 및 시장 정보를 표와 문서로 정리합니다. 신용도·거래 안전·제품 품질·계약 성사를 보증하지 않습니다.',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600'
      },
      {
        id: 'service-4',
        title: '해외영업 문서 지원',
        description: '해외 거래에 필요한 제안 이메일, 견적 후속 문서, 회사·제품소개 문안, 미팅 준비자료를 지원합니다. 거래 성사·매출·수출성과를 보장하지 않습니다.',
        imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600'
      },
      {
        id: 'service-5',
        title: '기업 AI 활용·교육',
        description: '기업과 기관의 환경에 맞춰 생성형 AI 실무교육, 문서·콘텐츠 활용과 업무효율화 기초 지원을 제공합니다.',
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  partnership: {
    title: '이런 기업과 실무자를 지원합니다',
    description: '명확한 범위와 납기를 기준으로 비대면으로 진행합니다. 작업 전 일정과 비용을 확인하고, 소량·단기 업무부터 협의할 수 있습니다.',
    targets: [
      '중국 관련 문서와 자료가 필요한 기업',
      '단기 번역·검수 인력이 필요한 회사',
      '해외시장 자료 정리가 필요한 기업',
      '중국 거래 문장 지원이 필요한 사업자',
      'AI 업무활용 지원이 필요한 기관·기업',
      '소량·긴급 프로젝트 외주 담당자'
    ]
  },
  director: {
    title: 'Project Director',
    role: 'Project Director',
    name: 'AIVEXA Director',
    experience: 'AIVEXA는 AI 활용과 글로벌 비즈니스 실무를 결합하여 기업과 기관의 문서, 번역, 조사 및 해외업무를 지원합니다. 20년 이상의 글로벌 무역·해외영업과 한중일 비즈니스 커뮤니케이션 경험을 바탕으로 책임 범위 안에서 실무 업무를 지원하는 외주 파트너입니다.',
    expertise: 'AI Business & Global Support',
    focusArea: '문서·번역·조사·해외업무 실무 지원',
    imageUrl: '/director.jpg'
  },
  footer: {
    description: 'AI Business & Global Support\n기업 문서·번역·시장조사·해외업무 지원',
    email: 'cuitrade76@gmail.com',
    phone: '070-7954-1588'
  }
};
