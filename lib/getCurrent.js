const pull = require('pull-stream/pull')
const take = require('pull-stream/throughs/take')
const drain = require('pull-stream/sinks/drain')

module.exports = (stream) => {
  var value
  pull(
    stream,
    take(1),
    drain(val => value = val)
  )
  return value
}
