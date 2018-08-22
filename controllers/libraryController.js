const { internalError } = require('./errors')
const storyAccess = require('../s3repo/storyAccess')

const editionModel = {
  getLatestEditions: () => [ { editionKey: 'blargy' }, { editionKey: 'wumpus' } ]
}

/**
 * Returns a list of stories that match the given criteria. For now,
 * there are no criteria, so this simply returns the latest editions
 * of all published stories.
 *
 * @param {*} req the request object
 * @param {*} res the response object
 */
exports.searchStories = async (req, res) => {
  console.log('library.searchStories')
  try {
    const publishedStories = await storyAccess.getPublished()
    res.json(publishedStories)
  } catch (e) {
    console.error('Problem finding published stories', e)
    res.status(500).send(internalError)
  }
}

/**
 * Returns a list of recommended stories.
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getRecommendations = async (req, res) => {
  console.log('library.getRecommendations')
  try {
    const recommendations = await storyAccess.getRecommendations()
    res.json(recommendations)
  } catch (e) {
    console.error('Problem finding recommended stories', e)
    res.status(500).send(internalError)
  }
}
