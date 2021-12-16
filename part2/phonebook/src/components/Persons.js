import React from 'react'

const Persons = ({ persons, filter, deletePersonWhoIs }) => {
  const toDisplay = filter ?
    persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) :
    persons

  return toDisplay.map(person => {
    return (
      <div key={person.id}>
        {person.name} {person.number}
        <button onClick={() => deletePersonWhoIs(person)}>delete</button>
      </div>
    )
  })
}

export default Persons
