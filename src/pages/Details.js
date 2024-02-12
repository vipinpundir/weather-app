import React, { useContext } from 'react';
import WeatherContext from '../WeatherContext';

const Details = () => {
  const { daysforecast } = useContext(WeatherContext) || {};

  return (
    <div className='WeatherDetails'>
      <div>
        {daysforecast
          ?
          <><h2>Weather Forecast for {daysforecast.city.name}, {daysforecast.city.country}</h2>
            <div>
            {daysforecast.list.map((forecast, index) => (
  <div key={index}>
    <p><strong>Date and Time:</strong> {forecast.dt_txt}</p>
    <p><strong>Temperature:</strong> {forecast.main.temp} K</p>
    <p><strong>Feels Like:</strong> {forecast.main.feels_like} K</p>
    <p><strong>Min Temperature:</strong> {forecast.main.temp_min} K</p>
    <p><strong>Max Temperature:</strong> {forecast.main.temp_max} K</p>
    <p><strong>Pressure:</strong> {forecast.main.pressure} hPa</p>
    <p><strong>Humidity:</strong> {forecast.main.humidity}%</p>
    <p><strong>Weather:</strong> {forecast.weather[0].description}</p>
    <p><strong>Wind Speed:</strong> {forecast.wind.speed} m/s</p>
    <p><strong>Wind Direction:</strong> {forecast.wind.deg}°</p>
    <hr />
  </div>
))}

            </div></> : <>No weather details are available please search...</>}

      </div>
    </div>
  );
};

export default Details;
