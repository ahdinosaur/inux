module.exports = {
  App: require('./app'),
  Domain: require('./domain'),
  Event: require('./event'), // Action | Effect
  Action: require('./action'),
  Effect: require('./effect'),
  run: require('./run').run,

  // ---
  apps: {
    run: require('./run').app,
    href: require('./href')
  },
  addRouter: require('./addRouter'),
  createRouter: require('./createRouter'),
  handleActions: require('./handleActions'),
  handleEffects: require('./handleEffects'),
  scopeUpdate: require('./scopeUpdate'),
  reduceUpdates: require('./reduceUpdates'),
  runMany: require('./runMany')
}
