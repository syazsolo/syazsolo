import { useEffect, useState } from 'react';
import React from 'react';

export type Step = 'select' | 'form' | 'preview';

export interface CoverLetterState {
  step: Step;
  selectedTemplateId: string | null;
  formValues: Record<string, string>;
  // We don't persist finalContent/regards as they can be re-derived from template + formValues
  // But for "improving the preview (the code)" mentioned by user, maybe they edit the text directly?
  // The current implementation doesn't seem to support direct text editing in preview,
  // but the user said "I improve the preview (the code)".
  // If they mean they edit the code *of the app*, then state loss is expected on HMR.
  // If they mean they edit the text in the preview (if that feature existed), we'd need to save it.
  // Looking at the code, `CoverLetterPreview` has `onEdit` which goes back to form.
  // It doesn't seem to have a text editor.
  // The user likely means they change the *form inputs* and then the state is lost on refresh.
  // So persisting formValues and selectedTemplateId should be enough.
}

const STORAGE_KEY = 'cover-letter-state';

export function useCoverLetterState() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [step, setStep] = useState<Step>('select');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  // Load from storage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Use startTransition to avoid synchronous setState in effect
        React.startTransition(() => {
          setStep(parsed.step || 'select');
          setSelectedTemplateId(parsed.selectedTemplateId || null);
          setFormValues(parsed.formValues || {});
        });
      } catch (e) {
        console.error('Failed to parse cover letter state', e);
      }
    }
    React.startTransition(() => {
      setIsInitialized(true);
    });
  }, []);

  // Save to storage on change
  useEffect(() => {
    if (!isInitialized) {
      return;
    }
    const state: CoverLetterState = {
      step,
      selectedTemplateId,
      formValues,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [step, selectedTemplateId, formValues, isInitialized]);

  const clearState = () => {
    setStep('select');
    setSelectedTemplateId(null);
    setFormValues({});
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return {
    step,
    setStep,
    selectedTemplateId,
    setSelectedTemplateId,
    formValues,
    setFormValues,
    clearState,
    isInitialized,
  };
}
