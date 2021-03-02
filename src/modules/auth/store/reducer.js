import { Immutable } from '@/helpers/Immutable'
import * as types from './action_types'

const initialState = {
  user: {},
  errors: {
    login: {
      username: '',
      password: '',
    },
    resetPassword: {
      password: '',
      new_password: '',
      confirm_new_password: '',
      password_response: '',
    },
  },
}

const reducer = (_state = initialState, { type, payload }) => {
  const immutableState = new Immutable(_state)
  switch (type) {
    case types.AUTH_SET_USER:
      return immutableState.set('user', payload).state
    case types.AUTH_LOGIN_ERRORS:
      return immutableState.setIn(['errors', 'login'], payload).state
    case types.AUTH_RESET_ERRORS:
      return immutableState.setIn(['errors', 'login'], {
        username: '',
        password: '',
      }).state
    default:
      return _state
  }
}
export default reducer
