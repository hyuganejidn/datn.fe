import produce from 'immer'
import * as types from './action_types'

const initialState = {
  reports: [],
  loading: false,
  total: 0,
}

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case types.SET_REPORTS:
        draft.reports = payload.data
        draft.total = payload.total
        break
      case types.SET_LOADING:
        draft.loading = !state.loading
        break
      default:
        break
    }
  })

export default reducer
