import { Header } from 'widgets/header';
import { Footer } from 'widgets/footer';

export const dynamic = 'force-static';
export const revalidate = 600; // every 10 mins

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: Readonly<BaseLayoutProps>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
