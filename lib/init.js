const N = require('libnested')

const set = require('./set')

module.exports = Init

function Init ({ state, scope }) {
  return function Init (model = {}) {
    const nextModel = set(model, scope, state.model)

    return {
      model: nextModel,
      effect: state.effect
    }
  }
}
