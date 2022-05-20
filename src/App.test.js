import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
{/* 
<Router>
<div className="flex flex-col h-screen">
  <Sidebar />
  <div className="bg-slate-100 md:ml-64 flex-grow">

    <Routes>
      {/* <Route
      element={(
        <>
          <Navbar />
          <Outlet />
        </>
      )}
    > /}
      <Route path='/dashboard' element={<Dashboard />} />
      <Route index element={<Home />} />
      <Route path="*" element={<NoMatch />} />
      <Route path='/blog' element={<Blog />} />
      {/* Users/Members /}
      {/* <Route path={['/user/add', '/signup']} element={<AddUser />} /> /}
      {["/user/add", "/signup"].map((path, index) =>
        <Route path={path} element={<AddUser />} key={index} />
      )}
      <Route path='/user/view' element={<Profile />} />
      <Route path='/user' element={<Member />} />
      {/* Projects /}
      <Route path='/project' element={<Project />} />
      <Route path='/project/add' element={<Addproject />} />
      <Route path='/project/view' element={<ViewProject />} />
      {/* Tickets /}
      <Route path='/ticket/add' element={<AddTicket />} />
      <Route path='/ticket/view' element={<TicketDetail />} />
      {/* </Route> /}
      {/* Auth /}
      <Route path='/login' element={<Login />} />

    </Routes>
    <Footer />
  </div>
</div>
</Router >


*/}