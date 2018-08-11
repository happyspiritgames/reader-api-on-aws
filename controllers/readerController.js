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
  console.log('readerController.getStoryEdition', editionKey)
  try {
    const storyEdition = await storyAccess.getStoryEdition(editionKey)
    if (storyEdition) {
      res.json(storyEdition)
    } else {
      res.status(404).json(
        errorMessage(`Could not find story: ${editionKey}`)
      )
    }
  } catch (e) {
    console.error('Problem getting story', e)
    res.status(500).json(internalError)
  }
}

/**
 * Returns the given scene of the given story edition.
 *
 * @param {*} req
 * @param {*} res
 */
exports.getEditionScene = async (req, res) => {
  const { editionKey, sceneId } = req.params
  console.log('readerController.getEditionScene', editionKey, sceneId)
  try {
    const scene = await storyAccess.getEditionScene(editionKey, sceneId)
    if (scene) {
      res.json(scene)
    } else {
      res.status(404).json(
        errorMessage(`Could not find scene: ${editionKey} ${sceneId}`)
      )
    }
  } catch (e) {
    console.error('Problem getting scene', e)
    res.status(500).send(internalError)
  }
}
