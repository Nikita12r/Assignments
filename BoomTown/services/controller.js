const express = require('express');
const fs = require('fs');
const path = require('path');
const { isRegExp } = require('util');
const notesFilePath=path.join(__dirname,'../data/NotesData.json');


//Function to get all the notes from the json file

exports.getAllNotesData = async(req,res,next) =>{
    try{
        const data=fs.readFileSync(notesFilePath);
        const notes=JSON.parse(data);        
        res.status(201).json(notes);
    }
    catch(e){
        next(e);
    }
}

//Function to get specific note from the json file

exports.getOneNoteData = async(req, res,next) => {

    try{
        
       const data=fs.readFileSync(notesFilePath);
        const notes=JSON.parse(data);
       
        const notesData=notes.find(notes => notes.Notes_Id === Number(req.params.id));
       
        if(!notesData){
            const err=new Error('Notes not found');
            err.status=404;
            throw err;
        }
        else{
         res.status(201).json(notesData);
        }
       
    }catch(e){       
       next(e);
    }

 
}

//Function to create new note & write it in the json file

exports.createNewNote = (req, res) => {   
 try {

  if(!req.body.Notes_Type.toString().match(/^[0-9]{2}$/g) || !req.body.Notes_Data){
    res.status(401);
    res.json({message: "Bad Request.Invalid Input Parameters."})
  }
  else{
      const notesData = fs.readFileSync(notesFilePath);
      const notes = JSON.parse(notesData);

      const findNote=notes.find(notes => notes.Notes_Id === Number(req.body.Notes_Id));
      if(findNote){
          res.status(201);
          res.json({message: "New Record Should have Unique Id"});
      }
      else{
            const newNote = {
            Notes_Id: req.body.Notes_Id,
            Notes_Type: req.body.Notes_Type,
            Notes_Data: req.body.Notes_Data,
        };
        notes.push(newNote);
        fs.writeFileSync((notesFilePath), JSON.stringify(notes));
        res.status(201).json(newNote);
      }
    }
  } catch (e) {
    next(e);
  }
}


//Function to update note data in the json file

exports.updateNote =async(req, res,next) => {  
 try {

  if(!req.body.Notes_Type.toString().match(/^[0-9]{2}$/g) || !req.body.Notes_Data){
      res.status(401);
      res.json({message: "Bad Request.Invalid Input Parameters."})
  }
  else{
      const data = fs.readFileSync(notesFilePath);
      const notesData = JSON.parse(data);
      const noteUpdate = notesData.find(notes => notes.Notes_Id === Number(req.params.id));
      if (!noteUpdate) {
        const err = new Error('Notes not found');
        err.status = 404;
        throw err;
      }
      const newNoteData = {
          Notes_Id: Number(req.params.id),
          Notes_Type: req.body.Notes_Type,
          Notes_Data: req.body.Notes_Data,
        
      };
      const newNote = notesData.map(notes => {
        if (notes.Notes_Id === Number(req.params.id)) {
          return newNoteData;
        } else {
          return notes;
        }
      });
      fs.writeFileSync((notesFilePath) , JSON.stringify(newNote));
      res.status(200).json(newNoteData);
  }
  } catch (e) {
    next(e);
  }
}

//Function to delete the note entry from the json file

exports.deleteNote = async(req, res,next) => {
   try {
        const data = fs.readFileSync(notesFilePath);
        const notesData = JSON.parse(data);
        const note = notesData.find(notes => notes.Notes_Id === Number(req.params.id));
        if (!note) {
          const err = new Error('Notes not found');
          err.status = 404;
          throw err;
        }
        const newNote = notesData.map(notes => {
          if (notes.Notes_Id === Number(req.params.id)) {
            return null;
          } else {
            return notes;
          }
        })
        .filter(notes => notes !== null);
        fs.writeFileSync(notesFilePath, JSON.stringify(newNote));
        res.status(200).end();
  } catch (e) {
    next(e);
  }
}