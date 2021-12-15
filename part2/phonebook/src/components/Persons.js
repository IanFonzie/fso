import React from 'react'

const Persons = ({ persons, filter }) => {
  const toDisplay = filter ?
    persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) :
    persons

  return toDisplay.map(person => <div key={person.name}>{person.name} {person.number}</div>)
}

export default Persons
