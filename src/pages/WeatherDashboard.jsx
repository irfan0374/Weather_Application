import React, { useEffect, useState, useCallback } from 'react';
import useGoogleMapApi from '../components/Googlemap';
import { Autocomplete } from '@react-google-maps/api';
import CurrentWeather from '../components/CurrentWeather';
import TodaysForecast from '../components/TodaysForecast';
// import SevenDayForecast from './SevenDayForecast';
import Sidebar from '../components/SideBar';
import searchIcon from '../assets/search.png';
// import { findForecast, findHistorical, findWeather } from '../Api/'; 
import { useToaster, Message } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import Loading from '../components/Loading/loading';
import {getCurrentWeather} from '../firebase/weatherApi'
import {getWeatherForecast} from '../firebase/weatherApi'

import MyBarChart from '../components/BarGraph';

import Donut from '../components/Piechart';


function WeatherDashboard() {
  const toaster = useToaster();
  const { isLoaded } = useGoogleMapApi();

  const [location, setLocation] = useState('');
  const [currentValue, setCurrent] = useState();
  const [forecastValue, setForecast] = useState();
  const [loading,setLoading]=useState(false)

  const fetchCurrentWeather = useCallback(async (city) => {
    try {
      const response = await getCurrentWeather(city);
      let element = document.getElementsByClassName('cityInput');
      let cityInput = element[0];
      cityInput = "";
        return response;
   
    } catch (error) {
  console.log("error")
    }
  }, []);

  const fetchForecast = useCallback(async (city) => {
    try {
      const response = await getWeatherForecast(city);
      
        return response;
  
    } catch (error) {
      throw error;
    }
  }, []);



  const handleFetchWeather = useCallback(async (city) => {
    try {
      setLoading(true);
      
      const [currentWeather, forecast] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city),
      ]);
  
      if (currentWeather.error) {
        throw new Error(currentWeather.error);
      }
      if (forecast.error) {
        throw new Error(forecast.error);
      }
  
      setCurrent(currentWeather);
      setForecast(forecast);
      setLoading(false);
      
    } catch (error) {
      setLoading(false);
      toaster.push(
        <Message type="error">{error.message || "Failed to fetch weather data"}</Message>, 
        {
          placement: 'topCenter',
          duration: 3000,
        }
      );
    }
  }, [fetchCurrentWeather, fetchForecast]);
  

  const search = useCallback(() => {
    const element = document.getElementsByClassName('cityInput');
    const value = element[0].value;
    if (value === '') {
      return;
    }

    handleFetchWeather(value);
  }, [handleFetchWeather]);

  const handleAutoComplete = useCallback((id, setValue) => {
    if (isLoaded) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementsByClassName(id),
        {
          componentRestrictions: { country: 'IN' },
          types: ['(cities)'],
        }
      );

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        setValue(place.name);
      });
    }
  }, [isLoaded]);

  useEffect(() => {
    handleAutoComplete('cityInput', setLocation);
  }, [isLoaded, handleAutoComplete]);

  return (
    <>
      {loading ? (
        <Loading/>
      ) : (
        <div
          className="min-h-screen bg-gray-900 text-white p-4 md:p-6 shadow-lg bg-cover bg-center"
          style={{ backgroundImage: "url('https://res.cloudinary.com/dlcnf8yfh/image/upload/v1724985739/Fundo_do_c%C3%A9u_azul_com_nuvens____Foto_Premium_1_cs9ziv.jpg')" }}
        >
          <div className="flex justify-center mb-6">
            {isLoaded && (
              <Autocomplete>
                <input
                  type="text"
                  className="cityInput w-full max-w-md px-4 py-2 text-white rounded-md bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 placeholder-gray-300 border-2 border-gray-400"
                  placeholder="Any location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Autocomplete>
            )}
            <div className="search-icon" onClick={search}>
              <img className="ml-4 w-9 h-9" src={searchIcon} alt="search" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-col md:flex-row">
              <Sidebar />
    

              <CurrentWeather data={currentValue} />
       
            </div>
            <div className='mx-8 mt-4 '>

            <TodaysForecast data={forecastValue} />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <MyBarChart data={forecastValue}/>
            </div>
            <div>
              <Donut data={currentValue}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WeatherDashboard;