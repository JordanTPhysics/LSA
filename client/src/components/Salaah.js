import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Papa from "papaparse";
import {
  Chart,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import "chartjs-adapter-moment";

Chart.register(TimeScale, LinearScale, PointElement, LineElement);

function parseCSV(csvData) {
  // Split the CSV data into rows
  var rows = csvData.split("\n");

  // Extract headers from the first row
  var headers = rows[0].split(",");

  // Initialize an array to store the parsed data
  var result = [];

  // Iterate through the rows
  for (var i = 1; i < rows.length; i++) {
    // Split the row into values
    var values = rows[i].split(",");

    // Create an object to store the current row data
    var rowObject = {};

    // Iterate through the values and assign them to the corresponding headers
    for (var j = 0; j < headers.length; j++) {
      rowObject[headers[j]] = values[j];
    }

    // Push the row object to the result array
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
      
          // Parse CSV data using papaparse
          setSalaahTimes(parsedData);
        } catch (error) {
          console.error("Error fetching or parsing CSV file:", error);
        }
      };
      fetchSalaahTimes();
  }, []);

  return (
    <div>
      <Line
        data={{
          labels: salaahTimes.map((entry) => entry.date),
          datasets: [
            {
              label: "Fajr",
              data: salaahTimes.map((entry) => entry.Fajr),
              fill: false,
              borderColor: "rgba(75,192,192,1)",
            },
            {
              label: "Dhuhr",
              data: salaahTimes.map((entry) => entry.Dhuhr),
              fill: false,
              borderColor: "rgba(75,192,192,1)",
            },
            {
              label: "Asr",
              data: salaahTimes.map((entry) => entry.Asr),
              fill: false,
              borderColor: "rgba(75,192,192,1)",
            },
            {
              label: "Maghrib",
              data: salaahTimes.map((entry) => entry.Maghrib),
              fill: false,
              borderColor: "rgba(75,192,192,1)",
            },
            {
              label: "Isha",
              data: salaahTimes.map((entry) => entry.Isha),
              fill: false,
              borderColor: "rgba(75,192,192,1)",
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day",
              },
              position: "bottom",
            },
            y: {
              type: "linear",
              position: "left",
            },
          },
        }}
      />
    </div>
  );
};

export default Salaah;
