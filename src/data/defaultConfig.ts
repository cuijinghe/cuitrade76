import { SiteConfig } from '../types';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  hero: {
    slogan: 'AI FOR PEOPLE & COMMUNITIES',
    title: 'AI가 아니라 사람을 먼저 생각합니다.\n공공기관·기업과 함께\nAI 교육·업무혁신·사회혁신 프로젝트를\n기획하고 운영합니다.',
    subtitle: '20년 이상의 글로벌 비즈니스 경험과 중국어 전문성을 바탕으로 공공기관, 기업, 소상공인, 외국인을 위한 AI 교육, 업무혁신, 사회혁신 및 글로벌 협력 프로젝트를 기획하고 운영합니다. AIVEXA는 AI 기술보다 사람과 현장의 문제 해결을 우선하는 프로젝트 파트너입니다.',
    imageUrl: '/hero.jpg',
    imageTagline: 'AIVEXA PROJECT PARTNER',
    imageSubTagline: '사람과 현장을 위한 AI 프로젝트 기획'
  },
  services: {
    title: '함께 만드는 사회 혁신',
    items: [
      {
        id: 'service-1',
        title: '공공기관 협력',
        description: '공공기관과 협력하여\n소상공인과 외국인을 위한\n실전형 프로젝트를 기획하고 운영합니다.',
        imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600'
      },
      {
        id: 'service-2',
        title: '기업 CSR / ESG',
        description: '기업의 사회공헌 활동과\n지역사회 지원사업을\n기획부터 운영까지 함께합니다.',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600'
      },
      {
        id: 'service-3',
        title: '소상공인 지원',
        description: '생성형 AI를 활용하여\n해외진출, 수출, 마케팅,\n업무효율화를 지원하는\n실행 중심 프로젝트를 운영합니다.',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600'
      },
      {
        id: 'service-4',
        title: '외국인 지원',
        description: '외국인의 한국생활 적응,\n디지털 활용,\n언어 교육,\n생활정보 제공을 위한\n지역사회 프로젝트를 운영합니다.',
        imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  partnership: {
    title: '우리가 함께 만드는 프로젝트',
    description: '강의를 판매하는 회사가 아니라\n\n공공기관,\n기업,\n지역사회와 함께\n\n실행 가능한 프로젝트를\n기획하고 운영하는 파트너입니다.',
    targets: [
      '공공기관',
      '지방자치단체',
      '기업 CSR팀',
      '사회공헌재단',
      '소상공인지원기관',
      '여성기업지원기관',
      '가족센터',
      '다문화가족지원센터',
      '대학교',
      '평생교육기관'
    ]
  },
  director: {
    title: 'Project Director',
    role: 'Project Director',
    name: 'AIVEXA Director',
    experience: '20년 이상의 글로벌 무역과 해외영업 경험을 바탕으로\n\n공공기관과 기업이\n\n소상공인,\n외국인,\n지역사회를 대상으로 추진하는\n\n프로젝트를 기획하고 운영합니다.\n\nAI는 목적이 아니라\n\n사람을 위한 도구라는 철학으로\n\n실질적인 성과가 나오는 프로젝트를 설계합니다.',
    expertise: 'Global Business Practitioner',
    focusArea: '지속 가능한 소셜 혁신 파트너십',
    imageUrl: '/director.jpg'
  },
  footer: {
    description: 'Project Planning\nGlobal Business\nPublic Partnership',
    email: 'cuitrade76@gmail.com',
    phone: '070-7954-1588'
  }
};
