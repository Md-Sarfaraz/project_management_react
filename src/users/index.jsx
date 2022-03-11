import React, { useEffect, useState } from 'react'
import Card from '../components/card'
import DataTable from 'react-data-table-component';
import { theme } from "../utility/datatable.config";
import { api } from "../services/database";






const Member = () => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const cardStyle = {
        title: 'Members Detail List',
        close: true
    }
    const getDUserData = async (p) => {
        setLoading(true)
        const res = await api.get("/user/list", { params: { page: p, size: perPage } });
        setUsers(res.data.data)
        setTotalRows(res.data.totaldata)
        setLoading(false)
    }
    useEffect(() => {
        getDUserData(1)


    }, [])

    const handlePageChange = page => {
        getDUserData(page);
    };


    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true);

        const response = await api.get(`/user/list?page=${page}&size=${newPerPage}`);

        setUsers(response.data.data);
        setPerPage(newPerPage);
        setLoading(false);
    };


    const columns = [

        {
            name: 'Name',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Username',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Date Of Birth',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Contact',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (<>
                <button className='py-2 px-4 m-2 rounded-lg btn-sky' onClick={()=>{console.log(row.id)}}>Edit</button>
                <button className='py-2 px-4 m-2 rounded-lg btn-red' onClick={()=>{console.log(row.email)}}>Delete</button>
            </>),

        },
    ];




    return (
        <>
            <div className='min-h-screen md:m-content p-8 z-0'>
                <Card card={cardStyle} >
                    <div className="p-4 bg-grd-dark rounded-b-lg">
                        <DataTable columns={columns} data={users} //customStyles={dtStyle}
                            theme='solarized'
                            progressPending={loading} pagination paginationServer paginationTotalRows={totalRows}
                            onChangeRowsPerPage={handlePerRowsChange}
                            onChangePage={handlePageChange}
                            highlightOnHover pointerOnHover responsive 
                        />
                    </div>
                </Card>
            </div>
        </>
    )
}

export default Member