import React from 'react';
import Select from 'react-select'

function SearchOptions(props) {
    const {from, setFrom, to, setTo, day, setDay, direction, reverseDirection} = props
    const mountainLocations = ["Arapahoe Basin", "Copper", "Eldora", "Steamboat Springs", "Winter Park"]
    const cityLocations = ["Denver", "Golden"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


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

  return(
    <div className='search-options-wrapper'>
        <form>
            <Select name="from" options = {listFromLocations()} placeholder="From" onChange={handleFromSelect}/>
            <Select name="to" isSearchable={false} options = {listToLocations()} placeholder="To" onChange={handleToSelect}/>
            <Select name="day" isSearchable={false} options = {listDays} placeholder="Day" onChange={handleDaySelect}/>
        </form>
    </div>
  )
}

export default SearchOptions;
