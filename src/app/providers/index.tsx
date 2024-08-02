'use client';

import MenuProvider from './menu';
import ReduxProvider from './redux';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ReduxProvider>
      <MenuProvider>{children}</MenuProvider>
    </ReduxProvider>
  );
};
export default Providers;
