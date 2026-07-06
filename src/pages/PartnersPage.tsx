import React from 'react';
import Partnership from '../components/Partnership';
import { SiteConfig } from '../types';

interface PartnersPageProps {
  config: SiteConfig;
}

export default function PartnersPage({ config }: PartnersPageProps) {
  return (
    <Partnership
      title={config.partnership.title}
      description={config.partnership.description}
      targets={config.partnership.targets}
    />
  );
}
