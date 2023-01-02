import React, { Component, Fragment } from "react";
import reverseImage from './revert-hand-drawn-arrows.png'

import Select from "react-select";

export default class ReverseDirection extends Component {


    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    selectRef = null;

    handleSubmit(event) {
        alert('A name was submitted: ');
        event.preventDefault();
      }

    clearValue = () => {
        console.log("test")
        this.props.reverseDirection();
        this.forceUpdate();
    };


  
    render() {
        const {from, setFrom, to, setTo, day, setDay, direction, reverseDirection} = this.props
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

        // Reverse Direction Function

        const setReverseDirection = function() {
            reverseDirection();
    
        }
      return (
        <div className='search-options-wrapper'>
        <img src={reverseImage} className='reverse-image' onClick={this.clearValue}/>
        <form className='search-form' onSubmit={this.handleSubmit}>
            <Select 
                ref={ref => {
                   this.selectRef = ref;
                }}
                className='drop-down' 
                name="from"  
                isSearchable={false} 
                placeholder="From" 
                options = {listFromLocations()}  
                onChange={handleFromSelect}
                />
            <div>to</div>
            <Select className='drop-down' name="to" isSearchable={false} options = {listToLocations()}  placeholder="To"  onChange={handleToSelect}/>
            <div>on</div>
            <Select className='drop-down' name="day" isSearchable={false} options = {listDays} placeholder="Day"  onChange={handleDaySelect}/>
        </form>
    </div>
      );
    }
  }
  