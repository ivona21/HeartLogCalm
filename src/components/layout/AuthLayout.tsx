import { HeartIcon } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#F5E6D3]/30 via-background to-[#B8D8E8]/20">
      <div className="w-full max-w-md">
        <div className="bg-[#FDFBF7] rounded-2xl shadow-lg p-8 md:p-10">
          <div className="flex flex-col items-center mb-8">
            <div className="mb-3">
              <HeartIcon className="w-8 h-8 text-primary" fill="currentColor" />
            </div>
            <h1 className="text-2xl font-semibold text-primary">HeartLog</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
