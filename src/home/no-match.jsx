import React from 'react'
import { Link, useNavigate } from 'react-router-dom';


const NoMatch = ({ msg }) => {
    const navigate = useNavigate()
    return (
        <div className='min-h-screen md:m-content z-0'>
            <div className="">
                <div className="flex items-center justify-center  h-screen bg-gradient-to-tr from-indigo-500 to-blue-300  ">
                    <div className="px-4 py-2 md:px-40 md:py-20 bg-white rounded-md shadow-xl">
                        <div className="flex flex-col items-center">
                            <h1 className="font-bold text-blue-600 text-9xl">404</h1>
                            <h6 className="mb-2 text-xl font-bold text-center text-gray-800 md:text-3xl">
                                <span className="text-red-500">Oops!</span> Page not found
                            </h6>
                            <p className="mb-8 text-center text-gray-500 md:text-lg ">
                                The page you're looking for doesn't exist.  </p>
                            <p className="mb-8 text-center text-gray-500 md:text-lg ">{msg}</p>
                            <div className="pb-4 md:pb-0 ">
                                <Link to={"/"} className="px-6 py-2 mr-2 btn-sky rounded-lg text-white text-sm font-semibold">Go home</Link>
                                <Link to={"#"} onClick={() => navigate(-1)} className="px-6 py-2 ml-2 btn-green rounded-md text-white text-sm font-semibold ">Go Back</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default NoMatch