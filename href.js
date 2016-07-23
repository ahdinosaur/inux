const pull = require('pull-stream')
const href = require('sheet-router/href')
const history = require('sheet-router/history')
const Pushable = require('pull-pushable')

const Domain = require('./domain')
const Action = require('./action')
const Effect = require('./effect')


const SET = Symbol('set')
const INIT = Symbol('init')
const GO = Symbol('go')

const set = Action(SET)
const init = Effect(INIT)
const go = Effect(GO)

module.exports = Domain({

  name: 'href',

  init: () => ({
    model: document.location.href,
    effect: INIT
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
    },
    [GO]: (href) => {
      console.log('href', href)
      href = href.replace(/#.*/, '')
      if (window.location.href !== href) {
        window.history.pushState({}, null, href)
        return pull.values([set(href)])
      }
    }
  }
})
module.exports.go = go
