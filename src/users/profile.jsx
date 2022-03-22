import React, { useState, useEffect } from 'react'
import Header from '../components/header'
import { getOneUserWithInfo, updateUser } from "../services/user-service";
import { useLocation } from "react-router-dom";

const Profile = () => {
    const [tabs, setTabs] = useState("activity");
    const { state } = useLocation();
    console.log(state.data)
    const [user, setUser] = useState(state.data);
    const [userData, setUserData] = useState({});
    const [userCred, setUserCred] = useState({});

    const handleSubmit = async(e) => {
        e.preventDefault();
        let data = {
            name: user.name,
            email: user.email,
            dob: user.dob,
            mobile: user.mobile,
            address: user.address,
        }
        console.log(data)
        //const updateStatus = await updateUser(data)
        //console.log('updated > ', updateStatus)


    }
    const handleInput = (e) => {
        
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value })
    }

    const callingServerForUserData = async () => {
        
        const data = await getOneUserWithInfo(state.data.id)

        setUserData(data)
    }

    useEffect(() => {
        callingServerForUserData()

    }, [])


    return (<>
        <Header />
        <div className="m-content mt-14 px-3 py-2 min-h-screen ">
            <div className="grid grid-cols-12 ">
                <div className="col-span-3 mt-4">
                    <div className="p-4 bg-slate-50 rounded-md border-t-4 border-indigo-800 shadow-md shadow-indigo-600 flex flex-col text-center font-sans">
                        <img className='h-24 w-24 p-2 mx-auto rounded-full' src="https://via.placeholder.com/128x128" alt="Profile" />
                        <h1>{user.name}</h1>
                        <p>Role</p>
                        <hr className='my-2' />
                        <div className="px-2 py-2 flex justify-between ">
                            <h3 className='font-bold'>Total Projects</h3>
                            <h6 className='font-semibold text-blue-900'>9999</h6>
                        </div>
                        <hr className='my-2' />
                        <div className="px-2 py-2 flex justify-between ">
                            <h3 className='font-bold'>Total Issue Resolved</h3>
                            <h6 className='font-semibold text-blue-900'>999999</h6>
                        </div>
                        <hr className='my-2' />
                        <button className='px-3 py-2 btn-indigo text-white rounded '>Follow</button>
                    </div>
                    <div className="mt-4 pb-4 shadow-md rounded-md bg-slate-50 shadow-indigo-500">
                        <div className="px-3 py-3 mx-auto text-center rounded-t-md bg-indigo-800 text-white">About</div>
                        <div className="px-4 py-2 rounded-b-md ">
                            <h3 className='font-bold'>Current Working Project</h3>
                            <p className='text-gray-700 pr-4 mx-auto text-right'>Spring Boot Rest API</p>
                        </div>
                        <hr className='my-2 mx-6' />
                        <div className="px-4 py-2 rounded-b-md bg-slate-50">
                            <h3 className='font-bold'>Email</h3>
                            <p className='text-gray-700 pr-4 mx-auto text-right'>{userData.email}</p>
                        </div>
                        <hr className='my-2 mx-6' />
                        <div className="px-4 py-2 rounded-b-md bg-slate-50">
                            <h3 className='font-bold'>Contact</h3>
                            <p className='text-gray-700 pr-4 mx-auto text-right'>{userData.mobile}</p>
                        </div>
                        <hr className='my-2 mx-6' />
                        <div className="px-4 py-2 rounded-b-md bg-slate-50">
                            <h3 className='font-bold'>Address</h3>
                            <p className='text-gray-700'>{userData.address}</p>
                        </div>

                    </div>
                </div>
                {/* ----------- */}
                <div className="col-span-9 p-4">
                    <div className="bg-slate-50 rounded-md shadow shadow-indigo-600 ">
                        <div className="flex flex-row px-4 py-2" >
                            <button className={(tabs === 'activity' ? " btn-indigo text-white " : " ") + 'px-3 py-2 mx-2 font-semibold rounded-md hover:text-white  hover:btn-indigo'} onClick={() => { setTabs("activity") }}>Activity</button>
                            <button className={(tabs === 'project' ? " btn-indigo text-white " : " ") + 'px-3 py-2 mx-2 font-semibold rounded-md hover:text-white  hover:btn-indigo'} onClick={() => { setTabs("project") }}>Project/Issues</button>
                            <button className={(tabs === 'timeline' ? " btn-indigo text-white " : " ") + 'px-3 py-2 mx-2 font-semibold rounded-md hover:text-white  hover:btn-indigo'} onClick={() => { setTabs("timeline") }}>Timeline</button>
                            <button className={(tabs === 'settings' ? " btn-indigo text-white " : " ") + 'px-3 py-2 mx-2 font-semibold rounded-md hover:text-white  hover:btn-indigo'} onClick={() => { setTabs("settings") }}>Settings</button>
                        </div>
                    </div> {/* tabs */}

                    <div className="mt-3  bg-slate-50 rounded-md shadow shadow-indigo-600">
                        <div className="px-2 py-2  rounded-md">
                            <div className={(tabs === "activity" ? "" : " hidden ") + "p-4 "}>Activity Under Development</div>{/* Activity */}
                            <div className={(tabs === "project" ? "" : " hidden ") + ""}>projectiss</div>{/* project/issue */}
                            <div className={(tabs === "timeline" ? "" : " hidden ") + "p-4"}>Timeline Under Development</div>{/* timeline */}
                            <div className={(tabs === "settings" ? "" : " hidden ") + ""}>
                                <div className="">
                                    <div className="">

                                        <div className="w-full">
                                            <form className=" px-8 py-4  grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                                                <span className='col-span-2 px-2 rounded-md mx-auto text-center bg-blue-500 text-white text-sm font-serif font font-semibold'>Update Personal Information</span>
                                                <div className="mb-4 ">
                                                    <label className="block  text-sm font-bold mb-2" htmlFor="name">Name</label>
                                                    <input className="shadow appearance-none border rounded w-full py-2 px-3  
                                     leading-tight focus:outline-none focus:shadow-outline"
                                                        type="text" value={user.name} onChange={handleInput} name="name" id="name" autoComplete='off' placeholder="Full Name" />
                                                </div>
                                                <div className="mb-4 ">
                                                    <label className="block  text-sm font-bold mb-2" htmlFor="email">Email</label>
                                                    <input className="shadow appearance-none border rounded w-full py-2 px-3  
                                     leading-tight focus:outline-none focus:shadow-outline"
                                                        type="text" value={user.email} onChange={handleInput} name="email" id="email" autoComplete='off' placeholder="Email" />
                                                </div>

                                               

                                                <div className="mb-4">
                                                    <label className="block  text-sm font-bold mb-2" htmlFor="dob">Date of Birth</label>
                                                    <input className="shadow appearance-none border rounded w-full py-2 px-3  
                                     leading-tight focus:outline-none focus:shadow-outline"
                                                        type="date" value={user.dob} onChange={handleInput} name="dob" id="dob" autoComplete='off' placeholder="Date of Birth" />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block  text-sm font-bold mb-2" htmlFor="contact">Contact Number</label>
                                                    <input className="shadow appearance-none border rounded w-full py-2 px-3  
                                     leading-tight focus:outline-none focus:shadow-outline"
                                                        type="text" value={user.mobile} onChange={handleInput} name="contact" id="contact" autoComplete='off' placeholder="Contact" />
                                                </div><div className="mb-4 col-span-2">
                                                    <label className="block  text-sm font-bold mb-2" htmlFor="address">Address</label>
                                                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3  
                                     leading-tight focus:outline-none focus:shadow-outline"
                                                        type="textarea" value={user.address} onChange={handleInput} name="address" id="address" autoComplete='off' placeholder="Full Address" />
                                                </div>
                                                <div className="mb-4 flex justify-start">
                                                    <input className="py-2 px-3 btn-sky rounded text-white"
                                                        type="button" value={"Back"} />
                                                </div>
                                                <div className="mb-4 flex justify-end">
                                                    <input className="py-2 px-3 btn-green rounded text-white"
                                                        type="submit" value={"Update"} />
                                                </div>
                                            </form>
                                        </div>
                                        <hr className=" mx-8 border-2 border-indigo-800 rounded-full" />
                                        <div className="">
                                            <form className=" px-8 pt-6 pb-8 mb-4 grid grid-cols-3 gap-4 select-none" onSubmit={handleSubmit}>
                                                <span className='col-span-3 px-2 rounded-md mx-auto text-center bg-red-700 text-white font-serif font font-semibold'>Login Credentials</span>
                                                <div className="mb-4 col-span-3">
                                                    <label className="block  text-sm font-bold mb-2" htmlFor="name">Username</label>
                                                    <input className="shadow appearance-none border  bg-slate-200 rounded w-full py-2 px-3  
                                     leading-tight focus:outline-none focus:shadow-outline" disabled
                                                        type="text" value={user.username} onChange={handleInput} name="name" id="name" autoComplete='off' placeholder="Username" />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block  text-sm font-bold mb-2" htmlFor="oldpass">Old Password</label>
                                                    <input className="shadow appearance-none border rounded w-full py-2 px-3  
                                     leading-tight focus:outline-none focus:shadow-outline"
                                                        type="text" name="email" id="oldpass" autoComplete='off' placeholder="Old Password" />
                                                </div>

                                                <div className="mb-4">
                                                    <label className="block  text-sm font-bold mb-2" htmlFor="npass">New Password</label>
                                                    <input className="shadow appearance-none border rounded w-full py-2 px-3  
                                     leading-tight focus:outline-none focus:shadow-outline"
                                                        type="text" name="email" id="npass" autoComplete='off' placeholder="New Password" />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block  text-sm font-bold mb-2" htmlFor="cpass">Confirm Password</label>
                                                    <input className="shadow appearance-none border rounded w-full py-2 px-3  
                                     leading-tight focus:outline-none focus:shadow-outline"
                                                        type="text" name="email" id="cpass" autoComplete='off' placeholder="Confirm Password" />
                                                </div>


                                                <div className="mb-4 flex justify-start">
                                                    <input className="py-2 px-3 btn-sky rounded text-white"
                                                        type="button" value={"Back"} />
                                                </div>
                                                <div className="mb-4 col-span-2 flex justify-end">
                                                    <input className="py-2 px-3 btn-green rounded text-white"
                                                        type="submit" value={"Update"} />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>{/* settings */}
                        </div>
                    </div>  {/* tabes contents */}
                </div>
            </div>
        </div>
    </>)
}

export default Profile