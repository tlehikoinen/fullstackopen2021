import React, { useState } from 'react'


const RenderPhonebook = ({ persons }) => {
  return (
    <ul>
      {persons.map((person, i) => <RenderUserLi key={i} person={person} />)}
    </ul>
  )
}

const RenderUserLi = ({ person }) => <li>{person.name} {person.phonenumber}</li>



const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', phonenumber:'05050' }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewUser = (event) => {
    setNewName(event.target.value)
  }
  const handleNewPhonenumber = (event) => {
    setNewNumber(event.target.value)
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
      <form>
        <div>
          name: <input value={newName} placeholder="enter new name" onChange={handleNewUser} /><br/>
          phone: <input value={newNumber} placeholder="enter phonenumber" onChange={handleNewPhonenumber}/>
        </div>
        <div>
          <button type="submit" onClick={addNewUser}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <>
        <RenderPhonebook persons={persons} />
      </>
    </div>
  )

}

export default App