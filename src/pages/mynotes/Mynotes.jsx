import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import Home from "../home/Home";


const Mynotes = () => {
  const [allNotes, setAllNotes] = useState([]);
  // const [error, setError] = useState(null);
  // const [isLoding, setIsLoding] = useState(false);

  async function getAllNotes() {
    try {
      const response = await axios.get(
        "https://notes-app-bmtb.onrender.com/api/v1/notes/",
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
          },
        }
      );
      const data =  response.data.data.notes;

      setAllNotes(data);
      console.log(data);
      console.log(typeof data);
    } catch (error) {
      // setError(error.message);
      console.log(error.message);
    }
  }
  async function DeleteNote (id){
    // setIsLoding(true);
    const res = await axios.delete(`https://notes-app-bmtb.onrender.com/api/v1/notes/${id},`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
      },
    })
    // setIsLoding(false);
    console.log(res)
  }


  useEffect(() => {
    getAllNotes();
  }, []);

  const months = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];

  return (
    <>
    <Container>
    {/* <Home/> */}
			<Row xs={1} md={2} lg={4}>
      
				{allNotes.map((note)=> (
					<Col key={note.id}style={{marginTop:'20px'}}>
						<li className="note" style={{backgroundColor:'white',height:'220px',padding:'15px'}}>
              <div className="details" >
                  <p>{note.title}</p>
                  <span>{note.body}</span>
                  
              </div>
              <div className="bottom-content">
                  <div>
                    <span>
                      {new Date(note.createdAt).getDate()}/
                      {months[new Date(note.createdAt).getMonth()]}/
                      {new Date(note.createdAt).getFullYear()}
                    </span>
                  </div>
                  <div className="settings" style={{width:'40px',color:"black" ,display:"flex",justifyContent:"space-between"}}>
                    <i className="uil uil-trash" onClick={()=>DeleteNote(note.id)}></i>
                    <i className="uil uil-edit"></i>
                  </div>
              </div>
            </li>
					</Col>
				))
      }
			</Row>
    </Container>
    </>
  );
};

export default Mynotes;
