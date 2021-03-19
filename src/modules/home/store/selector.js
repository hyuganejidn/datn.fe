import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'

export const makeGetPosts = () => {
  const stateSelect = createSelector(
    state => state.forum,
    forum => forum.posts
  )

  return useSelector(stateSelect)
}

export const makeGetPostsVoted = () => {
  const stateSelect = createSelector(
    state => state.forum,
    forum => forum.postsVoted
  )

  return useSelector(stateSelect)
}

export const makeGetProcessing = type => {
  const stateSelect = createSelector(
    state => state.forum,
    forum => forum.processing[type]
  )

  return useSelector(stateSelect)
}

export const makeGetIsShowReport = () => {
  const stateSelect = createSelector(
    state => state.forum,
    forum => forum.app.isShowReport
  )

  return useSelector(stateSelect)
}
