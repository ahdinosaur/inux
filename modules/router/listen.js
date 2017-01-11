const Pushable = require('pull-pushable')
const listenHref = require('sheet-router/href')
const listenHistory = require('sheet-router/history')

module.exports = {
  needs: { router: {
    set: 'first',
    go: 'first'
  } },
  path: ['router', 'listen'],
  create: (api) => ({
    run: () => {
      const effectActions = Pushable(function onClose (error) {
        // TODO cleanup href and history
        console.error(error)
      })

      // listen to <href a=""></href> link clicks
      listenHref(href => {
        effectActions.push(api.router.go(href))
      })

      // listen to location history changes
      listenHistory(href => {
        effectActions.push(api.router.set(href))
      })

      return effectActions
    }
  })
}
