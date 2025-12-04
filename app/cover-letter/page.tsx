'use client';

import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

import CoverLetterPreview from '@/components/cover-letter/CoverLetterPreview';
import coverLettersData from '@/data/cover-letters.json';
import { useCoverLetterState } from '@/hooks/useCoverLetterState';
import { CoverLetterEntry } from '@/types/cover-letter';
import { Search } from 'lucide-react';

// Force cast the JSON data
const coverLetters = coverLettersData as unknown as CoverLetterEntry[];

export default function CoverLetterPage() {
  const { view, setView, selectedId, setSelectedId, isInitialized } =
    useCoverLetterState();

  const [searchQuery, setSearchQuery] = useState('');

  // Sort by date descending
  const sortedLetters = React.useMemo(() => {
    return [...coverLetters].reverse().sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, []);

  // Filter by search query
  const filteredLetters = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return sortedLetters;
    }
    const query = searchQuery.toLowerCase();
    return sortedLetters.filter(
      letter =>
        letter.company.toLowerCase().includes(query) ||
        letter.role.toLowerCase().includes(query)
    );
  }, [searchQuery, sortedLetters]);

  const handleSelectLetter = (id: string) => {
    setSelectedId(id);
    setView('preview');
  };

  const handleBack = () => {
    setView('list');
    setSelectedId(null);
  };

  if (!isInitialized) {
    return null;
  }

  if (view === 'preview' && selectedId) {
    const selectedLetter = coverLetters.find(l => l.id === selectedId);
    if (selectedLetter) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-white dark:text-slate-900">
          <CoverLetterPreview
            content={selectedLetter.content}
            regards={selectedLetter.regards}
            onBack={handleBack}
          />
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-white dark:text-slate-900">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold text-slate-900">
            Cover Letter History
          </h1>
          <div className="relative w-full md:w-72">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search company or role..."
              className="bg-white pl-10"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          {filteredLetters.length === 0 ? (
            <p className="py-12 text-center text-slate-500">
              No cover letters found.
            </p>
          ) : (
            filteredLetters.map(letter => (
              <div
                key={letter.id}
                className="group flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 bg-white p-4 transition-all hover:border-slate-400 hover:shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
                onClick={() => handleSelectLetter(letter.id)}
              >
                <div className="min-w-0 flex-1 pr-4">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="truncate text-base font-semibold text-slate-900 dark:text-slate-50">
                      {letter.company}
                    </h3>
                    <span className="hidden text-slate-300 sm:inline dark:text-slate-700">
                      |
                    </span>
                    <p className="truncate text-sm font-medium text-slate-600 dark:text-slate-400">
                      {letter.role}
                    </p>
                  </div>
                  <p className="truncate text-xs text-slate-400 dark:text-slate-500">
                    {typeof letter.content[0] === 'string'
                      ? letter.content[0]
                      : 'Content available'}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                    {letter.date}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
