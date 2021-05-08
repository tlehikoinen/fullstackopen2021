import { useState, useEffect } from 'react'
import axios from 'axios'

const SearchBox = (props) => (
  <>{props.text} <input value={props.value} placeholder={props.placeholder} onChange={props.onChange} /></>
)


const DisplayCountryInfo = (props) => {
  let searchedCountries = []

  props.countries
    .filter(country => country.name.toLowerCase().includes(props.filterText.toLowerCase()))
    .map((country) => (searchedCountries.push(country)))

  let res = searchedCountries.length

  if (res >= 10) {
    return <div>
      <p>Too many matches, specify another filter</p>
    </div>
  }

  if (res > 1 && res < 10) {
    return <div>
      {searchedCountries.map((country, i) => <FilteredCountryList key={i} country={country} />)}
    </div>
  }

  return (
    <div>
      {searchedCountries.map((country) => <SingleCountry key={country.numericCode} country={country} />)}
    </div>
  )
}

const SingleCountry = (props) => (
  <div className="singleCountry">
    <h1>{props.country.name}</h1>
      Capital {props.country.capital} <br />
      Population {props.country.population}
    <h2>Languages</h2>
    <ul>
      {props.country.languages
        .map((language, i) =>
          <li key={i}> {language.name}</li>)}
    </ul>
    <img src={props.country.flag} alt={props.country.name}></img>
  </div>
)

const FilteredCountryList = (props) => (
  <>{props.country.name}<br /></>
)


const App = () => {

  const [searched, newSearched] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchBox = (event) => newSearched(event.target.value)

  return (
    <div>
      <SearchBox text='find countries' placeholder="Enter a country" onChange={handleSearchBox} value={searched} />
      <DisplayCountryInfo filterText={searched} countries={countries} />
    </div>
  )
}

export default App;
