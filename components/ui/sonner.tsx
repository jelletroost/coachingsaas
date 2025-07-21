"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
   const { theme = "system" } = useTheme();

   return (
      <Sonner
         theme={theme as ToasterProps["theme"]}
         className="toaster group"
         position="top-center"
         toastOptions={{
            style: {
               background: "var(--background)",
               color: "var(--foreground)",
               border: "1px solid var(--border)",
            },
         }}
         style={
            {
               "--normal-bg": "var(--popover)",
               "--normal-text": "var(--popover-foreground)",
               "--normal-border": "var(--border)",
            } as React.CSSProperties
         }
         {...props}
      />
   );
};

export { Toaster };
