import React from 'react';
import Select from 'react-select'

function SearchOptions(props) {
    const {from, setFrom, to, setTo, day, setDay} = props
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
    const handleSubmit = function(event) {
        event.preventDefault();
        alert('Submit')
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

  return(
    <div className='search-options-wrapper'>
    <form onSubmit={handleSubmit}>
    <Select name="from" options = {listMountainLocations} placeholder="From" onChange={handleFromSelect}/>
    <Select name="to" isSearchable={false} options = {listCityLocations} placeholder="To" onChange={handleToSelect}/>
    <Select name="day" isSearchable={false} options = {listDays} placeholder="Day" onChange={handleDaySelect}/>
    <input type="submit" value="Submit"/>
    </form>
    </div>
  )
}

export default SearchOptions;
