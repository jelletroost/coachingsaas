import React from "react";

const AdminDashboard = ({ children }: { children: React.ReactNode }) => {
   return (
      <div>
         <h2>Admin Dashboard</h2>
         {children}
      </div>
   );
};

export default AdminDashboard;
