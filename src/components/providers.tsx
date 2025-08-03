'use client';

import { useEffect } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize any global state or data fetching here
  }, []);

  return <>{children}</>;
}