
import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)

      })
  }, [])
  console.log('On olemassa', countries.length, 'maata')
  console.log(countries)

  const handleFilterChange = (event) => {
    console.log('filter is being written', event.target.value)
    setNewFilter(event.target.value)
  }

  const filteredCountries = countries.filter(country => country.name.toLowerCase().match(filter.toLowerCase()))
  console.log(filteredCountries.length)

  const testFunc = () => {
    if (filteredCountries.length > 10) {
      return (
        <p>too many damn countries</p>
      )
    } else if (filteredCountries.length > 1) {
      const rows = () =>
        filteredCountries.map(country => <li key={country.alpha3Code}>{country.name}</li>)
      return (
        <p>{rows()}</p>
      )
    } else if (filteredCountries.length === 1) {
      console.log('filtteröity', filteredCountries[0])
     
      return (
        <Country country={filteredCountries[0]} />
      )
    } else {
      return (
        <p>not a country you dummy</p>
      )
    }
  }

  const Country = (props) => {
    console.log(props.country.name)
    const country = props.country
    const languages = () =>
      country.languages.map(language => <li key={language.name}>{language.name}</li>)
    
    console.log(country.languages)
    return (
      <div>
        <h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>{languages()}</ul>
        <img src={country.flag} alt="flag" height="100"/>
      </div>

    )
  }

  return (
    <div>
      <h1>Country directory</h1>
      <form>
        Search countries: <input value={filter} onChange={handleFilterChange} />
      </form>
      <div>{testFunc()}</div>
    </div>

  )
}

export default App;
