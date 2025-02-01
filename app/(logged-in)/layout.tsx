import { AppSidebar } from "@/components/app-sidebar/app-sidebar"
import { SidebarContent } from "@/components/app-sidebar/sidebar-content"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarContent>
        {children}
      </SidebarContent>
    </SidebarProvider>
  )
}
