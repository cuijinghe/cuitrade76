import React from 'react';
import Pricing from '../components/Pricing';

export default function PricingPage({ onNavigate }: { onNavigate: (sectionId: string) => void }) {
  return <main><Pricing onNavigate={onNavigate} detailed /></main>;
}
