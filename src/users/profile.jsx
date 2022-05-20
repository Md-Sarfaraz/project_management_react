import React, { useState, useEffect } from 'react'
import UserService from "../services/user-service";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileCard from './components/ProfileCard';
import { InputField } from '../components/InputField';
import { Button, Input, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Textarea, Typography } from '@material-tailwind/react';

const Profile = () => {
    const [openTab, setOpenTab] = useState(1);
    const { state } = useLocation();
    const service = UserService();
    const navigate = useNavigate();
    const [user, setUser] = useState(state.data); // for User details update in setting tab
    const [userData, setUserData] = useState({}); // for side info card
    const [userCred, setUserCred] = useState({
        id: user.id,
        username: user.username,
        oldpassword: '',
        newpassword: '',
        confirmpassword: '',
    });  // for User credentials update in setting tab
    const [notify, setNotify] = useState({
        updated: false,
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            id: user.id,
            name: user.name,
            email: user.email,
            dob: user.dob,
            mobile: user.mobile,
            address: user.address,
        }
        const updateStatus = await service.updateUser(data)
        callingServerForUserData()
        setNotify({ ...notify, updated: true })

    }
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value })
        setNotify({ ...notify, updated: false })

    }
    const handleCredInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserCred({ ...userCred, [name]: value })
        setNotify({ ...notify, updated: false })

    }

    const handleCredSubmit = async (e) => {
        e.preventDefault();
        console.log("cred submited", userCred);
        if (!userCred.id) return
        if (!userCred.username) return
        if (!userCred.oldpassword) return
        if (userCred.newpassword.length >= 4 && userCred.newpassword === userCred.confirmpassword) {
            let cred = {
                id: userCred.id,
                oldpassword: userCred.oldpassword,
                newpassword: userCred.newpassword,
            }
            const res = await service.updatePassword(cred)
            console.log(res)

        }


    }

    const callingServerForUserData = async () => {
        const res = await service.getOneUserWithInfo(state.data.id)
        const newdata = JSON.parse(JSON.stringify(res).replace(/\:null/gi, "\:\"\""));
        setUserData(newdata)
        setUser({ ...user, newdata })
    }

    useEffect(() => {
        callingServerForUserData()

    }, [])


    return (<>
        <div className="bg-light-blue-500 px-3 md:px-8 h-32" />
        <div className=" -mt-24 px-3 py-2 min-h-screen ">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-4 mt-4">
                    <ProfileCard userProfile={userData} />
                </div>
                <div className="col-span-12 md:col-span-8 mt-4">
                    <Tabs value={"settings"} >
                        <TabsHeader  className='bg-amber-500'>
                            {/* <Tab value={"activity"}>
                                Activity
                            </Tab>
                            <Tab value={"project"}>
                                Projects
                            </Tab>
                            <Tab value={"tickets"}>
                                Tickets / Issues
                            </Tab> */}
                            <Tab value={"settings"}>
                                Settings
                            </Tab>
                        </TabsHeader>
                        <TabsBody className="">
                            <TabPanel value={"activity"}  className={"bg-white rounded-xl drop-shadow-md  my-2"}>
                                <Typography color="indigo">Activity is Not Done</Typography>
                            </TabPanel>
                            <TabPanel value={"project"} className={"bg-white rounded-xl drop-shadow-md  my-2"}>
                                <Typography color="indigo">Project is Not Done</Typography>
                            </TabPanel>
                            <TabPanel value={"tickets"} className={"bg-white rounded-xl drop-shadow-md  my-2"}>
                                <Typography color="indigo">Tickets is Not Done</Typography>
                            </TabPanel>
                            <TabPanel value={"settings"} className={"bg-white rounded-xl drop-shadow-md  my-2"}>
                                <div className="">
                                    <form>
                                        <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">User Information</h6>
                                        <div className="flex flex-wrap mt-10 text-left">
                                            <input hidden defaultValue={user.id} />
                                            <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                                <Input type="text" color="purple" placeholder="Full Name"
                                                    value={user.name} onChange={handleInput} name="name" />
                                            </div>
                                            <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                                <Input type="email" color="purple" placeholder="Email Address"
                                                    value={user.email} onChange={handleInput} name="email" />
                                            </div>
                                            <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                                <Input type="date" color="purple" placeholder="Date of Birth"
                                                    value={user.dob} onChange={handleInput} name="dob" />
                                            </div>
                                            <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                                <Input type="text" color="purple" placeholder="Mobile Number"
                                                    value={user.mobile} onChange={handleInput} name="mobile" />
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap mt-10 font-light text-left">
                                            <Textarea color="purple" placeholder="Address"
                                                value={user.address} onChange={handleInput} name="address" />
                                        </div>
                                        <div className='flex flex-wrap mt-10 font-light justify-end'>
                                            <Button color="green" onClick={handleSubmit} ripple >
                                                Update Information
                                            </Button>
                                        </div>
                                        <hr className="px-8 my-8 bg-slate-500" />
                                        <h6 className="text-red-500 text-sm my-6 font-light uppercase">
                                            Login Credentials
                                        </h6>
                                        <div className="flex flex-wrap mt-10">
                                            <div className="w-full lg:w-12/12 mb-10 font-light text-center">
                                                <Input type="text" color="purple" placeholder="Username" disabled
                                                    value={userCred.username} onChange={handleCredInput} name="username" />
                                            </div>
                                            <div className="w-full lg:w-4/12 pr-4 mb-10 font-light">
                                                <InputField type="password" color="purple" placeholder="Current Paasword"
                                                    value={userCred.oldpassword} name="oldpassword" onChange={handleCredInput} />
                                            </div>
                                            <div className="w-full lg:w-4/12 px-4 mb-10 font-light">
                                                <InputField type="password" color="purple" placeholder="New Password"
                                                    value={userCred.newpassword} onChange={handleCredInput} name="newpassword" />
                                            </div>
                                            <div className="w-full lg:w-4/12 pl-4 mb-10 font-light">
                                                <InputField type="password" color="purple" placeholder="Confirm Password"
                                                    value={userCred.confirmpassword} onChange={handleCredInput}
                                                    name="confirmpassword" />
                                            </div>
                                        </div>
                                        <div className='flex flex-wrap mt-10 font-light justify-end'>
                                            <Button color="teal" onClick={handleCredSubmit}
                                                ripple >
                                                Update Password
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
                </div>
                {/* ----------- */}

            </div>
        </div >
    </>)
}

export default Profile