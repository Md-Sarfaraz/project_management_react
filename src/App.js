import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from "./components/navbar";
import Dashboard from './users/dashboard';

import Member from "./users";
import AddUser from './users/adduser';
import Profile from './users/profile';

function App() {
  return (
    <Router>
      <div className="bg-slate-200">

        <Navbar />
        <Routes>

          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/home' element={<Profile />} />
          <Route path='/user/add' element={<AddUser />} />
          <Route path='/user/view' element={<Profile />} />
          <Route path='/user' element={<Member />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
