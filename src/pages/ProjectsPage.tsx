import React from 'react';
import Services from '../components/Services';
import { SiteConfig } from '../types';

interface ProjectsPageProps {
  config: SiteConfig;
  isAdminMode: boolean;
  onOpenImageSelector: (targetId: string, currentUrl: string, targetTitle: string) => void;
  onNavigate: (sectionId: string) => void;
}

export default function ProjectsPage({
  config,
  isAdminMode,
  onOpenImageSelector,
  onNavigate,
}: ProjectsPageProps) {
  return (
    <Services
      title={config.services.title}
      items={config.services.items}
      isAdminMode={isAdminMode}
      onEditItem={(itemId, currentUrl, title) => onOpenImageSelector(itemId, currentUrl, title)}
      onNavigate={onNavigate}
    />
  );
}
