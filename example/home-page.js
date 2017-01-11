const { html } = require('inu')

module.exports = {
  needs: { layout: 'first' },
  create: (api) => ({
    route: '/',
    view: api.layout(() => html`
      <div>home</div>
    `)
  })
}
