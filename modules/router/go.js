module.exports = {
  needs: { router: { navigate: 'first' } },
  path: ['router', 'go'],
  create: (api) => ({
    update: (model, nextRoute) => ({
      model,
      effect: api.router.navigate(nextRoute)
    })
  })
}
