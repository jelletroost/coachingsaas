"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFeatureFlags } from "@/hooks/useFeatureFlags";
import { FeatureAccessItem } from "@/services/feature_flag_services";
import { Flag, Loader2, RefreshCw, Shield, UserCheck, Users } from "lucide-react";
import { useState } from "react";

export function FeatureFlagManagement() {
   const {
      featureAccessByRole,
      isLoading,
      error,
      refetchFeatureAccess,
      updateFeatureAccess,
      isUpdating,
      isSuperAdmin,
   } = useFeatureFlags();



   const [updatingAccess, setUpdatingAccess] = useState<Set<string>>(new Set());

   if (!isSuperAdmin) {
      return (
         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <Flag className="h-5 w-5" />
                  Feature Access Management
               </CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-muted-foreground">
                  Only super administrators can access feature access management.
               </p>
            </CardContent>
         </Card>
      );
   }

   const handleToggleAccess = async (
      accessId: string,
      environment: 'staging' | 'production',
      enabled: boolean
   ) => {
      const accessKey = `${accessId}-${environment}`;
      setUpdatingAccess(prev => new Set(prev).add(accessKey));

      try {
         await updateFeatureAccess({
            id: accessId,
            staging_allowed: environment === 'staging' ? enabled : undefined,
            production_allowed: environment === 'production' ? enabled : undefined,
         });
      } finally {
         setUpdatingAccess(prev => {
            const newSet = new Set(prev);
            newSet.delete(accessKey);
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

   const getRoleIcon = (role: string) => {
      switch (role) {
         case "admin":
            return <Shield className="h-4 w-4" />;
         case "coach":
            return <UserCheck className="h-4 w-4" />;
         case "patient":
            return <Users className="h-4 w-4" />;
         default:
            return <Users className="h-4 w-4" />;
      }
   };

   if (isLoading) {
      return (
         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <Flag className="h-5 w-5" />
                  Feature Access Management
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="ml-2">Loading feature access...</span>
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
                  Feature Access Management
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-center py-8">
                  <p className="text-destructive mb-4">
                     Failed to load feature access. Please try again.
                  </p>
                  <Button onClick={() => refetchFeatureAccess()} variant="outline">
                     <RefreshCw className="h-4 w-4 mr-2" />
                     Retry
                  </Button>
               </div>
            </CardContent>
         </Card>
      );
   }

   const featureAccessData = featureAccessByRole?.featureAccessByRole;
   
   // Always show all three main roles: patient, coach, admin
   const allRoles = ['patient', 'coach', 'admin'];

   return (
      <div className="space-y-6">
         <Card>
            <CardHeader>
               <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                     <Flag className="h-5 w-5" />
                     Feature Access Management
                  </CardTitle>
                  <Button onClick={() => refetchFeatureAccess()} variant="outline" size="sm">
                     <RefreshCw className="h-4 w-4 mr-2" />
                     Refresh
                  </Button>
               </div>
               <p className="text-sm text-muted-foreground">
                  Control feature access for different user roles across staging and production environments. Only super administrators can modify these settings.
               </p>
            </CardHeader>
                        <CardContent>
               <Tabs defaultValue="patient" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                     {allRoles.map((role) => (
                        <TabsTrigger key={role} value={role} className="flex items-center gap-2">
                           {getRoleIcon(role)}
                           {getRoleDisplayName(role)}
                        </TabsTrigger>
                     ))}
                  </TabsList>

                  {allRoles.map((role) => {
                     const features = featureAccessData?.[role] || [];
                     return (
                        <TabsContent key={role} value={role} className="space-y-4">
                           <div className="flex items-center gap-2 mb-4">
                              {getRoleIcon(role)}
                              <h3 className="text-lg font-semibold">
                                 {getRoleDisplayName(role)} Features
                              </h3>
                           </div>
                           
                           {features.length > 0 ? (
                              <div className="space-y-4">
                                 {features.map((feature: FeatureAccessItem) => (
                                    <Card key={feature.id} className="border-l-4 border-l-blue-500">
                                       <CardHeader className="pb-3">
                                          <div className="flex items-start justify-between">
                                             <div>
                                                <h4 className="font-semibold text-lg">{feature.feature_name}</h4>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                   Feature access control for {getRoleDisplayName(role)} role
                                                </p>
                                             </div>
                                             <Badge variant="outline" className="text-xs">
                                                {new Date(feature.updated_at).toLocaleDateString()}
                                             </Badge>
                                          </div>
                                       </CardHeader>
                                       <CardContent>
                                          <div className="space-y-3">
                                             <h5 className="text-sm font-medium text-muted-foreground">
                                                Environment Access Control
                                             </h5>
                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                                   <div>
                                                      <p className="font-medium text-sm">Staging</p>
                                                      <p className="text-xs text-muted-foreground">
                                                         {feature.staging_allowed ? "Enabled" : "Disabled"}
                                                      </p>
                                                   </div>
                                                   <div className="flex items-center gap-2">
                                                      {updatingAccess.has(`${feature.id}-staging`) ? (
                                                         <Loader2 className="h-4 w-4 animate-spin" />
                                                      ) : (
                                                         <Switch
                                                            checked={feature.staging_allowed}
                                                            onCheckedChange={(enabled) =>
                                                               handleToggleAccess(feature.id, 'staging', enabled)
                                                            }
                                                            disabled={isUpdating}
                                                         />
                                                      )}
                                                   </div>
                                                </div>
                                                
                                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                                   <div>
                                                      <p className="font-medium text-sm">Production</p>
                                                      <p className="text-xs text-muted-foreground">
                                                         {feature.production_allowed ? "Enabled" : "Disabled"}
                                                      </p>
                                                   </div>
                                                   <div className="flex items-center gap-2">
                                                      {updatingAccess.has(`${feature.id}-production`) ? (
                                                         <Loader2 className="h-4 w-4 animate-spin" />
                                                      ) : (
                                                         <Switch
                                                            checked={feature.production_allowed}
                                                            onCheckedChange={(enabled) =>
                                                               handleToggleAccess(feature.id, 'production', enabled)
                                                            }
                                                            disabled={isUpdating}
                                                         />
                                                      )}
                                                   </div>
                                                </div>
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
                                    No permissions found for {getRoleDisplayName(role)} role. Features will appear here once they are created.
                                 </p>
                              </div>
                           )}
                        </TabsContent>
                     );
                  })}
                               </Tabs>
            </CardContent>
         </Card>
      </div>
   );
} 