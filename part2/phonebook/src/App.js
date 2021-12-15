import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleChange = event => setNewName(event.target.value)

  const handleSubmit = event => {
    event.preventDefault()
    const exists = persons.find(person => person.name === newName)
    if (!exists) {
      setPersons(persons.concat({name: newName}))
      return setNewName('')
    }
    alert(`${newName} is already added to the phonebook`)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}>{person.name}</div>)}
    </div>
  )
}

export default App
