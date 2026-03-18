import { Button } from '@/components/ui/Button.tsx';
import { Input } from '@/components/ui/Input.tsx';

export default function DesignSystemPage() {
  const buttonVariants = ['default', 'destructive', 'outline', 'secondary', 'ghost'] as const;
  const buttonSizes = ['sm', 'default', 'lg'] as const;

  const colors = [
    { name: 'primary', class: 'bg-primary' },
    { name: 'primary-foreground', class: 'bg-primary-foreground' },
    { name: 'secondary', class: 'bg-secondary' },
    { name: 'secondary-foreground', class: 'bg-secondary-foreground' },
    { name: 'muted', class: 'bg-muted' },
    { name: 'muted-foreground', class: 'bg-muted-foreground' },
    { name: 'accent', class: 'bg-accent' },
    { name: 'accent-foreground', class: 'bg-accent-foreground' },
    { name: 'destructive', class: 'bg-destructive' },
    { name: 'destructive-foreground', class: 'bg-destructive-foreground' },
    { name: 'card', class: 'bg-card' },
    { name: 'card-foreground', class: 'bg-card-foreground' },
    { name: 'background', class: 'bg-background' },
    { name: 'foreground', class: 'bg-foreground' },
    { name: 'border', class: 'bg-border' },
    { name: 'ring', class: 'bg-ring' },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-12">Design System</h1>

        {/* Colors Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Colors</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {colors.map((color) => (
              <div key={color.name} className="flex flex-col gap-2">
                <div className={`w-full h-24 rounded-lg border border-border ${color.class}`} />
                <p className="text-xs text-muted-foreground text-center truncate">{color.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Buttons Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Buttons</h2>
          <div className="space-y-8">
            {buttonVariants.map((variant) => (
              <div key={variant}>
                <h3 className="text-lg font-medium text-foreground mb-4 capitalize">{variant}</h3>
                <div className="space-y-4">
                  {buttonSizes.map((size) => (
                    <div key={size} className="flex items-center gap-4">
                      <span className="w-20 text-sm text-muted-foreground capitalize">{size}</span>
                      <div className="flex gap-2">
                        <Button variant={variant as any} size={size as any}>
                          Button
                        </Button>
                        <Button variant={variant as any} size={size as any} disabled>
                          Disabled
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Inputs Section */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-6">Inputs</h2>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Default</label>
              <Input placeholder="Placeholder text" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Disabled</label>
              <Input placeholder="Placeholder text" disabled />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">With Value</label>
              <Input defaultValue="Some value" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Error State</label>
              <Input placeholder="Placeholder text" className="border-destructive focus-visible:ring-destructive" />
              <p className="text-xs text-destructive mt-1">This field is required</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
