import React from 'react';
import "./CurrentWeather.css";
import { getWeather } from '../WeatherUtils';

interface CurrentWeatherProps {
  temperature: number;
  apparentTemperature: number;
  weatherCode: number;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ temperature, apparentTemperature, weatherCode }) => {
  const weather = getWeather(weatherCode);
  return (
    <div className="current-weather">
      <div className="weather-code">
        <img src={weather?.image} alt="Weather Icon" />
      </div>
      <div className="temperature">
        <div className='current-temperature'>{temperature}°</div>
        <div className="description">
          {weather?.description} ● Feels like {apparentTemperature}°
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;