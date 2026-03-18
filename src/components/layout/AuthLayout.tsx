interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#F5E6D3]/30 via-background to-[#B8D8E8]/20">
      <div className="w-full max-w-md">
        <div className="bg-muted rounded-2xl shadow-lg p-8 md:p-10">{children}</div>
      </div>
    </div>
  );
}
