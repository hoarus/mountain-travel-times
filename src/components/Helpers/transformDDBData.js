const hours = [ "12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", 
"12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"]


function toTimeString(totalSeconds) {
    const totalMs = totalSeconds * 1000;
    const result = new Date(totalMs).toISOString().slice(12, 16);
    const resultLong = `${result[0]} hr ${result.slice(2,4)} minutes`
  
    return resultLong;
}

function roundHour (timestamp) {
    let date = new Date(timestamp.S)
    let minutes = date.getMinutes();
    let hours = date.getHours();
    // Round down or up to the nearest hour
    if (minutes >=30) {
      hours += 1;
    }
    // Don't round to the next day (inconsequential due to limited traffic at night)
    hours = Math.min(23, hours)
    return hours;
  }

function convertDDBResponse(array) {

  let convertedArray = [];
  for (let obj of array) {
    convertedArray.push({
      avgHour: obj.AVGHOUR.N,
      avgHourDisplay: obj.AVGHOURDISPLAY.S,
      avgMin: obj.AVGMIN.N,
      avgSec: obj.AVGSEC.N,
      day: obj.DAY.S,
      hour: obj.HOUR.S,
      max: obj.MAX.N,
      maxHourDisplay: obj.MAXHOURDISPLAY.S,
      min: obj.MIN.S,
      minHourDisplay: obj.MINHOURDISPLAY.S,
      month: obj.MONTH.s,
    })
  }
  return convertedArray
}



function determineStats(array){
  function convertArrayToObject(array) {
    let obj = {};
    for (let i =0; i < array.length; i++) {
      let hour = array[i].HOUR;
      let travelTime = Number(array[i].TRAVELTIME.N);
      if (!obj[hour]) {
        obj[hour] = [travelTime];
      } else {
        obj[hour].push(travelTime);
      }
    }
    return obj;
  }

  let obj = convertArrayToObject(array);
  let stats = [];
  let length = Object.keys(obj).length
  for (let i =0; i < length; i++) {
    let hour = i;
    let times = obj[i];
    let calcAverage = arr => arr.reduce((a,b) => a + b, 0) /arr.length;
    let avgSec = Math.round(calcAverage(times));
    let minSec = Math.min(...obj[i]);
    let maxSec = Math.max(...obj[i]);
    stats.push({
      hour: hours[hour],
      min: minSec,
      max: maxSec,
      avgSec: avgSec,
      avgMin: Math.round(avgSec/60),
      avgHour: Math.round(calcAverage(times)/3600),
      avgHourDisplay: toTimeString(avgSec),
      minHourDisplay: toTimeString(minSec),
      maxHourDisplay: toTimeString(maxSec),
    });
  }
  return stats;
  
}

export {roundHour, determineStats, convertDDBResponse}