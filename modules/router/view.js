const assign = require('object-assign')
const Router = require('sheet-router')

module.exports = {
  needs: { inux: { route: 'map' } },
  gives: { inux: { enhancer: true } },
  create: (api) => {
    const routes = api.inux.route()
    const router = Router({
      default: '/'
    }, routes)

    return { inux: { enhancer: inuRouter } }

    function viewByRoute (model, dispatch) {
      return router(model.router.href, model, dispatch)
    }

    function inuRouter (app) {
      return assign({}, app, { view: viewByRoute })
    }
  }
}
