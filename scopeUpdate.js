const extend = require('xtend')

module.exports = scopeUpdate

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
