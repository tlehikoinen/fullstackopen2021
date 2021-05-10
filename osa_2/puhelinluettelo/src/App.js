import React, { useState, useEffect } from 'react'
import personService from './services/phonebook'

const RenderPhonebook = ({ filterText, persons, handleDelete }) => {
  console.log(persons)
  return (
    <ul>
      {persons
        .filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()))
        .map((person, i) => <RenderPerson key={i} person={person} handleDelete={handleDelete} />)}
    </ul>
  )
}
const RenderPerson = ({ person, handleDelete }) => <li>{person.name} {person.phonenumber} <button onClick={() => handleDelete(person.id)}>delete</button></li>

const Filter = (props) => (
  <div>
    {props.text} <input value={props.inputText} onChange={props.onChange}></input>
  </div>
)

const InputForm = ({ inputTypes }) => (
  <form>
    {inputTypes.map((input, i) => <NewInput key={i} inputInfo={input} />)}
  </form>
)

const NewInput = ({ inputInfo }) => (
  <>
    {inputInfo.inputName}: <input value={inputInfo.inputValue} placeholder={inputInfo.placeHolder} onChange={inputInfo.onChange} /><br />
  </>
)

const NewButton = ({ buttonInfo }) => (
  <>
    <button type={buttonInfo.type} onClick={buttonInfo.onClick}>{buttonInfo.text}</button>
  </>
)


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        console.log('response fulfilled')
        setPersons(response.data)
        console.log(response.data)
      })
  }, [])


  const handleNewUser = (event) => setNewName(event.target.value)
  const handleNewPhonenumber = (event) => setNewNumber(event.target.value)
  const handleNewFilter = (event) => setFilterText(event.target.value)

  const updatePhonebook = () => {
    personService
      .getAll()
      .then(response => setPersons(response.data))
  }

  const addNewUser = (event) => {
    event.preventDefault()
    const userInfo = nameAlreadyInList()
    if (userInfo) {
      const newUserInfo = {...userInfo, phonenumber: newNumber}
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
      personService
      .updateUserPhonenumber(newUserInfo)
      .then(() => updatePhonebook())

    } else {
      const newUser = {
        name: newName,
        phonenumber: newNumber
      }
      personService
        .create(newUser)
        .then(() => {
          updatePhonebook()
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deleteUser = (id) => {
    const deletedUser = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${deletedUser.name} ?`))
      personService
        .deleteUser(id)
        .then(() => updatePhonebook())
  }

  function nameAlreadyInList() {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName)
        return persons[i];
    }
    return false;
  }

  const inputs = [
    { inputName: 'name', inputValue: newName, placeHolder: 'Enter new name', onChange: handleNewUser },
    { inputName: 'phone', inputValue: newNumber, placeHolder: 'Enter phonenumber', onChange: handleNewPhonenumber }
  ]

  return (
    <div className="phonebook">
      <h2>Phonebook</h2>
      <Filter text="Filter shown with" inputText={filterText} onChange={handleNewFilter} />
      <h3>Add a new</h3>
      <InputForm inputTypes={inputs} />
      <NewButton buttonInfo={{ type: "submit", text: "add", onClick: addNewUser }} />
      <h3>Numbers</h3>
      <RenderPhonebook filterText={filterText} persons={persons} handleDelete={deleteUser} />
    </div>
  )
}

export default App