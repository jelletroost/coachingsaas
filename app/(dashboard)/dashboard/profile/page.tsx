import { ProfileManagement } from "@/components/patient/profile/ProfileManagement";

export default function PatientProfilePage() {
   return (
      <div className="p-6">
         <div className="mb-6">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">
               Manage your personal information, health data, and account
               preferences
            </p>
         </div>
         <ProfileManagement />
      </div>
   );
}
