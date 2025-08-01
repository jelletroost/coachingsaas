import React from "react";
import DashboardHeader from "../ui/dashboard-header";
import { DashboardSidebar } from "../ui/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <SidebarProvider>
         <DashboardSidebar />
         <SidebarInset>
            <DashboardHeader />
            <div className="flex flex-1 flex-col">
               <div className="@container/main flex flex-1 flex-col gap-2">
                  <div className="flex flex-col gap-4 p-6 md:gap-6">
                     {children}
                  </div>
               </div>
            </div>
         </SidebarInset>
      </SidebarProvider>
   );
};

export default DashboardLayout;
