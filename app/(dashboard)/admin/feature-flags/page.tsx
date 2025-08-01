import { FeatureFlagManagement } from "@/components/admin/settings/FeatureFlagManagement";

export default function FeatureFlagsPage() {
   return (
      <div className="container mx-auto py-6">
         <div className="mb-6">
            <h1 className="text-3xl font-bold">Feature Flag Management</h1>
            <p className="text-muted-foreground">
               Control feature access for different user roles across the platform.
            </p>
         </div>
         <FeatureFlagManagement />
      </div>
   );
} 