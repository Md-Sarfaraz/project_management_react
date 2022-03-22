import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import { VscProject } from 'react-icons/vsc'
import { CgArrowRightR } from 'react-icons/cg'
import { AiOutlineUp } from 'react-icons/ai'
import { IoCloseSharp } from 'react-icons/io5'


const Navbar = () => {
    const [navValues, setNavValues] = useState({
        dropdwn: false,
        projectdrop: false,
        userdrop: false,

        sidebar: true
    });
    useEffect(() => {

    }, [])

    return ReactDOM.createPortal(<>


        <div className="bg-blue-600  font-sans z-10">
            <span className="absolute text-white text-4xl top-5 left-4 cursor-pointer" onClick={() => { setNavValues({ ...navValues, sidebar: !navValues.sidebar }) }}>
                <CgArrowRightR className='px-2 bg-gray-900 rounded-md ' />
            </span>
            <div className={((navValues.sidebar ? ' hidden ' : '')) + " z-40 fixed top-0 bottom-0 left-0 right-0 bg-modal"}></div>
            <div className={(navValues.sidebar ? ' left-[-240px] md:left-[-280px] ' : '') + " z-40 select-none fixed top-0 bottom-0 lg:left-0 duration-500 " +
                " p-2 w-[240px] md:w-[280px] overflow-y-auto text-center bg-grd-dark shadow h-screen"}>
                <div className="text-gray-100 text-xl">
                    <div className="p-2.5 mt-1 flex items-center rounded-md ">
                        <VscProject className=" bg-blue-600 rounded-md h-12 w-12" />
                        <h1 className="text-[18px]  ml-3 text-xl text-gray-200 font-bold">Project Management</h1>
                        <IoCloseSharp className=" ml-4 cursor-pointer lg:hidden" onClick={() => { setNavValues({ ...navValues, sidebar: !navValues.sidebar }) }} />
                    </div>
                    <hr className="my-2 text-gray-600" />
                    <div className="flex items-center">
                        <img className='h-16 w-16 p-2 rounded-full' src="https://via.placeholder.com/128x128" alt="Profile" />  <span className='ml-3 '> Sarfaraz</span>
                    </div>
                    <hr className="my-2 text-gray-600" />
                    <div>

                        <Link to={"/home"} className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:btn-purple">
                            <i className="bi bi-house-door-fill" />
                            <span className="text-[15px] ml-4 text-gray-200">Home</span>
                        </Link>
                        <Link to={"/blog"} className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:btn-purple">
                            <i className="bi bi-bookmark-fill" />
                            <span className="text-[15px] ml-4 text-gray-200 ">Blog</span>
                        </Link>
                        <hr className="my-4 text-gray-600" />
                        <Link to={"/dashboard"} className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:btn-purple">
                            <i className="bi bi-envelope-fill" />
                            <span className="text-[15px] ml-4 text-gray-200">Dashboard</span>
                        </Link>

                        <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:btn-purple"
                            onClick={() => { setNavValues({ ...navValues, projectdrop: !navValues.projectdrop }) }}>
                            <i className="" />
                            <div className="flex justify-between w-full items-center">
                                <span className="text-[15px] ml-4 text-gray-200">Projects</span>
                                <span className={"text-sm  " + (navValues.projectdrop ? ' rotate-0' : ' rotate-180')} id="arrow">
                                    <AiOutlineUp className="font-bold" />
                                </span>
                            </div>
                        </div>
                        <div className={(navValues.projectdrop ? '  ' : 'hidden ') + " duration-500 leading-7 text-left  text-sm font-thin mt-2 w-4/5 mx-auto"}>
                            <Link to={"/project/add"}>  <h1 className="cursor-pointer p-2 hover:btn-sky rounded-md mt-1 pl-3">Add Project</h1></Link>
                            <Link to={"/project/list"}>  <h1 className="cursor-pointer p-2 hover:btn-sky rounded-md mt-1 pl-3">All Projects</h1></Link>
                        </div>
                        <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:btn-purple"
                            onClick={() => { setNavValues({ ...navValues, userdrop: !navValues.userdrop }) }}>
                            <i className="" />
                            <div className="flex justify-between w-full items-center">
                                <span className="text-[15px] ml-4 text-gray-200">Members</span>
                                <span className={"text-sm  " + (navValues.userdrop ? ' rotate-0' : ' rotate-180')} id="arrow">
                                    <AiOutlineUp className="font-bold" />
                                </span>
                            </div>
                        </div>
                        <div className={(navValues.userdrop ? '  ' : 'hidden ') + " leading-7 text-left text-sm font-thin mt-2 w-4/5 mx-auto"}>
                            <Link to={"/user/add"} ><h1 className="cursor-pointer p-2 hover:btn-sky rounded-md mt-1 pl-3">Add Member</h1></Link>
                            <Link to={'/user'}><h1 className="cursor-pointer p-2 hover:btn-sky rounded-md mt-1 pl-3">All Member</h1></Link>
                            <Link to={'/user/roles'}><h1 className="cursor-pointer p-2 hover:btn-sky rounded-md mt-1 pl-3">All  Roles</h1></Link>
                        </div>
                        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:btn-red">
                            <i className="bi bi-box-arrow-in-right" />
                            <span className="text-[15px] ml-4 text-gray-200">Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>, document.getElementById('sidebar'))
}

export default Navbar