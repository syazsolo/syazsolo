'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ContentItem,
  extractFields,
  replaceFields,
} from '@/lib/cover-letter-utils';
import React from 'react';

import { Button } from '@/components/ui/button';
import CoverLetterForm from '@/components/cover-letter/CoverLetterForm';
import CoverLetterPreview from '@/components/cover-letter/CoverLetterPreview';
import templatesData from '@/data/cover-letter-templates.json';
import { useCoverLetterState } from '@/hooks/useCoverLetterState';

// Force cast the JSON data to the correct type since JSON imports are loosely typed or inferred as simple types
const templates = templatesData as unknown as Template[];

interface Template {
  id: string;
  name: string;
  summary?: string;
  content: ContentItem[];
  regards?: ContentItem[];
}

export default function CoverLetterPage() {
  const {
    step,
    setStep,
    selectedTemplateId,
    setSelectedTemplateId,
    formValues,
    setFormValues,
    isInitialized,
  } = useCoverLetterState();

  // Derive selected template from ID
  const selectedTemplate =
    templates.find(t => t.id === selectedTemplateId) || null;

  // Derive fields from selected template
  const fields = React.useMemo(() => {
    return selectedTemplate
      ? extractFields(selectedTemplate.content)
      : [];
  }, [selectedTemplate]);

  // Derive final content when in preview mode
  const { finalContent, finalRegards } = React.useMemo(() => {
    if (step === 'preview' && selectedTemplate) {
      const dataWithDefaults = { ...formValues };
      fields.forEach(field => {
        if (!dataWithDefaults[field] || dataWithDefaults[field].trim() === '') {
          dataWithDefaults[field] = `[${field}]`;
        }
      });

      const content = replaceFields(selectedTemplate.content, dataWithDefaults);
      const regards = selectedTemplate.regards
        ? replaceFields(selectedTemplate.regards, dataWithDefaults)
        : [];

      return { finalContent: content, finalRegards: regards };
    }
    return { finalContent: [], finalRegards: [] };
  }, [step, selectedTemplate, formValues, fields]);

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplateId(template.id);
    const extractedFields = extractFields(template.content);

    if (extractedFields.length > 0) {
      setStep('form');
    } else {
      // No fields, skip to preview
      setStep('preview');
    }
  };

  const handleFormSubmit = (data: Record<string, string>) => {
    setFormValues(data);
    setStep('preview');
  };



  const handleEdit = () => {
    if (fields.length > 0) {
      setStep('form');
    } else {
      setStep('select');
    }
  };

  const handleBackToTemplates = () => {
    setStep('select');
    // Optional: Clear form values if going back to templates?
    // User asked for persistence, so maybe keep them is better.
    // But if they switch templates, fields might mismatch.
    // For now, we keep them.
  };

  if (!isInitialized) {
    return null; // or a loading spinner
  }

  if (step === 'select') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-white dark:text-slate-900">
        <div className="container mx-auto max-w-4xl py-12">
          <h1 className="mb-8 text-3xl font-bold text-slate-900">
            Select a Template
          </h1>
          <div className="grid gap-6 md:grid-cols-2">
            {templates.map(template => (
              <Card
                key={template.id}
                className="cursor-pointer bg-white transition-all hover:border-slate-400 hover:shadow-md"
                onClick={() => handleSelectTemplate(template)}
              >
                <CardHeader>
                  <CardTitle className="text-slate-900">
                    {template.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500">
                    {template.summary || 'No summary available.'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'form') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-white dark:text-slate-900">
        <div className="container mx-auto max-w-4xl py-12">
          <Button
            variant="ghost"
            onClick={handleBackToTemplates}
            className="mb-6"
          >
            ← Back to Templates
          </Button>
          <CoverLetterForm
            fields={fields}
            initialValues={formValues}
            onSubmit={handleFormSubmit}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-white dark:text-slate-900">
      <CoverLetterPreview
        content={finalContent}
        regards={finalRegards}
        onEdit={handleEdit}
      />
    </div>
  );
}
