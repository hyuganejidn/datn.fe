/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
import cloneDeep from 'lodash.clonedeep'

export class Immutable {
  constructor(obj) {
    this._state = cloneDeep(obj)
  }

  get state() {
    return this._state
  }

  set(key, value) {
    if (typeof key !== 'string') throw new Error(`${key} not found in state`)

    Object.assign(this._state[key], value)
    return this
  }

  setIn(keys, value) {
    if (typeof keys === 'string') {
      Object.assign(this._state[keys], value)
    } else if (Array.isArray(keys)) {
      let state = this._state

      for (const key of keys) {
        if (typeof state[key] === 'undefined')
          throw new Error(`${key} not found in state`)

        if (
          typeof state[key] === 'object' &&
          !(keys[keys.length - 1] === key && typeof value === 'object')
        ) {
          state = state[key]
        } else {
          if (typeof value === 'object') Object.assign(state[key], value)
          else state[key] = value
          break
        }
      }
    }
    return this
  }
}
