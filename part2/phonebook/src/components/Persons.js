import React from 'react'

const Persons = ({filteredPersons, deletePerson}) => {
  return filteredPersons.map(person => <p key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>Delete</button></p>)
}

export default Persons