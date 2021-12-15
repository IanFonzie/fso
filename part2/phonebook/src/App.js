import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const handleChange = (setState) => event => setState(event.target.value)

  const handleSubmit = event => {
    event.preventDefault()

    // Keep names unique.
    const exists = persons.find(person => person.name === newName)
    if (!exists) {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      return setNewNumber('')
    }

    alert(`${newName} is already added to the phonebook`)
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
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
