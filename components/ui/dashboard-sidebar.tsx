"use client";
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
import { usePathname } from "next/navigation";
import Logo from "../shared/logo";

// Menu items.
const menuItems = getSidebarItemsByRole("admin");

export function DashboardSidebar() {
   const pathname = usePathname();
   return (
      <Sidebar>
         <SidebarHeader>
            <Logo />
         </SidebarHeader>
         <SidebarContent className="p-4">
            <SidebarMenu>
               {menuItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                     <SidebarMenuButton
                        className={`${
                           pathname === item.href
                              ? "bg-accent text-accent-foreground"
                              : ""
                        }`}
                        asChild>
                        <Link className="py-6" href={item.href}>
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
