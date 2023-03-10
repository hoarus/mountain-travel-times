import { ddbClient } from "./ddbClient.js";

export const ddbQuery = function(from, to, day){

  const code = `${from.slice(0,3)}${to.slice(0,3)}`.toUpperCase();

    async function getData(){
      try {
          var params = {
            TableName: "STATS_MOUNTAIN_TRAVEL_TIMES",
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
