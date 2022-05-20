import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import React, { useState } from 'react'
import AsyncSelect from 'react-select/async';
import TicketService from '../../services/ticket-service'
import UserService from '../../services/user-service'

const AssignUser = ({ open, setOpen }) => {
    const service = TicketService()
    const userService = UserService()
    const [selectedValue, setSelectedValue] = useState("")
    const [dialog, setDialog] = useState({
        open: false,
        newUser: {},
        showSelected: false
    })

    const loadOptions = async (inputValue, callback) => {
        if (inputValue.length > 2) {
            console.log(inputValue);
            const requestResults = await userService.listAllSearched(inputValue)
            callback(requestResults.data)
        }
    }


    const assingMember = async () => {
 
        service.assignUser(open.ticket.id, dialog.newUser.id, (error) => {
            if (!error) {
                setOpen({ ...open, assign: false, newUser: {}, reloadData:true })
            }
        })

    }

    return (
        <div>
            <Dialog open={open.assign} dismiss={{ enabled: true, outsidePointerDown: false, }}
                handler={() => { setOpen({ ...open, assign: false }); setDialog({ ...dialog, open: false, newUser: {}, showSelected: false }) }}
                className="h-fit"  >
                <DialogHeader >
                    <p className="mr-8">Search & Select Member To Assign</p>
                </DialogHeader>
                <DialogBody divider className="h-fit">
                    <div className='h-fit w-full'>
                        <div className='p-4 w-full '>
                            <AsyncSelect value={selectedValue}
                                getOptionValue={e => e.id}
                                loadOptions={loadOptions}
                                getOptionLabel={e => (
                                    <div className='mb-2 '>
                                        <div className="block text-black text-base ">{e.name}</div>
                                        <div className="block text-blue-grey-800 text-sm ">{e.email}</div>
                                    </div>)}
                                onChange={(opt) => setDialog({ ...dialog, newUser: opt, showSelected: true })} openMenuOnClick={false}
                                //  onInputChange={selectInputChange}
                                placeholder="Search Member" />
                        </div>
                        <div className="">

                            <div className={(dialog === undefined ? "hidden " : " ") + "mt-2 mb-2 text-slate-600"}>
                                <h1 className={(dialog.showSelected ? " " : "hidden ") + 'text-black font-semibold'}>Are You Sure To Assign This Member To Project ? </h1>
                                <p>Name : {dialog.newUser?.name}</p>
                                <p>Email : {dialog.newUser?.email}</p>
                                <p>Date Of Birth : {dialog.newUser?.dob}</p>
                                <p>Contact : {dialog.newUser?.mobile}</p>
                            </div>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <div className='flex justify-between'>
                        <Button color="light-blue" variant='text' className={"mr-4"}
                            onClick={() => setOpen({ ...open, assign: false })}
                            ripple >Cancel</Button>

                        <Button color="teal" onClick={assingMember}
                            ripple >
                            Assign
                        </Button>
                    </div>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default AssignUser