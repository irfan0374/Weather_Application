import * as React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { useMemo, useState, useEffect } from 'react';

// Utility function to get the width based on the viewport size
const getResponsiveWidth = () => {
  if (window.innerWidth < 600) {
    return 100; // For small screens
  } else if (window.innerWidth < 960) {
    return 130; // For medium screens
  } else {
    return 140; // For large screens
  }
};

export default function ArcDesign({ pressure }) {
  const [width, setWidth] = useState(getResponsiveWidth());
  
  // Update the width on window resize
  useEffect(() => {
    const handleResize = () => {
      setWidth(getResponsiveWidth());
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const data = Math.round((pressure / 1000) * 100);
  
  const settings = useMemo(() => ({
    width: width,
    height: (width * 140) / 130, // Maintain aspect ratio
    value: data,
  }), [data, width]);

  return (
    <Gauge
      {...settings}
      cornerRadius="70%"
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: width > 130 ? 30 : 20, // Responsive font size
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: '#52b202',
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.text.disabled,
        },
      })}
    />
  );
}
