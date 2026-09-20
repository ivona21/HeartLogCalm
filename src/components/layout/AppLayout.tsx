import { Header } from '@/components/layout/Header.tsx';

type AppLayoutProps = {
  children: React.ReactNode;
};
export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 pt-[72px] pb-8 md:pb-12">{children}</main>
    </div>
  );
}
