import { all } from 'redux-saga/effects'

import auth from '@/modules/auth/saga'
import comment from '@/modules/comment/saga'

export default function* rootSaga() {
  yield all([auth(), comment()])
}
