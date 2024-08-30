import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const Donut = ({ data }) => {
    const [options, setOptions] = useState({
        labels: ['Feels Like (°C)', 'Humidity (%)', 'Wind Speed (km/h)', 'Current Temperature (°C)'],
        legend: {
            position: 'bottom',
            fontSize: '14px',
        },
        chart: {
            background: 'transparent',
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: '100%'
                },
                legend: {
                    position: 'bottom',
                    fontSize: '12px',
                }
            }
        }]
    });
    const [series, setSeries] = useState([]);

    useEffect(() => {
        if (data && data[0]?.data?.current) {
            const { feels_like, humidity, wind_speed, temp } = data[0]?.data?.current;

            const feelsLikeCelsius = parseFloat((feels_like - 273.15).toFixed(2));
            const tempCelsius = parseFloat((temp - 273.15).toFixed(2));
            const humidityPercentage = parseFloat(humidity);
            const windSpeedKmH = parseFloat((wind_speed * 3.6).toFixed(2));

            const seriesData = [feelsLikeCelsius, humidityPercentage, windSpeedKmH, tempCelsius];
            setSeries(seriesData);
        }
    }, [data]);

    return (
        <div className="donut w-full px-4 py-6">
            {series.length > 0 ? (
                <Chart 
                    options={options} 
                    series={series} 
                    type="donut" 
                    width="100%" 
                    height={350} 
                />
            ) : (
                <p className="text-center text-gray-500">No data available</p>
            )}
        </div>
    );
};

export default Donut;