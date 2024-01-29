import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { format } from 'date-fns';

const TimeSeriesChart = ({ data, yAxisLabel }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const chart = new Chart(ctx, {
      type: 'scatter', // Use 'scatter' type for individual points
      data: {
        datasets: [
          { label: 'Fajr', data: mapData('Fajr'), pointBackgroundColor: 'red' },
          { label: 'Shuruq', data: mapData('Shuruq'), pointBackgroundColor: 'orange' },
          { label: 'Dhuhr', data: mapData('Dhuhr'), pointBackgroundColor: 'yellow' },
          { label: 'Asr', data: mapData('Asr'), pointBackgroundColor: 'green' },
          { label: 'Maghrib', data: mapData('Maghrib'), pointBackgroundColor: 'blue' },
          { label: 'Isha', data: mapData('Isha'), pointBackgroundColor: 'purple' },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'linear', // Assume x-axis is numeric for time series
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: yAxisLabel,
            },
            ticks: {
              // Use callback to format Y-axis labels
              callback: (value) => format(value, 'HH:mm'),
            },
          },
        },
        plugins: {
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || '';
                if (label) {
                  return `${label}: ${context.parsed.y}`;
                }
                return `${context.parsed.y}`;
              },
            },
          },
          legend: {
            display: true,
            position: 'top',
          },
        },
        responsive: true,
      },
    });

    return () => {
      chart.destroy(); // Cleanup on component unmount
    };
  }, [data, yAxisLabel]);

  const mapData = (field) => {
    return data.map(entry => ({
      x: data.indexOf(entry), // Use the index as the x-value for each day
      y: convertTimeStringToInteger(entry[field], field),
    }));
  };

  const convertTimeStringToInteger = (timeString, salaah) => {
    if (!timeString || typeof timeString !== 'string') {
      return 0;
    }
    const [hours, minutes] = timeString.split(':');
    if (salaah === "Isha" && parseInt(hours, 10) < 12) {
      return parseInt(hours, 10) + 24 + parseInt(minutes, 10) / 60;
    } else {
      return parseInt(hours, 10) + parseInt(minutes, 10) / 60;
    }
  };
  

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <canvas ref={chartRef} ></canvas>
    </div>
  );
};

export default TimeSeriesChart;
