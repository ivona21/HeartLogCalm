import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Heart, LogOut } from "lucide-react";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3]/30 via-background to-[#B8D8E8]/20">
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
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

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <div className="relative aspect-video md:aspect-[21/9]">
              <img
                src="https://cdn.pixabay.com/animation/2024/01/11/17/57/17-57-09-141_512.gif"
                alt="Peaceful moonlit ocean with gentle waves"
                className="w-full h-full object-cover"
                data-testid="img-welcome-nature"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center pb-8 md:pb-12">
                <div className="text-center px-4 space-y-2 md:space-y-3">
                  <h2 
                    className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white drop-shadow-lg"
                    data-testid="text-welcome-message"
                  >
                    Welcome, {user?.username}
                  </h2>
                  <p className="text-base md:text-xl text-white/90 drop-shadow-md max-w-2xl">
                    Take a deep breath. Your emotional wellness sanctuary awaits.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-12 grid gap-4 md:grid-cols-2">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover-elevate transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-primary" fill="currentColor" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Your Journey Begins</h3>
                  <p className="text-sm text-muted-foreground">
                    You've taken the first step towards mindful emotional wellness. Track your feelings, discover patterns, and grow.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover-elevate transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-accent" fill="currentColor" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Coming Soon</h3>
                  <p className="text-sm text-muted-foreground">
                    Emotion tracking, mood calendar, pattern insights, and journaling features are on the way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
