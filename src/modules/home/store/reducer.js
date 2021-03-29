import produce from 'immer'
import * as types from './action_types'

const initialState = {
  app: {
    isShowReport: false,
    isLogin: false,
  },
  posts: [],
  post: null,
  postsVoted: {},
  processing: {
    postsVoted: false,
  },
}

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case types.SET_POST:
        draft.post = payload
        break
      case types.UPDATE_POST_COMMENT_NUM: {
        draft.post.commentNum += payload || 1
        break
      }
      case types.RESET_POST:
        draft.post = null
        break
      case types.SET_POSTS:
        draft.posts = payload
        break
      case types.REMOVE_POST:
        draft.posts = draft.posts.filter(post => post.id !== payload)
        break
      case types.SET_POSTS_VOTED:
        draft.postsVoted = payload
        break
      case types.SET_PROCESSING:
        draft.processing.postsVoted = !state.processing.postsVoted
        break
      case types.APP_UPDATE_IS_REPORT:
        draft.app.isShowReport = !state.app.isShowReport
        break
      case types.APP_UPDATE_IS_LOGIN:
        draft.app.isLogin = !state.app.isLogin
        break
      case types.UPDATE_TOPICS: {
        const indexPost = state.posts.findIndex(post => post.id === payload.id)
        if (indexPost !== -1) draft.posts[indexPost] = payload
        break
      }
      default:
        break
    }
  })

export default reducer
