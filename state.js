const assign = require('object-assign')
const N = require('libnested')

const Init = require('./lib/init')

module.exports = StateModule

function StateModule (definition) {
  const {
    needs = {},
    create: createState
  } = definition

  const gives = {
    inux: { init: true }
  }
  
  return {
    needs,
    gives,
    create
  }
  
  function create (api) {
    const init = Init(createState(api))
    var module = {}
    N.set(module, ['inux', 'init'], init)
    return module
  }
}
