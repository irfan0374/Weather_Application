const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL;

const GEOCODING_API_URL = import.meta.env.VITE_GEOCODING_API_URL;
import axios from 'axios'


const getPastDates = (days) => {
    const dates = [];
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(Math.floor(date.getTime() / 1000));
    }
    return dates;
  };

//  get latitude and longitude from city name
const getCoordinate = async (city) => {
    const response = await axios.get(GEOCODING_API_URL, {
        params: {
            q: city,
            limit: 1,
            appid: WEATHER_API_KEY
        },
    })
    console.log(response,"geoooooooooooooooooo")
 
    const { lat, lon,name } = response.data[0];

    return { lat, lon ,name};
}

// get current weather
export async function getCurrentWeather(city) {
    try {
      const { lat, lon, name } = await getCoordinate(city);
      
      const response = await axios.get(WEATHER_API_URL, {
        params: {
          lat,
          lon,
          exclude: 'minutely,hourly,daily,alerts',
          appid: WEATHER_API_KEY,
        }
      });
  
      if (!response || Object.keys(response.data).length === 0) {
        return { error: `No data available for ${name}.` };
      }
      
      return [response, name];
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return { error: 'Currently Not Available' };
    }
  }
  
  // get weather forecast
  export const getWeatherForecast = async (city) => {
    try {
      const { lat, lon } = await getCoordinate(city);
      
      const response = await axios.get(WEATHER_API_URL, {
        params: {
          lat,
          lon,
          exclude: 'minutely,hourly,current,alerts',
          appid: WEATHER_API_KEY,
        },
      });
  
      if (!response || Object.keys(response.data).length === 0) {
        return { error: `No forecast data available for ${city}.` };
      }
      
      return response.data.daily;
    } catch (err) {
      console.error('Error fetching weather forecast:', err);
      return { error: "Failed to fetch weather forecast." };
    }
  };
  

