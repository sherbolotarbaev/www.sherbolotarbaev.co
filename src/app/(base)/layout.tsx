import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default async function BaseLayout({ children }: Readonly<BaseLayoutProps>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
