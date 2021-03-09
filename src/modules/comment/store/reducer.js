// import { Immutable } from '@/helpers/Immutable'
import * as types from './action_types'

const initialState = {
  comments: [],
}

const reducer = (_state = initialState, { type, payload }) => {
  // const immutableState = new Immutable(_state)
  switch (type) {
    case types.SET_COMMENTS_POST:
      return { ..._state, comments: payload }
    case types.ADD_COMMENT:
      return { ..._state, comments: [..._state.comments, payload] }
    default:
      return _state
  }
}

export default reducer
