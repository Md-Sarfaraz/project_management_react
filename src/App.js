import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Dashboard from './users/dashboard';
import Member from "./users";
import AddUser from './users/adduser';
import Profile from './users/profile';
import Project from './projects';
import { Addproject } from './projects/addproject';
import ViewProject from './projects/view';
import Home from './home';
import NoMatch from './home/no-match';
import Blog from './blog';
import AddTicket from './tickets/add-ticket';
import TicketDetail from './tickets/view';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Login from './auth/login';
import AuthProvider, { AuthContext } from './context/auth-context';
import Roles from './users/roles';
import AdminNavbar from './components/AdminNavbar';
import SignUp from './auth/sign-up';
import Tickets from './tickets';
import { useContext, useEffect } from 'react';

function App() {
  const version = "0.0.1";
  const { isLoggedIn } = useContext(AuthContext);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<WithSideNav version={version} />}>
          {isLoggedIn ? <Route index element={<Dashboard />} /> : <Route index element={<Home />} />}


          <Route path="*" element={<NoMatch />} />
          <Route path='blog' element={<Blog />} />
          {/* Users/Members */}
          {["user/add"].map((path, index) =>
            <Route path={path} element={<AddUser />} key={index} />
          )}
          <Route path='user/view' element={<Profile />} />
          <Route path='user' element={<Member />} />
          <Route path='user/roles' element={<Roles />} />
          {/* Projects */}
          <Route path='project' element={<Project />} />
          <Route path='project/add' element={<Addproject />} />
          <Route path='project/view' element={<ViewProject />} />
          {/* Tickets */}
          <Route path='ticket' element={<Tickets />} />
          <Route path='ticket/add' element={<AddTicket />} />
          <Route path='ticket/view' element={<TicketDetail />} />


        </Route>
        <Route path="/" element={<WithoutSidebar version={version} />}>
          {/* Auth */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />

        </Route>
      </Routes>
    </Router >
    // context

  );
}

function WithSideNav({ version }) {
  return (
    <div className="">
      <div className="flex flex-col h-screen">
        <Sidebar />

        <div className="bg-grey-100 md:ml-64 flex-grow">
          <Outlet />

          <Footer version={version}/>
        </div>
      </div>
    </div>
  );
}

function WithoutSidebar({ version }) {

  return (
    <div className=' bg-gradient-dark w-screen min-h-screen relative flex flex-col justify-between'>
      <AdminNavbar noSideBar />
      <Outlet />
      <Footer version={version} />
    </div>

  );
}

export default App;
