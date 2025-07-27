import {
   Calendar,
   CreditCard,
   FileText,
   HomeIcon,
   MessageSquare,
   NotepadText,
   Package,
   Settings,
   ShoppingCart,
   Target,
   User,
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
      Package,
      NotepadText,
      ShoppingCart,
      UserCheck,
      User,
      FileText,
      Calendar,
      MessageSquare,
      Settings,
      CreditCard,
      Target,
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
               label: "Products",
               href: "/admin/products",
               icon: getIconComponent("Package"),
            },
            // {
            //    label: "Orders",
            //    href: "/admin/orders",
            //    icon: getIconComponent("ShoppingCart"),
            // },
            {
               label: "Subscriptions",
               href: "/admin/subscriptions",
               icon: getIconComponent("CreditCard"),
            },
            // {
            //    label: "Intake Management",
            //    href: "/admin/intake-management",
            //    icon: getIconComponent("NotepadText"),
            // },
            {
               label: "Settings",
               href: "/admin/settings",
               icon: getIconComponent("Settings"),
            },
            // {
            //    label: "CMS",
            //    href: "/admin/cms",
            //    icon: getIconComponent("FileText"),
            // },
         ];
      case "coach":
         return [
            // {
            //    label: "Overview",
            //    href: "/coach/overview",
            //    icon: getIconComponent("HomeIcon"),
            // },
            {
               label: "Patients",
               href: "/coach/patients",
               icon: getIconComponent("UserCheck"),
            },
            {
               label: "Products",
               href: "/coach/products",
               icon: getIconComponent("Package"),
            },
            // {
            //    label: "Orders",
            //    href: "/coach/orders",
            //    icon: getIconComponent("ShoppingCart"),
            // },
            // {
            //    label: "Intakes",
            //    href: "/coach/intakes",
            //    icon: getIconComponent("NotepadText"),
            // },
            {
               label: "Messages",
               href: "/coach/messages",
               icon: getIconComponent("MessageSquare"),
            },
            {
               label: "Settings",
               href: "/coach/settings",
               icon: getIconComponent("Settings"),
            },
         ];
      case "patient":
         return [
            // {
            //    label: "Dashboard",
            //    href: "/dashboard",
            //    icon: getIconComponent("HomeIcon"),
            // },
            {
               label: "Intake History",
               href: "/dashboard/intake-history",
               icon: getIconComponent("NotepadText"),
            },

            {
               label: "Coach Contact",
               href: "/dashboard/coach-contact",
               icon: getIconComponent("MessageSquare"),
            },
            // {
            //    label: "Orders",
            //    href: "/dashboard/orders",
            //    icon: getIconComponent("ShoppingCart"),
            // },
            // {
            //    label: "Subscriptions",
            //    href: "/dashboard/subscriptions",
            //    icon: getIconComponent("CreditCard"),
            // },
            {
               label: "Profile",
               href: "/dashboard/profile",
               icon: getIconComponent("User"),
            },
         ];
      default:
         return [];
   }
};

export default getSidebarItemsByRole;
