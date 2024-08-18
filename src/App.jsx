import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login"
import SignUp from "./pages/signup/SignUp"
import VerifyEmail from "./pages/verify-email/VerifyEmail";
import RevierifyEmail from "./pages/revierify-mail/RevierifyEmail";
import Home from "./pages/home/Home";
import Mynotes from "./pages/mynotes/Mynotes";
import Layout from "./layout/Layout";
function App() {

const Routing = createBrowserRouter([
  {path: "/", element:<Layout/>, 
  children:[
    {path: "/home", element:<Home/>},
    {path: "/notes", element:<Mynotes/>},
  ]
},
  
  {path: "/login", element:<Login/>},
  {path: "/signup", element:<SignUp/>},
  {path: "/verify", element:<VerifyEmail/>},
  {path: "/revierify", element:<RevierifyEmail/>},

]);
  return (

    
    <RouterProvider router={Routing}/> 

  )
}

export default App
