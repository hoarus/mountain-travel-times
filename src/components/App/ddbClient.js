import AWS from "aws-sdk";
// Set the region
AWS.config.update({region: 'us-west-2'});

// Create DynamoDB service object
let ddbClient = new AWS.DynamoDB({apiVersion: '2012-08-10'});
export { ddbClient };
