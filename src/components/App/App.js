import './App.css';
import { ddbQuery } from './ddbQuery';
import React, {useState, useEffect, useRef} from 'react';

function App() {
  
  let [aggregateData, setAggregateData] = useState();
  let [status, setStatus] = useState("loading");
  const hours = [ "12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", 
                  "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"]


  useEffect(() => {
    ddbQuery().then((response) => {
      const filteredData = response.map((dataPoint) => 
        ({  HOUR: roundHour(dataPoint.TIMESTAMP),
            TRAVELTIME: dataPoint.TRAVELTIME})
        )
      // I want to calculate the min, max and average for each hour
      let stats = determineStats(filteredData);
      console.log(stats);
      setStatus("complete");
      setAggregateData(stats);
    });
  
    function roundHour (timestamp) {
        let date = new Date(timestamp.S)
        let minutes = date.getMinutes();
        let hours = date.getHours();
        // Round down or up to the nearest hour
        if (minutes >=30) {
          hours += 1;
        }
        // Don't round to the next day (inconsequential due to limited traffic at night)
        hours = Math.min(24, hours)
        return hours;
      }
  
    function determineStats(array){
      function convertArrayToObject(array) {
        let obj = {};
        for (let i =0; i < array.length; i++) {
          let hour = array[i].HOUR;
          let travelTime = Number(array[i].TRAVELTIME.N);
          if (!obj[hour]) {
            obj[hour] = [travelTime];
          } else {
            obj[hour].push(travelTime);
          }
        }
        return obj;
      }
  
      let obj = convertArrayToObject(array);
      let stats = {};
      let length = Object.keys(obj).length
      for (let i =0; i < length; i++) {
        let hour = i;
        let times = obj[i];
        let calcAverage = arr => arr.reduce((a,b) => a + b, 0) /arr.length;
        stats[hour] = {
          min: Math.min(...obj[i]),
          max: Math.max(...obj[i]),
          avg: Math.round(calcAverage(times))
        }
      }
      return stats;
      
    }
  }, []);

  if (status == "loading") { 
    return (
      <div>Loading</div>
    )
  }

  function toTimeString(totalSeconds) {
    const totalMs = totalSeconds * 1000;
    const result = new Date(totalMs).toISOString().slice(12, 16);
  
    return result;
  }

  function TravelDetails(){
    return(
      <div>
      <h2>Travel Details</h2>
      <table>
      <tr>
        <th>Time</th>
        <th>Min</th>
        <th>Average</th>
        <th>Max</th>
      </tr>
      {Object.keys(aggregateData).map(key => {
        let min = toTimeString(aggregateData[key]['min']);
        let max = toTimeString(aggregateData[key]['max']);
        let avg = toTimeString(aggregateData[key]['avg']);
        return (
        <tr>
          <td>{hours[key]}</td>
          <td>{min}</td>
          <td>{avg}</td>
          <td>{max}</td>
        </tr>)
      }
    )}
    </table>
      </div>
    )
  }
    
  return (
    <div>
      {aggregateData && 
      <TravelDetails></TravelDetails>}
    </div>
  );
}

export default App;
