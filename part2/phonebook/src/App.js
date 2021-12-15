import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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

  const toDisplay = filter ?
    persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) :
    persons

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={handleChange(setFilter)}/>
      </div>
      <h2>add a new</h2>
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
      {toDisplay.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App
