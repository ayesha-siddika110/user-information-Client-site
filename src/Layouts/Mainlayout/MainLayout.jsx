import { Outlet, useLocation } from "react-router";
import Navbar from "../../Componants/Navbar/Navbar";


const MainLayout = () => {
    const location = useLocation()
    const path = location.pathname === "/register" || location.pathname === "/login"
    return (
        <div>
            {!path && <Navbar></Navbar>}
            <Outlet></Outlet>
            
            
        </div>
    );
};

export default MainLayout;