const createRouter = require('sheet-router')

module.exports = Router

function Router (routes) {
  const [lastPath] = routes[routes.length - 1]
  return createRouter(lastPath, routes)
}
