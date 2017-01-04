const apply = require('depject/apply')

const reduceUpdates = require('./lib/reduceUpdates')

module.exports = start

function start (sockets) {
  const update = reduceUpdates(sockets.inux.update)
  const init = combineInit(sockets.inux.init)

  const app = {
    update,
    init
  }
  return app
}
