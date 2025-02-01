"use client"

import {
    Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator 
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

const Dashboard = () => {
    return (
        <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
        </BreadcrumbItem>
    )
}

const Analytics = () => {
    return (
        <BreadcrumbItem>
            <BreadcrumbPage>Analytics</BreadcrumbPage>
        </BreadcrumbItem>
    )
}

const ExistingChat = ({ chatId }: { chatId: string }) => {
    return (
        <>
            <BreadcrumbItem>
                <BreadcrumbLink href="/analytics">Analytics</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>{chatId}</BreadcrumbPage>
            </BreadcrumbItem>
        </>
    )
}

export function ContentHeader() {
    const pathname = usePathname();
    const pathParts = pathname.split("/").filter(Boolean);
    const activePage = pathParts[0];
    const chatId = pathParts[1];

    const breadcrumbItems = useMemo(() => {
        if (!activePage) return null;
    
        if (activePage === "analytics" && chatId) {
            return <ExistingChat chatId={chatId} />
        }
        if (activePage === "analytics") {
            return <Analytics />
        }
        if (activePage === "dashboard") {
            return <Dashboard />
        }
        return null
    }, [activePage, chatId])

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
                <BreadcrumbList>
                    {breadcrumbItems}
                </BreadcrumbList>
            </Breadcrumb>
        </header>
    )
} 