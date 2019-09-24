import React from 'react'

const Notification = ({message, status}) => {
  if (message === null) {
    return null;
  }
  return (
    <p className={`notification ${status}`}>{ message }</p>
  )
}

export default Notification