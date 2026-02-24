import Navbar from '../components/Dashboard/Nav';
import Dashboard from '../components/Dashboard/Dashboard';
import Headbar from '../components/Dashboard/Headbar'

function DashboardPage() {

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

export default DashboardPage
