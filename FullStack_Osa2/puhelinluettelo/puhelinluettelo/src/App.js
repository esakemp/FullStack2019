import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Person from './components/Person'
import NewPerson from './components/NewPerson'
import personService from './services/personService'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  })


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


  const deletePerson = (event) => {

    event.preventDefault()
    console.log('deleteä painettu henkilölle', event.target.id)

    const removable = event.target.id
    const name = event.target.value
    console.log(name)

    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      personService.remove(removable)
    }

  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log('nappia painettu', event.target.firstChild)

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons[persons.length - 1].id + 1
    }
    function personExists(Name) {
      return persons.some(function (el) {
        return el.name.toLowerCase() === Name.toLowerCase()
      })
    }

    if (personExists(newName)) {
      alert(`${newName} on jo luettelossa`)
    } else {
      personService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(personObject))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().match(filter.toLowerCase()))

  const rows = () =>
    filteredPersons.map(person => <Person key={person.name} person={person} deletePerson={deletePerson} />)

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Lisää uusi</h2>
      <NewPerson addPerson={addPerson} newName={newName}
        handleNameChange={handleNameChange} newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h2>Numerot</h2>
      {rows()}
    </div>
  )

}

export default App
