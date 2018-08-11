const { errorMessage, internalError } = require('./errors')

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
 * Returns the summary of the given story edition.
 *
 * @param {*} req
 * @param {*} res
 */
exports.getStoryEdition = (req, res) => {
  const { editionKey } = req.params
  console.log('storyController.getStoryEdition', editionKey)
  try {
    res.json(editionModel.getEdition(editionKey))
    // editionModel.getEdition(editionKey).then((edition) => {
    //   if (edition) {
    //     res.json(edition)
    //   } else {
    //     res.status(404).json(errorMessage('Story edition not found'))
    //   }
    // })
  } catch (e) {
    console.error('Problem getting story edition', e)
    res.status(500).send(internalError)
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
