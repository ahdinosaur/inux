module.exports = Init

function combineInits (inits) {
  return function combinedInit () {
    return apps.reduce((state, init) => {
      const nextState = init()
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
const N = require('libnested')

const set = require('./set')

module.exports = scopeUpdate

function scopeUpdate ({ update, scope }) {
  return function scopedUpdate (model, action) {
    const scopePrevModel = N.get(model, scope)
    const scopeState = update(scopePrevModel, action)
    const nextModel = set(model, scope, scopeState.model)

    return {
      model: nextModel,
      effect: scopeState.effect
    }
  }
}
