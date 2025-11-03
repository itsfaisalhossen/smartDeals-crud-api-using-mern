import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex-1 h-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default AppLayout;
