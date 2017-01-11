const { html } = require('inu')

module.exports = {
  needs: { layout: 'first' },
  create: (api) => ({
    route: '/404',
    view: api.layout(() => html`
      <div>404</div>
    `)
  })
}
