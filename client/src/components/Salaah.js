import React, { useEffect, useState } from "react";
import TimeSeriesChart from "./TimeSeriesChart";

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

  const getJamaatTimesToday = () => {
    const today = new Date();
    var todayTimes = salaahTimes.filter((entry) => {
      const entryDate = new Date(entry.Date);
      if (entryDate.getDate() === today.getDate() && entryDate.getMonth() === today.getMonth()) {
        return { Fajr: entry.Fajr, Shuruq: entry.Shuruq, Dhuhr: entry.Dhuhr, Asr: entry.Asr, Maghrib: entry.Maghrib, Isha: entry.Isha };
      }
    });
  }

  return (
    <>
      <div className="row frame">
      <h3> A yearly graph of the Salaah times on the Fylde Coast. Jamaat Timetable found below</h3>

        <TimeSeriesChart data={salaahTimes} yAxisLabel="Salaah Times - Blackpool" />
      </div>
      <div className="row">
        <div id="pdfContainer" className="col-md-4 "></div>
        <iframe src="resources/Timetable.pdf" />

      </div>
    </>
  );
};

export default Salaah;
