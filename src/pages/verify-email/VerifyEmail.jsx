import { useState } from "react";
import "./VerifyEmail.css"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';


const VerifyEmail = () => {
  const navigate = useNavigate();
  const [userotp, setUserOtp] = useState({otp: "",})

  const verifyFetchUserotp = async (userotp) =>{
    try{
      const {data} = await axios.post(`https://notes-app-bmtb.onrender.com/api/v1/auth/verify-email`, userotp,{
      headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      "Access-Control-Allow-Origin":"*"
      }
    })
    // localStorage.setItem("userToken", JSON.stringify(data.accessToken));
    console.log(data)
    navigate("/login");

    } catch(err){
      console.log(err)
      toast.error(err.response.data.message, {position: "top-center",theme: "dark",});
    }
    
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    verifyFetchUserotp(userotp);
    console.log(userotp);
  };

  const handleChange = (e) =>{
    const newUserData = {...userotp};
    newUserData[e.target.name] = e.target.value;
    setUserOtp({...newUserData});
    // console.log(setUserOtp);
  };

  return (
    <div style={{
      width: '380px',
      height: '300px',
      }} className="box">
        <ToastContainer />
        <span className="borderLine"></span>
        <form  onSubmit={handleSubmit}>
            <h2>Verify Email</h2>
            <div className="inputBox">
                <input onChange={handleChange} type="text" name="otp" id="otp" required="required"/>
                <span htmlFor='otp'>Verify Email</span>
                <i></i>
            </div>
            <div className="links">
                <a href="#">Forgot Password</a>
                <Link to="/revierify">Revierify Email</Link>
            </div>
            <input type="submit" name="submit" id="submit" value="Submit" style={{marginTop:'20px'}}/>
        </form>
    </div>
  )
}

export default VerifyEmail