import {
   Calendar,
   CreditCard,
   HomeIcon,
   MessageSquare,
   Settings,
   ShoppingCart,
   UserCheck,
   Users,
} from "lucide-react";

export type SidebarItem = {
   label: string;
   href: string;
   icon?: string | React.ComponentType;
};

// Map icon names to Lucide components
export const getIconComponent = (iconName: string) => {
   const iconMap: Record<string, React.ComponentType> = {
      HomeIcon,
      Users,
      ShoppingCart,
      UserCheck,
      Calendar,
      MessageSquare,
      Settings,
      CreditCard,
   };
   return iconMap[iconName];
};

const getSidebarItemsByRole = (role: string): SidebarItem[] => {
   switch (role) {
      case "admin":
         return [
            {
               label: "Overview",
               href: "/admin/overview",
               icon: getIconComponent("HomeIcon"),
            },
            {
               label: "Users",
               href: "/admin/users",
               icon: getIconComponent("Users"),
            },
            {
               label: "Orders",
               href: "/admin/orders",
               icon: getIconComponent("ShoppingCart"),
            },
            {
               label: "Subscriptions",
               href: "/admin/subscriptions",
               icon: getIconComponent("CreditCard"),
            },
         ];
      case "coach":
         return [
            {
               label: "Dashboard",
               href: "/coach/dashboard",
               icon: "HomeIcon",
            },
            { label: "Patients", href: "/coach/patients", icon: "UserCheck" },
            {
               label: "Appointments",
               href: "/coach/appointments",
               icon: "Calendar",
            },
            {
               label: "Messages",
               href: "/coach/messages",
               icon: "MessageSquare",
            },
            { label: "Settings", href: "/coach/settings", icon: "Settings" },
         ];
      case "patient":
         return [
            {
               label: "Dashboard",
               href: "/dashboard",
               icon: "HomeIcon",
            },
            { label: "Settings", href: "/settings", icon: "Settings" },
         ];
      default:
         return [];
   }
};

export default getSidebarItemsByRole;
