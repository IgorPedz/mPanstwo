import { useState } from 'react'
import Navbar from '../Nav/Nav';
import Dashboard from '../Dashboard/Dashboard';
import Headbar from '../Dashboard/Headbar'
function App() {

  return (
    <>
      <div className="flex min-h-screen">
        <Navbar className="w-64" />

        <div className="flex-1 flex flex-col">
          <Headbar />
          <Dashboard />
        </div>
      </div>
    </>
  )
}

export default App
