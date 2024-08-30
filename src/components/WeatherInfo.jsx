import React, { useEffect, useState } from 'react';
import tempIcon from '../assets/icons/1.png';
import feelsLikeIcon from '../assets/icons/3.png';
import humidityIcon from '../assets/humidity.png';
import WindIcon from '../assets/WindIcon.svg';
import ArcDesign from './Gauge';

const WeatherInfoCard = ({ title, children }) => (
  <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg flex-1 h-52 w-40 p-4 shadow-lg" >
    <h2 className="text-white text-xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

const WeatherInfo = ({data}) => {
  const [windSpeedKmh, setWindSpeedKmh] = useState("00");
  const [windGustKmh, setWindGustKmh] = useState("00");
  const [pressureMmHg, setPressureMmHg] = useState("00");
  const [humidity, setHumidity] = useState(0);
  const[dewPoint,setDewPoint]=useState('00')
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    if (data) {
      const { wind_speed, wind_gust, pressure, humidity, dew_point } = data;
    
      const windSpeedConverted = wind_speed * 3.6;
      const windGustConverted = wind_gust * 3.6;
      const pressureConverted = pressure * 0.750062;
      setDewPoint(dew_point)
      setWindSpeedKmh(windSpeedConverted.toFixed(2));
      setWindGustKmh(windGustConverted.toFixed(2));
      setPressureMmHg(pressureConverted.toFixed(2));
      setHumidity(humidity);
    }
    setLoading(false)
  }, [data]);

  return (
        <div className="bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg p-6 rounded-xl max-w-4xl mx-auto shadow-lg ">
      <div className="flex flex-col md:flex-row gap-6 ml-8 md:ml-1"> 
        <WeatherInfoCard title="Wind">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-1">
              <img className='w-20 h-20' src={WindIcon} alt="Wind Icon"/>
            </div>
            <div className="text-right w-20">
              <p className="text-white text-3xl font-bold">{windSpeedKmh}<span className='text-xs font-normal'>km/h</span></p>
              <p className="text-slate-300 text-xs">Wind Speed</p>
              <p className="text-white text-3xl font-bold">{windGustKmh ? windGustKmh : "-"}</p>
              <p className="text-slate-300 text-xs">Wind Gust</p>
            </div>
          </div>
        </WeatherInfoCard>
        <WeatherInfoCard title="Humidity">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-1">
              <img className='w-20 h-20' src={humidityIcon} alt="Humidity Icon"/>
            </div>
            <div className="text-right">
              <p className="text-white text-3xl font-bold">{humidity}%</p>
              <p className="text-slate-300 text-xs">Relative Humidity</p>
              <p className="text-slate-300 text-xs">Dew point</p>
              <p className="text-white text-lg font-bold">{dewPoint}</p>
            </div>
          </div>
        </WeatherInfoCard>
        <WeatherInfoCard title="Pressure">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-1">
              <div className='w-20 h-20'>
                <ArcDesign pressure={pressureMmHg} />
              </div>
            </div>
            <div className="text-right">
              <p className="text-slate-300 text-xs">Hpa</p>
            </div>
          </div>
        </WeatherInfoCard>
      </div>
    </div>
  );
};

export default WeatherInfo;