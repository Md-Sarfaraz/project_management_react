import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from '../hooks/useDebounce';
import TicketService from '../services/ticket-service';
import DataTable from 'react-data-table-component';
import { MdVisibility, MdDelete, MdAssignmentInd } from 'react-icons/md'
import { Button, Card, CardBody, CardHeader, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Input } from '@material-tailwind/react';
import AssignUser from './components/assign-user';
const Tickets = () => {
    const navigate = useNavigate();
    const service = TicketService();
    const [tickets, setTickets] = useState([])
    const [DeleteTicket, setDeleteTicket] = useState({
        open: false,
        row: {}
    })
    const [searchValue, setSearchValues] = useState("")
    const debounce = useDebounce(searchValue, 1000)
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [dialog, setDialog] = useState({ assign: false, reloadData: false });

    const getTicketData = async (p) => {
        try {
            setLoading(true)
            await service.listAll(p, perPage, (data) => {
                setTickets(data.data)
                setTotalRows(data.totaldata)
            });
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getTicketData(1)
    }, [])

    useEffect(() => {
        if (dialog.reloadData) {
            getTicketData(1)
            setDialog({ ...dialog, reloadData: false })
        }
    }, [dialog.reloadData])




    useEffect(() => {
        const showSearched = async () => {
            if (searchValue.length >= 3) {
                console.log(searchValue);
                setLoading(true)
                const data = await service.listAllSearched(searchValue)
                await setTickets(data.data)
                setTotalRows(data.totaldata)
                setLoading(false)
            }
        }
        showSearched()
    }, [debounce])


    const handlePageChange = page => {
        getTicketData(page);
    };
    const handleSearch = (e) => {
        const sval = e.target.value
        setSearchValues(sval)
    };

    const deleteUserwithModal = async () => {
        await service.deleteTicket(DeleteTicket.row.id, (error) => {
            if (error) return
            setDeleteTicket({ open: false, row: {} })
            getTicketData(1)
        })


    }

    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true);

        // const response = await api.get(`/user/list?page=${page}&size=${newPerPage}`);

        // setUsers(response.data.data);
        // setPerPage(newPerPage);
        // setLoading(false);
    };

    const handleSort = (column, sortDirection) => {
        console.log(column);
        const callSort = async () => {
            if (column.sortField) {
                //     setLoading(true);
                //     const response = await api.get(`/user/list?sort=${column.sortField}&order=${sortDirection}`);
                //     setUsers(response.data.data);
                //     setLoading(false);
                // }

            }
            callSort()
        }
    }

    const columns = [

        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            sortField: 'name',
        },
        {
            name: 'Project',
            selector: row => row.project?.name,

        },
        {
            name: 'Assign To',
            selector: row => row.assignedUser?.name,

        },
        {
            name: 'Type',
            selector: row => {
                return row.type
            },
            sortable: true,
            sortField: 'name',
            width: "6rem",
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            sortField: 'name',
            width: "6rem",
        },
        {
            name: 'Priority',
            selector: row => row.priority,
            sortable: true,
            sortField: 'name',
            width: "6rem",
        },
        {
            name: 'Actions',
            cell: row => (<>
                <IconButton color="indigo" variant='text' size='sm' className={"mr-2"}
                    ripple onClick={() => { setDialog({ assign: true, ticket: row }) }}    >
                    <MdAssignmentInd className='h-5 w-5' />
                </IconButton>
                <IconButton color="light-blue" variant='text' className={"mr-2"} size="sm"
                    ripple onClick={() => { navigate('/ticket/view', { state: { data: row } }) }}   >
                    <MdVisibility className='h-5 w-5' />
                </IconButton>
                <IconButton color="red" variant='text' size='sm'
                    ripple onClick={() => { setDeleteTicket({ open: true, row: row }) }}    >
                    <MdDelete className='h-5 w-5' />
                </IconButton>
            </>),
            width: "8rem",

        },
    ];

    const ExpandedComponent = ({ data }) => <div className='px-8'>
        <div className="">
            <h5 className="">Address : </h5>
        </div>
        <div className="">

            {data.address}
        </div>

    </div>;
    return (<>
        <div className="bg-light-blue-500 px-3 md:px-8 h-32" />
        <AssignUser open={dialog} setOpen={setDialog} />
        <Dialog open={DeleteTicket.open} handler={() => setDeleteTicket({ open: false, row: {} })}>
            <DialogHeader >
                <p className='mr-8 text-black    font-semibold'>Are You Sure to Delete This Ticket ? </p>
            </DialogHeader>
            <DialogBody>
                <div className="px-4 ">
                    <div className="mt-2 mb-2  text-slate-600">
                        <p>Name : {DeleteTicket.row.name}</p>
                        <p>Project : {DeleteTicket.row?.project?.name}</p>
                        <p>Submitter : {DeleteTicket.row?.submitter?.name}</p>
                        <p>Assigned To : {DeleteTicket.row?.assignedUser?.name}</p>
                        <p>Status : {DeleteTicket.row?.status}</p>
                        <p>Type : {DeleteTicket.row?.type}</p>
                        <p>Priority : {DeleteTicket.row?.priority}</p>
                    </div>
                </div>
            </DialogBody>
            <DialogFooter>
                <div className='flex justify-between'>
                    <Button color="light-blue" variant='text' className={"mr-4"}
                        onClick={() => setDeleteTicket({ open: false, row: {} })} ripple >
                        Back
                    </Button>
                    <Button color="red" onClick={() => deleteUserwithModal()}
                        ripple >
                        <i name="delete" /> Delete
                    </Button>
                </div>
            </DialogFooter>
        </Dialog>

        <div className='min-h-screen -mt-24 p-4 z-0'>
            <Card>
                <CardHeader color='indigo' size="sm" className='p-4'>
                    <div className="w-full flex items-center justify-between">
                        <h2 className="text-white text-2xl">Tickets List</h2>
                        <Button color="indigo"
                            onClick={() => { navigate('/project') }} >
                            View Projects
                        </Button>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className=" rounded-b-lg 0">
                        <div className="flex flex-row-reverse  px-4 pt-4 ">
                            <div className=" md:w-1/5 ">

                                <Input type="text" color="light-blue" icon={<i className="fas fa-heart" />}
                                    value={searchValue} onChange={handleSearch}
                                    label="Search Ticket" />
                            </div>
                        </div>
                        <div className="p-4   rounded-b-lg">
                            <DataTable columns={columns} data={tickets} //customStyles={dtStyle}
                                theme='solarized'
                                progressPending={loading} noDataComponent={"Not Authorize"}
                                pagination paginationServer paginationTotalRows={totalRows}
                                sortServer onSort={handleSort}
                                onChangeRowsPerPage={handlePerRowsChange}
                                onChangePage={handlePageChange}
                                highlightOnHover pointerOnHover responsive
                                expandableRows expandableRowsComponent={ExpandedComponent}
                            />
                        </div>
                    </div>
                </CardBody>

            </Card>
        </div>
    </>
    )
}

export default Tickets;