import { useState } from "react";
import "./signup.css"
import axios from "axios";
import { Link,  useNavigate,  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const signupFetchUserData = async (useData) =>{
    try{
      const {data} = await axios.post(`https://notes-app-bmtb.onrender.com/api/v1/auth/signup`, useData,{
      headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      "Access-Control-Allow-Origin":"*"
      }
    })
    localStorage.setItem("userToken", JSON.stringify(data.accessToken));
    navigate("/verify")
    } catch(err){
      console.log(err)
      toast.error(err.response.data.message, {position: "top-center",theme: "dark",});
    }

    
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    signupFetchUserData(userData);
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
            <h2>Create Account</h2>
            <div className="inputBox">
                <input onChange={handleChange} type="text" name="name" id="name" required="required"/>
                <span htmlFor='name'>Name</span>
                <i></i>
            </div>

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
                <Link to="/">Sign In</Link>
            </div>
            <input type="submit" name="submit" id="submit" value="Sign Up"/>
        </form>
    </div>
  )
}

export default SignUp