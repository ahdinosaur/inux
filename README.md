# inux

experimental helpers for `inu`

```shell
npm install --save inux
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

### `inux.Domain(Object app)`

extends `app.update` and `app.run` with `handleActions` and `handleEffects`, respectively.

### `inux.App(Array apps)`

combines an `Array` of `inux` apps into a single `inu` app.

each app's model is namespaced to `app.name`, 
any app's effect is added to an `Array` of effects.

also

- adds `inux.apps.href` to handle `href` changes
- adds `inux.apps.run` to handle `run` actions
- sets view using `addRouter`

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

### `inux.addRouter(Object app, Function viewCreator)`

given an app with `app.routes`

and a function of the form `(routes) => (model, dispatch) => ...`,

creates the router with `createRouter(app.routes)` and sets the corresponding view as `app.view`.

### `inux.createRouter(Array routes)`

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
