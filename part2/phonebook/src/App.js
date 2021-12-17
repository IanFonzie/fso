import React, { useState, useEffect } from 'react'

import './index.css'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

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
    const upsertPerson = {name: newName, number: newNumber}
    if (!exists) {
      return personService
      .create(upsertPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage({type: 'success', value: `Added ${newName}`})
        setTimeout(() => setMessage(null), 5000)
      })
    } 
    const replacementMsg = `${newName} is already added to the phonebook, ` +
                            `replace the old number with a new one?`
    if (window.confirm(replacementMsg)) {
      personService
        .update(exists.id, upsertPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => {
            return person.id !== returnedPerson.id ?
              person :
              returnedPerson
          }))
          setNewName('')
          setNewNumber('')
          setMessage({type: 'success', value: `Changed ${newName}'s number`})
          setTimeout(() => setMessage(null), 5000)
        })
        .catch(_ => {
          alert(`The person with ID '${exists.id}' was already deleted from server`)
          setPersons(persons.filter(person => person.id !== exists.id))
        })
    }
  }

  const deletePerson = personToDelete => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .remove(personToDelete.id)
        .catch(_ => {
          alert(`The person with ID '${personToDelete.id}' was already deleted from server`)
        })
        .finally(_ => setPersons(persons.filter(person => person.id !== personToDelete.id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
