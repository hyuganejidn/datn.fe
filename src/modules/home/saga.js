import { all, call, put, takeLatest } from 'redux-saga/effects'

import { PostAPI, TopicAPI, UserAPI } from '@/services'
import * as types from './store/action_types'

function* getPosts({ payload }) {
  try {
    const posts = yield call(() => TopicAPI.getPostsOfTopic(payload))
    yield put({ type: types.SET_POSTS, payload: posts })
  } catch (error) {
    throw new Error(error)
  }
}

function* getPostsUser({ payload }) {
  try {
    const posts = yield call(() => UserAPI.posts(payload))
    yield put({ type: types.SET_POSTS, payload: posts })
  } catch (error) {
    throw new Error(error)
  }
}

function* getPostsVoted() {
  try {
    yield put({ type: types.SET_PROCESSING })
    const postsUserVoted = yield call(() => PostAPI.getPostsUserVoted())
    console.log(postsUserVoted)
    yield put({ type: types.SET_POSTS_VOTED, payload: postsUserVoted })
  } catch (error) {
    throw new Error(error)
  } finally {
    yield put({ type: types.SET_PROCESSING })
  }
}

export default function* commentSaga() {
  yield all([takeLatest(types.S_FETCH_POSTS, getPosts)])
  yield all([takeLatest(types.S_FETCH_POSTS_USER, getPostsUser)])
  yield all([takeLatest(types.S_FETCH_POSTS_VOTED, getPostsVoted)])
}
