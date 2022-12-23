import './App.css';
import React, {useState} from 'react';
import DataDisplay from '../DataDisplay/DataDisplay';
import SearchOptions from '../SearchOptions/SearchOptions';

function App() {

  const [from, setFrom] = useState("From");
  const [to, setTo] = useState("To");
  const [day, setDay] = useState("Day");
  
  return(
    <div className='page-wrapper'>
    <h1>Times to the Mountains</h1>
    <SearchOptions
      from = {from}
      setFrom = {setFrom}
      to = {to}
      setTo = {setTo}
      day = {day}
      setDay = {setDay}
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
