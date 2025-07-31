import {
   Calendar,
   CreditCard,
   FileText,
   Flag,
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
   featureFlag?: string; // Optional feature flag to protect this menu item
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
      Flag,
   };
   return iconMap[iconName];
};

// Note: To add feature flag protection to sidebar items, you would:
// 1. Add featureFlag property to SidebarItem type (done above)
// 2. Import useFeatureFlag hook in this file
// 3. Filter menu items based on feature flag status
// 4. Example: items.filter(item => !item.featureFlag || useFeatureFlag(item.featureFlag).isEnabled)

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
      case "super_admin":
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
               featureFlag: "subscription_tiers", // Protected by feature flag
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
            {
               label: "Feature Flags",
               href: "/admin/feature-flags",
               icon: getIconComponent("Flag"),
            },
            // {
            //    label: "CMS",
            //    href: "/admin/cms",
            //    icon: getIconComponent("FileText"),
            // },
         ];
      case "coach":
         return [
            {
               label: "Overview",
               href: "/coach/overview",
               icon: getIconComponent("HomeIcon"),
            },
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
               featureFlag: "patient_messaging", // Protected by feature flag
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
