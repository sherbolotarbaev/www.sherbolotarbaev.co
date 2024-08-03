'use client';

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
      <Providers>{children}</Providers>
      <Toaster />
    </>
  );
}
