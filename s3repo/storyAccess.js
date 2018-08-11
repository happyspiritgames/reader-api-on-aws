var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
s3 = new AWS.S3({apiVersion: '2006-03-01'});

exports.getStoryEdition = (editionKey) => {

  // FIXME get this to work as a Promise and await the response

  // Call S3 to list current buckets
  const request = s3.listBuckets();
  const result = request.promise();
  result.then(
    (data) => {
      console.log("Bucket List", data.Buckets)
      return data
    },
    (err) => {
      console.log("Error", err)
    }
  )
}
