import { Clock } from "lucide-react"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
} from "@/components/ui/sidebar"

export function RecentCreationsGroup() {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>
                <Clock className="size-4 mr-2" />
                Recent creations
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
          
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
} 