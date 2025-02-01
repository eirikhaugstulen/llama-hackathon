'use client'

import { Clock } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Database } from "@/utils/supabase/database.types"
import { createClient } from "@/utils/supabase/client"
import { usePathname } from "next/navigation"

type Visualization = Database['public']['Tables']['visualizations']['Row']

export function RecentCreationsGroup() {
    const pathname = usePathname()
    const [visualizations, setVisualizations] = useState<Visualization[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchVisualizations() {
            const supabase = await createClient()
            const { data, error } = await supabase
                .from('visualizations')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5)

            if (error) {
                console.error('Error fetching visualizations:', error)
                return
            }

            setVisualizations(data || [])
            setIsLoading(false)
        }

        fetchVisualizations()
    }, [pathname])

    return (
        <SidebarGroup>
            <SidebarGroupLabel>
                <Clock className="size-4 mr-2" />
                Recent creations
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {isLoading ? (
                        <SidebarMenuItem className="text-muted-foreground">
                            Loading...
                        </SidebarMenuItem>
                    ) : visualizations.map((visualization) => (
                        <SidebarMenuItem
                            className="text-muted-foreground hover:text-foreground"
                            key={visualization.id}
                        >
                            <Link href={`/analytics/${visualization.id}`}>
                                <SidebarMenuButton>
                                    {visualization.title}
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
} 