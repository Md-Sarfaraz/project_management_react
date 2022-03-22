import React, { useEffect, useState } from 'react'
import Card from '../components/card'
import Header from '../components/header'
import { useNavigate } from "react-router-dom";
import { api } from '../services/database';

const AddUser = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmpass: "",
        dob: "",
        contact: "",
        address: "",
    });

    const saveToServer = async () => {
        let data = {
            name: user.name,
            email: user.email,
            username: user.username,
            password: user.password,
            dob: user.dob,
            mobile: user.contact,
            address: user.address,
        }
        console.log(data)
        // const res = await api.post('/user/save', data);
        // console.log(res.data)
        // if (res.data.id) {
        //     navigate('/user')
        // }

    }

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser({ ...user, [name]: value })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.password !== user.confirmpass) {
            alert("Password and Comfirm Password not Same")
        } else if (user.password.length < 4) {
            alert('Password Must be 5 Character Long')
        }
        saveToServer()
    }



    return (
        <>
            <Header />

            <div className='m-content bg-slate-200 z-0 p-8 mt-14 min-h-screen grid grid-cols-12'>
                <div className="mt-16 col-span-8 col-start-3">
                    <Card card={{ title: 'Add New Member' }}>
                        <div className='bg-grd-dark rounded-b-lg'>
                            <div className="w-full">
                                <form className=" px-8 pt-6 pb-8 mb-4 grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                                    <div className="mb-4 col-span-2">
                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="name">Name</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 focus:bg-slate-700 
                                     text-white leading-tight focus:outline-none focus:shadow-outline"
                                            type="text" value={user.name} onChange={handleInput} name="name" id="name" autoComplete='off' placeholder="Full Name" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="email">Email</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 focus:bg-slate-700 
                                     text-white leading-tight focus:outline-none focus:shadow-outline"
                                            type="text" value={user.email} onChange={handleInput} name="email" id="email" autoComplete='off' placeholder="Email" />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="username">Username</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 focus:bg-slate-700 
                                     text-white leading-tight focus:outline-none focus:shadow-outline"
                                            type="text" value={user.username} onChange={handleInput} name="username" id="username" autoComplete='off' placeholder="Username" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="password">Password</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 focus:bg-slate-700 
                                     text-white leading-tight focus:outline-none focus:shadow-outline"
                                            type="password" value={user.password} onChange={handleInput} name="password" id="password" autoComplete='off' placeholder="passowrd" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="cpass">Confirm Password</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 focus:bg-slate-700 
                                     text-white leading-tight focus:outline-none focus:shadow-outline"
                                            type="password" value={user.confirmpass} onChange={handleInput} name="confirmpass" id="cpass" autoComplete='off' placeholder="password" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="dob">Date of Birth</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 focus:bg-slate-700 
                                     text-white leading-tight focus:outline-none focus:shadow-outline"
                                            type="date" value={user.dob} onChange={handleInput} name="dob" id="dob" autoComplete='off' placeholder="Dateof Birth" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="contact">Contact Number</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 focus:bg-slate-700 
                                     text-white leading-tight focus:outline-none focus:shadow-outline"
                                            type="text" value={user.contact} onChange={handleInput} name="contact" id="contact" autoComplete='off' placeholder="Contact" />
                                    </div><div className="mb-4 col-span-2">
                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="address">Address</label>
                                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 focus:bg-slate-700 
                                     text-white leading-tight focus:outline-none focus:shadow-outline"
                                            type="textarea" value={user.address} onChange={handleInput} name="address" id="address" autoComplete='off' placeholder="Full Address" />
                                    </div>
                                    <div className="mb-4 flex justify-start">
                                        <input className="py-2 px-3 btn-sky rounded text-white"
                                            type="button" value={"Back"} />
                                    </div>
                                    <div className="mb-4 flex justify-end">
                                        <input className="py-2 px-3 btn-purple rounded text-white"
                                            type="submit" value={"Add Member"} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Card >
                </div >
            </div >
        </>)
}

export default AddUser  