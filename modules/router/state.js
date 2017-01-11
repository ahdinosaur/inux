const createLocation = require('sheet-router/create-location')
const assign = require('object-assign')

module.exports = {
  needs: { router: { listen: 'first' } },
  create: (api) => ({
    scope: ['router'],
    state: {
      model: assign(createLocation(), { params: {} }),
      effect: api.router.listen()
    }
  })
}
