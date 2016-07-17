module.exports = Event

function Event (type, payloadCreator = identity) {
  return (...args) => ({
    type,
    payload: payloadCreator(...args)
  })
}

function identity (payload) { return payload }
