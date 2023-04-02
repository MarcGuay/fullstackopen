import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ value, onChange }) => (
  <div>
    <span>filter shown with</span>
    <input value={value} onChange={onChange} />
  </div>
)

const PersonForm = ({ onSubmit, nameVal, nameChange, numVal, numChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      name:
      <input value={nameVal} onChange={nameChange} />
    </div>
    <div>number: 
      <input value={numVal} onChange={numChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ persons, deleteHandler }) => (
  persons.map(person =>
    <div key={person.id}>
      <span>{person.name} {person.number}</span><button onClick={() => deleteHandler(person)}>delete</button>
    </div>
  )
)

const Notification = ({ message, type }) => {

  if (message === null) {
    return null
  }

  return (
    <div className={`message ${type}`}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState({message: null, type: null})

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const peopleToShow = persons.filter(person => person.name.toLowerCase().includes(searchFilter.toLowerCase())).sort((a, b) => a.id - b.id)
    
  const addName = (event) => {
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson){
      if (window.confirm(`${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`)){
        personService.update(existingPerson.id, newPerson)
          .then(returnedPerson => {
            const newPersons = [returnedPerson, ...persons.filter(person => person.id !== existingPerson.id)]
            setPersons(newPersons)
            setNewName('')
            setNewNumber('')
          })
          .catch(error =>{
            setErrorMessage({message:`Information of ${existingPerson.name} has already been removed from the server`, type:'error'})
          })
      }
    } else {
    
      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setErrorMessage({message:`Added ${returnedPerson.name}`, type:'success'})
          setTimeout(() => {
            setErrorMessage({message: null, type: null})
          }, 5000)
        })
    }
  }
  
  const deleteName = (person) => {
      if (window.confirm(`Delete ${person.name}?`)){
        personService.del(person.id)
          .then(response => {
            setPersons(persons.filter(p => p.id !== person.id))
          })
          .catch(error => {
            //error
          })
      }
      
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleSearchFilterChange = (event) => {
    setSearchFilter(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage.message} type={errorMessage.type} />
      <Filter value={searchFilter} onChange={handleSearchFilterChange} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addName} nameVal={newName} nameChange={handleNameChange} numVal={newNumber} numChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={peopleToShow} deleteHandler={deleteName} />
    </div>
  )
}

export default App