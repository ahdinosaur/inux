const keys = require('own-enumerable-keys')

const runMany = require('./runMany')

module.exports = handleEffects

function handleEffects (effectHandlers) {
  const runs = 
  keys(effectHandlers).map((effectType) => {
    const run = effectHandlers[effectType]

    return function (effect, sources) {
      if (effect.type === effectType) {
        return run(effect.payload, sources)
      }
    }
  })

  return runMany(runs)
}
