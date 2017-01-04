const N = require('libnested')
const arrayEqual = require('@f/array-equal')

module.exports = set

function set (obj, path, value) {
  return N.map(obj, (currentValue, currentPath) => {
    return arrayEqual(path, currentPath)
      ? value
      : currentValue
  })
}
