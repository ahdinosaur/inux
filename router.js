const createRouter = require('sheet-router')

module.exports = Router

function Router (routes) {
  const [lastPath] = routes[routes.length - 1]
  return createRouter(lastPath, function createRoutes (createRoute) {
    return routes.map(route => {
      const [path, handler, children] = route
      const childRoutes = children ? createRoutes(children) : null
      return createRoute(path, handler, childRoutes)
    })
  })
}
