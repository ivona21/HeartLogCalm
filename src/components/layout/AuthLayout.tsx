interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-muted rounded-2xl shadow-lg p-8 md:p-10">{children}</div>
      </div>
    </div>
  );
}
