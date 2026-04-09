import Dashboard from '../components/Dashboard/Dashboard';
import Nav from "../components/Dashboard/Nav"
function DashboardPage() {

  return (
    <>
      <div className="flex min-h-screen">
        <Nav />
        <div className="flex-1 flex flex-col">
          <Dashboard />
        </div>
      </div>
    </>
  )
}

export default DashboardPage
