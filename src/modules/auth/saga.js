import { all, call, delay, put, takeLatest } from 'redux-saga/effects'

import { removeAuthToken, setAuthToken } from '@/helpers/storage'
import { AuthAPI, UserAPI } from '@/services'
import * as types from './store/action_types'

function* login({ payload }) {
  try {
    const { token } = yield call(() => AuthAPI.login(payload))
    setAuthToken(token, true)
    const user = yield call(UserAPI.me)
    yield put({ type: types.AUTH_SET_USER, payload: user })
  } catch (error) {
    yield put({ type: types.AUTH_LOGIN_ERRORS, payload: error })
  }
}

function* logout() {
  try {
    yield delay(300)
    removeAuthToken()
    yield put({ type: types.AUTH_LOGOUT_SUCCESSFUL })
  } catch (error) {
    console.log('error', error)
  }
}

console.log(types)

export default function* authSaga() {
  yield all([
    takeLatest(types.S_AUTH_LOGIN_REQUEST, login),
    takeLatest(types.S_AUTH_LOGOUT_REQUEST, logout),
  ])
}
