import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, LogOut } from "lucide-react";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3]/30 via-background to-[#B8D8E8]/20">
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary" fill="currentColor" />
            <h1 className="text-xl font-semibold text-primary">HeartLog</h1>
          </div>
          <Button
            variant="ghost"
            onClick={logout}
            className="flex items-center gap-2"
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto p-8 md:p-12">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Heart className="w-8 h-8 text-primary" fill="currentColor" />
            </div>
            <h2 className="text-3xl font-semibold text-foreground">
              Welcome to Your Oasis, {user?.username}!
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              You've successfully logged in to HeartLog. Your emotional wellness journey begins here.
            </p>
            <div className="pt-4">
              <p className="text-sm text-muted-foreground">
                Emotion tracking features coming soon...
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
