"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useFeatureFlags } from "@/hooks/useFeatureFlags";
import { Flag, Loader2, RefreshCw } from "lucide-react";
import { useState } from "react";

export function FeatureFlagManagement() {
   const {
      featureFlags,
      isLoading,
      error,
      refetch,
      updateFeatureFlag,
      isUpdating,
      isSuperAdmin,
   } = useFeatureFlags();

   const [updatingFlags, setUpdatingFlags] = useState<Set<string>>(new Set());

   if (!isSuperAdmin) {
      return (
         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <Flag className="h-5 w-5" />
                  Feature Flag Management
               </CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-muted-foreground">
                  Only super administrators can access feature flag management.
               </p>
            </CardContent>
         </Card>
      );
   }

   const handleToggleFlag = async (
      featureFlagId: string,
      roleName: string,
      enabled: boolean
   ) => {
      const flagKey = `${featureFlagId}-${roleName}`;
      setUpdatingFlags(prev => new Set(prev).add(flagKey));

      try {
         await updateFeatureFlag({
            featureFlagId,
            roleName,
            enabled,
         });
      } finally {
         setUpdatingFlags(prev => {
            const newSet = new Set(prev);
            newSet.delete(flagKey);
            return newSet;
         });
      }
   };

   const getRoleDisplayName = (role: string) => {
      switch (role) {
         case "admin":
            return "Admin";
         case "coach":
            return "Coach";
         case "patient":
            return "Patient";
         default:
            return role;
      }
   };

   if (isLoading) {
      return (
         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <Flag className="h-5 w-5" />
                  Feature Flag Management
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="ml-2">Loading feature flags...</span>
               </div>
            </CardContent>
         </Card>
      );
   }

   if (error) {
      return (
         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <Flag className="h-5 w-5" />
                  Feature Flag Management
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-center py-8">
                  <p className="text-destructive mb-4">
                     Failed to load feature flags. Please try again.
                  </p>
                  <Button onClick={() => refetch()} variant="outline">
                     <RefreshCw className="h-4 w-4 mr-2" />
                     Retry
                  </Button>
               </div>
            </CardContent>
         </Card>
      );
   }

   return (
      <div className="space-y-6">
         <Card>
            <CardHeader>
               <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                     <Flag className="h-5 w-5" />
                     Feature Flag Management
                  </CardTitle>
                  <Button onClick={() => refetch()} variant="outline" size="sm">
                     <RefreshCw className="h-4 w-4 mr-2" />
                     Refresh
                  </Button>
               </div>
               <p className="text-sm text-muted-foreground">
                  Control feature access for different user roles. Only super administrators can modify these settings.
               </p>
            </CardHeader>
            <CardContent>
               {featureFlags && featureFlags.length > 0 ? (
                  <div className="space-y-4">
                     {featureFlags.map((flag) => (
                        <Card key={flag.id} className="border-l-4 border-l-blue-500">
                           <CardHeader className="pb-3">
                              <div className="flex items-start justify-between">
                                 <div>
                                    <h3 className="font-semibold text-lg">{flag.name}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                       {flag.description}
                                    </p>
                                 </div>
                                 <Badge variant="outline" className="text-xs">
                                    {new Date(flag.updated_at).toLocaleDateString()}
                                 </Badge>
                              </div>
                           </CardHeader>
                           <CardContent>
                              <div className="space-y-3">
                                 <h4 className="text-sm font-medium text-muted-foreground">
                                    Role Access Control
                                 </h4>
                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {Object.entries(flag.accessByRole).map(([role, access]) => (
                                       <div
                                          key={role}
                                          className="flex items-center justify-between p-3 border rounded-lg"
                                       >
                                          <div>
                                             <p className="font-medium text-sm">
                                                {getRoleDisplayName(role)}
                                             </p>
                                             <p className="text-xs text-muted-foreground">
                                                {access.enabled ? "Enabled" : "Disabled"}
                                             </p>
                                          </div>
                                          <div className="flex items-center gap-2">
                                             {updatingFlags.has(`${flag.id}-${role}`) ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                             ) : (
                                                <Switch
                                                   checked={access.enabled}
                                                   onCheckedChange={(enabled) =>
                                                      handleToggleFlag(flag.id, role, enabled)
                                                   }
                                                   disabled={isUpdating}
                                                />
                                             )}
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     ))}
                  </div>
               ) : (
                  <div className="text-center py-8">
                     <Flag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                     <p className="text-muted-foreground">
                        No feature flags found. Feature flags will appear here once they are created.
                     </p>
                  </div>
               )}
            </CardContent>
         </Card>
      </div>
   );
} 