import React from 'react'
import PropTypes from 'prop-types'

const Filter = ({ value, handleChange }) => {
  return (
    <div>
      filter shown with <input value={value} onChange={handleChange}/>
    </div>
  )
}

Filter.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func
}

export default Filter
