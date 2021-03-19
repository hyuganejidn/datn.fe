import { Immutable } from '@/helpers/Immutable'
import * as types from './action_types'

const initialState = {
  app: {
    isShowReport: false,
  },
  posts: [],
  postsVoted: {},
  processing: {
    postsVoted: false,
  },
}
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_POSTS:
      return { ...state, posts: [...payload] }
    case types.REMOVE_POST:
      return { ...state, posts: state.posts.filter(post => post.id !== payload) }
    case types.SET_POSTS_VOTED:
      return { ...state, postsVoted: { ...payload } }
    case types.SET_PROCESSING:
      return { ...state, processing: { postsVoted: !state.processing.postsVoted } }
    case types.APP_UPDATE_ISHOWREPORT: {
      const immutableState = new Immutable(state)
      return immutableState.setIn(['app', 'isShowReport'], bool => !bool).state
    }
    default:
      return state
  }
}
export default reducer
