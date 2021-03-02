import { all } from 'redux-saga/effects'

import auth from '@/modules/auth/saga'

export default function* rootSaga() {
  yield all([auth()])
}
