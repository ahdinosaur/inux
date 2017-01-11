const pull = require('pull-stream')
const Pushable = require('pull-pushable')
const createLocation = require('sheet-router/create-location')

const getCurrent = require('../../lib/getCurrent')

module.exports = {
  needs: { router: { set: 'first' } },
  path: ['router', 'navigate'],
  create: (api) => ({
    run: (nextRoute, { models }) => {
      // HACK this is weird
      const model = getCurrent(models()).router
      // end HACK

      const nextModel = createLocation(model, nextRoute)
 
      // update url bar if it changed
      if (nextModel.href !== model.href) {
        window.history.pushState({}, null, nextModel.href)
      }

      return pull.values([
        api.router.set(nextRoute)
      ])
    }
  })
}
