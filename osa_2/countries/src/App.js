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
      <SingleCountry key={props.countries[0].numericCode} country={props.countries[0]} weatherData={props.weatherData} />
    </div>
  )
}

const SingleCountry = (props) => {
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
      <DisplayWeather weatherData = {props.weatherData}/>
    </div>

  )
}

const FilteredCountryList = (props) => (
  <>{props.country.name} <button value={props.country.name} onClick={() => props.handleClick(props.country.name)}>show</button><br /></>
)

const DisplayWeather = ({weatherData}) => {
  return(
    <div>
      <h1>Weather in {weatherData.location.name}</h1>
      <p><span style={{fontWeight:"bold"}}>Temperature:</span> {weatherData.current.temperature} Celcius</p><br/>
      <img id="weatherIcon" src={weatherData.current.weather_icons[0]} alt={weatherData.current.weather_descriptions}/><br/>
      <p><span style={{fontWeight:"bold"}}>Wind:</span> {weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir}</p>
    </div>
  )
}

const App = () => {

  const [searched, newSearched] = useState('')
  const [countries, setCountries] = useState([])
  const [displayedCountries, setDisplayedCountries] = useState([])
  const [weatherCountry, setWeatherCountry] = useState('')
  const [weatherData, setWeatherData] = useState({
    location: {name: ""},
    current: {temperature: "",weather_icons: [],
    weather_descriptions: [],
    wind_dir: ""
    }
  })

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
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
      const address = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${weatherCountry.capital}&units=m`
      console.log("Weather api request was done")
      axios.get(address)
        .then(response => {
          setWeatherData(response.data)
        })
    }
  },[weatherCountry])

  const handleSearchBox = (event) => newSearched(event.target.value)
  const handleClick = countryName => newSearched(countryName)
  

  return (
    <div>
      <SearchBox id="countrySearchBox" text='find countries' placeholder="Enter a country" onChange={handleSearchBox} value={searched} />
      <DisplayCountryInfo filterText={searched} countries={displayedCountries} handleClick={handleClick} weatherData={weatherData}/>
    </div>
  )
}

export default App;
