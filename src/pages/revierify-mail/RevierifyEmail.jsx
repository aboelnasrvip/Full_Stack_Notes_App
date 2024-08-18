import { ToastContainer, toast } from 'react-toastify'
import './RevierifyEmail.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';

const RevierifyEmail = () => {
  const [revierifyOtp, setRevierifyOtp] = useState({email: "",});

  const revierifyFetchUserOtp = async (revierifyOtp) =>{
    try{
      const {data} = await axios.post(`https://notes-app-bmtb.onrender.com/api/v1/auth/reverify-email`, revierifyOtp,{
      headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      "Access-Control-Allow-Origin":"*"
      }
    })
    localStorage.setItem("userToken", JSON.stringify(data.accessToken));
    } catch(err){
      console.log(err)
      toast.error(err.response.data.message, {position: "top-center",theme: "dark",});
    }
    
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    revierifyFetchUserOtp(revierifyOtp);
    console.log(revierifyOtp);
  };
  
  const handleChange = (e) =>{
    const newUserData = {...revierifyOtp};
    newUserData[e.target.name] = e.target.value;
    setRevierifyOtp({...newUserData});
    // console.log(userData);
  };
  return (
    <div style={{
      width: '380px',
      height: '300px',
      }} className="box">
      <ToastContainer />
        <span className="borderLine"></span>
        <form onSubmit={handleSubmit}>
            <h2>Revierify Email</h2>
            <div className="inputBox">
                <input onChange={handleChange} type="emall" name="email" id="email" required="required"/>
                <span htmlFor='email'>Email</span>
                <i></i>
            </div>

            <div className="links">
                <a href="#">Forgot Password</a>
                <Link to="/">Sign In</Link>
            </div>
            <input type="submit" name="submit" id="submit" value="Sign Up" style={{marginTop:'20px'}}/>
        </form>
    </div>
  )
}

export default RevierifyEmail