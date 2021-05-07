import React, { useState } from 'react'


const RenderPhonebook = ({ filterText, persons }) => {
  return (
    <ul>
      {persons
        .filter(person => person.name.includes(filterText))
        .map((person, i) => <RenderPerson key={i} person={person} />)}
    </ul>
  )
}
const RenderPerson = ({ person }) => <li>{person.name} {person.phonenumber}</li>

const Filter = (props) => (
    <div>
      {props.text} <input value={props.inputText} onChange={props.onChange}></input>
    </div>
  )

const InputForm = ({inputTypes}) => (
    <form>
      {inputTypes.map((input, i) => <NewInput key={i} inputInfo = {input}/>)}
    </form>
  )

const NewInput = ({inputInfo}) => (
  <>
  {inputInfo.inputName}: <input value={inputInfo.inputValue} placeholder={inputInfo.placeHolder} onChange={inputInfo.onChange} /><br />
  </>
  )

const NewButton = ({buttonInfo}) => (
    <>
    <button type={buttonInfo.type} onClick={buttonInfo.onClick}>{buttonInfo.text}</button>
    </>
  )


const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phonenumber: '05050' },
    { name: 'Ada Lovelace', phonenumber: '39-44-5323523' },
    { name: 'Mikko', phonenumber: '33333' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

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

  const inputs = [
    {inputName : 'name', inputValue : newName, placeHolder: 'Enter new name', onChange : handleNewUser },
    {inputName : 'phone', inputValue : newNumber, placeHolder: 'Enter phonenumber', onChange : handleNewPhonenumber }  
  ]

  return (
    <div className="phonebook">
      <h2>Phonebook</h2>
        <Filter text="Filter shown with" inputText={filterText} onChange={handleNewFilter}/>
      <h3>Add a new</h3>
        <InputForm inputTypes={inputs}/>
        <NewButton buttonInfo={{type : "submit", text : "add", onClick : addNewUser }}/>
      <h3>Numbers</h3>
        <RenderPhonebook filterText={filterText} persons={persons} />
    </div>
  )
}

export default App