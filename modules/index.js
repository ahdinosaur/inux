const State = require('../state')
const Effect = require('../effect')
const Action = require('../action')

module.exports = {
  multi: require('./multi'),
  'router/view': require('./router/view'),
  'router/state': State(require('./router/state')),
  'router/set': Action(require('./router/set')),
  'router/go': Action(require('./router/go')),
  'router/listen': Effect(require('./router/listen')),
  'router/navigate': Effect(require('./router/navigate')),
  'router/scrollToHash': Effect(require('./router/scrollToHash'))
}
