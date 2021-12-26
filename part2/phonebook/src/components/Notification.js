import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`notification ${message.type}`}>
      {message.value}
    </div>
  )
}

Notification.propTypes = {
  message: {
    type: PropTypes.string,
    value: PropTypes.string
  }
}

export default Notification
