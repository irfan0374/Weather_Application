import React, { useState, useEffect } from 'react';
import cloud from '../assets/cloudIcons/cloud.png';
import drizzle from '../assets/cloudIcons/drizzle.png';
import snow from '../assets/cloudIcons/snow.png';
import rain from '../assets/cloudIcons/rain.png';
import clear from '../assets/cloudIcons/clear.png';
import { useToaster, Message } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import WeatherInfo from './WeatherInfo';

function CurrentWeather({ data }) {
  const toaster = useToaster();
  const [icon, setIcon] = useState(cloud);

  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case "01d":
      case "01n":
        return clear;
      case "02d":
      case "02n":
      case "03d":
      case "03n":
        return cloud;
      case "04d":
      case "04n":
      case "09d":
      case "09n":
        return drizzle;
      case "10d":
      case "10n":
        return rain;
      case "13d":
      case "13n":
        return snow;
      default:
        return clear;
    }
  };

  useEffect(() => {
    if (data && data[0]?.data?.current?.weather?.[0]?.icon) {
      const weatherIcon = getWeatherIcon(data[0].data.current.weather[0].icon);
      setIcon(weatherIcon);
    }
  }, [data]);

  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1);
  };

  const defaultCity = "Enter the Location";
  const defaultTemp = "00";

  const city = data?.[1] || defaultCity;
  const temp = data?.[0]?.data?.current?.temp ? kelvinToCelsius(data[0].data.current.temp) : defaultTemp;

  return (
    <div className='md:ml-16 mt-4 md:mt-8'>
    <div className="p-4 rounded-lg w-[350px] md:w-[700px] mx-auto md:mx-0 flex flex-col bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold font-serif">{city}</h2>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="text-4xl font-semibold font-serif">{temp}<span className='font-normal'>°</span></div>
        <img className='w-20 h-20' src={icon} alt="Weather Icon" />
      </div>
      
      <div className="mt-6 ">
        <WeatherInfo data={data?.[0]?.data?.current} />
      </div>
    </div>
  </div>
  );
}

export default CurrentWeather;
