const Domain = require('./domain')
const Action = require('./action')
const Effect = require('./effect')

const href = require('sheet-router/href')
const history = require('sheet-router/history')
const Pushable = require('pull-pushable')

const SET = Symbol('set')
const INIT = Symbol('init')

const set = Action(SET)
const init = Effect(INIT)

module.exports = Domain({

  name: 'href',

  init: () => ({
    model: document.location.href,
    effect: init()
  }),

  update: {
    [SET]: (model, href) => ({ model: href })
  },

  run: {
    [INIT]: (_, sources) => {
      const effectActions = Pushable(function onClose (error) {
        // cleanup href and/or history
        console.error(error)
      })
      // enable catching <href a=""></href> links
      href(push)
      // enable HTML5 history API
      history(push)

      return effectActions

      function push (href) {
        effectActions.push({
          type: SET,
          payload: href
        })
      }
    }
  }
})
