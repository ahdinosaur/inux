const { html } = require('inu')

module.exports = {
  needs: { layout: 'first' },
  create: (api) => ({
    route: '/cats',
    view: api.layout((model) => html`
      <div>cats</div>
    `)
  })
}