import { useState, type ReactNode } from 'react';
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  CheckIcon,
  CopyIcon,
  EyeIcon,
  FilterIcon,
  LayoutGridIcon,
  MailIcon,
  MenuIcon,
  MessageSquareIcon,
  MoonStarIcon,
  MoreHorizontalIcon,
  PaletteIcon,
  SettingsIcon,
  SparklesIcon,
  SunMediumIcon,
  UserIcon,
} from 'lucide-react';

import { cn } from '@/shared/utils/cn.ts';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { PasswordInput } from '@/components/ui/PasswordInput.tsx';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup.tsx';
import { Switch } from '@/components/ui/switch.tsx';
import { Slider } from '@/components/ui/slider.tsx';
import { Toggle } from '@/components/ui/toggle.tsx';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToggleGroup.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';
import { Progress } from '@/components/ui/progress.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog.tsx';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu.tsx';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.tsx';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/HoverCard.tsx';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet.tsx';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer.tsx';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/ContextMenu.tsx';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar.tsx';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command.tsx';
import { Calendar } from '@/components/ui/calendar.tsx';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/InputOTP.tsx';
import { ScrollArea } from '@/components/ui/ScrollArea.tsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion.tsx';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/NavigationMenu.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable.tsx';
import { AspectRatio } from '@/components/ui/AspectRatio.tsx';

type SectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

function Section({ title, description, children }: SectionProps) {
  return (
    <section className="space-y-4">
      <div className="max-w-3xl space-y-2">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        {description ? (
          <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function DemoFrame({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('rounded-xl border border-border bg-card/60 p-4 shadow-sm', className)}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
          {subtitle ? <p className="text-xs leading-5 text-muted-foreground">{subtitle}</p> : null}
        </div>
      </div>
      {children}
    </div>
  );
}

const buttonVariants = ['default', 'destructive', 'outline', 'secondary', 'ghost'] as const;
const buttonSizes = ['sm', 'default', 'lg'] as const;
const badgeVariants = ['default', 'secondary', 'destructive', 'outline'] as const;
type PaletteSwatch = {
  name: string;
  className: string;
  label: string;
  hex: string;
  invert?: boolean;
};
const paletteSwatches = [
  { name: 'Background', className: 'bg-background', label: 'bg-background', hex: '#faf8fc' },
  {
    name: 'Foreground',
    className: 'bg-foreground',
    label: 'bg-foreground',
    hex: '#363249',
    invert: true,
  },
  { name: 'Border', className: 'bg-border', label: 'bg-border', hex: '#ded8e9' },
  { name: 'Card', className: 'bg-card', label: 'bg-card', hex: '#fcfbfd' },
  {
    name: 'Primary',
    className: 'bg-primary',
    label: 'bg-primary',
    hex: '#9579d8',
    invert: true,
  },
  {
    name: 'Primary hover',
    className: 'bg-primary-hover',
    label: 'bg-primary-hover',
    hex: '#8665d2',
    invert: true,
  },
  { name: 'Secondary', className: 'bg-secondary', label: 'bg-secondary', hex: '#f6dff0' },
  { name: 'Accent', className: 'bg-accent', label: 'bg-accent', hex: '#d8f0f8' },
  { name: 'Muted', className: 'bg-muted', label: 'bg-muted', hex: '#f1eef7' },
  {
    name: 'Destructive',
    className: 'bg-destructive',
    label: 'bg-destructive',
    hex: '#e14747',
    invert: true,
  },
  { name: 'Popover', className: 'bg-popover', label: 'bg-popover', hex: '#fcfbfd' },
  { name: 'Sidebar', className: 'bg-sidebar', label: 'bg-sidebar', hex: '#f5f1f9' },
] satisfies readonly PaletteSwatch[];

export default function DesignSystemPage() {
  const [volume, setVolume] = useState([42]);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-muted/25">
          <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-3xl space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <PaletteIcon className="h-4 w-4" />
                  UI inventory
                </div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                  Design System
                </h1>
                <p className="text-sm leading-6 text-muted-foreground">
                  A live inventory of the core UI primitives, their variants, and the default shape
                  of the interface the app is built on.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">ui primitives</Badge>
                <Badge>components</Badge>
                <Badge variant="secondary">variants</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl space-y-12 px-6 py-8 md:px-10">
          <Section
            title="Palette"
            description="The actual theme tokens behind the interface. These swatches reflect the app's light palette and core semantic colors."
          >
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {paletteSwatches.map((swatch) => (
                <div key={swatch.name} className="space-y-2">
                  <div
                    className={cn(
                      'flex h-24 flex-col justify-end rounded-lg border border-border p-3 shadow-sm',
                      swatch.className,
                      swatch.invert ? 'text-primary-foreground' : 'text-foreground',
                    )}
                  >
                    <div
                      className={cn(
                        'text-sm font-medium',
                        swatch.invert ? 'text-white' : 'text-foreground',
                      )}
                    >
                      {swatch.name}
                    </div>
                    <div
                      className={cn(
                        'text-xs',
                        swatch.invert ? 'text-white/80' : 'text-muted-foreground',
                      )}
                    >
                      {swatch.hex}
                    </div>
                    <div
                      className={cn(
                        'text-[11px]',
                        swatch.invert ? 'text-white/60' : 'text-muted-foreground/80',
                      )}
                    >
                      {swatch.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section
            title="Buttons"
            description="The shared button primitive plus the common size and variant combinations used across the app."
          >
            <div className="grid gap-4 xl:grid-cols-2">
              <DemoFrame
                title="Variant matrix"
                subtitle="Each row uses the shared button primitive."
              >
                <div className="space-y-3">
                  {buttonVariants.map((variant) => (
                    <div
                      key={variant}
                      className="grid gap-3 border-b border-border pb-3 last:border-b-0 last:pb-0 md:grid-cols-[96px_minmax(0,1fr)] md:items-center"
                    >
                      <div className="text-sm font-medium capitalize text-muted-foreground">
                        {variant}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {buttonSizes.map((size) => (
                          <Button key={size} variant={variant} size={size}>
                            {size}
                          </Button>
                        ))}
                        <Button variant={variant} size="icon" aria-label={`${variant} icon button`}>
                          <SparklesIcon className="h-4 w-4" />
                        </Button>
                        <Button variant={variant} disabled>
                          Disabled
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </DemoFrame>

              <DemoFrame
                title="Common usage"
                subtitle="Action, icon, full-width, and loading shapes."
              >
                <div className="space-y-3">
                  <Button className="w-full">
                    <MailIcon className="h-4 w-4" />
                    Continue
                  </Button>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline">
                      <UserIcon className="h-4 w-4" />
                      Profile
                    </Button>
                    <Button variant="ghost">
                      <MoreHorizontalIcon className="h-4 w-4" />
                      More
                    </Button>
                    <Button variant="secondary">
                      <FilterIcon className="h-4 w-4" />
                      Filter
                    </Button>
                  </div>
                  <Button disabled className="w-full">
                    <ArrowRightIcon className="h-4 w-4" />
                    Saving
                  </Button>
                </div>
              </DemoFrame>
            </div>
          </Section>

          <Section
            title="Form controls"
            description="Inputs, selection controls, and composite fields as they appear in a real form."
          >
            <div className="grid gap-4 xl:grid-cols-2">
              <DemoFrame
                title="Text inputs"
                subtitle="Single line, secure entry, and multiline fields."
              >
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

          <Section
            title="Feedback and status"
            description="Badges, alerts, loading states, and progress indicators that surface meaning without crowding the UI."
          >
            <div className="grid gap-4 xl:grid-cols-2">
              <DemoFrame
                title="Badges and alerts"
                subtitle="Inline labels and prominent feedback states."
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {badgeVariants.map((variant) => (
                      <Badge key={variant} variant={variant}>
                        {variant}
                      </Badge>
                    ))}
                  </div>
                  <Alert>
                    <SparklesIcon className="h-4 w-4" />
                    <AlertTitle>Draft saved</AlertTitle>
                    <AlertDescription>
                      The form retained its current values and can be resumed later.
                    </AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <MessageSquareIcon className="h-4 w-4" />
                    <AlertTitle>Connection lost</AlertTitle>
                    <AlertDescription>
                      The last change could not be sent. Retry when the connection recovers.
                    </AlertDescription>
                  </Alert>
                </div>
              </DemoFrame>

              <DemoFrame
                title="Loading and progress"
                subtitle="Used for background operations and partial completion."
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">Sync</span>
                      <span className="text-muted-foreground">64%</span>
                    </div>
                    <Progress value={64} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">Import</span>
                      <span className="text-muted-foreground">92%</span>
                    </div>
                    <Progress value={92} />
                  </div>
                  <div className="space-y-3 rounded-lg border border-border p-4">
                    <div className="grid gap-3 md:grid-cols-3">
                      <Skeleton className="h-20 rounded-lg" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                      <Skeleton className="h-10 w-24 rounded-md" />
                    </div>
                  </div>
                </div>
              </DemoFrame>
            </div>
          </Section>

          <Section
            title="Navigation"
            description="Breadcrumbs, tabs, menus, and pagination controls arranged the way they appear in the app."
          >
            <div className="grid gap-4 xl:grid-cols-2">
              <DemoFrame title="Breadcrumbs and tabs" subtitle="Context and local view switching.">
                <div className="space-y-5">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">Entries</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbEllipsis />
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Design system</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>

                  <NavigationMenu className="max-w-none justify-start">
                    <NavigationMenuList className="justify-start">
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid gap-2 p-3 md:w-[320px]">
                            <NavigationMenuLink
                              href="#"
                              className="rounded-md border border-border p-3"
                            >
                              Overview
                            </NavigationMenuLink>
                            <NavigationMenuLink
                              href="#"
                              className="rounded-md border border-border p-3"
                            >
                              Updates
                            </NavigationMenuLink>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid gap-2 p-3 md:w-[280px]">
                            <NavigationMenuLink
                              href="#"
                              className="rounded-md border border-border p-3"
                            >
                              Docs
                            </NavigationMenuLink>
                            <NavigationMenuLink
                              href="#"
                              className="rounded-md border border-border p-3"
                            >
                              Support
                            </NavigationMenuLink>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>

                  <Tabs defaultValue="overview">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="activity">Activity</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                      <div className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
                        The active tab body sits directly below the tab strip with minimal chrome.
                      </div>
                    </TabsContent>
                    <TabsContent value="activity">
                      <div className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
                        Activity summaries and recent edits live here.
                      </div>
                    </TabsContent>
                    <TabsContent value="settings">
                      <div className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
                        Settings pages use the same compact trigger sizing as the rest of the
                        system.
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </DemoFrame>

              <DemoFrame
                title="Menus and pagination"
                subtitle="Desktop menu surfaces and page controls."
              >
                <div className="space-y-5">
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger>File</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>
                          <CopyIcon className="h-4 w-4" />
                          Duplicate
                        </MenubarItem>
                        <MenubarItem>
                          <SettingsIcon className="h-4 w-4" />
                          Preferences
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                          <ArrowRightIcon className="h-4 w-4" />
                          Export
                        </MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                      <MenubarTrigger>Edit</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>Undo</MenubarItem>
                        <MenubarItem>Redo</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>

                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>
                          2
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </DemoFrame>
            </div>
          </Section>

          <Section
            title="Overlays"
            description="Dialogs and floating surfaces used for actions, summaries, and contextual controls."
          >
            <div className="grid gap-4 xl:grid-cols-2">
              <DemoFrame title="Dialog surfaces" subtitle="Confirmation and secondary workflows.">
                <div className="flex flex-wrap gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <EyeIcon className="h-4 w-4" />
                        Preview dialog
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Session details</DialogTitle>
                        <DialogDescription>
                          A compact modal for short tasks and focused decisions.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-3 text-sm text-muted-foreground">
                        <p>Last saved: 2 minutes ago</p>
                        <p>Current mode: balanced</p>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Close</Button>
                        </DialogClose>
                        <Button>Save</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline">Preview alert dialog</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Discard changes?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This is the destructive confirmation surface used for irreversible
                          actions.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Discard</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </DemoFrame>

              <DemoFrame
                title="Floating menus"
                subtitle="Dropdown, popover, tooltip, hover card, and context menu."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <Label>Dropdown menu</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          <MenuIcon className="h-4 w-4" />
                          Menu
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>View</DropdownMenuLabel>
                        <DropdownMenuItem>Full screen</DropdownMenuItem>
                        <DropdownMenuCheckboxItem checked>Show icons</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Compact mode</DropdownMenuCheckboxItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>Sort</DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem>Newest</DropdownMenuItem>
                            <DropdownMenuItem>Oldest</DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup defaultValue="balanced">
                          <DropdownMenuRadioItem value="soft">Soft</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="balanced">Balanced</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="bold">Bold</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="space-y-3">
                    <Label>Popover</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">
                          <CalendarDaysIcon className="h-4 w-4" />
                          Quick info
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="space-y-2">
                        <div className="text-sm font-medium">Next check-in</div>
                        <div className="text-sm text-muted-foreground">Friday, 7 August</div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-3">
                    <Label>Tooltip and hover card</Label>
                    <div className="flex flex-wrap gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost">
                            <SparklesIcon className="h-4 w-4" />
                            Tooltip
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Short contextual help</TooltipContent>
                      </Tooltip>

                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="outline">Hover card</Button>
                        </HoverCardTrigger>
                        <HoverCardContent>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/LogoSimpleNoText.png" alt="HeartLog mark" />
                                <AvatarFallback>HL</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="text-sm font-medium">HeartLog</div>
                                <div className="text-xs text-muted-foreground">
                                  Calm, private tracking
                                </div>
                              </div>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Sheet, drawer, and context menu</Label>
                    <div className="flex flex-wrap gap-2">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline">
                            <LayoutGridIcon className="h-4 w-4" />
                            Sheet
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Side sheet</SheetTitle>
                            <SheetDescription>
                              A right-anchored surface for secondary controls and summaries.
                            </SheetDescription>
                          </SheetHeader>
                        </SheetContent>
                      </Sheet>

                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button variant="outline">
                            <MessageSquareIcon className="h-4 w-4" />
                            Drawer
                          </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Bottom drawer</DrawerTitle>
                            <DrawerDescription>
                              A mobile-first surface for quick actions and lightweight flows.
                            </DrawerDescription>
                          </DrawerHeader>
                          <DrawerFooter>
                            <Button>Continue</Button>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    </div>
                  </div>

                  <div className="space-y-3 md:col-span-2">
                    <Label>Context menu</Label>
                    <ContextMenu>
                      <ContextMenuTrigger asChild>
                        <div className="rounded-lg border border-dashed border-border bg-muted/20 p-4 text-sm text-muted-foreground">
                          Contextual surface for note, list, and canvas items.
                        </div>
                      </ContextMenuTrigger>
                      <ContextMenuContent>
                        <ContextMenuLabel>Actions</ContextMenuLabel>
                        <ContextMenuItem>Open</ContextMenuItem>
                        <ContextMenuCheckboxItem checked>Pin</ContextMenuCheckboxItem>
                        <ContextMenuCheckboxItem>Archive</ContextMenuCheckboxItem>
                        <ContextMenuSeparator />
                        <ContextMenuSub>
                          <ContextMenuSubTrigger>Move to</ContextMenuSubTrigger>
                          <ContextMenuSubContent>
                            <ContextMenuItem>Inbox</ContextMenuItem>
                            <ContextMenuItem>Archive</ContextMenuItem>
                          </ContextMenuSubContent>
                        </ContextMenuSub>
                        <ContextMenuSeparator />
                        <ContextMenuRadioGroup defaultValue="list">
                          <ContextMenuRadioItem value="card">Card</ContextMenuRadioItem>
                          <ContextMenuRadioItem value="list">List</ContextMenuRadioItem>
                        </ContextMenuRadioGroup>
                      </ContextMenuContent>
                    </ContextMenu>
                  </div>
                </div>
              </DemoFrame>
            </div>
          </Section>

          <Section
            title="Data display and layout"
            description="Cards, tables, media, scrollable regions, calendars, and split-pane layouts."
          >
            <div className="grid gap-4 xl:grid-cols-2">
              <DemoFrame title="Card and avatar" subtitle="A representative profile-style surface.">
                <Card className="overflow-hidden">
                  <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/LogoComplexSmall.png" alt="HeartLog logo" />
                      <AvatarFallback>HL</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base">HeartLog</CardTitle>
                      <CardDescription>Private emotional tracking and reflection</CardDescription>
                    </div>
                    <Badge variant="secondary">active</Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      A compact card composition showing header, content, and footer spacing.
                    </p>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <Button size="sm">Open</Button>
                      <Button size="sm" variant="outline">
                        <SettingsIcon className="h-4 w-4" />
                        Settings
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-between gap-3">
                    <span className="text-xs text-muted-foreground">Updated a moment ago</span>
                    <Button size="sm" variant="ghost">
                      <ArrowRightIcon className="h-4 w-4" />
                      Details
                    </Button>
                  </CardFooter>
                </Card>
              </DemoFrame>

              <DemoFrame
                title="Table and scroll area"
                subtitle="Dense data surfaces with consistent row spacing."
              >
                <div className="space-y-4">
                  <ScrollArea className="h-56 rounded-lg border border-border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Metric</TableHead>
                          <TableHead>Today</TableHead>
                          <TableHead>Change</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Mood check-ins</TableCell>
                          <TableCell>12</TableCell>
                          <TableCell>+3</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Saved entries</TableCell>
                          <TableCell>8</TableCell>
                          <TableCell>+1</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Reminders sent</TableCell>
                          <TableCell>4</TableCell>
                          <TableCell>-1</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Streak</TableCell>
                          <TableCell>19 days</TableCell>
                          <TableCell>+2</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>
              </DemoFrame>

              <DemoFrame
                title="Calendar and command palette"
                subtitle="Date picking and searchable command lists."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Calendar
                    mode="single"
                    selected={new Date(2026, 7, 7)}
                    className="rounded-md border"
                  />

                  <Command className="h-[340px] rounded-md border">
                    <CommandInput placeholder="Search actions" />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Actions">
                        <CommandItem>
                          <MailIcon className="h-4 w-4" />
                          New email
                          <CommandShortcut>⌘N</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                          <CopyIcon className="h-4 w-4" />
                          Duplicate entry
                        </CommandItem>
                        <CommandItem>
                          <SettingsIcon className="h-4 w-4" />
                          Open settings
                        </CommandItem>
                      </CommandGroup>
                      <CommandSeparator />
                      <CommandGroup heading="Recent">
                        <CommandItem>Friday reflection</CommandItem>
                        <CommandItem>Sleep note</CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </div>
              </DemoFrame>

              <DemoFrame
                title="Accordion and media"
                subtitle="Expandable content and fixed-ratio imagery."
              >
                <div className="space-y-4">
                  <Accordion type="single" collapsible defaultValue="item-1">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>What does the component library cover?</AccordionTrigger>
                      <AccordionContent>
                        Form controls, navigation, overlays, status surfaces, and data display
                        components that share the same spacing and radius rules.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>How are corners handled?</AccordionTrigger>
                      <AccordionContent>
                        The shared button primitive is rounded-md by default, with individual
                        components overriding that when the layout calls for it.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="overflow-hidden rounded-xl border border-border">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src="/adam-vradenburg-GA09PKfRIQY-unsplash.jpg"
                        alt="Landscape reference image"
                        className="h-full w-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                </div>
              </DemoFrame>

              <DemoFrame
                title="Resizable layout"
                subtitle="A split pane preview that matches the app's utility tools."
              >
                <div className="rounded-xl border border-border">
                  <ResizablePanelGroup direction="horizontal" className="min-h-[220px]">
                    <ResizablePanel defaultSize={38}>
                      <div className="flex h-full flex-col gap-3 p-4">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <LayoutGridIcon className="h-4 w-4" />
                          List
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="rounded-md border border-border bg-background px-3 py-2">
                            Morning check-in
                          </div>
                          <div className="rounded-md border border-border bg-background px-3 py-2">
                            Mood summary
                          </div>
                          <div className="rounded-md border border-border bg-background px-3 py-2">
                            Weekly review
                          </div>
                        </div>
                      </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={62}>
                      <div className="flex h-full flex-col gap-3 p-4">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <SparklesIcon className="h-4 w-4" />
                          Preview
                        </div>
                        <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
                          The resize handle is visible and the split proportions stay stable across
                          the panel layout.
                        </div>
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </div>
              </DemoFrame>
            </div>
          </Section>
        </div>
      </div>
    </TooltipProvider>
  );
}
