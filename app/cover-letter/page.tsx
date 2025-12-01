'use client';

import React, { useState } from 'react';

import CoverLetterForm from '@/components/cover-letter/CoverLetterForm';
import CoverLetterPreview from '@/components/cover-letter/CoverLetterPreview';
import { FormData } from '@/types/cover-letter';

export default function CoverLetterPage() {
  const [viewMode, setViewMode] = useState<'form' | 'preview'>('form');
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    roleTitle: '',
    hiringManagerName: '',
    companyAddress: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setViewMode('preview');
  };

  const handleEdit = () => {
    setViewMode('form');
  };

  return (
    <div className="light min-h-screen bg-gray-50 py-8 text-slate-900 print:bg-white print:p-0">
      {viewMode === 'form' ? (
        <div className="container mx-auto max-w-2xl px-4">
          <CoverLetterForm
            initialData={formData}
            onSubmit={handleFormSubmit}
          />
        </div>
      ) : (
        <CoverLetterPreview data={formData} onEdit={handleEdit} />
      )}
    </div>
  );
}
