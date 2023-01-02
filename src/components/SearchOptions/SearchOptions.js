import React, {useState, useRef} from 'react';
import Select from 'react-select'
import reverseImage from './revert-hand-drawn-arrows.png'




function SearchOptions(props) {


    const {from, setFrom, to, setTo, day, setDay, direction, reverseDirection} = props
    const mountainLocations = ["Arapahoe Basin", "Copper", "Eldora", "Steamboat Springs", "Winter Park"]
    const cityLocations = ["Denver", "Golden"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    // On Change Functions
    const handleFromSelect = function(option) {
        setFrom(option.value)
    }
    const handleToSelect = function(option) {
        setTo(option.value)
    }
    const handleDaySelect = function(option) {
        setDay(option.value)
    }

    // Dynamically map lists to Select Options
    const listMountainLocations =  mountainLocations.map((location) => {
        return {value: location, label: location} 
    });

    const listCityLocations =  cityLocations.map((location) => {
        return {value: location, label: location} 
    });

    const listDays =  days.map((day) => {
        return {value: day, label: day} 
    });

    const listFromLocations = function() {
        if(direction === "to the Mountains") {
            return listCityLocations;
        } else {
            return listMountainLocations
        }
    };
    const listToLocations = function() {
        if(direction === "to the Mountains") {
            return listMountainLocations;
        } else {
            return listCityLocations
        }
    }
    // Copy this link: https://codesandbox.io/s/react-select-clear-value-3d2xn?file=/example.js

  return(
    <div className='search-options-wrapper'>
        <img src={reverseImage} className='reverse-image' onClick={reverseDirection}/>
        <form className='search-form'>
            <Select className='drop-down' name="from" isSearchable={false} options = {listFromLocations()} placeholder="From" onChange={handleFromSelect}/>
            <div>to</div>
            <Select className='drop-down' name="to" isSearchable={false} options = {listToLocations()} placeholder="To" onChange={handleToSelect}/>
            <div>on</div>
            <Select className='drop-down' name="day" isSearchable={false} options = {listDays} placeholder="Day" onChange={handleDaySelect}/>
        </form>
    </div>
  )
}

export default SearchOptions;


