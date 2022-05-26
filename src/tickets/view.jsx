import { Button, Card, CardBody, CardHeader } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import TicketService from '../services/ticket-service';
import AssignUser from './components/assign-user';


const TicketDetail = ({ }) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const ticketService = TicketService()
    const [ticket, setTicket] = useState({});
    const [assignNew, SetAssignNew] = useState(false);

    const editTicket = () => {
        navigate('/ticket/add', { state: { ticket: ticket, title: "Edit ticket" } })
    }

    useEffect(() => {
        // console.log(ticket);
        ticketService.getOne(state.data?.id, (data, error) => {
            if (error) return console.log('error : ', error)
            setTicket(data)
        })
    }, [])



    return (<>
        <div className="bg-light-blue-500 px-3 md:px-8 h-32" />
        <AssignUser open={assignNew} setOpen={SetAssignNew} ticket={ticket} setTicket={setTicket} />
        <div className='min-h-screen  -mt-24 p-4 '>
            <div className="md:flex-1">
                <Card>
                    <CardHeader color="purple" className='px-4 py-2'>
                        <div className="w-full flex items-center justify-between">
                            <h2 className="text-white text-2xl">{ticket.name}</h2>
                            <div className="flex justify-end">

                                <Button color="purple" onClick={editTicket} >Edit</Button>
                                <Button color="purple" onClick={() => navigate(-1)} >Back</Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="flex-col rounded-b-lg p-1 pb-3 md:p-6 ">
                            <div className="flex m-3 mx-3 my-1 md:my-1">
                                <div className="flex-none font-bold w-32 hidden md:block">Details : </div>
                                <div className="flex-1 font-sans w-64" >
                                    <span className='font-bold md:hidden'>Details : </span>
                                    {ticket.detail}
                                </div>
                            </div>


                            <div className="flex mx-3 my-1 md:my-1 ">
                                <div className="flex-none font-bold w-32">Project Name : </div>
                                <div className="flex-initial font-mono w-64">{ticket.project?.name}</div>
                            </div>
                            <div className="flex mx-3 my-1 md:my-1 ">
                                <div className="flex-none font-bold w-32">Submitted By : </div>
                                <div className="flex-initial font-mono w-64">{ticket.submitter?.name}</div>
                            </div>
                            <div className="flex mx-3 my-1 md:my-1 ">
                                <div className="flex-none font-bold w-32">Assigned To : </div>
                                <div className="">{ticket.assignedUser ? ticket.assignedUser?.name :
                                    <div className='text-sm font-semibold'>
                                        Not Assigned Yet, <Button onClick={() => SetAssignNew(true)}
                                            color='purple' variant="text" size='sm'>Assign New?</Button>
                                    </div>}
                                </div>
                            </div>
                            <div className="flex mx-3 my-1 md:my-1 ">
                                <div className="flex-none font-bold w-32">Created At : </div>
                                <div className="flex-initial font-mono w-64">{ticket.created}</div>
                            </div>
                            <div className="flex mx-3 my-1 md:my-1 ">
                                <div className="flex-none font-bold w-32">Updated At : </div>
                                <div className="flex-initial font-mono w-64">{ticket.updated}</div>
                            </div>
                            <div className="flex mx-3 my-1 md:my-1 ">
                                <div className="flex-none font-bold w-32">Last Date : </div>
                                <div className="flex-initial font-mono w-64">{ticket.lastDate}</div>
                            </div>
                            <div className="flex mx-3 my-1 md:my-1 ">
                                <div className="flex-none font-bold w-32">Status : </div>
                                <div className="flex-initial font-mono w-64">{ticket.status}</div>
                            </div>
                            <div className="flex mx-3 my-1 md:my-1 ">
                                <div className="flex-none font-bold w-32">Type : </div>
                                <div className="flex-initial font-mono w-64">{ticket.type}</div>
                            </div>
                            <div className="flex mx-3 my-1 md:my-1 ">
                                <div className="flex-none font-bold w-32">Priority : </div>
                                <div className="flex-initial font-mono w-64">{ticket.priority}</div>
                            </div>


                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    </>)
}

export default TicketDetail