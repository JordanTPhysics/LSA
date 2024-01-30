import React, { useEffect, useRef } from 'react';
import Chart, { TimeScale } from 'chart.js/auto';
import { format } from 'date-fns';
import 'chartjs-adapter-moment';

Chart.register(TimeScale)

const TimeSeriesChart = ({ data, yAxisLabel }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const chart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          { label: 'Fajr', data: mapData('Fajr'), pointBackgroundColor: 'red' },
          { label: 'Shuruq', data: mapData('Shuruq'), pointBackgroundColor: 'orange' },
          { label: 'Dhuhr', data: mapData('Dhuhr'), pointBackgroundColor: 'white' },
          { label: 'Asr', data: mapData('Asr'), pointBackgroundColor: 'green' },
          { label: 'Maghrib', data: mapData('Maghrib'), pointBackgroundColor: 'magenta' },
          { label: 'Isha', data: mapData('Isha'), pointBackgroundColor: 'blue' },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'time', 
            time: {
              unit: 'day', // Display data on a daily basis
              parser: 'DD/MM/YYYY', // Use 'DD/MM/YYYY' for UK format
              tooltipFormat: 'DD/MM/YYYY', // Use 'DD/MM/YYYY' for UK format in tooltips
              displayFormats: {
                  day: 'YYYY-MM-DD' // Format of the displayed date
              },
            },
            title: {
              display: true,
              text: 'Date',
              color: 'white',
            },
          },
          y: {
            title: {
              display: true,
              text: yAxisLabel,
              color: 'white',
              
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
                  
                  const minutes = parseInt(context.parsed.y.toString().split(".")[1].substring(0,2)) * 60 / 100;
                  const time = context.parsed.y.toString().split(".")[0] + ":" + minutes.toString().substring(0,2);
                  const date = format(context.parsed.x, 'dd/MM');
                  return `${date} \n ${label}: ${time}`;
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
      x: entry.Date, // Use the index as the x-value for each day
      y: entry[field] ? convertTimeStringToInteger(entry[field], field) : null,
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
