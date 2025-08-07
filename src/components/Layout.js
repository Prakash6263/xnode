import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import Footer from "./Footer"

const Layout = () => {
  return (
    <div className="main-wrapper">
      <Navbar />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
