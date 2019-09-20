import React, { useState, useEffect } from 'react'
import personService from './services/persons'

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredPersons, setFilteredPersons ] = useState(persons)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
        setFilteredPersons(initialPeople)
      })
      .catch(err => {
        console.log(err);  
      });
  }, [])

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

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setFilteredPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
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