import {
  CalendarDaysIcon,
  EyeIcon,
  LayoutGridIcon,
  MailIcon,
  MenuIcon,
  MessageSquareIcon,
  SparklesIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
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
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip.tsx';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Section, DemoFrame } from '@/pages/dev/design-system/shared.tsx';

export function OverlaysSection() {
  return (
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
                    This is the destructive confirmation surface used for irreversible actions.
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
  );
}
