import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from "./components/navbar";
import Dashboard from './users/dashboard';
import Member from "./users";

function App() {
  return (
    <Router>
      <div className="bg-slate-200">

        <Navbar />
        <Routes>
          <Route path='/' element={<Member />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
