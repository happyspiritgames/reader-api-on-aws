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
    const resultFromS3 = await s3.getObject(params).promise()
    out = JSON.parse(resultFromS3.Body.toString())
  } catch (err) {
    if (err.code === 'NoSuchKey') {
      console.log('Requested story not found in S3 bucket:', editionKey)
    } else {
      console.log('Unexpected error:', editionKey, err.code, err.message)
    }
  }
  return out
}

exports.getEditionScene = async (editionKey, sceneId) => {
  let out
  try {
    const params = {
      Bucket: 'hsg-storytime-storyrepo',
      Key: `published/${editionKey}.scene-${sceneId}.json`
    }
    const resultFromS3 = await s3.getObject(params).promise()
    out = JSON.parse(resultFromS3.Body.toString())
  } catch (err) {
    if (err.code === 'NoSuchKey') {
      console.log('Requested scene not found in S3 bucket:', editionKey, sceneId)
    } else {
      console.log('Unexpected error:', editionKey, sceneId, err.code, err.message)
    }
  }
  return out
}

exports.getPublished = async () => {
  const start = Date.now()
  let out
  try {
    // FIXME this will have performance issue - think of a different way to search and sort
    const params = {
      Bucket: 'hsg-storytime-storyrepo',
      Prefix: `published/`
    }
    const resultFromS3 = await s3.listObjects(params).promise()
    const covers = resultFromS3.Contents.filter(fileInfo => fileInfo.Key.includes('.cover.'))

    out = await Promise.all(covers.map(async coverInfo => {
      let coverParams = {
        Bucket: 'hsg-storytime-storyrepo',
        Key: coverInfo.Key
      }
      const coverResult = await s3.getObject(coverParams).promise()
      return JSON.parse(coverResult.Body.toString())
    }))
  } catch (err) {
    console.log('Unexpected error:', err.code, err.message)
  }
  console.log('elapsed time', Date.now() - start)
  return out
}