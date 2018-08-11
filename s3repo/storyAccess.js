var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
s3 = new AWS.S3({apiVersion: '2006-03-01'});

exports.getStoryEdition = async (editionKey) => {
  let out
  try {
    const params = {
      Bucket: 'hsg-storytime-storyrepo',
      Key: `published/${editionKey}.cover.json`
    }
    const resultFromS3 = await s3.getObject(params).promise();
    out = resultFromS3.Body.toString()
  } catch (err) {
    if (err.code === 'NoSuchKey') {
      console.log('Requested key not found in S3 bucket:', editionKey)
    } else {
      console.log('Unexpected error:', err.code, err.message)
    }
  }
  return out
}
