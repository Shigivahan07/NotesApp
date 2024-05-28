import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Note as NoteModel } from '../models/note';
import * as NotesApi from "../network/notes_api";
import Styles from "../styles/NotesPage.module.css";
import StyleUtils from "../styles/utils.module.css";
import AddEditNoteDialog from '../components/AddEditNoteDialog';
import Note from "./Note";


const NotesPageLoggedInView = () => {

    const [notes,setNotes] = useState<NoteModel[]>([]);
    const [notesLoading, setNotesLoading] = useState(true);
    const[showNotesLoadingError, setshowNotesLoadingError] = useState(false);
    const [ShowAddNoteDialog, setShowAddNoteDialog] = useState(false);
    const [ noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null);

  useEffect(()=> {
    async function loadNotes(){
      try{
		setshowNotesLoadingError(false);
		setNotesLoading(true);
      const notes= await NotesApi.fetchNotes();
      setNotes(notes);
    }catch(error){
        console.error(error);
        setshowNotesLoadingError(true);
    }finally{
		setNotesLoading(false);
	}
  }
    loadNotes();
  },[]);

async function deleteNote(note:NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter(existingNote =>existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
}


const notesGrid = 
<Row xs={1} md={2} xl={3} className={`g-4 ${Styles.notesGrid}`}>
      {notes.map(note=>(
        <Col  key={note._id}>
        <Note note = {note} className={Styles.note}
          onDeleteNoteClicked={deleteNote}
          onNoteClicked={setNoteToEdit}
        />
        </Col>
      ))}
      </Row>
  
    return ( 
        <>
        <Button className={`mb-4 ${StyleUtils.blockCenter} ${StyleUtils.flexCenter} ${StyleUtils.addButton}`}
      onClick={()=>setShowAddNoteDialog(true)}>
        <FaPlus/>
        Add new Note
      </Button>
      {notesLoading && <Spinner animation='border' variant='primary'/>}
	  {showNotesLoadingError && <p>Something Went Wrong. Please refresh the page</p>}
	  {!notesLoading && !showNotesLoadingError &&
	  <>
	  	{
			notes.length > 0
			?notesGrid
			:<p className={StyleUtils.NoParagraph}>You dont have any notes yet<br/> Click Add Notes button to add notes</p>
		}
	  </>}
      {
        ShowAddNoteDialog && 
        <AddEditNoteDialog
          onDismiss={()=> setShowAddNoteDialog(false)}
          onNoteSaved={(newNote)=>{
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      }
      {noteToEdit &&
      <AddEditNoteDialog
      noteToEdit={noteToEdit}
      onDismiss={()=> setNoteToEdit(null)}
      onNoteSaved={(updatedNote)=>{
        setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote: existingNote))
        setNoteToEdit(null);
      }}
      />
    }
        </>
     );
}
 
export default NotesPageLoggedInView;