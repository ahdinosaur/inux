module.exports = {
  path: ['cats', 'create'],
  create: () => ({
    update: (model, action) => {
      console.log('cat:create', model, action)
      return model
    }
  })
}
