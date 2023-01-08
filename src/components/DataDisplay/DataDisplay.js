import { ddbQuery } from '../Helpers/ddbQuery';
import React, {useState, useEffect} from 'react';
import  BarGraph  from '../BarGraph/BarGraph';
import {roundHour, determineStats, convertDDBResponse} from '../Helpers/transformDDBData'

function DataDisplay(props) {

    const {from, to, day} = props;
  
  let [aggregateData, setAggregateData] = useState();
   let [status, setStatus] = useState("loading");
  const hours = [ "12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", 
                  "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"]

  useEffect(() => {
    ddbQuery(from, to, day).then((response) => {
      setStatus("complete");
      let convertedData = convertDDBResponse(response);
      setAggregateData(convertedData);
    });
  }, [from, to, day]);

  if (status == "loading" ||day === "Day" || from === "From" || to === "To") { 
    return (
      <div></div>
    )
  }

  function toTimeString(totalSeconds) {
    const totalMs = totalSeconds * 1000;
    const result = new Date(totalMs).toISOString().slice(12, 16);
  
    return result;
  }

  function TravelDetails(){
    return(
      <table className='charts-css column'>
      <thead>
      <tr>
        <th>Time</th>
        <th>Min</th>
        <th>Average</th>
        <th>Max</th>
      </tr>
      </thead>
      <tbody>
      {aggregateData.map(row => {
        let min = toTimeString(row['min']);
        let max = toTimeString(row['max']);
        let avg = toTimeString(row['avg']);
        return (
        <tr key ={`${row['hour']}-row`}>
          <td key={`${row}-time`}>{row['hour']}</td>
          <td key={`${row}-min`}>{min}</td>
          <td key={`${row}-avg`}>{avg}</td>
          <td key={`${row}-max`}>{max}</td>
        </tr>)
      }
    )}
    </tbody>
    </table>
    )
  }
    
  return (
    <div className='data-display-wrapper'>
      <h2 className='chart-name'>From <strong>{from}</strong> to <strong>{to}</strong> on <strong>{day}</strong></h2>
      <BarGraph data = {aggregateData}></BarGraph>
    </div>
  );
}

export default DataDisplay;
