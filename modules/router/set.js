const Router = require('sheet-router')
const walk = require('sheet-router/walk')
const createLocation = require('sheet-router/create-location')

module.exports = {
  needs: {
    inux: { route: 'map' },
    router: { scrollToHash: 'first' }
  },
  path: ['router', 'set'],
  create: (api) => {
    const routes = api.inux.route()

    // HACK to get route params
    var router = Router({ thunk: false }, routes)
    walk(router, (route, cb) => params => params)

    return {
      scope: ['router'],
      update: (model, nextRoute) => {
        var nextModel = createLocation(model, nextRoute)
        nextModel.params = router(nextModel.pathname)
        
        if (nextModel.hash && nextModel.hash !== model.hash)
          var effect = scrollToHash(nextModel.hash)

        return { model: nextModel, effect }
      }
    }
  }
}
