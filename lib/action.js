const Create = require('./create')
const Update = require('./update')

module.exports = Action

function Action (options) {
  const {
    path,
    type = nameToType(path[path.length - 1]),
    create,
    scope = path.slice(0, path.length - 1),
    update = (model) => model
  } = options

  return {
    path,
    type,
    create: Create({
      type,
      create
    }),
    update: Update({
      scope,
      update
    })
  }
}

function nameToType (name) {
  return Symbol(name)
}
