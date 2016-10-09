const Url = require('url')

const run = require('./run').run
const go = require('./href').go

module.exports = navigate

function navigate (pathname) {
  const current = window.location.href
  const next = Url.resolve(current, pathname)
  return run(go(next))
}
