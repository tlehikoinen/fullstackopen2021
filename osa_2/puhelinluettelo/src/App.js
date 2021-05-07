import React, { useState } from 'react'


const RenderPhonebook = ({ filterText, persons }) => {
  return (
    <ul>
      {persons
        .filter(person => person.name.includes(filterText))
        .map((person, i) => <RenderUserLi key={i} person={person} />)}
    </ul>
  )
}

const RenderUserLi = ({ person }) => <li>{person.name} {person.phonenumber}</li>



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phonenumber: '05050' },
    { name: 'Ada Lovelace', phonenumber: '39-44-5323523' },
    { name: 'Mikko', phonenumber: '33333' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [showAll, setShowAll] = useState(true)

  const handleNewUser = (event) => {
    setNewName(event.target.value)
  }
  const handleNewPhonenumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleNewFilter = (event) => {
    setFilterText(event.target.value)
  }


  const addNewUser = (event) => {
    event.preventDefault()
    if (nameAlreadyInList()) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newUser = {
        name: newName,
        phonenumber: newNumber
      }
      setPersons(persons.concat(newUser))
      setNewName('')
      setNewNumber('')
    }
  }

  function nameAlreadyInList() {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName)
        return true;
    }
    return false;
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={filterText} onChange={handleNewFilter}></input>
      </div>
      <form>
        <div>
          <h2>Add new</h2>
          name: <input value={newName} placeholder="enter new name" onChange={handleNewUser} /><br />
          phone: <input value={newNumber} placeholder="enter phonenumber" onChange={handleNewPhonenumber} />
        </div>
        <div>
          <button type="submit" onClick={addNewUser}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <>
        <RenderPhonebook filterText={filterText} persons={persons} />
      </>
    </div>
  )

}

export default App