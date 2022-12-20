import { ddbClient } from "./ddbClient.js";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { getLocalDateTimeString, getDay, getMonth } from "./localDateTime.js";

export const ddbQuery = function(){
  let todayDay = getDay(getLocalDateTimeString(new Date()));
    const query = async () => {
      const response = await ddbClient
        .query({
          TableName: "MOUNTAIN_TRAVEL_TIMES",
          IndexName: 'CODE-DAY-index',
          ExpressionAttributeNames: {
            "#day": "DAY"
          },
          ExpressionAttributeValues: {
            ":code": {
              S: "ELDDEN"
             }, 
             ":day": {
              S: todayDay
             },
           }, 
          KeyConditionExpression: "CODE = :code AND #day = :day",
        })
        .promise();
        console.log(`Query response: ${JSON.stringify(response, null, 2)}`);
      };
      query().catch((error) => console.error(JSON.stringify(error, null, 2)));

  return "ddb_query"

}
