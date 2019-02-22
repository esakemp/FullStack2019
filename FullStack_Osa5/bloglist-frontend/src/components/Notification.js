import React from 'react'

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  } else if (messageType === 'success') {
    return <div className="message">{message}</div>
  } else {
    return <div className="error">{message}</div>
  }
}

export default Notification