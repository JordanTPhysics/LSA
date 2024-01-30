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
  const [todaySalaahTimes, setTodaySalaahTimes] = useState(null);

  useEffect(() => {
    const fetchSalaahTimes = async () => {
      try {
        const response = await fetch("resources/Blackpool Salah Times.csv");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.text();
        const parsedData = parseCSV(data);

        setSalaahTimes(parsedData);
      } catch (error) {
        console.error("Error fetching or parsing CSV file:", error);
      }
    };
    fetchSalaahTimes();
  }, []);

  useEffect(() => {
    const today = new Date();

    // Get day, month, and year components
    const day = today.getDate();
    const month = today.getMonth() + 1; // Months are zero-indexed, so add 1
    const year = today.getFullYear();

    // Ensure day and month are formatted as two digits
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    // Create the formatted date string
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    const todaySalaahTimes = salaahTimes.find(entry => entry.Date === formattedDate);
    setTodaySalaahTimes(todaySalaahTimes);
  }, [salaahTimes]);



  return (
    <>
      <div className="row">
        <h2>Salaah Times for Today</h2>
        <br />
        {todaySalaahTimes ? (
          <ul>
            <li>Fajr: {todaySalaahTimes.Fajr}</li>
            <li>Dhuhr: {todaySalaahTimes.Dhuhr}</li>
            <li>Asr: {todaySalaahTimes.Asr}</li>
            <li>Maghrib: {todaySalaahTimes.Maghrib}</li>
            <li>Isha: {todaySalaahTimes.Isha}</li>
          </ul>
        ) : (
          <ul>
            <li>Loading...</li>
          </ul>
        )}
      </div>

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
