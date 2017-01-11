module.exports = {
  needs: { router: { navigate: 'first' } },
  path: ['router', 'go'],
  create: (api) => ({
    update: (model) => ({
      model,
      effect: api.router.navigate()
    })
  })
}
