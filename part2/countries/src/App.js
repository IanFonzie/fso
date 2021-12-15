import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  const languages = []
  for (let key in country.languages) {
    languages.push(<li key={key}>{country.languages[key]}</li>)
  }
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {languages}
      </ul>
      <img src={country.flags.png} />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleChange = event => setFilter(event.target.value.toLowerCase())

  let toDisplay
  if (filter) {
    const results = countries.filter(country => {
      return country.name.common.toLowerCase().includes(filter.toLowerCase())
    })
    
    if (results.length > 10) {
      toDisplay = <div>Too many results, specify another filter</div>
    } else if (results.length === 1) {
      toDisplay = <Country country={results[0]}/>
    } else {
      toDisplay = results.map(result => <div key={result.name.official}>{result.name.common}</div>)
    }
  }
  
  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleChange}/>
      </div>
      <div>{toDisplay}</div>
    </div>
  )
}

export default App