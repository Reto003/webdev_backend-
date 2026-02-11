import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [notes, setnotes] = useState([])
  // console.log("hello")
  function fetchNotes(){
    axios.get("https://webdev-backend-3cby.onrender.com/api/notes")
      .then((res)=>{
        setnotes(res.data.notes)
    })
  }
  useEffect(()=>{
    fetchNotes()
  },[])

  function submitHandler(e){
    e.preventDefault()
    const {title, description} = e.target.elements
    console.log(title.value)
    console.log(description.value);

    axios.post("https://webdev-backend-3cby.onrender.com/api/notes",{
      title: title.value,
      description: description.value,
    })
      .then((res)=>{
        console.log(res.data)
        fetchNotes()
        e.target.reset()
      })
  }
  function deleteNoteHandler(noteId){
    // console.log(noteId);
    axios.delete("https://webdev-backend-3cby.onrender.com/api/notes/"+noteId)
      .then((res)=>{
        console.log(res.data)
        fetchNotes()
      })

  }

  return (
    <>
      <form className='noteCreateForm' onSubmit={submitHandler} >
        <input name='title' type="text" placeholder='enter title'/>
        <input name='description' type="text" placeholder='enter description'/>
        <button>Create note</button>
      </form>
      <div className='notes'>
        {notes.map((note)=>{
          return (<div className='note'>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={()=>{
              deleteNoteHandler(note._id)
            }}>Delete</button>
          </div>)
        })}
      </div>
    </>
  )
}

export default App
