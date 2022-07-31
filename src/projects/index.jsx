import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import { MdVisibility, MdDelete } from 'react-icons/md'
// eslint-disable-next-line
import { theme } from "../utility/datatable.config";
import ProjectService from "../services/project-service";
import { useDebounce } from '../hooks/useDebounce';

import { Button, Card, CardBody, CardHeader, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Input } from '@material-tailwind/react';


const Project = () => {
    const navigate = useNavigate();
    const service = ProjectService()
    const [projects, setProjects] = useState([])
    const [selectedProject, setSelectedProject] = useState({
        open: false,
        row: {}
    })
    const [searchValue, setSearchValues] = useState("")
    const debounce = useDebounce(searchValue, 1000)
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const getDUserData = async (p) => {
        setLoading(true)
        const data = await service.listAllProject(p, perPage);
        setProjects(data.data)
        setTotalRows(data.totaldata)
        setLoading(false)
    }

    useEffect(() => {
        const showSearched = async () => {
            if (searchValue.length >= 3) {
                console.log(searchValue);
                setLoading(true)
                const data = await service.listAllSearched(searchValue)
                await setProjects(data.data)
                await setTotalRows(data.totaldata)
                await setLoading(false)
            }
            if (searchValue.length === 0) {
                try {
                    getDUserData(1)
                } catch (error) {
                    console.log(error.name);
                }
            }
        }
        showSearched()
        // eslint-disable-next-line
    }, [debounce])


    const handlePageChange = page => {
        getDUserData(page);
    };
    const handleSearch = (e) => {
        const sval = e.target.value
        setSearchValues(sval)
    };

    const deleteProjectwithModal = async () => {
        const data = await service.deleteProject(selectedProject.row.id)
        console.log(data)
        if (data.status) {
            setSelectedProject({ open: false, row: {} })
            getDUserData(1)
        }

    }

    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true);
        const data = await service.listAllProject(page, perPage);
        setProjects(data.data);
        setPerPage(newPerPage);
        setLoading(false);
    };

    const handleSort = async (column, sortDirection) => {
        // setLoading(true);
        // const response = await api.get(`/project/list?sort=${column.sortField}&order=${sortDirection}`);
        // setProjects(response.data.data);
        // setLoading(false);
    }



    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            sortField: 'name',
        },

        {
            name: 'Created',
            selector: row => row.created,
            sortable: true,
            sortField: 'created',
        },
        {
            name: 'Updated',
            selector: row => {
                return row.updated
            },
            sortable: true,
            sortField: 'updated',
        },
        {
            name: 'Last Date',
            selector: row => row.lastDate,
            sortable: true,
            sortField: 'lastDate',
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            sortField: 'status',
            width: "12%",
        },
        {
            name: 'Actions',
            cell: row => (<>
                <IconButton color="light-blue" size="sm" className={"mr-2"} variant="text"
                    ripple onClick={() => { navigate('/project/view', { state: { data: row } }) }}   >
                    <MdVisibility className='h-5 w-5' />
                </IconButton>
                <IconButton color="red" size="sm" variant='text'
                    ripple onClick={() => { setSelectedProject({ open: true, row: row }) }}    >
                    <MdDelete className='h-5 w-5' />
                </IconButton>
            </>),
            width: "6rem",
        },
    ];

    // const dtStyle = {
    //     cells: {
    //         style: {
    //             border: "1px solid #000"
    //         },
    //     },
    // }

    const ExpandedComponent = ({ data }) => <div className='px-8 py-2'>
        <div className="">
            <strong>Details : </strong>{data.detail}
        </div>
    </div>;


    return (<> <div className="bg-light-blue-500 px-3 md:px-8 h-32" />

        <Dialog open={selectedProject.open} handler={() => { setSelectedProject({ open: false, row: {} }) }}>
            <DialogHeader >
                <p className='text-black font-semibold'>Are You Sure You Wanna Delete This Project ? </p>
            </DialogHeader>
            <DialogBody>
                <div className="mt-2 mb-2 text-slate-600">

                    <p>Name : {selectedProject.row.name}</p>
                    <p>Details : {selectedProject.row.detail}</p>
                    <p>Created : {selectedProject.row.created}</p>
                    <p>Last Date : {selectedProject.row.lastDate}</p>
                </div>
            </DialogBody>
            <DialogFooter>
                <div className='flex justify-between'>
                    <Button color="light-blue" className={"mr-4"}
                        onClick={() => setSelectedProject({ open: false, row: {} })} ripple >
                        Cancel
                    </Button>
                    <Button color="red" onClick={() => deleteProjectwithModal()}
                        ripple >
                        Delete
                    </Button>
                </div>
            </DialogFooter>
        </Dialog>

        <div className='  -mt-24 p-4 z-0'>
            <Card>
                <CardHeader color='purple' size="sm" className='p-4'>
                    <div className="w-full flex items-center justify-between">
                        <div className="flex flex-row">
                            <h2 className="text-white text-2xl">Project List</h2>
                        </div>
                        <div className="flex flex-initial">
                            <Button color="purple" ripple className=''
                                onClick={() => { navigate('/project/add') }} >
                                Add Project
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className=" rounded-b-lg 0">
                        <div className="flex flex-row-reverse w-full  px-4 pt-4 ">
                            <div className="w-full md:w-1/5  mr-0 md:mr-4">
                                <Input type="text" color="purple" value={searchValue} onChange={handleSearch}
                                    label="Search Project" icon={<i className="fas fa-heart" />} />
                            </div>
                        </div>
                        <div className="pb-2 pr-2 select-none duration-1000 transition-all ">
                            <DataTable columns={columns} data={projects}// customStyles={dtStyle}
                                theme='solarized'
                                progressPending={loading}
                                pagination paginationServer paginationTotalRows={totalRows}
                                onSort={handleSort} sortServer
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

export default Project