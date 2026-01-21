import { Header } from '@/components/layout/Header.tsx';

type AppLayoutProps = {
  children: React.ReactNode;
};
export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3]/30 via-background to-[#B8D8E8]/20">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">{children}</main>
    </div>
  );
}
