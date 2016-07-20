const extend = require('xtend')

const handleActions = require('./handleActions')
const handleEffects = require('./handleEffects')

module.exports = Domain

function Domain (domain) {
  return extend(domain, {
    update: typeof domain.update === 'object'
      ? handleActions(domain.update)
      : domain.update
    ,
    run: typeof domain.run === 'object'
      ? handleEffects(domain.run)
      : domain.run
  })
}
