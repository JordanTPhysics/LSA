import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  TimeScale,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import "chartjs-adapter-moment";

Chart.register(TimeScale, LinearScale, PointElement, LineElement, CategoryScale, Tooltip, Legend, Filler);

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

function selectTimes(salaahName, salaahTime) {
  switch (salaahName) {
    case "Fajr":
    case "Sunrise":
    case "Dhuhr":
    case "Asr":
    case "Maghrib":
    case "Isha":
      return convertTimeStringToInteger(salaahTime);
    default:
      return null;
  }
}

function parseCSV(csvData) {
  // Split the CSV data into rows
  var rows = csvData.split("\n");

  // Extract headers from the first row
  var headers = rows[0].split(",");

  // Initialize an array to store the parsed data
  var result = [];

  for (var i = 1; i < rows.length; i++) {
    var values = rows[i].split(",");
    var rowObject = {};

    for (var j = 0; j < headers.length; j++) {
      rowObject[headers[j]] = values[j];
    }

    result.push(rowObject);
  }

  return result;
}

const Salaah = () => {
  const [salaahTimes, setSalaahTimes] = useState([]);

  useEffect(() => {
    const fetchSalaahTimes = async () => {
      try {
        const response = await fetch("resources/Blackpool Salah Times.csv");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.text();
        const parsedData = parseCSV(data);
        console.log(parsedData);

        setSalaahTimes(parsedData);
      } catch (error) {
        console.error("Error fetching or parsing CSV file:", error);
      }
    };
    fetchSalaahTimes();
  }, []);

  const data = {
    labels: salaahTimes.map((entry) => entry.Date),
    datasets: [
      {
        label: `Fajr ${salaahTimes.map((entry) => entry.Fajr)}`,
        data: salaahTimes.map((entry) => convertTimeStringToInteger(entry.Fajr, "Fajr")),
        fill: true,
        borderColor: "rgba(192,57,57,1)",
      },
      {
        label: `Sunrise ${salaahTimes.map((entry) => entry.Shuruq)}`,
        data: salaahTimes.map((entry) => convertTimeStringToInteger(entry.Shuruq, "Sunrise")),
        fill: true,
        borderColor: "rgba(0,192,192,1)",
      },
      {
        label: `Dhuhr ${salaahTimes.map((entry) => entry.Dhuhr)}`,
        data: salaahTimes.map((entry) => convertTimeStringToInteger(entry.Dhuhr, "Dhuhr")),
        fill: true,
        borderColor: "rgba(255,255,255,1)",
      },
      {
        label: `Asr ${salaahTimes.map((entry) => entry.Asr)}`,
        data: salaahTimes.map((entry) => convertTimeStringToInteger(entry.Asr, "Asr")),
        fill: true,
        borderColor: "rgba(75,192,75,1)",
      },
      {
        label: `Maghrib ${salaahTimes.map((entry) => entry.Maghrib)}`,
        data: salaahTimes.map((entry) => convertTimeStringToInteger(entry.Maghrib, "Maghrib")),
        fill: true,
        borderColor: "rgba(201,19,19, 1)",
      },
      {
        label: `Isha ${salaahTimes.map((entry) => entry.Isha)}`,
        data: salaahTimes.map((entry) => convertTimeStringToInteger(entry.Isha, "Isha")),
        fill: true,
        borderColor: "rgba(7,19,192,1)",
      },
    ],
  };

  const options = {
    type: "line",
    data: data,
    options: {

      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
          },
          position: "top",
        },
        y: {
          type: "linear",
          position: "left",
          beginAtZero: true,
          display: false
        },
      },
      plugins: {
        legend: {
          display: false,
          position: 'top',
          labels: {
            color: 'rgb(255, 99, 132)'
          }
        },
        tooltip: {
          position: 'nearest',
          enabled: true,
          mode: 'index',
          intersect: false,
          callbacks:
          {
            label: function (context) {
              console.log(context);
              var index = context.dataIndex;
              var day = salaahTimes[index].Date;

              var fajr = salaahTimes[index].Fajr;
              var sunrise = salaahTimes[index].Shuruq;
              var dhuhr = salaahTimes[index].Dhuhr;
              var asr = salaahTimes[index].Asr;
              var maghrib = salaahTimes[index].Maghrib;
              var isha = salaahTimes[index].Isha;

              var returnString = `Date: ${day}\nFajr: ${fajr}\nSunrise: ${sunrise}\nDhuhr: ${dhuhr}\nAsr: ${asr}\nMaghrib: ${maghrib}\nIsha: ${isha}`

              return returnString;
            }
          }
        }
      }
    },
  };



  return (
    <>
      <div className="row">
        <h4> A yearly graph of the Salaah times on the Fylde Coast. Jamaat Timetable found below</h4>
      </div>
      <div className="row">
        <Line data={data} options={options} />
      </div>
      <div className="row">
        <iframe src="resources/Timetable.pdf" />
      </div>
    </>
  );
};

export default Salaah;
