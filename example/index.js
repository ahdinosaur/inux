const inux = require('../')
const depject = require('depject')

const modules = {
  catsState: inux.State(require('./cats/state')),
  createCat: inux.Action(require('./cats/actions/create')),
  fetchCat: inux.Effect(require('./cats/effects/fetch'))
}

const sockets = depject(modules)

const app = inux.start(sockets)

console.log('init', app.init())
console.log('update', app.update({ cats: {} }, sockets.cats.create[0]()))
console.log('run', app.run(sockets.cats.fetch[0]()))
