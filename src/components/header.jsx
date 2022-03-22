import React from 'react'

const Header = ({ orderedNavList }) => {
    return (
        <div className="fixed left-0 top-0 z-10 border-b-4 border-slate-200  md:px-3 pl-20 pr-2 py-4  w-full   bg-grd-dark md:m-content text-white font-semibold">
            <div className=" w-auto">
                <div className="">
                    <h1 className=''>Project Management</h1>
                </div>
               
            </div>
        </div>)
}

export default Header