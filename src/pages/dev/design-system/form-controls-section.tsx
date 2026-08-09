import { useState } from 'react';
import { CheckIcon, LayoutGridIcon, MoonStarIcon, SunMediumIcon } from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { PasswordInput } from '@/components/ui/password-input.tsx';
import { Label } from '@/components/ui/label.tsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx';
import { Switch } from '@/components/ui/switch.tsx';
import { Slider } from '@/components/ui/slider.tsx';
import { Toggle } from '@/components/ui/toggle.tsx';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.tsx';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp.tsx';
import { Section, DemoFrame } from '@/pages/dev/design-system/shared.tsx';

export function FormControlsSection() {
  const [volume, setVolume] = useState([42]);

  return (
    <Section
      title="Form controls"
      description="Inputs, selection controls, and composite fields as they appear in a real form."
    >
      <div className="grid gap-4 xl:grid-cols-2">
        <DemoFrame title="Text inputs" subtitle="Single line, secure entry, and multiline fields.">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="design-email">Email</Label>
              <Input id="design-email" defaultValue="aria@heartlog.app" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="design-password">Password</Label>
              <PasswordInput id="design-password" defaultValue="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="design-notes">Notes</Label>
              <Textarea
                id="design-notes"
                defaultValue="A calm, low-friction interface for daily use."
              />
            </div>
          </div>
        </DemoFrame>

        <DemoFrame
          title="Choice fields"
          subtitle="The radio, checkbox, switch, select, slider, and toggle surfaces."
        >
          <div className="grid gap-5">
            <div className="space-y-2">
              <Label>Visibility</Label>
              <Select defaultValue="balanced">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Display tone</SelectLabel>
                    <SelectItem value="soft">Soft</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="bold">Bold</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Density</SelectLabel>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <Label>Notifications</Label>
                <div className="flex items-center gap-3">
                  <Checkbox checked />
                  <span className="text-sm text-foreground">Email summaries</span>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox checked="indeterminate" />
                  <span className="text-sm text-foreground">Weekly review</span>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox />
                  <span className="text-sm text-foreground">Release notes</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Cadence</Label>
                <RadioGroup defaultValue="weekly" className="gap-3">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily">Daily</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly">Weekly</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly">Monthly</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <div className="space-y-0.5">
                  <Label htmlFor="design-switch">Smart reminders</Label>
                  <p className="text-xs text-muted-foreground">
                    Adjusts to current usage patterns.
                  </p>
                </div>
                <Switch id="design-switch" defaultChecked />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Intensity</Label>
                  <span className="text-xs text-muted-foreground">{volume[0]}%</span>
                </div>
                <Slider value={volume} onValueChange={setVolume} max={100} step={1} />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Formatting</Label>
              <ToggleGroup type="multiple" defaultValue={['bold']} variant="outline">
                <ToggleGroupItem value="bold">
                  <SunMediumIcon className="h-4 w-4" />
                  Bold
                </ToggleGroupItem>
                <ToggleGroupItem value="italic">
                  <MoonStarIcon className="h-4 w-4" />
                  Italic
                </ToggleGroupItem>
                <ToggleGroupItem value="underline">
                  <LayoutGridIcon className="h-4 w-4" />
                  Grid
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-3">
              <Label>Single toggle</Label>
              <Toggle defaultPressed variant="outline" size="lg">
                <CheckIcon className="h-4 w-4" />
                On
              </Toggle>
            </div>

            <div className="space-y-3">
              <Label>Verification code</Label>
              <InputOTP maxLength={6} defaultValue="482719">
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
        </DemoFrame>
      </div>
    </Section>
  );
}
