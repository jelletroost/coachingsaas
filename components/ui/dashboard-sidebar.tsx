import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from "@/components/ui/sidebar";
import getSidebarItemsByRole from "@/lib/config/sidebar.config";
import Link from "next/link";
import Logo from "../shared/logo";

// Menu items.
const menuItems = getSidebarItemsByRole("admin");

export function DashboardSidebar() {
   return (
      <Sidebar>
         <SidebarHeader>
            <Logo />
         </SidebarHeader>
         <SidebarContent>
            <SidebarMenu>
               {menuItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                     <SidebarMenuButton asChild>
                        <Link href={item.href}>
                           {item.icon && <item.icon />}
                           <span>{item.label}</span>
                        </Link>
                     </SidebarMenuButton>
                  </SidebarMenuItem>
               ))}
            </SidebarMenu>
         </SidebarContent>
         <SidebarFooter />
      </Sidebar>
   );
}
