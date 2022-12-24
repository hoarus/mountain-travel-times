import React, {useState} from 'react';
import Select from 'react-select'
import reverseImage from './revert-hand-drawn-arrows.png'

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // An function that increment 👆🏻 the previous state like here 
    // is better than directly setting `value + 1`
}

function SearchOptions(props) {
    const {from, setFrom, to, setTo, day, setDay, direction, reverseDirection} = props
    const mountainLocations = ["Arapahoe Basin", "Copper", "Eldora", "Steamboat Springs", "Winter Park"]
    const cityLocations = ["Denver", "Golden"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const [, updateState] = React.useState();

    const forceUpdate = useForceUpdate();


    const setReverseDirection = function() {
        reverseDirection();
        forceUpdate();

    }
    const handleFromSelect = function(option) {
        setFrom(option.value)
    }
    const handleToSelect = function(option) {
        setTo(option.value)
    }
    const handleDaySelect = function(option) {
        setDay(option.value)
    }


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
        <img src={reverseImage} className='reverse-image' onClick={forceUpdate}/>
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


