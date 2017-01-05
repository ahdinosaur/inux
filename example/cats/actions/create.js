module.exports = {
  path: ['cats', 'create'],
  create: () => ({
    scope: ['cats'],
    update: (model, action) => {
      console.log('cat:create', model, action)
      return model
    }
  })
}
