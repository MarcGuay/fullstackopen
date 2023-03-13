import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'

const CountryInput = ({ onChange }) => (
  <div>find countries <input type="search" onChange={onChange} /></div>
)

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const CountryDisplay = ({ matches, handleShow, weather }) => {
  if (matches.length > 1){
    return (
      matches.map(match =>
        <div key={match.cca2}>
          <span>{match.name.common}</span> <button onClick={() => handleShow([match])}>show</button>
        </div>
      )
    )
  } else if (matches.length == 1) {
    //console.log(matches[0])
    return (
      <div>
        <h1>{matches[0].name.common}</h1>
        <div>capital {matches[0].capital}</div>
        <div>area {matches[0].area}</div>
        <h2>languages:</h2>
        <ul>
          {Object.entries(matches[0].languages).map(lang => 
            <li key={lang[0]}>{lang[1]}</li>
          )}
        </ul>
        <img src={matches[0].flags.svg} alt={matches[0].flags.alt} width="200"/>
        <h2>Weather in {matches[0].capital}</h2>
        <div>temperature {weather.temp} Celcius</div>
        <div>
          {weather.icons ? 
            weather.icons.map(w => 
              <img key={w.icon} src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`} />
            ) :
            null
          }
        </div>
        <div>wind {weather.wind} m/s</div>
      </div>
    )
  }
}

function App() {
  const api_key = process.env.REACT_APP_API_KEY

  const [countries, setCountries] = useState([])
  const [matches, setMatches] = useState([])
  const [weather, setWeather] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    countryService.getAll()
      .then(returnedCountries => {
        setCountries(returnedCountries)
      })
  }, [])
  
  useEffect(() => {
    // Only fetch weather if we have a single match and are displaying details
    if (matches.length == 1){
      weatherService.getWeather(matches[0].capitalInfo.latlng[0], matches[0].capitalInfo.latlng[1], api_key)
        .then(weather => {
          setWeather({ 'temp':weather.main.temp, 'icons':weather.weather, 'wind':weather.wind.speed})
        })
    }
  }, [matches])

  const countryFilter = (event) => {
    const newCountries = countries.filter(c => c.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    if (newCountries.length > 10){
      setErrorMessage('Too many matches, specify another filter')
      setMatches([])
    } else if (newCountries.length ==1) {
      // Show detailed single country
      setMatches(newCountries)
    } else {
      setErrorMessage('')
      setMatches(newCountries)
    }
  }

  return (
    <div>
      <CountryInput onChange={countryFilter} />
      <Notification message={errorMessage} />
      <CountryDisplay matches={matches} handleShow={setMatches} weather={weather} />
    </div>
  )
}

export default App;