/**
 * Returns a list of stories that match the given criteria. For now,
 * there are no criteria, so this simply returns the latest editions
 * of all published stories.
 *
 * @param {*} req the request object
 * @param {*} res the response object
 */
exports.searchStories = (req, res) => {
  console.log('storyController.searchStories')
  try {
    editionModel.getLatestEditions().then((latest) => {
      res.json(latest)
    })
  } catch (e) {
    console.error('Problem finding published stories', e)
    res.status(500).send(internalError)
  }
}
