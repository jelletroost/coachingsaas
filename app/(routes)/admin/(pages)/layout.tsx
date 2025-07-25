import AdminDashboard from "@/components/layouts/AdminDashboard";
import { QueryProvider } from "@/lib/providers/queryProviders";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <div>
         <QueryProvider>
            <AdminDashboard>{children}</AdminDashboard>
            <Toaster position="top-center" />
         </QueryProvider>
      </div>
   );
}
