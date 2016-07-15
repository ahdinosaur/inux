# inux

experimental helpers for `inu` similar to [common `redux` patterns](http://redux.js.org/).

```shell
npm install --save inux
```

## example

```
const { start, html } = require('inu')
const { combineApps, handleActions } = require('inux')
const extend = require('xtend')

const INCREMENT = Symbol('increment')
const DECREMENT = Symbol('decrement')
const SET = Symbol('set')

const increment = create(INCREMENT)
const decrement = create(DECREMENT)
const set = create(SET)

const counter = {
  init: () => ({ model: 0 }),
  update: handleActions({
    [INCREMENT]: (model) => ({ model: model + 1 }),
    [DECREMENT]: (model) => ({ model: model - 1 }),
    [SET]: (model, value) => ({ model: value })
  }),
  view: (model, dispatch) => html`
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
}

const app = extend(
  combineApps({
    counter: counter
  }),
  {
    view: (model, dispatch) => {
      return counter.view(model.counter, dispatch)
    }
  }
}

// const sources = start(app) ...
```

## usage

### `inux = require('inux')`

### `inux.create(String|Symbol type, Function payloadCreator)`

create an action or effect creator.

creator returns object of form

```js
{
  type: type,
  payload: payloadCreator(...args)
}
```

### `inux.combineApps(Object apps)`

combines an `Object` of `inu` apps into a single app, similar to [`redux.combineReducers`](http://redux.js.org/docs/api/combineReducers.html).

each app's model is namespaced to the respective key in `apps`,

any app's effect is added to an `Array` of effects. because of this, `combineApps` also adds [`inu-multi`](https://github.com/ahdinosaur/inu-multi/blob/master/index.js) to the resulting app.

### `inux.handleActions(Object actionHandlers)`

given an `Object` of `String` or `Symbol` keys to action handlers, returns a single update `Function`.

each `String` or `Symbol` key corresponds to an `action.type`.

each action handler is a `Function` of the form `(model, action.payload) => state`.

### `inux.handleEffects(Object effectHandlers)`

given an `Object` of `String` or `Symbol` keys to effect handlers, returns a single update `Function`.

each `String` or `Symbol` key corresponds to an `effect.type`.

each effect handler is a `Function` of the form `(effect.payload, sources) => nextActions or null`.

---

### `inux.combineInits(Object inits)`

### `inux.combineUpdates(Object updates)`

### `inux.combineRuns(Object runs)`

### `inux.scopeUpdate(Function update, String key)`

### `inux.reduceUpdates(Array updates)`

### `inux.runMany(Array runs)`

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
