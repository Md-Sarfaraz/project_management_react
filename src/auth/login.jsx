import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, CardFooter, Modal, ModalHeader, ModalBody, ModalFooter, Input, Typography, Button } from '@material-tailwind/react'
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/auth-context';

const Login = () => {
    const navigate = useNavigate()
    const { loginUser } = useContext(AuthContext)
    const [error, setError] = useState({ username: false, password: false })
    const [user, setUser] = useState({
        name: "",
        username: "",
        password: "",
        role: "",
    })
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value })
        //  console.log(user);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(user.username==="dummy"){
            setError({ username: false, password: false })
            navigate("/");
            return
        }
        try {
            await loginUser(user.username, user.password, (error) => {
                if (error?.data) {
                    if (error.data.error.includes("Username")) {
                        setError({ ...error, username: true })
                    } else {
                        setError({ ...error, password: true })
                    }
                } else {
                    setError({ username: false, password: false })
                    navigate("/");
                }
            });
        } catch (error) {
            console.error(error);
        }


    }



    return (
        <div className=' absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2'>
            <div className=' md:px-2 max-w-sm w-auto'>
                <Card className='drop-shadow-xl -mt-8 md:mt-0'>
                    <CardHeader color="blue" size="lg" className='px-4 py-4'>
                        <Typography variant={"h3"} className="text-center">Login</Typography>
                    </CardHeader>
                    <CardBody className=' '>
                        <div className="mt-4 mb-8 px-4">
                            <Input type="text" color="light-blue" label="Username" error={error.username}
                                icon={<i className="account_circle" />} value={user.username} onChange={handleInput} name="username" />
                        </div>

                        <div className="mb-4 px-4">
                            <Input type="password" color="light-blue" label="password" error={error.password}
                                icon={<i className="lock" />} value={user.password} onChange={handleInput} name="password" />
                        </div>
                    </CardBody>
                    <CardFooter>
                        <div className="px-2 md:px-4  py-3 flex flex-row justify-between bg-white">
                            <Button color="indigo" variant='text' size="sm" ripple onClick={() => navigate("/signup")}>Don't have an account?</Button>
                            <Button color="blue-grey" variant='text' size="sm" ripple onClick={() => navigate("/forget")}>Forget Password?</Button>
                        </div>
                        <div className="flex justify-center mt-6">
                            <Button color="light-blue" variant='text' size="lg" ripple onClick={handleSubmit}>
                                Login
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>)
}

export default Login