# inux

an experiment in opinionated helpers for [`inu`](https://github.com/ahdinosaur/inu)

```shell
npm install --save inux
```

![robot doge](https://pbs.twimg.com/profile_images/449012646851780608/yyIufvO-.png)

## demos

- [holodex/app#compost](https://github.com/holodex/app/tree/compost): full-stack user directory app using [`inu`](https://github.com/ahdinosaur/inu), [`inux`](https://github.com/ahdinosaur/inux), and [`vas`](https://github.com/ahdinosaur/vas)

## philosophy

`inu` provides the foundation, `inux` lets us fly. :)

## concepts

`inux` introduces some opinionated concepts to `inu`:

### action or effect type

a unique `String` or `Symbol` that corresponds to a type of action or effect payload

```js
const SET_TEXT = 'NOTEPAD_SET_TEXT'
// or
const SET_TEXT = Symbol('setText')
```

### action or effect creator

a function that returns an action or effect object of the form `{ type, payload }`

```js
function setText (text) {
  return {
    type: SET_TEXT,
    payload: text
  }
}
```

### domain

like an `inu` app, but

- optionally namespaced to `name` property, which determines where the domain model will be merged into the overall app model
- `update` or `run` can be objects mapping types of actions or effects, respectively, to handler functions
- `routes` can be an array of arrays describing routes for [`sheet-router`](https://github.com/yoshuawuyts/sheet-router)

in this example, `textEditor` refers to a hypothetical re-usable view component.

```js
{
  name: 'notepad',
  init: {
    model: '',
    effect: 
  }
  update: {
    [SET_TEXT]: (model, text) {
      return text
    }
  },
  routes: [
    ['/notepad', function (params, model, dispatch) {
      return html`
        <div>
          ${textEditor(model.notepad, save)}
        </div>
      `

      function save (text) {
        dispatch(setText(text))
      }
    }]
  ]
}
```

## enhancer

a function that take an `inu` app and return another `inu` app

```js
function log (app) {
  return extend(app, {
    init: () => {
      const state = app.init()
      console.log('init:', state)
      return state
    },
    update: (model, action) => {
      console.log('update before:', model, action)
      const state = app.update(model, action)
      console.log('update after:', state)
      return state
    },
    run: (effect, sources) => {
      console.log('run', effect)
      return app.run(effect, sources)
    }
  })
}
```

(for a better `inu` log enhancer, see [`inu-log`](https://github.com/ahdinosaur/inu-log))

## app

a list of domains to become a single `inu` app

each domain is a group of functionality corresponding to a small specific theme in your overall app.

```js
[
  notepad,
  settings,
  auth
]
```

## example

```js
const { start, html } = require('inu')
const { App, Domain, Action } = require('inux')
const extend = require('xtend')

const INCREMENT = Symbol('increment')
const DECREMENT = Symbol('decrement')
const SET = Symbol('set')

const increment = Action(INCREMENT)
const decrement = Action(DECREMENT)
const set = Action(SET)

const view = (model, dispatch) => html`
  <div>
    <button onclick=${(e) =>
      dispatch(decrement())
    }> - </button>
    <input type='number'
      oninput=${(ev) => {
        dispatch(set(Number(ev.target.value)))
      }}
      value=${model}
    />
    <button onclick=${(e) =>
      dispatch(increment())
    }> + </button>
  </div>
`

const counter = Domain({
  name: 'counter',
  init: () => ({ model: 0 }),
  update: {
    [INCREMENT]: (model) => ({ model: model + 1 }),
    [DECREMENT]: (model) => ({ model: model - 1 }),
    [SET]: (model, value) => ({ model: value })
  },
  routes: [
    ['/', (params, model, dispatch) => {
      return view(model.counter, dispatch)
    }]
  ]
})

const app = App([
  counter
])

// const sources = start(app) ...
```

## usage

### `inux = require('inux')`

### `inux.Domain(Object domain)`

extends `domain.update` and `domain.run` with `handleActions` and `handleEffects`, respectively.

### `inux.App(Array domains)`

combines an `Array` of `inux` domains into a single `inu` app.

each domains's model is namespaced to `domain.name`, 
any domains's effect is added to an `Array` of effects.

also

- adds `inux.apps.href` domain to handle `href` changes
- adds `inux.apps.run` domain to handle `run` actions
- sets `app.view` using `route(combinedRoutes, app)
- enhances resulting app with [`inu-multi`](https://github.com/ahdinosaur/inu-multi)

### `inux.Action(String|Symbol type, Function payloadCreator)`
### `inux.Effect(String|Symbol type, Function payloadCreator)`
### `inux.Event(String|Symbol type, Function payloadCreator)`

create an action or effect creator.

creator returns object of form

```js
{
  type: type,
  payload: payloadCreator(...args)
}
```

### `inux.run(effect)`

creates action objects to run an effect.

corresponding `inux.apps.run` update:

```
{
  [RUN]: (model, effect) => ({ model, effect })
}
```

---

### `inux.apps.run`

app to handle `run` actions.

### `inux.apps.href`

app to track `window.location.href`.

### `inux.combine(Array apps)`

combines an array of apps into a single app.

### `inux.route(Object app, Function viewCreator)`

given an app with `app.routes`

and a function of the form `(routes) => (model, dispatch) => ...`,

creates the router with `Router(app.routes)` and sets the corresponding view as `app.view`.

### `inux.Router(Array routes)`

given an array of routes, return a router using `sheet-router`.

the last route will be used as the default route.

### `inux.handleActions(Object actionHandlers)`

given an `Object` of `String` or `Symbol` keys to action handlers, returns a single update `Function`.

each `String` or `Symbol` key corresponds to an `action.type`.

each action handler is a `Function` of the form `(model, action.payload) => state`.

### `inux.handleEffects(Object effectHandlers)`

given an `Object` of `String` or `Symbol` keys to effect handlers, returns a single update `Function`.

each `String` or `Symbol` key corresponds to an `effect.type`.

each effect handler is a `Function` of the form `(effect.payload, sources) => nextActions or null`.

### `inux.scopeUpdate(Function update, String key)`

given an update function and a key, returns a new update function that namespaces updates at the key.

### `inux.reduceUpdates(Array updates)`

given a list of update functions, return a new update function that is the result of applying all of them.

### `inux.runMany(Array runs)`

given a list of run functions, return a new run function that is the result of applying all of them.

## inspiration

- [`redux.combineReducers`](http://redux.js.org/docs/api/combineReducers.html)
- [`redux-actions`](https://github.com/acdlite/redux-actions)
- [`choo`](https://github.com/yoshuawuyts/choo)

## license

The Apache License

Copyright &copy; 2016 Michael Williams

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
