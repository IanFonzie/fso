import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange(setNewName)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleChange(setNewNumber)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App
