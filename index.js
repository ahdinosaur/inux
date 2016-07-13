const extend = require('xtend')
const pullMany = require('pull-many')

// TODO publish somewhere else
// undefined === "we're not sure if it's anything"
// null === "it's nothing"

module.exports = {
  createAction,
  handleActions,
  reduceUpdates,
  runMany
}

function createAction (type, payloadCreator = identity) {
  return (...args) => ({
    type,
    payload: payloadCreator(...args)
  })
}

function handleActions (actionHandlers) {
  return reduceUpdates(
    keys(actionHandlers).map((actionType) => {
      const update = actionHandlers[actionType]

      return function (model, action) {
        if (action.type === actionType) {
          return update(model, action.payload)
        }
        return { model }
      }
    })
  )
}

function reduceUpdates (updates) {
  return function (model, action) {
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
      return run(effect, sources) || pull.empty()
    })

    return pullMany(nextActions)
  }
}

function identity (id) { return id }
