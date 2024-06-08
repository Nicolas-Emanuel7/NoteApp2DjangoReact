import React, {useState, useEffect} from 'react'

//import notes from '../assets/data'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';

 const NotePage = ({match, history}) => {
    const {id} = useParams();
    const navigate = useNavigate();
    //const note = notes.find(note => note.id===Number(id))
    let [note, setNotes] = useState([])

    useEffect(() => {
      getNote()
    }, [id])

    let getNote = async () => {
      if (id === 'new') return

      let response = await fetch(`http://localhost:8000/notes/${id}`)
      let data = await response.json()
      console.log(data)
      setNotes(data)
    }

  let createNote = async () =>{
    await fetch(`http://localhost:8000/notes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...note, 'updated': new Date()})
    })
  }


  let updateNote = async () =>{
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...note, 'updated': new Date()})
    })
  }

  let deleteNote = async () =>{
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: 'DELETE',
    })
    navigate('/')
  }

  let handleSubmit = ()=>{

    if (id !== "new" && !note.body) {
      deleteNote()
  } else if (id !== "new") {
      updateNote()
  } else if (id === 'new' && note !== null) {
      createNote()
  }

    updateNote()
    navigate('/')
  }

  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to={'/'}>
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>

        {id !== 'new' ? (
          <button onClick={deleteNote}>Deletar</button>
        ) : (
          <button onClick={handleSubmit}>Concluir</button>
        )}
      </div>
        
        <textarea onChange={(e)=> {setNotes({...note, 'body':e.target.value}) }} value={note?.body}>

        </textarea>
    </div>
  )
}

export default NotePage;