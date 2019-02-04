
import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])
  const [weatherData, setWeatherData] = useState([])
  const [filter, setNewFilter] = useState('')
  const [icon, setWeatherIcon] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)

      })
  }, [])
  console.log(countries)

  const handleFilterChange = (event) => {
    console.log('filter is being written', event.target.value)
    setNewFilter(event.target.value)
  }

  const filteredCountries = countries.filter(country => country.name.toLowerCase().match(filter.toLowerCase()))
  console.log(filteredCountries.length)

  const selectCountry = (event) => {
    console.log('nappia painettu', event.target.value)
    setNewFilter(event.target.value)
  }

  const foundCountries = () => {
    if (filteredCountries.length > 10) {
      return (
        <p>too many countries</p>
      )
    } else if (filteredCountries.length > 1) {
      const rows = () =>
        filteredCountries.map(country => <li key={country.alpha3Code}>{country.name}
          <button onClick={selectCountry} value={country.name}>show</button></li>)
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

    useEffect(() => {
      axios
        .get(`http://api.apixu.com/v1/current.json?key=cc25e246365741bd97683445190402&q=${country.name}`)
        .then(response => {
          console.log('promise fulfilled')
          setWeatherData(response.data.current)
          setWeatherIcon(response.data.current.condition.icon)

        })
    }, [])
    
    console.log(weatherData)
    
    console.log(country.languages)
    
    return (
      <div>
        <h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>{languages()}</ul>
        <img src={country.flag} alt='flag' height="100" />
        <h2>Weather in {country.capital}</h2>
        <p>Tempature: {weatherData.temp_c} celsius</p>
        <img src={icon} alt='weather_icon'/>
        <p>wind: {weatherData.wind_kph} kph direction {weatherData.wind_dir}</p>
      </div>

    )
  }

  return (
    <div>
      <h1>Country directory</h1>
      <form>
        Search countries: <input value={filter} onChange={handleFilterChange} />
      </form>
      <div>{foundCountries()}</div>

    </div>

  )
}

export default App;
