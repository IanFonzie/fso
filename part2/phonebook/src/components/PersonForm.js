import React from 'react'
import PropTypes from 'prop-types'

const PersonForm = ({ nameValue, numberValue, handleNameChange, handleNumberChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={nameValue} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={numberValue} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

PersonForm.propTypes = {
  nameValue: PropTypes.string,
  numberValue: PropTypes.string,
  handleNameChange: PropTypes.func,
  handleNumberChange: PropTypes.func,
  handleSubmit: PropTypes.func
}

export default PersonForm
