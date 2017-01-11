const assign = require('object-assign')
const N = require('libnested')

const Route = require('./lib/route')

module.exports = PageModule

function PageModule (definition) {
  const {
    needs = {},
    create: createPage
  } = definition

  const gives = {
    inux: { route: true }
  }
  
  return {
    needs,
    gives,
    create
  }
  
  function create (api) {
    const route = Route(createPage(api))
    var module = {}
    N.set(module, ['inux', 'route'], route)
    return module
  }
}
