import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const MyBarChart = ({ data }) => {
  const [transformedData, setTransformedData] = useState([]);

  useEffect(() => {
    if (data) {
      const newData = data.map((item) => ({
        date: new Date(item.dt * 1000).toLocaleDateString("en-US", {
          weekday: 'short',
          day: 'numeric',
        }),
        rain: item.rain || 0,
      }));
      setTransformedData(newData);
    }
  }, [data]);

  return (
    <div className="w-full px-4 py-6">
      {transformedData.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={transformedData}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis 
              dataKey="date" 
              stroke="#fff"
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis stroke="#fff" tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="rain" fill="#8884d8" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500">No data available</p>
      )}
    </div>
  );
};

export default MyBarChart;