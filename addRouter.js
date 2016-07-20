const extend = require('xtend')

const createRouter = require('./createRouter')

module.exports = addRouter

function addRouter (app, handler) {
  const router = createRouter(app.routes)

  return extend(app, {
    view: handler(router)
  })
}
