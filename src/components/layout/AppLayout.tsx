import { Header } from '@/components/layout/Header.tsx';

type AppLayoutProps = {
  children: React.ReactNode;
};
export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-sand/30 via-background to-gradient-sky/20">
      <Header />
      <main className="pt-[56px] container mx-auto px-4 py-8 md:py-12">{children}</main>
    </div>
  );
}
