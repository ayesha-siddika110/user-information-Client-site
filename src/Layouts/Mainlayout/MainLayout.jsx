import { Outlet, useLocation } from "react-router";
import Navbar from "../../Componants/Navbar/Navbar";
import { Toaster } from "react-hot-toast";


const MainLayout = () => {
    const location = useLocation()
    const path = location.pathname === "/register" || location.pathname === "/login"
    return (
        <div>
            <Toaster />
            {!path && <Navbar></Navbar>}
            <Outlet></Outlet>
            
            
        </div>
    );
};

export default MainLayout;