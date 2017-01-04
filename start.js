const apply = require('depject/apply')

const reduceUpdates = require('./lib/reduceUpdates')

module.exports = start

function start (sockets) {
  const updates = apply.map(sockets.inux.update)
  const update = reduceUpdates(updates)

  const app = {
    update
  }
  return app
}
