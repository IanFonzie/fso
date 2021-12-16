import React, { useState, useEffect } from 'react'
import axios from 'axios'

const directions = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW']
const degreesToCompass = degrees => {
  const sanitizedDegrees = degrees % 360
  return directions[Math.round(sanitizedDegrees / 22.5) % 16]
}

const fahrenheitToCelsius = (degreesF) => {
  return Math.round((degreesF - 32) * (5/9))
}

const Country = ({ country }) => {
  const [weather, setWeather] = useState(undefined)

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?` + 
           `q=${country.capital[0]},${country.cca2}&` +
           `appid=${apiKey}&` +
           `units=imperial`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  const languages = []
  for (let key in country.languages) {
    languages.push(<li key={key}>{country.languages[key]}</li>)
  }
  
  let weatherDetails
  if (weather) {
    weatherDetails = (
      <>
        <div><b>temperature:</b> {fahrenheitToCelsius(weather.main.temp)} Celsius</div>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
        <div>
          <b>wind:</b> {Math.round(weather.wind.speed)} mph direction {degreesToCompass(weather.wind.deg)}
        </div>
      </>
    )
  }
  
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>population {country.population}</div>
      <h2>Spoken languages</h2>
      <ul>
        {languages}
      </ul>
      <img src={country.flags.png} />
      <h2>Weather in {country.capital[0]}</h2>
      {weatherDetails}
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

  const handleChange = event => setFilter(event.target.value)

  const handleShow = (countryName) => () => setFilter(countryName)

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
      toDisplay = results
        .sort(({name: {common: c1Name}}, {name: {common: c2Name}}) => { 
          if (c1Name < c2Name) {
            return -1
          }
          if (c1Name > c2Name) {
            return 1
          }
          return 0
        })
        .map(result => {
          return (
            <div key={result.name.official}>
              {result.name.common}
              <button onClick={handleShow(result.name.common)}>show</button> 
            </div>
          )
        })
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