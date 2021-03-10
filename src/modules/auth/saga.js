import { all, call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { removeAuthToken, setAuthToken } from '@/helpers/storage'
import { AuthAPI, UserAPI } from '@/services'
import * as types from './store/action_types'

function* login({ payload }) {
  try {
    const { token } = yield call(() => AuthAPI.login(payload))
    setAuthToken(token, true)
    const user = yield call(UserAPI.me)
    yield put({ type: types.AUTH_SET_USER, payload: user })
    yield put({ type: types.AUTH_LOGIN_SUCCESSFUL })
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

function* signUp({ payload }) {
  try {
    yield delay(300)

    const { username } = yield call(() => AuthAPI.register(payload))
    yield call(() =>
      login({
        payload: { username, password: payload.password },
      })
    )
  } catch (error) {
    yield put({ type: types.AUTH_SIGNUP_ERRORS, payload: error })
    console.log('error', error)
  }
}

function* getMe() {
  try {
    const user = yield call(UserAPI.me)
    yield put({ type: types.AUTH_SET_USER, payload: user })
    yield put({ type: types.AUTH_LOGIN_SUCCESSFUL })
  } catch (error) {
    console.log('error', error)
  } finally {
    yield put({ type: types.AUTH_SET_PROCESSING, payload: { key: 'login' } })
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(types.S_AUTH_LOGIN_REQUEST, login),
    takeLatest(types.S_AUTH_LOGOUT_REQUEST, logout),
    takeLatest(types.S_AUTH_SIGNUP_REQUEST, signUp),
    takeEvery(types.S_AUTH_GET_ME, getMe),
  ])
}
