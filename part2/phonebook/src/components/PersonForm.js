import React from 'react'

const PersonForm = ({addPerson, newName, newNumber, handlePhone, handleName}) => {
  return (
    <form onSubmit={addPerson}>
      <h2>Add new</h2>
      <div>
        name: <input value={newName} onChange={handleName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handlePhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm