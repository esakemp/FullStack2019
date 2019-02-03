import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Person from './components/Person'
import NewPerson from './components/NewPerson'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    console.log("effect lol")
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        console.log(response.data)
      })
  }, [])
  

  const handleNameChange = (event) => {
    console.log('nimeä kirjoitetaan', event.target.value)
    setNewName(event.target.value)

  }
  const handleNumberChange = (event) => {
    console.log('numeroa kirjoitetaan', event.target.value)
    setNewNumber(event.target.value)

  }
  const handleFilterChange = (event) => {
    console.log('filtteriä kirjoitetaan', event.target.value)
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

  const filteredPersons = persons.filter(person => person.name.toLowerCase().match(filter.toLowerCase()))
  console.log(filteredPersons.length)

  const rows = () =>
    filteredPersons.map(person => <Person key={person.name} person={person} />)

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Lisää uusi</h2>
      <NewPerson addPerson={addPerson} newName={newName}
        handleNameChange={handleNameChange} newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h2>Numerot</h2>
      <div>{rows()}</div>
    </div>
  )

}

export default App
