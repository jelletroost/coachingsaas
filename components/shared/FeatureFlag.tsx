"use client";
import { useFeatureAccess } from "@/hooks/useFeatureFlags";
import { useAuthStore } from "@/store/useAuthStore";
import { ReactNode } from "react";

interface FeatureFlagProps {
   flag: string;
   children: ReactNode;
   fallback?: ReactNode;
}

export function FeatureFlag({ flag, children, fallback = null }: FeatureFlagProps) {
   const { user } = useAuthStore();
   const userRole = user?.user_metadata?.role || "patient";
   const { isFeatureEnabled, isLoading } = useFeatureAccess({ userRole });

   if (isLoading) {
      return null; // Don't show anything while loading
   }

   const isEnabled = isFeatureEnabled(flag);

   if (!isEnabled) {
      return <>{fallback}</>;
   }

   return <>{children}</>;
}

export function useFeatureFlagEnabled(flag: string): boolean {
   const { user } = useAuthStore();
   const userRole = user?.user_metadata?.role || "patient";
   const { isFeatureEnabled } = useFeatureAccess({ userRole });
   return isFeatureEnabled(flag);
} 