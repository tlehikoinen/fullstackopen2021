import { useState, useEffect } from 'react'
import axios from 'axios'

const SearchBox = (props) => (
  <>{props.text} <input id={props.id} value={props.value} placeholder={props.placeholder} onChange={props.onChange} /></>
)

const DisplayCountryInfo = (props) => {
  let searchedCountries = []
  props.countries
    .filter(country => country.name.toLowerCase().includes(props.filterText.toLowerCase()))
    .map((country) => (searchedCountries.push(country)))

  let res = searchedCountries.length

  if (res === 0)
    return <></>

  if (res >= 10) {
    return <div>
      <p>Too many matches, specify another filter</p>
    </div>
  }

  if (res > 1 && res < 10) {
    return <div>
      {searchedCountries.map((country, i) => <FilteredCountryList key={i} country={country} handleClick={props.handleClick} />)}
    </div>
  }

  return (
    <div>
      <SingleCountry key={searchedCountries[0].numericCode} country={searchedCountries[0]} />
    </div>
  )
}

const SingleCountry = (props) => {
  console.log("singleCountry")
  return (
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
}

const FilteredCountryList = (props) => (
  <>{props.country.name} <button value={props.country.name} onClick={() => props.handleClick(props.country.name)}>show</button><br /></>
)


const App = () => {

  const [searched, newSearched] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log("effect axios")
        setCountries(response.data)
      })
  }, [])




  const handleSearchBox = (event) => newSearched(event.target.value)
  const handleClick = countryName => {
    newSearched(countryName)
  }

  return (
    <div>
      <SearchBox id="countrySearchBox" text='find countries' placeholder="Enter a country" onChange={handleSearchBox} value={searched} />
      <DisplayCountryInfo filterText={searched} countries={countries} handleClick={handleClick}/>
    </div>
  )
}

export default App;
