import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import AsyncSelect from 'react-select/async';
import UserService from '../services/user-service'
import ProjectService from "../services/project-service"
import { useLocation, useNavigate } from 'react-router-dom'
import TicketService from '../services/ticket-service';
import { MdVisibility, MdPersonRemove } from 'react-icons/md'
import { customStyles } from '../utility/datatable.config';
import { Button, Card, CardBody, CardHeader, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton } from '@material-tailwind/react';

const ViewProject = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const userService = UserService();
  const service = ProjectService();
  const ticketService = TicketService();
  const [project, setProject] = useState(state.data)
  const [selectedValue, setSelectedValue] = useState("")
  const [users, setUsers] = useState([])
  const [tickets, setTickets] = useState([])
  const [userState, setUserState] = useState({
    open: false,
    delete: false,
    loading: false,
    showSelected: false,
    newUser: {}
  })
  const [ticketState, setTicketState] = useState({
    open: false,
    delete: false,
    loading: false,
    showSelected: false,
    newTicket: {}
  })

  const loadOptions = async (inputValue, callback) => {

    if (inputValue.length > 2) {
      console.log(inputValue);
      const requestResults = await userService.listAllSearched(inputValue)
      callback(requestResults.data)
    }
  }

  const loadNewUserData = async () => {
    await service.getAllRelatedUsers(project.id, (data, error) => {
      if (error) return console.log(error);
      setUsers(data);
    })
  }
  const loadTicketsData = async () => {
    await ticketService.listAllByProject(project.id, (data, error) => {
      if (error) return console.log(error);
      setTickets(data.data);
    })
    //console.log(ticketdate[0]);
  }

  useEffect(() => {
    loadNewUserData()
    loadTicketsData()
  }, []);

  const addNewMember = () => {
    setUserState({ ...userState, open: true })
  }
  const handleSort = (e) => {

  }
  const handlePerRowsChange = (e) => {

  }
  const handlePageChange = (e) => {

  }
  const editProject = () => {
    navigate('/project/add', { state: { project, title: "Edit Project" } })
  }
  const assingMember = async () => {
    await service.addUserToProject(project.id, userState.newUser.id, (error) => {
      if (error) return setUserState({ ...userState, open: true })
      loadNewUserData()
      setUserState({ ...userState, open: false })
    });
  }

  const unassingMember = async () => {
    try {
      await service.removeRelatedUsers(project.id, userState.newUser.id);
      loadNewUserData()
      setUserState({ ...userState, delete: false })
    } catch (error) {
      setUserState({ ...userState, delete: true })
    }
  }
  const addTicket = () => {
    navigate('/ticket/add', { state: { project: project } })
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
      name: 'Date Of Birth',
      selector: row => row.dob,
      sortable: true,
      sortField: 'dob',
      width: "10em"
    },
    {
      name: '',
      cell: row => (<div className='flex flex-row min-w-fit'>
        <IconButton color="light-blue" variant='text' className={"mr-2"}
          onClick={() => { navigate('/user/view', { state: { data: row } }) }}   >
          <MdVisibility className='w-5 h-5' />
        </IconButton>
        <IconButton color="red" variant='text'
          onClick={() => { setUserState({ ...userState, newUser: row, delete: true }) }}   >
          <MdPersonRemove className="w-5 h-5" />
        </IconButton>
      </div>),

      width: "6rem",
    }
  ]
  const ticketsColumns = [
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
      width: "fit-content"
    },
    {
      name: 'Submitter',
      selector: row => row.submitter.name,
      sortable: true,
      sortField: 'submitter',
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      sortField: 'status',
      width: "fit-content"
    },
    {
      name: 'Last Date',
      selector: row => row.lastDate,

      width: "fit-content"
    },
    {
      name: '',
      cell: row => (<div className='flex flex-row min-w-fit w-f'>
        <IconButton color="light-blue" variant='text' className={"mr-2"} ripple
          onClick={() => { navigate('/ticket/view', { state: { data: row, title: "Edit Ticket" } }) }}   >
          <MdVisibility className="h-5 w-5" />
        </IconButton>
      </div>),
      width: "4rem"
    }
  ]


  return (<>
    <div className="bg-light-blue-500 px-3 md:px-8 h-32" />
    <div className='min-h-screen  -mt-24 p-4 '>
      <Dialog open={userState.open} dismiss={{ enabled: true, outsidePointerDown: false, }}
        handler={() => setUserState({ ...userState, open: false, newUser: {}, showSelected: false })}
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
                onChange={(opt) => setUserState({ ...userState, newUser: opt, showSelected: true })} openMenuOnClick={false}
                //  onInputChange={selectInputChange}
                placeholder="Search Member" />
            </div>
            <div className="">

              <div className={(userState === undefined ? "hidden " : " ") + "mt-2 mb-2 text-slate-600"}>
                <h1 className={(userState ? " " : "hidden ") + 'text-black font-semibold'}>Are You Sure To Assign This Member To Project ? </h1>
                <p>Name : {userState.newUser?.name}</p>
                <p>Email : {userState.newUser?.email}</p>
                <p>Date Of Birth : {userState.newUser?.dob}</p>
                <p>Contact : {userState.newUser?.mobile}</p>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <div className='flex justify-between'>
            <Button color="light-blue" variant='text' className={"mr-4"}
              onClick={() => setUserState({ ...userState, open: false })}
              ripple >Cancel</Button>

            <Button color="teal" onClick={assingMember}
              ripple >
              Assign
            </Button>
          </div>
        </DialogFooter>
      </Dialog>

      <Dialog size="sm" open={userState.delete} handler={() => setUserState({ ...userState, delete: false, newUser: {} })}>
        <DialogHeader >
          <p className="mr-4">Are You Sure To Unassign This Member From Project ?</p>
        </DialogHeader>
        <DialogBody>
          <div className="px-8">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et inventore, iste quis facere perspiciatis impedit cupiditate.

            {userState.delete ?
              <div className={"mt-2 mb-2 text-slate-600"}>
                <p>Name : {userState.newUser.name}</p>
                <p>Email : {userState.newUser.email}</p>
                <p>Date Of Birth : {userState.newUser.dob}</p>
              </div> : "" + { userState }}
          </div>
        </DialogBody>
        <DialogFooter>
          <div className='flex justify-between'>
            <Button color="light-blue" variant='text' className={"mr-4"}
              onClick={() => setUserState({ ...userState, delete: false })}
              ripple >
              Cancel
            </Button>
            <Button color="red" onClick={unassingMember}
              ripple >
              Delete
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
      <div className="">

      </div>
      <div className="">
        <Card>
          <CardHeader color="purple" className='px-4 py-2'>
            <div className="w-full flex items-center justify-between">
              <h2 className="text-white text-2xl">{project.name}</h2>
              <div className="flex justify-end">

                <Button color="purple" onClick={editProject} >Edit</Button>
                <Button color="purple" onClick={() => navigate(-1)} >Back</Button>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <div className=" rounded-b-lg p-1 pb-3 md:p-6 ">
              <div className="flex m-3 ">
                <div className="flex-none font-bold w-32  md:block hidden">Details : </div>
                <div className="flex-1 font-sans w-64" >
                  <span className='font-bold md:hidden'>Details : </span>{project.detail}</div>
              </div>
              <div className="flex mx-3 my-1 md:my-1 ">
                <div className="flex-none font-bold w-32">Created At : </div>
                <div className="flex-initial font-mono w-64">{project.created}</div>
              </div>
              <div className="flex mx-3 my-1 md:my-1 ">
                <div className="flex-none font-bold w-32">Updated At : </div>
                <div className="flex-initial font-mono w-64">{project.updated}</div>
              </div>
              <div className="flex mx-3 my-1 md:my-1 ">
                <div className="flex-none font-bold w-32">Last Date : </div>
                <div className="flex-initial font-mono w-64">{project.lastDate}</div>
              </div>
              <div className="flex mx-3 my-1 md:my-1 ">
                <div className="flex-none font-bold w-32">Status : </div>
                <div className="flex-initial font-mono w-64">{project.status}</div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className=" md:flex md:flex-wrap md:gap-4 mt-10">
        <div className="md:flex-1 mb-4 ">
          <Card>
            <CardHeader color="purple" className='px-4 py-2'>
              <div className="w-full flex items-center justify-between">
                <h2 className="text-white text-2xl">Related Members</h2>
                <Button color="purple" onClick={addNewMember} >Assign Member</Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="pb-2 pr-2 select-none">
                <DataTable columns={columns} data={users} customStyles={customStyles}
                  theme='solarized'
                  progressPending={userState.loading}
                  pagination paginationTotalRows={null}
                  // onSort={handleSort} sortServer 
                  onChangeRowsPerPage={handlePerRowsChange}
                  onChangePage={handlePageChange}
                  highlightOnHover pointerOnHover responsive dense
                //  expandableRows expandableRowsComponent={ExpandedComponent}
                />
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="md:flex-1">

          <Card>
            <CardHeader color="purple" className='px-4 py-2'>
              <div className="w-full flex items-center justify-between">
                <h2 className="text-white text-2xl">Related Tickets</h2>
                <Button color="purple" onClick={addTicket} >Add Ticket</Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="pb-2 pr-2 select-none">
                <DataTable columns={ticketsColumns} data={tickets}// customStyles={dtStyle}
                  theme='solarized'
                  progressPending={userState.loading}
                  pagination paginationTotalRows={null}
                  // onSort={handleSort} sortServer 
                  onChangeRowsPerPage={handlePerRowsChange}
                  onChangePage={handlePageChange}
                  highlightOnHover pointerOnHover responsive dense
                //  expandableRows expandableRowsComponent={ExpandedComponent}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

    </div>
  </>
  )
}

export default ViewProject
