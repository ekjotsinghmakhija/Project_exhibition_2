import { Home, Activity, BookOpen, User, ShieldAlert } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  { title: "Command Center", url: "/", icon: Home },
  { title: "AI Triage", url: "/triage", icon: Activity },
  { title: "First Aid Protocols", url: "/first-aid", icon: BookOpen },
  { title: "Medical Profile", url: "/profile", icon: User },
  { title: "Warrior Fleet", url: "/warriors", icon: ShieldAlert },
]

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-red-600 font-bold tracking-widest mt-4 mb-2">
            SANJEEVANI
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
