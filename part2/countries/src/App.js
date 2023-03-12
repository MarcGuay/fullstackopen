import { useState, useEffect } from 'react'
import countryService from './services/countries'

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

const CountryDisplay = ({ matches }) => {
  if (matches.length > 1){
    return (
      matches.map(match =>
        <div key={match.cca2}>
          <span>{match.name.common}</span>
        </div>
      )
    )
  } else if (matches.length == 1) {

    return (
      <div>
        <h1>{matches[0].name.common}</h1>
        <div>capital {matches[0].capital[0]}</div>
        <div>area {matches[0].area}</div>
        <h2>languages:</h2>
        <ul>
          {Object.entries(matches[0].languages).map(lang => 
            <li key={lang[0]}>{lang[1]}</li>
          )}
        </ul>
        <img src={matches[0].flags.svg} alt={matches[0].flags.alt} width="200"/>
      </div>
    )
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [matches, setMatches] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    countryService.getAll()
      .then(returnedCountries => {
        setCountries(returnedCountries)
      })
  }, [])

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
      <CountryDisplay matches={matches} />
    </div>
  )
}

export default App;