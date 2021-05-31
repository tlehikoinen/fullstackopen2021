
import { useState, useEffect } from 'react'
import axios from 'axios'

const SearchBox = (props) => (
  <>{props.text} <input id={props.id} value={props.value} placeholder={props.placeholder} onChange={props.onChange} /></>
)

const DisplayCountryInfo = (props) => {
  
  let countryCount = props.countries.length

  if (countryCount === 0)
    return <></>

  if (countryCount >= 10) {
    return <div>
      <p>Too many matches, specify another filter</p>
    </div>
  }

  if (countryCount > 1 && countryCount < 10) {
    return <div>
      {props.countries.map((country, i) => <FilteredCountryList key={i} country={country} handleClick={props.handleClick} />)}
    </div>
  }

  return (
    <div>
      <SingleCountry key={props.countries[0].numericCode} country={props.countries[0]} />
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
  const [displayedCountries, setDisplayedCountries] = useState([])
  const [weatherCountry, setWeatherCountry] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log("effect axios")
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    let searchedCountries = []
    countries
      .filter(country => country.name.toLowerCase().includes(searched.toLowerCase()))
      .map((country) => (searchedCountries.push(country)))

      if(searchedCountries.length === 1){
        setWeatherCountry(searchedCountries[0])
        setDisplayedCountries(searchedCountries)
      }else {
        setDisplayedCountries(searchedCountries)
        setWeatherCountry('')
      } 
  }, [searched])

  useEffect(() => {
    if(weatherCountry){
    const address = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${weatherCountry.capital}`
      console.log("logging weather", address)
    }
  },[weatherCountry])




  const handleSearchBox = (event) => newSearched(event.target.value)
  const handleClick = countryName => {
    newSearched(countryName)
  }

  return (
    <div>
      <SearchBox id="countrySearchBox" text='find countries' placeholder="Enter a country" onChange={handleSearchBox} value={searched} />
      <DisplayCountryInfo filterText={searched} countries={displayedCountries} handleClick={handleClick}/>
    </div>
  )
}

export default App;
