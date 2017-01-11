const apply = require('depject/apply')
const inu = require('inu')

const reduce = require('./lib/reduce')
const many = require('./lib/many')

module.exports = start

function start (sockets) {
  const init = reduce(sockets.inux.init)
  const update = reduce(sockets.inux.update)
  const run = many(sockets.inux.run)

  const app = {
    init,
    update,
    run
  }

  const enhancer = apply.reduce(sockets.inux.enhancer)
  
  console.log(sockets.inux.enhancer)

  const enhancedApp = enhancer(app)

  console.log('enhancedApp', enhancedApp)

  return inu.start(enhancedApp)
}
