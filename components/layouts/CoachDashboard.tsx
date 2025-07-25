import React from "react";

const CoachDashboard = ({ children }: { children: React.ReactNode }) => {
   return (
      <div>
         <h2>CoachDashboard Layout</h2>
         {children}
      </div>
   );
};

export default CoachDashboard;
