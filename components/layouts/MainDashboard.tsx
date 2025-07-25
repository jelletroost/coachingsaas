import React from "react";
import Footer from "../shared/footer";
import Header from "../shared/header/header";

const MainDashboard = ({ children }: { children: React.ReactNode }) => {
   return (
      <React.Fragment>
         <Header />
         {children}
         <Footer />
      </React.Fragment>
   );
};

export default MainDashboard;
