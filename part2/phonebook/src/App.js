import React, { useState, useEffect } from 'react'
import personService from './services/persons'

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredPersons, setFilteredPersons ] = useState(persons)
  const [ message, setMessage ] = useState(null)
  const [ messageStatus, setMessagetatus ] = useState('success')

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
    const found = persons.filter(person => person.name === newName.trim())

    if (found.length) {
      console.log(found[0].number, newNumber);
      if (found[0].number.trim() !== newNumber.trim()) {
        if (window.confirm(`${newName} is already added to phonebook. Replace the old number with the new one?`)) {
          const updatedPersonObject = {name: newName, number: newNumber.trim()}
          const foundId = found[0].id 

          personService
            .update(foundId, updatedPersonObject)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id === foundId ? returnedPerson : person))
              setFilteredPersons(persons.map(person => person.id === foundId ? returnedPerson : person))
              messageSetter(`${newName} was successfully updated.`)
              setNewName('')
              setNewNumber('')
            })
        }
      } else {
        alert(`${newName} is already added to phonebook`)        
      }
    } else {
      const personObject = {name: newName, number: newNumber}

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setFilteredPersons(persons.concat(returnedPerson))
          messageSetter(`${newName} was successfully added.`)
          setNewName('')
          setNewNumber('')
        })
    }
    
  }

  const deletePerson = id => {
    const newList = persons.filter(person => person.id !== id)
    const personName = persons.filter(person => person.id === id)[0].name
    if (window.confirm(`Delete ${personName}?`)) {
      personService
        .remove(id)
        .then(() => {
          messageSetter(`${personName} was successfully deleted.`)
          setPersons(newList)
          setFilteredPersons(newList)
        })
        .catch(() => {
          messageSetter(`Information of ${personName} has already been removed from the server.`, 5000, 'error')
          setPersons(newList)
          setFilteredPersons(newList)
        })
    }
  }

  const messageSetter = (msg, delay, status) => {
    if (!delay) {
      delay = 5000;
    }
    if (status === 'error') {
      setMessagetatus(status)
    } else {
      setMessagetatus('success')
    }
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
      setMessagetatus('success')
    }, delay);
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={message} status={messageStatus} />

      <Filter handleNameFilter={handleNameFilter} />

      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handlePhone={handlePhone} handleName={handleName} />      

      <h2>Numbers</h2>
      
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App