const { html } = require('inu')

module.exports = {
  create: (api) => ({
    route: '/',
    view: (model) => html`
      <div>meow</div>
    `
  })
}
