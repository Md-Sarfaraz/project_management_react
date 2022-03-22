import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import { IoCloseSharp } from 'react-icons/io5'

const DeleteModal = ({ children, open, OnClose }) => {
    if (!open) return null;

    return ReactDOM.createPortal(<>
        <div className={" z-40 fixed top-0 bottom-0 left-0 right-0 bg-modal"}></div>
        <div className=' z-40 fixed top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 w-1/4  bg-slate-50
         rounded-md shadow-md shadow-red-500 p-2' >
            <div className="flex flex-row justify-end">
                <IoCloseSharp className=' h-8 w-8 p-2 hover:bg-indigo-900 hover:text-white  rounded-md' onClick={OnClose}></IoCloseSharp>
            </div>
            <div className="p-4">
                {children}
            </div>
        </div>
    </>, document.getElementById('delete-modal'))
}

export default DeleteModal