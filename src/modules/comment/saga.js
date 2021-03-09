import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { CommentAPI, PostAPI } from '@/services'
import * as types from './store/action_types'

function* getCommentsPost({ payload }) {
  try {
    const comments = yield call(() => PostAPI.listComment(payload))
    yield put({ type: types.SET_COMMENTS_POST, payload: comments })
  } catch (error) {
    console.log(error)
  }
}

function* createComment({ payload }) {
  try {
    const comment = yield call(() => CommentAPI.create(payload))
    yield put({ type: types.ADD_COMMENT, payload: comment })
  } catch (error) {
    console.log(error)
  }
}

function* createChildComment({ payload }) {
  try {
    const comment = yield call(() => CommentAPI.create(payload))
    yield call(() => getCommentsPost({ payload: comment.post.id }))
  } catch (error) {
    console.log(error)
  }
}

function* deleteComment({ payload }) {
  try {
    yield call(() => CommentAPI.destroy(payload.id))
    yield call(() => getCommentsPost({ payload: payload.post.id }))
  } catch (error) {
    console.log(error)
  }
}

export default function* commentSaga() {
  yield all([
    takeLatest(types.S_CREATE_COMMENT_POST, createComment),
    takeEvery(types.S_FETCH_COMMENTS_POST, getCommentsPost),
    takeLatest(types.S_CREATE_CHILD_COMMENT, createChildComment),
    takeLatest(types.S_DELETE_COMMENT, deleteComment),
  ])
}
