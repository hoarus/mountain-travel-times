import './App.css';
import { ddbQuery } from './ddbQuery';
import React, {useState, useEffect, useRef} from 'react';

function App() {
  
  let [aggregateData, setAggregateData] = useState();
  let [status, setStatus] = useState("loading");


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

  function TravelDetails(){
    return(
      <div>
      <div>Travel Details</div>
      <ul>
  {aggregateData['0']['min']}
      </ul>
      </div>
    )
  }
    
  return (
    <div>
      <div className="App">{JSON.stringify(aggregateData)}
      </div>
      {aggregateData && 
      <TravelDetails></TravelDetails>}
    </div>
  );
}

export default App;
