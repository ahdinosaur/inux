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
  Router: require('./router'),
  route: require('./route'),
  handleActions: require('./handleActions'),
  handleEffects: require('./handleEffects'),
  scopeUpdate: require('./scopeUpdate'),
  reduceUpdates: require('./reduceUpdates'),
  runMany: require('./runMany')
}
