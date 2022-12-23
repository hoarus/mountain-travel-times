import './App.css';
import React, {useState} from 'react';
import DataDisplay from '../DataDisplay/DataDisplay';
import SearchOptions from '../SearchOptions/SearchOptions';

function App() {

  const [from, setFrom] = useState("From");
  const [to, setTo] = useState("To");
  const [day, setDay] = useState("Day");
  const [direction, setDirection] = useState("to the Mountains")

  function reverseDirection() {
    if (direction === "to the Mountains") {
      setDirection("from the Mountains")
      switchFromAndTo();
    } else {
      setDirection("to the Mountains");
      switchFromAndTo();

    }

    function switchFromAndTo(){
      let newTo = from;
      let newFrom = to;
      setTo(newTo);
      setFrom(newFrom)
    }
  }
  
  return(
    <div className='page-wrapper'>
    <h1>Times {direction}</h1>
    <SearchOptions
      from = {from}
      setFrom = {setFrom}
      to = {to}
      setTo = {setTo}
      day = {day}
      setDay = {setDay}
      direction = {direction}
      reverseDirection = {reverseDirection}
    />
    <DataDisplay
      from = {from}
      to = {to}
      day = {day}
    />
    </div>
    
  )
}

export default App;
