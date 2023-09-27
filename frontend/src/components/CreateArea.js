import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

function CreateArea(props) {
  const [area, setArea] = useState({
    title: "",
    content: ""
  }); //Init as an Object

  function handleChange(event) {
    const { name, value } = event.target;
    setArea((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  return (
    <div className="form">
      <input
        name="title"
        placeholder="Title"
        value={area.title}
        onChange={handleChange}
      />
      <textarea
        name="content"
        placeholder="Take a note..."
        rows="3"
        value={area.content}
        onChange={handleChange}
        required=""
      />
      <Fab
        onClick={() => {
          props.onAdd(area);
          setArea({
            title: "",
            content: ""
          });
        }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default CreateArea;
