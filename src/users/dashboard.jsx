import { useContext, useEffect } from 'react'

import StatusCard from './components/StatusCard';
import AssignedProjects from './components/AssignedProjects';
import AssignedTickets from './components/AssignedTickets';
import { MdViewModule, MdGroups, MdBugReport } from "react-icons/md";
import { RiFolderSettingsFill } from 'react-icons/ri'
import { AuthContext } from '../context/auth-context';

const Dashboard = () => {

  const { info } = useContext(AuthContext);
  useEffect(() => {
    // console.log("info : ", info?.relatedTickets);

  }, [])




  return (<>
    <div className="bg-light-blue-500 px-3 md:px-8 h-32 " />



    <div className="px-3 md:px-8 mb-8 -mt-12 pb-2">
      <div className="container mx-auto max-w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4 gap-4">
          <StatusCard color="bg-pink-500" icon={<MdGroups className={"h-full w-full "} />}
            title="Total Members" count={info?.totalUsers} note="Since Start" />
          <StatusCard color="bg-purple-500" icon={<RiFolderSettingsFill className={"h-full w-full "} />}
            title="Total Projects" count={info?.totalProjects} note="Since Start" />
          <StatusCard color="bg-pink-500" icon={<MdBugReport className={"h-full w-full "} />}
            title="Total Tickets" count={info?.totalTickets} note="Since Start" />
          <StatusCard color="bg-pink-500" icon={<MdViewModule className={"h-full w-full "} />}
            title="My Tickets" count={info?.totalRelatedTickets} note="Since Start" />
        </div>
      </div>
    </div>

    <div className="px-3 md:px-8 h-auto ">
      <div className="container mx-auto max-w-full">
        <div className="grid grid-cols-1 xl:grid-cols-5">
          <div className="xl:col-start-1 xl:col-end-3 px-4 mb-14">
            <AssignedProjects projects={info?.relatedProjects} />
          </div>
          <div className="xl:col-start-3 xl:col-end-6 px-4 mb-14">
            <AssignedTickets tickets={info?.relatedTickets} />
          </div>
        </div>
      </div>
    </div>

  </>);
}

export default Dashboard