

function getLocalDateTimeString(isoDateTime) {
    let dateString = isoDateTime.toLocaleDateString('en-US', {timeZone: 'America/Denver'});
    let timeString = isoDateTime.toLocaleTimeString('en-US', {timeZone: 'America/Denver'})
    return dateString + " " + timeString;
}

function getDay(dateString) {
    const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let date = new Date(dateString);
    return weekdays[date.getDay()];
}

function getMonth(dateString) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date(dateString);
    return months[date.getMonth()];
}

let string = getLocalDateTimeString(new Date('2022-12-18T20:59:28.886Z'));


export {getLocalDateTimeString, getDay, getMonth};