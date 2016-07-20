const href = require('./href')
const run = require('./run').app
const route = require('./route')
const combine = require('./combine')

module.exports = App

function App (apps) {
  if (!Array.isArray(apps)) apps = [apps]

  // handle run action to trigger effect
  apps.unshift(run)

  // handle href state
  apps.push(href)

  return route(combine(apps), (router) => {
    return (model, dispatch) => {
      return router(model.href, model, dispatch)
    }
  })
}
