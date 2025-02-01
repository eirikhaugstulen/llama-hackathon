"use client"

import { SidebarInset } from "@/components/ui/sidebar"
import { ContentHeader } from "./content-header"

interface SidebarContentProps {
  children: React.ReactNode
}

export function SidebarContent({ children }: SidebarContentProps) {
  return (
    <SidebarInset>
      <ContentHeader />
      {children}
    </SidebarInset>
  )
} 