import {
  type LucideIcon,
  AlertTriangleIcon,
  CalendarDaysIcon,
  CheckIcon,
  FilterIcon,
  LayoutGridIcon,
  MailIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
  PaletteIcon,
  SettingsIcon,
  SparklesIcon,
  SunMediumIcon,
  MoonStarIcon,
  UserIcon,
} from 'lucide-react';

import { cn } from '@/shared/utils/cn.ts';
import { Button } from '@/components/ui/button.tsx';
import { Badge } from '@/components/ui/badge.tsx';
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
} from '@/components/ui/alert-dialog.tsx';
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
} from '@/components/ui/dropdown-menu.tsx';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.tsx';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card.tsx';
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
} from '@/components/ui/context-menu.tsx';
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
} from '@/components/ui/input-otp.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
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
} from '@/components/ui/navigation-menu.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable.tsx';
import { AspectRatio } from '@/components/ui/aspect-ratio.tsx';
import { Header } from '@/components/layout/Header.tsx';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader as SidebarShellHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar.tsx';
import { Section } from '@/pages/dev/design-system/shared.tsx';

type ExampleSidebarItem = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
};

const exampleSidebarItems = [
  { label: 'Overview', icon: LayoutGridIcon, active: true },
  { label: 'Calendar', icon: CalendarDaysIcon },
  { label: 'Messages', icon: MessageSquareIcon },
  { label: 'Settings', icon: SettingsIcon },
] satisfies readonly ExampleSidebarItem[];

const exampleCards = [
  {
    title: 'Mood check-ins',
    description: 'A quick summary of the last 7 days.',
    value: '24',
    detail: '+3 from last week',
  },
  {
    title: 'Saved entries',
    description: 'Drafts and completed notes in one place.',
    value: '8',
    detail: '2 waiting for review',
  },
  {
    title: 'Focus streak',
    description: 'The current run of daily activity.',
    value: '19 days',
    detail: 'Best streak this month',
  },
] as const;

function ExamplePagePreview() {
  return (
    <div className="relative isolate overflow-hidden rounded-2xl border border-border bg-background shadow-sm transform-gpu">
      <SidebarProvider defaultOpen>
        <div className="flex min-h-[900px] w-full">
          <Sidebar side="left" variant="inset" collapsible="icon">
            <SidebarShellHeader>
              <div className="flex items-center justify-between gap-3 rounded-lg border border-sidebar-border bg-background/60 px-3 py-2">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground text-xs font-semibold">
                    HL
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">HeartLog</div>
                    <div className="truncate text-xs text-sidebar-foreground/70">
                      Product overview
                    </div>
                  </div>
                </div>
                <SidebarTrigger className="shrink-0" />
              </div>
            </SidebarShellHeader>
            <SidebarSeparator />
            <SidebarContent className="px-2 py-1">
              <SidebarGroup>
                <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {exampleSidebarItems.map((item) => (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton isActive={item.active ?? false}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Today</SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="space-y-2 px-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Entries</span>
                      <Badge variant="secondary">12</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Reviewed</span>
                      <Badge variant="accent">4</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Drafts</span>
                      <Badge variant="outline">2</Badge>
                    </div>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <div className="rounded-lg border border-sidebar-border bg-background/60 px-3 py-2">
                <div className="text-xs text-sidebar-foreground/70">Plan</div>
                <div className="text-sm font-medium">Personal</div>
              </div>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset className="bg-background">
            <Header />
            <main className="space-y-6 px-6 pb-6 pt-24 md:px-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground">Daily overview</h3>
                  <p className="text-sm text-muted-foreground">
                    A composed screen built from the app&apos;s actual header, sidebar, cards,
                    alerts, form controls, and dialog surface.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button>
                    <SparklesIcon className="h-4 w-4" />
                    Primary button
                  </Button>
                  <Button variant="secondary">Secondary button</Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {exampleCards.map((card) => (
                  <Card key={card.title}>
                    <CardHeader>
                      <CardDescription>{card.description}</CardDescription>
                      <CardTitle className="text-2xl">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="text-3xl font-semibold tracking-tight text-foreground">
                        {card.value}
                      </div>
                      <p className="text-sm text-muted-foreground">{card.detail}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
                <div className="space-y-4">
                  <Alert variant="success">
                    <CheckIcon className="h-4 w-4" />
                    <AlertTitle>Sync complete</AlertTitle>
                    <AlertDescription>
                      The latest changes were saved and are ready to review.
                    </AlertDescription>
                  </Alert>
                  <Alert variant="warning">
                    <AlertTriangleIcon className="h-4 w-4" />
                    <AlertTitle>Review pending</AlertTitle>
                    <AlertDescription>
                      One draft needs attention before it can be published.
                    </AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <MessageSquareIcon className="h-4 w-4" />
                    <AlertTitle>Connection lost</AlertTitle>
                    <AlertDescription>
                      The last update did not reach the server. Retry when the connection returns.
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Form</CardTitle>
                      <CardDescription>
                        Capture a new entry without leaving the page.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="example-entry-title">Entry title</Label>
                          <Input id="example-entry-title" defaultValue="Afternoon reflection" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="example-entry-category">Category</Label>
                          <Select defaultValue="daily">
                            <SelectTrigger id="example-entry-category" className="w-full">
                              <SelectValue placeholder="Choose a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily log</SelectItem>
                              <SelectItem value="review">Weekly review</SelectItem>
                              <SelectItem value="note">Quick note</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="example-entry-notes">Notes</Label>
                          <Textarea
                            id="example-entry-notes"
                            defaultValue="Keep the entry calm, short, and easy to scan."
                          />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button type="submit">Save entry</Button>
                          <Button type="button" variant="secondary">
                            Save draft
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Dialog</CardTitle>
                      <CardDescription>
                        Focused confirmation for actions that need an extra step.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full">
                            Open dialog
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Publish entry?</DialogTitle>
                            <DialogDescription>
                              This dialog uses the same component set and tokenized colors as the
                              rest of the app.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
                            The current draft will be visible to the rest of the workspace after
                            publication.
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button>Publish</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}

export function ExamplePageSection() {
  return (
    <Section
      title="Example page"
      description="A realistic shell that composes the live Header, Sidebar, cards, actions, alerts, form fields, and dialog into one screen."
    >
      <ExamplePagePreview />
    </Section>
  );
}
