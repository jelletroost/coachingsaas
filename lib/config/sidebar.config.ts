import { useFeatureAccess } from "@/hooks/useFeatureFlags";
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

const coachSidebarItems = [
   {
      label: "Overview",
      href: "/coach/overview",
      icon: getIconComponent("HomeIcon"),
      featureFlag: "see_overview",
   },
   {
      label: "Patients",
      href: "/coach/patients",
      icon: getIconComponent("UserCheck"),
      featureFlag: "see_patients",
   },
   {
      label: "Products",
      href: "/coach/products",
      icon: getIconComponent("Package"),
      featureFlag: "see_products",
   },
   {
      label: "Messages",
      href: "/coach/messages",
      icon: getIconComponent("MessageSquare"),
      featureFlag: "see_messages",
   },
   {
      label: "Orders",
      href: "/coach/orders",
      icon: getIconComponent("ShoppingCart"),
      featureFlag: "see_orders",
   },
   {
      label: "Settings",
      href: "/coach/settings",
      icon: getIconComponent("Settings"),
      featureFlag: "see_settings",
   },
];

// Helper function to filter items based on enabled features
const filterItemsByFeatures = (items: SidebarItem[], enabledFeatures: string[]): SidebarItem[] => {
   return items.filter((item) => {
      // If no feature flag is specified, show the item
      if (!item.featureFlag) {
         return true;
      }
      // Check if the feature flag is enabled
      return enabledFeatures.includes(item.featureFlag);
   });
};

const getSidebarItemsByRole = (role: string): SidebarItem[] => {
   const { featureAccess, isLoading } = useFeatureAccess({userRole: role});
   
   // If still loading, return empty array or show loading state
   if (isLoading) {
      return [];
   }

   // Get enabled features from the API response
   const enabledFeatures = featureAccess?.enabledFeatures || [];
   console.log(`Enabled features for ${role}:`, enabledFeatures);

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
         // Filter coach sidebar items based on enabled features
         return filterItemsByFeatures(coachSidebarItems, enabledFeatures);
      case "patient": {
         const patientItems = [
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
         
         // Filter patient sidebar items based on enabled features
         return filterItemsByFeatures(patientItems, enabledFeatures);
      }
      default:
         return [];
   }
};

export default getSidebarItemsByRole;
