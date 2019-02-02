import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
    console.log('nimeä kirjoitetaan',event.target.value)
    setNewName(event.target.value)

  }
  const handleNumberChange = (event) => {
    console.log('numeroa kirjoitetaan',event.target.value)
    setNewNumber(event.target.value)

  }
  const handleFilterChange = (event) => {
    console.log('filtteriä kirjoitetaan',event.target.value)
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log('nappia painettu', event.target)

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    function personExists(Name) {
      return persons.some(function (el) {
        return el.name.toLowerCase() === Name.toLowerCase()
      })
    }
    if (personExists(newName)) {
      alert(`${newName} on jo luettelossa`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }


  }
  
  const filteredPersons = persons.filter(person => person.name.match(filter))
  console.log(filteredPersons.length)

  const rows = () =>
    filteredPersons.map(person => <li key={person.name}>{person.name} {person.number}</li>)


  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <form>
        rajaa näytettäviä <input value={filter} onChange={handleFilterChange}/>
      </form>
      <h2>Lisää uusi</h2>
      <form onSubmit={addPerson}>
        <div>
          nimi: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          numero: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      <p>{rows()}</p>
    </div>
  )

}

export default App
