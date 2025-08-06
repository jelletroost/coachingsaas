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
      // featureFlag: "coach_overview",
   },
   {
      label: "Patients",
      href: "/coach/patients",
      icon: getIconComponent("UserCheck"),
      // featureFlag: "coach_patients",
   },
   {
      label: "Products",
      href: "/coach/products",
      icon: getIconComponent("Package"),
      // featureFlag: "coach_products",
   },
   {
      label: "Messages",
      href: "/coach/messages",
      icon: getIconComponent("MessageSquare"),
      // featureFlag: "coach_messages",
   },
   {
      label: "Orders",
      href: "/coach/orders",
      icon: getIconComponent("ShoppingCart"),
      // featureFlag: "coach_orders",
   },
   {
      label: "Settings",
      href: "/coach/settings",
      icon: getIconComponent("Settings"),
      // featureFlag: "coach_settings",
   },
];
const adminSidebarItems = [
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
   {
      label: "Subscriptions",
      href: "/admin/subscriptions",
      icon: getIconComponent("CreditCard"),
   },
   {
      label: "Settings",
      href: "/admin/settings",
      icon: getIconComponent("Settings"),
   },
];
const superAdminSidebarItems = [
   ...adminSidebarItems,
   {
      label: "Feature Flags",
      href: "/admin/feature-flags",
      icon: getIconComponent("Flag"),
   },
];
const patientSidebarItems = [
   {
      label: "Intake History",
      href: "/dashboard/intake-history",
      icon: getIconComponent("NotepadText"),
   },
   {
      label: "Coach Contact",
      href: "/dashboard/coach-contact",
      icon: getIconComponent("MessageSquare"),
      // featureFlag: "patient_messaging",
   },
   {
      label: "Profile",
      href: "/dashboard/profile",
      icon: getIconComponent("User"),
   },
];
const filterItemsByFeatures = (items: SidebarItem[], isFeatureEnabled: (featureName: string) => boolean): SidebarItem[] => {
   return items.filter((item) => {
      if (!item.featureFlag) {
         return true;
      }
      return isFeatureEnabled(item.featureFlag);
   });
};

const getSidebarItemsByRole = (role: string): SidebarItem[] => {
   const { isFeatureEnabled, isLoading } = useFeatureAccess({userRole: role});
   
   if (isLoading) {
      return [];
   }

   switch (role) {
      case "admin": return filterItemsByFeatures(adminSidebarItems, isFeatureEnabled);
      case "super_admin": return superAdminSidebarItems;  
      case "coach": return filterItemsByFeatures(coachSidebarItems, isFeatureEnabled);
      case "patient": return filterItemsByFeatures(patientSidebarItems, isFeatureEnabled);
      default:
         return [];
   }
};

export default getSidebarItemsByRole;
