import type * as React from "react"
import { SidebarFooter as UISidebarFooter } from "@/components/ui/sidebar"
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"
import { createClient } from "@/utils/supabase/server"
import { logout } from "@/app/(auth)/login/actions"

export async function SidebarFooter({ className, ...props }: React.ComponentProps<typeof UISidebarFooter>) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return null
    }

    return (
        <UISidebarFooter className={className} {...props}>
            <div className="flex items-center justify-center">
                <form action={logout}>
                    <Button type="submit">
                        Sign Out
                        <LogOut className="size-4" />
                    </Button>
                </form>
            </div>
        </UISidebarFooter>
    )
} 