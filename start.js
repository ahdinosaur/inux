const apply = require('depject/apply')

const reduce = require('./lib/reduce')

module.exports = start

function start (sockets) {
  const update = reduce(sockets.inux.update)
  const init = reduce(sockets.inux.init)

  const app = {
    update,
    init
  }
  return app
}
