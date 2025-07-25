import { UsersManagement } from "@/components/admin/users/UsersManagement";

export default function AdminUsersPage() {
   return (
      <div className="p-6">
         <div className="mb-6">
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground">
               Manage all users, patients, coaches, and administrators
            </p>
         </div>
         <UsersManagement />
      </div>
   );
}
