const N = require('libnested')

module.exports = Route

function Route ({ route, view }) {
  return function () {
    return [route, view]
  }
}
