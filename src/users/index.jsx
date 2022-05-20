import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import { theme } from "../utility/datatable.config";
import { api } from "../services/api";
import { IoClose } from 'react-icons/io5'
import { MdVisibility, MdDelete } from 'react-icons/md'
import Service from "../services/user-service";
import { useDebounce } from '../hooks/useDebounce';
import { Button, Card, CardBody, CardHeader, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Input } from '@material-tailwind/react';



const Member = () => {
    const navigate = useNavigate();
    const userService = Service();
    const [users, setUsers] = useState([])
    const [deleteUsers, setDeleteUsers] = useState({
        open: false,
        row: {}
    })
    const [searchValue, setSearchValues] = useState("")
    const debounce = useDebounce(searchValue, 1000)
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const getDUserData = async (p) => {
        try {

            setLoading(true)
            const data = await userService.listAllUser(p, perPage);
            setUsers(data.data)
            setTotalRows(data.totaldata)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        try {
            getDUserData(1)

        } catch (error) {
            console.log(error.name);

        }
    }, [])
    
    useEffect(() => {
        const showSearched = async () => {
            if (searchValue.length >= 3) {
                console.log(searchValue);
                setLoading(true)
                const data = await userService.listAllSearched(searchValue)
                setUsers(data.data)
                setTotalRows(data.totaldata)
                setLoading(false)
            }
        }
        showSearched()
    }, [debounce])


    const handlePageChange = page => {
        getDUserData(page);
    };
    const handleSearch = (e) => {
        const sval = e.target.value
        setSearchValues(sval)
    };

    const deleteUserwithModal = async () => {
        const data = await userService.deleteUser(deleteUsers.row.id)
        if (data.status) {
            setDeleteUsers({ open: false, row: {} })
            getDUserData(1)
        }

    }

    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true);

        const response = await api.get(`/user/list?page=${page}&size=${newPerPage}`);

        setUsers(response.data.data);
        setPerPage(newPerPage);
        setLoading(false);
    };

    const handleSort = (column, sortDirection) => {
        const callSort = async () => {
            if (column.sortField) {
                setLoading(true);
                const response = await api.get(`/user/list?sort=${column.sortField}&order=${sortDirection}`);
                setUsers(response.data.data);
                setLoading(false);
            }

        }
        callSort()
    }

    const columns = [

        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            sortField: 'name',
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            sortField: 'email',
        },
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true,
            sortField: 'username',
        },
        {
            name: 'Date Of Birth',
            selector: row => {
                return row.dob
            },

        },
        {
            name: 'Contact',
            selector: row => row.mobile,
        },
        {
            name: 'Actions',
            cell: row => (<>
                <IconButton color="light-blue" variant='text' className={"mr-2"} size="sm"
                    ripple onClick={() => { navigate('/user/view', { state: { data: row } }) }}   >
                    <MdVisibility className='h-5 w-5' />
                </IconButton>
                <IconButton color="red" variant='text' size='sm'
                    ripple onClick={() => { setDeleteUsers({ open: true, row: row }) }}    >
                    <MdDelete className='h-5 w-5' />
                </IconButton>
            </>),
            width: "6rem",

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

    return (
        <>
            <div className="bg-light-blue-500 px-3 md:px-8 h-32" />
            <Dialog open={deleteUsers.open} handler={() => setDeleteUsers({ open: false, row: {} })}>
                <DialogHeader >
                    <p className='mr-8 text-black    font-semibold'>Are You Sure to Delete This Member ? </p>
                </DialogHeader>
                <DialogBody>
                    <div className="px-4 ">
                        <div className="mt-2 mb-2  text-slate-600">
                            <p>Name : {deleteUsers.row.name}</p>
                            <p>Email : {deleteUsers.row.email}</p>
                            <p>Address : {deleteUsers.row.address}</p>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <div className='flex justify-between'>
                        <Button color="light-blue" variant='text' className={"mr-4"}
                            onClick={() => setDeleteUsers({ open: false, row: {} })} ripple >
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
                    <CardHeader color='blue' size="sm" className='p-4'>
                        <div className="w-full flex items-center justify-between">
                            <h2 className="text-white text-2xl">Members List</h2>
                            <Button color="blue"
                                onClick={() => { navigate('/user/add') }} >
                                Add New Member
                            </Button>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className=" rounded-b-lg 0">
                            <div className="flex flex-row-reverse  px-4 pt-4 ">
                                <div className=" md:w-1/5 ">

                                    <Input type="text" color="light-blue" icon={<i className="fas fa-heart" />}
                                        value={searchValue} onChange={handleSearch}
                                        label="Search Member" />
                                </div>
                            </div>
                            <div className="p-4   rounded-b-lg">
                                <DataTable columns={columns} data={users} //customStyles={dtStyle}
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

export default Member