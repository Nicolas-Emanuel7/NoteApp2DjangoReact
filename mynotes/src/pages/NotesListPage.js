import React, {useEffect, useState} from 'react'
//import notes from '../assets/data'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'

const NotesListPage = () => {

  let [notes, setNotes] = useState([])

  useEffect(() => {
    getNotes()
  }, []) // empty array means it will only run once

  let getNotes = async () => {
    let response = await fetch('/api/notes/')
    let data = await response.json()
    console.log(data)
    setNotes(data)
}

  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className='notes-title'>&#9782; Notas</h2>
        <p className='notes-count'>{notes.length}</p>
      </div>

      <div className='notes-list'>
      {notes.map((note, index) => (
        <ListItem key={index} note={note} />
      ))}
      </div>

      <AddButton />
    </div>
    
  )
}

export default NotesListPage
