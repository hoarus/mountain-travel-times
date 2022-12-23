import { ddbClient } from "./ddbClient.js";
import { getLocalDateTimeString, getDay, getMonth } from "./localDateTime.js";

export const ddbQuery = function(from, to, day){
  console.log(2)

  const code = `${from.slice(0,3)}${to.slice(0,3)}`.toUpperCase();
  console.log(code);
  
  let todayDay = getDay(getLocalDateTimeString(new Date()));

    async function getData(){
      try {
          var params = {
            TableName: "MOUNTAIN_TRAVEL_TIMES",
            IndexName: 'CODE-DAY-index',
            ExpressionAttributeNames: {
              "#day": "DAY"
            },
            ExpressionAttributeValues: {
              ":code": {
                S: code
               }, 
               ":day": {
                S: day
               },
             }, 
            KeyConditionExpression: "CODE = :code AND #day = :day",
          };
          var result = await ddbClient.query(params).promise()
          return result.Items;
      } catch (error) {
          console.error(error);
      }
  }
    return getData();
      

}
