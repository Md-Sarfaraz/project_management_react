
import { useEffect, useState } from 'react';
import { MdWork, MdEmail } from 'react-icons/md'
import { Card, CardBody, Typography, } from "@material-tailwind/react";

export default function ProfileCard({ userProfile }) {

    const [user, setUser] = useState({
        "name": "",
        "id": 302,
        "address": "",
        "active": false,
        "username": "",
        "roles": [],
        "password": "",
        "projects": [],
        "dob": "",
        "email": "",
        "mobile": ""
    })

    useEffect(() => {
        setUser(userProfile)
       // console.log(user)

    }, [userProfile])

    return (
        <Card className='w-auto relative'>
            <CardBody>
                {/* <div className="w-40 px-4 -mt-20 x-center ">
                    <Avatar src={ProfilePicture} variant="circular" size='xxl' />
                </div> */}
                <div className="flex flex-wrap justify-center">

                    <div className="w-full flex justify-between py-4 lg:pt-4 pt-8">
                        <div className="p-4 text-center  shadow shadow-blue-grey-50 rounded-lg">
                            <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                                22
                            </span>
                            <span className="text-sm text-gray-700">Projects</span>
                        </div>
                        <div className="p-4 text-center shadow shadow-blue-grey-50 rounded-lg">
                            <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                                89
                            </span>
                            <span className="text-sm text-gray-700">Tickets</span>
                        </div>
                        <div className="p-4 text-center shadow shadow-blue-grey-50 rounded-lg">
                            <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                                10
                            </span>
                            <span className="text-sm text-gray-700">Photos</span>
                        </div>
                    </div>

                </div>
                <div className="text-center mt-8
                ">
                    <Typography variant="h5" color="grey">{(user.name ? user.name : "")}</Typography>
                    <div className="mt-8 mb-2 text-gray-700 flex items-center justify-center gap-2">
                        <MdEmail className='h-5 w-5' />{user?.email}</div>
                    <div className="mb-2 text-gray-700 mt-8 flex items-center justify-center gap-2">
                        <MdWork className={'w-5 h-5'} />{
                            user?.roles?.map((rol) => {
                                return (<span className='text-indigo-900 font-bold'>
                                    {rol.replace("ROLE_", " ")}
                                </span>)
                            })
                        }
                    </div>
                    <div className="mb-2 mt-8 text-gray-700 flex items-center justify-center gap-2">
                        <i name="account_balance" size="xl" />
                        University of Computer Science
                    </div>
                </div>

                <div className="border-t border-lightBlue-200 text-center px-2 ">
                    <Typography color="blue-grey">
                        {(user.address ? user.address : " NA")}
                    </Typography>
                </div>
            </CardBody>
            {/* <CardFooter>
                <div className="w-full flex justify-center -mt-8">
                    <a href="#pablo" className="mt-5" onClick={(e) => e.preventDefault()}>
                        <Button color="purple" variant='text' ripple >Show more</Button>
                    </a>
                </div>
            </CardFooter> */}
        </Card>


    );
}
