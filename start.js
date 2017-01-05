const inu = require('inu')

const reduce = require('./lib/reduce')
const many = require('./lib/many')

module.exports = start

function start (sockets) {
  const update = reduce(sockets.inux.update)
  const init = reduce(sockets.inux.init)
  const run = many(sockets.inux.run)

  const app = {
    init,
    update,
    run
  }

  console.log('app', app)

  return app

  return inu.start(app)
}
