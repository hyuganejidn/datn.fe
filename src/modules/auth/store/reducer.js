import { Immutable } from '@/helpers/Immutable'
import * as types from './action_types'

const initialState = {
  user: {},
  isAuthenticated: false,
  errors: {
    login: {
      username: '',
      password: '',
    },
    signUp: {
      username: '',
      fullName: '',
      password: '',
      password_confirm: '',
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
    case types.AUTH_SIGNUP_ERRORS:
      return immutableState.setIn(['errors', 'signUp'], payload).state
    case types.AUTH_LOGIN_SUCCESSFUL:
      return immutableState.update('isAuthenticated', bool => !bool).state
    case types.AUTH_LOGOUT_SUCCESSFUL:
      return immutableState
        .update('user', {})
        .update('isAuthenticated', bool => !bool).state
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
