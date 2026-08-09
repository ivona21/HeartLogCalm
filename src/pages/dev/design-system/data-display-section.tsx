import { LayoutGridIcon, SettingsIcon, SparklesIcon } from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx';
import { Calendar } from '@/components/ui/calendar.tsx';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion.tsx';
import { AspectRatio } from '@/components/ui/aspect-ratio.tsx';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Section, DemoFrame } from '@/pages/dev/design-system/shared.tsx';

export function DataDisplaySection() {
  return (
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
                <SparklesIcon className="h-4 w-4" />
                Details
              </Button>
            </CardFooter>
          </Card>
        </DemoFrame>

        <DemoFrame
          title="Table and scroll area"
          subtitle="Dense data surfaces with consistent row spacing."
        >
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
        </DemoFrame>

        <DemoFrame
          title="Calendar and command palette"
          subtitle="Date picking and searchable command lists."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Calendar mode="single" selected={new Date(2026, 7, 7)} className="rounded-md border" />

            <Command className="h-[340px] rounded-md border">
              <CommandInput placeholder="Search actions" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Actions">
                  <CommandItem>
                    <SparklesIcon className="h-4 w-4" />
                    New email
                    <CommandShortcut>⌘N</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <LayoutGridIcon className="h-4 w-4" />
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
                  Form controls, navigation, overlays, status surfaces, and data display components
                  that share the same spacing and radius rules.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How are corners handled?</AccordionTrigger>
                <AccordionContent>
                  The shared button primitive is rounded-md by default, with individual components
                  overriding that when the layout calls for it.
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
                    The resize handle is visible and the split proportions stay stable across the
                    panel layout.
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </DemoFrame>
      </div>
    </Section>
  );
}
