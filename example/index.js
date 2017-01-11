const inux = require('../')
const { html, pull } = require('inu')
const depject = require('depject')

const modules = {
  layout: require('./layout'),
  homePage: inux.Page(require('./home-page')),
  '404Page': inux.Page(require('./404-page')),
  catsState: inux.State(require('./cats/state')),
  createCat: inux.Action(require('./cats/actions/create')),
  fetchCat: inux.Effect(require('./cats/effects/fetch')),
  listCats: inux.Page(require('./cats/pages/list'))
}

const sockets = depject(modules, inux.modules)
const main = document.createElement('div')
document.body.appendChild(main)

const { views } = inux.start(sockets)
pull(views(), pull.drain(view => html.update(main, view)))
