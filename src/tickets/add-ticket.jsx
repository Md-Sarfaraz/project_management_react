import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth-context'
import { Card, CardHeader, CardBody, Button, Input, Textarea, Select, Option } from '@material-tailwind/react';
import { priorityOptions, statusOptions, typeOptions } from '../utility/data';
import LocalStorage, { USER_STORAGE_KEY } from '../utility/storage';
import TicketService from '../services/ticket-service';

const AddTicket = () => {
    const navigate = useNavigate();
    const user = LocalStorage.getValue(USER_STORAGE_KEY, {});
    const { state } = useLocation();
    const service = TicketService()
    const [ticket, setTicket] = useState(state.ticket ? state.ticket : {
        name: "",
        detail: "",
        status: "",
        priority: "",
        lastDate: "",
        type: "",
        project: { id: state?.project?.id, name: state?.project?.name },
        submitter: { id: user?.id, name: user?.name },

    });

    const [newTicket, setNewTicket] = useState({

    });

    const saveToServer = async () => {
        let data = {
            name: ticket.name,
            detail: ticket.detail,
            status: ticket.status,
            priority: ticket.priority,
            lastDate: ticket.lastDate,
            type: ticket.type,
            submitter: ticket.submitter,
            project: ticket.project,
        }
        console.log("Final Data :: ", data);

        service.saveTicket(data, () => {
            navigate(-1)

        })

    }


    useEffect(() => {

        console.log(ticket);

    }, []);


    const handleInput = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        setTicket({ ...ticket, [name]: value })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //TODO Handle
        saveToServer()
    }

    return (<>
        <div className="bg-light-blue-500 px-3 md:px-8 h-32" />
        <div className=' p-8 -mt-24 min-h-screen grid grid-cols-12'>
            <div className=" col-span-12 md:col-span-8 md:col-start-3">
                <Card>
                    <CardHeader color="indigo" className='px-4 py-2'>
                        <div className="w-full flex items-center justify-between">
                            <h2 className="text-white text-2xl">{(state.title ? state.title : "Add New Ticket")}</h2>
                            <Button color="indigo" variant='text' onClick={() => { navigate(-1) }} >Back</Button>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="">
                            <div className="">
                                <h6 className="text-blue-500 text-sm mt-3 mb-6 font-light uppercase">Ticket Information</h6>
                                <div className="flex flex-wrap mt-10 ">
                                    <div className="w-full lg:w-12/12 mb-10 font-light">
                                        <Input type="text" color="blue" placeholder="Name"
                                            value={ticket.name} onChange={handleInput} name="name" />
                                    </div>
                                </div>
                                <div className="flex flex-wrap mt-10 font-light">
                                    <Textarea color="blue" placeholder="Detail"
                                        value={ticket.detail} onChange={handleInput} name="detail" />
                                </div>
                                <div className="flex flex-wrap mt-10 ">
                                    <div className="w-full lg:w-4/12 pr-2 mb-10 font-light">
                                        <span htmlFor="created" className='pb-2 pl-4 text-sm text-blue-grey-600' />
                                        <Input type="date" color="blue" placeholder="Last Date of Submission"
                                            value={ticket.lastDate} onChange={handleInput} name="lastDate" />
                                        {/* <input type="date" className='p-3 border'
                                            value={ticket.lasDate}   /> */}
                                    </div>
                                    <div className="w-full lg:w-4/12 px-2 mb-10 font-light">
                                        <label htmlFor="created" className='pb-2 pl-4 text-sm text-blue-grey-600'>Project</label>
                                        <input type="text" defaultValue={ticket.project?.id}
                                            name="project_id" id="project_id" hidden />
                                        <Input type="text" color="blue" placeholder="Project"
                                            value={ticket.project?.name} onChange={handleInput} name="name" disabled />
                                    </div>
                                    <div className="w-full lg:w-4/12 pl-2 mb-10 font-light">
                                        <label htmlFor="created" className='pb-2 pl-4 text-sm text-blue-grey-600'>Sumitter</label>
                                        <input type="text" defaultValue={ticket.submitter?.id}
                                            name="submitter_id" id="project_id" hidden />
                                        <Input type="text" color="blue" placeholder="Submitter"
                                            value={ticket.submitter?.name} onChange={handleInput} name="name" disabled />
                                    </div>
                                </div>
                                <div className="flex flex-wrap mt-10 ">
                                    <div className="w-full lg:w-4/12 px-2 mb-10 font-light">
                                        <Select variant='outlined' label='Status' name="status" value={ticket.status}
                                            onChange={(e) => { setTicket({ ...ticket, status: e }) }}>
                                            {statusOptions.map((val, key) => {
                                                return <Option key={key} value={val.value}>{val.label}</Option>
                                            })}
                                        </Select>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-2 mb-10 font-light">
                                        <Select variant='outlined' name="status" label="Priority" value={ticket.priority}
                                            onChange={(e) => { setTicket({ ...ticket, priority: e }) }}>
                                            {priorityOptions.map((val, key) => {
                                                return <Option key={key} value={val.value}>{val.label}</Option>
                                            })}
                                        </Select>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-2 mb-10 font-light">
                                        <Select variant='outlined' onChange={(e) => { setTicket({ ...ticket, type: e }) }}
                                            name="status" label="Ticket Type" value={ticket.type}>
                                            {typeOptions.map((val, key) => {
                                                return <Option key={key} value={val.value}>{val.label}</Option>
                                            })}
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex flex-wrap justify-between mt-10 font-light">
                                    <Button color="light-blue" variant='text' ripple
                                        onClick={(e) => { e.preventDefault(); navigate(-1) }}>Back</Button>
                                    <Button color="light-blue" ripple
                                        onClick={handleSubmit}>Save</Button>
                                </div>

                            </div>     {/*   form */}
                        </div>
                    </CardBody>
                </Card>
            </div >
        </div >
    </>)
}

export default AddTicket