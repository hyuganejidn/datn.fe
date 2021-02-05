import { all } from 'redux-saga/effects'

const promise = (value, wait) =>
  new Promise(_ => setTimeout(() => _(value), wait))

function* testFork1() {
  yield promise('testFork1', 1000).then(value => console.log(value))
}

export default function* rootSaga() {
  yield all([testFork1()])
}
