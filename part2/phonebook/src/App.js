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
      <span>{person.name} {person.number}</span><button onClick={() =>deleteHandler(person.id)}>delete</button>
    </div>
  )
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const peopleToShow = persons.filter(person => person.name.toLowerCase().includes(searchFilter.toLowerCase()))
  
  const addName = (event) => {
    event.preventDefault();

    if (persons.find(person => person.name == newName)){
      alert(`${newName} already exists in the phonebook`)
    } else {
    
      personService.create({name: newName, number: newNumber})
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  
  const deleteName = (id) => {
      personService.del(id)
        .then(response => {
          //success
        })
        .catch(error => {
          //error
        })
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
      <Filter value={searchFilter} onChange={handleSearchFilterChange} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addName} nameVal={newName} nameChange={handleNameChange} numVal={newNumber} numChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={peopleToShow} deleteHandler={deleteName} />
    </div>
  )
}

export default App