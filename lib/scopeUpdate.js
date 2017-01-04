const N = require('libnested')
const arrayEqual = require('@f/array-equal')

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

function set (obj, path, value) {
  return N.map(obj, (currentValue, currentPath) => {
    return arrayEqual(path, currentPath)
      ? value
      : currentValue
  })
}
