import NavBar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import { Outlet } from "react-router-dom"
const Layout = () => {
  return (
    <div>
      <NavBar/>
      <Outlet></Outlet>
      <Footer/>
    </div>
  )
}

export default Layout