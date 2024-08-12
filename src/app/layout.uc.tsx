'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import TopLoadingBar from 'nextjs-toploader';
import { Toaster } from 'sonner';
import Providers from './providers';

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export default function RootLayoutClient({ children }: Readonly<RootLayoutClientProps>) {
  return (
    <>
      <TopLoadingBar color="var(--blue-color)" showSpinner={false} height={3} />
      <Providers>
        <div id="modal"></div>
        {children}
      </Providers>
      <Toaster />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
