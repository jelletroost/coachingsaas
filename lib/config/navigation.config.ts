export type NavItem = {
   label: string;
   href: string;
   icon?: React.ReactNode; // Optional icon component
   roles: Array<"patient" | "coach" | "admin" | "super_admin">; // Who can access
};

export const NAVIGATION: NavItem[] = [
   // Shared
   {
      label: "Dashboard",
      href: "/dashboard",
      icon: "🏠",
      roles: ["patient", "coach", "admin"],
   },

   // Patient-specific
   {
      label: "My Program",
      href: "/program",
      icon: "🧠",
      roles: ["patient"],
   },
   {
      label: "Messages",
      href: "/messages",
      icon: "💬",
      roles: ["patient"],
   },
   {
      label: "Orders",
      href: "/orders",
      icon: "📦",
      roles: ["patient"],
   },

   // Coach-specific
   {
      label: "Patients",
      href: "/patients",
      icon: "👥",
      roles: ["coach"],
   },
   {
      label: "Intakes",
      href: "/intakes",
      icon: "📝",
      roles: ["coach"],
   },

   // Admin-specific
   {
      label: "Users",
      href: "/admin/users",
      icon: "👤",
      roles: ["admin", "super_admin"],
   },
   {
      label: "Products",
      href: "/admin/products",
      icon: "💊",
      roles: ["admin", "super_admin"],
   },
   {
      label: "Reports",
      href: "/admin/reports",
      icon: "📊",
      roles: ["admin", "super_admin"],
   },
];
