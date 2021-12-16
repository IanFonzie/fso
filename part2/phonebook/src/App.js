import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  const handleChange = (setState) => event => setState(event.target.value)

  const handleSubmit = event => {
    event.preventDefault()

    // Keep names unique.
    const exists = persons.find(person => person.name === newName)
    if (!exists) {
      personService
        .create({name: newName, number: newNumber})
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      return
    }

    alert(`${newName} is already added to the phonebook`)
  }

  const deletePerson = personToDelete => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .remove(personToDelete.id)
        .catch(_ => {
          alert(`the person with ID '${personToDelete.id}' was already deleted from server`)
        })
        .finally(_ => setPersons(persons.filter(person => person.id !== personToDelete.id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handleChange={handleChange(setFilter)} />
      <h3>add a new</h3>
      <PersonForm
        nameValue={newName}
        handleNameChange={handleChange(setNewName)}
        numberValue={newNumber}
        handleNumberChange={handleChange(setNewNumber)}
        handleSubmit={handleSubmit} 
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deletePersonWhoIs={person => deletePerson(person)}/>
    </div>
  )
}

export default App
