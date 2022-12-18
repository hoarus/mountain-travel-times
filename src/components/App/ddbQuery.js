import { ddbClient } from "./ddbClient.js";
import { QueryCommand } from "@aws-sdk/client-dynamodb";

export const ddbQuery = function(){

    const query = async () => {
        const response = await ddbClient
          .query({
            TableName: "MOUNTAIN_TRAVEL_TIMES",
            ExpressionAttributeValues: {
              ":v1": {
                S: "ELDDEN"
               }
             }, 
            KeyConditionExpression: "CODE = :v1"
          })
          .promise();
      
        console.log(`Query response: ${JSON.stringify(response, null, 2)}`);
      };
      
      query().catch((error) => console.error(JSON.stringify(error, null, 2)));

    console.log(query());

return "ddb_query"

}

ddbQuery();
