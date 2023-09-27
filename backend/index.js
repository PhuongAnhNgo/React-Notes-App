const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors'); 

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/todoDB");

app.get('/', (req, res) => {
  res.send("This is backend");
});

//------------------------------------------------
//                 Create Schema
//------------------------------------------------
const noteSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {  //Add a validation
        type: String
    }
});

//------------------------------------------------
//          Create collection/ table
//------------------------------------------------
const Note = mongoose.model("Note", noteSchema); //Create collection with fruitSchema, name of collection ('Fruit') will
//be automatically transformed into plural


// Get all notes
app.get("/api/get", (req,res)=>{
    Note.find({}).then(function(notes){   
        return res.send(notes);
    });
});



// Route to get one note
app.get("/api/getNote/:id", (req,res)=>{
    const id = req.params.id;
    
    Note.findOne({_id:id}).then(function(note){ 
        //console.log(note); 
        return res.send(note);
    });  
});

// Route for adding a note
app.post("/api/create", (req,res)=>{
    const title = req.body.title;
    const content = req.body.content;

    const newNote = new Note({
        title: title,
        content: content
    })
    newNote.save();
});

// Route for deleting a note
app.get("/api/deleteNote/:id", (req,res)=>{
    const id = req.params.id;

    Note.deleteOne({_id:id}).then (function() {  })
      .catch(function (err) {
        console.log(err);
      }); 
     
});

// Route to change title
app.post('/api/updateNote/:id',(req,res)=>{
    const id = req.params.id;
    const newTitle = req.body.title;
    const newContent = req.body.content;

    Note.updateOne({_id:id}, 
        {title:newTitle, content:newContent}).then(function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated Docs : ", docs);
        }
    });   
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });