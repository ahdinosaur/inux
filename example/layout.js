const { html } = require('inu')

module.exports = {
  gives: { layout: true },
  create: (api) => {
    return { layout }

    function layout (view) {
      return (model, dispatch) => html`
        <div>
          <nav>
            <a href='/'>home</a>
            <a href='/cats'>cats</a>
          </nav>
          ${view(model, dispatch)}
        </div>
      `
    }
  }
}
