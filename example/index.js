const inux = require('../')
const depject = require('depject')

const modules = {
  catsState: inux.State(require('./cats/state')),
  createCat: inux.Action(require('./cats/actions/create'))
}

const sockets = depject(modules)

const app = inux.start(sockets)
console.log('init', app.init())
console.log('update', app.update({ cats: {} }, sockets.cats.create[0]()))
