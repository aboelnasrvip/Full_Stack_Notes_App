import { useRef, useState } from "react"
import "./Home.css"
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [dataNote, setDataNote] = useState({
    title: "",
    body: "",
  })

  const noteFetchUserData = async (dataNote) =>{
    try{
      const {data} = await axios.post(`https://notes-app-bmtb.onrender.com/api/v1/notes`, dataNote,{
      headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      "Access-Control-Allow-Origin":"*",
      "Authorization":`Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
      }
    })
    console.log(data)
    toast.success(data.message, {position: "top-center",theme: "dark",});
      navigate("");
    
    
    } catch(err){
      console.log(err)
      toast.error(err.response.data.message, {position: "top-center",theme: "dark",});
    }
    
  };

  const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

  const handleSubmit = (e) =>{
    e.preventDefault();
    noteFetchUserData(dataNote);
    
    let dateObj = new Date(),
    month = months[dateObj.getMonth()],
    day = dateObj.getDate(),
    year = dateObj.getFullYear();
    console.log(dataNote,day , month, year);
    setTimeout(() => {
      popupBox.current.classList.remove("show");
    }, 3000);
    

  };

  const handleChange = (e) =>{
    const newUserData = {...dataNote};
    newUserData[e.target.name] = e.target.value;
    setDataNote({...newUserData});
  };

  const boxRef = useRef()
  const popupBox = useRef()
  const popupTitle  = useRef()
  const closeIcon  = useRef()
  const titleTag  = useRef()
  const descTag   = useRef()
  const addBtn   = useRef()

  const handleButtonClick = () =>{
    popupTitle.current.innerText = "Add a new Note";
    addBtn.current.innerText = "Add Note";
    popupBox.current.classList.add("show");
  };

  const handleCloseIcon = () => {
    popupBox.current.classList.remove("show");
};

  return (
  <div>
    <ToastContainer />
    <div className="popup-box"  ref={popupBox}>
      <div className="popup">
        <div className="content">
          <header>
            <p ref={popupTitle}></p>
            <i className="uil uil-times" ref={closeIcon } onClick={handleCloseIcon}></i>
          </header>
          <form action="#">

            <div className="row title">
              <label htmlFor="title">Title</label>
              <input type="text" name="title" ref={titleTag} onChange={handleChange}/>
            </div>

            <div className="row description">
              <label htmlFor="body">Description</label>
              <textarea name="body" ref={descTag} onChange={handleChange}>Descripthion</textarea>
            </div>

            <button ref={addBtn} onClick={handleSubmit}>Add Note</button>

          </form>

        </div>
      </div>
    </div>

    <div className="$$wrapper">
      <li className="add-box" ref={boxRef} onClick={handleButtonClick}>
        {/* <div className="icon"><i className="uil uil-plus"></i></div>
        <p>Add new note</p> */}
        Creat New Note
      </li>
    </div>
  </div>
  )
}

export default Home;