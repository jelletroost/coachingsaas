import { signOut } from "@/app/actions/actions";
import { Button } from "@/components/ui/button";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon, UserIcon } from "lucide-react";
import Link from "next/link";

const UserDropdown = ({isUserDropdownOpen,setIsUserDropdownOpen,user,
}: {isUserDropdownOpen: boolean; setIsUserDropdownOpen: (open: boolean) => void; user: any}) => (
   <Popover open={isUserDropdownOpen} onOpenChange={setIsUserDropdownOpen}>
      <PopoverTrigger asChild>
         <Button
            variant="ghost"
            className="flex cursor-pointer items-center gap-2 px-3 py-2 h-auto"
            size="sm">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
               {user?.avatar_url ? (
                  <img
                     src={user?.user_metadata?.avatar_url}
                     alt={`${user?.user_metadata?.first_name} ${user?.user_metadata?.last_name}`}
                     className="h-8 w-8 rounded-full object-cover"
                  />
               ) : (
                  <UserIcon />
               )}
            </div>
            <div className="hidden sm:block text-left">
               <div className="text-sm font-medium">
                  {user?.user_metadata?.first_name}{" "}
                  {user?.user_metadata?.last_name}
               </div>
               <div className="text-xs text-muted-foreground">
                  {user?.email}
               </div>
            </div>
            <ChevronDownIcon />
         </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="end">
         <div className="p-2">
            <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
               Account
            </div>
            <Link
               href={`${
                  user?.role === "admin"
                     ? "/admin/overview"
                     : user?.role === "coach"
                     ? "/coach/overview"
                     : "/dashboard"
               }`}
               onClick={() => setIsUserDropdownOpen(false)}
               className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
               <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                  />
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
                  />
               </svg>
               Dashboard
            </Link>
            <Link
               href="/profile"
               onClick={() => setIsUserDropdownOpen(false)}
               className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
               <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
               </svg>
               Profile
            </Link>
            <div className="border-t my-1" />
            <button
               onClick={signOut}
               className="flex w-full items-center px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors text-red-600 hover:text-red-700 cursor-pointer">
               <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
               </svg>
               Sign Out
            </button>
         </div>
      </PopoverContent>
   </Popover>
);

export default UserDropdown;
