import { useState } from 'react'
import Navbar from '../Nav/Nav';
import Dashboard from '../Dashboard/Dashboard';

function App() {

  return (
    <>
      <div className='flex'>
        <Navbar />
        <Dashboard />
      </div>
    </>
  )
}

export default App
