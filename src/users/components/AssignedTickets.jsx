import { Button, Card, CardBody, CardHeader } from "@material-tailwind/react";
import { useState } from "react";
import DataTable from "react-data-table-component";


export default function AssignedTickets({ tickets }) {

    const [ticket, setTicket] = useState(tickets ? tickets : []);
    const [dataTable, setDataTable] = useState({
        loading: false,
    })

    const handleSort = () => {

    }
    const handlePerRowsChange = () => {

    }
    const handlePageChange = () => {

    }



    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            sortField: 'name',
        },
        {
            name: 'Type',
            selector: row => row.type,
            sortable: true,
            sortField: 'type',
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            sortField: 'status',
        },
        {
            name: 'Priority',
            selector: row => row.priority,
            sortable: true,
            sortField: 'priority',
        },
        {
            name: 'Last Date',
            selector: row => row.lastDate,
            sortable: true,
            sortField: 'lastDate',
        },

    ]

    return (
        <Card>
            <CardHeader color="purple" className="p-4" >
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl">Assigned Tickets</h2>
                    <Button color="purple">
                        See More
                    </Button>
                </div>
            </CardHeader>
            <CardBody className="px-0">
                <div className="overflow-x-auto">
                    <DataTable columns={columns} data={ticket} //customStyles={dtStyle}
                        theme='solarized'
                        progressPending={dataTable.loading}
                        noDataComponent={"No Ticket is Assigned To You!"}
                        pagination paginationTotalRows={ticket.length}
                        sortServer onSort={handleSort}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange}
                        highlightOnHover pointerOnHover responsive
                    // expandableRows expandableRowsComponent={ExpandedComponent}
                    />
                </div>
            </CardBody>
        </Card>
    );
}
