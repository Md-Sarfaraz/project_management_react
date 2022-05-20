import { useContext, useEffect, useState } from 'react';
import CustomLink from "../utility/custom-link";
import AdminNavbar from './AdminNavbar';
import Auth from '../services/auth-service';
import { useNavigate } from 'react-router-dom';
import { Typography, IconButton } from '@material-tailwind/react';
import { MdHome, MdDashboard, MdBugReport, MdAccountTree, MdArrowDropDown, MdArrowDropUp, MdGroups, MdLogout } from 'react-icons/md'
import { AuthContext } from '../context/auth-context';


export default function Sidebar() {
    const navigate = useNavigate()
    const { logoutUser, isLoggedIn } = useContext(AuthContext)
    const [showSidebar, setShowSidebar] = useState('-left-64');
    const [navValues, setNavValues] = useState({
        ticketdrop: false,
        projectdrop: false,
        userdrop: false,
        sidebar: true
    });

    const showNav = () => {
        setNavValues({ ...navValues, sidebar: true })
    }



    return (<>
        <AdminNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <div className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto 
                flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`} >
            <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
                <a href="" className="mt-2 text-center w-full inline-block">
                    <Typography variant="h5" color="deep-purple">Project Management</Typography>
                </a>
                <div className="flex flex-col">
                    <hr className="my-4 min-w-full" />
                    <ul className="flex-col min-w-full flex list-none">
                        <li className={(Auth.isLoggedIn() ? " " : "hidden ") + " hover:bg-light-blue-500 hover:text-white rounded-lg mb-4"}>
                            <CustomLink to={"/"}
                                className="flex items-center gap-4 text-sm  font-light px-4 py-3 rounded-lg" >
                                <MdDashboard className="w-6 h-6" />Dashboard</CustomLink>
                        </li>
                        <hr className="mb-4 min-w-full" />  {/* Rular ######## */}

                        <li className="rounded-lg mb-4">
                            <div className="flex items-center gap-4 select-none hover:bg-light-blue-500 hover:text-white text-sm  font-light px-4 py-3 rounded-lg"
                                onClick={() => { setNavValues({ ...navValues, userdrop: !navValues.userdrop }) }}>
                                <div className="flex justify-between w-full items-center">
                                    <MdGroups className="h-6 w-6" />Members
                                    <MdArrowDropUp className={(navValues.userdrop ? "" : "hidden") + " h-6 w-6"} />
                                    <MdArrowDropDown className={(navValues.userdrop ? "hidden" : "") + " h-6 w-6"} />
                                </div>
                            </div>
                            <div className={(navValues.userdrop ? '  ' : 'hidden ') + " leading-7 text-left text-sm font-thin mt-2 w-4/5 mx-auto"}>
                                <CustomLink onClick={showNav} to={"/user/add"} >
                                    <h1 className="cursor-pointer p-2 hover:bg-light-blue-500 hover:text-white rounded-md mt-1 pl-3">Add Member</h1>
                                </CustomLink>
                                <CustomLink onClick={showNav} to={'/user'}>
                                    <h1 className="cursor-pointer p-2 hover:bg-light-blue-500 hover:text-white rounded-md mt-1 pl-3">All Member</h1>
                                </CustomLink>

                                <CustomLink onClick={showNav} to={'/user/roles'}>
                                    <h1 className="cursor-pointer p-2 hover:bg-light-blue-500 hover:text-white rounded-md mt-1 pl-3">Manage Roles</h1>
                                </CustomLink>
                            </div>
                        </li>

                        <li className="rounded-lg mb-4">
                            <div className="flex items-center gap-4  hover:bg-light-blue-500 hover:text-white select-none hover:bg-sky-300 text-sm  font-light px-4 py-3 rounded-lg"
                                onClick={() => { setNavValues({ ...navValues, projectdrop: !navValues.projectdrop }) }}>
                                <div className="flex justify-between w-full items-center">
                                    <MdAccountTree className="h-6 w-6" />Projects
                                    <MdArrowDropUp className={(navValues.projectdrop ? "" : "hidden") + " h-6 w-6"} />
                                    <MdArrowDropDown className={(navValues.projectdrop ? "hidden" : "") + " h-6 w-6"} />
                                </div>
                            </div>
                            <div className={(navValues.projectdrop ? '  ' : 'hidden ') + " leading-7 text-left text-sm font-thin mt-2 w-4/5 mx-auto"}>
                                <CustomLink onClick={showNav} to={"/project/add"} >
                                    <h1 className="cursor-pointer p-2 hover:bg-sky-200 hover:bg-light-blue-500 hover:text-white rounded-md mt-1 pl-3">Add Project</h1>
                                </CustomLink>
                                <CustomLink onClick={showNav} to={'/project'}>
                                    <h1 className="cursor-pointer p-2 hover:bg-sky-200 hover:bg-light-blue-500 hover:text-white rounded-md mt-1 pl-3">All Projects</h1>
                                </CustomLink>
                            </div>
                        </li>
                        <li className="rounded-lg mb-4">
                            <div className="flex items-center gap-4 select-none hover:bg-sky-300 text-sm hover:bg-light-blue-500 hover:text-white font-light px-4 py-3 rounded-lg"
                                onClick={() => { setNavValues({ ...navValues, ticketdrop: !navValues.ticketdrop }) }}>
                                <div className="flex justify-between w-full items-center">
                                    <MdBugReport className="h-6 w-6" />Tickets
                                    <MdArrowDropUp className={(navValues.ticketdrop ? "" : "hidden") + " h-6 w-6"} />
                                    <MdArrowDropDown className={(navValues.ticketdrop ? "hidden" : "") + " h-6 w-6"} />
                                </div>
                            </div>
                            <div className={(navValues.ticketdrop ? '  ' : 'hidden ') + " hover:bg-light-blue-500 hover:text-white leading-7 rounded-lg text-left text-sm font-thin mt-2 w-4/5 mx-auto"}>
                                <CustomLink onClick={showNav} to={"/ticket"} >
                                    <h1 className="cursor-pointer p-2 hover:bg-sky-200 hover:text-white rounded-md mt-1 pl-3">Manage Tickets</h1>
                                </CustomLink>

                            </div>
                        </li>

                    </ul>

                    <ul className="flex-col min-w-full flex list-none absolute bottom-0">
                        <li className={(isLoggedIn ? " " : "hidden ") + " bg-gradient-to-tr from-red-500  to-red-800 px-4 rounded-lg text-white mb-2"}>
                            <a href="#" className="flex items-center gap-4 text-sm font-light py-3" onClick={() => {
                                logoutUser();
                                navigate("/login");

                            }}>
                                <MdLogout className="h-6 w-6" />Log Out</a>
                        </li>



                    </ul>
                </div>
            </div>
        </div>
    </>
    );
}
