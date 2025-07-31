"use client";
import { useFeatureFlag } from "@/hooks/useFeatureFlags";
import { ReactNode } from "react";

interface FeatureFlagProps {
   flag: string;
   children: ReactNode;
   fallback?: ReactNode;
}

export function FeatureFlag({ flag, children, fallback = null }: FeatureFlagProps) {
   const { isEnabled, isLoading } = useFeatureFlag(flag);

   if (isLoading) {
      return null; // Don't show anything while loading
   }

   if (!isEnabled) {
      return <>{fallback}</>;
   }

   return <>{children}</>;
}

export function useFeatureFlagEnabled(flag: string): boolean {
   const { isEnabled } = useFeatureFlag(flag);
   return isEnabled;
} 