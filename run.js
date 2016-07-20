const Domain = require('./domain')
const Action = require('./action')

const RUN = Symbol('run')
const run = Action(RUN)

const app = Domain({
  update: {
    [RUN]: (model, effect) => ({ model, effect })
  }
})

module.exports = {
  RUN,
  run,
  app
}
