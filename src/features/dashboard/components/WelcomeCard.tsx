import { useAuth } from '@/features/auth';

export default function WelcomeCard() {
  const { user } = useAuth();

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg">
      <div className="relative aspect-video md:aspect-[21/9]">
        <img
          src="/adam-vradenburg-GA09PKfRIQY-unsplash.jpg"
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
  );
}
