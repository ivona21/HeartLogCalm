import { HeartIcon } from 'lucide-react';

type FeatureCardProps = {
  handleClick: () => void;
  title: string;
  description: string;
};
export default function FeatureCard({ handleClick, title, description }: FeatureCardProps) {
  return (
    <div className="mt-8 md:mt-12 grid gap-4 md:grid-cols-2">
      <div
        className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover-elevate transition-all duration-200"
        onClick={handleClick}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
            <HeartIcon className="w-6 h-6 text-accent" fill="currentColor" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
