'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h2 className="text-foreground mb-2 text-xl font-semibold">
        Something went wrong
      </h2>
      <p className="text-muted-foreground mb-6 max-w-md text-sm">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="bg-foreground text-background rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}
