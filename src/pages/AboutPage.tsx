import React from 'react';
import Director from '../components/Director';
import { SiteConfig } from '../types';

interface AboutPageProps {
  config: SiteConfig;
  isAdminMode: boolean;
  onOpenImageSelector: (targetId: string, currentUrl: string, targetTitle: string) => void;
}

export default function AboutPage({
  config,
  isAdminMode,
  onOpenImageSelector,
}: AboutPageProps) {
  return (
    <Director
      config={config.director}
      isAdminMode={isAdminMode}
      onEditImage={(currentUrl) => onOpenImageSelector('director', currentUrl || config.director.imageUrl, '디렉터 프로필 이미지')}
    />
  );
}
