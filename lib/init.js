const N = require('libnested')

const set = require('./set')

module.exports = Init

function Init ({ state, scope }) {
  return function Init (model = {}) {
    console.log('init', model, scope)
      console.log('state', state.model)
    const nextModel = set(model, scope, state.model)
    console.log('now', nextModel)

    return {
      model: nextModel,
      effect: state.effect
    }
  }
}
