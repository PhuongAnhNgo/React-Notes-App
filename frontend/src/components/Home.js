import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Home() {
    const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchAllNotes = async ()=>{
      try{
        const res = await axios.get("http://localhost:5000/api/get");
        setNotes(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchAllNotes(); //run function
  }, [notes]) 

  async function addNotes(area) {
    try{
      await axios.post("http://localhost:5000/api/create", area);
      
    }catch(err){
      console.log(err);
    }
  }

  async function seeItem(id) {
    navigate('/NoteDetails', { state: { id: id } });
  }

  return (
    <div id="page-container">
      <div id="content-wrap">
        <Header />
        <CreateArea onAdd={addNotes} />
        {notes.map((note, index) => {
          return (
            <Note
              key={index}
              id={note._id}
              title={note.title}
              content={note.content}
              onSee={seeItem}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
