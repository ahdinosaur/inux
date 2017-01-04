const assign = require('object-assign')
const N = require('libnested')

module.exports = StateModule

function StateModule (definition) {
  const {
    path,
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
    const init = () => create(api)
    var module = {}
    N.set(module, ['inux', 'init'], init)
    return module
  }
}
