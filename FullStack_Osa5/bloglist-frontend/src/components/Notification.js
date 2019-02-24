import React from 'react'
import PropTypes from 'prop-types'


const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  } else if (messageType === 'success') {
    return <div className="message">{message}</div>
  } else {
    return <div className="error">{message}</div>
  }
}

Notification.propTypes = {
  message: PropTypes.string,
  messageType: PropTypes.string
}

export default Notification