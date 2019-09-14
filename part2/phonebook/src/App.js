import React, { useState } from 'react'

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredPersons, setFilteredPersons ] = useState(persons)

  const handleName = event => {
    setNewName(event.target.value)
  }

  const handlePhone = event => {
    setNewNumber(event.target.value)
  }

  const handleNameFilter = event => {
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1));
  }

  const addPerson = event => {
    event.preventDefault();
    const found = persons.some(person => person.name === newName)

    if (found) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {name: newName, number: newNumber}
      setPersons(persons.concat(personObject))
      setFilteredPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleNameFilter={handleNameFilter} />

      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handlePhone={handlePhone} handleName={handleName} />      

      <h2>Numbers</h2>
      
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App