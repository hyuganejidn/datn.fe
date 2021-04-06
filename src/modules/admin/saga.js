import { all, call, put, takeLatest } from 'redux-saga/effects'
import { ReportAPI, UserAPI } from '@/services'

import * as types from './store/action_types'

function* fetchReports({ payload }) {
  try {
    yield put({ type: types.SET_LOADING })
    const data = yield call(() => ReportAPI.list(payload))
    yield put({ type: types.SET_REPORTS, payload: data })
  } catch (error) {
    throw new Error(error)
  } finally {
    yield put({ type: types.SET_LOADING })
  }
}

function* fetchUsers({ payload }) {
  try {
    yield put({ type: types.SET_LOADING })
    const data = yield call(() => UserAPI.list(payload))
    yield put({ type: types.SET_USERS, payload: data })
  } catch (error) {
    throw new Error(error)
  } finally {
    yield put({ type: types.SET_LOADING })
  }
}

export default function* adminSaga() {
  yield all([takeLatest(types.S_FETCH_REPORTS, fetchReports), takeLatest(types.S_FETCH_USERS, fetchUsers)])
}
