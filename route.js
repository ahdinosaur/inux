const extend = require('xtend')

const Router = require('./router')

module.exports = route

function route (app, handler) {
  const router = Router(app.routes)

  return extend(app, {
    view: handler(router)
  })
}
