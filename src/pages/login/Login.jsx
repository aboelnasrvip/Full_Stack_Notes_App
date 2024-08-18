import { useState } from "react";
import axios from "axios";
import { Link,  useNavigate,  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css"

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })

  const loginFetchUserData = async (useData) =>{
    try{
      const {data} = await axios.post(`https://notes-app-bmtb.onrender.com/api/v1/auth/login`, useData,{
      headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      "Access-Control-Allow-Origin":"*"
      }
    })
    localStorage.setItem("userToken", JSON.stringify(data.token));
    console.log(data)
    toast.success("login successfully", {position: "top-center",theme: "dark",});
    setTimeout(() => {
      navigate("/notes");
    }, 2000);
    
    } catch(err){
      console.log(err)
      toast.error(err.response.data.message, {position: "top-center",theme: "dark",});
    }
    
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    loginFetchUserData(userData);
    console.log(userData);
  };
  const handleChange = (e) =>{
    const newUserData = {...userData};
    newUserData[e.target.name] = e.target.value;
    setUserData({...newUserData});
    // console.log(userData);
  };

  return (
    <div className="box">
      <ToastContainer />
        <span className="borderLine"></span>
        <form onSubmit={handleSubmit}>
            <h2>Log In</h2>

            <div className="inputBox">
                <input onChange={handleChange} type="emall" name="email" id="email" required="required"/>
                <span htmlFor='email'>Email</span>
                <i></i>
            </div>

            <div className="inputBox">
                <input onChange={handleChange} type="password" name="password" id="password" required="required"/>
                <span htmlFor='password'>Password</span>
                <i></i>
            </div>

            <div className="links">
                <a href="#">Forgot Password</a>
                <Link to="/signup">Sign Up</Link>
            </div>
            <input type="submit" name="submit" id="submit" value="LogIn"/>
        </form>
    </div>
  )
}

export default Login