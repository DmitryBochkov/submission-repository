import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredPersons, setFilteredPersons ] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(response.data)
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

      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setFilteredPersons(persons.concat(response.data))
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