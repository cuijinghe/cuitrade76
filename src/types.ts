export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Inquiry {
  id: string;
  companyName: string;
  department: string;
  contactName: string;
  email: string;
  phone: string;
  title: string;
  projectBudget: string;
  targetAudience: string;
  deadline?: string;
  referenceLink?: string;
  description: string;
  submittedAt: string;
  status: 'pending' | 'reviewing' | 'completed';
}

export interface SiteConfig {
  hero: {
    slogan: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    imageTagline: string;
    imageSubTagline: string;
  };
  services: {
    title: string;
    items: ServiceItem[];
  };
  partnership: {
    title: string;
    description: string;
    targets: string[];
  };
  director: {
    title: string;
    role: string;
    name: string;
    experience: string;
    expertise: string;
    focusArea: string;
    imageUrl: string;
  };
  footer: {
    description: string;
    email: string;
    phone: string;
  };
}
