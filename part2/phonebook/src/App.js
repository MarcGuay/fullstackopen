import { useState } from 'react'

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

const Persons = ({ persons }) => (
  persons.map(person =>
    <div key={person.name}>{person.name} {person.number}</div>
  )
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  
  const peopleToShow = persons.filter(person => person.name.toLowerCase().includes(searchFilter.toLowerCase()))

  const addName = (event) => {
    event.preventDefault();

    if (persons.find(person => person.name == newName)){
      alert(`${newName} already exists in the phonebook`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
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
      <Filter value={searchFilter} onChange={handleSearchFilterChange} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addName} nameVal={newName} nameChange={handleNameChange} numVal={newNumber} numChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={peopleToShow} />
    </div>
  )
}

export default App