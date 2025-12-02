'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContentItem, extractFields, replaceFields } from '@/lib/cover-letter-utils';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import CoverLetterForm from '@/components/cover-letter/CoverLetterForm';
import CoverLetterPreview from '@/components/cover-letter/CoverLetterPreview';
import { saveCoverLetterHistory } from '@/app/actions/cover-letter';
import templatesData from '@/data/cover-letter-templates.json';
import { v4 as uuidv4 } from 'uuid';

// Force cast the JSON data to the correct type since JSON imports are loosely typed or inferred as simple types
const templates = templatesData as unknown as Template[];

type Step = 'select' | 'form' | 'preview';

interface Template {
  id: string;
  name: string;
  content: ContentItem[];
  regards?: ContentItem[];
}

export default function CoverLetterPage() {
  const [step, setStep] = useState<Step>('select');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [fields, setFields] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [finalContent, setFinalContent] = useState<ContentItem[]>([]);
  const [finalRegards, setFinalRegards] = useState<ContentItem[]>([]);

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    const extractedFields = extractFields(template.content);
    setFields(extractedFields);

    if (extractedFields.length > 0) {
      setStep('form');
    } else {
      // No fields, skip to preview
      setFinalContent(template.content);
      setFinalRegards(template.regards || []);
      setStep('preview');
    }
  };

  const handleFormSubmit = (data: Record<string, string>) => {
    setFormValues(data);
    if (selectedTemplate) {
      // Use provided data or fallback to [Field Name]
      const dataWithDefaults = { ...data };
      fields.forEach((field) => {
        if (!dataWithDefaults[field] || dataWithDefaults[field].trim() === '') {
          dataWithDefaults[field] = `[${field}]`;
        }
      });

      const content = replaceFields(selectedTemplate.content, dataWithDefaults);
      const regards = selectedTemplate.regards 
        ? replaceFields(selectedTemplate.regards, dataWithDefaults)
        : [];

      setFinalContent(content);
      setFinalRegards(regards);
      setStep('preview');
    }
  };

  const handleSaveHistory = async () => {
    if (!selectedTemplate) return;

    await saveCoverLetterHistory({
      id: uuidv4(),
      date: new Date().toISOString(),
      templateId: selectedTemplate.id,
      fields: formValues,
    });
  };

  const handleEdit = () => {
    if (fields.length > 0) {
      setStep('form');
    } else {
      setStep('select');
    }
  };

  if (step === 'select') {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto max-w-4xl py-12">
          <h1 className="mb-8 text-3xl font-bold text-slate-900">
            Select a Template
          </h1>
          <div className="grid gap-6 md:grid-cols-2">
            {templates.map((template) => (
              <Card
                key={template.id}
                className="cursor-pointer bg-white transition-all hover:border-slate-400 hover:shadow-md"
                onClick={() => handleSelectTemplate(template)}
              >
                <CardHeader>
                  <CardTitle className="text-slate-900">{template.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm text-slate-500">
                    {JSON.stringify(template.content)}
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
      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto max-w-4xl py-12">
          <Button
            variant="ghost"
            onClick={() => setStep('select')}
            className="mb-6"
          >
            ← Back to Templates
          </Button>
          <CoverLetterForm fields={fields} onSubmit={handleFormSubmit} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <CoverLetterPreview
        content={finalContent}
        regards={finalRegards}
        onEdit={handleEdit}
        onSave={handleSaveHistory}
      />
    </div>
  );
}
