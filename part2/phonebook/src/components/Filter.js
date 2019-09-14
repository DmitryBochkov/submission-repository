import React from 'react'

const Filter = ({handleNameFilter}) => {
  return (
    <p>filter shown with <input onChange={handleNameFilter} /></p>
  )
}

export default Filter