const extend = require('xtend')
const mapValues = require('@f/map-values')
const mapObj = require('@f/map-obj')
const keys = require('own-enumerable-keys')
const pullMany = require('pull-many')
const empty = require('pull-stream/sources/empty')
const multi = require('inu-multi')

module.exports = {
  createAction,
  combineApps,
  combineInits,
  combineUpdates,
  handleActions,
  handleEffects,
  scopeUpdate,
  reduceUpdates,
  runMany
}

function createAction (type, payloadCreator = identity) {
  return (...args) => ({
    type,
    payload: payloadCreator(...args)
  })
}

function combineApps (apps) {
  return multi({
    init: combineInits(mapObj(app => app.init, apps)),
    update: combineUpdates(mapObj(app => app.update, apps)),
    run: combineRuns(mapObj(app => app.run, apps))
    // TODO combine routes?
  })
}

function combineInits (inits) {
  return function combinedInit () {
    var effect = []

    const model = mapObj(init => {
      const state = init()
      if (state.effect) effect.push(state.effect)
      return state.model
    }, inits)

    return { model, effect }
  }
}

function combineUpdates (updates) {
  const handled = mapValues((update, key) => {
    if (!update) return (model) => ({ model })
    if (typeof update === 'object') {
      return handleActions(update)
    }
    return update
  }, updates)
  
  const scoped = mapValues(scopeUpdate, handled)

  return reduceUpdates(scoped)
}

function combineRuns (runs) {
  const handled = mapValues((run, key) => {
    if (!run) return empty()
    if (typeof run === 'object') {
      return handleEffects(run)
    }
    return run
  }, runs)

  return runMany(handled)
}

function handleActions (actionHandlers) {
  const updates = 
  keys(actionHandlers).map((actionType) => {
    const update = actionHandlers[actionType]

    return function (model, action) {
      if (action.type === actionType) {
        return update(model, action.payload)
      }
      return { model }
    }
  })

  return reduceUpdates(updates)
}

function handleEffects (effectHandlers) {
  return function (effect, sources) {
    const nextActionsSources =
    keys(effectHandlers).map((effectType) => {
      if (effect.type !== effectType) return empty()
      const run = effectHandlers[effectType]
      return run(effect, sources)
    })

    return runMany(nextActionsSources)
  }
}

function scopeUpdate (update, key) {
  return function scopedUpdate (model, action) {
    const scopeState = update(model[key], action)
    const nextModel = extend(model, {
      [key]: scopeState.model
    })

    return {
      model: nextModel,
      effect: scopeState.effect
    }
  }
}

function reduceUpdates (updates) {
  console.log('updates', updates)
  return function reducedUpdate (model, action) {
    console.log('model', model, action)
    return updates.reduce(
      (state, update) => {
        const nextState = update(state.model, action)
        const nextModel = nextState.model
        const nextEffect = nextState.effect
          ? state.effect.concat(nextState.effect)
          : state.effect

        return {
          model: nextModel,
          effect: nextEffect
        }
      },
      { model, effect: [] }
    )
  }
}

function runMany (runs) {
  return function runEffect (effect, sources) {
    const nextActions = runs.map(run => {
      if (run == null) return empty()
      return run(effect, sources) || empty()
    })

    return pullMany(nextActions)
  }
}

function identity (id) { return id }

/*
function mapValues (object, lambda) {
  return keys(object).reduce(sofar, key => {
    return assign(sofar, {
      [key]: lambda(object[key], key, object)
    })
  }, {})
}
*/
