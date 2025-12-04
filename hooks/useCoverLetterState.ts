import { useEffect, useState } from 'react';
import React from 'react';

export type View = 'list' | 'preview';

export interface CoverLetterState {
  view: View;
  selectedId: string | null;
}

const STORAGE_KEY = 'cover-letter-state-v2';

export function useCoverLetterState() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [view, setView] = useState<View>('list');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Load from storage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        React.startTransition(() => {
          setView(parsed.view || 'list');
          setSelectedId(parsed.selectedId || null);
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
      view,
      selectedId,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [view, selectedId, isInitialized]);

  const clearState = () => {
    setView('list');
    setSelectedId(null);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return {
    view,
    setView,
    selectedId,
    setSelectedId,
    clearState,
    isInitialized,
  };
}
