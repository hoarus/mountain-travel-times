import { ddbQuery } from '../Helpers/ddbQuery';
import React, {useState, useEffect} from 'react';
import  BarGraph  from '../BarGraph/BarGraph';
import {convertDDBResponse} from '../Helpers/transformDDBData'

function DataDisplay(props) {

    const {from, to, day} = props;
  
  let [aggregateData, setAggregateData] = useState();
   let [status, setStatus] = useState("loading");

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

  return (
    <div className='data-display-wrapper'>
      <h2 className='chart-name'>From <strong>{from}</strong> to <strong>{to}</strong> on <strong>{day}</strong></h2>
      <BarGraph data = {aggregateData}></BarGraph>
    </div>
  );
}

export default DataDisplay;
