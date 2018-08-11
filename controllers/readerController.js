const { errorMessage, internalError } = require('./errors')
const storyAccess = require('../s3repo/storyAccess')

const editionModel = {
  getEdition: (key) => {
    return { editionKey: key }
  },
  getEditionScene: (key, sceneId) => {
    return {
      editionKey: key,
      editionSceneKey: sceneId
    }
  }
}

/**
 * Returns the cover information for the given story edition key.
 *
 * @param {*} req
 * @param {*} res
 */
exports.getStoryEdition = async (req, res) => {
  const { editionKey } = req.params
  console.log('storyController.getStoryEdition', editionKey)
  try {
    const storyEdition = await storyAccess.getStoryEdition(editionKey)
    if (storyEdition) {
      res.json(storyEdition)
    } else {
      res.status(404).json(errorMessage('Could not find a story-game with the given key'))
    }
  } catch (e) {
    console.error('Problem getting story edition', e)
    res.status(500).json(internalError)
  }
}

/**
 * Returns the given scene of the given story edition.
 *
 * @param {*} req
 * @param {*} res
 */
exports.getEditionScene = (req, res) => {
  const { editionKey, sceneId } = req.params
  console.log('storyController.getEditionScene', editionKey, sceneId)
  try {
    res.json(editionModel.getEditionScene(editionKey, sceneId))
    // editionModel.getScene(editionKey, sceneId).then((scene) => {
    //   if (scene) {
    //     res.json(scene)
    //   } else {
    //     res.status(404).json(errorMessage('Scene not found'))
    //   }
    // })
  } catch (e) {
    console.error('Problem getting scene for story', e)
    res.status(500).send(internalError)
  }
}
