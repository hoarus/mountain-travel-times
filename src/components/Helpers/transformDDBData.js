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
      min: obj.MIN.N,
      minHourDisplay: obj.MINHOURDISPLAY.S,
      month: obj.MONTH.S,
    })
  }


  function determineHourNumberOnly(hour) {
    if(hour.length == 4) {
      return hour.slice(0, 2)
    } else {
      return hour.slice(0, 1)
    }
  }

  function sortArray(array) {
    array.sort((a, b) => {
    
      return a.hourNumberOnly - b.hourNumberOnly
    })

    // Reorganize to place 12am/pm at the start of the array
    let hourTwelve = array.pop();
    array.unshift(hourTwelve);

  }
  function sortConvertedArray(array) {
    let amArray = [];
    let pmArray = [];
  
    for (let obj of array) {
      let meridiem = obj.hour.slice(-2);
      obj.hourNumberOnly = Number(determineHourNumberOnly(obj.hour));
      if (meridiem == "am") {
        amArray.push(obj);
      } else {
        pmArray.push(obj);
      }
    }
    sortArray(amArray);
    sortArray(pmArray);
    return (amArray.concat(pmArray));

  }



 let sortedArray = sortConvertedArray(convertedArray)

  return sortedArray
}


export {convertDDBResponse}