import {
  ArrowRightIcon,
  CopyIcon,
  LayoutGridIcon,
  MailIcon,
  MenuIcon,
  SettingsIcon,
} from 'lucide-react';

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
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar.tsx';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu.tsx';
import { Section, DemoFrame } from '@/pages/dev/design-system/shared.tsx';

export function NavigationSection() {
  return (
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
                      <NavigationMenuLink href="#" className="rounded-md border border-border p-3">
                        Overview
                      </NavigationMenuLink>
                      <NavigationMenuLink href="#" className="rounded-md border border-border p-3">
                        Updates
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-2 p-3 md:w-[280px]">
                      <NavigationMenuLink href="#" className="rounded-md border border-border p-3">
                        Docs
                      </NavigationMenuLink>
                      <NavigationMenuLink href="#" className="rounded-md border border-border p-3">
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
                  Settings pages use the same compact trigger sizing as the rest of the system.
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DemoFrame>

        <DemoFrame title="Menus and pagination" subtitle="Desktop menu surfaces and page controls.">
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
  );
}
