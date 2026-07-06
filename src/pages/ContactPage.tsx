import React from 'react';
import InquiryForm from '../components/InquiryForm';
import { Inquiry } from '../types';

interface ContactPageProps {
  onSubmitInquiry: (newInq: Omit<Inquiry, 'id' | 'submittedAt' | 'status'>) => void;
}

export default function ContactPage({ onSubmitInquiry }: ContactPageProps) {
  return (
    <div className="py-12 bg-white">
      <InquiryForm onSubmitInquiry={onSubmitInquiry} />
    </div>
  );
}
