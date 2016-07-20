const Router = require('sheet-router')

module.exports = createRouter

function createRouter (routes) {
  const [lastPath] = routes[routes.length - 1]
  return Router(lastPath, function createRoutes (createRoute) {
    return routes.map(route => {
      const [path, handler, children] = route
      const childRoutes = children ? createRoutes(children) : null
      return createRoute(path, handler, childRoutes)
    })
  })
}
