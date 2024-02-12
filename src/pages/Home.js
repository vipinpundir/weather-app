import React, { useContext, useState } from 'react';
import WeatherContext from '../WeatherContext';
import { Link } from 'react-router-dom';
import '../App.css'
const apiKey = process.env.REACT_APP_API_KEY;


const Home = () => {
  const [city, setCity] = useState('');
  const [correctCity, setCorrectCity] = useState(false);
  const [cityWeatherData, setCityWeatherData] = useState('');
  const { setDaysforecast } = useContext(WeatherContext);

  const { main, weather, wind, rain, clouds, sys, name } = cityWeatherData;

  const handleSearch = () => {

    try {
      // Call 1st API to findout lat and loa values for given city 
      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
        .then((res) => res.json())
        .then((data) => {

          if (data.length !== 0) {
            setCorrectCity(false)
            let lat = data[0].lat
            let lon = data[0].lon

            // Call 2nd API to findout Weather detail for that city
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
              .then((res) => res.json())
              .then((data1) => {
                setCityWeatherData(data1)
              })

            // Call 3rd API to findout 5 day weather forecast.
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
              .then((res) => res.json())
              .then((data3) => {
                setDaysforecast(data3)
              })
          }else{
            setCorrectCity(true)
          }

        })
    } catch (error) {
      console.log("Unexpected error", error)
    }
    setCity('')

  };

  return (
    <div className='Home'>
      <h1>Weather App</h1>
      <input type="text" placeholder="Search by city name" value={city} onChange={(e) => setCity(e.target.value)} required />
      <button onClick={handleSearch}>Search</button>
      <br />
      {correctCity? <h3>Please enter correct city name...</h3>:<></>}
      {cityWeatherData ? <><div>
        <h2>{name}, {sys.country}</h2>
        <div>
          <strong>Temperature:</strong> {main.temp} &#8451; (Feels like {main.feels_like} &#8451;)
        </div>
        <div>
          <strong>Description:</strong> {weather[0].description}
        </div>
        <div>
          <strong>Humidity:</strong> {main.humidity}%
        </div>
        <div>
          <strong>Wind:</strong> {wind.speed} m/s, {wind.deg}°
        </div>
        {rain && (
          <div>
            <strong>Rain (last 1h):</strong> {rain['1h']} mm
          </div>
        )}
        <div>
          <strong>Cloudiness:</strong> {clouds.all}%
        </div>
      </div> <Link to="/details">Next 15 Days Forecast</Link> </>
        : <></>}

    </div>
  );
};

export default Home;
