import produce from 'immer'
import * as types from './action_types'

const errorBlog = {
  slug: '',
  title: '',
  description: '',
  avatar: '',
}

const initialState = {
  blog: {},
  postsNew: [],
  blogsTop: [],
  blogsMe: [],
  postsBlog: [],
  postsUserFollowed: [],
  errors: {
    blog: errorBlog,
  },
}

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case types.SET_BLOG:
        draft.blog = { ...payload }
        break
      case types.SET_POSTS_NEW:
        draft.postsNew = [...payload]
        break
      case types.SET_POSTS_BLOG:
        draft.postsBlog = [...payload]
        break
      case types.SET_BLOGS_TOP:
        draft.blogsTop = [...payload]
        break
      case types.SET_BLOGS_ME:
        draft.blogsMe = [...payload]
        break
      case types.SET_POSTS_USER_FOLLOWED:
        draft.postsUserFollowed = [...payload]
        break
      case types.UPDATE_POST_NEW: {
        const indexPost = state.postsNew.findIndex(post => post.id === payload.id)
        if (indexPost !== -1) draft.postsNew[indexPost] = payload
        break
      }
      case types.RESET_ERRORS_BLOG: {
        draft.errors.blog = errorBlog
        break
      }
      case types.SET_ERRORS_BLOG: {
        draft.errors.blog = { ...state.errors.blog, ...payload }
        break
      }
      case types.UPDATE_POST_BLOG: {
        const indexPost = state.postsBlog.findIndex(post => post.id === payload.id)
        if (indexPost !== -1) draft.postsBlog[indexPost] = payload
        break
      }
      default:
        break
    }
  })

export default reducer
