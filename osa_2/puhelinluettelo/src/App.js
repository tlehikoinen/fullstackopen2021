import React, { useState, useEffect } from 'react'
import personService from './services/phonebook'

const RenderPhonebook = ({ filterText, persons, handleDelete }) => {
  return (
    <ul>
      {persons
        .filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()))
        .map((person, i) => <RenderPerson key={i} person={person} handleDelete={handleDelete} />)}
    </ul>
  )
}
const RenderPerson = ({ person, handleDelete }) => <li>{person.name} {person.phonenumber} <button onClick={() => handleDelete(person.id)}>delete</button></li>

const ChangeText = ({ text }) => {
  if (text === null)
    return null

  return (
    <div className="changeText">
      {text}
    </div>
  )
}

const ErrorText = ({ text }) => {
  if (text === null)
    return null

  return (
    <div className="errorText">
      {text}
    </div>
  )
}

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
  const [changeText, setChangeText] = useState(null)
  const [errorText, setErrorText] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
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
    const newAddedUser = {"name" : newName, "phonenumber" : newNumber}

    personService
    .create(newAddedUser)
    .then( res => {
      if (res.data.errorMsg === undefined){
        setChangeText(`${res.data.name} Added successfully`)
        updatePhonebook()
      }else {
        if(res.data.errorMsg.length === 1 && res.data.errorMsg[0] === 'Name must be unique'){
          console.log(res.data)
          setErrorText(`${res.data.userInfo.name} already added, update number coming soon`)
        }else {
          setErrorText(`${res.data.errorMsg}`)
        }
      }
      setTimeout(() => {
        setErrorText(null)
        setChangeText(null)}, 2000)
    })
  }

    const deleteUser = (id) => {
      const deletedUser = persons.find(p => p.id === id)

      if (window.confirm(`Delete ${deletedUser.name} ?`)) {
        personService
          .deleteUser(id)
          .then(() => updatePhonebook())

        setChangeText(`Deleted ${deletedUser.name}`)
        setTimeout(() => {
          setChangeText(null)
        }, 2000)
      }

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
        <ChangeText text={changeText} />
        <ErrorText text={errorText} />
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