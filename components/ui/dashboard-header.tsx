import NavUser from "./nav-user";
import { Separator } from "./separator";
import { SidebarTrigger } from "./sidebar";

const userData = {
   name: "John Doe",
   email: "john.doe@example.com",
   avatar: "https://github.com/shadcn.png",
};

const DashboardHeader = () => {
   return (
      <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
         <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator
               orientation="vertical"
               className="mx-2 data-[orientation=vertical]:h-4"
            />
            <h1 className="text-base font-medium">Admin Dashboard</h1>
            <div className="ml-auto flex items-center gap-2">
               <NavUser user={userData} />
            </div>
         </div>
      </header>
   );
};

export default DashboardHeader;
