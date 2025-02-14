import { Link } from "react-router";
import PrimaryButton from "../Primaributton/PrimaryButton";
import useAuth from "../../Hooks/useAuth";
import { FaArrowLeft } from "react-icons/fa";


const Navbar = () => {
    const { user ,signOutUser} = useAuth()
    const handleSignOut =()=>{
        signOutUser()
    }
    const linkes = <>
        <Link to="/">Home</Link>
    </>

    const profile = <>

        {
            user ? <>
                <div className="drawer drawer-end">

                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content ">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-4" className="drawer-button ">
                            <img src={user?.photoURL} alt="Profile" className="border md:w-12 md:h-12 w-8 h-8 rounded-full" /></label>
                    </div>
                    <div className="drawer-side z-50">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className={`bg-[#033B4C]  mt-[80px]   lg:w-[30%] md:w-[30%] w-[90%]  p-4  flex flex-col justify-center items-center`}>
                            <img src={user?.photoURL} alt="Profile" className="border md:w-20 md:h-20 w-8 h-8 rounded-full" />
                            <li onClick={handleSignOut} className="py-3 my-7 cursor-pointer w-full border-y text-white flex items-center gap-4"><FaArrowLeft></FaArrowLeft>Log Out</li>

                        </ul>
                    </div>
                </div>
            </>
                :
                <Link to="/register"><PrimaryButton text={"Register"}></PrimaryButton></Link>
        }

    </>
    return (
        <div className="bg-sky-100 py-2">
            <div className="navbar  w-[90%] m-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {linkes}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-3xl uppercase text-sky-800">Users</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {linkes}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div>{profile}</div>
                </div>
            </div>

        </div>
    );
};

export default Navbar;