const inux = require('../')
const depject = require('depject')

const modules = {
  createCat: inux.Action(require('./cats/actions/create'))
}

const sockets = depject(modules)

const app = inux.start(sockets)

console.log(app)
