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


export {convertDDBResponse}