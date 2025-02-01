import type * as React from "react"
import { Globe } from "lucide-react"

import { SearchForm } from "@/components/app-sidebar/search-form"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { RecentCreationsGroup } from "./recent-creations-group"
import { DashboardsGroup } from "./dashboards-group"

export function AppSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className={className} {...props}>
      <SidebarHeader className="border-b border-border/50 px-2 py-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="w-full bg-sidebar-accent/50 text-sidebar-accent-foreground hover:bg-sidebar-accent/70">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Globe className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 text-left leading-none">
                <span className="font-medium">Health Data AI</span>
                <span className="text-xs text-muted-foreground">Ghana</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="px-2 py-2">
          <SearchForm />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <DashboardsGroup />

        <RecentCreationsGroup />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

