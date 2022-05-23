import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, } from '@material-tailwind/react';
import { Button, Input, Textarea } from '@material-tailwind/react';
import AuthContext from '../context/auth-context'
import { InputField } from '../components/InputField';

const SignUp = () => {
    const navigate = useNavigate();
    const { signUpUser } = useContext(AuthContext);
    const [pass, setPass] = useState(false);
    const [isValue, setIsValue] = useState(false);

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

    useEffect(() => {
        const tempSet = async () => {
            setUser({ ...user, password: "rajraj" });
            setUser({ ...user, confirmpass: "rajraj" });
            console.error("Testing Only ")
        }
        //  tempSet()


    }, [])



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
        // const res = await api.post('/user/save', data);
        // console.log(res.data)
        // if (res.data.id) {

        // }
        await signUpUser(data, () => {
            navigate('/user')
        })


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
        console.log(user);

        // saveToServer()
    }


    return (<>
        <div className='z-0 p-2 md:p-8 mt-12 md:mt-8 grid grid-cols-12'>
            <div className=" col-span-10 col-start-2">
                <Card className='md:x-center  y-center mb-6'>
                    <CardHeader color="blue" className='p-4'>
                        <div className="w-full flex items-center justify-between">
                            <h2 className="text-white text-2xl">Sign Up</h2>
                            <Button color="blue" size="lg" onClick={() => { navigate(-1) }} >
                                Back
                            </Button>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <form >
                            <h6 className="text-blue-500 text-sm mt-3 mb-6 font-light uppercase">
                                User Information
                            </h6>
                            <div className="flex flex-wrap mt-10 ">
                                <div className="w-full lg:w-12/12 mb-10 font-light">
                                    <Input type="text" color="blue" placeholder="Full Name"
                                        value={user.name} onChange={handleInput} name="name" />
                                </div>
                                <div className="w-full lg:w-6/12 md:pr-4 mb-10 font-light">
                                    <Input type="email" color="blue" placeholder="Email Address"
                                        value={user.email} onChange={handleInput} name="email" />
                                </div>
                                <div className="w-full lg:w-6/12 md:pl-4 mb-10 font-light">
                                    <Input type="text" color="blue" placeholder="Username"
                                        value={user.username} onChange={handleInput} name="username" />
                                </div>
                                <div className="w-full lg:w-6/12 md:pr-4 mb-10 font-light" >
                                    <Input type={"password"} placeholder="Password" color="blue"
                                        value={user.password} onChange={handleInput} name="password" />
                                </div>
                                <div className="w-full lg:w-6/12 md:pl-4 mb-10 font-light">
                                    <Input type={"password"} placeholder="Confirm Password" color="blue"
                                        value={user.confirmpass} onChange={handleInput} name="confirmpass" />
                                </div>
                                <div className="w-full lg:w-6/12 md:pr-4 mb-10 font-light">
                                    <Input type="date" color="blue" placeholder="Date of Birth"
                                        value={user.dob} onChange={handleInput} name="dob" id="dob" />
                                </div>
                                <div className="w-full lg:w-6/12 md:pl-4 mb-10 font-light">
                                    <Input type="text" color="blue" placeholder="Mobile Number"
                                        value={user.contact} onChange={handleInput} name="contact" />
                                </div>
                            </div>
                            <div className="flex flex-wrap mt-10 font-light">
                                <Textarea color="blue" placeholder="Full Address"
                                    value={user.address} onChange={handleInput} name="address" />
                            </div>
                            <div className="flex flex-wrap justify-between mt-10 font-light">

                                <Button color="light-blue" variant='text' size="md" ripple onClick={(e) => { e.preventDefault(); navigate(-1) }}>
                                    Back
                                </Button>
                                <Button color="light-blue" size="md" ripple onClick={handleSubmit}>
                                    Save
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>

            </div >
        </div >
    </>)
}

export default SignUp  