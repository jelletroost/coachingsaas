import { AdminDashboard } from "@/components/admin/overview/AdminDashboard";

export default function AdminDashboardPage() {
   return (
      <div className="p-6">
         <div className="mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
               Overview of your health coaching platform
            </p>
         </div>
         <AdminDashboard />
      </div>
   );
}
