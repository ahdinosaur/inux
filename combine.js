const extend = require('xtend')
const getIn = require('get-in')
const defaults = require('inu/defaults')
const multi = require('inu-multi')

const reduceUpdates = require('./reduceUpdates')
const runMany = require('./runMany')
const scopeUpdate = require('./scopeUpdate')

module.exports = combineApps

function combineApps (apps) {
  return multi({
    init: combineInits(apps),
    update: combineUpdates(apps),
    run: combineRuns(apps),
    routes: combineRoutes(apps)
  })
}

function combineInits (apps) {
  return function combinedInit () {
    return apps.reduce((state, app) => {
      if (!app.init) return state
      const nextState = app.init()
      const nextModel = extend(
        state.model,
        app.name
          ? { [app.name]: nextState.model }
          : nextState.model
      )
      const nextEffect = nextState.effect
        ? state.effect.concat([nextState.effect])
        : state.effect

      return {
        model: nextModel,
        effect: nextEffect
      }
    }, { model: {}, effect: [] })
  }
}

function combineUpdates (apps) {
  const scoped = apps.map(app => {
    if (!app.update) return defaults.update
    return app.name
      ? scopeUpdate(app.update, app.name)
      : app.update
  })

  return reduceUpdates(scoped)
}

function findTopView (apps) {
  const app = apps.find(app =>
    !app.name && app.view
  )
  return (app || {}).view
}

function combineRuns (apps) {
  return runMany(apps.map(app => app.run))
}

function combineRoutes (apps) {
  return apps.reduce(
    (sofar, app) => {
      const routes = app.routes
      return routes
        ? sofar.concat(routes)
        : sofar
    },
    []
  )
}
