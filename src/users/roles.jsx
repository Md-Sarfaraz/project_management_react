import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Select, Option, Button, Card, CardHeader, CardBody, Input } from "@material-tailwind/react";
import { dummyRoles, rolesOptions } from "../utility/data"
import { useNavigate } from 'react-router-dom';
import Service from '../services/user-service';

import { useDebounce } from '../hooks/useDebounce';

const Roles = () => {
    const navigate = useNavigate();
    const userService = Service();
    const [roles, setRoles] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [selectedValue, setSelectedValue] = useState({});
    const debounce = useDebounce(searchValue, 1000)
    const [roleTable, setRoleTable] = useState({
        totalRows: 0,
        perPage: 10,
        loading: false,
    });


    useEffect(() => {

    }, [])

    useEffect(() => {
        const showSearched = async () => {
            if (searchValue.length >= 3) {
                setRoleTable({ ...roleTable, loading: true })
                const data = await userService.listAllSearched(searchValue)
                setRoles(data.data)
                setRoleTable({ ...roleTable, totalRows: data.totaldata, loading: false })
            }
            if (searchValue.length === 0) {
                try {

                    getUserWithRoles(1)
                } catch (error) {
                    console.log(error);

                }
            }
        }
        showSearched()
    }, [debounce])

    const getUserWithRoles = async (p) => {

        setRoleTable({ ...roleTable, loading: true })
        const data = await userService.listAllUser(p, roleTable.perPage);
        setRoles(data.data)
        setRoleTable({ ...roleTable, totalRows: data.totaldata, loading: false })
    }
    const roleUpdate = async () => {
        console.log(selectedValue);


        if (!selectedValue.newRole) {
            console.log("Please select a Role")
            return
        }
        const data = []
        if (selectedValue.roles) {
            data.push(selectedValue.newRole)
            data.push(...selectedValue.roles)
        } else {
            data.push(selectedValue.newRole)
        }
        // console.log(selectedValue.id, data);
        const res = await userService.updateRoles(selectedValue.id, data)
        console.log(res);

        await getUserWithRoles(1)
        setSelectedValue({})
        setSearchValue('')
    }

    const handlePerRowsChange = async (newPerPage, page) => {
        setRoleTable({ ...roleTable, loading: true })
        const data = await userService.listAllUser(page, newPerPage);
        console.log(data);

        setRoles(data.data)
        setRoleTable({ ...roleTable, loading: false, perPage: newPerPage })

    }


    const handlePageChange = (page) => {
        getUserWithRoles(page)
    }

    const handleSort = () => {

    }
    const handleSearch = (e) => {
        let value = e.target.value
        setSearchValue(value)

    }
    const rowSelect = (row) => {
        setSelectedValue(row)

    }
    const columns = [{
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
        name: 'Roles',
        cell: row => {
            if (!row.roles) return (<p className='p-2 bg-red-300 rounded'>None</p>);
            const roles = Object.values(row.roles)
            return (<div className='flex flex-row  flex-wrap justify-between'>{
                roles.map((rol, key) => {
                    return (<div key={key} className=''>
                        <p className='px-2 py-1 bg-blue-300 rounded-md m-2' >{rol.replace("ROLE_", "")} </p>
                    </div>)
                })
            }
            </div>)
        },
        sortable: true,
        grow: 1,
        sortField: 'roles',
    },

    ]

    return (<div>
        <div className="bg-light-blue-500 px-3 md:px-8 h-32" />
        <div className='min-h-screen  -mt-24 p-4 z-0'>
            <div className='w-full grid grid-cols-12 '>
                <div className='md:col-span-4 col-span-12'>
                    <div className={(selectedValue.name ? "" : "hidden ") + " flex flex-col gap-4 py-2 md:p-4 rounded-xl drop-shadow-md"}>
                        <div className={(selectedValue.name ? "" : "hidden ") + "w-full mt-6 px-4 py-4 md:order-last z-20 font-light bg-white rounded-xl drop-shadow-md"}>
                            <label className="block text-gray-600 text-sm mb-2 p-2" htmlFor="status">Select Role To Assign</label>
                            <Select variant='outlined' name="status" label="Select Role"
                                onChange={(e) => {
                                    setSelectedValue({ ...selectedValue, newRole: e }); console.log(e);
                                }}>
                                {rolesOptions.map((val, key) => {
                                    return <Option key={key} value={val.value}>{val.label}</Option>
                                })}
                            </Select>
                            <div className=" py-4 flex flex-row gap-4 justify-end">
                                <Button color="teal" variant='outlined' size="sm"
                                    onClick={() => { setSelectedValue({}) }} >
                                    Cancel
                                </Button>
                                <Button color="blue" size="sm" onClick={() => roleUpdate()} >Assign Role</Button>
                            </div>
                        </div>
                        <div className=" bg-white rounded-lg drop-shadow-md -z-10">
                            <div className="p-4 rounded-lg shadow-inner shadow-gray-300">
                                <div className="mt-2 mb-2  text-slate-600">
                                    <p className='px-2 py-2'>Name : {selectedValue.name}</p>
                                    <p className='px-2 py-2'>Email : {selectedValue.email}</p>
                                    <p className='px-2 py-2 '>Roles : <span className='flex flex-row flex-wrap'> {selectedValue.roles?.map((val, ind) => {
                                        return <span className='p-2 text-purple-900 font-semibold' key={ind}>{val.replace("ROLE_", "")}</span>
                                    })}</span>
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                <div className='md:col-span-8 col-span-12 mt-8 md:mt-0'>
                    <Card>
                        <CardHeader color='blue' className='p-4'>
                            <div className="w-full flex items-center justify-between">
                                <h2 className="text-white text-2xl">Members with Roles</h2>
                                <Button color="blue" onClick={() => {
                                    navigate("/user/add")
                                }} >
                                    Add New Member
                                </Button>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div className=" rounded-b-lg ">
                                <div className="flex flex-row-reverse  px-4 pt-4 ">
                                    <div className=" md:w-2/5 ">
                                        <Input type="text" color="light-blue" icon={<i className="fas fa-heart" />}
                                            value={searchValue} onChange={handleSearch}
                                            placeholder="Search Member" />
                                    </div>
                                </div>
                                <div className="md:p-4 select-none  rounded-b-lg">
                                    <DataTable columns={columns} data={roles} //customStyles={dtStyle}
                                        theme='solarized'
                                        progressPending={roleTable.loading}
                                        pagination paginationTotalRows={roleTable.totalRows} paginationServer
                                        onSort={handleSort} sortServer
                                        onChangeRowsPerPage={handlePerRowsChange}
                                        onChangePage={handlePageChange}
                                        onRowDoubleClicked={rowSelect}
                                        highlightOnHover pointerOnHover responsive

                                    />
                                </div>
                            </div>
                        </CardBody>

                    </Card>
                </div>
            </div>
        </div>

    </div >)
}

export default Roles