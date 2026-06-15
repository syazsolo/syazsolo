'use client';

import dynamic from 'next/dynamic';
import { Lock, ShieldCheck } from 'lucide-react';
import { useState, useSyncExternalStore } from 'react';

import PasswordDialog from '@/components/PasswordDialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const CoverLetterDocument = dynamic(() => import('./CoverLetterDocument'), {
  loading: () => <CoverLetterLoading />,
  ssr: false,
});

const OWNER_STORAGE_KEY = 'kessel_run_12_parsecs';

function subscribeToHydration() {
  return () => {};
}

function getHydrationSnapshot() {
  return true;
}

function getHydrationServerSnapshot() {
  return false;
}

function subscribeToOwnerStorage(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === OWNER_STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener('storage', handleStorage);
  return () => window.removeEventListener('storage', handleStorage);
}

function getOwnerStorageSnapshot() {
  return localStorage.getItem(OWNER_STORAGE_KEY) === 'true';
}

function getOwnerServerSnapshot() {
  return false;
}

export default function CoverLetterPage() {
  const [open, setOpen] = useState(false);
  const { isOwner } = useAuth();
  const hasHydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydrationSnapshot,
    getHydrationServerSnapshot
  );
  const storedOwner = useSyncExternalStore(
    subscribeToOwnerStorage,
    getOwnerStorageSnapshot,
    getOwnerServerSnapshot
  );
  const hasAccess = isOwner || storedOwner;

  if (!hasHydrated && !isOwner) {
    return <CoverLetterLoading />;
  }

  if (hasAccess) {
    return <CoverLetterDocument />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 px-4 py-12">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm">
          <Lock className="h-5 w-5" />
        </div>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">
          Cover Letter Locked
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          This document is private. Unlock with the It&apos;s Me password to
          view and print it.
        </p>
        <Button className="mt-6 gap-2" onClick={() => setOpen(true)}>
          <ShieldCheck className="h-4 w-4" />
          It&apos;s Me
        </Button>
      </div>

      <PasswordDialog
        open={open}
        onOpenChange={setOpen}
        errorMessage="No, you're not me."
      />
    </div>
  );
}

function CoverLetterLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 px-4 py-12">
      <div className="h-12 w-12 animate-pulse rounded-full bg-slate-200" />
    </div>
  );
}
