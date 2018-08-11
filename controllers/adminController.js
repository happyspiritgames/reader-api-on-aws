/**
 * Returns a sign of life.
 *
 * @param {*} req
 * @param {*} res
 */
exports.ping = (req, res) => {
  res.send({ salutation: 'pong' })
}
