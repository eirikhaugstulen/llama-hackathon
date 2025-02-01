"use client"

import { LayoutDashboard } from "lucide-react"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"

export function DashboardsGroup() {
    const pathname = usePathname()

    const activePage = pathname.split("/")[1]

    return (
        <SidebarGroup>
            <SidebarGroupLabel>
                <LayoutDashboard className="size-4 mr-2" />
                Dashboards
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={activePage === "dashboard"}>
                            <Link href="/dashboard">Overview</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={activePage === "analytics"}>
                            <Link href="/analytics">Analytics</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
} 