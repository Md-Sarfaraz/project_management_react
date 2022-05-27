import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Menu,  IconButton, Input, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';
import ProfilePicture from '../assets/img/team-1-800x800.jpg';
import { MdFingerprint, MdOutlineMenu, MdClose } from "react-icons/md";
import { ImUserPlus, ImNewspaper } from 'react-icons/im'
import { MdHome, MdInfo } from 'react-icons/md'
import CustomLink from '../utility/custom-link';
import { AuthContext } from '../context/auth-context';


export default function Navbar({ showSidebar, setShowSidebar, noSideBar }) {
    const location = useLocation().pathname;
    const navigate = useNavigate();
    const { isLoggedIn, logoutUser, currentUser } = useContext(AuthContext)


    useEffect(() => {
        //  console.log("isLoggedIn : ", isLoggedIn)
    }, [isLoggedIn])



    return (
        <nav className={(noSideBar ? "" : "md:ml-64") + " bg-light-blue-500  py-6 px-3"}>
            <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
                <div className={(noSideBar ? "hidden " : "") + " md:hidden"}>
                    <IconButton color="indigo" variant='text' size="lg"
                        ripple onClick={() => setShowSidebar('left-0')}>
                        <MdOutlineMenu className='w-6 h-6' />
                    </IconButton>
                    <div className={`absolute top-2 md:hidden ${showSidebar === 'left-0' ? 'left-64' : '-left-64'} z-50 transition-all duration-300`}                    >
                        <IconButton color="blue-grey" variant='text' size="lg"
                            ripple onClick={() => setShowSidebar('-left-64')}>
                            <MdClose className='h-6 w-6' />
                        </IconButton>
                    </div>
                </div>

                <div className="flex flex-wrap justify-between items-center w-full">
                    <div className="flex flex-wrap gap-2 text-white">
                        <div className="rounded-lg mb-4 hover:bg-blue-500">
                            <CustomLink to={"/"}
                                className="flex items-center gap-4 text-sm  font-light px-4 py-3  rounded-lg" >
                                <MdHome className='p-0 w-6 h-6' />Home</CustomLink>
                        </div>
                        <div className="rounded-lg mb-4 hover:bg-blue-500">
                            <CustomLink to={"/blog"}
                                className="flex items-center gap-4 text-sm  font-light px-4 py-3  rounded-lg" >
                                <ImNewspaper className='p-0 w-6 h-6' />Blog</CustomLink>
                        </div>
                        <div className="rounded-lg mb-4 hover:bg-blue-500">
                            <CustomLink to={"/about"}
                                className="flex items-center gap-4 text-sm  font-light px-4 py-3  rounded-lg" >
                                <MdInfo className='p-0 w-6 h-6' />About</CustomLink>
                        </div>
                    </div>
                    {/* <h4 className="uppercase text-white text-sm tracking-wider mt-1">

                        {location === '/'
                            ? 'Home'
                            : location.toUpperCase().replace('/', '')}
                    </h4> */}

                    <div className="flex">
                        <div className="hidden md:block">
                            <Input className='hidden md:block' variant='standard' label="Search All" icon={<i className="search" />} />

                        </div>
                        <div className={(isLoggedIn ? "hidden " : "") + " mr-4 ml-6 my-auto inline-flex"}>

                            {location === '/login' ?
                                <CustomLink className={" inline-flex items-center w-24 px-2 py-2  rounded-lg text-white "}
                                    to={"/signup"}>
                                    <ImUserPlus className='w-4 h-4 mr-2' /> SignUp
                                </CustomLink> :
                                <CustomLink className={" inline-flex items-center px-4 py-2  rounded-lg text-white "}
                                    to={"/login"}>
                                    <MdFingerprint className='w-4 h-4 mr-2' /> Login
                                </CustomLink>
                            }
                        </div>
                        <div className={(isLoggedIn ? "" : "hidden ") + " -mr-4 ml-6"}>
                            <Menu>
                                <MenuHandler>
                                    {/*   <Avatar src={ProfilePicture} variant="circular" className=' mx-2 my2' size='md' /> */}
                                    <Button size='sm' color='indigo' variant='outlined'>Logged In : {currentUser.name}</Button>
                                </MenuHandler>
                                <MenuList className='px-0 '>
                                    <MenuItem className='hover:bg-blue-grey-200' onClick={() => { navigate("/") }}>Dashboard</MenuItem>
                                    <MenuItem className='hover:bg-blue-grey-200' onClick={() => { navigate("/user/view", { state: { data: currentUser } }) }}>Profile</MenuItem>
                                    <MenuItem className='hover:bg-blue-grey-200' onClick={() => {
                                        logoutUser();
                                        navigate("/login");

                                    }}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    );
}
