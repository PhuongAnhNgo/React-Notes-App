import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from '@mui/icons-material/Save';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

function NoteDetails() {
    const [note, setNote] = useState({
        title: "",
        content:""    
    });
    const {state} = useLocation();
    const { id} = state; 
    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;
        setNote((prevValue) => {
          return {
            ...prevValue,
            [name]: value
          };
        });
    }

    async function delItem(event) {
        try{
          const link = "http://localhost:5000/api/deleteNote/" + id;
          await axios.get(link);
          return navigate("/");
        }catch(err){
          console.log(err);
        }
    }

    async function saveItem(event) {
          const link = "http://localhost:5000/api/updateNote/" + id;
          await axios.post(link,{
            title:note.title,
            content:note.content
          });
          return navigate("/");
        
      }

    useEffect(()=>{
        const fetchNote = async ()=>{
            try{  
                const link = "http://localhost:5000/api/getNote/" + id;
                const res = await axios.get(link);
                setNote(res.data);
              }catch(err){
                console.log(err);
              }
          }
        fetchNote();
        
    },[id]) 

    return (
        <div>
            <div className="note-box">
            <input
                name="title"
                placeholder="Title"
                value={note.title}
                onChange={handleChange}
            />
            <textarea
                name="content"
                placeholder="Take a note..."
                rows="3"
                value={note.content}
                onChange={handleChange}
                required=""
            />
            <a href="/" id="save" onClick={saveItem}> <SaveIcon/></a>
            <a href="/" id="del" onClick={delItem}> 
                <DeleteIcon />
            </a>
            </div>
            </div>
     
    );
}

export default NoteDetails;
