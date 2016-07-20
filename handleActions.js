const keys = require('own-enumerable-keys')

const reduceUpdates = require('./reduceUpdates')

module.exports = handleActions

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
