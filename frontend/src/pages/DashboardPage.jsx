import Navbar from '../components/Dashboard/Nav';
import Dashboard from '../components/Dashboard/Dashboard';

function DashboardPage() {

  return (
    <>
      <div className="flex min-h-screen">
        
        <Navbar className="w-64" />
        <div className="flex-1 flex flex-col">
          <Dashboard />
        </div>
      </div>
    </>
  )
}

export default DashboardPage
