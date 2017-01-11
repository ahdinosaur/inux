const getCurrent = require('../../lib/getCurrent')

module.exports = {
  path: ['router', 'scrollToHash'],
  create: (api) => ({
    run: (hash, { models }) => {
      try {
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView(true)
      } catch (err) {}
    }
  })
}
