import React, { useEffect, useState, useCallback } from 'react'
import Card from '../components/card'
import { useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import { theme } from "../utility/datatable.config";
import { api } from "../services/database";
import Header from '../components/header';
import { IoClose } from 'react-icons/io5'
import { listAllUser, listAllSearched } from "../services/user-service";
import { useDebounce } from '../hooks/useDebounce';



const Member = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [searchValue, setSearchValues] = useState("")
    const debounce = useDebounce(searchValue, 1000)
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const cardStyle = {
        title: 'Members Detail List',
        close: true
    }
    const getDUserData = async (p) => {
        setLoading(true)
        const data = await listAllUser(p, perPage);
        setUsers(data.data)
        setTotalRows(data.totaldata)
        setLoading(false)
    }
    useEffect(() => {
        try {
            getDUserData(1)

        } catch (error) {
            console.log(error.name);

        }


    }, [])
    useEffect(async () => {
        console.log("saering")
        if (searchValue.length >= 3) {
            console.log(searchValue);

            setLoading(true)
            const data = await listAllSearched(searchValue)
            setUsers(await data.data)
            setTotalRows(data.totaldata)
            setLoading(false)
        }
    }, [debounce])


    const handlePageChange = page => {
        getDUserData(page);
    };
    const handleSearch = (e) => {
        const sval = e.target.value
        setSearchValues(sval)
    };

    const handlesearch = useCallback(
        (e) => {


        },
        [],
    )


    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true);

        const response = await api.get(`/user/list?page=${page}&size=${newPerPage}`);

        setUsers(response.data.data);
        setPerPage(newPerPage);
        setLoading(false);
    };

    const handleSort = async (column, sortDirection) => {
        setLoading(true);
        const response = await api.get(`/user/list?sort=${column.sortField}&order=${sortDirection}`);
        setUsers(response.data.data);
        setLoading(false);
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
            sortable: true,
            sortField: 'mobile',
        },
        {
            name: 'Actions',
            cell: row => (<>
                <button className='py-2 px-4 m-2 min-w-fit rounded-lg hover:shadow-md hover:shadow-blue-800 border border-blue-600 hover:btn-sky'
                    onClick={() => { navigate('/user/view', { state: { data: row } }) }}>View</button>
                <button className='py-2 px-4 m-2 min-w-fit rounded-lg border border-red-600 hover:btn-red' onClick={() => { console.log(row) }}>Delete</button>
            </>),

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
            <Header />
            <div className='min-h-screen md:m-content mt-14 p-8 z-0'>
                <Card card={cardStyle} >
                    <div className="flex flex-row bg-grd-dark px-8 py-4">
                        <label htmlFor="searchdt" className="text-white text-2xl px-4 mr-4">Search </label>
                        <input type="text" id='searchdt' className="ring ring-fuchsia-800 rounded-md px-4 py-1 bg-transparent text-white"
                            value={searchValue} onChange={handleSearch} />
                        <IoClose className='h-8 w-8 mx-4 bg-white rounded-xl' onClick={() => { setSearchValues(''); getDUserData(1) }}></IoClose>
                    </div>
                    <div className="p-4 bg-grd-dark rounded-b-lg">
                        <DataTable columns={columns} data={users} //customStyles={dtStyle}
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
                </Card>
            </div>
        </>
    )
}

export default Member