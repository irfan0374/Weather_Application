import React, { useMemo } from 'react';
import cloud from '../assets/cloudIcons/cloud.png';
import drizzle from '../assets/cloudIcons/drizzle.png';
import snow from '../assets/cloudIcons/snow.png';
import rain from '../assets/cloudIcons/rain.png';
import clear from '../assets/cloudIcons/clear.png';

const getWeatherIcon = (icon) => {
  switch (icon) {
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

function TodaysForecast({ data }) {
  const dailyForecast = data || [];

  if (dailyForecast.length === 0) {
    return (
      <div className="p-5 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg text-white w-72">
        <h3 className="text-xl font-semibold mb-2 text-center">7-DAY FORECAST</h3>
        <p className="text-center text-gray-400">No forecast data available</p>
      </div>
    );
  }

  return (
    <div className="p-5 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg text-white w-72">
      <h3 className="text-xl font-semibold text-center">7-DAY FORECAST</h3>
      <div className="flex flex-col space-y-3 mt-3">
        {dailyForecast.map((day, index) => {
          const date = new Date(day.dt * 1000).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          const temp = (day.temp.day - 273.15).toFixed(1);
          const weather = day.weather[0];
          const icon = weather.icon;
          const description = weather.description;

          const weatherIcon = useMemo(() => getWeatherIcon(icon), [icon]);

          return (
            <div key={index} className="flex items-center justify-between bg-white bg-opacity-20 rounded-lg p-2 backdrop-filter backdrop-blur-sm w-64">
              <div className="text-md font-semibold">{date}</div>
              <img className="w-10 h-10" src={weatherIcon} alt={description} />
              <div className="text-md font-semibold">{temp}°C</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TodaysForecast;