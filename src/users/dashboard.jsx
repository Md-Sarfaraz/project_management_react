import React from 'react'
import Card from '../components/card'
import Header from '../components/header'

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div className='m-content mt-14 min-h-full  bg-slate-500 p-12'>
        <Card card={{ title: "" }}>
          <div className="bg-slate-100 py-12 px-4 rounded-b-lg">
            <h2>Under Development</h2>
          </div>
        </Card>
      </div>

    </div>)
}

export default Dashboard