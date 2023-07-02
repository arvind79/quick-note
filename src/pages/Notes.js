import { CiSearch } from 'react-icons/ci'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsPlusLg } from 'react-icons/bs'
import NoteItem from '../components/NoteItem'
import { useEffect } from 'react'
import { MdClose } from 'react-icons/md'


const Notes = ({notes}) => {
  const [showSearch, setShowSearch] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [filteredNotes, setFilteredNotes] = useState(notes)

  const handleSearch = () => {
    setFilteredNotes(notes.filter(note => {
      if(note.title.toLowerCase().match(searchText.toLowerCase())) {
        return note
      }
    }))
  }

  useEffect(handleSearch, [searchText])

  return (
    <section>
      <header className="notes__header">
        {!showSearch && <h2>My Notes</h2>}
        {showSearch && <input type="text" value={searchText} onChange={(e) => {setSearchText(e.target.value); handleSearch();}} autoFocus placeholder="Keyword..." />}
        <button className='btn' onClick={() => setShowSearch(prevState => !prevState)}>{showSearch ? <MdClose /> : <CiSearch />}</button>
      </header>
      <div className='notes__container'>
        {
          filteredNotes == 0 && <p className="empty__notes">No Notes Found</p>
        }
        {
          filteredNotes?.map(note => <NoteItem key={note?.id} note={note}/>)
        }
      </div>    
      <Link to="/create-note" className='btn add__btn'><BsPlusLg /></Link>
    </section>
  )
}

export default Notes