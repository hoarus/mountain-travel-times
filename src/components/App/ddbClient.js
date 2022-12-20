import AWS from "aws-sdk";

// Set the region

AWS.config.update({
    region: process.env.REACT_APP_AWS_REGION,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.REACT_APP_AWS_API_KEY,
});

// Create DynamoDB service object
let ddbClient = new AWS.DynamoDB({apiVersion: '2012-08-10'});


export { ddbClient };
